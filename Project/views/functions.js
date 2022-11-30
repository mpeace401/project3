
//array to store item ids
var orderArray = [];

//2d array to store ingredients by items
var ingredientArray = [];

//array to store order text
var orderText = [];

//array to store order text
var costArray = [];

//array to store remove buttons
var removeArray = [];
//used to display real time
/**
 * Refreshes the time displayed.
 */
function refreshTime() {
   const timeAreas = document.getElementsByClassName("time");
   const dateString = new Date().toLocaleString();
   const formattedString = dateString.replace(", ", " - ");
   for(let i = 0; i < timeAreas.length; i++){
      timeArea = timeAreas[i]
      timeArea.textContent = formattedString;
   }
 }
refreshTime()
setInterval(refreshTime, 1000);

// Function to enable a certain category of buttons on click
/**
 * Enables menu buttons
 * @param {*} category - The category of menu buttons to enable.
 */
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

/**
 * Enables topping buttons
 */
let enableToppingButtons = () => {   
   let disable = document.getElementsByClassName("button menubutton");
   
   for(let i = 0; i < disable.length; i++){
       let element = disable[i]
       element.setAttribute("hidden", "hidden")
    }
    let enable = document.getElementsByClassName("button menubutton " + 4);
    for(let i = 0; i < enable.length; i++){
       let element = enable[i]
       element.removeAttribute("hidden")
    }
      enable = document.getElementsByClassName("button menubutton " + 5);
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

 }

 /**
  * Hides menu contents and displays cart contents
  */
let goToCart = () => {   
   
   let disable = document.getElementsByClassName("menu");
   for(let i = 0; i < disable.length; i++){
      let element = disable[i]
      element.setAttribute("hidden", "hidden")
   }
   disable = document.getElementsByClassName("menubutton");
   for(let i = 0; i < disable.length; i++){
      let element = disable[i]
      element.setAttribute("hidden", "hidden")
   }
   let enable = document.getElementsByClassName("cart");
   for(let i = 0; i < enable.length; i++){
      let element = enable[i]
      element.removeAttribute("hidden")
   }
   console.log(enable.length)
}
/**
 * Hides cart contents and displays menu contents
 */
let goToMenu = () => {   
   let disable = document.getElementsByClassName("cart");
   for(let i = 0; i < disable.length; i++){
      let element = disable[i]
      element.setAttribute("hidden", "hidden")
   }
   let disable1 = document.getElementsByClassName("access");
   for(let i = 0; i < disable1.length; i++){
      let element = disable1[i]
      element.setAttribute("hidden", "hidden")
   }
   let enable = document.getElementsByClassName("menu");
   for(let i = 0; i < enable.length; i++){
      let element = enable[i]
      element.removeAttribute("hidden")
   }
   let categories = document.getElementsByClassName("button categorybutton");
   for(let i = 0; i < categories.length; i++){
      let element = categories[i]
      element.style.backgroundColor = "white";
      element.style.color = "maroon";
   }
}
/**
 * Hides menu contents and displays accessibility contents
 */
let Accessibility = () => {
   let disable = document.getElementsByClassName("menu");
   for(let i = 0; i < disable.length; i++){
      let element = disable[i]
      element.setAttribute("hidden", "hidden")
   }
   disable = document.getElementsByClassName("menubutton");
   for(let i = 0; i < disable.length; i++){
      let element = disable[i]
      element.setAttribute("hidden", "hidden")
   }
   let enable = document.getElementsByClassName("access");
   for(let i = 0; i < enable.length; i++){
      let element = enable[i]
      element.removeAttribute("hidden")
   }
   console.log(enable.length)
}

//adds item ids to order

/**
 * Adds selected item to order
 * @param {*} orderArray Array of current order
 * @param {*} id Item id to add
 * @param {*} price Item price to add
 * @param {*} i1 Ingredient 1
 * @param {*} i2 Ingredient 2
 * @param {*} i3 Ingredient 3
 * @param {*} i4 Ingredient 4
 * @param {*} i5 Ingredient 5
 * @param {*} i6 Ingredient 6
 * @param {*} category Category of item to add
 * @param {*} pos pos
 * @param {*} toppings Determines if toppings are to be displayed
 */
