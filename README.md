# 🎾 Padel Evolution

> **Piattaforma SaaS professionale per la gestione di circoli e tornei di padel**

![Version](https://img.shields.io/badge/version-2.0.0-lime)
![React](https://img.shields.io/badge/React-18.2-blue)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)
![License](https://img.shields.io/badge/license-MIT-yellow)

---

## ✨ Funzionalità

### 🏆 Gestione Tornei
- **9 formati**: Eliminazione Diretta, Gironi + Finale, Formula Rodeo, Americano, Gold/Silver/Bronze, Round Robin, Super Tie-Break, Doppio Tabellone, Campionato a Tappe
- Generazione coppie automatica (algoritmo bilanciato per livello e lato)
- Tabelloni live con inserimento risultati in tempo reale
- Classifica automatica con calcolo punti

### 📊 Ranking ELO
- Sistema di rating automatico basato sui risultati reali
- Aggiornamento ELO dopo ogni torneo
- Fasce: Elite (1800+), Avanzato (1500+), Intermedio (1200+), Principiante
- Trend per giocatore (▲/▼)

### 🏟️ Prenotazione Campi
- Calendario settimanale con fasce orarie configurabili (60/90/120 min)
- Tariffe orarie per campo
- Incasso giornaliero automatico
- Prenotazione diretta per giocatori

### 🤖 AI Engine (3 modalità)
- **AI Club Advisor** — Consigli su tornei, ranking ELO, regolamenti FIP
- **AI Marketing Copy** — Post Instagram, WhatsApp, newsletter
- **AI Sales & Lead** — Sponsor, abbonamenti, strategie revenue

### 📺 TV Schermo Live
- Proiezione tabellone su TV del circolo
- Aggiornamento automatico ogni 30 secondi
- Classifica live e ultimi risultati

### 🎨 Sponsor & White Label
- 4 pacchetti sponsor (Platinum/Gold/Silver/Bronze)
- Personalizzazione colori, logo, slogan
- Banner sponsor su tabelloni e app

### 🔐 Auth & Multi-circolo
- Login reale con Supabase Auth
- Multi-circolo con dati isolati (RLS)
- Ruoli: Super Admin / Admin Circolo / Giocatore
- Super Admin Panel con gestione piani SaaS

---

## 🚀 Quick Start

```bash
# Clona il repo
git clone https://github.com/monicarssi65-source/PadelEvolution.git
cd PadelEvolution

# Installa dipendenze
npm install

# Avvia in sviluppo
npm run dev

# Build produzione
npm run build
```

---

## ⚙️ Configurazione Supabase

1. Crea un progetto su [supabase.com](https://supabase.com)
2. Copia `Project URL` e `Anon Key`
3. In `src/App.jsx` aggiorna:

```js
const SUPA_URL = "https://tuo-progetto.supabase.co";
const SUPA_KEY = "tua-anon-key";
```

4. Esegui lo schema SQL dalla cartella `/supabase/schema.sql`

---

## 🗄️ Schema Database

```
circoli         → Anagrafica club
profiles        → Utenti con ruolo
giocatori       → Atleti del circolo
tornei          → Tornei con formato
iscrizioni      → Richieste iscrizione
coppie          → Coppie generate
partite         → Match con risultati
prenotazioni    → Prenotazioni campi
arbitri         → Referenti
notifiche       → Sistema notifiche
pagamenti       → Transazioni (Stripe)
abbonamenti     → Piani SaaS
```

---

## 📦 Stack Tecnologico

| Layer | Tecnologia |
|-------|-----------|
| Frontend | React 18 + Vite |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Payments | Stripe (in arrivo) |
| AI | Claude Sonnet API |
| Deploy | GitHub Pages / Vercel |
| Style | CSS custom (no framework) |

---

## 🗺️ Roadmap

- [x] Auth multi-circolo con Supabase
- [x] 9 formati torneo completi
- [x] Ranking ELO automatico
- [x] Prenotazione campi con tariffe
- [x] AI Engine (3 modalità)
- [x] TV Schermo Live
- [x] Sponsor & White Label
- [ ] Stripe pagamenti (in sviluppo)
- [ ] Email automatiche (SendGrid)
- [ ] PWA mobile nativa
- [ ] Tabellone pubblico condivisibile

---

## 📄 License

MIT © 2026 Padel Evolution
