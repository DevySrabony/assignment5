/* Button scrolling */

document.getElementById('btn1').addEventListener('click', function() {
    const poribohonSection = document.getElementById('poribohon');
    poribohonSection.scrollIntoView({ behavior: 'smooth' });
});



/* Hard section */

// Initialize array to store selected seats


let selectedSeats = [];

// Add event listener to seat buttons
document.querySelectorAll('.btn[id^="seat"]').forEach(seatBtn => {
    seatBtn.addEventListener('click', () => {
        const seatName = seatBtn.textContent.trim();
        const seatIndex = selectedSeats.indexOf(seatName);

        // Check if seat is already selected
        if (seatIndex > -1) {
            // Deselect seat
            selectedSeats.splice(seatIndex, 1);
            seatBtn.classList.remove('bg-[#1DD100]');
        } else {
            // Check if already selected 4 seats
            if (selectedSeats.length >= 4) {
                alert('You can select only 4 seats.');
                return;
            }
            // Select seat
            selectedSeats.push(seatName);
            seatBtn.classList.add('bg-[#1DD100]');
        }

        // Update selected seat count
        document.getElementById('number').textContent = selectedSeats.length;

        // Update available seats count
        const btn2 = document.getElementById('btn2');
        const initialSeats = 40; // Initial number of seats
        const selectedCount = selectedSeats.length;
        const remainingSeats = initialSeats - selectedCount;
        btn2.textContent = `${remainingSeats} Seats left`;

        // Update selected seats and price display
        updateSelectedSeatsDisplay();
    });
});

// Function to update selected seats and price display
function updateSelectedSeatsDisplay() {
    const totalPriceElement = document.getElementById('totalPrice');
    const grandTotalElement = document.getElementById('grandTotal');
    const selectedSeatsElement = document.getElementById('ap');

    // Clear previous seat selection display
    selectedSeatsElement.innerHTML = '';

    // Calculate total price
    const totalPrice = selectedSeats.length * 550; // Assuming price is 550 for each seat
    totalPriceElement.textContent = `Total ${totalPrice}`;

    // Check if a voucher is applied
    const voucherCode = document.getElementById('voucherCode').value;
    let discount = 0;
    if (voucherCode === "NEW15") {
        discount = totalPrice * 0.15; // 15% discount for voucher code NEW15
    } else if (voucherCode === "Couple 20") {
        discount = totalPrice * 0.20; // 20% discount for voucher code COUPLE20
    }

    // Calculate grand total
    const grandTotal = totalPrice - discount;
    grandTotalElement.textContent = `Grand Total ${grandTotal}`;

    // Update selected seats display
    selectedSeats.forEach(seat => {
        const seatElement = document.createElement('p');
        seatElement.textContent = seat + ' - 550'; // Assuming price is 550 for each seat
        selectedSeatsElement.appendChild(seatElement);
    });
}

// Add event listener to voucher form
document.getElementById('voucherForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Update selected seats and price display after applying voucher
    updateSelectedSeatsDisplay();
});

