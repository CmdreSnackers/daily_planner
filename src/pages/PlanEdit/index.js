import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import useCustomSnackbar from "../../components/useCustomSnackbar";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Header from "../../components/Nav";
import { useNavigate, useParams } from "react-router-dom";

import BottomNav from "../../components/BottomNav";

export default function PlanEdit() {
  const snackbar = useCustomSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();
  const plans = JSON.parse(localStorage.getItem("plans"));
  // INSTRUCTION: based on the id params, find the selected trip data
  const plan = plans.find((t) => t.id === id);
  // short method to get today's date
  const todayDate = new Date().toISOString().split("T")[0];
  const [name, setName] = useState(plan ? plan.name : "");
  const [startDate, setStartDate] = useState(
    plan ? plan.start_date : todayDate
  );
  const [startTime, setStartTime] = useState(plan ? plan.start_time : 0);
  const [endTime, setEndTime] = useState(plan ? plan.end_time : 0);
  const [description, setDescription] = useState(plan ? plan.description : "");
  const handleFormSubmit = () => {
    let error = "";

    if (
      description === "" ||
      startDate === "" ||
      startTime === "" ||
      endTime === ""
    ) {
      snackbar.showMessage("Please fill up all the details");
    }

    if (error !== "") {
      alert(error);
    } else {
      const updatedPlans = plans.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            name: name,
            start_date: startDate,
            start_time: startTime,
            end_time: endTime,
            description,
          };
        }
        return p;
      });

      localStorage.setItem("plans", JSON.stringify(updatedPlans));

      navigate("/");

      snackbar.showSuccess("Plan has successfully been updated.");
    }
  };
  return (
    <div className="backgroundMain">
      <Header />
      <Container
        maxWidth="sm"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Typography variant="h4" sx={{ color: "white" }}>
          Update Plan
        </Typography>
        <Card
          sx={{
            marginTop: "20px",
            padding: "20px",
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="date"
                  label="Start Date"
                  variant="outlined"
                  fullWidth
                  value={startDate}
                  onChange={(event) => {
                    setStartDate(event.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  type="time"
                  label="Start Time"
                  variant="outlined"
                  fullWidth
                  value={startTime}
                  onChange={(event) => {
                    setStartTime(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="time"
                  label="End Time"
                  variant="outlined"
                  fullWidth
                  value={endTime}
                  onChange={(event) => {
                    setEndTime(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="description"
                  placeholder="Your description here..."
                  variant="outlined"
                  fullWidth
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions
            sx={{
              paddingLeft: "15px",
              paddingRight: "15px",
            }}
          >
            <Button
              variant="contained"
              fullWidth
              onClick={handleFormSubmit}
              color="inherit"
            >
              Update Plan
            </Button>
          </CardActions>
        </Card>
      </Container>
      <BottomNav />
    </div>
  );
}
