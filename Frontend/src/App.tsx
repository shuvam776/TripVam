import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Layout/Navbar";

import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import Voice from "@/pages/Voice";
import Community from "@/pages/Community";
import Profile from "@/pages/Profile";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
    <div className="w-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/voice" element={<Voice />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}
