let textManip = (text, string, iterations, gap) => {
    if( (typeof iterations) !== 'number'){
        throw `ERROR`;
    }

    if( (typeof iterations) !== 'number'){
        throw `ERROR`;
    }
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
    textManip: textManip
}

module.exports = exportedMethods;

/*
let str1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus augue urna. Nam in turpis sapien. Pellentesque vehicula augue quis vehicula egestas. Phasellus non iaculis justo, eget cursus purus. Ut id ante vel elit maximus ullamcorper a pretium erat. Nullam pharetra rutrum velit, quis commodo felis gravida a. Aliquam justo dolor, blandit sed turpis ultrices, tempus aliquam eros. Nulla sollicitudin, lorem a mattis tincidunt, ligula mi cursus nisi, a laoreet metus erat non libero.';
let str2 = 'HELLOHELLO'
console.log(textManip(str1, str2, 5, 7));
*/
