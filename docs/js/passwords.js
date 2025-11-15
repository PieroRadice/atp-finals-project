// File delle password - salvato come js/passwords.js
const userPasswords = {
  Lombo: "lombo68@hotmail.com",
  Pam: "pamelavecchietti75@gmail.com",
  Martina: "martina.creti21@libero.it",
  Mix: "michela_radice@alice.it",
  Piero: "radice.p@gmail.com",
  Pier: "pierluigi.giovati@gmail.com",
  Nata: "nataliaricco74@gmail.com",
  Gigi: "luigipeluso15@gmail.com!",
  Rob: "Matogrelu@gmail.com",
  Cuzzo: "maurizio.colombo.web@gmail.com",
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
