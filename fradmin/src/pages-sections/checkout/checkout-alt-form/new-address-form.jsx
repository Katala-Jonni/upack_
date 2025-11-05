import { Fragment, useState } from "react"; // MUI

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent"; // FORMIK

import { useFormik } from "formik"; // YUP

import * as yup from "yup"; // LOCAL CUSTOM COMPONENT

import { H5 } from "components/Typography"; // CUSTOM DATA MODEL

const validationSchema = yup.object({
  street2: yup.string().required("Укажите адрес доставки"),
  name: yup.string().required("Укажите наименование организации"),
  email: yup.string().email('формат u_pack@internet.ru').required("Укажите E-mail"),
  phone: yup.number().required("Укажите номер телефона"),
  // city: yup.string().required("required"),
  // state: yup.string().required("required"),
  // country: yup.string().required("required"),
  // zip: yup.number().required("required")
}); // ==================================================================

// ==================================================================
export default function NewAddressForm({
  handleAddNewAddress
}) {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => setOpenModal(false);

  const initialValues = {
    name: "",
    email: "",
    street2: "",
    phone: "",
    // city: "Sylhet",
    // state: "Sylhet",
    // country: "Bangladesh",
    // zip: 4336
  };
  const {
    handleChange,
    handleSubmit,
    errors,
    touched,
    values
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, {
      resetForm
    }) => {
      console.log('values', values);
      handleAddNewAddress(values);
      handleCloseModal();
      resetForm({});
    }
  });
  return <Fragment>
      <Button color="primary" variant="outlined" onClick={() => setOpenModal(true)}>
        Добавить адрес
      </Button>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          <H5 mb={4}>Заполните форму:</H5>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth type="text" name="name" value={values.name} label="Наименование организации" onChange={handleChange} helperText={touched.name && errors.name} error={touched.name && Boolean(errors.name)} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField fullWidth type="text" name="email" label="Укажите E-mail" value={values.email} onChange={handleChange} helperText={touched.email && errors.email} error={touched.email && Boolean(errors.email)} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField fullWidth type="text" name="street2" label="Адрес доставки" value={values.street2} onChange={handleChange} helperText={touched.street2 && errors.street2} error={touched.street2 && Boolean(errors.street2)} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField fullWidth type="text" name="phone" value={values.phone} onChange={handleChange} label="Контактный номер телефона" helperText={touched.phone && errors.phone} error={touched.phone && Boolean(errors.phone)} />
              </Grid>

              {/*<Grid item sm={6} xs={12}>*/}
              {/*  <TextField fullWidth name="city" label="City" value={values.city} onChange={handleChange} helperText={touched.city && errors.city} error={touched.city && Boolean(errors.city)} />*/}
              {/*</Grid>*/}

              {/*<Grid item sm={6} xs={12}>*/}
              {/*  <TextField fullWidth name="state" label="State" value={values.state} onChange={handleChange} helperText={touched.state && errors.state} error={touched.state && Boolean(errors.state)} />*/}
              {/*</Grid>*/}

              {/*<Grid item sm={6} xs={12}>*/}
              {/*  <TextField fullWidth name="zip" label="Zip" type="number" value={values.zip} onChange={handleChange} helperText={touched.zip && errors.zip} error={touched.zip && Boolean(errors.zip)} />*/}
              {/*</Grid>*/}

              {/*<Grid item sm={6} xs={12}>*/}
              {/*  <TextField fullWidth name="country" label="Country" value={values.country} onChange={handleChange} helperText={touched.country && errors.country} error={touched.country && Boolean(errors.country)} />*/}
              {/*</Grid>*/}

              <Grid item sm={6} xs={12}>
                <Button color="primary" variant="contained" type="submit">
                  Сохранить
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>;
}
