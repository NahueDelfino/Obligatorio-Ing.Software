(function () {

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function uid() {
    return (
      crypto?.randomUUID?.() ||
      `id_${Date.now()}_${Math.random().toString(16).slice(2)}`
    );
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

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

  const services = [
    { id: "vet-care", name: "Veterinaria clinica" },
    { id: "vet-care2", name: "Cirugia veterinaria" },
    { id: "grooming", name: "Corte de uñas e higiene básica" },
    { id: "bath", name: "Corte de pelo y estilismo" }
  ];

  const professionalsByService = {
    "vet-care": ["Dra. María García", "Dr. Carlos López", "Dra. Ana Rodríguez"],
    "vet-care2": ["Dra. María García", "Dr. Carlos López", "Dra. Ana Rodríguez"],
    grooming: ["Sofia Martínez", "Marcos Murillo"],
    bath: ["María Carrasco", "Gonzalo Morales"]
  };

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
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

  // -----------------------------
  // Services (Storage / Repo / Auth) - POO
  // -----------------------------
  class StorageService {
    constructor(namespace) {
      this.ns = namespace || "app";
    }
    key(k) {
      return `${this.ns}:${k}`;
    }
    read(k, fallback) {
      try {
        const raw = localStorage.getItem(this.key(k));
        return raw ? JSON.parse(raw) : fallback;
      } catch {
        return fallback;
      }
    }
    write(k, value) {
      localStorage.setItem(this.key(k), JSON.stringify(value));
    }
    remove(k) {
      localStorage.removeItem(this.key(k));
    }
  }

  class BookingRepository {
    constructor(storage) {
      this.storage = storage;
      this.KEY = "bookings";
      this.DRAFT = "bookingDraft";
    }
    list() {
      return this.storage.read(this.KEY, []);
    }
    add(booking) {
      const list = this.list();
      list.unshift(booking);
      this.storage.write(this.KEY, list);
      return booking;
    }
    removeById(id) {
      const next = this.list().filter((b) => b.id !== id);
      this.storage.write(this.KEY, next);
    }
    clearAll() {
      this.storage.write(this.KEY, []);
    }
    saveDraft(draft) {
      this.storage.write(this.DRAFT, draft);
    }
    loadDraft() {
      return this.storage.read(this.DRAFT, null);
    }
    clearDraft() {
      this.storage.remove(this.DRAFT);
    }
  }

  class AuthService {
    constructor(storage) {
      this.storage = storage;
      this.SESSION = "adminSession";
      this.demo = { email: "admin", password: "veterinaria" };
    }
    isLoggedIn() {
      return !!this.storage.read(this.SESSION, null);
    }
    currentUser() {
      return this.storage.read(this.SESSION, null);
    }
    login(email, password) {
      if (email === this.demo.email && password === this.demo.password) {
        const session = { email, loggedAt: new Date().toISOString() };
        this.storage.write(this.SESSION, session);
        return { ok: true, session };
      }
      return { ok: false, message: "Invalid credentials" };
    }
    logout() {
      this.storage.remove(this.SESSION);
    }
  }

  // -----------------------------
  // Header / Footer / Hero - UI
  // -----------------------------
  class HeaderUI {
    mount() {
      this.btn = $("#mobileMenuBtn");
      this.nav = $("#mobileNav");

      this.loginBtn = $("#openAdminLoginBtn");

      if (!this.btn || !this.nav) return;

      const setOpen = (open) => {
        this.nav.classList.toggle("hidden", !open);
        this.btn.setAttribute("aria-expanded", String(open));
        const iconHost = this.btn.querySelector("[data-icon]");
        if (iconHost) iconHost.setAttribute("data-icon", open ? "x" : "menu");
        injectIcons();
        document.body.style.overflow = open ? "hidden" : "";
      };

      this.btn.addEventListener("click", () => {
        const isOpen = this.btn.getAttribute("aria-expanded") === "true";
        setOpen(!isOpen);
      });

      $$(".nav-mobile-link", this.nav).forEach((a) => {
        a.addEventListener("click", () => setOpen(false));
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) setOpen(false);
      });
    }
  }

  class FooterUI {
    mount() {
      const year = new Date().getFullYear();
      const ct = $("#copyrightText");
      if (ct)
        ct.textContent = `© ${year} Huellas Veterinary Clinic. All rights reserved.`;

      $$("[data-scroll]").forEach((btn) => {
        btn.addEventListener("click", () =>
          scrollToId(btn.getAttribute("data-scroll"))
        );
      });
    }
  }

  class HeroUI {
    mount() {
      const btn = $("#heroBookingBtn");
      if (!btn) return;
      btn.addEventListener("click", () => scrollToId("booking"));
    }
  }

  // -----------------------------
  // Booking Wizard UI (POO) + LocalStorage bookings
  // -----------------------------
  function isSunday(dateStr) {
    // dateStr = "YYYY-MM-DD"
    const d = new Date(dateStr + "T00:00:00");
    return d.getDay() === 0; // 0 = Sunday
  }

  class BookingWizardUI {
    constructor(repo) {
      this.repo = repo;
      this.currentStep = 1;
      this.formData = {
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
    }

    mount() {
      this.panel = $("#bookingPanel");
      if (!this.panel) return;

      this.stepIndicator = $("#stepIndicator");
      this.steps = $$(".step", this.panel);

      this.prevBtn = $("#prevBtn");
      this.nextBtn = $("#nextBtn");
      this.confirmBtn = $("#confirmBtn");

      this.serviceList = $("#serviceList");
      this.professionalField = $("#professionalField");
      this.professionalList = $("#professionalList");

      this.dateInput = $("#dateInput");
      this.timeGrid = $("#timeGrid");

      this.ownerName = $("#ownerName");
      this.petName = $("#petName");
      this.petType = $("#petType");
      this.phone = $("#phone");
      this.email = $("#email");

      this.successWrap = $("#bookingSuccess");
      this.successText = $("#successText");
      this.successSub = $("#successSub");

      this.summaryBox = $("#summaryBox");
      this.sumService = this.summaryBox
        ? $('[data-sum="service"]', this.summaryBox)
        : null;
      this.sumProfessional = this.summaryBox
        ? $('[data-sum="professional"]', this.summaryBox)
        : null;
      this.sumDate = this.summaryBox
        ? $('[data-sum="date"]', this.summaryBox)
        : null;
      this.sumTime = this.summaryBox
        ? $('[data-sum="timeSlot"]', this.summaryBox)
        : null;

      const draft = this.repo.loadDraft();
      if (draft) {
        this.currentStep = draft.currentStep || 1;
        this.formData = { ...this.formData, ...draft.formData };
      }

      this.setDateBounds();
      this.renderServices();
      this.renderProfessionals();
      this.renderTimes();
      this.hydrateInputs();
      this.renderSummary();
      this.renderStep();
      this.bindEvents();
    }

    persistDraft() {
      this.repo.saveDraft({
        currentStep: this.currentStep,
        formData: { ...this.formData },
      });
    }

    hydrateInputs() {
      if (this.dateInput) this.dateInput.value = this.formData.date || "";
      if (this.ownerName) this.ownerName.value = this.formData.ownerName || "";
      if (this.petName) this.petName.value = this.formData.petName || "";
      if (this.petType) this.petType.value = this.formData.petType || "";
      if (this.phone) this.phone.value = this.formData.phone || "";
      if (this.email) this.email.value = this.formData.email || "";
    }

    setError(key, message) {
      const p = $(`[data-error-for="${key}"]`, this.panel);
      const inputEl =
        key === "date"
          ? this.dateInput
          : key === "ownerName"
            ? this.ownerName
            : key === "petName"
              ? this.petName
              : key === "petType"
                ? this.petType
                : key === "phone"
                  ? this.phone
                  : key === "email"
                    ? this.email
                    : null;

      if (p) {
        p.textContent = message || "";
        p.classList.toggle("hidden", !message);
      }
      if (inputEl) inputEl.classList.toggle("error-border", !!message);
    }

    clearErrors() {
      [
        "serviceType",
        "professional",
        "date",
        "timeSlot",
        "ownerName",
        "petName",
        "petType",
        "phone",
        "email",
      ].forEach((k) => this.setError(k, ""));
    }

    validateStep(step) {
      this.clearErrors();
      let ok = true;

      if (step === 1) {
        if (!this.formData.serviceType) {
          this.setError("serviceType", "Seleccione un servicio");
          ok = false;
        }
        if (!this.formData.professional) {
          this.setError("professional", "Seleccione un profesional");
          ok = false;
        }
      }
      if (step === 2) {
        if (!this.formData.date) {
          this.setError("date", "Seleccione una fecha");
          ok = false;
        }
        if (!this.formData.timeSlot) {
          this.setError("timeSlot", "Seleccione un horario");
          ok = false;
        }
        if (this.formData.date && isSunday(this.formData.date)) {
          this.setError("date", "Los domingos está cerrado. Elegí otro día.");
          ok = false;
        }
      }
      if (step === 3) {
        if (!this.formData.ownerName.trim()) {
          this.setError("ownerName", "Su nombre es requerido");
          ok = false;
        }
        if (!this.formData.petName.trim()) {
          this.setError("petName", "El nombre de la mascota es requerido");
          ok = false;
        }
        if (!this.formData.petType) {
          this.setError("petType", "Seleccione un tipo");
          ok = false;
        }

        if (!this.formData.phone.trim()) {
          this.setError("phone", "El número de telefono es requerido");
          ok = false;
        } else {
          const digits = this.formData.phone.replace(/\D/g, "");
          if (!/^\d{7,}$/.test(digits)) {
            this.setError("phone", "Ingrese un telefono valido");
            ok = false;
          }
        }

        if (!this.formData.email.trim()) {
          this.setError("email", "El email es requerido");
          ok = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
          this.setError("email", "Ingrese un email valido");
          ok = false;
        }
      }

      return ok;
    }

    renderStep() {
      this.steps.forEach((s) => {
        const n = Number(s.getAttribute("data-step"));
        s.classList.toggle("hidden", n !== this.currentStep);
      });

      if (this.stepIndicator)
        this.stepIndicator.textContent = `Paso ${this.currentStep} de 3`;
      if (this.prevBtn) this.prevBtn.disabled = this.currentStep === 1;

      const isLast = this.currentStep === 3;
      if (this.nextBtn) this.nextBtn.classList.toggle("hidden", isLast);
      if (this.confirmBtn) this.confirmBtn.classList.toggle("hidden", !isLast);
    }

    renderServices() {
      if (!this.serviceList) return;
      this.serviceList.innerHTML = "";

      services.forEach((s) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "choice-btn";
        btn.textContent = s.name;
        btn.classList.toggle("selected", this.formData.serviceType === s.id);

        btn.addEventListener("click", () => {
          this.formData.serviceType = s.id;
          this.formData.professional = "";
          this.setError("serviceType", "");
          this.setError("professional", "");
          this.renderServices();
          this.renderProfessionals();
          this.renderSummary();
          this.persistDraft();
        });

        this.serviceList.appendChild(btn);
      });
    }

    renderProfessionals() {
      if (!this.professionalField || !this.professionalList) return;

      const profs = professionalsByService[this.formData.serviceType] || [];
      const show = !!this.formData.serviceType;
      this.professionalField.classList.toggle("hidden", !show);

      this.professionalList.innerHTML = "";
      profs.forEach((name) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "choice-btn";
        btn.textContent = name;
        btn.classList.toggle("selected", this.formData.professional === name);

        btn.addEventListener("click", () => {
          this.formData.professional = name;
          this.setError("professional", "");
          this.renderProfessionals();
          this.renderSummary();
          this.persistDraft();
        });

        this.professionalList.appendChild(btn);
      });
    }

    renderTimes() {
      if (!this.timeGrid) return;
      this.timeGrid.innerHTML = "";

      timeSlots.forEach((t) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "time-btn";
        btn.textContent = t;
        btn.classList.toggle("selected", this.formData.timeSlot === t);

        btn.addEventListener("click", () => {
          this.formData.timeSlot = t;
          this.setError("timeSlot", "");
          this.renderTimes();
          this.renderSummary();
          this.persistDraft();
        });

        this.timeGrid.appendChild(btn);
      });
    }

    renderSummary() {
      if (!this.summaryBox) return;

      const serviceName =
        services.find((s) => s.id === this.formData.serviceType)?.name || "";

      const setSum = (el, visible, html) => {
        if (!el) return;
        el.classList.toggle("hidden", !visible);
        el.innerHTML = html;
      };

      setSum(
        this.sumService,
        !!this.formData.serviceType,
        `<strong>Service:</strong> ${escapeHtml(serviceName)}`
      );
      setSum(
        this.sumProfessional,
        !!this.formData.professional,
        `<strong>Professional:</strong> ${escapeHtml(
          this.formData.professional
        )}`
      );
      setSum(
        this.sumDate,
        !!this.formData.date,
        `<strong>Date:</strong> ${escapeHtml(this.formData.date)}`
      );
      setSum(
        this.sumTime,
        !!this.formData.timeSlot,
        `<strong>Time:</strong> ${escapeHtml(this.formData.timeSlot)}`
      );
    }

    setDateBounds() {
      if (!this.dateInput) return;
      const dates = getAvailableDates();
      this.dateInput.min = dates[0];
      this.dateInput.max = dates[dates.length - 1];
    }

    bindEvents() {
      if (this.dateInput) {
        this.dateInput.addEventListener("change", (e) => {
          const value = e.target.value;

          // No permitir domingos
          if (value && isSunday(value)) {
            this.formData.date = "";
            this.dateInput.value = "";
            this.setError("date", "Los domingos está cerrado. Elegí otro día.");
            this.renderSummary();
            this.persistDraft();
            return;
          }

          this.formData.date = value;
          this.setError("date", "");
          this.renderSummary();
          this.persistDraft();
        });
      }

      const bindTextInput = (el, key) => {
        if (!el) return;
        el.addEventListener("input", (e) => {
          this.formData[key] = e.target.value;
          this.setError(key, "");
          this.persistDraft();
        });
      };

      bindTextInput(this.ownerName, "ownerName");
      bindTextInput(this.petName, "petName");
      bindTextInput(this.phone, "phone");
      bindTextInput(this.email, "email");

      if (this.petType) {
        this.petType.addEventListener("change", (e) => {
          this.formData.petType = e.target.value;
          this.setError("petType", "");
          this.persistDraft();
        });
      }

      if (this.prevBtn) {
        this.prevBtn.addEventListener("click", () => {
          if (this.currentStep > 1) {
            this.currentStep -= 1;
            this.clearErrors();
            this.renderStep();
            this.persistDraft();
          }
        });
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener("click", () => {
          if (this.validateStep(this.currentStep)) {
            this.currentStep += 1;
            this.renderStep();
            this.persistDraft();
          }
        });
      }

      if (this.confirmBtn) {
        this.confirmBtn.addEventListener("click", () => {
          if (!this.validateStep(3)) return;

          const booking = {
            id: uid(),
            serviceType: this.formData.serviceType,
            serviceName:
              services.find((s) => s.id === this.formData.serviceType)?.name ||
              "",
            professional: this.formData.professional,
            date: this.formData.date,
            timeSlot: this.formData.timeSlot,
            ownerName: this.formData.ownerName,
            petName: this.formData.petName,
            petType: this.formData.petType,
            phone: this.formData.phone,
            email: this.formData.email,
            createdAt: new Date().toISOString(),
          };

          this.repo.add(booking);
          this.repo.clearDraft();

          this.showSuccess();

          window.setTimeout(() => {
            this.formData = {
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

            this.currentStep = 1;

            this.hydrateInputs();
            this.clearErrors();
            this.renderServices();
            this.renderProfessionals();
            this.renderTimes();
            this.renderSummary();
            this.renderStep();

            if (this.successWrap) this.successWrap.classList.add("hidden");
            if (this.panel) this.panel.classList.remove("hidden");
          }, 3000);
        });
      }
    }

    showSuccess() {
      if (!this.successWrap || !this.successText || !this.successSub) return;

      const owner = this.formData.ownerName.trim();
      const pet = this.formData.petName.trim();

      this.successText.textContent = `Gracias, ${owner}! Tu cita ${pet} ha sido confirmada.`;

      this.successWrap.classList.remove("hidden");
      this.panel.classList.add("hidden");
    }
  }

  class AppShell {
    constructor(auth) {
      this.auth = auth;
      this.publicApp = $("#publicApp");
      this.adminSection = $("#admin");
      this.footer = $("#siteFooter");
    }

    syncFromSession() {
      this.setAdminMode(this.auth.isLoggedIn());
    }

    setAdminMode(isAdmin) {
      document.body.classList.toggle("is-admin", isAdmin);

      if (this.publicApp) this.publicApp.classList.toggle("hidden", isAdmin);
      if (this.footer) this.footer.classList.toggle("hidden", isAdmin);
      if (this.adminSection) this.adminSection.classList.toggle("hidden", !isAdmin);

      if (isAdmin) window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  class AdminLoginModalUI {
    constructor(auth, shell) {
      this.auth = auth;
      this.shell = shell;
    }

    mount() {
      this.modal = $("#adminLoginModal");
      if (!this.modal) return;

      this.openBtn = $("#openAdminLoginBtn");
      this.openBtnMobile = $("#openAdminLoginBtnMobile");
      this.closeBtn = $("#closeAdminLoginBtn");

      this.email = $("#adminUser");
      this.password = $("#adminPassword");
      this.emailError = $("#adminUserError");
      this.passwordError = $("#adminPasswordError");
      this.loginBtn = $("#adminLoginBtn");

      const open = (e) => {
        e?.preventDefault?.();
        this.open();
      };
      this.openBtn?.addEventListener("click", open);
      this.openBtnMobile?.addEventListener("click", open);

      this.closeBtn?.addEventListener("click", () => this.close());
      this.modal.addEventListener("click", (e) => {
        const target = e.target;
        if (target?.matches?.("[data-close-modal='true']")) this.close();
      });
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !this.modal.classList.contains("hidden")) this.close();
      });

      this.loginBtn?.addEventListener("click", () => this.handleLogin());
      this.password?.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.handleLogin();
      });
    }

    setFieldError(el, message) {
      if (!el) return;
      el.textContent = message || "";
      el.classList.toggle("hidden", !message);
    }

    clearErrors() {
      this.setFieldError(this.emailError, "");
      this.setFieldError(this.passwordError, "");
    }

    open() {
      if (!this.modal) return;
      this.clearErrors();
      this.modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      injectIcons();
      this.email?.focus?.();
    }

    close() {
      if (!this.modal) return;
      this.modal.classList.add("hidden");
      document.body.style.overflow = "";
    }

    handleLogin() {
      const email = (this.email?.value || "").trim();
      const password = (this.password?.value || "").trim();

      this.clearErrors();

      let ok = true;
      if (!email) {
        this.setFieldError(this.emailError, "Email is required");
        ok = false;
      }
      if (!password) {
        this.setFieldError(this.passwordError, "Password is required");
        ok = false;
      }
      if (!ok) return;

      const res = this.auth.login(email, password);
      if (!res.ok) {
        this.setFieldError(this.passwordError, "Invalid email or password");
        return;
      }

      if (this.password) this.password.value = "";
      this.close();
      this.shell.setAdminMode(true);

      window.dispatchEvent(new CustomEvent("huellas:admin:login"));
    }
  }

  class AdminUI {
    constructor(auth, repo, shell) {
      this.auth = auth;
      this.repo = repo;
      this.shell = shell;
    }

    mount() {
      this.dashboard = $("#adminDashboard");
      if (!this.dashboard) return;

      this.logoutBtn = $("#adminLogoutBtn");
      this.refreshBtn = $("#adminRefreshBtn");

      this.welcome = $("#adminWelcome");
      this.tbody = $("#adminBookingsBody");
      this.empty = $("#adminEmptyState");

      this.logoutBtn?.addEventListener("click", () => this.handleLogout());
      this.refreshBtn?.addEventListener("click", () => this.renderBookings());

      window.addEventListener("huellas:admin:login", () => this.render());

      this.render();
    }

    handleLogout() {
      this.auth.logout();
      this.shell.setAdminMode(false);
      this.render();
    }

    render() {
      const logged = this.auth.isLoggedIn();
      this.dashboard.classList.toggle("hidden", !logged);
      this.shell.setAdminMode(logged);
      if (!logged) return;
      const user = this.auth.currentUser();
      if (this.welcome)
        this.welcome.textContent = `Logueado: ${user?.email || ""}`;
      this.renderBookings();
    }

    renderBookings() {
      if (!this.tbody || !this.empty) return;
      const list = this.repo.list();
      this.tbody.innerHTML = "";
      if (!list.length) {
        this.empty.textContent = "No hay reservas.";
        return;
      }
      this.empty.textContent = "";

      list.forEach((b) => {
        const tr = document.createElement("tr");
        const cells = [
          b.date || "",
          b.timeSlot || "",
          b.serviceName || "",
          b.professional || "",
          b.ownerName || "",
          b.petName || "",
          b.petType || "",
          b.phone || "",
          b.email || "",
        ];
        cells.forEach((txt) => {
          const td = document.createElement("td");
          td.textContent = txt;
          tr.appendChild(td);
        });

        this.tbody.appendChild(tr);
      });
      $$("[data-del]", this.tbody).forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-del");
          if (!id) return;
          this.repo.removeById(id);
          this.renderBookings();
        });
      });
    }
  }

  // -----------------------------
  // Init (manteniendo tu estilo)
  // -----------------------------
  function init() {
    injectIcons();

    // UI basics
    new HeaderUI().mount();
    new FooterUI().mount();
    new HeroUI().mount();

    // Services
    const storage = new StorageService("huellas");
    const repo = new BookingRepository(storage);
    const auth = new AuthService(storage);

    // App shell (public <-> admin)
    const shell = new AppShell(auth);
    shell.syncFromSession();

    // Booking wizard (public)
    new BookingWizardUI(repo).mount();

    // Admin dashboard + modal login
    new AdminUI(auth, repo, shell).mount();
    new AdminLoginModalUI(auth, shell).mount();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();