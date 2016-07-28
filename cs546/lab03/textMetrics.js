'use strict'
/*
This module will export one method, createMetrics(text)which will scan through the text ignoring case and return an object with the following information:
{
    totalLetters: total number of letters in the text,
    totalWords: total number of words in the text,
    uniqueWords: total number of unique words that appear in the text,
    longWords: number of words in the text that are 6 or more letters long,
    averageWordLength: the average number of letters in a word in the text,
    numberOfSentences: total number of sentences in the text,
    textComplexity: totalWords/numberOfSentences + (longWords x 100)/totalWords
    wordOccurrences: {
        word1: number of times that word appears in the text,
        word2: number of times that word appears in the text,
        etc...
    }
}
*/

function round_nums(fp_num){
    /*Rounds numbers bette rthan using toFixed()*/
    return Math.round(fp_num*100)/100;
}

module.exports = {
    createMetrics: (text) => {
        /*
         * Takes in a string of text and returns an object with various
         * statistics about the text
        */
        let resp = {}
        resp.numberOfSentences = text.split(/[\\.!?]/).length-1;//-1 to cut the '' off the end
        let word_count = 0;
        let unique_words = {};
        let total_letters = 0;
        let long_word_count = 0;
        text = text + '';//makes text a string
        text = text.replace(/\W/g, ' ');//remove non-alphanumeric chars
        let words = text.split(' ');
        for(let i in words){
            //the replace below might not be needed anymore
            let word = words[i].replace(/[\\.!?,':;"]/, '').toLowerCase();
            if(word.length===0)continue;
            total_letters += word.length;
            if(unique_words[word] === undefined){//if not seen yet
                unique_words[word] = 1;
            }else{//increment count
                unique_words[word] = unique_words[word] + 1;
            }
            word_count += 1;
            if(word.length >= 6){long_word_count += 1;}
        }
        let unique_word_count = 0;
        for(let key in unique_words){
            unique_word_count++;
        }
        resp.totalLetters = total_letters;
        resp.totalWords = word_count;
        resp.uniqueWords = unique_word_count;
        resp.longWords = long_word_count;
        let averageWordLength = resp.totalLetters / resp.totalWords;
        resp.averageWordLength = round_nums(averageWordLength);
        let textComplexity = resp.totalWords/resp.numberOfSentences + (resp.longWords *100)/resp.totalWords;
        resp.textComplexity = round_nums(textComplexity);
        resp.wordOccurrences = unique_words;

        return resp;
    }
}
