---
sidebar_position: 3
---

# Sequence Diagrams

## Use Case 1

```mermaid
sequenceDiagram 
  actor User
  participant VSCode
  participant Server
  User->>VSCode: Download EduCode from VSCode Extensions
  VSCode->>Server: Notify Server of New User
  Server->>VSCode: Ask for Login Credentials
  User->>VSCode: Create Account or Log in
  VSCode->>Server: Records Account Information
```

## Use Case 2

```mermaid
sequenceDiagram 
  actor User
  participant VSCode
  participant Server
  participant AI Model
  participant Database
  User->>VSCode: Type a Snippet of Code
  VSCode->>Server: Send User's Code
  Server->>AI Model: Send User's Code
  AI Model-->>Server: Send Generated Code Suggestion 
  Server-->>VSCode: Send Suggestion
  User->>VSCode: Accept/Reject Suggestion
  VSCode->>Server: Send Acceptance/Rejection
  Server->>Database: Log Suggestion and Acceptance/Rejection
```

## Use Case 3

```mermaid
sequenceDiagram 
  actor User
  participant VSCode
  participant Server
  participant AI Model
  participant Database
  User->>VSCode: Ask AI to write a function
  VSCode->>Server: Send User's Request
  Server->>AI Model: Send User's Request
  AI Model-->>Server: Send Generated Code Suggestion 
  Server-->>VSCode: Send Suggestion
  User->>VSCode: Accept/Reject Suggestion
  VSCode->>Server: Send Acceptance/Rejection
  Server->>Database: Log Suggestion and Acceptance/Rejection
```
## Use Case 4

```mermaid
sequenceDiagram 
  actor User
  participant VSCode
  participant Server
  participant AI Model
  User->>VSCode: Ask AI to explain a concept or code
  VSCode->>Server: Send User's Request
  Server->>AI Model: Send User's Request
  AI Model-->>Server: Send Generated Explaination
  Server-->>VSCode: Send Explaination
```

## Use Case 5

```mermaid
sequenceDiagram 
  actor User
  participant VSCode
  participant Server
  participant AI Model
  participant Database
  User->>VSCode: Type a Snippet of Code
  VSCode->>Server: Send User's Code
  Server->>AI Model: Send User's Code, Requesting Incorrect Suggestion
  AI Model-->>Server: Send Incorrectly Generated Code Suggestion 
  Server-->>VSCode: Send Incorrect Suggestion
  User->>VSCode: Accept Incorrect Suggestion
  VSCode->>Server: Record Acceptance
  Server->>VSCode: Notify User of Incorrect Suggestion
  Server->>Database: Log Suggestion and Acceptance
```

## Use Case 6

```mermaid
sequenceDiagram 
  actor User
  participant VSCode
  participant Server
  participant AI Model
  participant Database
  User->>VSCode: Type a Snippet of Code
  VSCode->>Server: Send User's Code
  Server->>AI Model: Send User's Code
  AI Model-->>Server: Send Incorrectly Generated Code Suggestion 
  Server-->>VSCode: Send Incorrect Suggestion
  User->>VSCode: Accept Incorrect Suggestion
  VSCode->>Server: Record Acceptance
  Server->>Server: Recognize Misuse of AI. Limits Future Suggestions
  Server->>Database: Log Suggestion and Acceptance
```

## Use Case 7

```mermaid
sequenceDiagram 
  actor User
  participant VSCode
  participant Server
  participant AI Model
  participant Database
  User->>VSCode: Type a Snippet of Code
  VSCode->>Server: Send User's Code
  Server->>AI Model: Send User's Code
  AI Model-->>Server: Send Incorrectly Generated Code Suggestion 
  Server-->>VSCode: Send Incorrect Suggestion
  User->>VSCode: Accept Incorrect Suggestion
  VSCode->>Server: Record Acceptance
  Server->>Server: Recognize Misuse of AI. Stops all Future Suggestions
  Server->>Database: Log Suggestion and Acceptance
  User->>VSCode: Request Quiz
  VSCode->>Server: Send Request
  Server->>Database: Request Recently Incorrect Suggestions
  Database-->>Server: Retrieve Recently Incorrect Suggestions
  Server->>AI Model: Request Quiz based on Recently Incorrect Suggestions
  AI Model-->>Server: Send Generated Quiz
  Server-->>VSCode: Send Quiz
  User->>VSCode: Answers Quiz
  VSCode->>Server: Record Results
  Server->>Database: Log Quiz Results
  Server->>Server: Unlock Suggestions if Quiz's Results are Correct
```

## Use Case 8

```mermaid
sequenceDiagram 
  actor User as Educator
  participant VSCode
  participant Dashboard
  participant Server
  participant Database
  User->>VSCode: Open Dashboard
  VSCode->>Dashboard: Open Dashboard
  User->>Dashboard: Request Metric of a Single Student
  Dashboard->>Server: Request Student's Metric
  Server->>Database: Request Student's Data
  Database-->>Server: Retrive Student's Data
  Server-->>Dashboard: Display Student's Metric
```

## Use Case 9

```mermaid
sequenceDiagram 
  actor User as Educator
  participant VSCode
  participant Dashboard
  participant Server
  participant Database
  User->>VSCode: Open Dashboard
  VSCode->>Dashboard: Open Dashboard
  User->>Dashboard: Request Metric of Class for an assignment or time period
  Dashboard->>Server: Request Class's Data
  Server->>Database: Request Class's Data
  Database-->>Server: Retrive Class's Data
  Server-->>Dashboard: Display Class's Metric
```

## Use Case 10

```mermaid
sequenceDiagram 
  actor User as Student
  participant VSCode
  participant Dashboard
  participant Server
  participant Database
  User->>VSCode: Open Dashboard
  VSCode->>Dashboard: Open Dashboard
  User->>Dashboard: Request Personal Metrics
  Dashboard->>Server: Request Personal Metrics
  Server->>Database: Request Personal Data
  Database-->>Server: Retrive Personal Data
  Server-->>Dashboard: Display Personal Metrics
```