// === DEFINIZIONE TORNEI ===
const tornei25 = {
  "Australian Open": {
    superficie: "Connors",
    data_classifica: 20,
    tennisti: [],
    puntiSemifinale: 20,
    classifica: 1,
    posizioneOttenuta: 1,
  },
  "Qatar Open ATP": {
    gruppo: "Connors",
    punti2: 160,
    punti1: 320,
    classifica: 9,
    posizioneOttenuta: 2,
  },
  "Indian Wells Masters": {
    gruppo: "Connors",
    punti2: 40,
    punti1: 80,
    classifica: 6,
    posizioneOttenuta: 3,
  },
  "Miami Open": {
    gruppo: "Connors",
    punti2: 80,
    punti1: 160,
    puntiSemifinale: 40,
    classifica: 7,
    posizioneOttenuta: 4,
  },
  "Monte-Carlo Masters": {
    gruppo: "Borg",
    punti2: 20,
    punti1: 40,
    puntiSemifinale: 20,
    classifica: 2,
    posizioneOttenuta: 1,
  },
  "Madrid Open": {
    gruppo: "Borg",
    punti2: 40,
    punti1: 80,
    classifica: 3,
    posizioneOttenuta: 2,
  },
  "Italian Open (Roma)": {
    gruppo: "Borg",
    punti2: 80,
    punti1: 160,
    classifica: 5,
    posizioneOttenuta: 3,
  },
  Wimbledon: {
    gruppo: "Borg",
    punti2: 160,
    punti1: 320,
    puntiSemifinale: 80,
    classifica: 8,
    posizioneOttenuta: 4,
  },
  "US Open": {
    gruppo: "Borg",
    punti2: 160,
    punti1: 320,
    puntiSemifinale: 80,
    classifica: 8,
    posizioneOttenuta: 4,
  },
  "Shanghai Masters": {
    gruppo: "Borg",
    punti2: 160,
    punti1: 320,
    puntiSemifinale: 80,
    classifica: 8,
    posizioneOttenuta: 4,
  },
  "ATP Finals gironi": {
    gruppo: "Borg",
    punti2: 160,
    punti1: 320,
    puntiSemifinale: 80,
    classifica: 8,
    posizioneOttenuta: 4,
  },
  "ATP Finals scontri diretti": {
    gruppo: "Borg",
    punti2: 160,
    punti1: 320,
    puntiSemifinale: 80,
    classifica: 8,
    posizioneOttenuta: 4,
  },
};

// === PRONOSTICI ===
const tiresia = {
  nome: "Tiresia",
  img: "https://s1.qwant.com/thumbr/372x372/2/b/15117a10d59d26e8bfdf366c11bd116e418c17832e4e815961a56f91a78c00/OIP.d-2rdbqjsslDg4AQHSgENgAAAA.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%2Fid%2FOIP.d-2rdbqjsslDg4AQHSgENgAAAA%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&q=0&b=1&p=0&a=0",
  scelte: {
    gruppoConnors: { primo: "Carlos Alcaraz", secondo: "Alex de Minaur" },
    gruppoBorg: { primo: "Jannik Sinner", secondo: "Felix Auger-Aliassime" },
    semifinale1: "Jannik Sinner",
    semifinale2: "Carlos Alcaraz",
    finale: "Jannik Sinner",
  },
};

