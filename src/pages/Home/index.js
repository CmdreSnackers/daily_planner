import { Link } from "react-router-dom";
import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Nav from "../../components/Nav";
import BottomNav from "../../components/BottomNav";
import PlanCard from "../../components/PlanCard";
import useCustomSnackbar from "../../components/useCustomSnackbar";

export default function Home() {
  const snackbar = useCustomSnackbar();

  // INSTRUCTION: 1. load the plans data from local storage
  let plansData = JSON.parse(localStorage.getItem("plans"));
  if (!plansData) {
    plansData = [];
  }
  const [plans, setPlans] = useState(plansData);
  // filter by date
  //* valueof is epoch timestamp (time in seconds)
  const todayDate = new Date().toISOString().split("T")[0];
  const currentTimestamp = new Date(todayDate).valueOf();
  const nextDayTimestamp = currentTimestamp + 1 * 24 * 3600 * 1000;
  // upcoming plans should be within a day
  const todaysPlan = plansData.filter((p) => {
    // convert start date to timestamp
    const startDateInTimestamp = new Date(p.start_date).valueOf();
    // filter the date that is within 1 day
    if (
      startDateInTimestamp >= currentTimestamp &&
      startDateInTimestamp < nextDayTimestamp
    ) {
      return true;
    }
    return false;
  });

  // let day = todayDay.getDate();
  // let showDay = todayDay.toISOString();

  return (
    <div className="backgroundMain">
      <Nav />

      <Container sx={{ minHeight: "30vh", marginBottom: "80px" }}>
        <Typography variant="h3" sx={{ color: "white", marginBottom: "20px" }}>
          Today's Plan
        </Typography>
        {todaysPlan.length > 0 ? (
          <Grid container spacing={2}>
            {todaysPlan
              .filter((p) => {
                if (p.is_completed === true) {
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
              <Typography variant="h6">No plans added yet.</Typography>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                variant="outlined"
                to="/new"
                sx={{ color: "black", border: "1px solid black" }}
              >
                Add A Plan
              </Button>
            </CardActions>
          </Card>
        )}
      </Container>

      <Container sx={{ minHeight: "30vh", marginBottom: "80px" }}>
        <Typography variant="h3" sx={{ color: "white", marginBottom: "20px" }}>
          All Plan's
        </Typography>
        {plans.length > 0 ? (
          <Grid container spacing={2}>
            {plans
              .filter((p) => {
                const startDateInTimestamp = new Date(p.start_date).valueOf();
                if (
                  startDateInTimestamp >= currentTimestamp &&
                  startDateInTimestamp < nextDayTimestamp
                ) {
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
              <Typography variant="h6">
                No plans for tomorrow added yet.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to="/new"
                sx={{ color: "black", border: "1px solid black" }}
              >
                Add A Plan
              </Button>
            </CardActions>
          </Card>
        )}
      </Container>
      <Container sx={{ minHeight: "30vh", marginBottom: "100px" }}>
        <Typography variant="h3" sx={{ color: "white", marginBottom: "20px" }}>
          Uncompleted Plan's
        </Typography>
        {plans.length > 0 ? (
          <Grid container spacing={2}>
            {plans
              .filter((p) => {
                if (p.is_completed === true) {
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
              <Typography variant="h6">No previous plans yet.</Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        )}
      </Container>
      <BottomNav />
    </div>
  );
}
