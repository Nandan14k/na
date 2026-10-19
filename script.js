/*
  IMPORTANT SETUP:
  Replace the placeholder below with Namma Seva's WhatsApp number in international format.
  India country code is 91; use digits only, no +, spaces, or hyphens.
  Example format: 919876543210
*/
const WHATSAPP_NUMBER = "919742579783";

const langToggle = document.getElementById("langToggle");
let currentLanguage = "en";

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language === "kn" ? "kn" : "en";
  document.querySelectorAll("[data-en][data-kn]").forEach((element) => {
    const value = element.dataset[language];
    if (value !== undefined) {
      // Only headings and content intentionally authored with HTML use innerHTML.
      if (element.tagName === "H1") element.innerHTML = value;
      else element.textContent = value;
    }
  });
  langToggle.textContent = language === "en" ? "ಕನ್ನಡ" : "English";
  langToggle.setAttribute("aria-label", language === "en" ? "Switch to Kannada" : "Switch to English");
  document.querySelectorAll("option[data-en][data-kn]").forEach((option) => {
    option.textContent = option.dataset[language];
  });
}
langToggle.addEventListener("click", () => setLanguage(currentLanguage === "en" ? "kn" : "en"));

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("orderForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    const message = currentLanguage === "kn"
      ? "ವೆಬ್‌ಸೈಟ್ ಸೆಟಪ್ ಪೂರ್ಣಗೊಳಿಸಲು script.js ಫೈಲ್‌ನಲ್ಲಿ ನಿಮ್ಮ Namma Seva WhatsApp ಸಂಖ್ಯೆಯನ್ನು ಸೇರಿಸಿ."
      : "Website setup is almost done. Add Namma Seva's WhatsApp number in script.js before using the order form.";
    document.getElementById("formHelp").textContent = message;
    return;
  }

  const data = new FormData(form);
  const labels = currentLanguage === "kn" ? {
    title: "ನಮಸ್ಕಾರ Namma Seva, ನಾನು ಆರ್ಡರ್ ಮಾಡಲು ಬಯಸುತ್ತೇನೆ.",
    name: "ಹೆಸರು", phone: "ಸಂಪರ್ಕ ಸಂಖ್ಯೆ", apartment: "ಅಪಾರ್ಟ್‌ಮೆಂಟ್ / ಲೇಔಟ್",
    flat: "ಫ್ಲಾಟ್ / ಮನೆ ಸಂಖ್ಯೆ", address: "ಡೆಲಿವರಿ ವಿಳಾಸ", type: "ಆರ್ಡರ್ ಪ್ರಕಾರ",
    items: "ಬೇಕಾದ ವಸ್ತುಗಳು", notes: "ಹೆಚ್ಚುವರಿ ಮಾಹಿತಿ", fee: "ಡೆಲಿವರಿ ಶುಲ್ಕ: ₹19",
    pending: "ದಯವಿಟ್ಟು ಲಭ್ಯತೆ, ಅಂತಿಮ ಬೆಲೆ ಮತ್ತು ಡೆಲಿವರಿ ಸಮಯವನ್ನು ದೃಢಪಡಿಸಿ. ಈ ಸಂದೇಶ ಕಳುಹಿಸುವುದರಿಂದ ಆರ್ಡರ್ ಖಚಿತವಾಗುವುದಿಲ್ಲ."
  } : {
    title: "Hello Namma Seva, I'd like to place an order.",
    name: "Name", phone: "Contact number", apartment: "Apartment / layout",
    flat: "Flat / house number", address: "Delivery address", type: "Order type",
    items: "Items required", notes: "Additional notes", fee: "Delivery charge: ₹19",
    pending: "Please confirm availability, final prices and delivery timing. This message is a request, not a confirmed order."
  };

  const lines = [
    labels.title, "",
    `${labels.name}: ${data.get("name")}`,
    `${labels.phone}: ${data.get("phone")}`,
    `${labels.apartment}: ${data.get("apartment")}`,
    `${labels.flat}: ${data.get("flat")}`,
    `${labels.address}: ${data.get("address")}`,
    `${labels.type}: ${data.get("type")}`,
    `${labels.items}:\n${data.get("items")}`,
    data.get("notes") ? `${labels.notes}: ${data.get("notes")}` : null,
    "", labels.fee, labels.pending
  ].filter((line) => line !== null);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