let addToOrder = (orderArray, id, price, i1, i2, i3, i4, i5, i6, category, pos,toppings) => {  
   button = document.getElementById("menubutton " + id)
   let txt = button.innerText.split('\n');
   let name = '';
   for(let i = 0; i < txt.length; i++){
      
      if(txt[i].charAt(0) != "$" ){
         name += txt[i]
         name += " "
      }
      
   }
   orderArray.push(id);
   
   let ingredients = []
   ingredients.push(i1,i2,i3,i4,i5,i6)

   ingredientArray.push(ingredients)
   
   //displays order and total
   let text = name + "$" + price
   orderText.push(text)
   costArray.push(price)

   var x = document.createElement("button")
   

   if(document.getElementById("side").innerText == "Server"){
      var intTop = 0 + 18.2 * removeArray.length
      var top = intTop.toString()
      x.style.top = top+ "px"
      
      
   }
   else if(document.getElementById("side").innerText == "Customer"){

      var intTop = 0 + 18.2 * removeArray.length
      var top = intTop.toString()
      x.style.top = top + "px"
      x.className += "cart ";
      x.setAttribute("hidden", "hidden")
     
   }
   x.className += "remove";
   x.innerHTML = "Remove";
   document.getElementById("removebox").appendChild(x);

  
   removeArray.push(x)

   resetLabels()
   if(toppings == 1){
      enableToppingButtons();
   }

   //checks item availability 
   var q = 'select * from inventory order by inventoryid;' ;
      fetch('/getinventorystatus', {
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
         console.log(res.inventory)
         return res.json();
      })
      
      .then(function(data) {
         var inventoryIds = data.inventory.inventoryIds
         var itemAmounts = data.inventory.itemAmounts
         for(let i = 0; i < ingredients.length; i++){
            let index = inventoryIds.indexOf(ingredients[i])
            if(index != 0){
               var count = 0;
               for(let j = 0; j <  ingredientArray.length; j++){
                  if(ingredientArray[j].includes(ingredients[i])){
                     count ++;
                  }
               }
               if(itemAmounts[index] <= count){
                  disableButtonsIngr(ingredients[i])
               }
               
            } 
         }
      });
         

}

/**
 * Clears current order
 */
let clearOrder = () => {
   orderArray = []
   ingredientArray = []
   orderText = []
   costArray = [];

   for(let i = 0; i < removeArray.length; i++){
      var x = removeArray[i]
      x.remove();
   }
   removeArray = [];
   orderCost = 0;
   orderArea =  document.getElementById("orderbox")
   orderArea.innerText = '';
   costAreas =  document.getElementsByClassName("costbox")
   
   for(let i = 0; i < costAreas.length; i++){
      costArea = costAreas[i]
      costArea.innerText = "Total: $0"
   }
   nameArea = document.getElementById("custname")
   nameArea.value =  "";
}
/**
 * Undoes previous action
 * @returns Returns void if current order is empty
 */
let undo = () => {
   if (orderArray.length == 0){
      return
   }
   orderArray.pop()
   costArray.pop()
   orderText.pop()
   ingredientArray.pop()
   removeArray[removeArray.length -1].remove()
   removeArray.pop()
   resetLabels()

}
//sets labels to match items in order arrays
/**
 * Resets and updates current order display
 */
let resetLabels = () =>{
   let totalText = ''
   let totalSum = 0
   orderArea =  document.getElementById("orderbox")
   for(let i = 0; i <orderText.length; i++){
      totalText += orderText[i]
      totalText += '\n'
      totalSum += costArray[i]

      var x = removeArray[i]
      x.onclick = function(){removeItem(i)}
   }
   
   orderArea.innerText = totalText;


   costAreas =  document.getElementsByClassName("costbox")
   //adds total and rounds to 2 decimals
   for(let i = 0; i < costAreas.length; i++){
      
      costArea = costAreas[i]
      costArea.innerText = "Total: $" + Math.round(totalSum * 100) / 100
   }
}

