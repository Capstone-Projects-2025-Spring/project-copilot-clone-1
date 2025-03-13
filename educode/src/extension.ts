// The module 'vscode' contains the VS Code extensibility APIg
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { suggestSnippet } from './suggest';
// This method is called when your extension is activated
// Extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {



	await requireGitHubAuthentication();

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "educode" is now active!');
	const suggestor:vscode.InlineCompletionItemProvider = {
		provideInlineCompletionItems: async(document, position, context, token) => {
			const res = await fetch('http://localhost:8000/suggest');
			const json = await res.json() as {Response: string};
			const suggestion = json["Response"];
			 const range = new vscode.Range(position.translate(0, -2), position);
			// const text = document.getText(range);
			console.log("provideInlineCompletionItems Called");
			return {
				items: [{
					insertText: suggestion,
				},{insertText: "print('Hello')"}]
			};
		}
	};

	vscode.languages.registerInlineCompletionItemProvider({pattern: "**"}, suggestor);
	// The command "Hello World" has been defined in the package.json file
	// Implementation of the command is providedwith registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('educode.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		
		vscode.window.showInformationMessage('Hello World from EduCode!');
		
		console.log("suggestor registered");
	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const text = document.getText();
			//Post log of file content, file name and cursor position to the fastAPI server
			const postRes = await fetch('http://localhost:8000/logs', {method: 'POST', body: JSON.stringify({code:text, fileName: document.fileName, position: editor.selection.active}) });
			const postBody = await postRes.json() as {detail:{response: string}[]};
			console.log(postBody);
			//log response from the fastAPI server
			console.log(postRes.status);
			// suggestSnippet(editor,suggestion, editor.selection.active);
			// log to test if the editor is active
			console.log(document.fileName);
		}else{
			console.log("No active editor");
		}
	});

	context.subscriptions.push(disposable);
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
