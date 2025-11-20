import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LoginPage from "./menus/loginPage.tsx";
import SignupPage from "./menus/signupPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
