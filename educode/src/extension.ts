// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { suggestSnippet } from './suggest';
// This method is called when your extension is activated
// Extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "educode" is now active!');

	// The command "Hello World" has been defined in the package.json file
	// Implementation of the command is providedwith registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('educode.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from EduCode!');
		//fetch suggestion from the fastAPI server
		const res = await fetch('http://localhost:8000/suggest');
		const body = await res.json() as {Response: string};

		console.log(res.status, body["Response"]);
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const text = document.getText();
			//Post log of file content, file name and cursor position to the fastAPI server
			const res = await fetch('http://localhost:8000/logs', {method: 'POST', body: JSON.stringify({code:text, fileName: document.fileName, position: editor.selection.active}), });
			const body = await res.json() as {response: string}[];
			//log response from the fastAPI server
			console.log(res.status, body.map(a=>a["response"]));
			suggestSnippet(editor,body[0].response || "no suggestion from server", editor.selection.active);
			//log to test if the editor is active
			console.log(document.fileName);
		}else{
			console.log("No active editor");
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when extension is deactivated
export function deactivate() {}
