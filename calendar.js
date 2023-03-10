// document.getElementById("create").addEventListener("click", popup, false);

// function popup() {
//     console.log("asdf");

//     var element = document.getElementById("createPopup");
//     var style = element.style.display;
//     if (element.style.display == "block") {
//         element.style.display == "none";
//     }
//     else {
//         element.style.display = "block";
//     }

//     document.getElementById("x").addEventListener("click", closePopup, false);

// }

// function closePopup() {
//     var element = document.getElementById("createPopup");
//     element.innerHTML = "<div id='x'>x</div>";
//     element.style.display = "none";
//     document.getElementById("login").addEventListener("click", registerPopup, false);
// }



(function () { Date.prototype.deltaDays = function (c) { return new Date(this.getFullYear(), this.getMonth(), this.getDate() + c) }; Date.prototype.getSunday = function () { return this.deltaDays(-1 * this.getDay()) } })();
function Week(c) { this.sunday = c.getSunday(); this.nextWeek = function () { return new Week(this.sunday.deltaDays(7)) }; this.prevWeek = function () { return new Week(this.sunday.deltaDays(-7)) }; this.contains = function (b) { return this.sunday.valueOf() === b.getSunday().valueOf() }; this.getDates = function () { for (var b = [], a = 0; 7 > a; a++)b.push(this.sunday.deltaDays(a)); return b } }
function Month(c, b) { this.year = c; this.month = b; this.nextMonth = function () { return new Month(c + Math.floor((b + 1) / 12), (b + 1) % 12) }; this.prevMonth = function () { return new Month(c + Math.floor((b - 1) / 12), (b + 11) % 12) }; this.getDateObject = function (a) { return new Date(this.year, this.month, a) }; this.getWeeks = function () { var a = this.getDateObject(1), b = this.nextMonth().getDateObject(0), c = [], a = new Week(a); for (c.push(a); !a.contains(b);)a = a.nextWeek(), c.push(a); return c } };

const date = new Date();
let currentMonth = new Month((date.getFullYear()), (date.getMonth())); // October 2017
Window.onload = updateCalendar();

// Change the month when the "next" button is pressed
document.getElementById("rightArrow").addEventListener("click", function (event) {
    currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
    updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
}, false);

// Change the month when the "back" button is pressed
document.getElementById("leftArrow").addEventListener("click", function (event) {
    currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
    updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
}, false);


// This updateCalendar() function only alerts the dates in the currently specified month.  You need to write
// it to modify the DOM (optionally using jQuery) to display the days and weeks in the current month.

function updateCalendar() {

    //copied code beginning https://bobbyhadz.com/blog/javascript-convert-month-number-to-name
    date.setMonth(currentMonth.month);
    let monthName = date.toLocaleString("en-US", {
        month: 'long',
    })
    //copied code end

    year = currentMonth.year;

    document.getElementById("month").textContent = monthName;
    document.getElementById("year").textContent = year;

    var weeks = currentMonth.getWeeks();

    let divs = document.getElementsByClassName("grid-item");
    let i = 0;
    let oneCounter = 0;

    for (var w in weeks) {
        var days = weeks[w].getDates();
        // days contains normal JavaScript Date objects.

        for (var d in days) {
            // You can see console.log() output in your JavaScript debugging tool, like Firebug,
            // WebWit Inspector, or Dragonfly.
            let currDay = days[d].getDate();

            if (currDay == 1) {
                oneCounter++;
            }

            if (oneCounter == 0) {
                // dispaly light green
                divs[i].style.backgroundColor = "#A6BB8D";
            }
            else if (oneCounter == 1) {
                divs[i].style.backgroundColor = "#61876E";
            }
            else {
                // display light green
                divs[i].style.backgroundColor = "#A6BB8D";
            }

            divs[i].innerHTML = days[d].getDate();
            i++;
        }
    }

    if (weeks.length == 5) {
        var days = weeks[4].getDates();
        let lastDay = days[6].getDate();

        if (lastDay == 30 || lastDay == 31 || lastDay == 28) {
            lastDay = 0;
        }

        while (i < divs.length) {
            lastDay++;
            divs[i].innerHTML = lastDay;
            divs[i].style.backgroundColor = "#A6BB8D";
            i++;
        }
    }
}

