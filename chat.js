import {addProgressItem, toggleProgress} from './progress.js'

console.log("hello")
// import {pipeline} from "https://cdn.jsdelivr.net/npm/@huggingface/transformers";

// console.log(pipeline)
const prompt_input = document.querySelector("#prompt_input")
const load_button = document.querySelector("#load_btn")


const worker= new Worker("/worker.js", {
    type: "module",
});

let modelLoading = false
// future prep for ts
// function onMessageReceived(message: MessageEvent)
function onMessageReceived(message) {
    // console.log(message.data)


    switch (message.data.status) {
        case "initiate":
            console.log("initiate", message.data)
            addProgressItem(message.data.file)
        case "progress":
            // console.log("item: ", message.data.file, "progress: ", message.data.progress, message.data)
            break;
        case "ready":
            // console.log("model ready!")
            prompt_input.removeAttribute("disabled")
            load_button.style.display = "none"
            toggleProgress()
            console.log("generate")
            worker.postMessage({type: "generate", data: "hello"})
            break;
        case "loading":
            modelLoading = true
            // console.log(message)
            break;
        case "complete":
            console.log(message)
            break;
        case "update":
            console.log(message)
            break;
    }
}
function loadModel(e) {
    console.log("loading model")
    worker.postMessage({type: "load"})
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