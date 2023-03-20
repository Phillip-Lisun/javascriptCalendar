//copied calendar functions
(function () { Date.prototype.deltaDays = function (c) { return new Date(this.getFullYear(), this.getMonth(), this.getDate() + c) }; Date.prototype.getSunday = function () { return this.deltaDays(-1 * this.getDay()) } })();
function Week(c) { this.sunday = c.getSunday(); this.nextWeek = function () { return new Week(this.sunday.deltaDays(7)) }; this.prevWeek = function () { return new Week(this.sunday.deltaDays(-7)) }; this.contains = function (b) { return this.sunday.valueOf() === b.getSunday().valueOf() }; this.getDates = function () { for (var b = [], a = 0; 7 > a; a++)b.push(this.sunday.deltaDays(a)); return b } }
function Month(c, b) { this.year = c; this.month = b; this.nextMonth = function () { return new Month(c + Math.floor((b + 1) / 12), (b + 1) % 12) }; this.prevMonth = function () { return new Month(c + Math.floor((b - 1) / 12), (b + 11) % 12) }; this.getDateObject = function (a) { return new Date(this.year, this.month, a) }; this.getWeeks = function () { var a = this.getDateObject(1), b = this.nextMonth().getDateObject(0), c = [], a = new Week(a); for (c.push(a); !a.contains(b);)a = a.nextWeek(), c.push(a); return c } };


// Window.onload = document.getElementById("logout").style.display = "none";
//gets current date & sets 
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

function timeConvert(time) {
    pm = false;
    append = "AM";
    time = time.split(":");

    hour = time[0];
    if (hour > 12) {
        hour = hour - 12;
        pm = true;
    }

    if (pm == true) {
        append = "PM";
    }

    result = hour + ":" + time[1] + " " + append;
    return result;

}



// ADD EVENTLISTENER TO EVERY ELEMENT IN GRID, IF IT IS CLICKED EXECUTE FUNCTION
Window.onload = setEventListeners();
let previousElement = '14';
let previousDay = 15;

function setEventListeners() {

    let gridArray = document.getElementsByClassName("grid-item");
    let sideBar = document.getElementById("dateTitle");
    let displayCurrentMonth = currentMonth.getDateObject;

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

            if (user_id != -1) {
                // CONTROL WHAT IS SHOWN ON THE SIDE
                showEvents(displayCurrentMonth, displayCurrentDay, displayCurrentYear);
            }
            else {
                document.getElementById("addForm").style.display = "none";
                document.getElementById("loginForm").style.display = "block";
                document.getElementById("registerForm").style.display = "none";
                document.getElementById("currentDateEvents").style.display = "none";
            }
        }, false);
    }
}

