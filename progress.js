const progress_wrapper = document.querySelector("#progress_wrapper")

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  const value = (bytes / Math.pow(k, i)).toFixed(decimals);
  return `${value} ${sizes[i]}`;
}

export function addProgressItem(fname) {
    const item = document.createElement("div")
    
    item.classList.add("progress_bar")
    item.setAttribute("data-file", fname)
    item.setAttribute("data-progress","0%")
    item.style.setProperty("--progress", "0%")
    progress_wrapper.appendChild(item)
}

export function setProgress(data) {
    const {file, progress, total} = data
    const item = document.querySelector(`[data-file="${file}"]`);
    
    if (!item.style.getPropertyValue("--total")) {
        item.setAttribute("data-total", formatBytes(total))
    }
    
    item.style.setProperty("--progress", progress + "%")
    item.setAttribute("data-progress", progress.toString().slice(0, 4) + "%")
}
export function toggleProgress(){
    progress_wrapper.toggleAttribute("disabled")
    if (progress_wrapper.classList.contains("hidden")) {
        progress_wrapper.classList.toggle("hidden")

    } else {
        progress_wrapper.classList.add("hidden")
        // children are not needed anymore
        while (progress_wrapper.firstChild) {
            progress_wrapper.removeChild(progress_wrapper.firstChild);
        } 
    }
}