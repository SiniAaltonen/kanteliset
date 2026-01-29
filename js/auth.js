// js/auth.js
async function login() {
  const code = document.getElementById("inviteCode").value

  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ code }),
    headers: { "Content-Type": "application/json" }
  })

  if (res.ok) {
    window.location.href = "/dashboard.html"
  } else {
    alert("Virheellinen koodi")
  }
}