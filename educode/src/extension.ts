import * as vscode from 'vscode';
import { suggestSnippet } from './suggest';
import * as path from 'path';
import { InlineCompletionItem, InlineCompletionList, ProviderResult } from 'vscode';
import getWebViewContent from './webViewHTML';


// Interval for logging user input (e.g., every 5 seconds)
const LOGGING_INTERVAL = 5000; // 5 seconds

let loggingTimer: NodeJS.Timeout | null = null; // Timer for interval logging

// This method is called when your extension is activated
// Extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

    await requireGitHubAuthentication();

    let acceptedMostRecentSugg = false;
    let suggestorCancelled = false;
    let mostRecentAcceptedSuggestion: string;

    // Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "educode" is now active!');
    const completionTracker = new Map<string, { position: vscode.Position, text: string, timestamp: string }>();

    // Function to start interval logging
    const startIntervalLogging = (editor: vscode.TextEditor) => {
        if (loggingTimer) {
            clearInterval(loggingTimer); // Clear existing timer if any
        }

        let lastLineCount: number = editor.document.lineCount;     // Track the last line count
        let lastCursorLine: number = editor.selection.active.line; // Track the last cursor line
        let lastLoggedText: string = editor.document.getText();    // Track the last logged text

        loggingTimer = setInterval(async () => {
            const document = editor.document;
            const text = document.getText();
            // Get the current line number where the cursor is positioned
            const cursorLine = editor.selection.active.line;  

            // Check if the cursor has moved to a new line compared to the last known position
            const movedToNewLine = cursorLine != lastCursorLine;

            // Log only if the cursor has moved to a new line and the text has changed
            if (movedToNewLine && text != lastLoggedText) {
                // Call the logUserInput function to log the current text and the file name
                await logUserInput(text, document.fileName);
                
                console.log(`Cursor moved to a new line: ${cursorLine}`);
                console.log(`New line added: ${document.lineCount > lastLineCount}`);

                // Update the last cursor line, line count, and logged text
                lastCursorLine = cursorLine;
                lastLineCount = document.lineCount;
                lastLoggedText = text;
            }
        }, LOGGING_INTERVAL);
    };

    // Listen for active text editor changes
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            startIntervalLogging(editor); // Start interval logging when a new editor is activated
        }
    }));

    // Start interval logging if there's already an active editor
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        startIntervalLogging(editor);
    }

    const suggestor: vscode.InlineCompletionItemProvider = {
		provideInlineCompletionItems: async(document, position, context, token):Promise<InlineCompletionItem[] | InlineCompletionList> => {
			console.log("provideInlineCompletionItems Called");
			console.log(position);

            if (acceptedMostRecentSugg) {
                console.log("provideInlineCompletionItems cancelled (recently accepted suggestion)");
                suggestorCancelled = true;
                acceptedMostRecentSugg = false;
                return [];
            }

			const res = await fetch('http://localhost:8000/suggest', {method: 'POST',
				headers: {
					'Content-Type': 'application/json' },
				body: JSON.stringify({code: document.getText(), instructions:""})
			});
				
			console.log(res.status);
			const json = await res.json() as {Response:string}
			console.log(res.status, json);//logs the status of the llm response and the code given ->
			const suggestion = json["Response"];

            if (suggestion == mostRecentAcceptedSuggestion) {
                console.log("provideInlineCompletionItems cancelled (duplicate of most recent accepted suggestion given)");
                return [];
            }

			const range = new vscode.Range(position.translate(0, 0), position.translate(0,suggestion.length));
			// const text = document.getText(range);
			// console.log("provideInlineCompletionItems Called");
            const timestamp = new Date().toISOString();
			// Logs the suggestion presented to the user along with the timestamp
            console.log(`Suggestion presented: ${suggestion} at ${timestamp}`);

            // Log the suggestion as presented
            logSuggestionEvent('Presented', suggestion, document.uri.toString(), position, timestamp);

            // Track the most recent suggestion
            completionTracker.set(document.uri.toString(), { position, text: suggestion, timestamp });

			// Create an inline completion item with the suggestion
            const itemList = [{
                insertText: suggestion,
                command: {
                    title: "logItemAccepted",
                    command: "logItemAccepted",
                    arguments: [suggestion, document.uri.toString(), position, timestamp]
                },
                range: new vscode.Range(position, position)
            } as InlineCompletionItem];

            return { items: itemList };
        }
    };

    if (!suggestorCancelled)
    {
        vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, suggestor);

        // Register command to log when an item is accepted
        vscode.commands.registerCommand("logItemAccepted", (suggestion: string, uri: string, position: vscode.Position, timestamp: string) => {
            const acceptanceTimestamp = new Date().toISOString();
            console.log(`Suggestion accepted: ${suggestion} at ${acceptanceTimestamp}`);
            logSuggestionEvent('Accepted', suggestion, uri, position, acceptanceTimestamp);
            completionTracker.delete(uri); // Remove the tracked suggestion after acceptance
            acceptedMostRecentSugg = true;
            mostRecentAcceptedSuggestion = suggestion;
        });

        // Listen for text changes to detect rejected suggestions
        context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(event => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const document = editor.document;
                const trackedSuggestion = completionTracker.get(document.uri.toString());
                if (trackedSuggestion) {
                    const text = document.getText();
                    // Check if the suggestion was not accepted
                    if (!text.includes(trackedSuggestion.text)) {
                        const rejectionTimestamp = new Date().toISOString();
                        console.log(`Suggestion rejected: ${trackedSuggestion.text} at ${rejectionTimestamp}`);
                        logSuggestionEvent('Rejected', trackedSuggestion.text, document.uri.toString(), trackedSuggestion.position, rejectionTimestamp);
                        completionTracker.delete(document.uri.toString());
                    }
                }
            }
        }));
    }
    else
    {
        suggestorCancelled = false;
    }

	// The command "Hello World" has been defined in the package.json file
	// Implementation of the command is providedwith registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('educode.askQuestion', async () => {
        console.log("askQuestion called");
        const panel = vscode.window.createWebviewPanel(
            'questionInput',
            'Ask a Question',
            {viewColumn:-1,preserveFocus:true},
            { enableScripts: true }
        );

        panel.webview.html = getWebViewContent();

        panel.webview.onDidReceiveMessage(async(message) => {
            // vscode.window.showInformationMessage(`message was ${message.command}, ${message.text}`);
            console.log(`message Command:${message.command}, text:${message.text}`);
            if (message.command === "ask"){
                try{
                    const res = await fetch('http://localhost:8000/askEducode',{method:"POST",headers: {
                        'Content-Type': 'application/json' }, body:JSON.stringify({question: message.text})});
                    console.log(res);
                    /**
                    * @todo Make the data output streamable 
                    * */ 
                    const data = await res.json() as {output:string};
                    // console.log(data);
                    panel.webview.postMessage({command:'response', text: data.output});
                }catch(e){
                    panel.webview.postMessage({ command: 'response', text: 'Error: Unable to fetch response' });
                }
            }
            if (message.command === "log"){
                console.log(message.text)
            }

        }, undefined, context.subscriptions);
    });

    context.subscriptions.push(disposable);
}
    

