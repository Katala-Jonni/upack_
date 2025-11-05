import React, { Fragment, useState } from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import {
  Box,
  Button,
  CardContent,
  Divider, FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
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
import { DotsHorizontal as DotsHorizontalIcon } from '../../../icons/dots-horizontal';
import { Image as ImageIcon } from '../../../icons/image';
import { Scrollbar } from '../../scrollbar';
import { SeverityPill } from '../../severity-pill';
import NextLink from 'next/link';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import ProductEditForm from '../../../pages/dashboard/products/productEditForm';

// const categoryOptions = [
//   {
//     label: 'Healthcare',
//     value: 'healthcare'
//   },
//   {
//     label: 'Makeup',
//     value: 'makeup'
//   },
//   {
//     label: 'Dress',
//     value: 'dress'
//   },
//   {
//     label: 'Skincare',
//     value: 'skincare'
//   },
//   {
//     label: 'Jewelry',
//     value: 'jewelry'
//   },
//   {
//     label: 'Blouse',
//     value: 'blouse'
//   }
// ];

export const ProductListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    products,
    productsCount,
    rowsPerPage,
    options,
    ...other
  } = props;

  const [openProduct, setOpenProduct] = useState(null);

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

  const handleDeleteProduct = () => {
    toast.error('Товар не может быть удален');
  };

  return (
    <div {...other}>
      <Scrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell/>
              <TableCell>
                Наименоване
              </TableCell>
              {/*<TableCell width="25%">*/}
              {/*  Stock*/}
              {/*</TableCell>*/}
              <TableCell>
                Цена
              </TableCell>
              {/*<TableCell>*/}
              {/*  sku*/}
              {/*</TableCell>*/}
              <TableCell>
                Статус
              </TableCell>
              <TableCell align="right">
                Действия
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              const open = product._id === openProduct;
              const currentCategory = options.find(c => c.value === product.categoryId);
              return (
                <Fragment key={product._id}>
                  <TableRow
                    hover
                    key={product._id}
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
                        {product.images && product.images.length
                          ? (
                            <Box
                              sx={{
                                alignItems: 'center',
                                backgroundColor: 'background.default',
                                backgroundImage: `url(${product.images[0]})`,
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
                            {product.title}
                          </Typography>
                          <Typography
                            color="textSecondary"
                            variant="body2"
                          >
                            Категория: {currentCategory && currentCategory.label}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    {/*<TableCell width="25%">*/}
                    {/*  <LinearProgress*/}
                    {/*    value={product.quantity}*/}
                    {/*    variant="determinate"*/}
                    {/*    color={product.quantity >= 10 ? 'success' : 'error'}*/}
                    {/*    sx={{*/}
                    {/*      height: 8,*/}
                    {/*      width: 36*/}
                    {/*    }}*/}
                    {/*  />*/}
                    {/*  <Typography*/}
                    {/*    color="textSecondary"*/}
                    {/*    variant="body2"*/}
                    {/*  >*/}
                    {/*    {product.quantity}*/}
                    {/*    {' '}*/}
                    {/*    in stock*/}
                    {/*    {product.variants > 1 && ` in ${product.variants} variants`}*/}
                    {/*  </Typography>*/}
                    {/*</TableCell>*/}
                    <TableCell>
                      {numeral(product.price).format(`0,0.00`)}₽
                    </TableCell>
                    {/*<TableCell>*/}
                    {/*  {product.sku}*/}
                    {/*</TableCell>*/}
                    <TableCell>
                      <SeverityPill color={product.active === 'active' ? 'success' : 'warning'}>
                        {product.active === 'active' ? 'Активный' : 'Неактивный'}
                      </SeverityPill>
                    </TableCell>
                    <TableCell align="right">
                      <NextLink
                        href={`/dashboard/products/${product.slug}/edit`}
                        passHref
                      >
                        <IconButton component="a">
                          <PencilAltIcon fontSize="small"/>
                        </IconButton>
                      </NextLink>
                      {/*<NextLink*/}
                      {/*  href="/dashboard/customers/1"*/}
                      {/*  passHref*/}
                      {/*>*/}
                      {/*  <IconButton component="a">*/}
                      {/*    <ArrowRightIcon fontSize="small"/>*/}
                      {/*  </IconButton>*/}
                      {/*</NextLink>*/}
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
                        <ProductEditForm
                          product={product}
                          handleCancelEdit={handleCancelEdit}
                          options={options}
                        />
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
                        {/*      <Typography variant="h6">*/}
                        {/*        Основная информация*/}
                        {/*      </Typography>*/}
                        {/*      <Divider sx={{ my: 2 }}/>*/}
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
                        {/*            defaultValue={product.categoryId}*/}
                        {/*            fullWidth*/}
                        {/*            label="Категория"*/}
                        {/*            select*/}
                        {/*          >*/}
                        {/*            {options.map((option) => (*/}
                        {/*              <MenuItem*/}
                        {/*                key={option.value}*/}
                        {/*                value={option.value}*/}
                        {/*              >*/}
                        {/*                {`${option.label[0].toUpperCase()}${option.label.slice(1)}`}*/}
                        {/*              </MenuItem>*/}
                        {/*            ))}*/}
                        {/*          </TextField>*/}
                        {/*        </Grid>*/}
                        {/*        <Grid*/}
                        {/*          item*/}
                        {/*          md={6}*/}
                        {/*          xs={12}*/}
                        {/*        >*/}
                        {/*          <TextField*/}
                        {/*            defaultValue={product.title}*/}
                        {/*            fullWidth*/}
                        {/*            label="Наименование"*/}
                        {/*            name="title"*/}
                        {/*          />*/}
                        {/*        </Grid>*/}
                        {/*        <Grid*/}
                        {/*          item*/}
                        {/*          md={6}*/}
                        {/*          xs={12}*/}
                        {/*        >*/}
                        {/*          <TextField*/}
                        {/*            // error={Boolean(formik.touched.newPrice && formik.errors.newPrice)}*/}
                        {/*            fullWidth*/}
                        {/*            label="Укажите цену (₽)"*/}
                        {/*            name="price"*/}
                        {/*            // onBlur={formik.handleBlur}*/}
                        {/*            // onChange={formik.handleChange}*/}
                        {/*            type="number"*/}
                        {/*            value={product.price}*/}
                        {/*            // value={formik.values.newPrice}*/}
                        {/*          />*/}
                        {/*        </Grid>*/}
                        {/*        <Grid*/}
                        {/*          item*/}
                        {/*          md={6}*/}
                        {/*          xs={12}*/}
                        {/*        >*/}
                        {/*          <FormControlLabel*/}
                        {/*            control={<Switch/>}*/}
                        {/*            label="Активный?"*/}
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
                        {/*  <Button*/}
                        {/*    onClick={handleDeleteProduct}*/}
                        {/*    color="error"*/}
                        {/*    sx={{*/}
                        {/*      m: 1,*/}
                        {/*      ml: 'auto'*/}
                        {/*    }}*/}
                        {/*  >*/}
                        {/*    Удалить*/}
                        {/*  </Button>*/}
                        {/*</Box>*/}
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

ProductListTable.propTypes = {
  products: PropTypes.array.isRequired,
  productsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  options: PropTypes.array
};
