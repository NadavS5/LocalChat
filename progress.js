const progress_wrapper = document.querySelector("#progress_wrapper")

export function addProgressItem(fname) {
    //TODO
    const item = document.createElement("div")
    item.setAttribute("data-file", fname)
    progress_wrapper.appendChild(item)
}

export function setProgress({file, progress, total}) {
    //if current.total_bytes = None
}
export function toggleProgress(){
    progress_wrapper.toggleAttribute("disabled")
}