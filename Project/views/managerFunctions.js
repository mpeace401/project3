document.getElementById("homePage").click();
maxInvId = -1

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


function addInventoryItems() {
   insertQ = 'INSERT INTO inventory(inventoryid, stockname, itemamount) SELECT MAX(inventoryid) + 1' + ", 'new item', 0 FROM inventory;"
   runQuery(insertQ)

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
   removeQ = 'DELETE FROM inventory WHERE inventoryid =' + document.getElementById('invID').value + ';'
   runQuery(removeQ)
}

function updateItem(evt) {
   invId = document.getElementById('invID').value
   stockName = document.getElementById('invName').value
   invAmount = document.getElementById('invAmount').value
  
   
   updateQ = 'UPDATE inventory SET inventoryid=' + invId + ', stockname=' + "'" + stockName +
   "'" + ', itemamount=' + invAmount + ' WHERE inventoryid=' + invId + ';'
   runQuery(updateQ)
}

function removeMenuItem(evt) {
   menuID = document.getElementById('menuID').value
   removeQ = 'UPDATE menuitems SET active = false WHERE itemid=' + menuID + ';' 
   runQuery(removeQ)
}

function updateMenuItem(evt) {
   menuID = document.getElementById('menuID').value
   menuName = document.getElementById('menuName').value
   price = document.getElementById('menuPrice').value
   ing1 = document.getElementById('menuIng1').value
   ing2 = document.getElementById('menuIng2').value
   ing3 = document.getElementById('menuIng3').value
   ing4 = document.getElementById('menuIng4').value
   ing5 = document.getElementById('menuIng5').value
   ing6 = document.getElementById('menuIng6').value

   updateQ = 'UPDATE menuitems SET itemid=' + menuID + ', itemname=' + "'" + menuName +
   "'" + ', price=' + price + ', ingredient1=' + ing1 + ', ingredient2=' + ing2 + ', ingredient3=' + ing3 + ', ingredient4=' + ing4 + ', ingredient5=' + ing5 + ', ingredient6=' + ing6 + ' WHERE itemid=' + menuID + ';'
   runQuery(updateQ)
}

function addMenuItems(evt) {
   insertQ = 'INSERT INTO menuitems(itemid, itemname, price, ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6, category, hastoppings, active) VALUES((select max(itemid) from menuitems where itemid < 90) + 1' + ", 'new item', 0, 0, 0, 0, 0, 0, 0, 0, 0, true);"
   console.log(insertQ)
   runQuery(insertQ)
   
}

