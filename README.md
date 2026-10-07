# 🎾 Tenis Liga – statistika

Statička stranica (HTML + CSS + JS), radi direktno na GitHub Pages.

## Dodavanje novog termina
Otvori `data.js` i u `sessions` dodaj novi objekt:

```js
,{
  date: "2026-10-12",
  wins: { "Mario Ljušanin": 3, "Tin Kovačević": 2, "Luka Petrović": 1, "Luka Spajić": 2 }
}
```
Sve ostalo (poredak, postoci, povijest) računa se automatski.

## Objava na GitHub Pages
1. Napravi novi repo (npr. `tenis-stats`) i pushaj ove datoteke.
2. Settings → Pages → Source: `Deploy from a branch` → `main` / `(root)` → Save.
3. Stranica je za minutu na `https://<username>.github.io/tenis-stats/`.
