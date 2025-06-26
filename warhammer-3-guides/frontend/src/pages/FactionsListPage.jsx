import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid, Box, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import FactionCard from "../components/FactionCard";

function FactionsListPage() {
  const [factions, setFactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/factions")
      .then((res) => setFactions(res.data));
  }, []);

  const filtered = factions.filter(
    (f) =>
      f.faction.toLowerCase().includes(search.toLowerCase()) ||
      f.lord.toLowerCase().includes(search.toLowerCase()) ||
      f.race.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Warhammer 3 Faction Guides
      </Typography>
      <TextField
        fullWidth
        placeholder="Search for a faction, lord, or race..."
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Box sx={{ maxHeight: "65vh", overflowY: "auto", pr: 1, mb: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          {filtered.map((f) => (
            <Grid item key={f.id}>
              <Link to={`/factions/${f.id}`} style={{ textDecoration: "none" }}>
                <FactionCard faction={f} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default FactionsListPage;
