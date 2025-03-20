export default function getWebViewContent() {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        h2 {
        }
        input {
            width: 80%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        button {
            padding: 10px 15px;
            background-color: #007acc;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #005f99;
        }
        #response {
            margin-top: 20px;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <h2>Ask Educode</h2>

    <input type="text" id="question" placeholder="Type your question...">
    <button onclick="sendQuestion()">Ask</button>
    
    <div class="response" id="response"></div>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script>
        document.getElementById("question").addEventListener("keypress",(e) => {if(e.key === "Enter"){sendQuestion()}})
        const vscode = acquireVsCodeApi();
        function sendQuestion() {
            document.getElementById('response').innerHTML = null
            const question = document.getElementById('question').value;
            vscode.postMessage({ command: 'ask', text: question });
        }
        window.addEventListener('message', event => {
            const message = event.data;
            if (message.command === 'response') {
                document.getElementById('response').innerHTML = marked.parse(message.text);
            }
        });
    </script>
</body>
</html>`;
}
