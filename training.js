
//  const newLocal = ((arr) => { var finalArr = [], result = arr.reduce((pre, curr) => { finalArr.push(pre + curr); return pre + curr; }, 0); return finalArr; })([1, 2, 3, 4, 5]);

//  const newLocal = (arr => arr.reduce((sum, current, index, arr) => sum.push(arr.slice(0, index + 1).reduce((sum, current) => current + sum, 0)) && sum, []))([1, 2, 3, 4, 5]);

var body = document.body;
     makeStyle(body, bodyP);
     var h1 = document.createElement('h1');
     h1.appendChild(document.createTextNode('Search machine'))
     makeStyle(h1, h1StartP);
     body.appendChild(h1);

  var form = document.createElement('form');

     var inputField = document.createElement('input');
     inputField.id = 'inputId';
     inputField.autocomplete = 'off';
     makeStyle(inputField, inputFieldP);
     body.appendChild(inputField);

 var counterTables = 0;
// Input transference data
//new event
inputField.addEventListener('change', dataSearch);

// Data transference to request
function dataSearch(){
    if(!inputField.value){
        return console.log('Please fill the field correctly');
    }
    var div1 = document.createElement('div');
    makeStyle(div1, div1P);

    var h3 = document.createElement('h3');
     h3.appendChild(document.createTextNode('Search - ' + inputField.value));
     div1.appendChild(h3);

     var buttonD = document.createElement('button');
     buttonD.appendChild(document.createTextNode('Delete'))
     makeStyle(buttonD, buttonDP);
     div1.appendChild(buttonD);

     buttonD.addEventListener("click", function(){
         
        body.removeChild(document.getElementById('tableId'));
        div1.removeChild(buttonD);
        div1.removeChild(h3);
        if(document.getElementById('tableId') == null){
            h1.style.marginTop = '255px';
        }
     })

    body.appendChild(div1);

     createRequest(inputField.value);
     inputField.value = "";
}

// Create request
function createRequest(question){
    if(question) {
        var key = "AIzaSyDcb7RF6xm_Wma4MFRfdPZ7GuNYy7ha0qI",
            engineId = "011851895572920026093:og7uyxntu5g",
                clientUrl = "https://www.googleapis.com/customsearch/v1";
        var reqUrl = clientUrl + "?key=" + key + "&cx=" + engineId + "&q=" + question;
       var result = httpGet(reqUrl);
       var some = JSON.parse(result);
       console.log(some);
       var items = some.items;
       var itemLinks = [];
       var itemTitle = [];
    for (var i = 0; i < items.length; i++) {
        itemLinks.push(items[i].link);
        itemTitle.push(items[i].title);
    }
   var arrForFront = [];
   arrForFront.push(itemLinks);
   arrForFront.push(itemTitle);
 makeFront(arrForFront);
    }
}

//getData from google api search
function httpGet(url) {
    var obj = {};
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var bodyReq = xhr.responseText;
        obj = bodyReq;
    } else {
      console.error('Must be day limit of keysearch');
    }
};
xhr.send();
return obj;
}


// Create TABLE 
 function makeFront(arr){
//Before generation table change style input(to top)
  h1.style.marginTop = '0';
//


var table = document.createElement("table");
makeStyle(table, tableP);
table.id = 'tableId' + counterTables;
body.appendChild(table);
    counterTables++;

    for(var j = 0; j < arr[0].length; j++){
    var row = document.createElement('tr');

    var cell = document.createElement('td');
    cell.appendChild(document.createTextNode(j + 1));
    makeStyle(cell, cellP);
    row.appendChild(cell);

        var cell1 = document.createElement('td');
        cell1.appendChild(document.createTextNode(arr[1][j]));
        makeStyle(cell1, cell12P);
        cell1.id = j+'id' + counterTables;
        // cell1.addEventListener('mouseenter', function (){
        //     var div2 = document.createElement('div');
        //     makeStyle(div2, div2P);
        //     cell1.appendChild(div2);
        // })
    row.appendChild(cell1);

        var cell2 = document.createElement('td');
            var link = document.createElement('a');
            link.href = arr[0][j];
            link.appendChild(document.createTextNode(arr[0][j].substring(0,100)));
            makeStyle(link, linkP);
        cell2.appendChild(link);
        makeStyle(cell2, cell12P);
    row.appendChild(cell2);

    makeStyle(row, rowP);
table.appendChild(row);
    }
    
    table.lastChild.style.border = 'none';
    console.log(counterTables);
 }

 //Styles
 function makeStyle(element, params){
     for(var key in params){
        element.style[key] = params[key];
     }
 }

