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


    // Correct Answer and answer options
    let array1 = [1,2,3];
    let correct = 4;
    array1.splice(Math.floor(Math.random()*4), 0, correct);
    console.log(array1)

    const questionHTML = document.createElement('div');
    questionHTML.classList.add('col-12');

    questions.forEach(question=>{

    })
}