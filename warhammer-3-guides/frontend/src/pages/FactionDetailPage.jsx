import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Paper, Button } from "@mui/material";

function FactionDetailPage() {
  const { id } = useParams();
  const [faction, setFaction] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/factions/${id}`)
      .then((res) => setFaction(res.data))
      .catch(() => setFaction(null));
  }, [id]);

  if (!faction) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {faction.faction} — {faction.lord}
        </Typography>
        <img
          src={faction.icon_url}
          alt={faction.faction}
          style={{ width: 100, height: 100, objectFit: "contain" }}
        />
        <Typography variant="h6" mt={2}>
          Race: {faction.race}
        </Typography>
        <Typography variant="body1" mt={2}>
          {faction.summary}
        </Typography>
        <Typography variant="subtitle1" mt={2}>
          Starting Position: {faction.start_position}
        </Typography>
        <Typography variant="subtitle2" mt={1}>
          Difficulty: {faction.difficulty}
        </Typography>
        <Typography variant="subtitle2" mt={1}>
          DLC Required: {faction.dlc_required}
        </Typography>
        <Typography variant="body2" mt={2}>
          <strong>Tips:</strong>
          <ul>
            {faction.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </Typography>
        <Button
          component={Link}
          to="/factions"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to Factions
        </Button>
      </Paper>
    </Container>
  );
}

export default FactionDetailPage;
