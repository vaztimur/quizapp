let correctAnswer;


let correctNumber = (localStorage.getItem('quiz_game_correct') ? localStorage.getItem('quiz_game_correct') : 0);
let incorrectNumber = (localStorage.getItem('quiz_game_incorrect') ? localStorage.getItem('quiz_game_incorrect') : 0);

document.addEventListener('DOMContentLoaded', ()=>{
    loadQuestion();

    eventListener();

});

function eventListener(){
    document.querySelector('#check-answer').addEventListener('click', validateAnswer);
    document.querySelector('#clear-storage').addEventListener('click', clearStorage);
}

// Loads questions from an API

loadQuestion = () =>{
    const url = 'https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=multiple';
    fetch(url)
        .then(data => data.json())
        .then(result => displayQuestion(result.results));

}

// Displays the question from API

function displayQuestion (questions) {

    const questionHTML = document.createElement('div');
    questionHTML.classList.add('col-12');

    questions.forEach(question=>{
        // take the correct answer
        correctAnswer = question.correct_answer;
        // inject the correct answer in possible answers list
        let possibleAnswers = question.incorrect_answers;
        possibleAnswers.splice(Math.floor(Math.random()*4), 0, correctAnswer);

        // add the HTML for current question
        questionHTML.innerHTML = `
            <div class="row justify-content-between heading">
                <p class="category">Category: ${question.category}</p>
                <div class="totals">
                    <span class="badge badge-success">${correctNumber}</span>
                    <span class="badge badge-danger">${incorrectNumber}</span>
                </div>
            </div>
            <h2 class="text-center">${question.question}</h2>
        `;
        
        // generate the HTML for possible answer
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('questions', 'row', 'justify-content-around', 'mt-4');
        possibleAnswers.forEach(answer => {
            const answerLi = document.createElement('li');
            answerLi.classList.add('col-12', 'col-md-5');
            answerLi.textContent = answer;

            // attaching a click event if the answer is selected
            answerLi.onclick = selectedAnswer;
            answerDiv.appendChild(answerLi);
        })
        questionHTML.appendChild(answerDiv);

        // render in the HTML
        document.querySelector('#app').appendChild(questionHTML);
    })
}

// function for selecting answer
function selectedAnswer(e){

    if (document.querySelector('.active')){
        document.querySelector('.active').classList.remove('active');
    }
    e.target.classList.add('active');

}

// function for validation the answer
function validateAnswer(){
    
   
    if(document.querySelector('.questions .active')) {  // checks if only one answer is selected

        checkAnswer();

    } else {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('alert', 'alert-danger', 'col-md-6');
        errorDiv.textContent = "Please select 1 answer";

        
        const questionsDiv = document.querySelector('.questions');
        questionsDiv.appendChild(errorDiv);

        setTimeout(()=>{
            document.querySelector('.alert-danger').remove();
        },1500)
    }
}

function checkAnswer(){
    const answer = document.querySelector('.questions .active');
    
    if (answer.textContent === correctAnswer){
        correctNumber++;
    } else {
        incorrectNumber++;
    }
    // save into Local Storage
    saveIntoStorage();
    // clear previous question
    const app = document.querySelector('#app');
    while(app.firstChild){
        app.removeChild(app.firstChild);
    }

    
    loadQuestion();
}

function saveIntoStorage(){
    localStorage.setItem('quiz_game_correct', correctNumber);
    localStorage.setItem('quiz_game_incorrect', incorrectNumber);
}

function clearStorage(){
    localStorage.setItem('quiz_game_correct', 0);
    localStorage.setItem('quiz_game_incorrect', 0);

    setTimeout(()=>{
        window.location.reload();
    }, 500);
}