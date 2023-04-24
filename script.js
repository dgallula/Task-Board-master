let arr = []

function setLocalStorage() {

    let ul = document.querySelector('ul')

    if (localStorage.getItem('notes') != null) {
        arr = JSON.parse(localStorage.getItem('notes'))

        for (let i = 0; i < arr.length; i++) {
            let li = document.createElement('li')
            li.className = "note-style"
            arr[i].id = "note" + i
            li.id = "note" + i

            let delContainer = document.createElement('div')
            delContainer.className = 'container-delete-icon'
            li.appendChild(delContainer)
            let delButton = document.createElement('button')
            delButton.setAttribute("type", "button")
            delContainer.appendChild(delButton)
            let delIcon = document.createElement('i')
            delIcon.className = "fas fa-window-close delete";
            delButton.appendChild(delIcon)

            let contentContainer = document.createElement('div')
            contentContainer.className = 'task-note'
            let contentValue = document.createElement('p')
            contentContainer.appendChild(contentValue)
            contentValue.appendChild(document.createTextNode(arr[i].taskInfo))
            li.appendChild(contentContainer)

            let dateNTimeContainer = document.createElement('div')
            dateNTimeContainer.className = "task-date-time"
            let dateInfo = document.createElement('p')
            dateNTimeContainer.appendChild(dateInfo)
            let date = arr[i].taskDate.split('-').reverse().join('/')
            dateInfo.appendChild(document.createTextNode(date))
            let timeInfo = document.createElement('p')
            dateNTimeContainer.appendChild(timeInfo)
            timeInfo.appendChild(document.createTextNode(arr[i].taskTime))
            li.appendChild(dateNTimeContainer)
            ul.appendChild(li)
        }
    }
}

setLocalStorage()

// get user's current time
let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1;
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
let hour = dateObj.getHours();
let minute = dateObj.getMinutes();

if(month < 10)
   month = '0' + month;
if(day < 10)
   day = '0' + day;

let minDate = year + "-" + month + "-" + day;
document.getElementById('task-date').setAttribute("min", minDate)

document.querySelector("form").addEventListener('submit', e => {

    let ul = document.querySelector("ul")
    let status = document.querySelector("#container-status")
    let taskInfo = document.querySelector("#task-info")
    let taskDate = document.querySelector("#task-date")
    let date = taskDate.value.split('-').reverse().join('/')
    let taskTime = document.querySelector("#task-time")

    if (taskInfo.value === '') {
        status.innerText = "⛔ Please enter a task"
        status.padding = "2px 0"
        status.style.backgroundColor = "#ae3f31"
    }

    else if (date === '') {
        status.innerText = "⛔ Please enter an expiration date"
        status.padding = "2px 0"
        status.style.backgroundColor = "#ae3f31"
    }

    else if (taskTime.value === '') {
        status.innerText = "⛔ Please enter an expiration time"
        status.padding = "2px 0"
        status.style.backgroundColor = "#ae3f31"
    }

    else {
        status.innerText = "✅ Your Task Was Successfully added"
        status.style.backgroundColor = "#4fce4f"
        status.padding = "2px 0"

        arr.push({
            taskInfo: taskInfo.value,
            taskDate: date,
            taskTime: taskTime.value,
        })

        let li = document.createElement("li")
        for (let i = 0; i < arr.length; i++) {
            li.className = "note-style"
            arr[i].id = "note" + i
            li.id = "note" + i
        }

        localStorage.setItem('notes', JSON.stringify(arr))

        ul.appendChild(li)
        let delContainer = document.createElement('div')
        delContainer.className = 'container-delete-icon'
        li.appendChild(delContainer)
        let delButton = document.createElement('button')
        delButton.setAttribute("type", "button")
        delContainer.appendChild(delButton)
        let delIcon = document.createElement('i')
        delIcon.className = "fa-solid fa-rectangle-xmark delete";
        delButton.appendChild(delIcon)

        let infoContainer = document.createElement('div')
        infoContainer.className = 'task-note'
        let infoParagraph = document.createElement('p')
        infoContainer.appendChild(infoParagraph)
        infoParagraph.appendChild(document.createTextNode(taskInfo.value))
        li.appendChild(infoContainer)

        let dateTimeContainer = document.createElement('div')
        dateTimeContainer.className = 'task-date-time'
        let dateParagraph = document.createElement('p')
        dateTimeContainer.appendChild(dateParagraph)
        dateParagraph.appendChild(document.createTextNode(date))
        let timeParagraph = document.createElement('p')
        dateTimeContainer.appendChild(timeParagraph)
        timeParagraph.appendChild(document.createTextNode(taskTime.value))
        li.appendChild(dateTimeContainer)

        document.querySelector("#task-info").value = ''
        document.querySelector("#task-date").value = ''
        document.querySelector("#task-time").value = ''

    }

    e.preventDefault();
})

document.querySelector("ul").addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
        if (confirm("You are about to delete this note!\nAre you sure?")) {
            let ul = document.querySelector('ul')
            let status = document.querySelector("#container-status")
            let li = e.path[3]
            let noteId = e.path[3].id

            let index = 0;
            for (let i = 0; i < arr.length; i++) {
                for (let k = 0; k < arr[i].id.length; k++) {
                    if (noteId === arr[i].id)
                        index = i
                }
            }

            ul.removeChild(li)
            arr.splice(index, 1)

            let note = document.querySelectorAll('li')
            for (let i = 0; i < arr.length; i++) {
                arr[i].id = "note" + i
                note[i].id = "note" + i
            }

            localStorage.setItem('notes', JSON.stringify(arr))

            if (localStorage.notes === "[]") {
                localStorage.removeItem("notes")
            }

            status.innerText = "✅ Your task was successfully removed"
            status.padding = "2px 0"
            status.style.backgroundColor = "#ae3f31"
        }
    }
})