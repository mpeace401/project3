document.getElementById("homePage").click();

function openTab(evt, tabName) {
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
   document.getElementById(tabName).style.display = "block";
   evt.currentTarget.className += " active";
}

function openReport(evt, tabName) {
    // Declare all variables
    var i, reportContent, reportTab;
 
    // Get all elements with class="reportContent" and hide them
    reportContent = document.getElementsByClassName("reportContent");
    for (i = 0; i < reportContent.length; i++) {
        reportContent[i].style.display = "none";
    }
 
    // Get all elements with class="reportTab" and remove the class "active"
    reportTab = document.getElementsByClassName("reportTab");
    for (i = 0; i < reportTab.length; i++) {
        reportTab[i].className = reportTab[i].className.replace(" active", "");
    }
 
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
 }

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

function displayinventoryItem(evt, inventoryID, amount) {
   const inventoryElement = document.getElementById(inventoryID);
   document.getElementById('invID').value = inventoryID
   document.getElementById('invName').value = inventoryElement.innerText
   document.getElementById('invAmount').value = amount
}

function addMenuItems(evt, inventoryID, amount) {
   
}

function displayMenuItems(evt, itemid, price, ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6) {
   const menuElement = document.getElementById('m' + itemid)
   document.getElementById('menuID').value = itemid
   document.getElementById('menuName').value = menuElement.innerText
   document.getElementById('menuPrice').value = price
   document.getElementById('menuIng1').value = ingredient1
   document.getElementById('menuIng2').value = ingredient2
   document.getElementById('menuIng3').value = ingredient3
   document.getElementById('menuIng4').value = ingredient4
   document.getElementById('menuIng5').value = ingredient5
   document.getElementById('menuIng6').value = ingredient6
}

function removeItem(evt) {
   removeQ = 'DELETE FROM inventory WHERE inventoryid =' + document.getElementById('inventoryID').value + ';'
   runQuery(removeQ)
}

function updateItem(evt) {
   
}