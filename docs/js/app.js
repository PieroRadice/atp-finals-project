document.addEventListener("DOMContentLoaded", function () {
  // URL del backend Heroku
  const BACKEND_URL = "https://atp-finals-backend-popostapo-7edfa465e9dd.herokuapp.com";

  // Mappa dei giocatori con sistema punti
  const players = {
    alcaraz: { 
      name: "Carlos Alcaraz", 
      initial: "C", 
      girone: "Jimmy Connors",
      basePoints: 20  // Come secondo classificato
    },
    sinner: { 
      name: "Jannik Sinner", 
      initial: "J", 
      girone: "Bjorn Borg",
      basePoints: 20  // Come secondo classificato
    },
    zverev: { 
      name: "Alexander Zverev", 
      initial: "A", 
      girone: "Bjorn Borg",
      basePoints: 40  // Come secondo classificato
    },
    fritz: { 
      name: "Taylor Fritz", 
      initial: "T", 
      girone: "Jimmy Connors",
      basePoints: 40  // Come secondo classificato
    },
    shelton: { 
      name: "Ben Shelton", 
      initial: "B", 
      girone: "Bjorn Borg",
      basePoints: 80  // Come secondo classificato
    },
    deminaur: { 
      name: "Alex de Minaur", 
      initial: "A", 
      girone: "Jimmy Connors",
      basePoints: 80  // Come secondo classificato
    },
    augeraliassime: { 
      name: "Felix Auger-Aliassime", 
      initial: "F", 
      girone: "Bjorn Borg",
      basePoints: 160  // Come secondo classificato
    },
    musetti: { 
      name: "Lorenzo Musetti", 
      initial: "L", 
      girone: "Jimmy Connors",
      basePoints: 160  // Come secondo classificato
    }
  };

  // Stato del torneo
  const tournamentState = {
    userName: "",
    green: { first: null, second: null },
    red: { first: null, second: null },
    semifinals: { semifinal1: null, semifinal2: null },
    final: { winner: null },
    points: {
      total: 0,
      breakdown: []
    }
  };

  // Elementi UI
  const userNameInput = document.getElementById("user-name");
  const submitButton = document.getElementById("submit-button");
  const confirmationModal = document.getElementById("confirmation-modal");
  const confirmationMessage = document.getElementById("confirmation-message");
  const closeModalButton = document.getElementById("close-modal");
  const groupsContainer = document.getElementById("groups-container");
  const scoreSection = document.getElementById("score-section");
  const scoreBreakdown = document.getElementById("score-breakdown");
  const totalPointsElement = document.getElementById("total-points");

  // Inizializza l'applicazione
  initApp();

  function initApp() {
    generateGroups();
    setupEventListeners();
  }

  // Genera dinamicamente i gironi dalla mappa dei giocatori
  function generateGroups() {
    // Raggruppa i giocatori per girone
    const playersByGroup = {};
    
    Object.entries(players).forEach(([playerId, playerData]) => {
      const groupName = playerData.girone;
      if (!playersByGroup[groupName]) {
        playersByGroup[groupName] = [];
      }
      playersByGroup[groupName].push({ id: playerId, ...playerData });
    });

    // Crea i gironi
    Object.entries(playersByGroup).forEach(([groupName, groupPlayers], index) => {
      const groupId = index === 0 ? "green" : "red";
      const groupElement = createGroupElement(groupName, groupId, groupPlayers);
      groupsContainer.appendChild(groupElement);
    });

    // Ri-setup degli event listeners per i giocatori appena creati
    setupPlayerEventListeners();
  }

  // Crea un elemento girone
  function createGroupElement(groupName, groupId, players) {
    const groupDiv = document.createElement("div");
    groupDiv.className = "group";
    groupDiv.dataset.group = groupId;

    const title = document.createElement("h3");
    title.className = "group-title";
    title.textContent = groupName;
    groupDiv.appendChild(title);

    // Aggiungi i giocatori al girone
    players.forEach(player => {
      const playerElement = createPlayerElement(player, groupId);
      groupDiv.appendChild(playerElement);
    });

    return groupDiv;
  }

  // Crea un elemento giocatore
  function createPlayerElement(player, groupId) {
    const playerDiv = document.createElement("div");
    playerDiv.className = "player";
    playerDiv.dataset.player = player.id;
    playerDiv.dataset.group = groupId;

    playerDiv.innerHTML = `
      <div class="player-icon">${player.initial}</div>
      <span class="player-name">${player.name}</span>
      <div class="player-stats"></div>
    `;

    return playerDiv;
  }

  // Calcola il punteggio totale
  function calculatePoints() {
    let totalPoints = 0;
    const breakdown = [];

    // DEBUG: Log dello stato corrente
    console.log("Stato torneo:", tournamentState);

    // Punti per i gironi - Jimmy Connors (green)
    if (tournamentState.green.first) {
      const player = players[tournamentState.green.first];
      const points = player.basePoints * 2; // Doppio punti per primo classificato
      totalPoints += points;
      breakdown.push({
        type: 'Primo Classificato',
        player: player.name,
        points: points,
        group: 'Jimmy Connors'
      });
      console.log(`Primo Jimmy Connors: ${player.name} - ${points} punti`);
    }

    if (tournamentState.green.second) {
      const player = players[tournamentState.green.second];
      const points = player.basePoints; // Punti base per secondo classificato
      totalPoints += points;
      breakdown.push({
        type: 'Secondo Classificato',
        player: player.name,
        points: points,
        group: 'Jimmy Connors'
      });
      console.log(`Secondo Jimmy Connors: ${player.name} - ${points} punti`);
    }

    // Punti per i gironi - Bjorn Borg (red)
    if (tournamentState.red.first) {
      const player = players[tournamentState.red.first];
      const points = player.basePoints * 2; // Doppio punti per primo classificato
      totalPoints += points;
      breakdown.push({
        type: 'Primo Classificato',
        player: player.name,
        points: points,
        group: 'Bjorn Borg'
      });
      console.log(`Primo Bjorn Borg: ${player.name} - ${points} punti`);
    }

    if (tournamentState.red.second) {
      const player = players[tournamentState.red.second];
      const points = player.basePoints; // Punti base per secondo classificato
      totalPoints += points;
      breakdown.push({
        type: 'Secondo Classificato',
        player: player.name,
        points: points,
        group: 'Bjorn Borg'
      });
      console.log(`Secondo Bjorn Borg: ${player.name} - ${points} punti`);
    }

    // Punti per le semifinali (vincitori)
    if (tournamentState.semifinals.semifinal1) {
      let semifinal1Winner;
      if (tournamentState.semifinals.semifinal1 === "green-first") {
        semifinal1Winner = players[tournamentState.green.first];
      } else {
        semifinal1Winner = players[tournamentState.red.second];
      }
      const points = 50; // Punti fissi per semifinale vinta
      totalPoints += points;
      breakdown.push({
        type: 'Vincitore Semifinale',
        player: semifinal1Winner.name,
        points: points,
        group: 'Semifinale 1'
      });
      console.log(`Semifinale 1: ${semifinal1Winner.name} - ${points} punti`);
    }

    if (tournamentState.semifinals.semifinal2) {
      let semifinal2Winner;
      if (tournamentState.semifinals.semifinal2 === "red-first") {
        semifinal2Winner = players[tournamentState.red.first];
      } else {
        semifinal2Winner = players[tournamentState.green.second];
      }
      const points = 50; // Punti fissi per semifinale vinta
      totalPoints += points;
      breakdown.push({
        type: 'Vincitore Semifinale',
        player: semifinal2Winner.name,
        points: points,
        group: 'Semifinale 2'
      });
      console.log(`Semifinale 2: ${semifinal2Winner.name} - ${points} punti`);
    }

    // Punti per il campione
    if (tournamentState.final.winner) {
      let champion;
      if (tournamentState.final.winner === "semifinal1-winner") {
        if (tournamentState.semifinals.semifinal1 === "green-first") {
          champion = players[tournamentState.green.first];
        } else {
          champion = players[tournamentState.red.second];
        }
      } else {
        if (tournamentState.semifinals.semifinal2 === "red-first") {
          champion = players[tournamentState.red.first];
        } else {
          champion = players[tournamentState.green.second];
        }
      }
      const points = 100; // Punti fissi per campione
      totalPoints += points;
      breakdown.push({
        type: 'Campione',
        player: champion.name,
        points: points,
        group: 'Finale'
      });
      console.log(`Campione: ${champion.name} - ${points} punti`);
    }

    console.log("Punteggio totale calcolato:", totalPoints);
    console.log("Breakdown:", breakdown);

    tournamentState.points = {
      total: totalPoints,
      breakdown: breakdown
    };

    return { total: totalPoints, breakdown: breakdown };
  }

  // Aggiorna la visualizzazione del punteggio
  function updateScoreDisplay() {
    const points = calculatePoints();
    
    if (points.breakdown.length > 0) {
      scoreSection.style.display = 'block';
      
      // Aggiorna il dettaglio punti
      scoreBreakdown.innerHTML = '';
      points.breakdown.forEach(item => {
        const scoreItem = document.createElement('div');
        scoreItem.className = 'score-item';
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
      scoreSection.style.display = 'none';
    }
  }

  // Setup degli event listeners
  function setupEventListeners() {
    // Abilita/disabilita il pulsante di invio in base al nome utente
    userNameInput.addEventListener("input", function () {
      tournamentState.userName = this.value.trim();
      updateSubmitButtonState();
    });

    // Reset del torneo
    document.getElementById("reset-button").addEventListener("click", resetTournament);

    // Invio del pronostico
    submitButton.addEventListener("click", function () {
      if (isFormComplete()) {
        sendPredictionToServer();
      }
    });

    // Chiudi il modal
    closeModalButton.addEventListener("click", function () {
      confirmationModal.style.display = "none";
    });
  }

  // Setup event listeners per i giocatori
  function setupPlayerEventListeners() {
    document.querySelectorAll(".group .player").forEach((player) => {
      player.addEventListener("click", function () {
        const group = this.dataset.group;
        const playerId = this.dataset.player;

        if (tournamentState[group].first !== playerId && tournamentState[group].second !== playerId) {
          if (!tournamentState[group].first) {
            tournamentState[group].first = playerId;
            this.classList.add("selected-first");
          } else if (!tournamentState[group].second) {
            tournamentState[group].second = playerId;
            this.classList.add("selected-second");
          } else {
            const previousSecond = document.querySelector(
              `.group[data-group="${group}"] .player[data-player="${tournamentState[group].second}"]`
            );
            previousSecond.classList.remove("selected-second");

            tournamentState[group].second = playerId;
            this.classList.add("selected-second");
          }

          updateSemifinals();
          updateScoreDisplay();
          updateSubmitButtonState();
        }
      });
    });

    // Selezione vincitori delle semifinali
    document.querySelectorAll("#semifinal1 .match-player, #semifinal2 .match-player").forEach((player) => {
      player.addEventListener("click", function () {
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
    tournamentState.green.first = null;
    tournamentState.green.second = null;
    tournamentState.red.first = null;
    tournamentState.red.second = null;
    tournamentState.semifinals.semifinal1 = null;
    tournamentState.semifinals.semifinal2 = null;
    tournamentState.final.winner = null;
    tournamentState.points = { total: 0, breakdown: [] };

    document.querySelectorAll(".player").forEach((player) => {
      player.classList.remove("selected-first", "selected-second");
    });

    document.querySelectorAll(".match-player").forEach((player) => {
      player.classList.remove("winner");
      resetPlayerPlaceholder(player);
    });

    document.getElementById("champion-name").textContent = "Seleziona i vincitori";
    updateScoreDisplay();
    updateSubmitButtonState();
  }

  // Funzione per aggiornare le semifinali
  function updateSemifinals() {
    if (tournamentState.green.first && tournamentState.red.second) {
      const greenFirstPlayer = players[tournamentState.green.first];
      const redSecondPlayer = players[tournamentState.red.second];

      const greenFirstElement = document.querySelector('#semifinal1 .match-player[data-player="green-first"]');
      updatePlayerElement(greenFirstElement, greenFirstPlayer);

      const redSecondElement = document.querySelector('#semifinal1 .match-player[data-player="red-second"]');
      updatePlayerElement(redSecondElement, redSecondPlayer);
    }

    if (tournamentState.red.first && tournamentState.green.second) {
      const redFirstPlayer = players[tournamentState.red.first];
      const greenSecondPlayer = players[tournamentState.green.second];

      const redFirstElement = document.querySelector('#semifinal2 .match-player[data-player="red-first"]');
      updatePlayerElement(redFirstElement, redFirstPlayer);

      const greenSecondElement = document.querySelector('#semifinal2 .match-player[data-player="green-second"]');
      updatePlayerElement(greenSecondElement, greenSecondPlayer);
    }
  }

  // Funzione per aggiornare la finale
  function updateFinal() {
    if (tournamentState.semifinals.semifinal1 && tournamentState.semifinals.semifinal2) {
      let semifinal1Winner, semifinal2Winner;

      if (tournamentState.semifinals.semifinal1 === "green-first") {
        semifinal1Winner = players[tournamentState.green.first];
      } else {
        semifinal1Winner = players[tournamentState.red.second];
      }

      if (tournamentState.semifinals.semifinal2 === "red-first") {
        semifinal2Winner = players[tournamentState.red.first];
      } else {
        semifinal2Winner = players[tournamentState.green.second];
      }

      const finalPlayer1 = document.querySelector('#final .match-player[data-player="semifinal1-winner"]');
      updatePlayerElement(finalPlayer1, semifinal1Winner);

      const finalPlayer2 = document.querySelector('#final .match-player[data-player="semifinal2-winner"]');
      updatePlayerElement(finalPlayer2, semifinal2Winner);
    }
  }

  // Funzione per aggiornare il campione
  function updateChampion() {
    if (tournamentState.final.winner) {
      let champion;

      if (tournamentState.final.winner === "semifinal1-winner") {
        if (tournamentState.semifinals.semifinal1 === "green-first") {
          champion = players[tournamentState.green.first];
        } else {
          champion = players[tournamentState.red.second];
        }
      } else {
        if (tournamentState.semifinals.semifinal2 === "red-first") {
          champion = players[tournamentState.red.first];
        } else {
          champion = players[tournamentState.green.second];
        }
      }

      document.getElementById("champion-name").textContent = champion.name;
    }
  }

  // Funzione per aggiornare lo stato del pulsante di invio
  function updateSubmitButtonState() {
    submitButton.disabled = !(isFormComplete() && tournamentState.userName);
  }

  // Funzione per verificare se il form è completo
  function isFormComplete() {
    return (
      tournamentState.green.first &&
      tournamentState.green.second &&
      tournamentState.red.first &&
      tournamentState.red.second &&
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
        greenGroup: {
          first: players[tournamentState.green.first].name,
          second: players[tournamentState.green.second].name,
        },
        redGroup: {
          first: players[tournamentState.red.first].name,
          second: players[tournamentState.red.second].name,
        },
        semifinals: {
          semifinal1: tournamentState.semifinals.semifinal1 === "green-first"
            ? players[tournamentState.green.first].name
            : players[tournamentState.red.second].name,
          semifinal2: tournamentState.semifinals.semifinal2 === "red-first"
            ? players[tournamentState.red.first].name
            : players[tournamentState.green.second].name,
        },
        final: {
          winner: tournamentState.final.winner === "semifinal1-winner"
            ? tournamentState.semifinals.semifinal1 === "green-first"
              ? players[tournamentState.green.first].name
              : players[tournamentState.red.second].name
            : tournamentState.semifinals.semifinal2 === "red-first"
            ? players[tournamentState.red.first].name
            : players[tournamentState.green.second].name,
        },
      },
      points: tournamentState.points
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
      "green-first": { text: "1° Classificato Gruppo Verde", icon: "1" },
      "green-second": { text: "2° Classificato Gruppo Verde", icon: "2" },
      "red-first": { text: "1° Classificato Gruppo Rosso", icon: "1" },
      "red-second": { text: "2° Classificato Gruppo Rosso", icon: "2" },
      "semifinal1-winner": { text: "Vincitore Semifinale 1", icon: "SF1" },
      "semifinal2-winner": { text: "Vincitore Semifinale 2", icon: "SF2" },
    };

    if (placeholders[playerData]) {
      player.querySelector("span").textContent = placeholders[playerData].text;
      player.querySelector(".player-icon").textContent = placeholders[playerData].icon;
    }
  }

  function saveToLocalStorage(predictionData, serverId = null) {
    const localId = serverId || `local_${Date.now()}`;
    try {
      const existingPredictions = JSON.parse(localStorage.getItem("atpPredictions")) || [];
      existingPredictions.push({
        ...predictionData,
        id: localId,
        timestamp: new Date().toISOString(),
        serverId: serverId,
      });
      localStorage.setItem("atpPredictions", JSON.stringify(existingPredictions));
      return localId;
    } catch (e) {
      console.error("Errore salvataggio locale:", e);
      throw e;
    }
  }
});