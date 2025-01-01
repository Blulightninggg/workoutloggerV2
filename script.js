document.addEventListener("DOMContentLoaded", function () {
    console.log("Document is fully loaded.");
    // retrieve data from storage
    let savedData = JSON.parse(localStorage.getItem("savedData")) || {};

    // update button styles based on saved data
    updateButtonStyles(savedData);

    // Handle click event for the January button
    document.getElementById("january-image").addEventListener("click", function () {
        document.getElementById("january-popup-container").style.display = "block";
    });
    document.getElementById("delete-button").addEventListener("click", function () {
        showDeleteConfirmation();
    });
    

    // Attach click event listeners to day buttons
    document.querySelectorAll(".day-button").forEach(function (button) {
        button.addEventListener("click", function () {
            // Show popup
            document.getElementById("popup").style.display = "block";

            // Save the current day
            currentDay = this.id;
        });
    });

    function showDeleteConfirmation() {
        const confirmation = confirm("Are you sure you want to delete data for the selected day?");
        if (confirmation) {
            // Implement the logic for deleting data
            deleteData(currentDay);
        }
    }
    
    

    // Handle popup form submission outside the loop
    document.getElementById("popup-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let savedData = JSON.parse(localStorage.getItem("savedData")) || {};


        if (!Array.isArray(savedData[currentDay])) {
            savedData[currentDay] = [];
        }

        // Get values from the form
        let selectedItem = document.getElementById("item-dropdown").value;
        let numberValue = document.getElementById("number-input").value;
        let newEntry = { item: selectedItem, number: numberValue };

        console.log("Got values from form")
        
        // Update saved data
        savedData[currentDay].push(newEntry);

        console.log("Update Data")

        // Save data to local storage
        localStorage.setItem("savedData", JSON.stringify(savedData));

        console.log("Saved Data to storage")

        // Update button style for the current day
        document.getElementById(currentDay).style.backgroundColor = "green";

        // Hide the popup
        document.getElementById("popup").style.display = "none";

        
    });



    //Reset Button

    // Handle reset button click
    //document.getElementById("reset-button").addEventListener("click", function () {
        // Clear saved data
        //savedData = {};

        // Clear button styles
        //document.querySelectorAll(".day-button").forEach(function (button) {
            //button.classList.remove("green");
        //});

        // Save empty data to local storage
        //localStorage.setItem("savedData", JSON.stringify(savedData));
    //});

   

    // Handle undo button click
    document.getElementById("undo-button").addEventListener("click", function () {
        // Implement the logic for undoing the last action
        undoLastAction();
    });

    // Function to implement undo functionality
    function undoLastAction() {
        // Retrieve the saved data from local storage
        let savedData = JSON.parse(localStorage.getItem("savedData")) || {};

        // Implement the logic to undo the last action based on your application's requirements
        // For example, you might want to remove the last entry or revert the last change.
        // Replace this with the actual method to get the current day

        // Check if there is data for the current day
        if (Array.isArray(savedData[currentDay]) && savedData[currentDay].length > 0) {
            // Remove the last entered data
            savedData[currentDay].pop();
    
            // Save the updated data to local storage
            localStorage.setItem("savedData", JSON.stringify(savedData));
    
            // Update button style for the current day (change back to default color)
            document.getElementById(currentDay).style.backgroundColor = "white";

            updateButtonStyles(savedData);
        }
        // After performing the undo action, update button styles
    }



    // Function to update button styles based on saved data
    function updateButtonStyles(savedData) {
        // Set buttons with data to green, and buttons without data to grey
        let allButtons = document.querySelectorAll('.day-button'); // Replace 'day-button' with the actual class name of your buttons
    
        allButtons.forEach(button => {
            let day = button.id;
            if (savedData.hasOwnProperty(day) && Array.isArray(savedData[day]) && savedData[day].length > 0) {
                // Button has data, set background color to green
                button.style.backgroundColor = "green";
            } else {
                // Button does not have data, set background color to grey
                button.style.backgroundColor = "white";
            }
        });
    }

     // Function to delete data for a specific day
     function deleteData(selectedDay) {
        let savedData = JSON.parse(localStorage.getItem("savedData")) || {};

        if (Array.isArray(savedData[selectedDay]) && savedData[selectedDay].length > 0) {
            // Remove the data for the selected day
            savedData[selectedDay] = [];

            // Save the updated data to local storage
            localStorage.setItem("savedData", JSON.stringify(savedData));
            
            let dayButton = document.getElementById(selectedDay);
            if (dayButton) {
                dayButton.classList.remove("green");
                dayButton.style.backgroundColor = "white"; // Set background color to white
            } else {
                console.log("Element not found for ID:", selectedDay);
            }


            // Update button style for the selected day (change back to default color)
            document.getElementById(selectedDay).classList.remove("green");

            updateButtonStyles(savedData);
            hidePopup();
        }
    }

    // Call the displaySummary function when the Summary page is loaded
    if (window.location.pathname.endsWith("Summary.html")) {
        console.log("Loading Summary Page");
        displaySummary();
    }
});

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
