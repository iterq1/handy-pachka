function setWidth(element, width) {
    element.style.maxWidth = width;
    element.style.width = width;
}


// // Select the node that will be observed for mutations
// const targetNode = document;

// // Options for the observer (which mutations to observe)
// const config = {
//     attributes: true,
//     childList: true,
//     subtree: true,
// };

// // Callback function to execute when mutations are observed
// const callback = (mutationList, observer) => {
//     for (const mutation of mutationList) {
//         console.log("MUTATION:", mutation);
//         if (mutation.target.className == "css-q53huh") {
//                 let outer = document.querySelector("div#root nav+div+div");
//                 console.log('hey here', outer);

//                 let middle = outer.querySelector("div");
//                 let inner = middle.querySelector("div");
//                 console.log(middle, inner);
                
//                 setWidth(outer, "550px");
//                 setWidth(middle, "550px");
//                 setWidth(inner, "550px");
//         }
//     }
// };

// // Create an observer instance linked to the callback function
// const observer = new MutationObserver(callback);

// // Start observing the target node for configured mutations
// observer.observe(targetNode, config);

// document.addEventListener("DOMContentLoaded", function(e) {
//     let outer = document.querySelector("div#root nav+div+div");
//     console.log('hey here', outer);

//     let middle = outer.querySelector("div");
//     let inner = middle.querySelector("div");
//     console.log(middle, inner);

//     setWidth(outer, "550px");
//     setWidth(middle, "550px");
//     setWidth(inner, "550px");
// });

// setTimeout(() => {
//     let messageAuthorBlock = document.querySelectorAll("div#root nav+div div[id^=\"message\"] .css-1c1do5z");
//     console.log(messageAuthorBlock);
//     console.log('here!')
// }, 3000)

let contextMenuEventPath = null;

window.addEventListener('contextmenu', (event) => {
    contextMenuEventPath = event.composedPath();
});

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {

        if (request === 'copyChatMessageLink') {
            let elMessage = contextMenuEventPath.find(element => element.id != null && element.id.startsWith('message'))
            let elChatMessages = document.querySelector("div#root nav+div");
        
            if (elMessage && elChatMessages.contains(elMessage)) {
                let messageId = elMessage.id.split('message')[1];
                let linkToChatMessage = `${location.origin}${location.pathname}?message=${messageId}`;

                navigator.clipboard.writeText(linkToChatMessage).then(
                    () => {console.log('succeed')},
                    () => {console.log('failed')}
                );
        }    
        sendResponse('done');
        contextMenuEventPath = null;
    }
});