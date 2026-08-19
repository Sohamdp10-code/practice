# MITA — Multimodal Industrial Machine Fault Diagnosis & Maintenance Platform

MITA is an intelligent, multimodal industrial IoT diagnostics and predictive maintenance assistant designed for manufacturing and plant operations.

## Features

- **Fleet Health Telemetry**: Real-time sensor monitoring (vibration, thermal gradient, RPM, acoustics).
- **Multimodal AI Diagnosis**: Combines vision spall recognition, acoustic spectrograms (FFT), ISO 10816 baseline telemetry, and technician notes.
- **Root Cause & RUL Estimation**: Explains fault mechanics with confidence intervals and remaining useful life predictions.
- **AI Maintenance Copilot**: Interactive assistant indexing plant SOPs, manuals, and real-time machine telemetry.
- **Interactive SVG Digital Twin**: Visual breakdown of motor and bearing subsystems with live component health badges.
- **Auditing & PDF Reports**: Generate and export maintenance compliance logs and diagnostic summaries.

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Modern Industrial Glassmorphism UI
- **Visuals & Charts**: Recharts & Custom SVG Digital Twin
- **Icons**: Lucide React
- **CI/CD**: GitHub Actions & GitHub Pages automated deployment

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Locally
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```
