// js/auth.js
async function login() {
  const code = document.getElementById("inviteCode").value;

  if (!code) {
    alert("Syötä kutsukoodi");
    return;
  }

  try {
    const res = await fetch(
      "https://fa-kanteliset-chdhg2g0aub8f0gy.westeurope-01.azurewebsites.net/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      }
    );

    if (!res.ok) {
      alert("Virheellinen kutsukoodi");
      return;
    }

    const data = await res.json();

    // 🔐 tallennetaan kirjautumistieto
    sessionStorage.setItem("isGuest", "true");
    sessionStorage.setItem("user", JSON.stringify(data));

    window.location.href = "/dashboard.html";
  } catch (err) {
    console.error(err);
    alert("Tekninen virhe");
  }
}