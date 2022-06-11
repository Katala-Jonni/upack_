import * as campany from '../modules/Campany/actions';
import * as category from '../modules/Category/actions';
// import * as profile from '../modules/Profile/actions';
// import * as stats from '../modules/Stats/actions';
// import * as visitors from '../modules/Visitor/actions';

export default {
  ...campany,
  ...category
  // ...profile,
  // ...stats,
  // ...visitors
};
