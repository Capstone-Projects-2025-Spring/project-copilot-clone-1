---
sidebar_position: 5
---

# Use-case descriptions
## Use Case 1 - User signs into EduCode for school as educator or student
*User needs to sign in and/or choose their role for educode*
1. Once users have the extension downloaded and enabled, users have the choice to sign in as a student or educator
## Use Case 2 - Student uses EduCode to autocomplete written code
*As a student user I would want EduCode to suggest autocompletions for code I'm writing*
1. Student user is writing code in an open file in VSCode
2. At some point while writing code, user is offered a suggestion to autocomplete the code
3. Student can accept or reject the suggestion offered by EduCode
4. EduCode logs the interaction with the student
## Use Case 3 - Student uses EduCode to ask AI to write a complete function for them
*As a student user I want to be able to write a description for a function and have EduCode write it for me*
1. Student user writes a comment explaining what a function or piece of code in a file should do
2. When the student ends the comment EduCode offers a fully created function based on the comment
3. Student can accept or reject the suggestion offered by EduCode
4. EduCode logs the interaction with the student
## Use Case 4 - Student uses EduCode to ask AI to explain a concept or code
*As a student user I would want EduCode to explain concepts to me even if I don't want it to write my code*
1. Student user uses EduCode's shortcut to ask AI a question
2. EduCode returns a popup with an answer and description to help the student understand the topic
3. Student can spend any amount of time viewing this answer, then exit the popup
## Use Case 5 - Student is provided an inaccurate suggestion
*As an educator user I would want overuse or misuse of AI to be corrected or caught*
1. A student user has been flagged for potential misuse of AI
2. EduCode suggests an incorrect or inaccurate solution
3. Student user can accept or reject the suggestion
4. EduCode logs the interaction with the student
## Use Case 6 - EduCode recognizes student is misusing AI assistance and limits suggestions
*As an educator user I want EduCode to limit suggestions to student users who overuse or misuse them*
1. EduCode has flagged a student for misuse of AI
2. EduCode will lock suggestions provided to a student for a preset amount of time
3. EduCode will log when suggestions were locked
## Use Case 7 - Student is given a Mini-Quiz to unlock suggestions again
*As an educator I want students to be able to recieve code suggestions after proving they understand the concepts*
1. A student user has been locked out of recieving suggestions
2. The preset time limit on the lockout has elapsed
3. The student is now presented with the chance to take a short quiz to unlock suggestions again
4. Questions are based on prior incorrectly accepted code suggestions or generated suggestions
5. EduCode either unlocks suggestions or extends lockout time based on student performance on the quiz
## Use Case 8 - Educator views Metrics for single student
*As an educator user I want to be able to check on AI usage and metrics of a single student user*
1. An educator user goes to the dashboard and clicks on a student to generate a report
2. The educator is given a report comparing this student to averages and expected usages of AI in their code
## Use Case 9 - Educator views metrics for class for an assignment or time period
*As an educator user I want to be able to check on AI usage and metrics of a group of student users based on assignment or time period*
1. An educator user goes to the dashboard and clicks on a group or class to generate a report over a set time period
2. The educator recieves a report with averages of the group and data showing usage and grades
## Use Case 10 - Student views metrics for their own AI use
*As a student user I want to know my own metrics for AI usage and metrics generated about me*
1. A student user completes an assignment or clicks to generate a student report.
2. The student user is given a report with feedback on how often they accepted incorrect suggestions and how quickly they accepted answers
3. The student user will also get a written feedback summary explaining how they can improve, or comparing their metrics to expected values or class averages

<!-- ## Use Case 1 – Limiting Code Suggestions
*The goal of limiting code suggestions is to encourage users to write code on their own rather than having EduCode autofill all their functions for them.*

1. The user begins coding a function.
2. EduCode automatically fills the function and implementation.
3. The user, when coding future functions, repeatedly accepts EduCode’s suggestions, prompting it to limit suggestions to single lines of code.
## Use Case 2 – Giving Incorrect Suggestions
*To keep users engaged in critical thinking while coding, EduCode will eventually give incorrect code suggestions after a certain number of suggestions is reached.*

1. The user, having accepted the maximum number of suggestions available, begins coding a function.
2. EduCode gives a faulty/incorrect suggestion.
3. The user either:
<br/>a. Notices the flaws in the suggestion and declines it. Nothing happens.
<br/>b. Accepts the faulty suggestion, prompting EduCode to notify the user that it was incorrect and restrict suggestions for 30 seconds. The time suggestions are restricted will increase if the user repeatedly accepts faulty suggestions.
## Use Case 3 – Unlock Quiz
*Users will make mistakes. EduCode will offer them a chance to unlock suggestions by passing a multiple-choice quiz.*

1. The user is locked out of receiving suggestions from EduCode. During this time, there is a button on the GUI that says “Take quiz to unlock suggestions.” The user clicks it.
2. The user is given a multiple-choice quiz.
3. The user either:
<br/>a. Answers the questions correctly, prompting EduCode to remove the restriction on code suggestions.
<br/>b. Answers the questions incorrectly, prompting EduCode to keep the restriction in place and remove the “Take quiz to unlock suggestions” button for the duration of the restriction.

## Use Case 4 - Teacher Viewing Metrics
*Educators or administrators will want to check progress or metrics of users to see if EduCode is helpign the user or not*
1. Users have had time to use EduCode for an assignment or period of time.
2. A user with admin priveleges will look at the metrics such as time till suggestion acceptance and accuracy of student code for each user
3. The administrator can use these metrics alongside a student's final code or grade and determine whether they are using AI beneficially
## Use Case 5 - Viewing users own Metrics
*A user wants to see how well they are utilizing EduCode and if EduCode has any suggestions*
1. A user completes an assignment or clicks to generate a student report.
2. The user is given a report with feedback on how often they accepted incorrect suggestions and how quickly they accepted answers
3. The user will also get a written feedback summary explaining how they can improve, or comparing their metrics to expected values or class averages.  -->