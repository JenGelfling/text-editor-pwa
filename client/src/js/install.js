const btnInstall = document.getElementById("buttonInstall");
const navBtnInstall = document.getElementById("nav-install-btn");

/* Here we need to provide the logic for when and how to install the PWA.  */

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  window.deferredPrompt = event;
  btnInstall.classList.remove("hidden");
  navBtnInstall.classList.remove("hidden");
});

// This listener fires when the user clicks the "install" button.
btnInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
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
  btnInstall.classList.add("hidden");
  navBtnInstall.classList.add("hidden");
});

window.addEventListener("appinstalled", (event) => {
  console.log("PWA was installed.");
  window.deferredPrompt = null;
  btnInstall.classList.add("hidden");
  navBtnInstall.classList.add("hidden");
});
