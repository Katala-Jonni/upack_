import { useState } from "react";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import { useFormik } from "formik";
import * as yup from "yup"; // GLOBAL CUSTOM COMPONENT

import { H5 } from "components/Typography";
const validationSchema = yup.object({
  street2: yup.string().required("Укажите адрес доставки"),
  name: yup.string().required("Укажите наименование организации"),
  email: yup.string().email().required("Укажите E-mail"),
  phone: yup.number().required("Укажите номер телефона"),
}); // ================================================================

// ================================================================
export default function EditAddressForm(props) {
  const {
    active,
    address,
    changeEditAddressId,
    handleEditAddress
  } = props;
  const [openModal, setOpenModal] = useState(active);

  const handleCloseModal = () => {
    setOpenModal(false);
    changeEditAddressId();
  };

  const initialValues = {
    name: address.name,
    phone: address.phone,
    email: address.email,
    street2: address.street2
  };
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      handleEditAddress(address.id, { ...values,
        id: address.id
      });
      handleCloseModal();
    }
  });
  return <Dialog open={openModal} onClose={handleCloseModal} sx={{
    zIndex: 99999
  }}>
      <DialogContent>
        <H5 mb={4}>Внесите изменения</H5>

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

            <Grid item sm={6} xs={12}>
              <Button color="primary" variant="contained" type="submit">
                Сохранить изменения
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>;
}
