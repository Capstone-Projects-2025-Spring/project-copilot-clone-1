---
sidebar_position: 2
---

# System Block Diagram
import Figure from "../../src/components/Figure";
<Figure caption={"Figure 1 High-Level Design of the EduCode application."}>

![System Block Diagram](/documentation/static/img/SystemBlockDiagram.jpg)

</Figure>

Our project tech stack will consist as a VS Code Extension for the front-end and a server hosting a SQL database and local Deepseek model as the backend.

Our backend will need to store the user's profile, lines of code, acceptance history and suggestions from our LLM. Deepseek will be deployed locally, granting privacy and less financial burden on our clients.

Our front-end will present coding suggestions as the user is working, allowing them to accept/reject the suggestion. This extension will be built using Typescript.
