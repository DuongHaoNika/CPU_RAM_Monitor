// const inputValue = document.getElementById('title')
const btn = document.getElementById('btn')
const cpuInput = document.getElementById('cpu')
const ramInput = document.getElementById('ram')

window.api.onUpdate((cpu) => {
    cpuInput.innerHTML = cpu
})

window.api.onUpdateRam((ram) => {
    ramInput.innerHTML = ram
})

function systemInfo(){
    window.api.checkCpu()
    window.api.checkRam()
}

setInterval(systemInfo, 500)