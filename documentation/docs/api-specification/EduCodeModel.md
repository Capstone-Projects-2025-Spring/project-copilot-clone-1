---
sidebar_position: 3
---

# EduCode Extension 

## `+activate(context)`
  Function that will run when the Educode Extension is first activated, and run the function to provide the suggestion and storage logic to VSCode.
  - Parameters:
    - **context** - vscode Extension Context
  - Methods
    - `createInlineSuggestionProvider():void`
        - Purpose: Create the suggestor class used internally in VSCode to provide code suggestions. Requests the server for code, and sends current document to the server to log.
        - Pre-condition: User must have a text editor open
        - Returns: void
        - Errors Thrown: Nonexistent Text Editor, Server Connection Error
    - `suggestSnippet(editor, snippet, insertPosition)`
        - Purpose: With a snippet returned from the server, provide it to the user so they can either accept or reject it
        - Pre-Condition: 
            - Code snippet returned from Server
            - Text Editor Open
        - Post-Condition: Snippet Suggestion is created in VSCode
        - Parameters:
            - editor: A VSCode active text editor object
            - snippet: A string snippet returned from the server
            - insertPosition: an optional positioning for the snippet to be inserted at
        - Returns: void, renders a suggestion box in VSCode
        - Errors Thrown: Snippet Insertion Failure 
## `+deactivate()`
  Function to dismount the extension
  - Methods
    - `removeInlineSuggestionProvider():void`
      - Purpose: Removes the Inline suggestion provider
      - Returns: void

<!-- ## `public void saveCode(String userId, String sessionId, String codeContent)`

- Parameters:
  **studentNameuserName** - Identifier for the user.
  **sessionId** - Coding session id.
  **codeContent** - The latest code from the user. 
  
## `public String retrieveCode(String sessionId)`

- Parameters:
  **sessionId** - Identifier of the coding session.

**Returns Code Content**

## `public void storeSuggestion(String sessionId, String suggestedCode)`

- Parameters:
  **sessionId** - Identifier of the coding session.
  **suggestedCode** - The Code suggestion from OpenAI.

  ## `public List<String> getSuggestions(String sessionId)`

- Parameters:
  **sessionId** - Identifier of the coding session.

  **Returns String containing code suggestion**

  
  ## `public String requestSuggestion(String sessionId)`

- Parameters:
  **sessionId** - Identifier of the coding session.

  **Returns String containing the AI-generated suggestion**
  

  ## `public void updateTimeStamp(String sessionId, Date timeStamp)`

- Parameters:
  **sessionId** - Identifier of the coding session.
  **timestamp** - New timestamp.
 -->
