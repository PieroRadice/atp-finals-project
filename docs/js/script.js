// === DEFINIZIONE PUNTEGGI ===
const punteggi = {
  "Carlos Alcaraz": {
    gruppo: "Connors",
    punti2: 20,
    punti1: 40,
    classifica: 1,
  },
  "Lorenzo Musetti": {
    gruppo: "Connors",
    punti2: 160,
    punti1: 320,
    classifica: 9,
  },
  "Taylor Fritz": { gruppo: "Connors", punti2: 40, punti1: 80, classifica: 6 },
  "Alex de Minaur": {
    gruppo: "Connors",
    punti2: 80,
    punti1: 160,
    classifica: 7,
  },
  "Jannik Sinner": { gruppo: "Borg", punti2: 20, punti1: 40, classifica: 2 },
  "Alexander Zverev": { gruppo: "Borg", punti2: 40, punti1: 80, classifica: 3 },
  "Ben Shelton": { gruppo: "Borg", punti2: 80, punti1: 160, classifica: 5 },
  "Felix Auger-Aliassime": {
    gruppo: "Borg",
    punti2: 160,
    punti1: 320,
    classifica: 8,
  },
};

// === PRONOSTICI ===
// Ogni partecipante indica 1° e 2° per ciascun gruppo
const pronostici = [
  {
    nome: "Lombo",
    img: "https://c7.alamy.com/compit/gbwtye/tennis-wimbledon-championships-mens-singles-final-bjorn-borg-v-john-mcenroe-bjorn-borg-in-azione-gbwtye.jpg",
    scelte: {
      gruppoConnors: { primo: "Carlos Alcaraz", secondo: "Taylor Fritz" },
      gruppoBorg: { primo: "Jannik Sinner", secondo: "Felix Auger-Aliassime" },
    },
  },
  {
    nome: "Pam",
    img: "https://static2.amica.it/wp-content/uploads/2023/07/8456559_large.jpg?v=1278015_1688727790",
    scelte: {
      gruppoConnors: { primo: "Carlos Alcaraz", secondo: "Alex de Minaur" },
      gruppoBorg: { primo: "Jannik Sinner", secondo: "Felix Auger-Aliassime" },
    },
  },
  {
    nome: "Martina",
    img: "../img/Marti.jpg",
    scelte: {
      gruppoConnors: { primo: "Carlos Alcaraz", secondo: "Lorenzo Musetti" },
      gruppoBorg: { primo: "Jannik Sinner", secondo: "Alexander Zverev" },
    },
  },
  {
    nome: "Mix",
    img: "https://compass-media.vogue.it/photos/6481dae3e03ab1e612092926/3:4/w_1920,c_limit/3241967",
    scelte: {
      gruppoConnors: { primo: "Lorenzo Musetti", secondo: "Carlos Alcaraz" },
      gruppoBorg: {
        primo: "Jannik Sinner",
        secondo: "Alexander Zverev",
      },
    },
  },
  {
    nome: "Piero",
    img: "../img/agassi.png",
    scelte: {
      gruppoConnors: { primo: "Lorenzo Musetti", secondo: "Taylor Fritz" },
      gruppoBorg: {
        primo: "Felix Auger-Aliassime",
        secondo: "Ben Shelton",
      },
    },
  },
  {
    nome: "Pier",
    img: "../img/kasatkina.jpg",
    scelte: {
      gruppoConnors: { primo: "Carlos Alcaraz", secondo: "Alex de Minaur" },
      gruppoBorg: {
        primo: "Jannik Sinner",
        secondo: "Ben Shelton",
      },
    },
  },
  {
    nome: "Nata",
    img: "../img/serena_williams.jpg",
    scelte: {
      gruppoConnors: { primo: "Carlos Alcaraz", secondo: "Taylor Fritz" },
      gruppoBorg: {
        primo: "Jannik Sinner",
        secondo: "Alexander Zverev",
      },
    },
  },
  {
    nome: "Gigi",
    img: "https://static.wixstatic.com/media/aff08a_abda19b7314f4c42a58085b83414859f~mv2.png/v1/crop/x_40,y_0,w_830,h_1270/fill/w_634,h_970,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Pete%20Sampras%2C%20%40Tennis.png",
    scelte: {
      gruppoConnors: { primo: "Carlos Alcaraz", secondo: "Lorenzo Musetti" },
      gruppoBorg: {
        primo: "Jannik Sinner",
        secondo: "Felix Auger-Aliassime",
      },
    },
  },
  {
    nome: "Rob",
    img: "../img/wavrinka.png",
    scelte: {
      gruppoConnors: { primo: "Lorenzo Musetti", secondo: "Carlos Alcaraz" },
      gruppoBorg: {
        primo: "Ben Shelton",
        secondo: "Alexander Zverev",
      },
    },
  },
];

// === COSTRUZIONE PAGINA ===
const container = document.getElementById("container");

pronostici.forEach((p) => {
  // Recupera giocatori scelti
  const c1 = p.scelte.gruppoConnors.primo;
  const c2 = p.scelte.gruppoConnors.secondo;
  const b1 = p.scelte.gruppoBorg.primo;
  const b2 = p.scelte.gruppoBorg.secondo;

  // Calcola i punti di ciascuno
  const puntiC1 = punteggi[c1].punti1;
  const puntiC2 = punteggi[c2].punti2;
  const puntiB1 = punteggi[b1].punti1;
  const puntiB2 = punteggi[b2].punti2;

  const totale = puntiC1 + puntiC2 + puntiB1 + puntiB2;

  // Crea la card HTML
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${p.img}" alt="${p.nome}">
    <div class="nome">${p.nome}</div>
    <div class="totale">Totale: ${totale} punti</div>

    <div class="gruppo">
      <h3>Gruppo Jimmy Connors</h3>
      <div class="giocatore">
        <h4>1° ${c1}</h4>
        <small>Classifica: ${punteggi[c1].classifica} | ${puntiC1} punti</small>
      </div>
      <div class="giocatore">
        <h4>2° ${c2}</h4>
        <small>Classifica: ${punteggi[c2].classifica} | ${puntiC2} punti</small>
      </div>
    </div>

    <div class="gruppo">
      <h3>Gruppo Bjorn Borg</h3>
      <div class="giocatore">
        <h4>1° ${b1}</h4>
        <small>Classifica: ${punteggi[b1].classifica} | ${puntiB1} punti</small>
      </div>
      <div class="giocatore">
        <h4>2° ${b2}</h4>
        <small>Classifica: ${punteggi[b2].classifica} | ${puntiB2} punti</small>
      </div>
    </div>
  `;

  container.appendChild(card);
});
