// js/auth.js

const LOGIN_API =
  "https://fa-kanteliset-chdhg2g0aub8f0gy.westeurope-01.azurewebsites.net/api/login";

/**
 * Kutsutaan login-modalin "Jatka" -napista
 */
async function login() {
  const input = document.getElementById("inviteCode");
  const code = input ? input.value.trim() : "";

  if (!code) {
    alert("Syötä kutsukoodi");
    return;
  }

  try {
    const response = await fetch(LOGIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    });

    if (!response.ok) {
      alert("Virheellinen kutsukoodi");
      return;
    }

    // ✅ Kirjautuminen onnistui
    sessionStorage.setItem("isGuest", "true");

    // Suljetaan modal siististi
    if (window.$) {
      $("#loginModal").modal("hide");
    }

    // Näytetään menu
    showNavigation();

  } catch (error) {
    console.error("Login error:", error);
    alert("Tekninen virhe. Yritä hetken kuluttua uudelleen.");
  }
}

/**
 * Näyttää navigaation kirjautuneelle käyttäjälle
 */
function showNavigation() {
  const nav = document.querySelector(".fh5co-nav");
  if (nav) {
    nav.style.display = "block";
  }
}

/**
 * Ajetaan sivun latautuessa:
 * - näyttää navin jos käyttäjä on kirjautunut
 */
document.addEventListener("DOMContentLoaded", function () {
  if (sessionStorage.getItem("isGuest") === "true") {
    showNavigation();
  }
});

/**
 * (Valinnainen) uloskirjautuminen
 * Voit käyttää esim. menussa myöhemmin
 */
function logout() {
  sessionStorage.removeItem("isGuest");
  location.reload();
}