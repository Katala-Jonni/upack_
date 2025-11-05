import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { ChevronDown as ChevronDownIcon } from '../../../icons/chevron-down';
import { ChevronRight as ChevronRightIcon } from '../../../icons/chevron-right';
import { Image as ImageIcon } from '../../../icons/image';
import { Scrollbar } from '../../scrollbar';
import { SeverityPill } from '../../severity-pill';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { startEditCategory } from '../../../modules/Category';
import CategoryEditForm from '../../../pages/dashboard/products/categoryEditForm';
import {status} from '../../../utils/category';

const categoryOptions = [
  {
    label: 'Healthcare',
    value: 'healthcare'
  },
  {
    label: 'Makeup',
    value: 'makeup'
  },
  {
    label: 'Dress',
    value: 'dress'
  },
  {
    label: 'Skincare',
    value: 'skincare'
  },
  {
    label: 'Jewelry',
    value: 'jewelry'
  },
  {
    label: 'Blouse',
    value: 'blouse'
  }
];

export const CategoryListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    products,
    productsCount,
    rowsPerPage,
    ...other
  } = props;
  const [openProduct, setOpenProduct] = useState(null);
  const [name, setName] = useState('');
  const minLengthName = 3;
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().min(4).max(255).required('Укажите наименование категории')
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        // if (name && name.length > minLengthName) {
        //   await startEditCategory({ values, toast });
        // }
        console.log('еусе');
      } catch (err) {
        console.error(err);
        toast.error('Что-то пошло не так! Повторите.');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleOpenProduct = (productId) => {
    setOpenProduct((prevValue) => (prevValue === productId ? null : productId));
  };

  const handleUpdateProduct = () => {
    setOpenProduct(null);
    toast.success('Product updated');
  };

  const handleCancelEdit = () => {
    setOpenProduct(null);
  };

  const handleDeleteProduct = () => {
    toast.error('Product cannot be deleted');
  };

  return (
    <div {...other}>
      <Scrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell/>
              <TableCell>
                Наименование
              </TableCell>
              <TableCell>
                Статус
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              const open = product._id === openProduct;
              // const open = product.id === openProduct;

              return (
                <Fragment key={product._id}>
                {/*<Fragment key={product.id}>*/}
                  <TableRow
                    hover
                  >
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
                      <IconButton onClick={() => handleOpenProduct(product._id)}>
                      {/*<IconButton onClick={() => handleOpenProduct(product.id)}>*/}
                        {open
                          ? <ChevronDownIcon fontSize="small"/>
                          : <ChevronRightIcon fontSize="small"/>}
                      </IconButton>
                    </TableCell>
                    <TableCell width='75%'>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        {product.image
                          ? (
                            <Box
                              sx={{
                                alignItems: 'center',
                                backgroundColor: 'background.default',
                                backgroundImage: `url(${product.image})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                borderRadius: 1,
                                display: 'flex',
                                height: 80,
                                justifyContent: 'center',
                                overflow: 'hidden',
                                width: 80
                              }}
                            />
                          )
                          : (
                            <Box
                              sx={{
                                alignItems: 'center',
                                backgroundColor: 'background.default',
                                borderRadius: 1,
                                display: 'flex',
                                height: 80,
                                justifyContent: 'center',
                                width: 80
                              }}
                            >
                              <ImageIcon fontSize="small"/>
                            </Box>
                          )}
                        <Box
                          sx={{
                            cursor: 'pointer',
                            ml: 2
                          }}
                        >
                          <Typography variant="subtitle2">
                            {`${product.title[0].toUpperCase()}${product.title.slice(1)}`}
                            {/*{product.name}*/}
                          </Typography>
                          {/*<Typography*/}
                          {/*  color="textSecondary"*/}
                          {/*  variant="body2"*/}
                          {/*>*/}
                          {/*  in {product.title}*/}
                          {/*  /!*in {product.category}*!/*/}
                          {/*</Typography>*/}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={product.active === status.active ? 'success' : 'warning'}>
                      {/*<SeverityPill color={product.status === 'active' ? 'success' : 'warning'}>*/}
                        {product.active === status.active ? 'Активна' : 'Неактивна'}
                        {/*{product.status === 'active' ? 'Активна' : 'Неактивна'}*/}
                      </SeverityPill>
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
                        <CategoryEditForm
                        product={product}
                        handleCancelEdit={handleCancelEdit}
                        />
                        {/*<form*/}
                        {/*  onSubmit={formik.handleSubmit}*/}
                        {/*>*/}
                        {/*  <CardContent>*/}
                        {/*    <Grid*/}
                        {/*      container*/}
                        {/*      spacing={3}*/}
                        {/*    >*/}
                        {/*      <Grid*/}
                        {/*        item*/}
                        {/*        // md={6}*/}
                        {/*        xs={12}*/}
                        {/*      >*/}
                        {/*        <Typography variant="h6">*/}
                        {/*          Основная информация*/}
                        {/*        </Typography>*/}
                        {/*        <Divider sx={{ my: 2 }}/>*/}
                        {/*        <Grid*/}
                        {/*          container*/}
                        {/*          spacing={3}*/}
                        {/*        >*/}
                        {/*          <Grid*/}
                        {/*            item*/}
                        {/*            md={6}*/}
                        {/*            xs={12}*/}
                        {/*          >*/}
                        {/*            <TextField*/}
                        {/*              defaultValue={product.title}*/}
                        {/*              // defaultValue={product.name}*/}
                        {/*              fullWidth*/}
                        {/*              label="Наименование"*/}
                        {/*              name="name"*/}
                        {/*            />*/}
                        {/*          </Grid>*/}
                        {/*          <Grid*/}
                        {/*            item*/}
                        {/*            md={6}*/}
                        {/*            xs={12}*/}
                        {/*            sx={{*/}
                        {/*              alignItems: 'center',*/}
                        {/*              display: 'flex'*/}
                        {/*            }}*/}
                        {/*          >*/}
                        {/*            <Switch defaultChecked={product.active === 'active'}/>*/}
                        {/*            <Typography variant="subtitle2">*/}
                        {/*              Активна?*/}
                        {/*            </Typography>*/}
                        {/*          </Grid>*/}
                        {/*        </Grid>*/}
                        {/*      </Grid>*/}
                        {/*    </Grid>*/}
                        {/*  </CardContent>*/}
                        {/*  <Divider/>*/}
                        {/*  <Box*/}
                        {/*    sx={{*/}
                        {/*      display: 'flex',*/}
                        {/*      flexWrap: 'wrap',*/}
                        {/*      px: 2,*/}
                        {/*      py: 1*/}
                        {/*    }}*/}
                        {/*  >*/}
                        {/*    <Button*/}
                        {/*      // onClick={handleUpdateProduct}*/}
                        {/*      sx={{ m: 1 }}*/}
                        {/*      type="submit"*/}
                        {/*      variant="contained"*/}
                        {/*    >*/}
                        {/*      Изменить*/}
                        {/*    </Button>*/}
                        {/*    <Button*/}
                        {/*      onClick={handleCancelEdit}*/}
                        {/*      sx={{ m: 1 }}*/}
                        {/*      variant="outlined"*/}
                        {/*    >*/}
                        {/*      Отмена*/}
                        {/*    </Button>*/}
                        {/*  </Box>*/}
                        {/*</form>*/}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        labelRowsPerPage='Строк на странице'
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count !== -1 ? count : `больше чем ${to}`}`}
        count={productsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

CategoryListTable.propTypes = {
  products: PropTypes.array.isRequired,
  productsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
