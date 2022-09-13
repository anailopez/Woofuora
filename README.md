# Welcome to Woofuora!

Woofuora is a website where dogs can ask questions, receive answers to their questions, and post answers to another dog's questions. Based off of Quora, Woofuora makes use of Express and Sequelize on the backend, with React and Redux on the frontend.

View the live site here: https://woofuora.herokuapp.com/

## Instructions on how to install Woofuora
After cloning Woofuora into your desired directory:
* run 'npm install' in both the backend and frontend directories to install all dependencies
* In the backend directory, and create an '.env' file based off of the example provided in the '.env.example' file
* To set up the database:
> * In the backend directory, run 'npx dotenv sequelize db:create' to create the database
> * In the backend directory, run 'npx dotenv sequelize db:migrate' and 'npx dotenv sequelize db:seed:all' to add all models and seeders into your database
* To run the app in development mode:
> * In one terminal, cd into the backend directory and run 'npm start'
> * In another terminal, cd into the frontend directory and run 'npm start'
> * With both terminals running 'npm start', navigate to 'localhost:3000'. Congrats, you've successfully installed and ran Woofuora!

## View Woofuora's:
* [Feature List](https://github.com/anailopez/Woofuora/wiki/Feature-List)
* [Database Schema](https://github.com/anailopez/Woofuora/wiki/Database-Schema)
* [Redux Store Shape](https://github.com/anailopez/Woofuora/wiki/Store-Shape)
* [React Components List](https://github.com/anailopez/Woofuora/wiki/React-Components-List)
* [Frontend Routes](https://github.com/anailopez/Woofuora/wiki/Frontend-Routes)


## Techonologies Used
> * Express
> * Sequelize
> * React
> * Redux
> * Heroku


## Login Page
Upon first navigating to Woofuora, a user will be directed to the '/login' page, where they will be prompted to log in, sign up, or access the site using the demo user login.

![login](https://user-images.githubusercontent.com/96565654/189800181-447b637f-f003-48c3-b45b-9d1bcfe4cf3f.png)

### Signup Form
Additionally on the '/login' page, new users can fill out a form to create an account upon successful submission.

![signup](https://user-images.githubusercontent.com/96565654/189800238-f4d76e85-a2ff-459f-a6e6-6dba743d0d65.png)


## Home Page
Once a user has logged in or signed up, they are directed to Woofuora's homepage, where they can see all of the questions made by any user, including themselves, starting from the most recent question posted. Here the user can post a new question, as well as made edits to or delete said question. From this page, users can also leave answers to any other user's question, as well as delete said answer.

![homepage](https://user-images.githubusercontent.com/96565654/189800297-54310acc-4f68-47c8-ae29-1fff075e959b.png)


## Create a new question
On the homepage, users can click the 'Post a new question' button to render a form. Upon successful submission of the form, users will see their new question appear on as the first question on the homepage.

![create-question](https://user-images.githubusercontent.com/96565654/189800339-aa12fefd-be18-486d-9abd-89ab707633d6.png)


## Edit or delete a question a question
On the homepage, users will see 'edit question' and 'delete question' buttons on questions that they have created. Clicking the 'edit question' button will render a form that will allow the user to make changes to their question. Upon successful submission of the form, users will see their newly-edited question appear on as the first question on the homepage.

![edit-question](https://user-images.githubusercontent.com/96565654/189800394-b65045b5-99bd-468d-a3a1-3dff3f6c0e40.png)


## Create an answer to a question
On the homepage, users will see the 'See answers' button under every question. Clicking this button will render all answers belonging to that specific question. If the question does not belong to the logged-in user, they will see the 'Leave an answer to this question' button that, when clicked, will show a form that will allow the user to create a new answer to that question. Upon successful submission of the form, users will see their new answer appear on as the first answer under that question

![create-answer](https://user-images.githubusercontent.com/96565654/189800429-f9ea9b3d-cd8a-4eb0-8cd3-a42cfb3c55b4.png)

## Spaces
Users are given the option to create or delete a space, to which they can post questions relating to that space's theme. 

![create-space](https://user-images.githubusercontent.com/96565654/189800722-3162a636-1f4b-42f4-9b73-070f9711bf82.png)

![view-space](https://user-images.githubusercontent.com/96565654/189800578-4f197af9-35de-4a4b-9bca-590f580be6d6.png)



## Technical Implementation Details
In order to have the homepage render the 'AllQuestions' component from most recently updated question, I implimented an array called 'orderedQuestions' in my questions state, which stores questions in the desired order:
```
const initialState = { orderedQuestions: [] };

const sortList = (list) => {
    return list.sort((questionA, questionB) => {
        return questionB.updatedAt - questionA.updatedAt
    });
};
```
From there, I could then access my 'orderedQuestions' array from my 'AllQuestions' component and render questions in the desired order:
```
const questionsArr = useSelector(state => state.questionDetail.questionsReducer.orderedQuestions);

{questionsArr && questionsArr.map(question => (
    <div key={question.id} className='allquestions-content' >
        {question.User && (
            <div className='user-display'>
                {question.User.icon && (
                    <img src={question.User.icon} alt='icon' />
                )}
                <h3>{question.User.username} asks:</h3>
            </div>
            )}
        <div className='question-content'>
            <h2>{question.title}</h2>
            <p>{question.description}</p>
            {question.image && (
                <img src={question.image} />
            )}
        </div>
    </div>
))}
```

## Future Features
> * Question Topics
> * Upvotes on questions
> * Search questions
> * Reply to answers
> * Users can follow a topic
