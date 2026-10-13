// ===============================================
//  PODACI — ovdje dodaješ nove termine
//  Svaki termin: datum (GGGG-MM-DD) + broj pobjeda po igraču
// ===============================================
window.TENIS_DATA = {
  players: [
    { name: "Šiljac", avatar: "./assets/siljac.jpg" },
    { name: "Borduš", avatar: "./assets/bordus.jpg" },
    { name: "Baza", avatar: "./assets/baza.jpg" },
    { name: "Prika", avatar: "./assets/prika.jpg" },
  ],
  sessions: [
    {
      date: "2026-10-05",
      wins: {
        Šiljac: 8,
        Borduš: 1,
        Baza: 0,
        Prika: 2,
      },
    },
    {
      date: "2026-10-07",
      wins: {
        Šiljac: 8,
        Borduš: 1,
        Baza: 0,
        Prika: 4,
      },
    },
    {
      date: "2026-10-12",
      wins: {
        Šiljac: 7,
        Borduš: 7,
        Baza: 0,
        Prika: 6,
      },
    },
  ],
};