const tc1 = tiresia.scelte.gruppoConnors.primo;
const tc2 = tiresia.scelte.gruppoConnors.secondo;
const tb1 = tiresia.scelte.gruppoBorg.primo;
const tb2 = tiresia.scelte.gruppoBorg.secondo;
const ts1 = tiresia.scelte.semifinale1;
const ts2 = tiresia.scelte.semifinale2;
const tf0 = tiresia.scelte.finale;
// Ogni partecipante indica 1° e 2° per ciascun gruppo
const pronostici = [
  {
    nome: "Lombo",
    img: "https://c7.alamy.com/compit/gbwtye/tennis-wimbledon-championships-mens-singles-final-bjorn-borg-v-john-mcenroe-bjorn-borg-in-azione-gbwtye.jpg",
    scelte: {
      gruppoConnors: { primo: "Carlos Alcaraz", secondo: "Taylor Fritz" },
      gruppoBorg: { primo: "Jannik Sinner", secondo: "Felix Auger-Aliassime" },
      semifinale1: "Jannik Sinner",
      semifinale2: "Carlos Alcaraz",
      finale: "Jannik Sinner",
    },
  },
  {
    nome: "Pam",
    img: "https://static2.amica.it/wp-content/uploads/2023/07/8456559_large.jpg?v=1278015_1688727790",
    scelte: {
      gruppoConnors: { primo: "Carlos Alcaraz", secondo: "Alex de Minaur" },
      gruppoBorg: { primo: "Jannik Sinner", secondo: "Felix Auger-Aliassime" },
      semifinale1: "Jannik Sinner",
      semifinale2: "Carlos Alcaraz",
      finale: "Jannik Sinner",
    },
  },
  {
    nome: "Martina",
    img: "../img/Marti.jpg",
    scelte: {
      gruppoConnors: { primo: "Carlos Alcaraz", secondo: "Lorenzo Musetti" },
      gruppoBorg: { primo: "Jannik Sinner", secondo: "Alexander Zverev" },
      semifinale1: "Jannik Sinner",
      semifinale2: "Carlos Alcaraz",
      finale: "Jannik Sinner",
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
      semifinale1: "Jannik Sinner",
      semifinale2: "Carlos Alcaraz",
      finale: "Jannik Sinner",
    },
  },
  {
    nome: "Piero",
    img: "../img/Filini.png",
    scelte: {
      gruppoConnors: { primo: "Lorenzo Musetti", secondo: "Taylor Fritz" },
      gruppoBorg: {
        primo: "Felix Auger-Aliassime",
        secondo: "Ben Shelton",
      },

      semifinale1: "Alex de Minaur",
      semifinale2: "Felix Auger-Aliassime",
      finale: "Felix Auger-Aliassime",
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
      semifinale1: "Jannik Sinner",
      semifinale2: "Carlos Alcaraz",
      finale: "Jannik Sinner",
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
      semifinale1: "Jannik Sinner",
      semifinale2: "Carlos Alcaraz",
      finale: "Jannik Sinner",
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
      semifinale1: "Jannik Sinner",
      semifinale2: "Felix Auger-Aliassime",
      finale: "Jannik Sinner",
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
      semifinale1: "Jannik Sinner",
      semifinale2: "Carlos Alcaraz",
      finale: "Carlos Alcaraz",
    },
  },
  {
    nome: "Cuzzo",
    img: "../img/macroe.png",
    scelte: {
      gruppoConnors: { primo: "Carlos Alcaraz", secondo: "Ben Shelton" },
      gruppoBorg: {
        primo: "Jannik Sinner",
        secondo: "Lorenzo Musetti",
      },
      semifinale1: "Jannik Sinner",
      semifinale2: "Carlos Alcaraz",
      finale: "Jannik Sinner",
    },
  },
];

//pronostici.push(tiresia);
// === COSTRUZIONE PAGINA ===

// Seleziona gli elementi del menu e associa eventi click
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu a");
const titleElement = document.querySelector("h1"); // Seleziona l'h1
let dataSource = 0;
menuLinks.forEach((link) => {
  if (link.getAttribute("href") === "/") {
    return; // Salta il link "Home"
  }
  if (link.getAttribute("href") === "../../index.html") {
    return; // Salta questo link e passa al prossimo
  }
  link.addEventListener("click", async (event) => {
    event.preventDefault(); // Evita il comportamento predefinito del link
    dataSource = event.target.dataset.source;
    titleElement.textContent = link.textContent + " ATP FINALS 2025";
    if (dataSource < 2) {
      creaPag(dataSource);
      classeGiocatore();
    } else {
      creaPagFaseFinale(dataSource);
      classeGiocatoreFaseFinale();
    }
  });
});

// Toggle del menu
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("open");
});

// Simula il clic sull'ultima opzione del menu al caricamento della pagina
window.addEventListener("DOMContentLoaded", () => {
  const lastMenuLink = menuLinks[menuLinks.length - 1]; // Seleziona l'ultima opzione del menu
  if (lastMenuLink) {
    lastMenuLink.click(); // Simula il clic sull'ultima opzione
  }
});

//creaPag(dataSource);

