// BEGIN INITAL PAGE SET UP

function getTimeNow() {
    const dayjs = require('dayjs')
    let now = new Date();   
    let time = dayjs(now).format("hh:mm:ss")  
    return time
}
    
function getTimeZone() {
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return timezone
}

function getDate() {
    const dayjs = require('dayjs')
    let now = new Date();   
    let date = dayjs(now).format("dddd, D MMMM, YYYY") 
    return date
}

function createH3ElementForTimeZone(data) {
    let h3 = document.createElement('h3')
    h3.className = "dynapuff"

    let editButton = document.createElement('button')
    editButton.id = "editBtn"
    editButton.addEventListener('click', () => {
        let dialog = document.getElementById('dialog')
        dialog.showModal();
    })
    
    let editIcon = document.createElement('img')
    editIcon.src = "image/compose.png"
    editIcon.width = "32"
    editIcon.height = "32"
    

    editButton.appendChild(editIcon)
    
    let span = document.createElement('span')
    span.id = "timezone"
    let textNode = document.createTextNode(data)
    span.appendChild(textNode)

    h3.appendChild(span)
    h3.appendChild(editButton)

    return h3
}

function createH3ElementForDate(data) {
    let h3 = document.createElement('h3')
    let textNode = document.createTextNode(data)
    h3.className = "dynapuff"
    h3.id = "date"
    h3.appendChild(textNode)
    return h3
}

function createH1ElementForTime(data) {
    let h1 = document.createElement('h1')
    let textNode = document.createTextNode(data)
    h1.className = "dynapuff"
    h1.id = "time"
    h1.appendChild(textNode)
    return h1
}

function postElementToPage(element) {
    let container = document.getElementById('container')
    container.appendChild(element)
}

let time = getTimeNow()
let timezone = getTimeZone()
let date = getDate()

let timeHTMLElement = createH1ElementForTime(time)
let timezoneHTMLElement = createH3ElementForTimeZone(timezone)
let dateHTMLElement = createH3ElementForDate(date)

postElementToPage(timezoneHTMLElement)
postElementToPage(timeHTMLElement)
postElementToPage(dateHTMLElement)

// END INITAL PAGE SET UP

// BEGIN HANDLING MODAL AND SELECTIONS

let close = document.getElementById("closeModal").addEventListener('click', closeTheModal)

function closeTheModal(e) {
    let dialog = document.getElementById("dialog")

    let selectedTimeZone = getSelectedTimeZone()
    updateTimeZone(selectedTimeZone)

    let reformatTimeZone = reformatString(selectedTimeZone)

    const {DateTime} = require("luxon")
    let dt = DateTime.fromObject({}, {zone: reformatTimeZone});
    
    let formatTime = reformatTime(dt)
    updateTime(formatTime)

    let formatDate = reformatDate(dt)
    updateDate(formatDate)
    
    e.preventDefault()
    dialog.close()
}

function getSelectedTimeZone() {
    let selections = document.querySelector("#timezones")
    let selectedOption = selections.value
    let selectedTimeZone = document.getElementById(selectedOption).innerHTML
    return selectedTimeZone
}

function updateTimeZone(newTimeZone) {
    let prevTimeZone = document.getElementById('timezone')
    prevTimeZone.innerHTML = newTimeZone
}

function reformatString(string) {
    let newString = string.replace(" ", "_")
    return newString
}

function reformatTime(obj) {
    let newTime = obj.toFormat('hh:mm:ss')
    return newTime
}

function updateTime(newTime) {
    let currentTime = document.querySelector("#time")
    currentTime.innerHTML = newTime
}

function reformatDate(obj) {
    let newDate = obj.toFormat('DDDD')
    return newDate
}

function updateDate(newDate) {
    let currentDate = document.querySelector("#date")
    currentDate.innerHTML = newDate
}

// END HANDLING MODAL AND SELECTIONS
