import {addProgressItem, setProgress, toggleProgress} from './progress.js'

console.log("welcome to LocalChat")
// import {pipeline} from "https://cdn.jsdelivr.net/npm/@huggingface/transformers";

// console.log(pipeline)
const prompt_input = document.querySelector("#prompt_input")
const load_button = document.querySelector("#load_btn")

let message_history = [
        {"role": "system", "content": "You are a friendly chatbot who always responds in the style of a pirate",},
]
let generating = false

const worker= new Worker("worker.js", {
    type: "module",
});

let modelLoading = false
let current_message = ""
// future prep for ts
// function onMessageReceived(message: MessageEvent)
function onMessageReceived(message) {
    // console.log(message.data)


    switch (message.data.status) {
        case "initiate":
            addProgressItem(message.data.file)
            break;
        case "progress":
            // console.log("item: ", message.data.file, "progress: ", message.data.progress, message.data)
            setProgress(message.data)
            break;
        case "ready":
            // console.log("model ready!")
            prompt_input.removeAttribute("disabled")
            load_button.style.display = "none"  
            toggleProgress()
            console.log("ready")
            
            
            break;
        case "loading":
            modelLoading = true
            // console.log(message)
            break;
        case "complete":
            //toggle send button
            generating = false
            message_history.push({"role": "asistant", "content": current_message})
            current_message = ""
            break;
        case "update":
            // message.data.output contains numtokens and tps
            console.log(message.data.output)
            current_message += message.data.output
            break;
    }
}
function loadModel(e) {
    console.log("loading model")
    worker.postMessage({type: "load"})
    toggleProgress()
}



function send_message(event) {
    if(!generating) {
        message_history.push({"role": "user", "content" : document.querySelector("#prompt_input").value})
        worker.postMessage({type: "generate", data: message_history})
        generating = true
    }
}
document.addEventListener("keydown", (e) => {if(e.key === 'Enter') send_message(e)});



load_button.addEventListener("click", loadModel)


worker.addEventListener("message", onMessageReceived);
worker.postMessage({ type: "check" }); // Do a feature check



// // Allocate a pipeline for sentiment-analysis
// const generator = await pipeline('text-generation', 'onnx-community/Qwen2.5-0.5B-Instruct',{ dtype: "q4", device: "webgpu" })
// console.log("generating")
// const output = await generator("hello");
// console.log(output)
// const input = document.querySelector("#prompt_input")
// console.log(input)
// console.log(input)
