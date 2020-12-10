let navExpand = document.querySelector(".navExpand");
let nav = document.querySelector(".nav");
let navListItem = document.querySelectorAll(".navListitem");

navExpand.addEventListener("click", () => {
  nav.classList.toggle("nav-closed");
});

navListItem.forEach((link) => link.addEventListener("click", listActive));

function listActive() {
  navListItem.forEach((link) => link.classList.remove("navListitem-active"));
  this.classList.add("navListitem-active");
}
