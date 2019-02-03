let correctAnswer;

document.addEventListener('DOMContentLoaded', ()=>{
    loadQuestion();

});

// Loads questions from an API

loadQuestion = () =>{
    const url = 'https://opentdb.com/api.php?amount=1';
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


            answerDiv.appendChild(answerLi);
        })
        questionHTML.appendChild(answerDiv);

        // render in the HTML
        document.querySelector('#app').appendChild(questionHTML);
    })
}