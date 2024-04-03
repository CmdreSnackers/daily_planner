import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Header from "../../components/Nav";
import { useNavigate, useParams } from "react-router-dom";

import BottomNav from "../../components/BottomNav";


export default function PlanEdit() {
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
  const [endDate, setEndDate] = useState(plan ? plan.end_date : todayDate);
  const [startTime, setStartTime] = useState(plan ? plan.start_time : 0);
  const [endTime, setEndTime] = useState(plan ? plan.end_time : 0);
  const [description, setDescription] = useState(plan ? plan.description : "");
  const handleFormSubmit = () => {

    let error = "";

    if (
      description === "" ||
      startDate === "" ||
      endDate === "" ||
      startTime === "" ||
      endTime === ""
    ) {
      error = "Please fill up all the details";
    }
    if (startDate > endDate) {
      error = "Your end date must be after the start date";
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
            end_date: endDate,
            start_time: startTime,
            end_time: endTime,
            description,
          };
        }
        return p;
      });


      localStorage.setItem("plans", JSON.stringify(updatedPlans));

      navigate("/");
    }
  };
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ color: "#3f51b5" }}>
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
              <Grid item xs={6}>
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
                  color="primary"
                  type="date"
                  label="End Date"
                  variant="outlined"
                  fullWidth
                  value={endDate}
                  onChange={(event) => {
                    setEndDate(event.target.value);
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
            <Button variant="contained" fullWidth onClick={handleFormSubmit}>
              Update Plan
            </Button>
          </CardActions>
        </Card>
      </Container>
      <BottomNav />
    </>
  );
}
