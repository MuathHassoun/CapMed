document.getElementById("telegram-contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const message = form.message.value.trim();

  const responseDiv = document.getElementById("form-response");
  responseDiv.innerText = "⏳ Sending your request...";
  try {
    const res = await fetch("/api/telegram-handler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, message }),
    });

    const data = await res.json();
    if (res.ok) {
      responseDiv.innerText = "✅ Thank you! Your message has been received by CapstoneMed. Our team will contact you soon.";
      form.reset();
    } else {
      responseDiv.innerText = "❌ Something went wrong while sending your message. Please try again later.";
    }
  } catch (err) {
    responseDiv.innerText = "❌ Failed to send your message. Please check your internet connection or try again later.";
  }
});
