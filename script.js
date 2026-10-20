
const WHATSAPP_NUMBER = "919742579783";

const orderForm = document.getElementById("orderForm");
const formHelp = document.getElementById("formHelp");
const itemsContainer = document.getElementById("itemsContainer");
const addItemRowButton = document.getElementById("addItemRow");

let currentLanguage = "en";

const translations = {
  en: {
    title: "Hello Namma Seva, I'd like to place an order.",
    name: "Name",
    phone: "Contact number",
    apartment: "Apartment / layout",
    flat: "Flat / house number",
    address: "Delivery address",
    type: "Order category",
    items: "Items required",
    notes: "Additional instructions",
    fee: "Delivery charge: ₹19",
    pending: "Please confirm availability, final prices, payment details and estimated delivery time. This is an order request, not a confirmed order.",
    invalidPhone: "Enter a valid 10-digit Indian mobile number.",
    missingNumber: "The WhatsApp number is not configured correctly.",
    success: "WhatsApp is opening with your order details. Review the message and tap Send.",
    addItem: "+ Add Item",
    itemPlaceholder: "Item name",
    quantityPlaceholder: "Quantity",
    removeLabel: "Remove item"
  },

  kn: {
    title: "ನಮಸ್ಕಾರ Namma Seva, ನಾನು ಆರ್ಡರ್ ಮಾಡಲು ಬಯಸುತ್ತೇನೆ.",
    name: "ಹೆಸರು",
    phone: "ಸಂಪರ್ಕ ಸಂಖ್ಯೆ",
    apartment: "ಅಪಾರ್ಟ್‌ಮೆಂಟ್ / ಲೇಔಟ್",
    flat: "ಫ್ಲಾಟ್ / ಮನೆ ಸಂಖ್ಯೆ",
    address: "ಡೆಲಿವರಿ ವಿಳಾಸ",
    type: "ಆರ್ಡರ್ ವರ್ಗ",
    items: "ಬೇಕಾದ ವಸ್ತುಗಳು",
    notes: "ಹೆಚ್ಚುವರಿ ಸೂಚನೆಗಳು",
    fee: "ಡೆಲಿವರಿ ಶುಲ್ಕ: ₹19",
    pending: "ದಯವಿಟ್ಟು ಲಭ್ಯತೆ, ಅಂತಿಮ ಬೆಲೆ, ಪಾವತಿ ವಿವರ ಮತ್ತು ಅಂದಾಜು ಡೆಲಿವರಿ ಸಮಯ ದೃಢಪಡಿಸಿ. ಇದು ಆರ್ಡರ್ ವಿನಂತಿ ಮಾತ್ರ; ಖಚಿತ ಆರ್ಡರ್ ಅಲ್ಲ.",
    invalidPhone: "ದಯವಿಟ್ಟು ಸರಿಯಾದ 10 ಅಂಕಿಗಳ ಭಾರತೀಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
    missingNumber: "ವಾಟ್ಸಾಪ್ ಸಂಖ್ಯೆ ಸರಿಯಾಗಿಲ್ಲ.",
    success: "ನಿಮ್ಮ ಆರ್ಡರ್ ವಿವರಗಳೊಂದಿಗೆ ವಾಟ್ಸಾಪ್ ತೆರೆಯುತ್ತಿದೆ. ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ Send ಒತ್ತಿ.",
    addItem: "+ ವಸ್ತು ಸೇರಿಸಿ",
    itemPlaceholder: "ವಸ್ತುವಿನ ಹೆಸರು",
    quantityPlaceholder: "ಪ್ರಮಾಣ",
    removeLabel: "ವಸ್ತು ತೆಗೆದುಹಾಕಿ"
  }
};

function addItemRow() {
  const row = document.createElement("div");
  row.className = "item-row";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "itemName[]";
  nameInput.required = true;
  nameInput.placeholder = translations[currentLanguage].itemPlaceholder;
  nameInput.setAttribute("aria-label", translations[currentLanguage].itemPlaceholder);

  const quantityInput = document.createElement("input");
  quantityInput.type = "text";
  quantityInput.name = "itemQuantity[]";
  quantityInput.required = true;
  quantityInput.placeholder = translations[currentLanguage].quantityPlaceholder;
  quantityInput.setAttribute("aria-label", translations[currentLanguage].quantityPlaceholder);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-row";
  removeButton.textContent = "−";
  removeButton.setAttribute("aria-label", translations[currentLanguage].removeLabel);
  removeButton.addEventListener("click", () => removeItemRow(removeButton));

  row.append(nameInput, quantityInput, removeButton);
  itemsContainer.appendChild(row);
}

function removeItemRow(button) {
  const rows = itemsContainer.querySelectorAll(".item-row");

  if (rows.length === 1) {
    const inputs = rows[0].querySelectorAll("input");
    inputs.forEach(input => {
      input.value = "";
      input.setCustomValidity("");
    });
    inputs[0].focus();
    return;
  }

  button.closest(".item-row").remove();
}

addItemRowButton.addEventListener("click", addItemRow);

