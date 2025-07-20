# FleetLink Frontend 🚚

Frontend for the **FleetLink** logistics vehicle booking system.  
Built with **React**, **TypeScript**, **Vite**, and **TailwindCSS**.

---

## ⚙️ Tech Stack

- [Vite](https://vitejs.dev/) – Fast dev server & build tool
- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS
- [Axios](https://axios-http.com/) – For API calls
- [React DatePicker](https://www.npmjs.com/package/react-datepicker)
- [React Router](https://reactrouter.com/) – Routing

---

## 🚀 Getting Started

### 1. **Clone the repo**
```bash
git clone https://github.com/your-username/fleetlink-frontend.git
cd fleetlink-frontend
````

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Start the development server**

```bash
npm run dev
```

### 4. Open in browser

Go to `http://localhost:5173`

> Ensure the **FleetLink backend** is running at `http://localhost:5000`

---

## 🧩 Project Structure

```
src/
├── api/                # Axios instance
├── pages/              # AddVehicle, SearchAndBook
├── components/         # Reusable components (optional)
├── App.tsx             # App with routing
└── main.tsx            # Vite entry point
```

---

## ✅ Pages

### `/` — Add Vehicle

* Inputs: Name, Capacity (kg), Tyres
* Sends `POST /api/vehicles`

### `/search` — Search & Book

* Inputs: Capacity, From/To Pincode, Start Time
* Calls `GET /api/vehicles/available`
* Shows available vehicles & booking duration
* Books via `POST /api/bookings`

---

## 📦 Build for Production

```bash
npm run build
```


