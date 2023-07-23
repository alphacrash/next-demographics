"use client";

/* Core */
import { useEffect, useState } from "react";

/* Instruments */
import { useSelector, useDispatch, selectCount } from "@/lib/redux";
import axios from "axios";
import ConsumerCards from "./ConsumerCards";
import { Container, Grid, Typography } from "@mui/material";

export const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);
  const [incrementAmount, setIncrementAmount] = useState(2);
  const [consumers, setConsumers] = useState([]);

  const fetchConsumers = async () => {
    const { data } = await axios.get("http://localhost:8080/api/v1/consumers");
    setConsumers(data);
  };

  useEffect(() => {
    fetchConsumers();
  }, []);

  return (
    <Container>
      <Grid container spacing={4} >
        <Grid item xs={12}>
          <Typography variant="h4" >Consumers</Typography>
        </Grid>
        <Grid item xs={12}>
          <ConsumerCards consumers={consumers} />
        </Grid>
      </Grid>
    </Container>
  );
};
