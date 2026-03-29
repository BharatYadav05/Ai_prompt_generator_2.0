// Run only if feedback page exists
const feedbackBtn = document.getElementById("submitFeedback");

if (feedbackBtn) {

  // ===== ELEMENTS =====
  const customSelect = document.getElementById("ratingSelect");
  const selected = customSelect.querySelector(".select-selected");
  const options = customSelect.querySelectorAll(".select-options div");
  const hiddenInput = document.getElementById("rating");
  const status = document.getElementById("feedbackStatus");

  // ===== DROPDOWN =====
  selected.addEventListener("click", () => {
    customSelect.classList.toggle("active");
  });

  options.forEach(option => {
    option.addEventListener("click", () => {
      selected.textContent = option.textContent;
      hiddenInput.value = option.getAttribute("data-value");
      customSelect.classList.remove("active");
    });
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", (e) => {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove("active");
    }
  });

  // ===== SUBMIT =====
  feedbackBtn.addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const rating = hiddenInput.value;
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation
    if (!message || !rating) {
      status.textContent = "⚠️ Please fill required fields.";
      status.style.color = "red";
      return;
    }

    if (email && !emailPattern.test(email)) {
      status.textContent = "⚠️ Invalid email format.";
      status.style.color = "red";
      return;
    }

    // UI loading
    feedbackBtn.innerHTML = "⏳ Sending...";
    feedbackBtn.disabled = true;

    // Send Email
    emailjs.send("service_af5y59i", "template_db794ih", {
      name: name || "Anonymous",
      email: email || "Not provided",
      rating: rating,
      message: message
    })
    .then(() => {
      status.innerHTML = "✅ Feedback sent successfully!";
      status.style.color = "green";

      // Reset form
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      hiddenInput.value = "";
      document.getElementById("message").value = "";
      selected.textContent = "Rate Experience";

      feedbackBtn.innerHTML = "Submit Feedback";
      feedbackBtn.disabled = false;
    })
    .catch(() => {
      status.innerHTML = "❌ Failed to send.";
      status.style.color = "red";

      feedbackBtn.innerHTML = "Submit Feedback";
      feedbackBtn.disabled = false;
    });
  });
}