---
sidebar_position: 2
---

# System Block Diagram

import Figure from '../../src/components/Figure';

<Figure caption="Figure 1: System Block Diagram of the EduCode Application">
  ![System Block Diagram](/img/SystemBlockDiagramV3.jpg)
</Figure>

### Description
Figure 1 provides the general layout of the EduCode System. The backend will be built using FastAPI, a modern, high-performance framework designed for building APIs with Python. It supports asynchronous programming, enabling the handling of concurrent requests without blocking, making it suitable for scalable applications. The FastAPI backend will connect to an SQL database to store critical information, including user profiles, lines of code, acceptance history, and suggestions from the AI model. The SQL database will provide structured storage and efficient querying capabilities for the stored data. The backend will interact with a ChatGPT model via an API, generating real-time code suggestions based on the user’s activity. 

These suggestions will be presented to the user through the front-end VS Code extension, and the user's responses (accept/reject) will be stored in the backend along with the historical data for continuous improvement of the system. Additionally, relevant statistics will be logged and displayed on a dashboard, allowing administrators or users to monitor overall performance and gain insights into user behavior and engagement over time.
