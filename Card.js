function BasicCard(front, back) {
    this.front =  front,
    this.back = back
};

function ClozeCard(text, cloze){
    this.cloze  =cloze,
    this.partial = text,
    this.fullText = function(){
        return this.close + this.partual
    }
};

module.exports = {
    BasicCard: BasicCard,
    ClozeCard: ClozeCard
};
