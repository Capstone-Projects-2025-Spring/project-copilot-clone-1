import * as vscode from 'vscode';

export function suggestSnippet(editor: vscode.TextEditor, snippet: string, insertPosition?: vscode.Position): void {
    try {
        const document = editor.document;
        const text = document.getText();
        let lines = text.split('\n');

        const insertPos = insertPosition ||  new vscode.Position(lines.length, 0);
        

        const edit = new vscode.WorkspaceEdit();
        edit.insert(document.uri, insertPos, snippet + '\n');

        vscode.workspace.applyEdit(edit).then(success => {
            if (success) {
                vscode.window.showInformationMessage('Snippet suggestion added.');
            } else {
                vscode.window.showErrorMessage('Failed to suggest snippet.');
            }
        });
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error}`);
    }
}