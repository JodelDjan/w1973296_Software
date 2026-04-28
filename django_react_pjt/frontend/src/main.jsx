//import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Dashboard from "./pages/Dashboard"
import PublicProfile from "./pages/PublicProfile"
import EditProfile from "./pages/EditProfile"
import ApplicationsDashboard from "./pages/ApplicationsDashboard"
import Bookmarks      from "./pages/Bookmarks"
import Notifications  from "./pages/Notifications"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:userId" element={<PublicProfile />} />
        <Route path="/profile"         element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<ApplicationsDashboard />} />
        <Route path="/bookmarks"     element={<Bookmarks />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)