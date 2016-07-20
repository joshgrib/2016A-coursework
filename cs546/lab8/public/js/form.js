let processForm = () => {
    let text_manip = (text, string, iterations, gap) => {
        if(text.length === 0){
            throw "Source text not present"
        }
        if(string.length === 0){
            throw "Text to insert not present"
        }
        if(iterations > 25 || iterations < 1){
            throw "Iterations not in range (1-25)"
        }
        if(gap > 25 || gap < 1){
            throw "Gap not in range (1-25)"
        }
        let insertCount = 0;
        let resp = '';
        let lastStop = 0;
        for(charCount in text){
            if(insertCount === iterations){//time to stop
                resp =  resp + text.slice(charCount, -1);
                break;
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
        return resp;
    }

    var staticForm = document.getElementById("client-form");

    if (staticForm) {
        // We can store references to our elements; it's better to
        // store them once rather than re-query the DOM traversal each time
        // that the event runs.
        let text       = String(document.getElementById("source_text").value);
        let string     = String(document.getElementById("input_string").value);
        let iterations = Number(document.getElementById("iterations").value);
        let gap        = Number(document.getElementById("gap").value);

        var errorContainer   = document.getElementById("error-container");
        var errorTextElement = document.getElementById("error-text");

        var resultContainer   = document.getElementById("result-container");
        var resultTextElement = document.getElementById("result-text")

        // We can take advantage of functional scoping; our event listener has access to its outer functional scope
        // This means that these variables are accessible in our callback
        staticForm.addEventListener("submit", function (event) {
            event.preventDefault();

            try {
                console.log("Trying!");
                // hide containers by default
                errorContainer.classList.add("hidden");
                resultContainer.classList.add("hidden");

                var result = text_manip(text, string, iterations, gap);
                console.log("RESULT:");
                console.log(result);
                resultTextElement.textContent = "The result is: " + result;
                resultContainer.classList.remove("hidden");
            } catch (e) {
                var message = typeof e === "string" ? e : e.message;
                errorTextElement.textContent = e;
                errorContainer.classList.remove("hidden");
            }
        });
    }
}
