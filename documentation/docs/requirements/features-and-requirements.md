---
sidebar_position: 4
---

# Features and Requirements

## Functional Requirements 
- Users must download VS Code and install the EduCode plugin.
- Users must authenticate their accounts to use the EduCode plugin.
    - Users will have the option to log in anonymously while still receiving suggestions.
- The plugin will provide code suggestions based on the code the user has already written.
- Suggestions will be generated in real-time based on the user’s current code context.
- Users can accept or reject code suggestions, with the system logging these interactions.
- The system must log user interactions, including:
    - Whether suggested code is accepted or rejected.
    - Time taken for the user to accept a suggestion.
    - A method for evaluating the accuracy of suggestions.
- Users will have option to customize EduCode’s behavior, including:
    - Modifying the frequency of code suggestions
    - Enabling/disabling specific features
- The plugin will provide a dashboard for users to view their usage metrics and performance data.
- The system will analyze collected data to assess the impact of the plugin on user performance in their coding tasks.

## Nonfunctional Requirements
- The plugin must securely access user data and maintain user privacy.
- The system should be able to handle high traffic without overwhelming the database.
- The plugin should be compatible with various versions of VS Code.
- The application must support at least 1000 concurrent users.
- The system should be designed to scale on demand, utilizing cloud services if necessary.
- The backend should use efficient logging mechanisms to store user interaction data without excessive database load.
- The system should prioritize helpful and relevant suggestions over generic or excessive code completions.
- Users should be encouraged to critically evaluate suggestions by providing feedback mechanisms or rewarding them for identifying incorrect or suboptimal suggestions.
- The user interface must be aesthetically pleasing and intuitive to enhance user experience.
