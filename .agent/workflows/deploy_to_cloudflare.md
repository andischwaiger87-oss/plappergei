---
description: Anleitung zum Deployment von Plappergei auf Cloudflare Pages
---

# Deployment auf Cloudflare Pages

Folge diesen Schritten, um die App kostenlos und performant online zu stellen.

1.  **Cloudflare Dashboard öffnen**
    *   Gehe auf [dash.cloudflare.com](https://dash.cloudflare.com) und logge dich ein (oder erstelle einen Account).

2.  **Neues Projekt erstellen**
    *   Wähle im Menü links **"Workers & Pages"**.
    *   Klicke auf den Button **"Create"** (oder "Create application").
    *   Wähle den Tab **"Pages"**.
    *   Klicke auf **"Connect to Git"**.

3.  **GitHub verbinden**
    *   Wähle deinen GitHub-Account (`andischwaiger87-oss`).
    *   Suche und wähle das Repository **`plappergei`** aus.
    *   Klicke auf **"Begin setup"**.

4.  **Build-Einstellungen konfigurieren**
    *   **Project name**: `plappergei` (sollte automatisch da sein).
    *   **Production branch**: `main` (Standard).
    *   **Framework preset**: Wähle **`Vite`** oder **`React`** aus der Liste (Cloudflare erkennt es meistens, oder wähle "None" und fülle es manuell aus).
    *   **Build command**: `npm run build`
    *   **Build output directory**: `dist`
    *   **Root directory**: (Leer lassen, da wir im Hauptverzeichnis sind)

5.  **Deployment starten**
    *   Klicke auf **"Save and Deploy"**.
    *   Cloudflare lädt nun den Code, installiert NPM-Pakete und baut die App. Das dauert ca. 1-2 Minuten.

6.  **Fertig!**
    *   Du erhältst eine URL (z.B. `https://plappergei.pages.dev`).
    *   Die App ist nun weltweit erreichbar (auch offline als PWA).
