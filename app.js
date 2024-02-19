 /* Button scrolling */

document.getElementById('btn1').addEventListener('click', function() {
    const poribohonSection = document.getElementById('poribohon');
    poribohonSection.scrollIntoView({ behavior: 'smooth' });
});


const voucherBtnContainer = document.getElementById('voucherBtnContainer');
voucherBtnContainer.style.display = 'none'; 


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

        // Update selected seat
        document.getElementById('number').textContent = selectedSeats.length;

        // Update available seats 
        const btn2 = document.getElementById('btn2');
        const initialSeats = 40; 
        const selectedCount = selectedSeats.length;
        const remainingSeats = initialSeats - selectedCount;
        btn2.textContent = `${remainingSeats} Seats left`;

        
        if (selectedSeats.length === 4) {
            voucherBtnContainer.style.display = 'block';
        } else {
            voucherBtnContainer.style.display = 'none';
        }

        updateSelectedSeatsDisplay();
    });
});


function updateSelectedSeatsDisplay() {
    const totalPriceElement = document.getElementById('totalPrice');
    const grandTotalElement = document.getElementById('grandTotal');
    const selectedSeatsElement = document.getElementById('ap');

    selectedSeatsElement.innerHTML = '';

    // Calculate total price
    const totalPrice = selectedSeats.length * 550; 
    totalPriceElement.textContent = `Total ${totalPrice}`;

    // Check if a voucher is applied
    const voucherCode = document.getElementById('voucherCode').value;
    let discount = 0;
    if (voucherCode === "NEW15") {
        discount = totalPrice * 0.15;
    } else if (voucherCode === "Couple 20") {
        discount = totalPrice * 0.20; 
    }

    // Calculate grand total
    const grandTotal = totalPrice - discount;
    grandTotalElement.textContent = `Grand Total ${grandTotal}`;

    // Update selected seats 
    selectedSeats.forEach(seat => {
        const seatElement = document.createElement('p');
        seatElement.textContent = seat + ' - 550'; 
        selectedSeatsElement.appendChild(seatElement);
    });
}


document.getElementById('voucherForm').addEventListener('submit', function(event) {
    event.preventDefault();

    
    updateSelectedSeatsDisplay();

    
    voucherBtnContainer.style.display = 'none';
});
