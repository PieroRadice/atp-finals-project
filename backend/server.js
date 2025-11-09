const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: ["https://pieroradice.github.io", "http://localhost:8000"],
    credentials: true,
  })
);
app.use(express.json());

// File per memorizzare i pronostici
const PREDICTIONS_FILE = path.join(__dirname, "predictions.json");

// Inizializza il file se non esiste
if (!fs.existsSync(PREDICTIONS_FILE)) {
  fs.writeFileSync(PREDICTIONS_FILE, JSON.stringify([]));
}

// Helper per leggere i pronostici
function readPredictions() {
  try {
    const data = fs.readFileSync(PREDICTIONS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Errore lettura file:", error);
    return [];
  }
}

// Helper per scrivere i pronostici
function writePredictions(predictions) {
  try {
    fs.writeFileSync(PREDICTIONS_FILE, JSON.stringify(predictions, null, 2));
    return true;
  } catch (error) {
    console.error("Errore scrittura file:", error);
    return false;
  }
}

// Routes
app.get("/api", (req, res) => {
  res.json({
    message: "ATP Finals Predictions API",
    version: "1.0.0",
    endpoints: {
      "/api/predictions": "GET tutti i pronostici, POST per aggiungerne uno",
      "/api/predictions/:user": "GET pronostici di un utente",
      "/api/stats": "GET statistiche",
    },
  });
});

// Ottieni tutti i pronostici
app.get("/api/predictions", (req, res) => {
  const predictions = readPredictions();
  res.json(predictions);
});

// Aggiungi nuovo pronostico
app.post("/api/predictions", (req, res) => {
  const { userName, predictions } = req.body;

  if (!userName || !predictions) {
    return res.status(400).json({
      error: "Nome utente e pronostici sono obbligatori",
    });
  }

  const allPredictions = readPredictions();

  const newPrediction = {
    id: Date.now().toString(),
    userName: userName.trim(),
    predictions,
    timestamp: new Date().toISOString(),
  };

  allPredictions.push(newPrediction);

  if (writePredictions(allPredictions)) {
    res.status(201).json({
      success: true,
      message: "Pronostico registrato con successo",
      predictionId: newPrediction.id,
    });
  } else {
    res.status(500).json({ error: "Errore nel salvataggio" });
  }
});

// Health check per Heroku
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.get("/svolgimento/finals", (req, res) => res.render("svolgimento"));

// Avvia il server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server ATP Finals running on port ${PORT}`);
  console.log(`🌐 API available at: http://localhost:${PORT}/api`);
});
