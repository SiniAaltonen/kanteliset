document.addEventListener("DOMContentLoaded", () => {
  const userRaw = sessionStorage.getItem("user");

  if (!userRaw) {
    // ei kirjautunut
    window.location.href = "/";
    return;
  }

  const user = JSON.parse(userRaw);

  // 👋 Tervetuloa-teksti
  document.getElementById("welcomeText").innerText =
    user.role === "admin"
      ? "Tervetuloa admin 💍"
      : "Tervetuloa hääviikonloppuun 💍";

  document.getElementById("familyInfo").innerText =
    `Seurue: ${user.familyId} (${user.guests} henkilöä)`;

  // 🏠 Majoitusvaihtoehdot
  const container = document.getElementById("accommodationOptions");

  const accommodationLabels = {
    villa_vellamo: "Villa Vellamo",
    villa_aurum: "Villa Aurum"
  };

  user.allowedOptions.forEach(opt => {
    const div = document.createElement("div");
    div.className = "radio";
    div.innerHTML = `
      <label>
        <input type="radio" name="accommodation" value="${opt}">
        ${accommodationLabels[opt] || opt}
      </label>
    `;
    container.appendChild(div);
  });

  // 📤 Lomakkeen käsittely
  document.getElementById("rsvpForm").addEventListener("submit", e => {
    e.preventDefault();

    const days = [...document.querySelectorAll("input[name='days']:checked")]
      .map(cb => cb.value);

    const accommodation =
      document.querySelector("input[name='accommodation']:checked")?.value || null;

    const notes = document.getElementById("notes").value;

    const payload = {
      familyId: user.familyId,
      guests: user.guests,
      days,
      accommodation,
      notes
    };

    console.log("RSVP payload:", payload);

    alert("Kiitos! Ilmoittautuminen tallennettu (mock).");
    // seuraavaksi → Azure Function / tallennus
  });
});