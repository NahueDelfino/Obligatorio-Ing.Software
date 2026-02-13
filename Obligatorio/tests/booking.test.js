const { bootApp } = require("./helpers/loadApp");

function click(el) {
  expect(el).toBeTruthy();
  el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
}

function change(el, value) {
  expect(el).toBeTruthy();
  el.value = value;
  el.dispatchEvent(new Event("change", { bubbles: true }));
}

function type(el, value) {
  expect(el).toBeTruthy();
  el.value = value;
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

function ensureInitAndRenderBooking() {
  document.dispatchEvent(new Event("DOMContentLoaded"));
  window.dispatchEvent(new Event("load"));

  // si todavía no renderizó, re-disparo (idempotente para test)
  const serviceList = document.getElementById("serviceList");
  if (serviceList && !serviceList.querySelector("button")) {
    document.dispatchEvent(new Event("DOMContentLoaded"));
    window.dispatchEvent(new Event("load"));
  }
}

describe("Booking wizard (steps + localStorage bookings)", () => {
  beforeEach(() => {
    localStorage.clear();
    bootApp();
    ensureInitAndRenderBooking();
  });

  test("Step 1: si aprieto Next sin elegir nada, muestra errores", () => {
    click(document.getElementById("nextBtn"));

    const errService = document.querySelector('[data-error-for="serviceType"]');
    const errProf = document.querySelector('[data-error-for="professional"]');

    expect(errService).toBeTruthy();
    expect(errProf).toBeTruthy();

    expect(errService.textContent.length).toBeGreaterThan(0);
    expect(errProf.textContent.length).toBeGreaterThan(0);
  });

  test("Step 1: elegir servicio habilita el bloque de profesionales", () => {
    const serviceList = document.getElementById("serviceList");
    expect(serviceList).toBeTruthy();

    const firstServiceBtn = serviceList.querySelector("button");
    expect(firstServiceBtn).toBeTruthy();

    click(firstServiceBtn);

    const professionalField = document.getElementById("professionalField");
    expect(professionalField).toBeTruthy();
    expect(professionalField.classList.contains("hidden")).toBe(false);
  });

  test("Flow completo: crea una reserva y la guarda en localStorage (huellas:bookings)", () => {
    // Step 1
    click(document.querySelector("#serviceList button"));
    click(document.querySelector("#professionalList button"));
    click(document.getElementById("nextBtn"));

    // Step 2
    const dateInput = document.getElementById("dateInput");
    // min puede venir como atributo o propiedad
    const minDate = dateInput.getAttribute("min") || dateInput.min;
    expect(minDate).toBeTruthy();

    change(dateInput, minDate);

    const firstTimeBtn = document.querySelector("#timeGrid button");
    expect(firstTimeBtn).toBeTruthy();
    click(firstTimeBtn);

    click(document.getElementById("nextBtn"));

    // Step 3
    type(document.getElementById("ownerName"), "Julia Test");
    type(document.getElementById("petName"), "Firulais");
    change(document.getElementById("petType"), "perro");
    type(document.getElementById("phone"), "+598 93111222");
    type(document.getElementById("email"), "julia@test.com");

    click(document.getElementById("confirmBtn"));

    const raw = localStorage.getItem("huellas:bookings");
    expect(raw).toBeTruthy();

    const list = JSON.parse(raw);
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);

    const booking = list[0];
    expect(booking.ownerName).toBe("Julia Test");
    expect(booking.petName).toBe("Firulais");
    expect(booking.email).toBe("julia@test.com");
    expect(booking.date).toBe(minDate);
  });

  test("El wizard persiste draft en localStorage (huellas:bookingDraft) al avanzar", () => {
    click(document.querySelector("#serviceList button"));
    click(document.querySelector("#professionalList button"));
    click(document.getElementById("nextBtn"));

    const raw = localStorage.getItem("huellas:bookingDraft");
    expect(raw).toBeTruthy();

    const draft = JSON.parse(raw);
    expect(draft.currentStep).toBe(2);
    expect(draft.formData.serviceType).toBeTruthy();
    expect(draft.formData.professional).toBeTruthy();
  });
});
