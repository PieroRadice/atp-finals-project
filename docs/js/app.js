document.addEventListener("DOMContentLoaded", function () {
  // URL del backend Heroku
  const BACKEND_URL =
    "https://atp-finals-backend-popostapo-7edfa465e9dd.herokuapp.com";

  // Mappa dei giocatori con sistema punti
  const players = {
    player1: {
      name: "Carlos Alcaraz",
      initial: "C",
      basePoints: 25,
    },
    player2: {
      name: "Jannik Sinner",
      initial: "J",
      basePoints: 25,
    },
    player3: {
      name: "Alexander Zverev",
      initial: "A",
      basePoints: 50,
    },
    player4: {
      name: "Taylor Fritz",
      initial: "T",
      basePoints: 50,
    },
  };

  // Stato del torneo
  const tournamentState = {
    userName: "",
    isAuthenticated: false,
    semifinals: { semifinal1: null, semifinal2: null },
    final: { winner: null },
    points: {
      total: 0,
      breakdown: [],
    },
  };

  // Elementi UI
  const userNameInput = document.getElementById("user-name");
  const userPasswordInput = document.getElementById("user-password");
  const loginStatus = document.getElementById("login-status");
  const submitButton = document.getElementById("submit-button");
  const confirmationModal = document.getElementById("confirmation-modal");
  const confirmationMessage = document.getElementById("confirmation-message");
  const closeModalButton = document.getElementById("close-modal");
  const scoreSection = document.getElementById("score-section");
  const scoreBreakdown = document.getElementById("score-breakdown");
  const totalPointsElement = document.getElementById("total-points");

  // Inizializza l'applicazione
  initApp();

  function initApp() {
    setupEventListeners();
    updateLoginStatus();
  }

  // Funzione per verificare l'autenticazione
  function checkAuthentication() {
    const username = userNameInput.value.trim();
    const password = userPasswordInput.value.trim();

    if (!username || !password) {
      tournamentState.isAuthenticated = false;
      return false;
    }

    tournamentState.isAuthenticated = verifyCredentials(username, password);
    return tournamentState.isAuthenticated;
  }

  // Aggiorna lo stato del login nell'UI
  function updateLoginStatus() {
    if (tournamentState.isAuthenticated) {
      loginStatus.textContent = "✓ Accesso autorizzato";
      loginStatus.className = "login-status success";
    } else {
      const username = userNameInput.value.trim();
      const password = userPasswordInput.value.trim();

      if (!username && !password) {
        loginStatus.textContent = "Inserisci nome e password";
        loginStatus.className = "login-status neutral";
      } else if (username && !password) {
        loginStatus.textContent = "Inserisci la password";
        loginStatus.className = "login-status warning";
      } else if (!username && password) {
        loginStatus.textContent = "Inserisci il nome";
        loginStatus.className = "login-status warning";
      } else {
        loginStatus.textContent = "✗ Nome o password errati";
        loginStatus.className = "login-status error";
      }
    }

    updateSubmitButtonState();
  }

  // Calcola il punteggio totale
  function calculatePoints() {
    let totalPoints = 0;
    const breakdown = [];

    // DEBUG: Log dello stato corrente
    console.log("Stato torneo:", tournamentState);

    // Punti per le semifinali (vincitori)
    if (tournamentState.semifinals.semifinal1) {
      const semifinal1Winner = players[tournamentState.semifinals.semifinal1];
      const points = semifinal1Winner.basePoints;
      totalPoints += points;
      breakdown.push({
        type: "Vincitore Semifinale",
        player: semifinal1Winner.name,
        points: points,
        group: "Semifinale 1",
      });
      console.log(`Semifinale 1: ${semifinal1Winner.name} - ${points} punti`);
    }

    if (tournamentState.semifinals.semifinal2) {
      const semifinal2Winner = players[tournamentState.semifinals.semifinal2];
      const points = semifinal2Winner.basePoints;
      totalPoints += points;
      breakdown.push({
        type: "Vincitore Semifinale",
        player: semifinal2Winner.name,
        points: points,
        group: "Semifinale 2",
      });
      console.log(`Semifinale 2: ${semifinal2Winner.name} - ${points} punti`);
    }

    // Punti per il campione
    if (tournamentState.final.winner) {
      let champion;
      if (tournamentState.final.winner === "semifinal1-winner") {
        champion = players[tournamentState.semifinals.semifinal1];
      } else {
        champion = players[tournamentState.semifinals.semifinal2];
      }
      const points = 100; // Punti fissi per campione
      totalPoints += points;
      breakdown.push({
        type: "Campione",
        player: champion.name,
        points: points,
        group: "Finale",
      });
      console.log(`Campione: ${champion.name} - ${points} punti`);
    }

    console.log("Punteggio totale calcolato:", totalPoints);
    console.log("Breakdown:", breakdown);

    tournamentState.points = {
      total: totalPoints,
      breakdown: breakdown,
    };

    return { total: totalPoints, breakdown: breakdown };
  }

  // Aggiorna la visualizzazione del punteggio
  function updateScoreDisplay() {
    const points = calculatePoints();

    if (points.breakdown.length > 0) {
      scoreSection.style.display = "block";

      // Aggiorna il dettaglio punti
      scoreBreakdown.innerHTML = "";
      points.breakdown.forEach((item) => {
        const scoreItem = document.createElement("div");
        scoreItem.className = "score-item";
        scoreItem.innerHTML = `
          <div class="score-info">
            <div class="score-player">${item.player}</div>
            <div class="score-type">${item.type} - ${item.group}</div>
          </div>
          <div class="score-points">+${item.points}</div>
        `;
        scoreBreakdown.appendChild(scoreItem);
      });

      // Aggiorna il totale
      totalPointsElement.textContent = points.total;
    } else {
      scoreSection.style.display = "none";
    }
  }

  // Setup degli event listeners
  function setupEventListeners() {
    // Verifica autenticazione quando cambiano nome o password
    userNameInput.addEventListener("input", function () {
      tournamentState.userName = this.value.trim();
      checkAuthentication();
      updateLoginStatus();
    });

    userPasswordInput.addEventListener("input", function () {
      checkAuthentication();
      updateLoginStatus();
    });

    // Reset del torneo
    document
      .getElementById("reset-button")
      .addEventListener("click", resetTournament);

    // Invio del pronostico
    submitButton.addEventListener("click", function () {
      if (isFormComplete() && tournamentState.isAuthenticated) {
        sendPredictionToServer();
      } else if (!tournamentState.isAuthenticated) {
        confirmationMessage.textContent =
          "❌ Accesso non autorizzato. Verifica nome e password.";
        confirmationModal.style.display = "flex";
      }
    });

    // Chiudi il modal
    closeModalButton.addEventListener("click", function () {
      confirmationModal.style.display = "none";
    });

    // Selezione vincitori delle semifinali
    document
      .querySelectorAll("#semifinal1 .match-player, #semifinal2 .match-player")
      .forEach((player) => {
        player.addEventListener("click", function () {
          if (!tournamentState.isAuthenticated) {
            confirmationMessage.textContent =
              "Devi prima effettuare l'accesso per fare pronostici";
            confirmationModal.style.display = "flex";
            return;
          }

          const match = this.closest(".match");
          const matchId = match.id;

          match.querySelectorAll(".match-player").forEach((p) => {
            p.classList.remove("winner");
          });

          this.classList.add("winner");

          if (matchId === "semifinal1") {
            tournamentState.semifinals.semifinal1 = this.dataset.player;
          } else {
            tournamentState.semifinals.semifinal2 = this.dataset.player;
          }

          updateFinal();
          updateScoreDisplay();
          updateSubmitButtonState();
        });
      });

    // Selezione vincitore della finale
    document.querySelectorAll("#final .match-player").forEach((player) => {
      player.addEventListener("click", function () {
        if (!tournamentState.isAuthenticated) {
          confirmationMessage.textContent =
            "Devi prima effettuare l'accesso per fare pronostici";
          confirmationModal.style.display = "flex";
          return;
        }

        document.querySelectorAll("#final .match-player").forEach((p) => {
          p.classList.remove("winner");
        });

        this.classList.add("winner");
        tournamentState.final.winner = this.dataset.player;

        updateChampion();
        updateScoreDisplay();
        updateSubmitButtonState();
      });
    });
  }

  // Reset del torneo
  function resetTournament() {
    tournamentState.semifinals.semifinal1 = null;
    tournamentState.semifinals.semifinal2 = null;
    tournamentState.final.winner = null;
    tournamentState.points = { total: 0, breakdown: [] };

    document.querySelectorAll(".match-player").forEach((player) => {
      player.classList.remove("winner");
      resetPlayerPlaceholder(player);
    });

    document.getElementById("champion-name").textContent =
      "Seleziona i vincitori";
    updateScoreDisplay();
    updateSubmitButtonState();
  }

  // Funzione per aggiornare la finale
  function updateFinal() {
    if (
      tournamentState.semifinals.semifinal1 &&
      tournamentState.semifinals.semifinal2
    ) {
      const semifinal1Winner = players[tournamentState.semifinals.semifinal1];
      const semifinal2Winner = players[tournamentState.semifinals.semifinal2];

      const finalPlayer1 = document.querySelector(
        '#final .match-player[data-player="semifinal1-winner"]'
      );
      updatePlayerElement(finalPlayer1, semifinal1Winner);

      const finalPlayer2 = document.querySelector(
        '#final .match-player[data-player="semifinal2-winner"]'
      );
      updatePlayerElement(finalPlayer2, semifinal2Winner);
    }
  }

  // Funzione per aggiornare il campione
  function updateChampion() {
    if (tournamentState.final.winner) {
      let champion;
      if (tournamentState.final.winner === "semifinal1-winner") {
        champion = players[tournamentState.semifinals.semifinal1];
      } else {
        champion = players[tournamentState.semifinals.semifinal2];
      }

      document.getElementById("champion-name").textContent = champion.name;
    }
  }

  // Funzione per aggiornare lo stato del pulsante di invio
  function updateSubmitButtonState() {
    submitButton.disabled = !(
      isFormComplete() && tournamentState.isAuthenticated
    );
  }

  // Funzione per verificare se il form è completo
  function isFormComplete() {
    return (
      tournamentState.semifinals.semifinal1 &&
      tournamentState.semifinals.semifinal2 &&
      tournamentState.final.winner
    );
  }

  // Funzione per inviare il pronostico al server
  async function sendPredictionToServer() {
    const submitButton = document.getElementById("submit-button");
    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Invio in corso...";

    const predictionData = {
      userName: tournamentState.userName,
      predictions: {
        semifinals: {
          semifinal1: players[tournamentState.semifinals.semifinal1].name,
          semifinal2: players[tournamentState.semifinals.semifinal2].name,
        },
        final: {
          winner:
            tournamentState.final.winner === "semifinal1-winner"
              ? players[tournamentState.semifinals.semifinal1].name
              : players[tournamentState.semifinals.semifinal2].name,
        },
      },
      points: tournamentState.points,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/api/predictions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(predictionData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        confirmationMessage.textContent = `🎉 Grazie ${tournamentState.userName}! Il tuo pronostico è stato registrato con successo. Punteggio: ${tournamentState.points.total} punti. ID: ${result.predictionId}`;
        confirmationModal.style.display = "flex";

        saveToLocalStorage(predictionData, result.predictionId);
      } else {
        throw new Error(result.error || "Errore del server");
      }
    } catch (error) {
      console.error("Errore nell'invio:", error);

      try {
        const localId = saveToLocalStorage(predictionData);
        confirmationMessage.textContent = `📱 Grazie ${tournamentState.userName}! Il pronostico è stato salvato localmente (server non disponibile). Punteggio: ${tournamentState.points.total} punti. ID locale: ${localId}`;
        confirmationModal.style.display = "flex";
      } catch (e) {
        confirmationMessage.textContent = `❌ Errore nel salvataggio: ${error.message}`;
        confirmationModal.style.display = "flex";
      }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  // Helper functions
  function updatePlayerElement(element, player) {
    element.querySelector("span").textContent = player.name;
    element.querySelector(".player-icon").textContent = player.initial;
  }

  function resetPlayerPlaceholder(player) {
    const playerData = player.dataset.player;
    const placeholders = {
      "semifinal1-winner": { text: "Vincitore Semifinale 1", icon: "SF1" },
      "semifinal2-winner": { text: "Vincitore Semifinale 2", icon: "SF2" },
    };

    if (placeholders[playerData]) {
      player.querySelector("span").textContent = placeholders[playerData].text;
      player.querySelector(".player-icon").textContent =
        placeholders[playerData].icon;
    }
  }

  function saveToLocalStorage(predictionData, serverId = null) {
    const localId = serverId || `local_${Date.now()}`;
    try {
      const existingPredictions =
        JSON.parse(localStorage.getItem("atpPredictions")) || [];
      existingPredictions.push({
        ...predictionData,
        id: localId,
        timestamp: new Date().toISOString(),
        serverId: serverId,
      });
      localStorage.setItem(
        "atpPredictions",
        JSON.stringify(existingPredictions)
      );
      return localId;
    } catch (e) {
      console.error("Errore salvataggio locale:", e);
      throw e;
    }
  }
});
