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

document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("date");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 1); // mañana

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 15); // +15 días

  dateInput.min = minDate.toISOString().split("T")[0];
  dateInput.max = maxDate.toISOString().split("T")[0];
});

function applyFilters() { }
function downloadCSV() { }