// import external modules
var fs = require("fs");
var card = require("./card.js");
var inquirer = require("inquirer");


// creating a few cards
var firsPresidentBasic = new card.BasicCard("Who was the first president of the United States?", "George Washington");
addBasicQuestion(firsPresidentBasic);
var firsPresidentCloze = new card.ClozeCard("... was the first president of the United States?", "George Washington");
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

fs.appendFile("./cards.txt", "test", "utf8", function (err) {
    if (err) throw err;

});

function addBasicQuestion(newQuestion) {
    // questions.unshift(newQuestion);
    var newQuestion = newQuestion.front + "," + newQuestion.back + "\n";
    fs.appendFile("./cards.txt", newQuestion, "utf8", function (err) {
        if (err) throw err;
    })
}




