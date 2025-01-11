let darkmode=localStorage.getItem('darkmode')
const themeSwitch=document.getElementByID('mode-switch')

const enableDarkmode=()=> {
    document.body.classlist.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

const disableDarkmode=()=> {
    document.body.classlist.remove('darkmode')
    localStorage.setItem('darkmode', 'null')
}

if(darkmode ==='active') enableDarkmode()

modeSwitch.addEventListener("click", () =>) {
  darkmode= localStorage.getItem('darkmode)
  darkmode !== "active" ?, enableDarkmode() : disableDarkmode() 
}
