const lernfelder = [
  {
    "title": "Lernfeld 1: Patientenempfang und -betreuung",
    "activities": [
      {
        "title": "Empfang und Begr\u00fc\u00dfung",
        "description": "Die Auszubildende begr\u00fc\u00dft Patient:innen freundlich, \u00fcberpr\u00fcft Termine und leitet sie weiter."
      },
      {
        "title": "Anamnesebogen aush\u00e4ndigen",
        "description": "Die Auszubildende erkl\u00e4rt neuen Patient:innen den Anamnesebogen und hilft bei R\u00fcckfragen."
      },
      {
        "title": "Telefonische Terminvergabe",
        "description": "Die Auszubildende nimmt Anrufe entgegen und vergibt Termine nach Vorgabe."
      }
    ]
  },
  {
    "title": "Lernfeld 2: Assistenz bei Diagnostik und Therapie",
    "activities": [
      {
        "title": "Assistenz bei Hautbiopsien",
        "description": "Die Auszubildende bereitet das Material vor und assistiert bei der Durchf\u00fchrung von Stanzen und Shaves."
      },
      {
        "title": "Vorbereitung von Injektionen",
        "description": "Die Auszubildende richtet Spritzen und desinfiziert die Hautstelle nach Anweisung."
      }
    ]
  },
  {
    "title": "Lernfeld 3: Hygiene und Aufbereitung",
    "activities": [
      {
        "title": "Instrumentenaufbereitung",
        "description": "Die Auszubildende reinigt, desinfiziert und sterilisiert Instrumente nach Hygieneplan."
      },
      {
        "title": "Fl\u00e4chendesinfektion",
        "description": "Die Auszubildende f\u00fchrt die Desinfektion von Liegen, Arbeitsfl\u00e4chen und Ger\u00e4ten durch."
      }
    ]
  },
  {
    "title": "Lernfeld 4: Verwaltung und Dokumentation",
    "activities": [
      {
        "title": "Patientendaten erfassen",
        "description": "Die Auszubildende tr\u00e4gt Stammdaten in die Praxissoftware ein und pr\u00fcft die Versicherungskarte."
      },
      {
        "title": "Abrechnung vorbereiten",
        "description": "Die Auszubildende unterst\u00fctzt bei der Vorbereitung der Abrechnung nach GO\u00c4 und EBM."
      }
    ]
  },
  {
    "title": "Lernfeld 5: Kommunikation und Teamarbeit",
    "activities": [
      {
        "title": "Besprechungsvorbereitung",
        "description": "Die Auszubildende bereitet interne Teambesprechungen vor und dokumentiert Ergebnisse."
      },
      {
        "title": "Feedbackgespr\u00e4che f\u00fchren",
        "description": "Die Auszubildende reflektiert ihre Arbeit und nimmt an Feedbackgespr\u00e4chen teil."
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

      const progressLabel = document.createElement("label");
      progressLabel.textContent = "Einschätzung:";
      actDiv.appendChild(progressLabel);

      const progressContainer = document.createElement("div");
      progressContainer.className = "progress-icons";

      ["rot", "orange", "gelb", "grün"].forEach(color => {
        const icon = document.createElement("span");
        icon.className = "circle " + color;
        icon.title = color;
        icon.onclick = () => {
          document.querySelectorAll(".circle").forEach(c => c.classList.remove("selected"));
          icon.classList.add("selected");
        };
        progressContainer.appendChild(icon);
      });

      actDiv.appendChild(progressContainer);

      const commentLabel = document.createElement("label");
      commentLabel.textContent = "Kommentar (Auszubildende):";
      actDiv.appendChild(commentLabel);

      const commentBox = document.createElement("textarea");
      commentBox.rows = 2;
      actDiv.appendChild(commentBox);

      const feedbackLabel = document.createElement("label");
      feedbackLabel.textContent = "Feedback (Ausbilderin):";
      actDiv.appendChild(feedbackLabel);

      const feedbackBox = document.createElement("textarea");
      feedbackBox.rows = 2;
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
