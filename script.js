const lernfelder = [
  {
    "title": "1. Praxisorganisation und -verwaltung",
    "activities": [
      {
        "title": "Terminmanagement",
        "description": "Die Auszubildende plant, koordiniert und dokumentiert Patiententermine unter Berücksichtigung von Dringlichkeit und Behandlungsart.",
        "subtasks": [
          "Terminvergabe telefonisch",
          "Online-Terminbuchung verwalten",
          "Terminkalender führen"
        ]
      },
      {
        "title": "Patientenaufnahme",
        "description": "Die Auszubildende nimmt Patientendaten auf, prüft Versicherungskarten und erstellt Patientenakten.",
        "subtasks": [
          "Versicherungskarte einlesen",
          "Stammdaten erfassen",
          "Anamnesebogen aushändigen"
        ]
      }
    ]
  },
  {
    "title": "2. Assistenz bei diagnostischen und therapeutischen Maßnahmen",
    "activities": [
      {
        "title": "Assistenz bei Eingriffen",
        "description": "Die Auszubildende assistiert bei verschiedenen dermatologischen Eingriffen wie OP, Shave, Stanze.",
        "subtasks": [
          "Instrumente vorbereiten",
          "Sterilität sicherstellen",
          "Assistenz während des Eingriffs"
        ]
      },
      {
        "title": "Wundversorgung",
        "description": "Die Auszubildende führt einfache Wundversorgungen durch und dokumentiert diese.",
        "subtasks": [
          "Wunde reinigen",
          "Verband anlegen",
          "Dokumentation im System"
        ]
      }
    ]
  },
  {
    "title": "3. Kommunikation und Patientenbetreuung",
    "activities": [
      {
        "title": "Aufklärungsgespräche vorbereiten",
        "description": "Die Auszubildende bereitet Materialien und Räume für ärztliche Aufklärungsgespräche vor.",
        "subtasks": [
          "Informationsmaterial bereitstellen",
          "Aufklärungsbogen vorbereiten",
          "Raum vorbereiten"
        ]
      },
      {
        "title": "Umgang mit schwierigen Gesprächssituationen",
        "description": "Die Auszubildende lernt, empathisch und professionell auf Patientenanliegen einzugehen.",
        "subtasks": [
          "Aktives Zuhören",
          "Deeskalationstechniken",
          "Dokumentation von Beschwerden"
        ]
      }
    ]
  },
  {
    "title": "4. Hygiene und Qualitätsmanagement",
    "activities": [
      {
        "title": "Hygieneplan umsetzen",
        "description": "Die Auszubildende kennt den Hygieneplan der Praxis und setzt ihn im Alltag um.",
        "subtasks": [
          "Händedesinfektion korrekt durchführen",
          "Flächendesinfektion",
          "Geräteaufbereitung"
        ]
      },
      {
        "title": "Qualitätsdokumentation",
        "description": "Die Auszubildende dokumentiert qualitätsrelevante Maßnahmen gemäß QM-Handbuch.",
        "subtasks": [
          "Checklisten ausfüllen",
          "Abweichungen melden",
          "QM-Dokumente pflegen"
        ]
      }
    ]
  },
  {
    "title": "5. Abrechnung und Dokumentation",
    "activities": [
      {
        "title": "Leistungserfassung",
        "description": "Die Auszubildende erfasst ärztliche Leistungen korrekt im Praxisverwaltungssystem.",
        "subtasks": [
          "GOÄ-Ziffern zuordnen",
          "Leistungen dokumentieren",
          "Abrechnungsprüfung"
        ]
      },
      {
        "title": "Privatabrechnung",
        "description": "Die Auszubildende erstellt Rechnungen für Privatpatienten und beantwortet Rückfragen.",
        "subtasks": [
          "Rechnung erstellen",
          "Zahlungseingänge prüfen",
          "Rückfragen beantworten"
        ]
      }
    ]
  }
];


let role = null;
const farben = ['rot', 'orange', 'gelb', 'gruen'];

function setRole(selectedRole) {
    role = selectedRole;
    document.getElementById('role-selection').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    if (role === 'ausbilderin') {
        document.getElementById('basis-info').style.display = 'block';
    }
    renderLernfelder();
}

function saveBasisInfo() {
    const info = {
        name: document.getElementById('name').value,
        zeitraum: document.getElementById('zeitraum').value,
        freitext: document.getElementById('freitext').value
    };
    localStorage.setItem('basisInfo', JSON.stringify(info));
    alert('Gespeichert!');
}



function renderLernfelder() {
  const container = document.getElementById("lernfelderContainer");
  container.innerHTML = "";

  lernfelder.forEach((feld, feldIndex) => {
    const feldDiv = document.createElement("div");
    feldDiv.className = "lernfeld";

    const feldTitle = document.createElement("h2");
    feldTitle.textContent = feld.title;
    feldDiv.appendChild(feldTitle);

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
      activity.subtasks.forEach(sub => {
        const li = document.createElement("li");
        li.textContent = sub;
        subList.appendChild(li);
      });
      actDiv.appendChild(subList);

      const statusDiv = document.createElement("div");
      statusDiv.className = "status-icons";
      const colors = ["red", "orange", "yellow", "green"];
      const savedStatus = localStorage.getItem(`status_${feldIndex}_${actIndex}`) || "red";

      colors.forEach(color => {
        const icon = document.createElement("span");
        icon.className = "status-icon";
        icon.style.backgroundColor = color;
        if (color === savedStatus) icon.classList.add("selected");
        icon.addEventListener("click", () => {
          localStorage.setItem(`status_${feldIndex}_${actIndex}`, color);
          renderLernfelder();
        });
        statusDiv.appendChild(icon);
      });
      actDiv.appendChild(statusDiv);

      const commentLabel = document.createElement("label");
      commentLabel.textContent = "Kommentar (Auszubildende):";
      const commentBox = document.createElement("textarea");
      commentBox.value = localStorage.getItem(`comment_${feldIndex}_${actIndex}`) || "";
      commentBox.addEventListener("input", () => {
        localStorage.setItem(`comment_${feldIndex}_${actIndex}`, commentBox.value);
      });
      actDiv.appendChild(commentLabel);
      actDiv.appendChild(commentBox);

      const feedbackLabel = document.createElement("label");
      feedbackLabel.textContent = "Feedback (Ausbilderin):";
      const feedbackBox = document.createElement("textarea");
      feedbackBox.value = localStorage.getItem(`feedback_${feldIndex}_${actIndex}`) || "";
      feedbackBox.addEventListener("input", () => {
        localStorage.setItem(`feedback_${feldIndex}_${actIndex}`, feedbackBox.value);
      });
      actDiv.appendChild(feedbackLabel);
      actDiv.appendChild(feedbackBox);

      feldDiv.appendChild(actDiv);
    });

    container.appendChild(feldDiv);
  });
}



function setStatus(key, farbe) {
    if (role === 'auszubildende') {
        localStorage.setItem(key + '_status', farbe);
        renderLernfelder();
    }
}

function saveComment(key, value) {
    localStorage.setItem(key + '_kommentar', value);
}

function saveFeedback(key, value) {
    localStorage.setItem(key + '_feedback', value);
}
