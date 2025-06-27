import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import FactionCard from "../components/FactionCard";

export default function FactionsListPage() {
  const [factions, setFactions] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  // Filter states
  const [race, setRace] = useState("");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/factions")
      .then((res) => setFactions(res.data));
  }, []);

  // Get unique races and difficulties for filter options
  const races = [...new Set(factions.map((f) => f.race))].sort();
  const difficulties = [...new Set(factions.map((f) => f.difficulty))].sort();

  // Filtered factions
  const filtered = factions.filter(
    (f) =>
      (f.faction.toLowerCase().includes(search.toLowerCase()) ||
        f.lord.toLowerCase().includes(search.toLowerCase()) ||
        f.race.toLowerCase().includes(search.toLowerCase())) &&
      (race ? f.race === race : true) &&
      (difficulty ? f.difficulty === difficulty : true)
  );

  // Modal handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Filter controls handlers
  const handleRaceChange = (e) => setRace(e.target.value);
  const handleDifficultyChange = (e) => setDifficulty(e.target.value);
  const handleClearFilters = () => {
    setRace("");
    setDifficulty("");
    handleClose();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography
        fontFamily={"Manufacturing Consent"}
        variant="h1"
        align="center"
        gutterBottom
      >
        Warhammer 3 Faction Guides
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search for a faction, lord, or race..."
          sx={{ mb: 2 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="outlined"
          color="primary"
          sx={{ minWidth: 120, mb: 2 }}
          onClick={handleOpen}
        >
          Filters
        </Button>
      </Box>

      {/* Filter Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Filter Factions</DialogTitle>
        <DialogContent sx={{ minWidth: 300 }}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Race</InputLabel>
            <Select value={race} onChange={handleRaceChange} label="Race">
              <MenuItem value="">Any</MenuItem>
              {races.map((r, i) => (
                <MenuItem key={i} value={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Campaign Difficulty</InputLabel>
            <Select
              value={difficulty}
              onChange={handleDifficultyChange}
              label="Campaign Difficulty"
            >
              <MenuItem value="">Any</MenuItem>
              {difficulties.map((d, i) => (
                <MenuItem key={i} value={d}>
                  {d}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearFilters}>Clear</Button>
          <Button onClick={handleClose} variant="contained">
            Apply
          </Button>
        </DialogActions>
      </Dialog>

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
