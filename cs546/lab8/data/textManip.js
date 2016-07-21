let insertWords = (text, string, iterations, gap) => {
    if(text.length === 0){
        return Promise.reject("Source text not present");
    }
    if(string.length === 0){
        return Promise.reject("Text to insert not present");
    }
    if(iterations > 25 || iterations < 1){
        return Promise.reject("Iterations not in range (1-25)");
    }
    if(gap > 25 || gap < 1){
        return Promise.reject("Gap not in range (1-25)");
    }
    let insertCount = 0;
    let resp = '';
    let lastStop = 0;
    for(charCount in text){
        if(insertCount === iterations){//time to stop
            return Promise.resolve(resp + text.slice(charCount, -1));
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
    return Promise.resolve(resp);//reached end of text before all inserts
}

let exportedMethods = {
    insertWords: insertWords
}

module.exports = exportedMethods;
