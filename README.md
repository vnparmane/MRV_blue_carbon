# MRV Blue Carbon

An automated **Monitoring, Reporting, and Verification (MRV)** platform for blue carbon ecosystems. Combines satellite imagery (Google Earth Engine), blockchain attestation, and IPFS-based storage to create a transparent, immutable carbon-credit pipeline.

## Architecture

```
┌──────────────┐     ┌──────────────────────────────────────┐
│   Frontend   │     │              Backend (FastAPI)        │
│  (Vite/React)│────▶│                                      │
│              │     │  ┌────────┐  ┌───────────┐           │
│  Map Viewer  │     │  │ Earth  │  │Blockchain │           │
│  Dashboard   │     │  │ Engine │  │ (Polygon) │           │
│  Reports     │     │  │ GEE    │  │           │           │
│              │     │  └────────┘  └─────┬─────┘           │
│              │     │                    │                  │
│              │     │  ┌─────────────────▼──────┐           │
│              │     │  │       IPFS (Pinata)    │           │
│              │     │  └────────────────────────┘           │
└──────────────┘     └──────────────────────────────────────┘
```

- **Backend**: Python FastAPI with SQLite, Google Earth Engine integration, Polygon blockchain attestation, and Pinata IPFS pinning service.
- **Frontend**: React + TypeScript + Vite, Tailwind CSS, map-based dashboard.

## Prerequisites

- Python 3.10+
- Node.js 18+
- A Google Earth Engine project (signed up via [earthengine.google.com](https://earthengine.google.com))
- A Pinata JWT token ([pinata.cloud](https://pinata.cloud))
- A Polygon RPC URL (e.g., from Alchemy or Infura)
- A wallet private key for the blockchain contract

## Getting Started

### 1. Clone & install backend

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate     # Windows
source venv/bin/activate    # Linux/Mac
pip install -r requirements.txt
```

### 2. Configure backend env

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

| Variable | Description |
|---|---|
| `Blockchain_RPC_URL` | Polygon RPC endpoint (e.g., Alchemy) |
| `Contract_Address` | Deployed smart-contract address |
| `BLOCKCHAIN_PRIVATE_KEY` | Wallet private key (hex, with `0x` prefix) |
| `PROJECT_ID` | Google Earth Engine project ID |
| `PINATA_JWT` | Pinata API JWT |
| `DATABASE_URL` | SQLite path (default: `sqlite:///./data/data.db`) |

### 3. Start the backend

```bash
uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`.

### 4. Install & run the frontend

```bash
cd frontend
npm install
```

```bash
cp .env.example .env   # defaults to http://localhost:8000
```

```bash
npm run dev
```

The app opens at `http://localhost:5173`.

## Project Structure

```
mrv_self/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app entrypoint
│   │   ├── core/config.py       # Pydantic Settings (env-driven)
│   │   ├── db/                  # DB engine, session, init
│   │   ├── models/              # SQLAlchemy ORM models
│   │   ├── schemas/             # Pydantic request/response DTOs
│   │   ├── crud/                # CRUD operations
│   │   ├── services/            # Business logic (GEE, blockchain, IPFS, geo)
│   │   ├── api/v1/endpoints/    # Route handlers
│   │   └── utils/               # Helper functions
│   ├── alembic/                 # DB migrations
│   ├── data/                    # SQLite database (gitignored)
│   ├── tests/
│   ├── .env.example
│   └── requirements.txt
├── frontend/
│   ├── src/                     # React app source
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env.example
├── README.md
└── LICENSE
```

## License

[MIT](LICENSE) — © 2026 V. Parmane
