

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

let addToOrder = (orderArray, id, price, i1, i2, i3, i4, i5, i6, category, pos,toppings) => {  
   button = document.getElementById("menubutton " + category + " " + pos)
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
      var intTop = 115 + 18 * removeArray.length
      var top = intTop.toString()
      x.style.top = top+ "px"
      
   }
   else if(document.getElementById("side").innerText == "Customer"){

      var intTop = 106 + 18 * removeArray.length
      var top = intTop.toString()
      x.style.top = top + "px"
      x.className += "cart ";
      x.setAttribute("hidden", "hidden")
   }
      
   

   x.className += "remove";
   x.innerHTML = "Remove";
   document.body.appendChild(x);
   removeArray.push(x)

   resetLabels()

}

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
   nameArea.value = 'Insert Name';
}
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
let resetLabels = () =>{
   let totalText = ''
   let totalSum = 0

   for(let i = 0; i <orderText.length; i++){
      totalText += orderText[i]
      totalText += '\n'
      totalSum += costArray[i]

      var x = removeArray[i]
      x.onclick = function(){removeItem(i)}
      
   }
   orderArea =  document.getElementById("orderbox")
   orderArea.innerText = totalText;

   costAreas =  document.getElementsByClassName("costbox")
   //adds total and rounds to 2 decimals
   for(let i = 0; i < costAreas.length; i++){
      
      costArea = costAreas[i]
      costArea.innerText = "Total: $" + Math.round(totalSum * 100) / 100
   }
}

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


//gets next order id and stores value
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
getEmployeeIds();
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