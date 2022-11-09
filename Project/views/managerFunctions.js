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

function addNewItem(evt) {

}

function removeItem(evt) {
   
}

function updateItem(evt) {
   
}