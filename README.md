# 🧪 Virtual Chem Lab: 3D Chemistry Simulation

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

An immersive, full-stack 3D chemistry laboratory simulation. Perform complex chemical reactions in a virtual environment, track results in real-time, and generate automated lab reports.

---

## 📸 Preview

![Hero Interface Placeholder](https://via.placeholder.com/1200x600.png?text=Virtual+Chem+Lab+3D+Interface+Screenshot)
*Perform experiments with drag-and-drop chemicals and interactive 3D apparatus.*

---

## ✨ Key Features

### 🧊 Immersive 3D Simulation
- **Dynamic Apparatus**: Interchangeable 3D models for Beakers, Flasks, and Test Tubes built with `Three.js` and `@react-three/fiber`.
- **Realistic Liquids**: Shader-based liquid simulation that responds to volume changes and chemical reactions.
- **Reaction Effects**: Visual feedback for precipitates (white/colored solids) and gas evolution (bubbles).

### ⚗️ Advanced Reaction Engine
- **Intelligent Classification**: Automatically detects reaction types (Acid-Base, Precipitation, Redox, etc.).
- **Thermodynamic Tracking**: Real-time temperature monitoring as chemicals interact (Exothermic/Endothermic).
- **Equation Generation**: Dynamically formats chemical equations for the performed actions.

### 📋 Full-Stack Experiment Management
- **Interactive Control**: Drag-and-drop interface for adding solvents and solutes.
- **Session Persistence**: Stores every experiment step in a MongoDB database.
- **PDF Reporting**: Instant lab report generation using `PDFKit`, capturing all steps, observations, and equations.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Interactions**: React DnD (Drag & Drop)
- **Styling**: Tailwind CSS

### Backend
- **Server**: Node.js & Express
- **Database**: MongoDB (Mongoose)
- **Document Generation**: PDFKit
- **Integration**: REST API with Axios

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/virtual-chem-lab.git
   cd virtual-chem-lab
   ```

2. **Backend Setup**
   ```bash
   cd chem-lab-backend
   npm install
   # Create a .env file with:
   # PORT=10000
   # MONGO_URI=your_mongodb_connection_string
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../virtual-chem-lab
   npm install
   # Create a .env file with:
   # VITE_API_URL=http://localhost:10000/api/experiments
   npm run dev
   ```

---

## 📂 Project Structure

```text
Perfect/
├── virtual-chem-lab/       # React Frontend
│   ├── src/
│   │   ├── components/     # 3D Objects & Scene
│   │   ├── store/          # Zustand State (Lab logic)
│   │   ├── data/           # Reaction rules & Chemical logic
│   │   └── ui/             # Sidebar & Controls
├── chem-lab-backend/       # Express API
│   ├── models/             # MongoDB Schema (Experiments)
│   ├── routes/             # Experiment & Report logic
│   └── server.js           # API Entry point
```

---

## 🗺 Roadmap
- [ ] Multi-chemical simultaneous reactions.
- [ ] VR/AR support for Meta Quest.
- [ ] Expanded chemical database (100+ compounds).
- [ ] Student vs. Teacher portal roles.

---



## 🤝 Contact
Your Name - Vedant Amrutkar - Contact [https://www.vedantamrutkar.site/]

Project Link: (https://v-one-kohl.vercel.app/)