function getOrderItems() {
  const rows = [...itemsContainer.querySelectorAll(".item-row")];

  return rows.map(row => {
    const inputs = row.querySelectorAll("input");

    return {
      name: inputs[0].value.trim(),
      quantity: inputs[1].value.trim()
    };
  });
}

function updateItemLanguage() {
  const t = translations[currentLanguage];

  addItemRowButton.textContent = t.addItem;

  itemsContainer.querySelectorAll(".item-row").forEach(row => {
    const inputs = row.querySelectorAll("input");

    inputs[0].placeholder = t.itemPlaceholder;
    inputs[0].setAttribute("aria-label", t.itemPlaceholder);

    inputs[1].placeholder = t.quantityPlaceholder;
    inputs[1].setAttribute("aria-label", t.quantityPlaceholder);

    row.querySelector(".remove-row").setAttribute(
      "aria-label",
      t.removeLabel
    );
  });
}

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;

  document.querySelectorAll("[data-en][data-kn]").forEach(element => {
    const value = element.dataset[language];

    if (value === undefined) return;

    if (element.tagName === "H1") {
      element.innerHTML = value;
    } else {
      element.textContent = value;
    }
  });

  document.querySelectorAll("option[data-en][data-kn]").forEach(option => {
    option.textContent = option.dataset[language];
  });

  const langToggle = document.getElementById("langToggle");

  if (langToggle) {
    langToggle.textContent = language === "en" ? "ಕನ್ನಡ" : "English";
    langToggle.setAttribute(
      "aria-label",
      language === "en" ? "Switch to Kannada" : "Switch to English"
    );
  }

  updateItemLanguage();
}

document.getElementById("langToggle").addEventListener("click", () => {
  setLanguage(currentLanguage === "en" ? "kn" : "en");
});

document.getElementById("year").textContent = new Date().getFullYear();

orderForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!orderForm.reportValidity()) return;

  const t = translations[currentLanguage];
  const data = new FormData(orderForm);

  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    formHelp.textContent = t.missingNumber;
    return;
  }

  const phoneDigits = String(data.get("phone") || "").replace(/\D/g, "");

  if (!/^(?:91)?[6-9]\d{9}$/.test(phoneDigits)) {
    const phoneInput = orderForm.elements.namedItem("phone");

    phoneInput.setCustomValidity(t.invalidPhone);
    phoneInput.reportValidity();
    phoneInput.addEventListener(
      "input",
      () => phoneInput.setCustomValidity(""),
      { once: true }
    );
    return;
  }

  const items = getOrderItems();

  if (
    items.length === 0 ||
    items.some(item => !item.name || !item.quantity)
  ) {
    formHelp.textContent = currentLanguage === "kn"
      ? "ಪ್ರತಿ ವಸ್ತುವಿನ ಹೆಸರು ಮತ್ತು ಪ್ರಮಾಣವನ್ನು ನಮೂದಿಸಿ."
      : "Please enter the name and quantity for every item.";
    return;
  }

  const clean = key => String(data.get(key) || "").trim();

  const lines = [
    t.title,
    "",
    `${t.name}: ${clean("name")}`,
    `${t.phone}: ${clean("phone")}`,
    `${t.apartment}: ${clean("apartment")}`,
    `${t.flat}: ${clean("flat")}`,
    `${t.address}: ${clean("address")}`,
    `${t.type}: ${clean("type")}`,
    "",
    `${t.items}:`,
    ...items.map((item, index) =>
      `${index + 1}. ${item.name} — ${item.quantity}`
    )
  ];

  const notes = clean("notes");

  if (notes) {
    lines.push("", `${t.notes}: ${notes}`);
  }

  lines.push("", t.fee, t.pending);

  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;

  const whatsappWindow = window.open(url, "_blank");

  if (whatsappWindow) {
    whatsappWindow.opener = null;
    formHelp.textContent = t.success;
  } else {
    formHelp.textContent = currentLanguage === "kn"
      ? "ವಾಟ್ಸಾಪ್ ತೆರೆಯಲು ಕೆಳಗಿನ ಲಿಂಕ್ ಬಳಸಿ."
      : "If WhatsApp did not open, use this link:";

    const fallback = document.createElement("a");
    fallback.href = url;
    fallback.target = "_blank";
    fallback.rel = "noopener noreferrer";
    fallback.className = "text-link";
    fallback.textContent = currentLanguage === "kn"
      ? "ವಾಟ್ಸಾಪ್ ತೆರೆಯಿರಿ"
      : "Open WhatsApp";

    formHelp.append(" ", fallback);
  }
});

updateItemLanguage();

const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");

phoneInput.addEventListener("input", function () {
  // Allow only digits 0–9 and a maximum of 10 digits.
  this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);

  const valid = /^[6-9][0-9]{9}$/.test(this.value);

  if (this.value.length === 0) {
    phoneError.style.display = "none";
    this.setCustomValidity("");
  } else if (!valid) {
    phoneError.textContent = this.value.length < 10
      ? "Please enter all 10 digits."
      : "Enter a valid 10-digit mobile number.";
    phoneError.style.display = "block";
    this.setCustomValidity("Enter a valid 10-digit mobile number.");
  } else {
    phoneError.style.display = "none";
    this.setCustomValidity("");
  }
});