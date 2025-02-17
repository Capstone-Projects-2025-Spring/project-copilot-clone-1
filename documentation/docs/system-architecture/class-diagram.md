---
sidebar_position: 2
---

# Class Diagrams

## Front End Diagram

```mermaid

classDiagram
   vscode <-- `extension.ts`
  class `extension.ts`{
    +activate(context: vscode.ExtensionContext)
    +deactivate()
  }

```
## Back End Diagram

### Server

### Database

### OpenAI