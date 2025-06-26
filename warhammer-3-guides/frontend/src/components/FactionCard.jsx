import React from "react";
import {
  Backdrop,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

function FactionCard({ faction }) {
  return (
    <Card
      variant="outlined"
      sx={{
        margin: "auto",
        my: 2,
        maxWidth: 350,
        width: "100%",
        height: 320, // Set your desired uniform height
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(30,30,30,0.7)",
        border: "2px solid rgba(255,255,255,0.2)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        backdropFilter: "blur(3px)",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={faction.icon_url}
        alt={faction.lord}
        style={{ objectFit: "contain", background: "#222" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder.png";
        }}
      />
      <CardContent
        sx={{
          backgroundColor: "transparent",
          color: "white",
          p: 2,
        }}
      >
        <Typography color="white" variant="h5">
          {faction.lord}{" "}
          <span style={{ fontWeight: 300 }}>({faction.faction})</span>
        </Typography>
        <Typography color="white" variant="subtitle2" mt={0.2}>
          {faction.race}
        </Typography>
        <Typography color="white" variant="body2" mt={1}>
          {faction.summary}{" "}
        </Typography>
        <Typography variant="caption" color="white">
          DLC: {faction.dlc_required}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FactionCard;
