document.addEventListener("DOMContentLoaded", function () {
    console.log("Document is fully loaded.");

    // Retrieve saved data from localStorage
    let savedData = JSON.parse(localStorage.getItem("savedData")) || {};

    // Migration logic to convert old data format to the new format
    if (!savedData["2024"] && Object.keys(savedData).some(key => /^[A-Za-z]+\d+$/.test(key))) {
        console.log("Migrating large data set to new format...");

        // Create a new structure for the default year
        const migratedData = { "2024": {} };

        // Iterate through all the keys in the old format
        for (const key in savedData) {
            if (savedData.hasOwnProperty(key) && /^[A-Za-z]+\d+$/.test(key)) {
                // Transfer each old key (e.g., "Jan5") to the new "2024" year
                migratedData["2024"][key] = savedData[key];
            }
        }

        // Save the migrated data back to localStorage
        savedData = migratedData;
        localStorage.setItem("savedData", JSON.stringify(savedData));

        console.log("Migration complete:", savedData);
    } else {
        console.log("Data is already in the new format or no migration needed:", savedData);
    }
    
    let selectedYear = localStorage.getItem("selectedYear") || "2024"; // Default year

    // Update year selector buttons
    function updateYearSelector() {
        document.querySelectorAll(".yearOption").forEach((button) => {
            if (button.dataset.year === selectedYear) {
                button.classList.add("selected");
            } else {
                button.classList.remove("selected");
            }
        });
    }

    // Add event listeners for year buttons
    document.querySelectorAll(".yearOption").forEach((button) => {
        button.addEventListener("click", function () {
            selectedYear = this.dataset.year;
            localStorage.setItem("selectedYear", selectedYear);
            updateYearSelector();
            updateButtonStyles(savedData); // Update button styles based on selected year
        });
    });

    updateYearSelector();

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
    
        const savedData = JSON.parse(localStorage.getItem("savedData")) || {};
        if (!savedData[selectedYear]) {
            savedData[selectedYear] = {};
        }
    
        if (!Array.isArray(savedData[selectedYear][currentDay])) {
            savedData[selectedYear][currentDay] = [];
        }
    
        const selectedItem = document.getElementById("item-dropdown").value;
        const numberValue = document.getElementById("number-input").value;
        const newEntry = { item: selectedItem, number: numberValue };
    
        savedData[selectedYear][currentDay].push(newEntry);
        localStorage.setItem("savedData", JSON.stringify(savedData));
        updateButtonStyles(savedData);
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
    //document.getElementById("undo-button").addEventListener("click", function () {
        // Implement the logic for undoing the last action
        //undoLastAction();
    //});

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
        const yearData = savedData[selectedYear] || {};
        document.querySelectorAll(".day-button").forEach((button) => {
            const day = button.id;
            if (Array.isArray(yearData[day]) && yearData[day].length > 0) {
                button.style.backgroundColor = "green";
            } else {
                button.style.backgroundColor = "white";
            }
        });
    }

     // Function to delete data for a specific day
     function deleteData(selectedDay) {
        let savedData = JSON.parse(localStorage.getItem("savedData")) || {};
    
        if (savedData[selectedYear] && Array.isArray(savedData[selectedYear][selectedDay])) {
            // Remove the data for the selected day
            savedData[selectedYear][selectedDay] = [];
    
            // Save the updated data to local storage
            localStorage.setItem("savedData", JSON.stringify(savedData));
            updateButtonStyles(savedData);
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
