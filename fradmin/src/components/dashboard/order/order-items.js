import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import DeleteIcon from '@mui/icons-material/Delete';
import { Plus as PlusIcon } from '../../../icons/plus';
import {
  Box, Button,
  Card, CardContent,
  CardHeader,
  Divider, FormControlLabel, Grid, IconButton, MenuItem, Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow, TextField,
  Typography
} from '@mui/material';
import { Scrollbar } from '../../scrollbar';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { ChevronDown as ChevronDownIcon } from '../../../icons/chevron-down';
import { ChevronRight as ChevronRightIcon } from '../../../icons/chevron-right';
import { toast } from 'react-hot-toast';
import Modal from '@mui/material/Modal';
import { OrderCreateForm } from './order-create-form';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '500px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

export const OrderItems = (props) => {
  const [openProduct, setOpenProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenProduct = (productId) => {
    setOpenProduct((prevValue) => (prevValue === productId ? null : productId));
  };
  const handleUpdateProduct = () => {
    setOpenProduct(null);
    toast.success('Товар обновлен');
  };

  const handleCancelEdit = () => {
    setOpenProduct(null);
  };

  const { orderItems, ...other } = props;

  return (
    <>
      <Card {...other}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <CardHeader title="Позиции заказа"/>
          <Grid item sx={{pr: 3}}>
            <Button
              startIcon={<PlusIcon fontSize="small"/>}
              variant="contained"
              onClick={handleOpen}
            >
              Добавить
            </Button>
          </Grid>
        </Grid>
        <Divider/>
        <Scrollbar>
          <Box sx={{ minWidth: 700 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell/>
                  <TableCell>
                    Наименование
                  </TableCell>
                  <TableCell>
                    Количество
                  </TableCell>
                  <TableCell>
                    Сумма
                  </TableCell>
                  <TableCell>
                    Итого
                  </TableCell>
                  <TableCell>
                    Действия
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderItems.map((item) => {
                  const open = item.id === openProduct;
                  return (
                    <Fragment key={item.id}>
                      <TableRow key={item.id}>
                        <TableCell
                          padding="checkbox"
                          sx={{
                            ...(open && {
                              position: 'relative',
                              '&:after': {
                                position: 'absolute',
                                content: '" "',
                                top: 0,
                                left: 0,
                                backgroundColor: 'primary.main',
                                width: 3,
                                height: 'calc(100% + 1px)'
                              }
                            })
                          }}
                        >
                          <IconButton onClick={() => handleOpenProduct(item.id)}>
                            {open
                              ? <ChevronDownIcon fontSize="small"/>
                              : <ChevronRightIcon fontSize="small"/>}
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {item.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {item.billingCycle}
                        </TableCell>
                        <TableCell>
                          {numeral(item.unitAmount).format(`0,0.00`)} {item.currency}
                        </TableCell>
                        <TableCell>
                          {numeral(item.quantity * item.unitAmount).format(`0,0.00`)} {item.currency}
                        </TableCell>
                        <TableCell>
                          <IconButton component="a">
                            <DeleteIcon fontSize="small"/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      {open && (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            sx={{
                              p: 0,
                              position: 'relative',
                              '&:after': {
                                position: 'absolute',
                                content: '" "',
                                top: 0,
                                left: 0,
                                backgroundColor: 'primary.main',
                                width: 3,
                                height: 'calc(100% + 1px)'
                              }
                            }}
                          >
                            <CardContent>
                              <Grid
                                container
                                spacing={3}
                              >
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <Grid
                                    container
                                    spacing={3}
                                  >
                                    <Grid
                                      item
                                      md={6}
                                      xs={12}
                                    >
                                      <TextField
                                        // error={Boolean(formik.touched.newPrice && formik.errors.newPrice)}
                                        fullWidth
                                        label="Укажите количество"
                                        name="count"
                                        // onBlur={formik.handleBlur}
                                        // onChange={formik.handleChange}
                                        type="number"
                                        value={item.count}
                                        // value={formik.values.newPrice}
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </CardContent>
                            <Divider/>
                            <Box
                              sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                px: 2,
                                py: 1
                              }}
                            >
                              <Button
                                onClick={handleUpdateProduct}
                                sx={{ m: 1 }}
                                type="submit"
                                variant="contained"
                              >
                                Изменить
                              </Button>
                              <Button
                                onClick={handleCancelEdit}
                                sx={{ m: 1 }}
                                variant="outlined"
                              >
                                Отмена
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          component="div"
          labelRowsPerPage='Строк на странице'
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count !== -1 ? count : `больше чем ${to}`}`}
          count={orderItems.length}
          onPageChange={() => {
          }}
          onRowsPerPageChange={() => {
          }}
          page={0}
          rowsPerPage={5}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <OrderCreateForm
            onClose={handleClose}
          />
        </Box>
      </Modal>

    </>
  );
};

OrderItems.propTypes = {
  orderItems: PropTypes.array.isRequired
};
