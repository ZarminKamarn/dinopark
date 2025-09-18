const navBar: HTMLElement | null = document.getElementById("headerNavBar");
const button: HTMLElement | null = document.getElementById("navBarButton");

if (navBar && button) {
  button.addEventListener("click", navBarToggled);
}

window.addEventListener("resize", screenIsResized);

function screenIsResized() {
  if (navBar) {
    if (screen.width > 992) {
      navBar.style.display = "flex";
    } else {
      navBar.style.display = "none";
    }
  }
}

function navBarToggled() {
  if (navBar) {
    const display: string = navBar.style.display;
    if (display === "none") {
      navBar.style.display = "flex";
    } else {
      navBar.style.display = "none";
    }
  }
}
