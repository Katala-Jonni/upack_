"use client";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button"; // GLOBAL CUSTOM COMPONENTS

import { H1 } from "components/Typography";
import { FlexRowCenter } from "components/flex-box"; // ==============================================================

// ==============================================================
export default function Error({
  error,
  reset
}) {
  console.log(error, error);
  return <FlexRowCenter height="100vh">
      <Card sx={{
      p: 4,
      textAlign: "center"
    }}>
        <H1 mb={2}>Что-то пошло не так!</H1>

        <Button color="error" variant="contained" onClick={() => reset()}>
          Повторить
        </Button>
      </Card>
    </FlexRowCenter>;
}
