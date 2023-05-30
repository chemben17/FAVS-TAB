let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    
    render(myLeads);
}
// console.log(leadsFromLocalStorage);
/* if i were the designer, i will have a button to request for the tab using the chrome API, then i will now use the SAVETAB button to save it in the array and render it. */

tabBtn.addEventListener("click", function () {
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        inputEl.value = tabs[0].url
        // myLeads.push(tabs[0].url)
        // localStorage.setItem("myLeads", JSON.stringify(myLeads))
        // render(myLeads);
    })
})

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    ulEl.innerHTML = ""
})
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    // prompt("What is your name");
    render(myLeads)
    console.log(localStorage.getItem("myLeads"));
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems    
}