/**
 * Removes selected item from current order
 * @param {*} i Item to be removed
 */
let removeItem = (i) =>{
   //removes item from parallel arrays
   orderArray.splice(i,1);
   costArray.splice(i,1);
   orderText.splice(i,1);
   ingredientArray.splice(i,1);
   
   //removes and pops last remove button
   removeArray[removeArray.length -1].remove()
   removeArray.pop()

   //resets labels to match arrays
   resetLabels();

}

let disableButtonsIngr = (inventoryid)=>{


}



//gets next order id and stores value
/**
 * Gets all employee IDs
 */
let getEmployeeIds = () =>{
   if (document.getElementsByClassName("textbox staffselect").length > 0){
      
      var orderId = 0
      var q = 'select * from staff where managementlevel = \'Server\' order by staffid;' ;
      fetch('/getemployeeids', {
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
            console.log(res.staffIds)
            return res.json();
         })
         
         .then(function(data) {
            var select = document.getElementById("staffselect");
            select.innerHTML=""
            var option = document.createElement('option');
            option.text = option.value = "Please Select ID"
            select.add(option);
            for(let i = 0; i < data.staffIds.length; i++){
               var option = document.createElement('option');
               option.text = option.value = data.staffIds[i]
               select.add(option);
            }
            
            
         });
         
      
   }
   }

/**
 * Gets current order ID
 */
let getOrderId = () => { 
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
         
         orderId =  id
         document.getElementById("orderId").innerText = "Order ID: "+ orderId
         
      });
      
}

getOrderId();

//sends queries on completed transaction 
const tender = document.getElementById('tender');
tender.addEventListener('click', function(e) {

   var transactionQ = createOrderQuery(orderArray)
   //runs all queries for the transaction as one string
   
   var inventoryQ = createInventoryQuery(ingredientArray)

   runQuery(transactionQ)
   runQuery(inventoryQ)
   clearOrder();

   });

//given order ids, creates a query string to create the transaction
/**
 * Creates a list of queries to update the table of customer transactions
 * @param {*} orderArray Order to add to database
 * @returns All queries needed to update customertransactions
 */
function createOrderQuery(orderArray){
   var allqs = '' ;
   var custName = document.getElementById('custname').value
   if(custName == "Insert Name"){
      custName = ""
   }

   var staffId = ""
   if (document.getElementsByClassName("textbox staffselect").length > 0){
      let id = document.getElementById('staffselect').value
      if (!isNaN(id)){
         staffId = id
      }
      
   }

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
      q += 'INSERT INTO customertransactions (transactionid,itemnum,itemid,custname,staffid,time,price) VALUES (id,'
      q += i+1 + ',' + orderArray[i] + ',\''+ custName+ '\',' + staffId + ',NOW(),p);END $$;';

   //adds all queries to one string
      allqs += q;
   }
   return allqs
}

/**
 * Creates a list of queries to update the table of inventory items
 * @param {*} ingredientArray Array of inventory items to update
 * @returns All queries needed to update inventory
 */
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
/**
 * Runs a given query
 * @param {*} q A query to run
 */
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


//syncs scrolling with orderbox and cancelbox

var isSyncingLeftScroll = false;
var isSyncingRightScroll = false;

var orderbox = document.getElementById('orderbox');
var removebox = document.getElementById('removebox');

orderbox.onscroll = function() {
if (!isSyncingLeftScroll) {
   isSyncingRightScroll = true;
   removebox.scrollTop = this.scrollTop;
}
isSyncingLeftScroll = false;
}

removebox.onscroll = function() {
if (!isSyncingRightScroll) {
   isSyncingLeftScroll = true;
   orderbox.scrollTop = this.scrollTop;
}
isSyncingRightScroll = false;
}
