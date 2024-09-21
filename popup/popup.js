/**
 * Generate a random password of the given length.
 */
function generatePassword(length = 12) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
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
 * Update the displayed password length when the slider is moved.
 */
function updatePasswordLengthDisplay() {
  const lengthDisplay = document.getElementById("password-length-display");
  const length = document.getElementById("password-length-slider").value;
  lengthDisplay.textContent = length;
  updatePassword(); // Regenerate the password when the length changes
}

/**
 * Listen for clicks on the regenerate and copy buttons.
 */
function listenForClicks() {
  document.getElementById("regenerate").addEventListener("click", updatePassword);
  document.getElementById("copy").addEventListener("click", copyToClipboard);
  document.getElementById("password-length-slider").addEventListener("input", updatePasswordLengthDisplay);
}

/**
 * When the popup loads, generate a random password and add click handlers.
 */
document.addEventListener("DOMContentLoaded", () => {
  updatePassword();
  listenForClicks();
});
