( ($, location) => {
    /*
     *  Update the part of the table that shows the values
     *  of everything in localStorage
     */
    let updateLocalStorageTable = () => {
        let entries = localStorage.length;
        let newTableBody = '';
        let lsTable = $( "#localstorage-vals" );
        lsTable.empty();
        for(let i=0; i<entries; i=i+1){
            let myKey = localStorage.key(i);
            newTableBody += "<tr><td>" + myKey + "</td><td>" + localStorage[myKey] + "</tr>"
        }
        lsTable.append(newTableBody);
    }

    /*
     *  Update the whole table
     *  First, update the fields that don't change
     *  Then, update the values from localStorage
     */
    let updateTable = (bFullReset) => {
        if(bFullReset){
            $( "#intervals-counter" ).text(0);
            localStorage['loc-hash'] = location.hash;
        }
        $( "#form-subissions-count" ).text(localStorage['form-subs']);
        $( "#last-input-value" ).text(localStorage['last-input']);
        localStorage['loc-hash'] = location.hash;
        $( "#loc-hash" ).text(localStorage['loc-hash']);
        updateLocalStorageTable();
    }


    /*
     *  Page is ready to be modified
     *  Set localStorage values and update table
     */
    $( document ).ready(function() {
        if(!localStorage['visited']){//first time here
            localStorage['visited'] = true;
            localStorage['intervals']=0;
            localStorage['form-subs'] = 0;
            localStorage['last-input'] = '';
        }
        if(!localStorage['loc-hash']){
            localStorage['loc-hash'] = location.hash;
            }
        //set table start values
        updateTable(true);
    });


    /*
     *  Update page intervals
     *  Full interval count since first page load stored in localStorage
     *  Interval since "this" page load calculated and displayed
     */
    if(!localStorage['intervals']){localStorage['intervals'] = 0;}
    let itersOnLoad = Number(localStorage['intervals']);
    let intervalId = window.setInterval(function () {
        let iteration = Number(localStorage['intervals']);
        localStorage['intervals'] = iteration + 1;
        $( "#intervals-counter" ).text(iteration-itersOnLoad);
    }, 1500);


    /*
     *  Form submitted to add key-value pair to localStorage
     *  Check for valid form data
     *
     */
    $( "#localstorage-form" ).submit( ( event ) => {
        event.preventDefault();
        let alertBox = $("form-alert");
        let nameInput = $("#localstorage-key");
        let valInput = $("#localstorage-value");

        //reset alerts
        alertBox.addClass('hidden');
        alertBox.text('');

        let newKey = nameInput.val();
        let newVal = valInput.val();

        if (!newKey) {
            formAlert.text('You must provide a key name');
            formAlert.removeClass('hidden');
            return;
        }

        if (!newVal) {
            formAlert.text('You must provide a value name');
            formAlert.removeClass('hidden');
            return;
        }

        localStorage[newKey] = newVal;
        localStorage['last-input'] = newVal;
        let subCount = Number(localStorage['form-subs']);
        localStorage['form-subs'] = subCount + 1
        updateTable(false);

        nameInput.val('');
        valInput.val('');
    });


    /*
     *  Click button to clear localStorage
     */
    $( "#clear-storage" ).click( (event) => {
        localStorage.clear();
        updateTable(false);
    });

    /*
     *  Add a hash to url
     */
    $( "#add-hash" ).click( (event) => {
        location.hash = "joshs-hash"
        updateTable(false)
    });

    $( "#remove-hash" ).click( (event) => {
        location.hash = "";
        updateTable(false);
    });

})(jQuery, window.location);
