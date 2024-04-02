
import "./styles.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PlanAddNew from "./pages/PlanAddNew";
import PlanEdit from "./pages/PlanEdit";
import PlanView from "./pages/PlanView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan/:id" element={<PlanView />} />
        <Route path="/plan/:id/edit" element={<PlanEdit />} />
        <Route path="/new" element={<PlanAddNew />} />
      </Routes>
    </BrowserRouter>
  );
}
