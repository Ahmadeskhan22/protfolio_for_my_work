document.documentElement.classList.add("js-enabled");

const orderForm = document.querySelector("#service-order-form");

if (orderForm) {
  const orderName = document.querySelector("#order-name");
  const orderPhone = document.querySelector("#order-phone");
  const orderStatus = document.querySelector("#order-status");
  const orderSubmit = orderForm.querySelector('button[type="submit"]');
  const packageSelect = document.querySelector("#order-package");
  const defaultSubmitLabel = orderSubmit.textContent;
  const normalizePhone = (value) => value.replace(/[٠-٩۰-۹]/g, (digit) => {
    const code = digit.charCodeAt(0);
    return String(code - (code >= 0x06f0 ? 0x06f0 : 0x0660));
  }).trim();

  orderName.addEventListener("input", () => orderName.setCustomValidity(""));
  orderPhone.addEventListener("input", () => orderPhone.setCustomValidity(""));

  document.querySelectorAll(".package-order-link").forEach((link) => {
    link.addEventListener("click", () => {
      packageSelect.value = link.dataset.package;
    });
  });

  orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    orderStatus.textContent = "";
    orderStatus.dataset.state = "";

    orderName.setCustomValidity(
      orderName.value.trim().length >= 2 ? "" : "أدخل اسمك الكامل."
    );
    const normalizedPhone = normalizePhone(orderPhone.value);
    const phoneDigits = normalizedPhone.replace(/\D/g, "");
    orderPhone.setCustomValidity(
      /^\+?[\d\s().-]+$/.test(normalizedPhone) && phoneDigits.length >= 7 && phoneDigits.length <= 15
        ? ""
        : "أدخل رقم هاتف صحيحاً يتضمن من 7 إلى 15 رقماً."
    );

    if (!orderForm.reportValidity()) return;

    if (orderForm.action.includes("YOUR_FORM_ID")) {
      orderStatus.textContent = "النموذج غير مفعّل بعد. أضف رابط Formspree الخاص بك إلى إعدادات النموذج.";
      orderStatus.dataset.state = "error";
      return;
    }

    orderSubmit.disabled = true;
    orderSubmit.textContent = "جارٍ إرسال طلبك...";

    try {
      const response = await fetch(orderForm.action, {
        method: "POST",
        body: new FormData(orderForm),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Form submission failed");

      orderForm.reset();
      orderStatus.textContent = "شكراً لك! وصلنا طلبك وسنتواصل معك قريباً.";
      orderStatus.dataset.state = "success";
    } catch {
      orderStatus.textContent = "تعذر إرسال طلبك الآن. تحقق من اتصالك بالإنترنت وحاول مرة أخرى.";
      orderStatus.dataset.state = "error";
    } finally {
      orderSubmit.disabled = false;
      orderSubmit.textContent = defaultSubmitLabel;
    }
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!("IntersectionObserver" in window) || reduceMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();
