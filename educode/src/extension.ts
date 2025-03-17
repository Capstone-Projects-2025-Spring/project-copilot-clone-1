import * as vscode from 'vscode';
import axios from 'axios';
import { suggestSnippet } from './suggest';

export async function activate(context: vscode.ExtensionContext) {
	await requireGitHubAuthentication();

	console.log('Congratulations, your extension "educode" is now active!');

	const suggestor: vscode.InlineCompletionItemProvider = {
		provideInlineCompletionItems: async (document, position, context, token) => {
			const res = await fetch('http://localhost:8000/suggest');
			const json = await res.json() as { Response: string };
			const suggestion = json["Response"];
			const range = new vscode.Range(position.translate(0, -2), position);

			console.log("provideInlineCompletionItems Called");
			return {
				items: [
					{ insertText: suggestion },
					{ insertText: "print('Hello')" }
				]
			};
		}
	};

	vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, suggestor);

	const disposable = vscode.commands.registerCommand('educode.helloWorld', async () => {
		vscode.window.showInformationMessage('Hello World from EduCode!');

		console.log("suggestor registered");

		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const text = document.getText();
			const postRes = await fetch('http://localhost:8000/logs', {
				method: 'POST',
				body: JSON.stringify({ code: text, fileName: document.fileName, position: editor.selection.active })
			});
			const postBody = await postRes.json() as { detail: { response: string }[] };

			console.log(postBody);
			console.log(postRes.status);
			console.log(document.fileName);
		} else {
			console.log("No active editor");
		}
	});

	context.subscriptions.push(disposable);
}

// Requires user to log in before accessing the extension
async function requireGitHubAuthentication() {
	console.log("Running authentication process for the user");
	try {
		const session = await vscode.authentication.getSession('github', ['read:user', 'user:email'], { createIfNone: true });

		if (session) {
			const userData = {
				gitHubUsername: session.account.id,
				username: session.account.label,
				accessToken: session.accessToken
			};

			vscode.window.showInformationMessage(`Logged in as ${session.account.label}`);
			vscode.window.showInformationMessage(`Welcome to EduCode! ${userData.gitHubUsername}`);
			console.log('Access Token:', session.accessToken);

			// Register user in MongoDB after successful authentication
			await registerUserInMongoDB(userData);

			console.log('RAN REGISTER IN MONGODB CODE!');
		}
	} catch (error) {
		vscode.window.showErrorMessage(`Authentication required: ${error}`);
	}
}

// Function to check if the user exists in MongoDB and add them if they don't
async function registerUserInMongoDB(userData: { gitHubUsername: string, username: string, accessToken: string }) {
	try {
		const response = await axios.post('http://localhost:8000/api/users', userData);
		vscode.window.showInformationMessage(response.data.message || 'User added successfully.');
	} catch (error) {
		vscode.window.showErrorMessage(`Failed to add user: ${error}`);
	}
}

// Deactivate function
export function deactivate() {}
