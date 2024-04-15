import { useParams } from "react-router-dom";

import Details from "./details";
import { Container } from "@mui/material";
import Nav from "../../components/Nav";
import BottomNav from "../../components/BottomNav";
export default function PlanView() {
  const { id } = useParams();

  const plans = JSON.parse(localStorage.getItem("plans"));

  const plan = plans.find((p) => p.id === id);

  return (
    <div className="backgroundMain">
      <Nav />
      <Container
        maxWidth="sm"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Details plan={plan} />
      </Container>
      <BottomNav />
    </div>
  );
}
