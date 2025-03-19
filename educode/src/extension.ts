import * as vscode from 'vscode';

import { suggestSnippet } from './suggest';

export async function activate(context: vscode.ExtensionContext) {
	await requireGitHubAuthentication();

	console.log('Congratulations, your extension "educode" is now active!');

	const suggestor: vscode.InlineCompletionItemProvider = {
		provideInlineCompletionItems: async (document, position, context, token) => {
			const res = await fetch('http://localhost:8000/storeUser');
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

// Function to check if the user exists in MongoDB and add them if they don't
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
            vscode.window.showInformationMessage(`User added successfully as ${userData.accountId}`) // {session.account.label}`);
        }else {
			//vscode.window.showInformationMessage(data) // {session.account.label}`);
            vscode.window.showErrorMessage(`Failed to add user:`); // ${data.detail || 'Unknown error'}`);
        }
    } catch (error) {
		vscode.window.showErrorMessage(`Failed to add user: ${error}`);
    }
}

// Deactivate function
export function deactivate() {}
