function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}

function openLogin() {
  document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
}

const bookingForm = document.getElementById("bookingForm");
const message = document.getElementById("message");

bookingForm.addEventListener("submit", e => {
  e.preventDefault();
  message.textContent = "Reserva realizada con éxito";
  message.style.color = "green";
  bookingForm.reset();
});

function applyFilters() { }
function downloadCSV() { }