function CloseCard(text, cloze){
    this.cloze  =cloze,
    this.partial = text,
    this.fullText = function(){
        return this.close + this.partual
    }
}
module.export = CloseCard;