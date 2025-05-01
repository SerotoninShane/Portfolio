
const modal = document.getElementById("myModal");
const btns = document.querySelectorAll("#modalBtn");
const span = document.getElementsByClassName("close")[0];

btns.forEach(btn => {
  btn.addEventListener("click", () => {
    modal.style.display = "block";
    console.log('modal')
  });
});

span.onclick = () => {
  modal.style.display = "none";
};

window.onclick = event => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
