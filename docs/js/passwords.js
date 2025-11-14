// File delle password - salvato come js/passwords.js
const userPasswords = {
  Pam: "BellaBella",
  Piero: "PieroPiero",
  Lombo: "MaxMassi",
};

// Funzione per verificare le credenziali
function verifyCredentials(username, password) {
  // Controllo case-insensitive per il nome utente
  const normalizedUsername = username.trim();

  // Verifica se l'utente esiste e se la password corrisponde
  if (userPasswords.hasOwnProperty(normalizedUsername)) {
    return userPasswords[normalizedUsername] === password;
  }

  return false;
}

// Funzione per ottenere l'elenco degli utenti (per debug)
function getAvailableUsers() {
  return Object.keys(userPasswords);
}
