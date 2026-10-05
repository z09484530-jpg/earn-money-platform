document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn, .wallet-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      button.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(0.98)" },
          { transform: "scale(1)" }
        ],
        { duration: 220, easing: "ease-out" }
      );
    });
  });

  const ctButton = document.querySelector(".cta-form .btn");
  const emailInput = document.querySelector(".cta-form input");

  if (ctButton && emailInput) {
    ctButton.addEventListener("click", () => {
      const value = emailInput.value.trim();
      if (!value) {
        emailInput.focus();
        emailInput.placeholder = "Please enter your email";
        return;
      }

      ctButton.textContent = "Joined";
      ctButton.disabled = true;
      ctButton.style.opacity = "0.9";
    });
  }
});






















































