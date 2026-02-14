const { bootApp } = require("./helpers/loadApp");

function click(el) {
  el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
}

function type(el, value) {
  el.value = value;
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

function ensureInit() {
  document.dispatchEvent(new Event("DOMContentLoaded"));
}

describe("Admin flow (modal login + dashboard)", () => {
  beforeEach(() => {
    localStorage.clear();
    bootApp();
    ensureInit();
  });

  test("Al hacer click en Login (nav) se abre el modal", () => {
    const openBtn = document.getElementById("openAdminLoginBtn");
    expect(openBtn).toBeTruthy();

    const modal = document.getElementById("adminLoginModal");
    expect(modal).toBeTruthy();

    expect(modal.classList.contains("hidden")).toBe(true);

    click(openBtn);

    expect(modal.classList.contains("hidden")).toBe(false);
  });

  test("Login inválido muestra error en contraseña y NO guarda sesión", () => {
    click(document.getElementById("openAdminLoginBtn"));

    const user = document.getElementById("adminUser");
    const pass = document.getElementById("adminPassword");
    const submit = document.getElementById("adminLoginBtn");

    const userErr = document.getElementById("adminUserError");
    const passErr = document.getElementById("adminPasswordError");

    expect(user && pass && submit && userErr && passErr).toBeTruthy();

    type(user, "foo");
    type(pass, "bar");
    click(submit);

    expect(passErr.classList.contains("hidden")).toBe(false);   
    expect(passErr.textContent.toLowerCase()).toContain("email o contraseña incorrectos");

    expect(localStorage.getItem("huellas:adminSession")).toBeNull();
  });

  test("Login válido guarda sesión y muestra dashboard admin", () => {
    click(document.getElementById("openAdminLoginBtn"));

    type(document.getElementById("adminUser"), "admin");
    type(document.getElementById("adminPassword"), "veterinaria");
    click(document.getElementById("adminLoginBtn"));

    expect(localStorage.getItem("huellas:adminSession")).toBeTruthy();

    const adminDashboard = document.getElementById("adminDashboard");
    expect(adminDashboard).toBeTruthy();
    expect(adminDashboard.classList.contains("hidden")).toBe(false);
  });

  test("Logout borra sesión y oculta dashboard admin", () => {
    click(document.getElementById("openAdminLoginBtn"));
    type(document.getElementById("adminUser"), "admin");
    type(document.getElementById("adminPassword"), "veterinaria");
    click(document.getElementById("adminLoginBtn"));

    const adminDashboard = document.getElementById("adminDashboard");
    expect(adminDashboard.classList.contains("hidden")).toBe(false);

    click(document.getElementById("adminLogoutBtn"));

    expect(localStorage.getItem("huellas:adminSession")).toBeNull();
    expect(adminDashboard.classList.contains("hidden")).toBe(true);
  });
});
