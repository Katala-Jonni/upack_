import * as category from '../modules/Category/actions';
import * as product from '../modules/Product/actions';
import * as order from '../modules/Orders/actions';
import * as stage from '../modules/Stage/actions';

export default {
  ...category,
  ...product,
  ...order,
  ...stage
};
