# AI Creative Strategist

> **An AI system that replaces the creative agency for small businesses.**

Live demo → [ai-creative-strategist-omega.vercel.app](https://ai-creative-strategist-omega.vercel.app)

---

## What it does

Most AI tools take a brand name, generate a prompt, and spit out an image.

This is different.

AI Creative Strategist takes four inputs — brand name, description, target audience, and campaign goal — and returns a complete brand strategy package:

| Output | Description |
|---|---|
| **Brand Archetype** | Jungian archetype with confidence score |
| **Creative Narrative** | Campaign story and tagline |
| **Visual Direction** | Photography style, typography, color palette |
| **Image Generation Prompts** | Ready-to-use Midjourney, DALL·E, and Sora prompts |

Built for founders, creators, freelancers, marketers, and small businesses who need strategic creative direction — without the agency price tag.

---

## Architecture

The backend is a multi-agent pipeline where each agent handles one layer of the strategy:

```
Brand Input
    ↓
Brand Analysis Agent        ← understands brand identity
    ↓
Archetype Detection Agent   ← maps to Jungian brand archetypes
    ↓
Audience Profiling Agent    ← extracts motivations and pain points
    ↓
Narrative Strategy Agent    ← generates campaign story and tagline
    ↓
Visual Direction Agent      ← photography, typography, color palette
    ↓
Prompt Generation Agent     ← Midjourney / Sora / DALL·E prompts
    ↓
Review Agent                ← validates coherence across outputs
    ↓
Strategy Report
```

This is a **workflow**, not a chatbot. Each agent has a specific role and passes structured state to the next. This decomposition is why the outputs are coherent rather than generic.

---

## Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS + shadcn/ui
- Framer Motion
- html2canvas + jsPDF (PDF export)
- Lucide React + React Icons

**Backend**
- FastAPI
- Groq API (LLaMA 3.3 70B)
- Pydantic
- Python 3.10

**Deployment**
- Frontend → Vercel
- Backend → Hugging Face Spaces (Docker)

---

## Running Locally

**Prerequisites:** Node.js 18+, Python 3.10+, Groq API key

**Backend**
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

Create a `.env` file in the root:
```
GROQ_API_KEY=your_groq_api_key_here
```

```bash
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## Project Structure

```
ai-creative-strategist/
├── backend/
│   ├── main.py              # FastAPI app + agent pipeline
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── InputForm.jsx
│   │   │   └── Report.jsx
│   │   ├── pages/
│   │   │   ├── PurposePage.jsx
│   │   │   ├── TermsPage.jsx
│   │   │   └── ContactPage.jsx
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
└── .gitignore
```

---

## Features

- **Multi-agent pipeline** — strategy is decomposed into discrete agents, not a single prompt
- **Brand archetype grounding** — outputs mapped to Jungian archetype framework
- **Interactive web report** — six-section report with accordion prompts and color swatches
- **PDF export** — one-click download of the full strategy report
- **Multi-page UI** — Home, Our Purpose, Terms & Conditions, Contact Us
- **Contact form** — integrated with Formspree
- **Production deployed** — live on Vercel + Hugging Face Spaces

---

## Sample Output

Given this input:
```
Brand Name: Mountain Peak Coffee
Description: Premium small-batch coffee for remote workers who treat their mornings like a ritual
Audience: Remote professionals, 25–40, value quality and independence
Goal: Launch Instagram campaign to drive online store traffic
```

The system returns:
- Archetype: **Explorer** (89% confidence)
- Tagline: *"Fuel Your Next Summit"*
- Core Values: Freedom, Adventure, Discovery
- Color Palette: `#3A2416` `#C89F65` `#F6F0E8` `#4A6741`
- Photography: Natural Lighting, Mountain Landscapes, Warm Interiors

---

## Author

**Kshitisha Negi** — engineer, creative, curator.

[LinkedIn](https://www.linkedin.com/in/kshitisha3333/) · [GitHub](https://github.com/kshitisha) · [Pinterest](https://in.pinterest.com/ruuhhiii/)

---

*Where strategy meets aesthetics.*
