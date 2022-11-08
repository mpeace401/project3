var orderArray = [];

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

//sends queries on completed transaction 
const tender = document.getElementById('tender');
tender.addEventListener('click', function(e) {
  console.log('button was clicked');
  
  e.preventDefault();
      fetch('/tender', {
         method: 'POST',
         headers: {
            Authorization: '',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            orderArray,
         }),
      })
         .then((res) => {
            return res.json();
         })
         .then((data) => console.log(data));
   });

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