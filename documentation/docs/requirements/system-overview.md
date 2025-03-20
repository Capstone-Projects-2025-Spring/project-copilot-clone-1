---
sidebar_position: 1
---

# System Overview

## Project Abstract
EduCode is a vscode extension that uses AI to provide real-time code suggestions, rich logging to monitor the user's usage of the AI assistant, and a dashboard that displays metrics to improve user's usage of the AI assistant.

## Conceptual Design
EduCode will be a VSCode extension. The frontend of the application will be written in TypeScript, HTML, and CSS using the VS Code API which provides functionality for the interface of the application. The backend will consist of a server, database, and LLM. The server will handle requests from the client side and manage interactions between the client, LLM, and database. The database management software is MongoDB and the LLM is llama3.2.

## Background
Similar products are [ChatGPT](https://openai.com/index/chatgpt/) and [Github Copilot](https://github.com/features/copilot). These are both closed-source AI assistants, where ChatGPT is prompt based and multipurposed. Whereas, Github Copilot contains a prompted chat mode as well as real-time code suggestions. EduCode separates itself from these products with its logging capabilities geared towards promoting the effective use of AI Assistants.
