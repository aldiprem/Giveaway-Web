// ===== CONFIG =====
const API_BASE = "https://github.com/aldiprem/Giveaway-Web.git";
const giveawayId = location.pathname.split("/").pop();

let telegramUser = null;

fetch(`${API_BASE}/api/giveaway/${giveawayId}`)
  .then(r => r.json())
  .then(data => {
    document.getElementById("desc").innerText = data.text || "🎁 Ikuti giveaway ini!";
    document.getElementById("title").innerText = `🎉 Giveaway #${data.id}`;
  })
  .catch(() => {
    document.getElementById("desc").innerText = "❌ Giveaway tidak ditemukan.";
  });

function onTelegramAuth(user) {
  telegramUser = user;
  document.getElementById("joinBtn").disabled = false;
  document.getElementById("joinBtn").innerText = "🎉 IKUT GIVEAWAY";
}

document.getElementById("joinBtn").onclick = () => {
  if (!telegramUser) return;

  document.getElementById("status").innerText = "⏳ Mengirim data...";

  fetch(`${API_BASE}/api/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        giveaway_id: giveawayId,
        telegram: telegramUser
      })
    })
    .then(r => r.json())
    .then(res => {
      if (res.ok) {
        document.getElementById("status").innerText = "✅ Berhasil ikut giveaway!";
        document.getElementById("joinBtn").disabled = true;
      } else {
        document.getElementById("status").innerText = "⚠️ " + res.error;
      }
    })
    .catch(() => {
      document.getElementById("status").innerText = "❌ Gagal terhubung ke server.";
    });
};