// SESSION ID
Window.onload = getSessionId();
function getSessionId() {
    const data = { 'request': 'userID' };

    fetch("calGetId.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => data.success ? requestSuccess(data.user_id, data.username) : requestFailed(data.message))
        .catch(err => console.error(err));

    function requestSuccess(user_id, username) {
        Window.user_id = user_id;
        Window.username = username;
        console.log(Window.username);
        console.log(Window.user_id);
        loginSuccess(Window.user_id, Window.username);
    }
    function requestFailed(error) {
        console.log(error);
    }
}



// LOGIN STUFF
//WHEN LOGIN BUTTON HAS BEEN CLICKED
// document.getElementById("login").addEventListener('click', displayLoginForm, false);

Window.onload = displayLoginForm();
function displayLoginForm() {

    document.getElementById("addForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("currentDateEvents").style.display = "none";
    
    // document.getElementById("registerLink").addEventListener('click', displayRegisterForm, false);
    document.getElementById("loginSubmit").addEventListener("click", loginAjax, false);
    document.getElementById("registerLink").addEventListener('click', displayRegisterForm, false);

}

//login functionality 
function loginAjax(event) {
    const username = document.getElementById("loginUsername").value; // Get the username from the form
    const password = document.getElementById("loginPassword").value; // Get the password from the form

    // Make a URL-encoded string for passing POST data:
    const data = { 'loginUsername': username, 'loginPassword': password };

    fetch("calLogin.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => data.success ? loginSuccess(data.user_id, username) : loginFailed(data.message))
        .catch(err => console.error(err));

    function loginFailed(error) {
        alert(error);
    }

    event.preventDefault();
}

function loginSuccess(user_id, username) {
    // UPDATE HEADER
    document.getElementById("welcome").innerText = "Hello, " + username;
    // document.getElementById("login").style.display = "none";
    // document.getElementById("register").style.display = "none";
    document.getElementById("logout").style.display = "block";

    document.getElementById("logout").addEventListener('click', logoutAjax, false);
    Window.user_id = user_id;
    Window.username = username;

    // display the date that its currently on,
    // SIDEBAR DISPLAYS
    document.getElementById("addForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("currentDateEvents").style.display = "block";
}

// LOGOUT FUNCTIONS
function logoutAjax(event) {
    const data = { 'request': 'logout' };
    fetch("calGetId.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => data.success ? requestSuccess() : requestFailed())
        .catch(err => console.error(err));

    function requestSuccess() {
        Window.user_id = -1
        // HEADER DISPLAYS
        document.getElementById("welcome").innerText = "Welcome";
        // document.getElementById("login").style.display = "block";
        // document.getElementById("register").style.display = "block";
        document.getElementById("logout").style.display = "none";

        // SIDEBAR DISPLAYS
        document.getElementById("addForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("currentDateEvents").style.display = "none";
    }
    function requestFailed() {
        alert("error");
    }

    event.preventDefault();
}



// REGISTRATION STUFF
// WHEN REGISTER BUTTON HAS BEEN CLICKED
// document.getElementById("register").addEventListener('click', displayRegisterForm, false);
// document.getElementById("registerLink").addEventListener('click', displayRegisterForm, false);

function displayRegisterForm() {
    document.getElementById("loginSubmit").addEventListener("click", loginAjax, false);

    document.getElementById("addForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("currentDateEvents").style.display = "none";

    document.getElementById("registerSubmit").addEventListener('click', registerAjax, false);
    document.getElementById("loginLink").addEventListener('click', displayLoginForm, false);

}

// regristration ajax.js
function registerAjax(event) {
    const first_name = document.getElementById("first_name").value; // Get the username from the form
    const last_name = document.getElementById("last_name").value; // Get the password from the form
    const username = document.getElementById("username").value; // Get the password from the form
    const email = document.getElementById("email").value; // Get the password from the form
    const pwd = document.getElementById("pwd").value; // Get the password from the form
    const pwd_check = document.getElementById("pwd_check").value; // Get the password from the form

    //checks all forms to see that they have been filled out correctly

    if (first_name.length == 0 || first_name.length > 50) {
        alert("First Name Invalid (Max 50 Characters)");
        event.preventDefault();
        return;
    }
    if (last_name.length == 0 || last_name.length > 50) {
        alert("Last Name Invalid (Max 50 Characters)");
        event.preventDefault();
        return;
    }
    if (username.length == 0 || username.length > 50) {
        alert("Username Invalid (Max 50 Characters)");
        event.preventDefault();
        return;
    }
    if (email.length == 0) {
        alert("Email Required");
        event.preventDefault();
        return;
    }
    else {
        let emailRegex = /^[\w!#$%&'*+\/=?^_`{|}~-]+@([\w\-]+(?:\.[\w\-]+)+)$/
        if (emailRegex.test(email) == false) {
            alert("Invalid Email");
            event.preventDefault();
            return;
        }

    }
    if (pwd.length == 0 || pwd_check.length == 0) {
        alert("Password Required");
        event.preventDefault();
        return;
    }

    // Make a URL-encoded string for passing POST data:
    const data = { 'first_name': first_name, 'last_name': last_name, 'username': username, 'email': email, 'pwd': pwd, 'pwd_check': pwd_check };

    fetch("calRegister.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => data.success ? loginSuccess(data.user_id, username) : registeredFailed(data.message))
        .catch(err => console.error(err));

    // function registeredSuccess() {
    //     alert("registered!");
    // }
    function registeredFailed(error) {
        alert(error);
    }

    event.preventDefault();
}

Window.onload = displayCurrentDate();
function displayCurrentDate() {
    let todayYear = date.getFullYear();
    let todayMonth = date.getMonth();
    let todayDay = date.getDate();
    // console.log(currentElement);

    let gridArray = document.getElementsByClassName("grid-item");

    for (let i = 0; i < gridArray.length; i++) {
        if (gridArray[i].textContent == String(todayDay)) {
            if (!(i <= 14 && todayDay > 20)) {
                gridArray[i].style.backgroundColor = "#3C6255";
                gridArray[previousElement].style.backgroundColor = "#61876E";
                previousElement = i + 1;
                previousDay = todayDay;
                break;
            }
        }
    }

    // CONVERT MONTH NUMBER TO STRING
    date.setMonth(todayMonth);
    let monthName = date.toLocaleString("en-US", {
        month: 'long',
    })

    let sideBar = document.getElementById("dateTitle");
    sideBar.textContent = monthName + " " + todayDay + ", " + todayYear;

    if (Window.user_id != -1) {
        // CONTROL WHAT IS SHOWN ON THE SIDE
        showEvents(todayYear, todayMonth, todayDay);
    }
    else {
        document.getElementById("addForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("currentDateEvents").style.display = "none";
    }
}

// ADD EVENT STUFF
// WHEN ADD EVENT FORM BUTTON HAS BEEN CLICKED
document.getElementById("addEventButton").addEventListener('click', displayAddForm, false);

function displayAddForm() {

    // SHOW ADD EVENT FORM, HIDE EVENTS FROM SELECTED DAY
    if (document.getElementById("addForm").style.display == "none") {
        document.getElementById("addForm").style.display = "block";
        document.getElementById("currentDateEvents").style.display = "none";
        document.getElementById("eventSubmit").addEventListener("click", addEventAjax, false);
    }

    // HIDE ADD EVENT FORM, SHOW EVENTS FROM SELECTED DAY
    else {
        document.getElementById("addForm").style.display = "none";
        document.getElementById("currentDateEvents").style.display = "block";
    }
}



//adds event to database
function addEventAjax(event) {

    const eventName = document.getElementById("eventName").value;
    const startDate = document.getElementById("startDate").value;
    const startTime = document.getElementById("startTime").value;
    const description = document.getElementById("eventDesc").value;
    console.log("variables set");

    const date = startDate.split('-');
    const startYear = date[0];
    const startMonth = date[1] - 1;
    const startDay = date[2];

    const data = { 'title': eventName, 'day': startDay, 'month': startMonth, 'year': startYear, 'time': startTime, 'description': description, 'user_id': Window.user_id };

    fetch("calAddEvent.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => data.success ? addSuccess() : addFailed(data.message))
        .catch(err => console.error(err));

    function addSuccess() {
        alert("event added!");
    }
    function addFailed(message) {
        alert(message);
    }


    event.preventDefault();
}

function showEvents(year, month, day) {
    document.getElementById("addForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("currentDateEvents").style.display = "block";

    const data = { 'year': year, 'month': month, 'day': day, 'user_id': Window.user_id };

    fetch("calGetEvents.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(function (data) {
            console.log('Success:', JSON.stringify(data))
            getSuccess(data);
        })
        // .then(response => console.log('Success:', JSON.stringify(response)))
        // .then(data => console.log("data: " + data))
        // .then(data => getSuccess(data))
        .catch(err => console.error(err));

    function getSuccess(data) {
        console.log("hi");

        let i = 0;
        document.getElementById("dateEvents").innerHTML = "<br>";


        while ((i + 2) < data.length) {

            document.getElementById("dateEvents").innerHTML += "<strong>" + data[i] + "</strong>" + " at " + timeConvert(data[i + 1]) + "<br><br>";

            document.getElementById('dateEvents').innerHTML += "<br> <div class='button' id='" + data[i + 2] + "'>View</div> <br>";

            // let eventId = data[i+2]; //this is the loop to add the event listeners, but it wasn't working -pl
            // console.log(eventId);
            // document.getElementById(eventId).addEventListener('click', e => {
            //     alert("I got here");
            //     console.log(e.target.id);
            //     e.preventDefault();


            // });

            i += 3;

        }

        if (data.length == 0) {
            document.getElementById("dateEvents").innerText = "YOU DONT HAVE ANY EVENTS FOR THIS DAY!!";
        }

        document.getElementById("dateEvents").innerHTML += "<div class='button' id='addEventButton'>Add Event</div>";
        document.getElementById("addEventButton").addEventListener('click', displayAddForm, false);


    }
    function getFailed(message) {
        alert(message);
    }



}