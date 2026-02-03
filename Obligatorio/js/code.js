(function () {
  // -----------------------------
  // Helpers
  // -----------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  // -----------------------------
  // Simple SVG icon set (reemplazo lucide-react)
  // -----------------------------
  const ICONS = {
    menu: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <line x1="4" y1="6" x2="20" y2="6"></line>
        <line x1="4" y1="12" x2="20" y2="12"></line>
        <line x1="4" y1="18" x2="20" y2="18"></line>
      </svg>
    `,
    x: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `,
    chevronRight: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    `,
    chevronLeft: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    `,
    checkCircle: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9 12l2 2 4-4"></path>
      </svg>
    `,
    heart: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.8 4.6c-1.6-1.6-4.1-1.6-5.7 0L12 7.7 8.9 4.6c-1.6-1.6-4.1-1.6-5.7 0s-1.6 4.1 0 5.7L12 21l8.8-10.7c1.6-1.6 1.6-4.1 0-5.7z"></path>
      </svg>
    `,
    scissors: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="6" cy="6" r="3"></circle>
        <circle cx="6" cy="18" r="3"></circle>
        <line x1="20" y1="4" x2="8.8" y2="15.2"></line>
        <line x1="20" y1="20" x2="8.8" y2="8.8"></line>
      </svg>
    `,
    droplet: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2s7 7.2 7 13a7 7 0 0 1-14 0c0-5.8 7-13 7-13z"></path>
      </svg>
    `,
    mapPin: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    `,
    phone: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3 5.2 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L9 10.9a16 16 0 0 0 4.1 4.1l1.4-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6A2 2 0 0 1 22 16.9z"></path>
      </svg>
    `,
    instagram: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5"></rect>
        <circle cx="12" cy="12" r="4"></circle>
        <circle cx="18" cy="6" r="1"></circle>
      </svg>
    `,
    facebook: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v3H7v3h3v7h3v-7h3l1-3h-4v-3c0-.6.4-1 1-1z"></path>
      </svg>
    `,
  };

  function injectIcons() {
    $$("[data-icon]").forEach((el) => {
      const name = el.getAttribute("data-icon");
      if (!name || !ICONS[name]) return;
      el.innerHTML = ICONS[name];
    });
  }

  // -----------------------------
  // Header mobile menu
  // -----------------------------
  function initHeader() {
    const btn = $("#mobileMenuBtn");
    const nav = $("#mobileNav");
    if (!btn || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("hidden", !open);
      btn.setAttribute("aria-expanded", String(open));
      const iconHost = btn.querySelector("[data-icon]");
      if (iconHost) iconHost.setAttribute("data-icon", open ? "x" : "menu");
      injectIcons();

      // prevent body scroll when open (optional)
      document.body.style.overflow = open ? "hidden" : "";
    }

    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      setOpen(!isOpen);
    });

    // close on link click
    $$(".nav-mobile-link", nav).forEach((a) => {
      a.addEventListener("click", () => setOpen(false));
    });

    // close on resize up to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) setOpen(false);
    });
  }

  // -----------------------------
  // Footer year + scroll buttons
  // -----------------------------
  function initFooter() {
    const year = new Date().getFullYear();
    const ct = $("#copyrightText");
    if (ct) ct.textContent = `© ${year} Huellas Veterinary Clinic. All rights reserved.`;

    $$("[data-scroll]").forEach((btn) => {
      btn.addEventListener("click", () => scrollToId(btn.getAttribute("data-scroll")));
    });
  }

  // -----------------------------
  // Hero CTA
  // -----------------------------
  function initHero() {
    const btn = $("#heroBookingBtn");
    if (!btn) return;
    btn.addEventListener("click", () => scrollToId("booking"));
  }

  // -----------------------------
  // Booking wizard (equivalente BookingSection.tsx)
  // -----------------------------
  const services = [
    { id: "vet-care", name: "Veterinary Care" },
    { id: "grooming", name: "Pet Grooming" },
    { id: "bath", name: "Bath & Aesthetics" },
  ];

  const professionalsByService = {
    "vet-care": ["Dr. María García", "Dr. Carlos López", "Dr. Ana Rodríguez"],
    grooming: ["Sofia Martínez", "Lucas Fernández"],
    bath: ["Sofia Martínez", "Lucas Fernández"],
  };

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  ];

  function getAvailableDates() {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 15; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
  }

  function initBooking() {
    const panel = $("#bookingPanel");
    if (!panel) return;

    const stepIndicator = $("#stepIndicator");
    const steps = $$(".step", panel);

    const prevBtn = $("#prevBtn");
    const nextBtn = $("#nextBtn");
    const confirmBtn = $("#confirmBtn");

    const serviceList = $("#serviceList");
    const professionalField = $("#professionalField");
    const professionalList = $("#professionalList");

    const dateInput = $("#dateInput");
    const timeGrid = $("#timeGrid");

    const ownerName = $("#ownerName");
    const petName = $("#petName");
    const petType = $("#petType");
    const phone = $("#phone");
    const email = $("#email");

    const successWrap = $("#bookingSuccess");
    const successText = $("#successText");
    const successSub = $("#successSub");

    const summaryBox = $("#summaryBox");
    const sumService = $('[data-sum="service"]', summaryBox);
    const sumProfessional = $('[data-sum="professional"]', summaryBox);
    const sumDate = $('[data-sum="date"]', summaryBox);
    const sumTime = $('[data-sum="timeSlot"]', summaryBox);

    let currentStep = 1;

    const formData = {
      serviceType: "",
      professional: "",
      date: "",
      timeSlot: "",
      ownerName: "",
      petName: "",
      petType: "",
      phone: "",
      email: "",
    };

    function setError(key, message) {
      const p = $(`[data-error-for="${key}"]`, panel);
      const inputEl =
        key === "date" ? dateInput :
        key === "ownerName" ? ownerName :
        key === "petName" ? petName :
        key === "petType" ? petType :
        key === "phone" ? phone :
        key === "email" ? email :
        null;

      if (p) {
        p.textContent = message || "";
        p.classList.toggle("hidden", !message);
      }
      if (inputEl) {
        inputEl.classList.toggle("error-border", !!message);
      }
    }

    function clearErrors() {
      ["serviceType","professional","date","timeSlot","ownerName","petName","petType","phone","email"]
        .forEach((k) => setError(k, ""));
    }

    function validateStep(step) {
      clearErrors();
      let ok = true;

      if (step === 1) {
        if (!formData.serviceType) { setError("serviceType", "Please select a service"); ok = false; }
        if (!formData.professional) { setError("professional", "Please select a professional"); ok = false; }
      }

      if (step === 2) {
        if (!formData.date) { setError("date", "Please select a date"); ok = false; }
        if (!formData.timeSlot) { setError("timeSlot", "Please select a time"); ok = false; }
      }

      if (step === 3) {
        if (!formData.ownerName.trim()) { setError("ownerName", "Owner name is required"); ok = false; }
        if (!formData.petName.trim()) { setError("petName", "Pet name is required"); ok = false; }
        if (!formData.petType) { setError("petType", "Please select pet type"); ok = false; }

        if (!formData.phone.trim()) { setError("phone", "Phone number is required"); ok = false; }
        else {
          const digits = formData.phone.replace(/\D/g, "");
          if (!/^\d{7,}$/.test(digits)) { setError("phone", "Please enter a valid phone number"); ok = false; }
        }

        if (!formData.email.trim()) { setError("email", "Email is required"); ok = false; }
        else {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError("email", "Please enter a valid email"); ok = false;
          }
        }
      }

      return ok;
    }

    function renderStep() {
      steps.forEach((s) => {
        const n = Number(s.getAttribute("data-step"));
        s.classList.toggle("hidden", n !== currentStep);
      });

      if (stepIndicator) stepIndicator.textContent = `Step ${currentStep} of 3`;

      if (prevBtn) prevBtn.disabled = currentStep === 1;

      const isLast = currentStep === 3;
      if (nextBtn) nextBtn.classList.toggle("hidden", isLast);
      if (confirmBtn) confirmBtn.classList.toggle("hidden", !isLast);
    }

    function renderServices() {
      if (!serviceList) return;
      serviceList.innerHTML = "";

      services.forEach((s) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "choice-btn";
        btn.textContent = s.name;
        btn.dataset.serviceId = s.id;
        btn.classList.toggle("selected", formData.serviceType === s.id);

        btn.addEventListener("click", () => {
          formData.serviceType = s.id;
          formData.professional = "";

          setError("serviceType", "");
          setError("professional", "");

          renderServices();
          renderProfessionals();
          renderSummary();
        });

        serviceList.appendChild(btn);
      });
    }

    function renderProfessionals() {
      if (!professionalField || !professionalList) return;

      const profs = professionalsByService[formData.serviceType] || [];
      const show = !!formData.serviceType;
      professionalField.classList.toggle("hidden", !show);

      professionalList.innerHTML = "";
      profs.forEach((name) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "choice-btn";
        btn.textContent = name;
        btn.classList.toggle("selected", formData.professional === name);

        btn.addEventListener("click", () => {
          formData.professional = name;
          setError("professional", "");
          renderProfessionals();
          renderSummary();
        });

        professionalList.appendChild(btn);
      });
    }

    function renderTimes() {
      if (!timeGrid) return;
      timeGrid.innerHTML = "";

      timeSlots.forEach((t) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "time-btn";
        btn.textContent = t;
        btn.classList.toggle("selected", formData.timeSlot === t);

        btn.addEventListener("click", () => {
          formData.timeSlot = t;
          setError("timeSlot", "");
          renderTimes();
          renderSummary();
        });

        timeGrid.appendChild(btn);
      });
    }

    function renderSummary() {
      if (!summaryBox) return;

      const serviceName = services.find((s) => s.id === formData.serviceType)?.name || "";

      function setSum(el, visible, html) {
        if (!el) return;
        el.classList.toggle("hidden", !visible);
        el.innerHTML = html;
      }

      setSum(sumService, !!formData.serviceType, `<strong>Service:</strong> ${serviceName}`);
      setSum(sumProfessional, !!formData.professional, `<strong>Professional:</strong> ${formData.professional}`);
      setSum(sumDate, !!formData.date, `<strong>Date:</strong> ${formData.date}`);
      setSum(sumTime, !!formData.timeSlot, `<strong>Time:</strong> ${formData.timeSlot}`);
    }

    function setDateBounds() {
      if (!dateInput) return;
      const dates = getAvailableDates();
      dateInput.min = dates[0];
      dateInput.max = dates[dates.length - 1];
    }

    function showSuccess() {
      if (!successWrap || !successText || !successSub) return;

      const owner = formData.ownerName.trim();
      const pet = formData.petName.trim();

      successText.textContent = `Thank you, ${owner}! Your appointment for ${pet} has been confirmed.`;
      successSub.textContent = `We'll send a confirmation email to ${formData.email}`;

      successWrap.classList.remove("hidden");
      panel.classList.add("hidden");

      // auto reset after 3s (como tu setTimeout)
      window.setTimeout(() => {
        formData.serviceType = "";
        formData.professional = "";
        formData.date = "";
        formData.timeSlot = "";
        formData.ownerName = "";
        formData.petName = "";
        formData.petType = "";
        formData.phone = "";
        formData.email = "";

        if (dateInput) dateInput.value = "";
        if (ownerName) ownerName.value = "";
        if (petName) petName.value = "";
        if (petType) petType.value = "";
        if (phone) phone.value = "";
        if (email) email.value = "";

        currentStep = 1;
        clearErrors();
        renderServices();
        renderProfessionals();
        renderTimes();
        renderSummary();
        renderStep();

        successWrap.classList.add("hidden");
        panel.classList.remove("hidden");
      }, 3000);
    }

    // Wire inputs (step 2/3)
    if (dateInput) {
      dateInput.addEventListener("change", (e) => {
        formData.date = e.target.value;
        setError("date", "");
        renderSummary();
      });
    }

    function bindTextInput(el, key) {
      if (!el) return;
      el.addEventListener("input", (e) => {
        formData[key] = e.target.value;
        setError(key, "");
      });
    }

    bindTextInput(ownerName, "ownerName");
    bindTextInput(petName, "petName");
    bindTextInput(phone, "phone");
    bindTextInput(email, "email");

    if (petType) {
      petType.addEventListener("change", (e) => {
        formData.petType = e.target.value;
        setError("petType", "");
      });
    }

    // Nav buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentStep > 1) {
          currentStep -= 1;
          clearErrors();
          renderStep();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (validateStep(currentStep)) {
          currentStep += 1;
          renderStep();
        }
      });
    }

    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        if (validateStep(3)) showSuccess();
      });
    }

    // Initial render
    setDateBounds();
    renderServices();
    renderProfessionals();
    renderTimes();
    renderSummary();
    renderStep();
  }

  // -----------------------------
  // Init
  // -----------------------------
  function init() {
    injectIcons();
    initHeader();
    initFooter();
    initHero();
    initBooking();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
