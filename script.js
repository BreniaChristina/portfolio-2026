const menu = document.querySelector(".menu"),
  nav = document.querySelector("#nav");
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
  menu.textContent = open ? "Close" : "Menu";
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.textContent = "Menu";
  }),
);
const dialog = document.querySelector(".lightbox"),
  art = dialog.querySelector(".lightbox-art"),
  title = dialog.querySelector("strong"),
  caption = dialog.querySelector("figcaption span"),
  description = dialog.querySelector(".lightbox-description"),
  cards = [...document.querySelectorAll(".gallery-card[data-group]")];
let activeGroup = [],
  activeIndex = 0,
  lastTrigger;
function render() {
  const card = activeGroup[activeIndex];
  title.textContent = card.dataset.title;
  caption.textContent = card.dataset.caption;
  description.textContent = card.dataset.description || "";
  if (card.dataset.image) {
    art.classList.add("has-image");
    art.style.backgroundImage = `url("${card.dataset.image}")`;
    art.style.backgroundPosition = "center";
    art.dataset.label = "";
  } else {
    art.classList.remove("has-image");
    art.style.backgroundImage = "";
    art.style.backgroundPosition = card.dataset.position;
    art.dataset.label = card.querySelector(".mock-email")
      ? card.dataset.title.toUpperCase()
      : card.querySelector(":scope > span").textContent.trim();
  }
}
function openLightbox(card) {
  lastTrigger = card;
  activeGroup = cards.filter(
    (item) => item.dataset.group === card.dataset.group,
  );
  activeIndex = activeGroup.indexOf(card);
  render();
  dialog.showModal();
  document.body.classList.add("locked");
}
function closeLightbox() {
  dialog.close();
  document.body.classList.remove("locked");
  lastTrigger?.focus();
}
cards.forEach((card) =>
  card.addEventListener("click", () => openLightbox(card)),
);
dialog
  .querySelector(".lightbox-close")
  .addEventListener("click", closeLightbox);
dialog.querySelector(".prev").addEventListener("click", () => {
  activeIndex = (activeIndex - 1 + activeGroup.length) % activeGroup.length;
  render();
});
dialog.querySelector(".next").addEventListener("click", () => {
  activeIndex = (activeIndex + 1) % activeGroup.length;
  render();
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeLightbox();
});
dialog.addEventListener("close", () =>
  document.body.classList.remove("locked"),
);
document.querySelectorAll(".play").forEach((button) =>
  button.addEventListener("click", () => {
    const playing = button.classList.toggle("playing");
    button.querySelector("span").textContent = playing ? "Pause" : "Play";
    button.setAttribute(
      "aria-label",
      (playing ? "Pause " : "Play ") +
        button.getAttribute("aria-label").replace(/^(Play|Pause) /, ""),
    );
  }),
);
