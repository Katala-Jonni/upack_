"use client";

import Grid from "@mui/material/Grid";
// CUSTOM ICON COMPONENTS
import appIcons from "icons"; // GLOBAL CUSTOM COMPONENTS

import { H4, Span } from "components/Typography"; // CUSTOM DATA MODEL

// STYLED COMPONENT
import { ServiceCard } from "./styles"; // ==========================================================

// ==========================================================
export default function Section2({
  services = []
}) {
  return <div>
  {/*return <div className="mb-3">*/}
      <Grid container spacing={4} sx={{
        display: 'flex',
        // alignItems: 'flex-start',
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        // alignItems: 'stretch',
        // p: 1,
        // m: 1,
        // bgcolor: 'background.paper',
        // borderRadius: 1,
      }}>
        {services.map(({
        icon,
        id,
        title,
        description
      }) => {
        const Icon = appIcons[icon];
        return <Grid item md={12} sm={4} xs={12} key={id} >
        {/*return <Grid item lg={3} sm={6} xs={12} key={id} >*/}
              <ServiceCard>
                <Icon sx={{
              fontSize: 45,
              color: "grey.600"
            }} />

                <div>
                  <H4 color="grey.900" fontSize={18} fontWeight={700}>
                    {title}
                  </H4>
                  <Span color="grey.600">{description}</Span>
                </div>
              </ServiceCard>
            </Grid>;
      })}
      </Grid>
    </div>;
}