function creaPag(dataSource) {
  const container = document.getElementById("container");
  container.replaceChildren();
  pronostici.forEach((p) => {
    // Recupera giocatori scelti
    const c1 = p.scelte.gruppoConnors.primo;
    const c2 = p.scelte.gruppoConnors.secondo;
    const b1 = p.scelte.gruppoBorg.primo;
    const b2 = p.scelte.gruppoBorg.secondo;

    let totale = 0;
    let puntiC1 = 0;
    let puntiC2 = 0;
    let puntiB1 = 0;
    let puntiB2 = 0;
    if (dataSource == 0) {
      puntiC1 = c1 ? punteggi[c1].punti1 : 0;
      puntiC2 = c2 ? punteggi[c2].punti2 : 0;
      puntiB1 = b1 ? punteggi[b1].punti1 : 0;
      puntiB2 = b2 ? punteggi[b2].punti2 : 0;
      totale = puntiC1 + puntiC2 + puntiB1 + puntiB2;
    } else {
      puntiC1 = (c1 ? punteggi[c1].punti1 : 0) * (tc1 ? tc1 === c1 : 1);
      puntiC2 = (c2 ? punteggi[c2].punti2 : 0) * (tc2 ? tc2 === c2 : 1);
      puntiB1 = (b1 ? punteggi[b1].punti1 : 0) * (tb1 ? tb1 === b1 : 1);
      puntiB2 = (b2 ? punteggi[b2].punti2 : 0) * (tb2 ? tb2 === b2 : 1);
      totale = puntiC1 + puntiC2 + puntiB1 + puntiB2;
    }

    // Crea la card HTML
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    <img src="${p.img}" alt="${p.nome}">
    <div class="nome">${p.nome}</div>
    <div class="totale">Totale: ${totale} punti</div>

    <div class="gruppo">
      <h3>Gruppo Jimmy Connors</h3>
      <div id = "${c1}" class="giocatore${puntiC1 ? "" : " eliminato"}">
        <h4>1° ${c1}</h4>
        <small>Classifica: ${
          c1 ? punteggi[c1].classifica : "--"
        } | ${puntiC1} punti</small>
      </div>
      <div id = "${c2}"class="giocatore${puntiC2 ? "" : " eliminato"}">
        <h4>2° ${c2}</h4>
        <small>Classifica: ${
          c2 ? punteggi[c2].classifica : "--"
        } | ${puntiC2} punti</small>
      </div>
    </div>

    <div class="gruppo">
      <h3>Gruppo Bjorn Borg</h3>
      <div id = "${b1}" class="giocatore${puntiB1 ? "" : " eliminato"}">
        <h4>1° ${b1}</h4>
        <small>Classifica: ${
          b1 ? punteggi[b1].classifica : "--"
        } | ${puntiB1} punti</small>
      </div>
      <div id = "${b2}" class="giocatore${puntiB2 ? "" : " eliminato"}${
      tb2 == null ? " incognito" : ""
    }">
        <h4>2° ${b2}</h4>
        <small>Classifica: ${
          b2 && dataSource != 0 ? punteggi[b2].classifica : "--"
        } | ${puntiB2} punti</small>
      </div>
    </div>
  `;
    container.appendChild(card);
  });
}

function classeGiocatore() {
  if (dataSource == 0) return;
  const giocatori = document.querySelectorAll(".giocatore");
  giocatori.forEach((giocatore) => {
    if (giocatore.id == tc1 && tc1 == null) {
      giocatore.classList.remove("eliminato");
      giocatore.classList.add("incognito");
    }
    if (giocatore.id == tc2 && tc2 == null) {
      giocatore.classList.add("incognito");
    }
    if (giocatore.id == tb1 && tb1 == null) {
      giocatore.classList.add("incognito");
    }

    if (giocatore.id == tb2 && tb2 == null) {
      giocatore.classList.remove("eliminato");
      giocatore.classList.add("incognito");
    }
  });
}

function creaPagFaseFinale(dataSource) {
  const container = document.getElementById("container");
  container.replaceChildren();
  pronostici.forEach((p) => {
    // Recupera giocatori scelti
    const s1 = p.scelte.semifinale1;
    const s2 = p.scelte.semifinale2;
    const f0 = p.scelte.finale;

    let totale = 0;
    let puntiS1 = 0;
    let puntiS2 = 0;
    let puntiF0 = 0;

    if (dataSource == 2) {
      puntiS1 = s1 ? punteggi[s1].puntiSemifinale : 0;
      puntiS2 = s2 ? punteggi[s2].puntiSemifinale : 0;
      puntiF0 = f0 ? punteggi[f0].puntiSemifinale * 2 : 0;
    } else {
      puntiS1 =
        (s1 ? punteggi[s1].puntiSemifinale : 0) * (ts1 ? ts1 === s1 : 1);
      puntiS2 =
        (s2 ? punteggi[s2].puntiSemifinale : 0) * (ts2 ? ts2 === s2 : 1);
      puntiF0 = (tf0 ? punteggi[f0].puntiSemifinale * 2 : 0) * (tf0 === f0);
      f0 == ts1 || f0 == ts2 ? 1 == 1 : (puntiF0 = 0);
    }

    totale = puntiS1 + puntiS2 + puntiF0;
    // Crea la card HTML
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    <img src="${p.img}" alt="${p.nome}">
    <div class="nome">${p.nome}</div>
    <div class="totale">Totale: ${totale} punti</div>

    <div class="gruppo">
      <h3>Finale</h3>
      <div id = "${f0}" class="giocatore${puntiF0 ? "" : " eliminato"}">
        <h4>1° ${f0}</h4>
        <small>Classifica: ${
          f0 ? punteggi[f0].classifica : "--"
        } | ${puntiF0} punti</small>
      </div>
    </div>

    <div class="gruppo">
      <h3>Semifinali</h3>

          <div id = "${s1}" class="giocatore${puntiS1 ? "" : " eliminato"}${
      ts1 == null ? " incognito" : ""
    }">
            <h4>1° ${s1}</h4>
            <small>Classifica: ${
              s1 ? punteggi[s1].classifica : "--"
            } | ${puntiS1} punti</small>
          </div>

          <div id = "${s2}" class="giocatore${puntiS2 ? "" : " eliminato"}${
      ts2 == null ? " incognito" : ""
    }">
            <h4>2° ${s2}</h4>
            <small>Classifica: ${
              s2 ? punteggi[s2].classifica : "--"
            } | ${puntiS2} punti</small>
          </div>
    </div>
  `;
    container.appendChild(card);
  });
}
function classeGiocatoreFaseFinale() {}
