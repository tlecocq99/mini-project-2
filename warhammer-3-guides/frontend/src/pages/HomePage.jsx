import RandomFactionSlot from "../components/RandomFactionSlot";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Fade } from "@mui/material";

export default function HomePage() {
  const [factions, setFactions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/factions")
      .then((res) => setFactions(res.data));
  }, []);

  return (
    <Fade in={true} timeout={2000}>
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
          <Button
            variant="contained"
            size="large"
            onClick={() => setModalOpen(true)}
            sx={{ mb: 3 }}
          >
            Feeling frisky? (Random Faction)
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/factions")}
            sx={{ mb: 3 }}
          >
            View all factions
          </Button>
          <RandomFactionSlot
            factions={factions}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            navigateToFaction={(id) => navigate(`/factions/${id}`)}
          />
        </Box>
        <Button variant="text" onClick={() => navigate("/feedback")}>
          Give us Feedback!
        </Button>
      </Box>
    </Fade>
  );
}