// ajax.js
function registerAjax() {
    const first_name = document.getElementById("first_name").value; // Get the username from the form
    const last_name = document.getElementById("last_name").value; // Get the password from the form
    const username = document.getElementById("username").value; // Get the password from the form
    const email = document.getElementById("email").value; // Get the password from the form
    const pwd = document.getElementById("pwd").value; // Get the password from the form
    const pwd_check = document.getElementById("pwd_check").value; // Get the password from the form



    // Make a URL-encoded string for passing POST data:
    const data = { 'first_name': first_name, 'last_name': last_name, 'username': username, 'email': email, 'pwd': pwd, 'pwd_check': pwd_check };

    fetch("calRegister.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => console.log(data.success ? "You've been registered!" : `You were not registered in ${data.message}`))
        .catch(err => console.error(err));
    event.preventDefault();
    closePopup();
}


//listener and function to create the registration popup
// document.getElementById("login").addEventListener("click", registerPopup, false);

// function registerPopup() {
//     document.getElementById("login").removeEventListener("click", registerPopup, false);
//     popup();
//     let popupElement = document.getElementById("createPopup");


//     // popupElement.innerHTML += "<div class='box'><form method='POST'><br><label>First Name: </label><br><input type='text' id='first_name' name='first_name'><br><label>Last Name: </label><br><input type='text' id='last_name' name='last_name'><br><label>Username: </label><br><input type='text' id='username' name='username'><br><label>Email Address: </label><br><input type='email' id='email' name='email'><br><label>Password: </label><br><input type='password' id='pwd' name='pwd'><br><label>Retype Password:</label><br><input type='password' id='pwd_check' name='checkpwd'><br><br><br><br><input class='button' type='submit' value='Register' name='submit' id='registersubmit'><br><br></form></div> ";
//     // document.getElementById("x").addEventListener("click", closePopup, false);
//     document.getElementById("registersubmit").addEventListener("click", registerAjax, false); // Bind the AJAX call to button click
// }



// ADD EVENTLISTENER TO EVERY ELEMENT IN GRID, IF IT IS CLICKED EXECUTE FUNCTION
Window.onload = setEventListeners();

function setEventListeners() {

    let gridArray = document.getElementsByClassName("grid-item");
    let sideBar = document.getElementById("dateTitle");
    let displayCurrentMonth = currentMonth.getDateObject;
    let previousElement = '14';
    let previousDay = 15;

    for (let i = 0; i < gridArray.length; i++) {
        gridArray[i].addEventListener('click', e => {

            let displayCurrentYear = currentMonth.year;

            // CONVERT ID TO INT TO COMPARE LATER ON

            let currentElement = e.target.id;
            let currentElementId = parseInt(currentElement);

            // GETTING THE DAY AND CONVERTING IT TO AN INT
            let displayCurrentDay = e.target.textContent;
            let currentDayAsInt = parseInt(displayCurrentDay);

            // IF THE DAY CLICKED WAS IN THE PREVIOUS MONTH
            if (currentElementId < 8 && currentDayAsInt > 7) {

                // CHANGE THE MONTH TO BE THE PREVIOUS MONTH
                displayCurrentMonth = currentMonth.prevMonth().month;

                // IF THE NEW MONTH IS DECEMBER, CHANGE THE YEAR
                if (displayCurrentMonth == 11) {
                    displayCurrentYear = currentMonth.year - 1;
                }
            }

            // IF THE DAY CLICKED WAS IN THE NEXT MONTH
            else if (currentElementId > 28 && currentDayAsInt < 15) {

                // CHANGE MONTH TO BE THE NEXT MONTH
                displayCurrentMonth = currentMonth.nextMonth().month;

                // IF THE NEW MONTH IS JANUARY, CHANGE THE YEAR
                if (displayCurrentMonth == 0) {
                    displayCurrentYear = currentMonth.year + 1;
                }
            }

            // IF THE DAY CLICKED WAS IN THE CURRENT MONTH
            else {
                displayCurrentMonth = currentMonth.month;
                displayCurrentYear = currentMonth.year;
            }

            // CONVERT MONTH NUMBER TO STRING
            date.setMonth(displayCurrentMonth);
            let monthName = date.toLocaleString("en-US", {
                month: 'long',
            })


            sideBar.textContent = monthName + " " + displayCurrentDay + ", " + displayCurrentYear;

            // CONTROL THE COLOR OF THE GRID BLOCK
            document.getElementById(currentElement).style.backgroundColor = "#3C6255";


            // CHANGE THE PREVIOUS DAY NOT IN THE CURRENT MONTH TO LIGHT GREEN
            if ((previousElement < 8 && previousDay > 15) || (previousElement > 28 && previousDay < 15)) {
                console.log("current id: " + currentElementId + "  currentDay: " + currentDayAsInt + "  previ: " + previousElement);
                document.getElementById(previousElement).style.backgroundColor = "#A6BB8D";
            }

            /// CHANGE THE PREVIOUS DAY IN CURRENT MONTH BACK TO GREEN
            else {
                document.getElementById(previousElement).style.backgroundColor = "#61876E";
            }

            previousDay = displayCurrentDay;
            previousElement = currentElement;

            // CONTROL WHAT IS SHOWN ON THE SIDE
            document.getElementById("addForm").style.display = "none";
            document.getElementById("loginForm").style.display = "none";
            document.getElementById("registerForm").style.display = "none";
            document.getElementById("currentDateEvents").style.display = "block";
        }, false);
    }
}


// WHEN ADD EVENT FORM BUTTON HAS BEEN CLICKED
document.getElementById("addEventButton").addEventListener('click', displayAddForm, false);

function displayAddForm() {

    // SHOW ADD EVENT FORM, HIDE EVENTS FROM SELECTED DAY
    if (document.getElementById("addForm").style.display == "none") {
        document.getElementById("addForm").style.display = "block";
        document.getElementById("currentDateEvents").style.display = "none";
    }

    // HIDE ADD EVENT FORM, SHOW EVENTS FROM SELECTED DAY
    else {
        document.getElementById("addForm").style.display = "none";
        document.getElementById("currentDateEvents").style.display = "block";
    }
}

