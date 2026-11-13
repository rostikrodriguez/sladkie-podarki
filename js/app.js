function openDialog(dialog) {
  if (!dialog.open) dialog.showModal();
}

function setupDialog(dialog) {
  dialog.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => dialog.close());
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function openProduct(item) {
  const dialog = document.getElementById("product-modal");
  const image = document.getElementById("product-image");
  image.src = item.image;
  image.alt = item.name;
  document.getElementById("product-title").textContent = item.name;
  document.getElementById("product-text").textContent = item.description;
  openDialog(dialog);
}

function openLightbox(item) {
  const dialog = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-image");
  image.src = item.image;
  image.alt = item.name;
  document.getElementById("lightbox-caption").textContent = item.name;
  openDialog(dialog);
}

function renderFaq(items) {
  const list = document.getElementById("faq-list");
  items.forEach((item) => {
    const wrap = document.createElement("div");
    wrap.className = "qa";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "q";
    button.setAttribute("aria-expanded", "false");
    const label = document.createElement("span");
    label.textContent = item.q;
    const mark = document.createElement("span");
    mark.className = "mark";
    mark.setAttribute("aria-hidden", "true");
    mark.textContent = "+";
    button.append(label, mark);
    const answer = document.createElement("div");
    answer.className = "a";
    const inner = document.createElement("div");
    inner.className = "a-inner";
    inner.textContent = item.a;
    answer.append(inner);
    button.addEventListener("click", () => {
      const willOpen = !wrap.classList.contains("open");
      list.querySelectorAll(".qa.open").forEach((other) => {
        other.classList.remove("open");
        const otherButton = other.querySelector(".q");
        otherButton.setAttribute("aria-expanded", "false");
        otherButton.querySelector(".mark").textContent = "+";
      });
      if (willOpen) {
        wrap.classList.add("open");
        button.setAttribute("aria-expanded", "true");
        mark.textContent = "−";
      }
    });
    wrap.append(button, answer);
    list.append(wrap);
  });
}

function mountDrum(section, items, maxInertia) {
  const viewport = section.querySelector("[data-viewport]");
  const nameEl = section.querySelector("[data-name]");
  const counterEl = section.querySelector("[data-counter]");
  const reel = new Reel(viewport, items, {
    maxInertia: maxInertia,
    onIndex(index) {
      const item = items[index];
      nameEl.textContent = item.name;
      counterEl.textContent = (index + 1) + " из " + items.length;
    },
    onTap(index) {
      openLightbox(items[index]);
    },
  });
  section.querySelectorAll("[data-step]").forEach((button) => {
    button.addEventListener("click", () => {
      reel.step(Number(button.getAttribute("data-step")));
    });
  });
  section.querySelector("[data-about]").addEventListener("click", () => {
    openProduct(items[reel.index]);
  });
  return reel;
}

function placeTwinkles() {
  const root = document.getElementById("frame-twinkles");
  if (!root) return;
  root.innerHTML = "";

  // Точки вдоль еловой гирлянды на рамке: верхний бордюр, бока и низ
  const spots = [];
  for (let i = 0; i < 10; i += 1) {
    spots.push({ x: 14 + i * 8, y: 14.5 + (i % 3) * 1.1 });
  }
  for (let i = 0; i < 14; i += 1) {
    spots.push({ x: 4.8 + (i % 2) * 2.4, y: 20 + i * 5.2 });
    spots.push({ x: 95.2 - (i % 2) * 2.4, y: 20 + i * 5.2 });
  }
  for (let i = 0; i < 12; i += 1) {
    spots.push({ x: 10 + i * 7.2, y: 91 + (i % 2) * 2.2 });
  }

  spots.forEach((spot, index) => {
    const dot = document.createElement("span");
    dot.className = "twinkle";
    dot.style.left = spot.x + "%";
    dot.style.top = spot.y + "%";
    dot.style.setProperty("--delay", ((index * 0.17) % 2.4) + "s");
    dot.style.setProperty("--dur", 1.4 + (index % 5) * 0.28 + "s");
    root.append(dot);
  });
}

function boot() {
  const contact = document.getElementById("contact");
  contact.href = SITE.contact.href;
  contact.textContent = SITE.contact.label;
  contact.target = "_blank";
  contact.rel = "noopener";

  placeTwinkles();
  mountDrum(document.getElementById("spices-drum"), SITE.spices, 7);
  mountDrum(document.getElementById("tinctures-drum"), SITE.tinctures, 4);
  renderFaq(SITE.faq);

  const productModal = document.getElementById("product-modal");
  const faqModal = document.getElementById("faq-modal");
  const lightbox = document.getElementById("lightbox");
  setupDialog(productModal);
  setupDialog(faqModal);
  setupDialog(lightbox);
  lightbox.addEventListener("click", () => lightbox.close());
  document.getElementById("faq-open").addEventListener("click", () => openDialog(faqModal));
}

boot();
