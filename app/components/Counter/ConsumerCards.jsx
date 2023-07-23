import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const ConsumerCards = ({ consumers }) => {
  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [addresses, setAddresses] = useState([]);

  const handleViewAddresses = async (consumer) => {
    setSelectedConsumer(consumer);
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/consumers/${consumer.id}/addresses`
    );
    setAddresses(data);
  };

  const handleCloseAddresses = () => {
    setSelectedConsumer(null);
    setAddresses([]);
  };

  return (
    <Grid container spacing={2}>
      {consumers.map((consumer) => (
        <Grid item xs={6} sm={4} md={3} key={consumer.id}>
          <Card sx={{ minWidth: 275, margin: "10px" }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                {consumer.firstName} {consumer.lastName}
              </Typography>
              <Typography color="textSecondary">{consumer.email}</Typography>
              <Typography sx={{ marginBottom: 1 }} color="textSecondary">
                ID: {consumer.id}
              </Typography>
              <Button onClick={() => handleViewAddresses(consumer)}>
                View Addresses
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
      {selectedConsumer && (
        <Grid item xs={12}>
          <Card sx={{ minWidth: 275, margin: "10px" }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" component="h2">
                    Addresses for {selectedConsumer.firstName}{" "}
                    {selectedConsumer.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {addresses.map((address) => (
                      <Grid item key={address.id} xs={12}>
                        <Typography color="textSecondary">
                          {address.addressType} Address:
                        </Typography>
                        <Typography>
                          {address.street}, {address.city}, {address.state}{" "}
                          {address.zipCode}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={handleCloseAddresses}>Close</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default ConsumerCards;
