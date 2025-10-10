console.log("hello")
import {pipeline} from "https://cdn.jsdelivr.net/npm/@huggingface/transformers";

console.log(pipeline)


// Allocate a pipeline for sentiment-analysis
const pipe = await pipeline('text-generation', 'ibm-granite/granite-4.0-micro-base');
const output = await generator(text);