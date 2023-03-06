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
