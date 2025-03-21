---
sidebar_position: 2
---

# Class Diagrams

## Front End Diagram

```mermaid

classDiagram
    direction TB

    class User {
        +gitHubUsername: String
        +gitHubPassword: String
        +preferences: JSON
        +getCodeSuggestions()
        +viewActivityLogs()
    }

    class VSCodeExtension {
        +suggestCode(userID, userCode): String
        +logActivity(userID, action): void
        +fetchLogs(userID): JSON
        +explainTopic(userID, prompt): String
    }

    class Database {
        +storeUserCode(userID, code): void
        +getLogs(userID): JSON
        +storeLogs(userID, action): void
        +getSuggestions(context): String
    }

    class Suggestions {
        +suggestSnippet(context): String
        +getBoilerplate(type): String
    }

    class Dashboard {
        +displayActivity(userID): JSON
        +showCodeSuggestions(userID): JSON
    }

    User --> VSCodeExtension : Uses
    VSCodeExtension --> Database : Stores & Fetches Data
    VSCodeExtension --> Suggestions : Retrieves Snippets
    VSCodeExtension --> Dashboard : Sends Data
    Database --> Dashboard : Provides Logs & Code Data




```
## Back End Diagram
```mermaid
classDiagram

    class CodeSession {
        +sessionId: String
        +activeSession: Boolean
        +gitHubUsername: String
        +codeContent: Strign
        +timeStamp: Date
    }

    class Suggestion {
        +suggestionId: String
        +sessionId: String
        +suggestedCode: String
        +explanation: String
        +timeStamp: Date
    }

    class MongoDB {
        +storeCodeSession(sessionId, gitHubUsername, codeContent)
        +retrieveCodeSession(sessionId)
        +storeSuggestion(suggestionId, sessionId, suggestedCode, explanation)
    }

    class OpenAI_LLM {
        +generateCodeSuggestion(codeContent)
        +generateTopicExplanation(prompt) 
    }

    class BackendAPI {
        +saveCode(gitHubUsername, codeContent)
        +fetchCode(sessionId)
        +requestSuggestion(sessionId)
    }

    User "1" -- "many" CodeSession : owns
    CodeSession "1" -- "many" Suggestion : has
    CodeSession "1" -- "1" MongoDB : stored_in
    Suggestion "1" -- "1" MongoDB : stored_in
    BackendAPI "1" -- "1" MongoDB : interacts_with
    BackendAPI "1" -- "1" OpenAI_LLM : requests_suggestions
    OpenAI_LLM "1" -- "many" Suggestion : generates

    ```
### Server

### Database

### OpenAI
