---
sidebar_position: 2
---
# Integration tests

<!-- Tests to demonstrate each use-case based on the use-case descriptions and the sequence diagrams. External input should be provided via mock objects and results verified via mock objects. Integration tests should not require manual entry of data nor require manual interpretation of results. -->

<!-- ### Use Case 1 - User signs into EduCode for school as educator or student -->
### Use Case - Student uses EduCode to autocomplete written code
- POST request with mock code to /suggest endpoint
- Client displays suggestion
- User accepts or rejects suggestion
- User's choice is stored in database
<!-- ### Use Case 3 - Student uses EduCode to ask AI to write a complete function for them -->
<!-- ### Use Case 4 - Student uses EduCode to ask AI to explain a concept or code  -->
