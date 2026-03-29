const BASE_URL = ""; // same origin (no hardcoding needed)

const textInput = document.getElementById("text");
const list = document.getElementById("list");

async function fetchData() {
  try {
    const res = await fetch(`${BASE_URL}/journals`);
    const journals = await res.json();

    list.innerHTML = "";

    journals.reverse().forEach((j, index) => {
      const li = document.createElement("li");
      li.className = "entry-card";
      li.style.animationDelay = `${index * 60}ms`;

      li.innerHTML = `
        <div class="entry-index">${String(journals.length - index).padStart(2, "0")}</div>

        <div class="entry-content">
          <div class="entry-date">
            ${new Date(j.date).toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </div>
          <div class="entry-text">${j.text}</div>
        </div>

        <button class="delete-btn" onclick="deleteEntry('${j._id}')">
          ❌
        </button>
      `;

      list.appendChild(li);
    });

    if (journals.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📖</div>
          <p>Your journal is empty.<br />Write your first entry above.</p>
        </div>
      `;
    }

  } catch (err) {
    console.error(err);
  }
}

async function addEntry() {
  const text = textInput.value;

  if (!text.trim()) return;

  await fetch(`${BASE_URL}/journals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  textInput.value = "";
  fetchData();
}

async function deleteEntry(id) {
  await fetch(`${BASE_URL}/journals/${id}`, {
    method: "DELETE"
  });

  fetchData();
}

document.getElementById("addBtn").addEventListener("click", addEntry);

textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
    addEntry();
  }
});

fetchData();