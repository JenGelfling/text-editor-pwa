const btnInstall = document.getElementById("buttonInstall");
const navBtnInstall = document.getElementById("nav-install-btn");

/* Function to check if the PWA is already installed */
function checkIfInstalled() {
  if (window.matchMedia("(display-mode: standalone)").matches) {
    btnInstall.style.display = "none";
    navBtnInstall.style.display = "none";
  }
}

/* Call the check function on load */
window.addEventListener("load", () => {
  checkIfInstalled();
});

/* Here we need to provide the logic for when and how to install the PWA.  */

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  window.deferredPrompt = event;
});

// This listener fires when the user clicks the "install" button.
btnInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    btnInstall.style.display = "none";
    navBtnInstall.style.display = "none";
    console.log("No install prompt available.");
    return;
  }

  promptEvent.prompt();

  const { outcome } = await promptEvent.userChoice;

  if (outcome === "accepted") {
    console.log("User accepted.");
  } else {
    console.log("User dismissed the prompt.");
  }

  // Set the deferred prompt to null after the user has interacted with it
  window.deferredPrompt = null;

  // Hide the install button
  btnInstall.style.display = "none";
  navBtnInstall.style.display = "none";
});

window.addEventListener("appinstalled", (event) => {
  console.log("PWA was installed.");
  window.deferredPrompt = null;
  btnInstall.style.display = "none";
  navBtnInstall.style.display = "none";
});
