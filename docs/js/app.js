document.addEventListener("DOMContentLoaded", function () {
  // URL del backend Heroku
  const BACKEND_URL =
    "https://atp-finals-backend-popostapo-7edfa465e9dd.herokuapp.com";

  // Mappa dei giocatori - FONTE DEI DATI
  const players = {
    alcaraz: {
      name: "Carlos Alcaraz",
      initial: "C",
      girone: "Jimmy Connors",
      stats: "2-1 | 5-3",
    },
    sinner: {
      name: "Jannik Sinner",
      initial: "J",
      girone: "Bjorn Borg",
      stats: "2-1 | 5-3",
    },
    zverev: {
      name: "Alexander Zverev",
      initial: "A",
      girone: "Bjorn Borg",
      stats: "1-2 | 4-5",
    },
    shelton: {
      name: "Ben Shelton",
      initial: "B",
      girone: "Bjorn Borg",
      stats: "0-3 | 1-6",
    },
    fritz: {
      name: "Taylor Fritz",
      initial: "T",
      girone: "Jimmy Connors",
      stats: "1-2 | 3-5",
    },
    deminaur: {
      name: "Alex de Minaur",
      initial: "A",
      girone: "Jimmy Connors",
      stats: "1-2 | 3-5",
    },
    augeraliassime: {
      name: "Felix Auger-Aliassime",
      initial: "F",
      girone: "Bjorn Borg",
      stats: "1-2 | 3-5",
    },
    musetti: {
      name: "Lorenzo Musetti",
      initial: "L",
      girone: "Jimmy Connors",
      stats: "0-3 | 1-6",
    },
  };

  // Stato del torneo
  const tournamentState = {
    userName: "",
    green: { first: null, second: null },
    red: { first: null, second: null },
    semifinals: { semifinal1: null, semifinal2: null },
    final: { winner: null },
  };

  // Elementi UI
  const userNameInput = document.getElementById("user-name");
  const submitButton = document.getElementById("submit-button");
  const confirmationModal = document.getElementById("confirmation-modal");
  const confirmationMessage = document.getElementById("confirmation-message");
  const closeModalButton = document.getElementById("close-modal");
  const groupsContainer = document.getElementById("groups-container");

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
    Object.entries(playersByGroup).forEach(
      ([groupName, groupPlayers], index) => {
        const groupId = index === 0 ? "green" : "red";
        const groupElement = createGroupElement(
          groupName,
          groupId,
          groupPlayers
        );
        groupsContainer.appendChild(groupElement);
      }
    );

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
    players.forEach((player) => {
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
      <div class="player-stats">
        <span>${player.stats.split(" | ")[0]}</span>
        <span>${player.stats.split(" | ")[1]}</span>
      </div>
    `;

    return playerDiv;
  }

  // Setup degli event listeners
  function setupEventListeners() {
    // Abilita/disabilita il pulsante di invio in base al nome utente
    userNameInput.addEventListener("input", function () {
      tournamentState.userName = this.value.trim();
      updateSubmitButtonState();
    });

    // Reset del torneo
    document
      .getElementById("reset-button")
      .addEventListener("click", resetTournament);

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

        if (
          tournamentState[group].first !== playerId &&
          tournamentState[group].second !== playerId
        ) {
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
          updateSubmitButtonState();
        }
      });
    });

    // Selezione vincitori delle semifinali
    document
      .querySelectorAll("#semifinal1 .match-player, #semifinal2 .match-player")
      .forEach((player) => {
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

    document.querySelectorAll(".player").forEach((player) => {
      player.classList.remove("selected-first", "selected-second");
    });

    document.querySelectorAll(".match-player").forEach((player) => {
      player.classList.remove("winner");
      resetPlayerPlaceholder(player);
    });

    document.getElementById("champion-name").textContent =
      "Seleziona i vincitori";
    updateSubmitButtonState();
  }

  // Funzione per aggiornare le semifinali
  function updateSemifinals() {
    if (tournamentState.green.first && tournamentState.red.second) {
      const greenFirstPlayer = players[tournamentState.green.first];
      const redSecondPlayer = players[tournamentState.red.second];

      const greenFirstElement = document.querySelector(
        '#semifinal1 .match-player[data-player="green-first"]'
      );
      updatePlayerElement(greenFirstElement, greenFirstPlayer);

      const redSecondElement = document.querySelector(
        '#semifinal1 .match-player[data-player="red-second"]'
      );
      updatePlayerElement(redSecondElement, redSecondPlayer);
    }

    if (tournamentState.red.first && tournamentState.green.second) {
      const redFirstPlayer = players[tournamentState.red.first];
      const greenSecondPlayer = players[tournamentState.green.second];

      const redFirstElement = document.querySelector(
        '#semifinal2 .match-player[data-player="red-first"]'
      );
      updatePlayerElement(redFirstElement, redFirstPlayer);

      const greenSecondElement = document.querySelector(
        '#semifinal2 .match-player[data-player="green-second"]'
      );
      updatePlayerElement(greenSecondElement, greenSecondPlayer);
    }
  }

  // Funzione per aggiornare la finale
  function updateFinal() {
    if (
      tournamentState.semifinals.semifinal1 &&
      tournamentState.semifinals.semifinal2
    ) {
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
          semifinal1:
            tournamentState.semifinals.semifinal1 === "green-first"
              ? players[tournamentState.green.first].name
              : players[tournamentState.red.second].name,
          semifinal2:
            tournamentState.semifinals.semifinal2 === "red-first"
              ? players[tournamentState.red.first].name
              : players[tournamentState.green.second].name,
        },
        final: {
          winner:
            tournamentState.final.winner === "semifinal1-winner"
              ? tournamentState.semifinals.semifinal1 === "green-first"
                ? players[tournamentState.green.first].name
                : players[tournamentState.red.second].name
              : tournamentState.semifinals.semifinal2 === "red-first"
              ? players[tournamentState.red.first].name
              : players[tournamentState.green.second].name,
        },
      },
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
        confirmationMessage.textContent = `🎉 Grazie ${tournamentState.userName}! Il tuo pronostico è stato registrato con successo. ID: ${result.predictionId}`;
        confirmationModal.style.display = "flex";

        saveToLocalStorage(predictionData, result.predictionId);
      } else {
        throw new Error(result.error || "Errore del server");
      }
    } catch (error) {
      console.error("Errore nell'invio:", error);

      try {
        const localId = saveToLocalStorage(predictionData);
        confirmationMessage.textContent = `📱 Grazie ${tournamentState.userName}! Il pronostico è stato salvato localmente (server non disponibile). ID locale: ${localId}`;
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
