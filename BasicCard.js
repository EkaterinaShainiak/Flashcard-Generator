function BasicCard(front, back) {
    this.front =  front,
    this.back = back
};

function CloseCard(text, cloze){
    this.cloze  =cloze,
    this.partial = text,
    this.fullText = function(){
        return this.close + this.partual
    }
};
var firsPresidentBasic = new BasicCard("Who was the first president of the United States?", "George Washington");

console.log(firsPresidentBasic);
module.exports = {
    BasicCard: BasicCard,
    CloseCard: CloseCard
};
