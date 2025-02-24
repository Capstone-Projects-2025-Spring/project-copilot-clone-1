---
sidebar_position: 2
---

# Class Diagrams

## Front End Diagram

```mermaid

classDiagram
    direction TB

    class User {
        +userID: String
        +username: String
        +preferences: JSON
        +getCodeSuggestions()
        +viewActivityLogs()
    }

    class VSCodeExtension {
        +suggestCode(userID, userCode): String
        +logActivity(userID, action): void
        +fetchLogs(userID): JSON
    }

    class Database {
        +storeUserCode(userID, code): void
        +storeLogs(userID, action): void
        +getLogs(userID): JSON
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
classDiagram
    class User {
        +String userId
        +String username
        +String email
    }

    class CodeSession {
        +String sessionId
        +String userId
        +String codeContent
        +Date lastUpdated
    }

    class Suggestion {
        +String suggestionId
        +String sessionId
        +String suggestedCode
        +String explanation
        +Date timestamp
    }

    class MongoDB {
        +storeCodeSession(sessionId, userId, codeContent)
        +retrieveCodeSession(sessionId)
        +storeSuggestion(suggestionId, sessionId, suggestedCode, explanation)
    }

    class OpenAI_LLM {
        +generateCodeSuggestion(codeContent) 
    }

    class BackendAPI {
        +saveCode(userId, codeContent)
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
### Server

### Database

### OpenAI
