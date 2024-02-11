// Set up an event listener to listen to changes to the button
let state = ""
const toggle = document.getElementById("Toggle")

// Grab the last state from the LocalStorage
const lastToggleState = localStorage.getItem("LastToggleState")
console.log("The stored state is "+ lastToggleState)

// Send the last known state to the content only if it is in the checked state
if(lastToggleState === "checked"){
    // Set the checked variable to true in order to reflect it in the UI
    toggle.checked = true
}


toggle.addEventListener("change", async function(){

    if(toggle.checked){
        state = "checked"
    }
    else{
        state = "unchecked"
    }
    // Send the message to the content script
    SendMessageToContentScript(state)

    console.log("The message has been successfully sent to the content script!")
    
    // Save the toggle state in the LocalStorage
    localStorage.setItem("LastToggleState", state)

    console.log("The state that was just set is "+ state )
})

/**
 * A function which send a message to the content script. It's an asynchronous function
 * @param {*} state 
 */
async function SendMessageToContentScript(state){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: state})
    })
}

