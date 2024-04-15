import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Nav from "../../components/Nav";
import BottomNav from "../../components/BottomNav";
import PlanCard from "../../components/PlanCard";
import useCustomSnackbar from "../../components/useCustomSnackbar";

export default function PlanComplete() {
  /**
   *move completed plans here
   */
  const snackbar = useCustomSnackbar();

  let plansData = JSON.parse(localStorage.getItem("plans"));
  if (!plansData) {
    plansData = [];
  }
  const [plans, setPlans] = useState(plansData);

  return (
    <div className="backgroundMain">
      <Nav />
      <Container sx={{ minHeight: "100vh" }}>
        <Typography variant="h3" sx={{ color: "white", marginBottom: "20px" }}>
          Completed Plans
        </Typography>
        {plans.length > 0 ? (
          <Grid container spacing={2}>
            {plans
              .filter((p) => {
                if (p.is_completed === false) {
                  return false;
                }
                return true;
              })
              .map((plan) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={plan.id}>
                    <PlanCard
                      plan={plan}
                      type="list"
                      deleteHandler={() => {
                        const updatePlan = plans.filter(
                          (p) => p.id !== plan.id
                        );
                        setPlans(updatePlan);
                        localStorage.setItem(
                          "plans",
                          JSON.stringify(updatePlan)
                        );
                        snackbar.showSuccess(
                          "Plan has been deleted successfully."
                        );
                      }}
                    />
                  </Grid>
                );
              })}
          </Grid>
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h6">No Completed Plans yet.</Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        )}
      </Container>
      <BottomNav />
    </div>
  );
}
