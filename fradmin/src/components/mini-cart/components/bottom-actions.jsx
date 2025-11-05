import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from 'next/link';
import Grid from '@mui/material/Grid'; // ==============================================================

// ==============================================================
export default function BottomActions({
  total,
  handleNavigate
}) {
  return <Box p={2.5}>
    {/*  <Button fullWidth color="primary" variant="contained" sx={{*/}
    {/*  mb: "0.75rem",*/}
    {/*  height: "40px"*/}
    {/*}} onClick={handleNavigate("/checkout-alternative")}>*/}
    {/*    Оформить заказ ({total})*/}
    {/*  </Button>*/}

    <Button
      fullWidth
      color="primary"
      href="/checkout-alternative"
      variant="contained"
      LinkComponent={Link}
      sx={{mb:2}}
      // onClick={() => handleNavigate(false)}
    >
      Оформить заказ ({total})
    </Button>
    <Button
      fullWidth
      color="primary"
      href="/cart"
      variant="outlined"
      LinkComponent={Link}
      // onClick={() => handleNavigate(false)}
    >
      Посмотреть весь заказ
    </Button>
    {/*  <Button fullWidth color="primary" variant="outlined" sx={{*/}
    {/*  height: 40*/}
    {/*}} onClick={handleNavigate("/cart")}>*/}
    {/*    View Cart*/}
    {/*  </Button>*/}
    </Box>;
}
