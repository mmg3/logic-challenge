"use client";

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Products from './pages/products/page';
import Reports from './pages/reports/page';
import Movements from './pages/movements/page';
export default function Home() {
  const [activePage, setActivePage] = useState("Productos");

  const renderContent = () => {
    switch (activePage) {
      case "📦 Productos":;
        return <Products />;
      case "🔄 Movimientos":
        return <Movements />;
      case "📊 Reportes":
        return <Reports />;
      default:
        return <Products />;
    }
  };

  return (
    <div className="d-flex">
      <nav className="d-flex flex-column bg-dark text-white p-3" style={{ width: "250px" }}>
        <h4 className="text-center">Menú</h4>
        <ul className="nav flex-column">
          {["📦 Productos", "🔄 Movimientos", "📊 Reportes"].map((item) => (
            <li className="nav-item" key={item}>
              <button
                className={`nav-link text-white ${activePage === item ? "active bg-primary" : ""}`}
                onClick={() => setActivePage(item)}
                style={{ border: "none", background: "none", cursor: "pointer" }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="flex-grow-1 bg-secondary text-white p-4">{renderContent()}</main>
    </div>
  );
}
