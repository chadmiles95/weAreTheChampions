// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from 
"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"  

const appSettings = { 
    databaseURL: "https://wearethechampions-eedea-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app) 
let endorsementsEl = document.getElementById("endorsements")
const endorsementsInDB = ref(database, "endorsements") 
const userInput = document.getElementById("userInput")
const button = document.getElementById("publishButton")


button.addEventListener("click", function(){
    let inputValue = userInput.value
    
    push(endorsementsInDB, inputValue)
    
    clearInputField()
    
    userInput.value = ""
})

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearEndorsementsEl()
    for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemEndorsementsEl(currentItem)
        }    
    } else {
        endorsementsEl.innerHTML = "No endorsements here... yet"
    }
})

    function clearEndorsementsEl() {
    endorsementsEl.innerHTML = ""
}

function clearInputField(){
    userInput.innerHTML = ""
}

function appendItemEndorsementsEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    endorsementsEl.append(newEl)
}