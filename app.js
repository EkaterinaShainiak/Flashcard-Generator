// import external modules
var fs = require("fs");
var cardBuilder = require("./card.js");
var inquirer = require("inquirer");
var cardStorageJson = require("./cards.json");
var cardsStorageObj = [];

// creating a few cards

// var firsPresidentBasic = new card.BasicCard("Who was the first president of the United States?", "George Washington");
// addBasicQuestion(firsPresidentBasic);
// var firsPresidentCloze = new card.ClozeCard("... was the first president of the United States?", "George Washington");
// addClozeQuestion(firsPresidentCloze);

// addQuestion(firsPresidentCloze);
// use npm inquirer package
// inquirer.prompt(
//     {
//         type: 'confirm',
//         name: "game",
//         message: "THIS IS A CLOZE TEST. ARE YOU READY FOR QUESTIONS?",
//         default: false
//     }
// ).then(function (err, answer) {
//     if (err) {
//         console.log(err);
//         if (!game) {return}
//         else {
//             addQuestion(firsPresidentBasic);

//         };
//     };
// });

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



    for (var i = 0; i < cardsStorageObj.length; i++) {
        inquirer.prompt(
            {
                type: 'input',
                name: 'user_answer',
                message: cardsStorageObj[i].front,
                default: false
            }
        ).then(function (err, answer) {
            if (err) {
                console.log(err);
    
            }
            console.log("test" + answer);
        });
    
    };



});
console.log(cardsStorageObj.length);



