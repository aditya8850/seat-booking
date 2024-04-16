const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
];

const dropDown = document.getElementById('selectMovie');
const movieNameElement = document.getElementById("movieName");
const moviePriceElement = document.getElementById("moviePrice");
const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
const numberOfSeatElement = document.getElementById("numberOfSeat");
const totalPriceElement = document.getElementById("totalPrice");
const continueButton = document.getElementById("proceedBtn");
const cancelButton = document.getElementById("cancelBtn");

// Function to update the dropdown menu
function updateDropdownMenu() {
    moviesList.forEach(movie => {
        const option = document.createElement('option');
        option.textContent = movie.movieName;
        dropDown.appendChild(option);
    });
}

// Function to update movie name and price when dropdown selection changes
function updateMovieInfo(selectedMovie) {
    movieNameElement.textContent = selectedMovie.movieName;
    moviePriceElement.textContent = `$ ${selectedMovie.price}`;
}

// Function to update the total price based on the number of selected seats and movie price
function updateTotalPrice() {
    const selectedSeats = document.querySelectorAll(".seat.selected:not(.legend)");
    const selectedMovieIndex = dropDown.selectedIndex;
    const selectedMoviePrice = moviesList[selectedMovieIndex].price;
    const totalPrice = selectedSeats.length * selectedMoviePrice;
    totalPriceElement.textContent = `$ ${totalPrice}`;
}

// Function to update the selected seats holder section
function updateSelectedSeats() {
    const selectedSeats = document.querySelectorAll(".seat.selected:not(.legend)");
    selectedSeatsHolder.innerHTML = "";
    if (selectedSeats.length > 0) {
        selectedSeats.forEach(seat => {
            const seatNumber = seat.classList[1];
            const seatElement = document.createElement("div");
            seatElement.classList.add("selectedSeat");
            seatElement.textContent = seatNumber;
            selectedSeatsHolder.appendChild(seatElement);
        });
    } else {
        selectedSeatsHolder.innerHTML = "<span class='noSelected'>No Seat Selected</span>";
    }
}

// Function to update the number of selected seats
function updateNumberOfSeats() {
    const selectedSeats = document.querySelectorAll(".seat.selected:not(.legend)");
    const numberOfSelectedSeats = selectedSeats.length;
    if (numberOfSelectedSeats === 0) {
        numberOfSeatElement.textContent = "No Seat Selected";
    } else {
        numberOfSeatElement.textContent = numberOfSelectedSeats;
    }
}

// Event listener for dropdown change
dropDown.addEventListener('change', function () {
    const selectedMovieIndex = dropDown.selectedIndex;
    const selectedMovie = moviesList[selectedMovieIndex];
    updateMovieInfo(selectedMovie);
    updateTotalPrice();
    updateSelectedSeats();
});

// Event listener for seat clicks
const availableSeats = document.querySelectorAll(".seat:not(.occupied)");
availableSeats.forEach((seat) => {
    seat.addEventListener('click', function() {
        if (seat.classList.contains("legend")) {
            return; // Skip legend seats
        }

        if (!seat.classList.contains("occupied")) { // Check if the seat is not occupied
            if (!seat.classList.contains("selected")) {
                seat.classList.add('selected');
            } else {
                seat.classList.remove("selected");
            }
            updateNumberOfSeats(); // Update number of selected seats display
            updateTotalPrice(); // Update total price
            updateSelectedSeats(); // Update selected seats display
        }
    });
});

// Event listener for continue button
continueButton.addEventListener('click', function () {
    const selectedSeats = document.querySelectorAll(".seat.selected");
    if (selectedSeats.length === 0) {
        alert("Oops no seat Selected");
    } else {
        alert("Yayy! Your Seats have been booked");
        selectedSeats.forEach(seat => {
            seat.classList.remove("selected");
            seat.classList.add("occupied");
        });
        updateTotalPrice();
        updateSelectedSeats();
    }
});

// Event listener for cancel button
cancelButton.addEventListener('click', function () {
    const selectedSeats = document.querySelectorAll(".seat.selected");
    selectedSeats.forEach(seat => {
        seat.classList.remove("selected");
    });
    updateTotalPrice();
    updateSelectedSeats();
});

// Initial setup
updateDropdownMenu();
updateMovieInfo(moviesList[0]); // Default movie selection
updateTotalPrice();
updateSelectedSeats();
