let insertWords = (text, string, iterations, gap) => {
    let insertCount = 0;
    let resp = '';
    let lastStop = 0;
    for(charCount in text){
        if(insertCount === iterations){//time to stop
            return resp + text.slice(charCount, -1);
        }else{
            if( (parseInt(lastStop)+parseInt(gap) )<=charCount ){//time to insert
                resp = resp + string + text[charCount];
                lastStop = charCount;
                insertCount = insertCount + 1;
            }else{//in between inserts - just use normal letters
                resp = resp + text[charCount];
            }
        }
    }
}

let exportedMethods = {
    insertWords: insertWords
}

module.exports = exportedMethods;
