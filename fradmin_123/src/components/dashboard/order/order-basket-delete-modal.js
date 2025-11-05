import React from 'react';
import { Avatar, Box, Button, Container, IconButton, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/WarningOutlined';
import { X as XIcon } from '../../../icons/x';

export const DeleteModal = props => (
  // <Box
  //   sx={{
  //     backgroundColor: 'background.default',
  //     minHeight: '100%',
  //     p: 3
  //   }}
  // >
  <Container maxWidth="sm">
    <IconButton
      sx={{
        position: 'absolute',
        top: 8,
        right: 8
      }}
      onClick={props.onClose}
    >
      <XIcon fontSize="small"/>
    </IconButton>
    <Box
      sx={{
        display: 'flex',
        pb: 2,
        pt: 3,
        px: 3
      }}
    >
      <Avatar
        sx={{
          backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
          color: 'error.main',
          mr: 2
        }}
      >
        <WarningIcon fontSize="small"/>
      </Avatar>
      <div>
        {props.item
          ? <Typography variant="h5">
            Вы действительно хотите удалить {props.item.productId.title} из заказа?
          </Typography>
          : null
        }
        <Typography
          color="textSecondary"
          sx={{ mt: 1 }}
          variant="body2"
        >
          После удаления, данные пропадут.
        </Typography>
      </div>
    </Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        px: 3,
        py: 1.5
      }}
    >
      <Button
        sx={{ mr: 2 }}
        variant="outlined"
        onClick={props.onClose}
      >
        Отмена
      </Button>
      <Button
        sx={{
          backgroundColor: 'error.main',
          '&:hover': {
            backgroundColor: 'error.dark'
          }
        }}
        variant="contained"
        onClick={() => props.handleDelete(props.item)}
      >
        Удалить
      </Button>
    </Box>
  </Container>
  // </Box>
);
