// The module 'vscode' contains the VS Code extensibility APIg
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { suggestSnippet } from './suggest';
import { InlineCompletionItem, InlineCompletionList, ProviderResult } from 'vscode';
// This method is called when your extension is activated
// Extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {



	await requireGitHubAuthentication();

    // Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "educode" is now active!');
    const completionTracker = new Map<string, { position: vscode.Position, text: string, timestamp: string }>();
    const suggestor: vscode.InlineCompletionItemProvider = {
		provideInlineCompletionItems: async(document, position, context, token):Promise<InlineCompletionItem[] | InlineCompletionList> => {
			console.log("provideInlineCompletionItems Called");
			const res = await fetch('http://localhost:8000/suggest', {method: 'POST',
				headers: {
					'Content-Type': 'application/json' },
				body: JSON.stringify({code: document.getText(), instructions:""})
			});
				
			console.log(res.status);
			const json = await res.json() as {Response:string}
			console.log(res.status, json);//logs the status of the llm response and the code given ->
			const suggestion = json["Response"];
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
                }
            } as InlineCompletionItem];

            return { items: itemList };
        }
    };

    vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, suggestor);

    // Register command to log when an item is accepted
    vscode.commands.registerCommand("logItemAccepted", (suggestion: string, uri: string, position: vscode.Position, timestamp: string) => {
        const acceptanceTimestamp = new Date().toISOString();
        console.log(`Suggestion accepted: ${suggestion} at ${acceptanceTimestamp}`);
        logSuggestionEvent('Accepted', suggestion, uri, position, acceptanceTimestamp);
        completionTracker.delete(uri); // Remove the tracked suggestion after acceptance
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

	// The command "Hello World" has been defined in the package.json file
	// Implementation of the command is providedwith registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('educode.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		
		vscode.window.showInformationMessage('Hello World from EduCode!');
		
		// console.log("suggestor registered");
	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const text = document.getText();
            await logFileContent(text, document.fileName, editor.selection.active);
        } else {
			// log to test if the editor is active
            console.log("No active editor");
        }
    });

    context.subscriptions.push(disposable);
}

// Function to log file content
async function logFileContent(code: string, fileName: string, position: vscode.Position) {
    const timestamp = new Date().toISOString();
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
        const logData = {
            userId,
            eventType,
            suggestion,
            uri,
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

	console.log("Auth called");
    try {
        // Request a GitHub session
        const session = await vscode.authentication.getSession('github', ['read:user', 'user:email'], { createIfNone: true });

        if (session) {
			
            vscode.window.showInformationMessage(`Logged in as ${session.account.label}`);
            console.log('Access Token:', session.accessToken);
        }
    } catch (error) {
        vscode.window.showErrorMessage(`Authentication required: ${error}`);
    }
}

// This method is called when extension is deactivated
export function deactivate() {}