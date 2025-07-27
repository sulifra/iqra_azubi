
// ... existing code above remains unchanged ...

function renderLernfelder() {
  const container = document.getElementById("lernfelderContainer");
  container.innerHTML = "";

  lernfelder.forEach((feld, feldIndex) => {
    const feldDiv = document.createElement("div");
    feldDiv.className = "lernfeld";

    const feldTitle = document.createElement("h2");
    feldTitle.textContent = feld.title;
    feldDiv.appendChild(feldTitle);

    if (role === 'ausbilderin') {
      const editFeldBtn = document.createElement("button");
      editFeldBtn.textContent = "Lernfeld bearbeiten";
      editFeldBtn.onclick = () => editLernfeld(feldIndex);
      feldDiv.appendChild(editFeldBtn);
    }

    feld.activities.forEach((activity, actIndex) => {
      const actDiv = document.createElement("div");
      actDiv.className = "activity";

      const actTitle = document.createElement("h3");
      actTitle.textContent = activity.title;
      actDiv.appendChild(actTitle);

      const actDesc = document.createElement("p");
      actDesc.textContent = activity.description;
      actDiv.appendChild(actDesc);

      const subList = document.createElement("ul");
      activity.subtasks.forEach((sub, subIndex) => {
        const li = document.createElement("li");
        li.textContent = sub;
        subList.appendChild(li);
      });
      actDiv.appendChild(subList);

      if (role === 'ausbilderin') {
        const editBtn = document.createElement("button");
        editBtn.textContent = "Aktivität bearbeiten";
        editBtn.onclick = () => editActivity(feldIndex, actIndex);
        actDiv.appendChild(editBtn);
      }

      // ... status icons, comments, feedback remain unchanged ...

      feldDiv.appendChild(actDiv);
    });

    container.appendChild(feldDiv);
  });
}

function editActivity(feldIndex, actIndex) {
  const feld = lernfelder[feldIndex];
  const activity = feld.activities[actIndex];

  const newTitle = prompt("Titel der Aktivität bearbeiten:", activity.title);
  const newDesc = prompt("Beschreibung bearbeiten:", activity.description);
  const newSubtasks = prompt("Unterpunkte (durch Komma getrennt):", activity.subtasks.join(", "));

  if (newTitle !== null) activity.title = newTitle;
  if (newDesc !== null) activity.description = newDesc;
  if (newSubtasks !== null) activity.subtasks = newSubtasks.split(",").map(s => s.trim());

  localStorage.setItem("lernfelder", JSON.stringify(lernfelder));
  renderLernfelder();
}

function editLernfeld(feldIndex) {
  const feld = lernfelder[feldIndex];
  const newTitle = prompt("Titel des Lernfelds bearbeiten:", feld.title);
  if (newTitle !== null) {
    feld.title = newTitle;
    localStorage.setItem("lernfelder", JSON.stringify(lernfelder));
    renderLernfelder();
  }
}

// Load saved lernfelder if available
const savedLernfelder = localStorage.getItem("lernfelder");
if (savedLernfelder) {
  try {
    const parsed = JSON.parse(savedLernfelder);
    if (Array.isArray(parsed)) lernfelder.splice(0, lernfelder.length, ...parsed);
  } catch (e) {
    console.error("Fehler beim Laden gespeicherter Lernfelder:", e);
  }
}
