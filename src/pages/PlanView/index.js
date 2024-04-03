import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Details from "./details";
import { Container } from "@mui/material";
import Nav from "../../components/Nav";

export default function PlanView() {
  const { id } = useParams();

  const plans = JSON.parse(localStorage.getItem("plans"));

  const plan = plans.find((p) => p.id === id);

  return (
    <>
      <Nav />
      <Container maxWidth="sm">
        <Details plan={plan} />
      </Container>
    </>
  );
}
