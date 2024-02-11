/**
 * A function which removes YouTube Shorts from the UI page on YouTube browser
 * @param {*} null 
 */
function removeShorts() {
    let shorts = document.body.querySelectorAll("ytd-reel-shelf-renderer");
    shorts.forEach(short => short.remove());
    console.log("The shorts have been removed!");
}

/**
 * A function which updates the localstorage on the content side
 * @param {*} null 
 */
function UpdateLocalStorage(state) {
    // Save the toggle state in the LocalStorage
    localStorage.setItem("LastToggleState", state)
}

/**
 * A function which sets up a MutationObserver to watch for changes in the YouTube UI
 * @param {*} null 
 */
function SetUpObserver(){
    const observer = new MutationObserver(() =>{
        removeShorts()
    })

    observer.observe(document.body, { childList: true, subtree: true });
}


// Grab the last state from the LocalStorage
const lastToggleState = localStorage.getItem("LastToggleState")
console.log(lastToggleState)
// If the state is checked, remove the YouTube shorts
if(lastToggleState === "checked"){
    SetUpObserver()
}

chrome.runtime.onMessage.addListener(function (message){
    if(message.action === 'checked'){
        /*
        Since elements in YouTube are dynamically loaded, we will use a MutationObserver
        to monitor for any changes to the page. If the page is dynamically changed,
        the removeShorts() will be called.
        */
        SetUpObserver();
    } 
    else if(message.action == "unchecked"){
        location.reload()
    }

    UpdateLocalStorage(message.action)
    
})