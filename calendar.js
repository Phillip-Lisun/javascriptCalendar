document.getElementById("create").addEventListener("click", popup, false);
        document.getElementById("x").addEventListener("click", closePopup, false);

        function popup() {
            console.log("asdf");

            var element = document.getElementById("createPopup");
            var style = element.style.display;
            if(element.style.display == "block"){
                element.style.display == "none";
            }
            else{
                element.style.display = "block";
            }
        }

        function closePopup(){
            var element = document.getElementById("createPopup");
            element.style.display = "none";
        }

        (function(){Date.prototype.deltaDays=function(c){return new Date(this.getFullYear(),this.getMonth(),this.getDate()+c)};Date.prototype.getSunday=function(){return this.deltaDays(-1*this.getDay())}})();
        function Week(c){this.sunday=c.getSunday();this.nextWeek=function(){return new Week(this.sunday.deltaDays(7))};this.prevWeek=function(){return new Week(this.sunday.deltaDays(-7))};this.contains=function(b){return this.sunday.valueOf()===b.getSunday().valueOf()};this.getDates=function(){for(var b=[],a=0;7>a;a++)b.push(this.sunday.deltaDays(a));return b}}
        function Month(c,b){this.year=c;this.month=b;this.nextMonth=function(){return new Month(c+Math.floor((b+1)/12),(b+1)%12)};this.prevMonth=function(){return new Month(c+Math.floor((b-1)/12),(b+11)%12)};this.getDateObject=function(a){return new Date(this.year,this.month,a)};this.getWeeks=function(){var a=this.getDateObject(1),b=this.nextMonth().getDateObject(0),c=[],a=new Week(a);for(c.push(a);!a.contains(b);)a=a.nextWeek(),c.push(a);return c}}; 

        const date = new Date();
        var currentMonth = new Month((date.getFullYear()),(date.getMonth())) ; // October 2017
        Window.onload = updateCalendar();

        // Change the month when the "next" button is pressed
        document.getElementById("rightArrow").addEventListener("click", function(event){
            currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
            updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
        }, false);

        // Change the month when the "back" button is pressed
        document.getElementById("leftArrow").addEventListener("click", function(event){
            currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
            updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
        }, false);
        
        
        // This updateCalendar() function only alerts the dates in the currently specified month.  You need to write
        // it to modify the DOM (optionally using jQuery) to display the days and weeks in the current month.
        
        function updateCalendar(){

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


            
            for(var w in weeks){
                var days = weeks[w].getDates();
                // days contains normal JavaScript Date objects.
                                
                for(var d in days){
                    // You can see console.log() output in your JavaScript debugging tool, like Firebug,
                    // WebWit Inspector, or Dragonfly.
                    console.log(days[d].toISOString());
                    console.log(days[d].getDate());

                    divs[i].innerHTML = days[d].getDate();
                    i++;

                }
            }

            if(weeks.length == 5) {
                var days = weeks[4].getDates();
                let lastDay = days[6].getDate();

                if(lastDay == 30 || lastDay == 31 || lastDay == 28) {
                    lastDay = 0;
                }


                while(i < divs.length) {
                    lastDay++;
                    divs[i].innerHTML = lastDay;
                    i++;

                }
            }
        }
