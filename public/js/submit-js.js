document.getElementById("telegram-contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const message = form.message.value.trim();

  const responseDiv = document.getElementById("form-response");
  responseDiv.innerText = "⏳ Sending...";
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
      responseDiv.innerText = "✅ Message sent successfully!";
      form.reset();
    } else {
      responseDiv.innerText = "❌ Error: " + (data.error || "Something went wrong.");
    }
  } catch (err) {
    responseDiv.innerText = "❌ Failed to send: " + err.message;
  }
});
