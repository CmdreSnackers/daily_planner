import "./styles.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PlanAddNew from "./pages/PlanAddNew";
import PlanEdit from "./pages/PlanEdit";
import PlanView from "./pages/PlanView";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import CustomSnackbar from "./components/CustomSnackbar";
import PlanComplete from "./pages/PlanComplete";

export default function App() {
  return (
    <SnackbarProvider
      SnackbarComponent={CustomSnackbar}
      SnackbarProps={{ autoHideDuration: 4000 }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan/:id" element={<PlanView />} />
          <Route path="/plan/:id/edit" element={<PlanEdit />} />
          <Route path="/new" element={<PlanAddNew />} />
          <Route path="/complete" element={<PlanComplete />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}
