import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function FactionCard({ faction }) {
  return (
    <Card
      sx={{
        width: 280,
        height: 360,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        image={faction.icon_url}
        alt={faction.lord}
        sx={{ objectFit: "contain", background: "#222", height: 140 }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder.png"; // Use a fallback image if desired
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5">
          {faction.lord}{" "}
          <span style={{ fontWeight: 300 }}>({faction.faction})</span>
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {faction.race}
        </Typography>
        <Typography
          variant="body2"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {faction.summary}
        </Typography>
        <Typography variant="caption" color="secondary">
          DLC: {faction.dlc_required}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FactionCard;
