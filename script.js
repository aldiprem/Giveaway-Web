const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  document.body.innerHTML = "❌ Giveaway ID tidak ditemukan";
  throw new Error("No ID");
}

fetch("giveaways.json")
  .then(res => res.json())
  .then(data => {
    const ga = data[id];
    if (!ga) {
      document.body.innerHTML = "❌ Giveaway tidak ditemukan";
      return;
    }

    document.getElementById("title").textContent = ga.title;
    document.getElementById("text").textContent = ga.text;
    document.getElementById("winner").textContent = ga.winner;
    document.getElementById("participants").textContent = ga.participants;
    document.getElementById("joinBtn").href = ga.join_link;
    document.getElementById("joinBtn").textContent = ga.button_text;

    const badge = document.getElementById("status");
    if (ga.ended) {
      badge.textContent = "SELESAI";
      badge.classList.add("end");
      document.getElementById("countdown").textContent = "⏰ Giveaway telah berakhir";
      return;
    }

    const endTime = new Date(ga.end_time).getTime();

    setInterval(() => {
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        document.getElementById("countdown").textContent = "⏰ Giveaway berakhir";
        badge.textContent = "SELESAI";
        badge.classList.add("end");
        return;
      }

      const h = Math.floor(diff / 3600000);
      const m = Math.floor(diff / 60000) % 60;
      const s = Math.floor(diff / 1000) % 60;

      document.getElementById("countdown").textContent =
        `⏳ ${h}j ${m}m ${s}d`;
    }, 1000);
  });
