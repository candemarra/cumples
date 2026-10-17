const ACCESS_KEY = "628a560c-f751-433f-ab10-27fabd51bb2c";

const form = document.getElementById("form");
const msg = document.getElementById("msg");
const btn = form.querySelector("button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  btn.disabled = true;
  msg.textContent = "enviando...";
  try {
    const data = new FormData(form);
    data.append("access_key", ACCESS_KEY);
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });
    const json = await res.json().catch(() => ({}));
    console.log("Respuesta de Web3Forms:", res.status, json);
    if (res.ok && json.success) {
      msg.textContent = "¡listo! tu respuesta fue enviada ♡";
      form.reset();
    } else {
      msg.textContent = "uy, algo falló: " + (json.message || "error " + res.status);
    }
  } catch (err) {
    console.error("Error de red:", err);
    msg.textContent = "uy, algo falló. probá de nuevo en un rato.";
  } finally {
    btn.disabled = false;
  }
});