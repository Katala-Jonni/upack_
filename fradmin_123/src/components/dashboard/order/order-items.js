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
import OrderEditForm from './order-edit-form';
import { DeleteModal } from './order-basket-delete-modal';
import { useAction } from '../../../hooks/use-actions';

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
  const { startDeleteProductOrder } = useAction();
  const [openProduct, setOpenProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [item, setItem] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDeleteModal = () => {
    setItem(null);
    setOpenModalDelete(false);
  };
  const handleOpenDeleteModal = item => {
    setItem(item);
    setOpenModalDelete(true);
  };

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

  const handleClickDelete = item => {
    startDeleteProductOrder({ product: item.productId, order: props.order, toast, closeModal: handleCloseDeleteModal });
  };

  const { orderItems, ...other } = props;

  const visible = props.order.stage.status === 'closed' || props.order.stage.status === 'canceled';
  const isOneProductOrder = props.order.basket.products.length < 2;

  return (
    <>
      <Card {...other}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <CardHeader title="Позиции заказа"/>
          {visible
            ? null
            : <Grid item sx={{ pr: 3 }}>
              <Button
                startIcon={<PlusIcon fontSize="small"/>}
                variant="contained"
                onClick={handleOpen}
              >
                Добавить
              </Button>
            </Grid>
          }
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
                  {visible || isOneProductOrder
                    ? null
                    : <TableCell>
                      Действия
                    </TableCell>
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {orderItems.map((item) => {
                  const open = item._id === openProduct;
                  return (
                    <Fragment key={item._id}>
                      <TableRow key={item._id}>
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
                          {visible
                            ? null
                            : <IconButton onClick={() => handleOpenProduct(item._id)}>
                              {open
                                ? <ChevronDownIcon fontSize="small"/>
                                : <ChevronRightIcon fontSize="small"/>}
                            </IconButton>
                          }
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {item.productId.title}
                            {/*{item.name}*/}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {item.count}
                          {/*{item.billingCycle}*/}
                        </TableCell>
                        <TableCell>
                          {numeral(item.productId.price).format(`0,0.00`)}₽
                        </TableCell>
                        <TableCell>
                          {numeral(item.count * item.productId.price).format(`0,0.00`)}₽
                        </TableCell>
                        {visible || isOneProductOrder
                          ? null
                          : <TableCell>
                            <IconButton component="a" onClick={() => handleOpenDeleteModal(item)}>
                              <DeleteIcon fontSize="small"/>
                            </IconButton>
                          </TableCell>
                        }
                      </TableRow>
                      {open && !visible && (
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
                            {/*<CardContent>*/}
                            {/*  <Grid*/}
                            {/*    container*/}
                            {/*    spacing={3}*/}
                            {/*  >*/}
                            {/*    <Grid*/}
                            {/*      item*/}
                            {/*      md={12}*/}
                            {/*      xs={12}*/}
                            {/*    >*/}
                            {/*      <Grid*/}
                            {/*        container*/}
                            {/*        spacing={3}*/}
                            {/*      >*/}
                            {/*        <Grid*/}
                            {/*          item*/}
                            {/*          md={6}*/}
                            {/*          xs={12}*/}
                            {/*        >*/}
                            {/*          <TextField*/}
                            {/*            // error={Boolean(formik.touched.newPrice && formik.errors.newPrice)}*/}
                            {/*            fullWidth*/}
                            {/*            label="Укажите количество"*/}
                            {/*            name="count"*/}
                            {/*            // onBlur={formik.handleBlur}*/}
                            {/*            // onChange={formik.handleChange}*/}
                            {/*            type="number"*/}
                            {/*            value={item.count}*/}
                            {/*            // value={formik.values.newPrice}*/}
                            {/*          />*/}
                            {/*        </Grid>*/}
                            {/*      </Grid>*/}
                            {/*    </Grid>*/}
                            {/*  </Grid>*/}
                            {/*</CardContent>*/}
                            {/*<Divider/>*/}
                            {/*<Box*/}
                            {/*  sx={{*/}
                            {/*    display: 'flex',*/}
                            {/*    flexWrap: 'wrap',*/}
                            {/*    px: 2,*/}
                            {/*    py: 1*/}
                            {/*  }}*/}
                            {/*>*/}
                            {/*  <Button*/}
                            {/*    onClick={handleUpdateProduct}*/}
                            {/*    sx={{ m: 1 }}*/}
                            {/*    type="submit"*/}
                            {/*    variant="contained"*/}
                            {/*  >*/}
                            {/*    Изменить*/}
                            {/*  </Button>*/}
                            {/*  <Button*/}
                            {/*    onClick={handleCancelEdit}*/}
                            {/*    sx={{ m: 1 }}*/}
                            {/*    variant="outlined"*/}
                            {/*  >*/}
                            {/*    Отмена*/}
                            {/*  </Button>*/}
                            {/*</Box>*/}
                            <OrderEditForm
                              item={item}
                              order={props.order}
                              handleCancelEdit={handleCancelEdit}
                            />
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
      {visible
        ? null
        : <Modal
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
      }
      <Modal
        open={openModalDelete}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DeleteModal
            item={item}
            handleDelete={handleClickDelete}
            onClose={handleCloseDeleteModal}
          />
        </Box>
      </Modal>
    </>
  );
};

OrderItems.propTypes = {
  orderItems: PropTypes.array.isRequired
};
