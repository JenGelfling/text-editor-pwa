const btnInstall = document.getElementById("buttonInstall");

/* Here we need to provide the logic for when and how to install the PWA.  */

window.addEventListener("beforeinstallprompt", (event) => {
  window.deferredPrompt = event;
  btnInstall.classList.toggle("hidden", false);
});

// This listener fires when the user clicks the "install" button.
btnInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  // Set the deferred prompt to null after the user has interacted with it
  window.deferredPrompt = null;

  // Hide the install button
  btnInstall.classList.toggle("hidden", true);
});

window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
});
