# Welcome to Woofoura!

Woofoura is a website where dogs can ask questions, receive answers to their questions, and post answers to another dog's questions. Based off of Quora, Woofoura makes use of Express and Sequelize on the backend, with React and Redux on the frontend.

View the live site here: https://woofoura.herokuapp.com/

## View Woofoura's
* [Feature List](https://github.com/anailopez/Woofoura/wiki/Feature-List)
* [Database Schema](https://github.com/anailopez/Woofoura/wiki/Database-Schema)
* [Redux Store Shape](https://github.com/anailopez/Woofoura/wiki/Store-Shape)
* [React Components List](https://github.com/anailopez/Woofoura/wiki/React-Components-List)
* [Frontend Routes](https://github.com/anailopez/Woofoura/wiki/Frontend-Routes)


## Techonologies Used
> * Express
> * Sequelize
> * React
> * Redux
> * Heroku


## Login Page
Upon first navigating to Woofoura, a user will be directed to the '/login' page, where they will be prompted to log in, sign up, or access the site using the demo user login.

![login](https://user-images.githubusercontent.com/96565654/176940004-d88c52b7-6963-426d-8345-b046cc0dc2f3.png)


##Signup Page
On the '/signup' page, new users can fill out a form to create an account upon successful submission.

![signup](https://user-images.githubusercontent.com/96565654/176947205-012a4dc3-466a-40ce-9b18-053c17ece256.png)


## Home Page
Once a user has logged in or signed up, they are directed to Woofoura's homepage, where they can see all of the questions made by any user, including themselves, starting from the most recent question posted. Here the user can post a new question, as well as made edits to or delete said question. From this page, users can also leave answers to any other user's question, as well as delete said answer.

![homepage](https://user-images.githubusercontent.com/96565654/176940345-645db636-c3e6-46a5-8c74-df390caf1dbb.png)


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
> * Upvotes on questions
> * Search questions
> * Reply to answers
> * Users can follow a topic 
