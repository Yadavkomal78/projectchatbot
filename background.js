// document.addEventListener("DOMContentLoaded", () => {
//   // Create the animated background element
//   const animatedBackground = document.createElement("div");
//   animatedBackground.id = "animated-background";
//   document.body.appendChild(animatedBackground);

//   // Toggle button for enabling/disabling the animated background
//   const toggleButton = document.createElement("button");
//   toggleButton.id = "background-toggle";
//   toggleButton.textContent = "Toggle Background";
//   toggleButton.style.position = "fixed";
//   toggleButton.style.top = "10px";
//   toggleButton.style.right = "10px";
//   toggleButton.style.padding = "10px 15px";
//   toggleButton.style.backgroundColor = "#6D678E";
//   toggleButton.style.color = "white";
//   toggleButton.style.border = "none";
//   toggleButton.style.borderRadius = "5px";
//   toggleButton.style.cursor = "pointer";
//   document.body.appendChild(toggleButton);

//   // Toggle  visibility background ke liye
//   toggleButton.addEventListener("click", () => {
//     if (animatedBackground.style.display === "none") {
//       animatedBackground.style.display = "block";
//       toggleButton.textContent = "Disable Background";
//     } else {
//       animatedBackground.style.display = "none";
//       toggleButton.textContent = "Enable Background";
//     }
//   });
// });
