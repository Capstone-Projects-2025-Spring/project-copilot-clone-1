---
sidebar_position: 5
---

# Use-case descriptions
## Use Case 1 – Limiting Code Suggestions
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
3. The user will also get a written feedback summary explaining how they can improve, or comparing their metrics to expected values or class averages. 