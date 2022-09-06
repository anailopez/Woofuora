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

![login](https://user-images.githubusercontent.com/96565654/177237702-fd808070-034c-41d0-bdae-48fdddc76933.png)


## Signup Page
On the '/signup' page, new users can fill out a form to create an account upon successful submission.

![signup](https://user-images.githubusercontent.com/96565654/177238240-d8d1cc1c-8093-4aad-810b-38be64e9bbaa.png)


## Home Page
Once a user has logged in or signed up, they are directed to Woofuora's homepage, where they can see all of the questions made by any user, including themselves, starting from the most recent question posted. Here the user can post a new question, as well as made edits to or delete said question. From this page, users can also leave answers to any other user's question, as well as delete said answer.

![homepage](https://user-images.githubusercontent.com/96565654/177238376-2898c729-7c8a-4636-b568-decc98d6d90e.png)


## Create a new question
On the homepage, users can click the 'Post a new question' button to render a form. Upon successful submission of the form, users will see their new question appear on as the first question on the homepage.

![create-question](https://user-images.githubusercontent.com/96565654/177238589-1b2be64e-e0ac-4c37-aac3-1fcbeb520043.png)


## Edit or delete a question a question
On the homepage, users will see 'edit question' and 'delete question' buttons on questions that they have created. Clicking the 'edit question' button will render a form that will allow the user to make changes to their question. Upon successful submission of the form, users will see their newly-edited question appear on as the first question on the homepage.

![edit-question-button](https://user-images.githubusercontent.com/96565654/177238892-de7b31aa-9baf-4ea1-bb40-5732de636445.png)

### Editing a question

![edit-question](https://user-images.githubusercontent.com/96565654/177238931-75a7f7d5-c47f-4e4f-a840-a657e24994bb.png)


## Create an answer to a question
On the homepage, users will see the 'See answers' button under every question. Clicking this button will render all answers belonging to that specific question. If the question does not belong to the logged-in user, they will see the 'Leave an answer to this question' button that, when clicked, will show a form that will allow the user to create a new answer to that question. Upon successful submission of the form, users will see their new answer appear on as the first answer under that question

![view-answers](https://user-images.githubusercontent.com/96565654/177240872-3437760a-f16c-4849-9520-7c3ce166666d.png)

![create-answer](https://user-images.githubusercontent.com/96565654/177240939-7563d1a8-f0ec-458c-9cba-376ec666371d.png)

![answer](https://user-images.githubusercontent.com/96565654/177240946-a0c6b298-2fb7-4b72-877d-aa6325f65ff2.png)


## User profile page
From the user profile page, the logged-in user is able to see all of their posted questions and answers.

![user-profile](https://user-images.githubusercontent.com/96565654/177241904-bcf7f8f9-b313-4b16-bd2b-b572ab2ec451.png)


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
