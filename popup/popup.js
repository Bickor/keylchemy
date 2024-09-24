/**
 * Generate a random password of the given length.
 */
function generatePassword(length = 12) {
  //const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()";

  let charset = "";

  // Add selected character sets
  if (document.getElementById("uppercase").classList.contains("active")) {
    charset += uppercase;
  }
  if (document.getElementById("lowercase").classList.contains("active")) {
    charset += lowercase;
  }
  if (document.getElementById("numbers").classList.contains("active")) {
    charset += numbers;
  }
  if (document.getElementById("symbols").classList.contains("active")) {
    charset += symbols;
  }

  // Ensure at least one charset is selected
  if (charset === "") {
    showNoSelectionMessage(); // Show the red error message
    return "";
  }
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

/**
 * Update the password display in the popup.
 */
function updatePassword() {
  const passwordField = document.getElementById("password");
  const length = document.getElementById("password-length-slider").value;
  passwordField.textContent = generatePassword(length);
}

/**
 * Copy the currently displayed password to the clipboard.
 */
function copyToClipboard() {
  const passwordField = document.getElementById("password");
  navigator.clipboard.writeText(passwordField.textContent).then(() => {
    showCopyMessage();
  }).catch(err => {
    console.error("Failed to copy: ", err);
  });
}

/**
 * Display a temporary message indicating that the password was copied.
 */ 
function showCopyMessage() {
  const copyMessage = document.getElementById("copy-message");
  copyMessage.style.opacity = "1"; // Fade in

  setTimeout(() => {
    copyMessage.style.opacity = "0"; // Fade out
  }, 2000); // Hide message after 2 seconds
}

/**
 * Display a temporary error message indicating no options are selected.
 */
function showNoSelectionMessage() {
  const noSelectionMessage = document.getElementById("no-selection-message");
  noSelectionMessage.style.opacity = "1"; // Fade in

  setTimeout(() => {
    noSelectionMessage.style.opacity = "0"; // Fade out
  }, 2000); // Hide message after 2 seconds
}

/**
 * Update the displayed password length when the slider is moved.
 */
function updatePasswordLengthDisplay() {
  const lengthDisplay = document.getElementById("password-length-display");
  const length = document.getElementById("password-length-slider").value;
  lengthDisplay.textContent = length;
  updatePassword(); // Regenerate the password when the length changes
}

/**
 * Toggle button active state and ensure at least one option remains selected.
 */
function toggleButton(buttonId) {
  const button = document.getElementById(buttonId);
  button.classList.toggle("active");

  // Ensure at least one button remains selected
  const activeButtons = document.querySelectorAll(".option-button.active");
  if (activeButtons.length === 0) {
    // Revert the toggle if no buttons remain active and show error message
    button.classList.add("active");
    showNoSelectionMessage(); // Show the red error message
  }

  // Update the password when character set changes
  updatePassword();
}

/**
 * Listen for clicks on the regenerate and copy buttons.
 */
function listenForClicks() {
  document.getElementById("regenerate").addEventListener("click", updatePassword);
  document.getElementById("copy").addEventListener("click", copyToClipboard);
  document.getElementById("password-length-slider").addEventListener("input", updatePasswordLengthDisplay);

  // Add event listeners for option buttons
  document.getElementById("uppercase").addEventListener("click", () => toggleButton("uppercase"));
  document.getElementById("lowercase").addEventListener("click", () => toggleButton("lowercase"));
  document.getElementById("numbers").addEventListener("click", () => toggleButton("numbers"));
  document.getElementById("symbols").addEventListener("click", () => toggleButton("symbols"));
}

/**
 * When the popup loads, generate a random password and add click handlers.
 */
document.addEventListener("DOMContentLoaded", () => {
  updatePassword();
  listenForClicks();
});
