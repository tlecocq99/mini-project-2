import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Box, Typography } from "@mui/material";

export default function HomePage() {
  const navigate = useNavigate();

  // Get a random faction and navigate to its detail page
  const handleRandomFaction = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/factions");
      const factions = res.data;
      const randomFaction =
        factions[Math.floor(Math.random() * factions.length)];
      navigate(`/factions/${randomFaction.id}`);
    } catch (err) {
      alert("Failed to fetch factions!");
    }
  };

  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" gutterBottom>
        Warhammer 3 Guides
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Your one-stop-shop for detailed faction guides.
      </Typography>
      <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
        <Button variant="contained" size="large" onClick={handleRandomFaction}>
          Feeling frisky? (Random Faction)
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/factions")}
        >
          View all factions
        </Button>
      </Box>
      <Button variant="text" onClick={() => navigate("/feedback")}>
        Give us Feedback!
      </Button>
    </Box>
  );
}
