const submitBtn = document.getElementById("contactSubmit");
const status = document.getElementById("contactStatus");

if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation
    if (!name || !email || !message) {
      status.textContent = "⚠️ Please fill all required fields.";
      status.style.color = "red";
      return;
    }

    if (!emailPattern.test(email)) {
      status.textContent = "⚠️ Enter valid email.";
      status.style.color = "red";
      return;
    }

    submitBtn.innerHTML = "⏳ Sending...";
    submitBtn.disabled = true;

    emailjs.send("service_af5y59i", "template_r0w9blm", {
      name,
      email,
      subject,
      message
    })
    .then(() => {
      status.textContent = "✅ Message sent successfully!";
      status.style.color = "green";

      document.getElementById("contactName").value = "";
      document.getElementById("contactEmail").value = "";
      document.getElementById("contactSubject").value = "";
      document.getElementById("contactMessage").value = "";

      submitBtn.innerHTML = "Send Message";
      submitBtn.disabled = false;
    })
    .catch(() => {
      status.textContent = "❌ Failed to send.";
      status.style.color = "red";

      submitBtn.innerHTML = "Send Message";
      submitBtn.disabled = false;
    });
  });
}