// Function to log user input at intervals
async function logUserInput(code: string, filePath: string) {
    const session = await vscode.authentication.getSession('github', ['read:user', 'user:email'], { createIfNone: false });
    if (session) {
        const userId = session.account.label;
        const timestamp = new Date().toISOString();
        const fileName = path.basename(filePath);
        const logData = {
            userId,
            code,
            fileName,
            timestamp
        };

        // Send log data to the server
        try {
            const postRes = await fetch('http://localhost:8000/user-input-logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(logData)
            });
            if (postRes.ok) {
                console.log(`User input log sent:`, postRes.status);
            } else {
                console.error(`Failed to send user input log:`, postRes.status, await postRes.text());
            }
        } catch (error) {
            console.error('Failed to send user input log:', error);
        }
    } else {
        console.log("User not authenticated for user input logging");
    }
}

// Function to log file content
async function logFileContent(code: string, filePath: string, position: vscode.Position) {
    const timestamp = new Date().toISOString();
    const fileName = path.basename(filePath);
	//Post log of file content, file name and cursor position to the fastAPI server
    const postRes = await fetch('http://localhost:8000/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, fileName, position, timestamp })
    });
    console.log(await postRes.json());
}

// Function to log suggestion events (presented, accepted, rejected)
async function logSuggestionEvent(eventType: string, suggestion: string, uri: string, position: vscode.Position, timestamp: string) {
    const session = await vscode.authentication.getSession('github', ['read:user', 'user:email'], { createIfNone: false });
    if (session) {
        const userId = session.account.label;
        const filePath = uri.replace('file://', '');
        const fileName = path.basename(filePath);
        const logData = {
            userId,
            eventType,
            suggestion,
            fileName,
            position: {
                line: position.line,
                character: position.character
            },
            timestamp
        };

        // Send log data to the server
        try {
            const postRes = await fetch('http://localhost:8000/suggestion-logs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logData)
            });
            if (postRes.ok) {
                console.log(`Suggestion log sent (${eventType}):`, postRes.status);
            } else {
                console.error(`Failed to send suggestion log (${eventType}):`, postRes.status, await postRes.text());
            }
        } catch (error) {
            console.error('Failed to send suggestion log:', error);
        }
    } else {
        console.log("User not authenticated for suggestion logging");
    }
}


//requires user to login before accessing the extension
async function requireGitHubAuthentication() {
	console.log("Running authentication process for the user");
	try {
		const session = await vscode.authentication.getSession('github', ['read:user', 'user:email'], { createIfNone: true });

		if (session) {
			const userData = {
				gitHubUsername: session.account.label,
				accountId: session.account.id,

			};
            console.log(userData);

			// vscode.window.showInformationMessage(`Logged in as ${session.account.label}`);
			vscode.window.showInformationMessage(`Welcome to EduCode, ${userData.gitHubUsername}!`);
			console.log('Access Token:', session.accessToken);

			// Register user in MongoDB after successful authentication
			await registerUserInMongoDB(userData);


		}
	} catch (error) {
		vscode.window.showErrorMessage(`Authentication required: ${error}`);
	}
}

async function registerUserInMongoDB(userData: { gitHubUsername: string , accountId: string }) {
    try {
		   const response = await fetch('http://localhost:8000/storeUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        // might want to console log this stuff instead of showing a window messagebc users dont care if their user got stored
        if (response.status === 200) {
            console.log(`User added successfully as ${userData.accountId}`); // {session.account.label}`);
        }else {
			//vscode.window.showInformationMessage(data) // {session.account.label}`);
            console.log(`Failed to add user:`); // ${data.detail || 'Unknown error'}`);
        }
    } catch (error) {
		console.log(`Failed to add user: ${error}`);
    }
}

// This method is called when extension is deactivated
export function deactivate() {
    // Clear the logging timer when the extension is deactivated
    if (loggingTimer) {
        clearInterval(loggingTimer);
    }
}