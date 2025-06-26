import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import FactionCard from "./components/FactionCard";

function App() {
  const [factions, setFactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/factions")
      .then((res) => setFactions(res.data))
      .catch(() => setFactions([]));
  }, []);

  // Filter factions based on search input
  useEffect(() => {
    setFiltered(
      factions.filter(
        (f) =>
          f.lord.toLowerCase().includes(search.toLowerCase()) ||
          f.faction.toLowerCase().includes(search.toLowerCase()) ||
          f.race.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, factions]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "95vh", // Fill viewport height //
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // or "center" if you want vertical centering
        backgroundImage:
          "url('https://cdnb.artstation.com/p/assets/images/images/035/751/931/large/creative-assembly-twwh3-keyart-with-logo.jpg?1615816161')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        // mt: 4, // Remove or adjust as needed
      }}
    >
      <Typography variant="h3" gutterBottom align="center">
        All Warhammer 3 Factions
      </Typography>
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Box display="flex" gap={2} alignItems="center">
          <TextField
            label="Search for your faction..."
            variant="outlined"
            size="small"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="contained" color="primary">
            Filter
          </Button>
        </Box>
      </Paper>
      <Box
        sx={{
          maxHeight: "65vh",
          overflowY: "auto",
          pr: 1,
          mb: 4,
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {filtered.map((f) => (
            <Grid item key={f.id}>
              <FactionCard faction={f} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
