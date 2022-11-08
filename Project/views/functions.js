//array to store item ids
var orderArray = [];

//2d array to store ingredients by items
var ingredientArray = [];

//array to store order text
var orderText = [];

//array to store order text
var costArray = [];




// Function to enable a certain category of buttons on click
let enableMenuButtons = (category) => {   
  let disable = document.getElementsByClassName("button menubutton");
  
  for(let i = 0; i < disable.length; i++){
      let element = disable[i]
      element.setAttribute("hidden", "hidden")
   }
   let enable = document.getElementsByClassName("button menubutton " + category);
   for(let i = 0; i < enable.length; i++){
      let element = enable[i]
      element.removeAttribute("hidden")
   }
   categoryButtons = document.getElementsByClassName("button categorybutton");
   for(let i = 0; i < categoryButtons.length; i++){
      let element = categoryButtons[i]
      element.style.backgroundColor = "white";
      element.style.color = "maroon";
   }
   categoryButton = document.getElementsByClassName("button categorybutton " + category)[0];
   categoryButton.style.backgroundColor = "maroon";
   categoryButton.style.color = "white";
}

//adds item ids to order
let addToOrder = (orderArray, id, price, i1, i2, i3, i4, i5, i6, category, pos) => {  
   button = document.getElementById("menubutton " + category + " " + pos)
   let name = button.innerText;
   orderArray.push(id);
   let ingredients = []
   ingredients.push(i1,i2,i3,i4,i5,i6)

   ingredientArray.push(ingredients)
   
   //displays order and total
   let text = name + " $" + price
   orderText.push(text)
   costArray.push(price)

   let totalText = ''
   let totalSum = 0
   
   for(let i = 0; i <orderText.length; i++){
      totalText += orderText[i]
      totalText += '\n'
      totalSum += costArray[i]
   }
   orderArea =  document.getElementById("orderbox")
   orderArea.innerText = totalText;

   costArea =  document.getElementById("costbox")
   //adds total and rounds to 2 decimals
   costArea.innerText = "Total: $" + Math.round(totalSum * 100) / 100

}

let clearOrder = () => {
   orderArray = []
   ingredientArray = []
   orderText = []
   orderCost = 0;
   orderArea =  document.getElementById("orderbox")
   orderArea.innerText = '';
   costArea =  document.getElementById("costbox")
   costArea.textContent = "Total: $0";
}



//gets next order id and stores value
let getOrderId = () =>{
   var orderId = 0
   var q = 'select max(transactionid) from customertransactions;' ;
   fetch('/getorderid', {
      method: 'POST',
      headers: {
         Authorization: '',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         q,
      }),
   })
      .then((res) => {
         console.log(res.max)
         return res.json();
      })
      
      .then(function(data) {
         var id = parseInt(data.max) + 1
         //console.log(id);
         orderId =  id

         return orderId
        
      });
      
      
   }
//sends queries on completed transaction 
const tender = document.getElementById('tender');
tender.addEventListener('click', function(e) {
   console.log('button was clicked');
   var transactionQ = createOrderQuery(orderArray)
   //runs all queries for the transaction as one string
   
   var inventoryQ = createInventoryQuery(ingredientArray)


   runQuery(transactionQ)
   runQuery(inventoryQ)
   clearOrder();

   });

//given order ids, creates a query string to create the transaction
function createOrderQuery(orderArray){
   var allqs = '' ;
   for(var i = 0; i < orderArray.length; i++){

      let q = ''
      //gets new id if item is first in order
      if(i == 0){
         q = 'DO $$ DECLARE id bigint; DECLARE p float; BEGIN Id := (SELECT max(transactionid)+1'
      }
      //else continues on order
      else{
         q = 'DO $$ DECLARE id bigint; DECLARE p float; BEGIN Id := (SELECT max(transactionid)'
      }
      //adds necessary query info
      q += 'from customertransactions); p := (SELECT price from menuitems where itemid =' + orderArray[i] + ');'
      q += 'INSERT INTO customertransactions (transactionid,itemnum,itemid,time,price) VALUES (id,'
      q += i+1 + ',' + orderArray[i] + ',NOW(),p);END $$;';

   //adds all queries to one string
      allqs += q;
   }
   return allqs
}

function createInventoryQuery(ingredientArray){
   var allqs = '' ;
   for(var i = 0; i < ingredientArray.length; i++){

      for(var j = 0; j < ingredientArray[i].length; j++){
         id = ingredientArray[i][j]
         if(id != 0){
            allqs += 'update inventory set itemamount = itemamount - 1 where inventoryid = ' + id + ';'
         }
      }
   }
   
   return allqs
}



//given a string for a query runs a query with no return value 
function runQuery(q){
   
   fetch('/query', {
      method: 'POST',
      headers: {
         Authorization: '',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         q,
      }),
   })
   .then((res) => {
      return res.json();
   })
   .then((data) => console.log(data));
}


document.getElementById("homePage").click();
function openTab(evt, cityName) {
   // Declare all variables
   var i, tabcontent, tablinks;

   // Get all elements with class="tabcontent" and hide them
   tabcontent = document.getElementsByClassName("tabcontent");
   for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
   }

   // Get all elements with class="tablinks" and remove the class "active"
   tablinks = document.getElementsByClassName("tablinks");
   for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
   }

   // Show the current tab, and add an "active" class to the button that opened the tab
   document.getElementById(cityName).style.display = "block";
   evt.currentTarget.className += " active";
}




function addNewItem(evt) {

}

function removeItem(evt) {
   
}

function updateItem(evt) {
   
}