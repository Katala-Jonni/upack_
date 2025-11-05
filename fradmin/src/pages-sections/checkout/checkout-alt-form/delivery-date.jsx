import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { format } from "date-fns";
import { ru } from 'date-fns/locale';
import Heading from "./heading";
// ==============================================================
export default function DeliveryDate({
  errors,
  handleChange,
  touched,
  values
}) {
  const [dateList, setDateList] = useState([]);
  useEffect(() => {
    let list = [];
    let today = new Date();
    let dateCount = today.getDate();
    list.push({
      label: format(today, "dd MMMM", {locale: ru}),
      value: today.toISOString()
    });

    for (let i = 1; i < 10; i++) {
      today.setDate(dateCount + i);
      list.push({
        label: format(today, "dd MMMM", {locale: ru}),
        value: today.toISOString()
      });
    }

    setDateList(list);
  }, []);
  const timeList = [{
    label: "12:00 - 15:00",
    value: "12:00 - 15:00"
  }, {
    label: "15:00 - 18:00",
    value: "15:00 - 18:00"
  }, {
    label: "18:00 - 21:00",
    value: "18:00 - 21:00"
  }];
  return <Card sx={{
    p: 3,
    mb: 3
  }}>
      <Heading number={1} title="Укажите желаемую дату и время доставки" />

      <Box mb={3.5}>
        <Grid container spacing={3}>
          <Grid item sm={6} xs={12}>
            <TextField select fullWidth type="text" name="date" label="Выберите дату (может быть изменена)" value={values.date} onChange={e => handleChange(e)} error={!!touched.date && !!errors.date} helperText={touched.date && errors.date}>
              {dateList.map(item => <MenuItem value={item.value} key={item.label}>
                  {item.label}
                </MenuItem>)}
            </TextField>
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField select fullWidth type="text" name="time" value={values.time} label="Укажите время доставки (время может быть изменено)" onChange={handleChange} error={!!touched.time && !!errors.time} helperText={touched.time && errors.time}>
              {timeList.map(item => <MenuItem value={item.value} key={item.value}>
                  {item.value}
                </MenuItem>)}
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Card>;
}
