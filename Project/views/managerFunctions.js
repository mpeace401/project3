document.getElementById("homePage").click();

/**
 * Opens designated tab
 * @param {*} evt Event associated with opening a tab
 * @param {*} tabName Name of tab to open
 */
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

/**
 * Opens a designated report
 * @param {*} evt Event associated with opening a tab
 * @param {*} tabName Name of report to open
 */
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

 /**
  * Runs a query
  * @param {*} q Query to run
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

/**
 * Displays inventory items
 * @param {*} evt Event associated with displaying inventory items
 * @param {*} inventoryID Item in inventory to display
 * @param {*} amount Amount of item in inventory
 */
function displayinventoryItem(evt, inventoryID, amount) {
   const inventoryElement = document.getElementById(inventoryID);
   var subbuttons = document.getElementsByClassName('subbutton')
   for(let i = 0; i < subbuttons.length; i++){
      let button = subbuttons[i]
      button.disabled = true
      button.style.cursor = "not-allowed"

   }
   
   var q = 'select * from inventory where inventoryid =' + inventoryID + ";" ;
   fetch('/getinventoryinfo', {
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
         console.log(res.item)
         return res.json();
      })
      
      .then(function(data) {
         var item = data.item;
         document.getElementById('invID').value = item.id
         document.getElementById('invName').value = item.name
         document.getElementById('invAmount').value = item.amount
         for(let i = 0; i < subbuttons.length; i++){
            let button = subbuttons[i]
            button.disabled = false
            button.style.cursor = "auto"
      
         }
      });
}

/**
 * Adds new item to inventory
 */
function addInventoryItems() {
   insertQ = 'INSERT INTO inventory(inventoryid, stockname, itemamount) SELECT MAX(inventoryid) + 1' + ", 'new item', 0 FROM inventory;"
   runQuery(insertQ)

}

/**
 * Displays menu items
 * @param {*} evt Event associated with displaying menu items
 * @param {*} itemid Item in menu to display
 * @param {*} price Price of item to display
 * @param {*} ingredient1 Ingredient 1
 * @param {*} ingredient2 Ingredient 2
 * @param {*} ingredient3 Ingredient 3
 * @param {*} ingredient4 Ingredient 4
 * @param {*} ingredient5 Ingredient 5
 * @param {*} ingredient6 Ingredient 6
 */
function displayMenuItems(evt, itemid, price, ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6) {
   const menuElement = document.getElementById('m' + itemid)

   var subbuttons = document.getElementsByClassName('subbutton')
   for(let i = 0; i < subbuttons.length; i++){
      let button = subbuttons[i]
      button.disabled = true
      button.style.cursor = "not-allowed"

   }

   
   var q = 'select * from menuitems where itemid =' + itemid + ";" ;
   fetch('/getmenuinfo', {
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
         console.log(res.item)
         return res.json();
      })
      
      .then(function(data) {
         var item = data.item;
         document.getElementById('menuID').value = item.id
         document.getElementById('menuName').value  = item.name
         document.getElementById('menuPrice').value = item.price
         document.getElementById('menuIng1').value = item.i1
         document.getElementById('menuIng2').value = item.i2
         document.getElementById('menuIng3').value = item.i3
         document.getElementById('menuIng4').value = item.i4
         document.getElementById('menuIng5').value = item.i5
         document.getElementById('menuIng6').value = item.i6
         for(let i = 0; i < subbuttons.length; i++){
            let button = subbuttons[i]
            button.disabled = false
            button.style.cursor = "auto"
      
         }
      });
}

/**
 * Removes an item from inventory
 * @param {*} evt Event associated with removing an inventory item
 */
function removeItem(evt) {
   removeQ = 'DELETE FROM inventory WHERE inventoryid =' + document.getElementById('invID').value + ';'
   runQuery(removeQ)
}

/**
 * Updates item in inventory with given values
 * @param {*} evt Event associated with updating an item
 */
function updateItem(evt) {
   invId = document.getElementById('invID').value
   stockName = document.getElementById('invName').value
   invAmount = document.getElementById('invAmount').value
  
   
   updateQ = 'UPDATE inventory SET inventoryid=' + invId + ', stockname=' + "'" + stockName +
   "'" + ', itemamount=' + invAmount + ' WHERE inventoryid=' + invId + ';'
   runQuery(updateQ)
}

/**
 * Removes an item from the menu
 * @param {*} evt Event associated with removing an item from the menu
 */
function removeMenuItem(evt) {
   menuID = document.getElementById('menuID').value
   removeQ = 'UPDATE menuitems SET active = false WHERE itemid=' + menuID + ';' 
   runQuery(removeQ)
}

/**
 * Updates item in menu with given values
 * @param {*} evt Event associated with updating a menu item
 */
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
 


   console.log()
   updateQ = 'UPDATE menuitems SET itemid=' + menuID + ', itemname=' + "'" + menuName +
   "'" + ', price=' + price + ', ingredient1=' + ing1 + ', ingredient2=' + ing2 + ', ingredient3=' + ing3 + ', ingredient4=' + ing4 + ', ingredient5=' + ing5 + ', ingredient6=' + ing6 + ' WHERE itemid=' + menuID + ';'
   console.log(updateQ)
   runQuery(updateQ)

}

/**
 * Adds an item to the menu
 * @param {*} evt Event associated with adding a new menu item
 */
function addMenuItems(evt) {
   insertQ = 'INSERT INTO menuitems(itemid, itemname, price, ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6, category, hastoppings, active) VALUES((select max(itemid) from menuitems where itemid < 90) + 1' + ", 'new item', 0, 0, 0, 0, 0, 0, 0, 0, 0, true);"
   console.log(insertQ)
   runQuery(insertQ)
   
}

/**
 * Gets the sales report
 * @param {*} evt Event associated with getting the sales report
 */
function getSalesReport(evt) { //TODO: get rid of start and end time bc sales only needs a date
   startDate = document.getElementById('salesStartDate').value
   startTime = document.getElementById('salesStartTime').value
   endDate = document.getElementById('salesEndDate').value
   endTime = document.getElementById('salesEndTime').value

   q = 'SELECT itemid, COUNT(itemid), SUM(price) FROM customertransactions WHERE DATE(time) >= ' + "'" + startDate + " " + startTime + "'" + ' AND DATE(time) <= ' +
   "'" + endDate + " " + endTime + "'" + 'AND itemid < 90 GROUP by itemid;'

   // q = "SELECT itemid, COUNT(itemid), SUM(price) FROM customertransactions WHERE DATE(time) >= '2022-09-09 10:01:08' AND DATE(time) <= '2022-09-09 10:09:34' AND itemid < 90 GROUP by itemid;"

   fetch('/getSalesReport', {
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
         console.log(res.itemIds)
         return res.json();
      })
      
      .then(function(data) {

         for (let i = 0; i < data.itemIds.length; i++) {
            var x = document.createElement("button")
            x.innerHTML = data.itemIds[i].itemid + " " + data.itemIds[i].count + " " + data.itemIds[i].sum
            document.getElementById("Sales").appendChild(x);
         }

      });
}


