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

    // ✅ YHTENÄINEN kirjautumistieto
    sessionStorage.setItem("login", JSON.stringify(data));
    sessionStorage.setItem("isLoggedIn", "true");

    const role = (data.Role || data.role || "").toLowerCase();

if (role === "admin") {
  window.location.href = "/admin.html";
} else {
  window.location.href = "/dashboard.html";
}
  } catch (err) {
    console.error(err);
    alert("Tekninen virhe");
  }
}

// ✅ Logout
//function logout() {
//  sessionStorage.removeItem("login");
//  sessionStorage.removeItem("isLoggedIn");
//  window.location.href = "/index.html";
//}
function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

// 🔐 MENU LOGIC
window.addEventListener("load", function () {

  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  const navItems = document.querySelectorAll("#navDashboard, #navLogout");

  navItems.forEach(el => {
    if (isLoggedIn) {
      el.classList.remove("hidden-auth");
    } else {
      el.classList.add("hidden-auth");
    }
  });

});