import { Box, Card, CardHeader, CardContent, Button, Divider, Typography } from '@mui/material';

export const CustomerDataManagement = (props) => (
  <Card {...props}>
    <CardHeader title="Управление" />
    <Divider />
    <CardContent>
      <Button
        color="error"
        variant="outlined"
      >
        Заблокировать пользователя
      </Button>
    </CardContent>
  </Card>
);
