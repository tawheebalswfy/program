'use strict';

/* helper */
const elementToggleFunc = (elem) => elem.classList.toggle("active");

/* sidebar */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebarBtn) sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

/* testimonials modal (اختياري، ما يضر) */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const toggleTestimonialsModal = () => {
  if (!modalContainer || !overlay) return;
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

testimonialsItem.forEach((item) => {
  item.addEventListener("click", function () {
    if (!modalImg || !modalTitle || !modalText) return;
    const avatar = this.querySelector("[data-testimonials-avatar]");
    const title = this.querySelector("[data-testimonials-title]");
    const text = this.querySelector("[data-testimonials-text]");
    if (avatar) { modalImg.src = avatar.src; modalImg.alt = avatar.alt || "عميل"; }
    if (title) modalTitle.innerHTML = title.innerHTML;
    if (text) modalText.innerHTML = text.innerHTML;
    toggleTestimonialsModal();
  });
});

if (modalCloseBtn) modalCloseBtn.addEventListener("click", toggleTestimonialsModal);
if (overlay) overlay.addEventListener("click", toggleTestimonialsModal);

/* portfolio filter (Arabic-ready) */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const normalize = (s) => (s || "").toString().trim();

const filterFunc = (selectedValue) => {
  const v = normalize(selectedValue);

  filterItems.forEach((item) => {
    const cat = normalize(item.dataset.category);

    if (v === "الكل") item.classList.add("active");
    else if (v === cat) item.classList.add("active");
    else item.classList.remove("active");
  });
};

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });

  selectItems.forEach((btn) => {
    btn.addEventListener("click", function () {
      const v = normalize(this.innerText);
      if (selectValue) selectValue.innerText = v;
      elementToggleFunc(select);
      filterFunc(v);
    });
  });
}

let lastClickedBtn = filterBtn.length ? filterBtn[0] : null;

filterBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    const v = normalize(this.innerText);
    if (selectValue) selectValue.innerText = v;
    filterFunc(v);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

/* contact form enable/disable */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach((inp) => {
  inp.addEventListener("input", () => {
    if (!form || !formBtn) return;
    if (form.checkValidity()) formBtn.removeAttribute("disabled");
    else formBtn.setAttribute("disabled", "");
  });
});

/* page navigation (Arabic-safe) */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const targetPage = normalize(this.innerText);

    pages.forEach((page) => {
      const pageName = normalize(page.dataset.page);
      if (pageName === targetPage) page.classList.add("active");
      else page.classList.remove("active");
    });

    navigationLinks.forEach((btn) => {
      if (normalize(btn.innerText) === targetPage) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    window.scrollTo(0, 0);
  });
});


// ===== WhatsApp Modal (Contact) =====
const waModal = document.querySelector("[data-wa-modal]");
const waOpenBtn = document.querySelector("[data-wa-open]");
const waCloseBtns = document.querySelectorAll("[data-wa-close]");
const waSendBtn = document.querySelector("[data-wa-send]");

function openWaModal() {
  if (!waModal) return;
  waModal.classList.add("active");
}

function closeWaModal() {
  if (!waModal) return;
  waModal.classList.remove("active");
}

if (waOpenBtn) waOpenBtn.addEventListener("click", openWaModal);
waCloseBtns.forEach(btn => btn.addEventListener("click", closeWaModal));

if (waSendBtn) {
  waSendBtn.addEventListener("click", () => {
    const name = (document.getElementById("waName")?.value || "").trim();
    const msg  = (document.getElementById("waMsg")?.value || "").trim();

    const phone = "966537716904"; // بدون + وبدون 00
    const text = `السلام عليكم\nأنا: ${name || "بدون اسم"}\n\n${msg || "أريد الاستفسار عن خدمة برمجية"}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
  });
}

// إغلاق بالـ ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && waModal?.classList.contains("active")) closeWaModal();
});
