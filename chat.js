import {addProgressItem, setProgress, toggleProgress} from './progress.js'

console.log("hello")
// import {pipeline} from "https://cdn.jsdelivr.net/npm/@huggingface/transformers";

// console.log(pipeline)
const prompt_input = document.querySelector("#prompt_input")
const load_button = document.querySelector("#load_btn")


const worker= new Worker("worker.js", {
    type: "module",
});

let modelLoading = false
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
            const messages = [
                {"role": "system", "content": "You are a friendly chatbot who always responds in the style of a pirate",},
                {"role": "user", "content": "write me a basic python code"},
            ]   
            worker.postMessage({type: "generate", data: messages})
            break;
        case "loading":
            modelLoading = true
            // console.log(message)
            break;
        case "complete":
            //toggle send button
            break;
        case "update":
            // message.data.output contains numtokens and tps
            console.log(message.data.output)
            break;
    }
}
function loadModel(e) {
    console.log("loading model")
    worker.postMessage({type: "load"})
    toggleProgress()
}

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
