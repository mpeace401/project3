var orderArray = [];
var orderId;


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
let addToOrder = (orderArray, id) => {  
   orderArray.push(id);
}

let clearOrder = () => {
   orderArray = []
}

let submitOrder = () => {
   for(let i = 0; i < orderArray.length; i++){
      console.log(orderArray[i])
   }
   
   clearOrder()
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
   var allqs = '' ;

   for(var i = 0; i < orderArray.length; i++){
   //adds each item with hard coded transactionid val
   let q = 'INSERT INTO customertransactions (transactionid, itemnum, itemid, time) values (5001,'
   q += i+1 + ',' + orderArray[i] + ',NOW());';

   allqs += q;


   }
   //used for checking query
   
   runQuery(allqs)
   clearOrder();
   var q = allqs

   });

//given a string for a query runs a query with no return value 
function runQuery(q){
   console.log(q);
   
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