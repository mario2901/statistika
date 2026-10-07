// ===============================================
//  PODACI — ovdje dodaješ nove termine
//  Svaki termin: datum (GGGG-MM-DD) + broj pobjeda po igraču
// ===============================================
window.TENIS_DATA = {
  players: [
    "Mario Ljušanin",
    "Tin Kovačević",
    "Luka Petrović",
    "Luka Spajić"
  ],
  sessions: [
    {
      date: "2026-10-05",
      wins: {
        "Mario Ljušanin": 8,
        "Tin Kovačević": 1,
        "Luka Petrović": 0,
        "Luka Spajić": 1
      }
    }
    // Novi termin dodaj ovako:
    // ,{
    //   date: "2026-10-12",
    //   wins: { "Mario Ljušanin": 3, "Tin Kovačević": 2, "Luka Petrović": 1, "Luka Spajić": 2 }
    // }
  ]
};
