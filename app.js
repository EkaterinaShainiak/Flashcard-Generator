// import external modules
var fs = require("fs");
var cardBuilder = require("./card.js");
var inquirer = require("inquirer");
var cardStorageJson = require("./cards.json");
var cardsStorageObj = [];
var initLives = lives = 3;

// creating a few cards

// var firsPresidentBasic = new card.BasicCard("Who was the first president of the United States?", "George Washington");
// addBasicQuestion(firsPresidentBasic);
// var firsPresidentCloze = new card.ClozeCard("... was the first president of the United States?", "George Washington");
// addClozeQuestion(firsPresidentCloze);

// addQuestion(firsPresidentCloze);


// use npm inquirer package
inquirer.prompt(
    {
        type: 'list',
        name: "choise",
        message: "THIS IS A CLOZE TEST. Do you wanr to create a new CARD or try a quiz?",
        choices: ["add a card", "answer questions"]
    }).then(function (answer, err) {
        console.log(answer);
        switch (answer.choise) {
            case "add a card":
                {

                }
                break;
            case "answer questions":
                {
                    readQuestions();
                }
                break;

        }
    }).catch(function (err) {
        console.log("err", err);
    })

// Function to write new cards into json file

// function addBasicQuestion(newQuestion) {
//     // questions.unshift(newQuestion);
//     // var newQuestion = newQuestion.front + "," + newQuestion.back + "\n";
//     front = newQuestion.front;
//     back = newQuestion.back;
//     var newQuestionObj = {
//         front: back
//     };
//     // var newQuestionJson = JSON.parse(newQuestion);
//     fs.appendFile("./cards.json", newQuestion, "utf8", function (err) {
//         if (err) throw err;
//     })
// }



// function addClozeQuestion(newQuestion) {
//     // questions.unshift(newQuestion);
//     var newQuestion = newQuestion.partial + "," + newQuestion.cloze + "\n";
//     fs.appendFile("./cards.json", newQuestion, "utf8", function (err) {
//         if (err) throw err;
//     })
// }



function readQuestions() {
    fs.readFile("./cards.json", "utf8", function (err, res) {
        if (err) throw err;
        var resJson = JSON.parse(res);

        for (var i in resJson) {
            var question = resJson[i]["question"];
            var answer = resJson[i]["answer"];
            var card = new cardBuilder.BasicCard(question, answer);
            cardsStorageObj.push(card);
        };
        console.log(cardsStorageObj);
        showCard();
    });
};
function showCard() {
    console.log(cardsStorageObj.length);

    function printLives() {
        var bar = '';
        for (var idx = 0; idx < lives; idx++) {
            bar += '💖  ';
        }
        for (var idx = 0; idx < (initLives - lives); idx++) {
            bar += '💔  ';
        }
        return bar;
    }

    // customise "when" for particular index/question
    function toContinue(idx) {
        return function (answers) {

            if (!idx) return true;
            console.log('  Checking:', answers['user_answer' + (idx - 1)], 'vs.', cardsStorageObj[idx - 1].back);
            if (lives && (answers['user_answer' + (idx - 1)] != cardsStorageObj[idx - 1].back)) {
                console.log('Wrong! Corect answer: ' + cardsStorageObj[idx - 1].back);
                lives--;
            }
            console.log("Lives:", printLives());
            return lives;
        }
    }
    // create an array of questions as expected by inquirer.prompt()
    var questions = [];
    for (var i = 0; i < cardsStorageObj.length; i++) {
        questions.push({
            type: 'input',
            name: 'user_answer' + i,
            message: cardsStorageObj[i].front,
            // using "when" to prematurely terminate flow (when returns false)
            when: toContinue(i)
        });
    }
    inquirer.prompt(questions)
        .then(function (answers, err) {
            if (err) throw err;
            if (lives) {
                toContinue(questions.length)(answers);
            }
            console.log('Lives:', lives);
            console.log('You', lives && 'WON!' || 'LOST!')
            console.log('Answers:', answers);
        })
        .catch(function (err) {
            console.log("err", err);
        })
    // ---------------------------------------------------
    // Alternative way - Replace loop to reqursion to prevent async flow:


    // function ask(idx) {
    //     inquirer.prompt(questions[idx]).then(answers => {
    //         console.log(cardsStorageObj[idx].back + ' vs. ' + answers[idx])
    //         if (idx != questions.length) {
    //             ask(idx++);
    //         }
    //     });
    // }

    // ask(0)
};
