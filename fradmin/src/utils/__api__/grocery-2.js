import { cache } from 'react';
import axios from '../../utils/axiosInstance';
import { routes } from '../../api/routes';
import { fetchApi } from '../../api/fetch';

const limitedParallelRequests = async (urls, limit, products) => {
  const results = [];
  const promises = [];
  for (const url of urls) {
    const promise = axios.get(new URL(url).toString(), { headers })
      .then(async (response) => {
        const storageFile = `${response.data['ХранилищеДвоичныхДанных_Key']}`;
        const urlFileStorage = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_ХранилищеДвоичныхДанных(guid'${storageFile}')?$format=json`;
        const responseApiFile = await axios.get(new URL(urlFileStorage).toString(), { headers });
        // productFile = {
        //   ...productFile,
        //   [items[i].refKey]: {
        //     file: `data:image/jpg;base64, ${responseApiFile.data['ДвоичныеДанные_Base64Data']}`
        //   }
        // };
        // fileData.push(productFile);
        // console.log('responseApiFile.data', responseApiFile.data);
        // console.log('responseApiFile', responseApiFile.data);
        results.push(response.data.value ? response.data.value : response.data);
        // return `data:image/jpg;base64, ${responseApiFile.data['ДвоичныеДанные_Base64Data']}`;
      })
      .catch(error => {
        console.error(`Ошибка запроса по URL ${url}:`, error);
      });
    promises.push(promise);
    if (promises.length >= limit) {
      await Promise.all(promises);
      promises.length = 0; // Очищаем массив для следующей пачки
    }
  }
  await Promise.all(promises); // Ждём завершения оставшихся запросов
  return results;
};

export async function startLoadCategory(url) {
  try {
    const res = await fetchApi.find(url);
    // console.log('startLoadCategory', res);
    return res.data;
  } catch (e) {
    console.error('startLoadCategory', e);
  }
}

export async function startLoadSearch(url) {
  try {
    console.log('url', url);
    const res = await fetchApi.find(url);
    return res.data;
  } catch (e) {
    console.error('startLoadCategory', e);
  }
}

// '/assets/images/icons/fish.svg',
// '/assets/images/icons/healthy-food.svg',
// '/assets/images/icons/wheat-flour.svg',
// '/assets/images/products/Orange 1kg 2.png',
// '/assets/images/icons/skincare.svg'
// '/assets/images/icons/menu.svg'

const iconsCategory = [
  '/assets/images/icons/categories.svg',
  '/assets/images/icons/category.svg',
  '/assets/images/icons/arrow-right.svg'
];
const headers = {
  'Authorization': `Basic b2RhdGEudXNlcjpVejVGRng9a1xX4oCTMXFdS25u`
};

const selectProps = 'Ref_Key,IsFolder,DeletionMark,Description,Parent_Key';
const selectProductProps = 'Ref_Key,Description,Комментарий,IsFolder,DeletionMark,Parent_Key,ЕдиницаИзмерения,ФайлКартинки_Key,ДополнительныеРеквизиты';

// async function getRequest(url){
//   const baseUrl = 'https://1cfresh.com/a/sbm/2010500/odata/standard.odata/';
//   const formatResponse = '$format=json';
//   const foolUrl = `${baseUrl}${url}?${formatResponse}`;
//   return await axios.get(foolUrl, { headers });
//   // console.log('responseApiGetRequest',responseApi);
// }

async function getRequest(url) {
  return await axios.get(new URL(url).toString(), { headers });
  // return await axiosInstance.get(url, { headers });
}

async function makeRequests(items) {
  const newItems = [];
  for (let i = 0; i < items.length; i++) {
    try {
      // const imageFile = `${baseUrl}${items[i]['ФайлКартинки@navigationLinkUrl']}?${formatResponse}`;
      const responseApi = await getRequest(items[i]['ФайлКартинки@navigationLinkUrl']);
      // console.log('responseApiProductsCategory', responseApiProductsCategory.data);
      newItems.push(responseApi.data);
    } catch (error) {
      console.error(`Ошибка при запросе к ${items[i]}:`, error);
    }
  }
  return newItems;
}

async function makeRequestsFile(items) {
  console.time('myTimer');
  const startTime = new Date().getTime(); // Или просто Date.now()
  const newItems = [];
  const pricesCopy = [];
  const countProps = [];
  const filesStorage = [];
  const filesData = [];
  for (let i = 0; i < items.length; i++) {
    try {
      let productsData = {};
      let countProductBasket = 1; // ДополнительныеРеквизиты кратность по умолчанию
      const productPriceUrl = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/InformationRegister_ЦеныНоменклатуры?$filter=Номенклатура_Key eq guid'${items[i]['Ref_Key']}' and ВидЦен_Key eq guid'dff4e03c-5920-11ed-85c9-fa163e5d098a'&$orderby=Period desc&$select=Цена,Номенклатура_Key&$format=json`;
      const productPrice = await axios.get(productPriceUrl, { headers });
      pricesCopy.push(getRequest(productPriceUrl));
      if (items[i]['ДополнительныеРеквизиты'].length) {
        const propsProduct = items[i]['ДополнительныеРеквизиты'][0]['Значение'];
        const countProductUrl = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_ЗначенияСвойствОбъектов?$filter=Ref_Key eq guid'${propsProduct}'&$select=Description,Ref_Key&&$format=json`;
        // const countProduct = await axios.get(countProductUrl, { headers });
        // countProductBasket = countProduct.data.value[0]['Description'].toFixed(2);
        // countProductBasket = parseInt(countProduct.data.value[0]['Description']);
        // начало изменений
        // countProps.push(getRequest(countProductUrl));
        const resCount = getRequest(countProductUrl)
          .then(res => {
            const count = res.data.value[0];
            countProductBasket = parseInt(count['Description']);
            return Promise.resolve(res.data);
          })
          .catch(error => {
            console.log('произошла ошибка в запросе makeRequestsFile', error);
          });
        countProps.push(resCount);
      }
      const price = productPrice.data.value[0]['Цена'].toFixed(2);
      // const price = parseInt(productPrice.data.value[0]['Цена']);
      if (items[i]['ФайлКартинки_Key'] === '00000000-0000-0000-0000-000000000000') {
        // 00000000-0000-0000-0000-000000000000 если нет картинки
        productsData = {
          ...items[i],
          thumbnail: '/assets/images/nofoto.jpg',
          price,
          count: countProductBasket
        };
      } else {
        const url = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/InformationRegister_ХранилищеФайлов(Файл='${items[i]['ФайлКартинки_Key']}',Файл_Type='StandardODATA.Catalog_НоменклатураПрисоединенныеФайлы')?$format=json`;
        const reqFiles = getRequest(url)
          // const reqFiles = await getRequest(url)
          .then((response) => {
            // console.log('response # 1', response.data);
            const storageFile = `${response.data['ХранилищеДвоичныхДанных_Key']}`;
            const urlFileStorage = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_ХранилищеДвоичныхДанных(guid'${storageFile}')?$format=json`;
            return getRequest(urlFileStorage);
          })
          .then(res => {
            const data = {
              product_id: items[i].Ref_Key,
              thumbnail: res.data['ДвоичныеДанные_Base64Data']
            };
            filesData.push(data);
            return Promise.resolve(res.data);
            // console.log('res # 2', res.data);
          });
        filesStorage.push(reqFiles);
        const responseApi = await axios.get(url, { headers });
        const storageFile = `${responseApi.data['ХранилищеДвоичныхДанных_Key']}`;
        const urlFileStorage = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_ХранилищеДвоичныхДанных(guid'${storageFile}')?$format=json`;
        const responseApiFile = await axios.get(urlFileStorage, { headers });
        const str = `data:image/jpg;base64, ${responseApiFile.data['ДвоичныеДанные_Base64Data']}`;
        productsData = {
          ...items[i],
          // thumbnail: '/assets/images/nofoto.jpg',
          thumbnail: responseApi.data && responseApiFile.data ? str : null,
          price,
          count: countProductBasket
        };
      }
      // console.log('productsDataMakeRequestsFile', productsData);
      newItems.push(productsData);
    } catch (error) {
      console.error(`Ошибка при запросе к ${items[i]}:`, error);
    }
  }
  const allReq = await Promise.all([
    Promise.all(pricesCopy),
    Promise.all(countProps),
    Promise.all(filesStorage)
  ]);
  console.timeEnd('myTimer');
  const endTime = new Date().getTime(); // Или просто Date.now()
  const duration = endTime - startTime;
  console.log(`Время выполнения: ${duration} мс`);
  // console.log('allReq', allReq);
  // console.log('filesData', filesData);
  return newItems || [];
}

async function makeRequestsFileDatabase(items) {
  console.time('myTimer');
  const startTime = new Date().getTime(); // Или просто Date.now()
  const newItems = [];
  const responseData = [];
  const fileData = [];
  let productFile = {};
  const fileUrls = [];
  const file = '/assets/images/nofoto.jpg';
  for (let i = 0; i < items.length; i++) {
    try {
      let productsData = {
        ...items[i],
        thumbnail: items[i].thumbnail ? items[i].thumbnail : file
      };
      // if (items[i].file) {
      //   const url = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/InformationRegister_ХранилищеФайлов(Файл='${items[i].file}',Файл_Type='StandardODATA.Catalog_НоменклатураПрисоединенныеФайлы')?$format=json`;
      //   const res = getRequest(url)
      //     .then(async (response) => {
      //       const storageFile = `${response.data['ХранилищеДвоичныхДанных_Key']}`;
      //       const urlFileStorage = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_ХранилищеДвоичныхДанных(guid'${storageFile}')?$format=json`;
      //       const responseApiFile = await axios.get(urlFileStorage, { headers });
      //       productFile = {
      //         ...productFile,
      //         [items[i].refKey]: {
      //           file: `data:image/jpg;base64, ${responseApiFile.data['ДвоичныеДанные_Base64Data']}`
      //         }
      //       };
      //       // fileData.push(productFile);
      //       // console.log('responseApiFile.data', responseApiFile.data);
      //       return {
      //         ...items[i],
      //         thumbnail: `data:image/jpg;base64, ${responseApiFile.data['ДвоичныеДанные_Base64Data']}`
      //       };
      //     });
      //   responseData.push(res);
      //   // const responseApi = await axios.get(url, { headers });
      //   // const storageFile = `${responseApi.data['ХранилищеДвоичныхДанных_Key']}`;
      //   // const urlFileStorage = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_ХранилищеДвоичныхДанных(guid'${storageFile}')?$format=json`;
      //   // const responseApiFile = await axios.get(urlFileStorage, { headers });
      //   // const str = `data:image/jpg;base64, ${responseApiFile.data['ДвоичныеДанные_Base64Data']}`;
      //
      //   // productsData = {
      //   //   ...items[i],
      //   //   thumbnail: responseApi.data && responseApiFile.data ? str : file
      //   // };
      // }

      // const url = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/InformationRegister_ХранилищеФайлов(Файл='${items[i]['ФайлКартинки_Key']}',Файл_Type='StandardODATA.Catalog_НоменклатураПрисоединенныеФайлы')?$format=json`;
      // const reqFiles = getRequest(url)
      //   // const reqFiles = await getRequest(url)
      //   .then((response) => {
      //     // console.log('response # 1', response.data);
      //     const storageFile = `${response.data['ХранилищеДвоичныхДанных_Key']}`;
      //     const urlFileStorage = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_ХранилищеДвоичныхДанных(guid'${storageFile}')?$format=json`;
      //     return getRequest(urlFileStorage);
      //   })
      //   .then(res => {
      //     const data = {
      //       product_id: items[i].Ref_Key,
      //       thumbnail: res.data['ДвоичныеДанные_Base64Data']
      //     };
      //     filesData.push(data);
      //     return Promise.resolve(res.data);
      //     // console.log('res # 2', res.data);
      //   });
      // filesStorage.push(reqFiles);

      newItems.push(productsData);
    } catch (error) {
      console.error(`Ошибка при запросе к ${items[i]}:`, error);
    }
  }
  // const data = await Promise.all([
  //   Promise.all(responseData)
  // ]);

  // const dataProduct = data[0];

  // console.log('data', dataProduct);

  // const resBatch = await limitedParallelRequests(fileUrls, 3, newItems);
  // console.log('resBatch', resBatch);
  // console.log('productFile', productFile);
  // const dataProduct = newItems.map(item => {
  //     return {
  //       ...item,
  //       thumbnail: productFile[item.refKey] && productFile[item.refKey].file ? productFile[item.refKey].file : file
  //     };
  //   });
  // console.log('dataProduct', dataProduct);
  // const resultData = Object.keys(productFile).map(el => {
  //   return newItems.map(item => {
  //     if (el === item.refKey) {
  //       return {
  //         ...item,
  //         thumbnail: productFile[el]
  //       };
  //     } else{
  //       return item;
  //     }
  //   });
  // });
  // console.log('resultData', data);
  // console.log('productFile', productFile);
  // console.log('makeRequestsFileDatabase', data);
  // const allReq = await Promise.all([
  //   Promise.all(pricesCopy),
  //   Promise.all(countProps),
  //   Promise.all(filesStorage)
  // ]);
  console.timeEnd('myTimer');
  const endTime = new Date().getTime(); // Или просто Date.now()
  const duration = endTime - startTime;
  console.log(`Время выполнения: ${duration} мс`);
  // console.log('allReq', allReq);
  // console.log('filesData', filesData);
  return newItems || [];
  // return dataProduct || [];
  // return newItems || [];
}

async function makeRequestsOwnerFiles(items) {
  const newItems = [];
  for (let i = 0; i < items.length; i++) {
    try {
      // const imageFile = `${baseUrl}${items[i]['ФайлКартинки@navigationLinkUrl']}?${formatResponse}`;
      // console.log('{items[i][\'ВладелецФайла_Key\']', items[i]['ВладелецФайла_Key']);
      const url = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_НоменклатураПрисоединенныеФайлы?$filter=ВладелецФайла_Key eq guid'${items[i]['ВладелецФайла_Key']}'and DeletionMark eq false&$format=json`;
      const responseApi = await axios.get(url, { headers });
      // console.log('responseApiMakeRequestsOwnerFiles', responseApi.data);
      newItems.push(responseApi.data.value);
    } catch (error) {
      console.error(`Ошибка при запросе к ${items[i]}:`, error);
    }
  }
  return newItems;
}

async function makeRequestsRegisterFiles(items) {
  const newItems = [];
  let owners = {};
  for (let i = 0; i < items.length; i++) {
    try {
      // console.log(`items${i}`, items[i]);
      const urlRegister = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/InformationRegister_ХранилищеФайлов(Файл='${items[i][0]['Ref_Key']}',Файл_Type='StandardODATA.Catalog_НоменклатураПрисоединенныеФайлы')?$format=json`;
      const responseApi = await axios.get(urlRegister, { headers });
      const urlRegisterBase64 = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_ХранилищеДвоичныхДанных(guid'${responseApi.data['ХранилищеДвоичныхДанных_Key']}')?$format=json`;
      const responseApiBase64 = await axios.get(urlRegisterBase64, { headers });
      console.log('responseApiMakeRequestsRegisterFiles', responseApi.data);
      console.log('responseApiBase64MakeRequestsRegisterFiles', responseApiBase64.data);
      // owners[items[i][0]['ВладелецФайла_Key']] = {
      //   ...items[i]
      // };
      // console.log('responseApiMakeRequestsRegisterFiles', responseApi.data);
      // newItems.push(responseApi.data);
      // console.log('owners', owners);
    } catch (error) {
      console.error(`Ошибка при запросе к ${items[i]}:`, error);
    }
  }
  // console.log('owners', owners);
  return newItems;
}

const viewCategories = (array) => {
  console.log('Math.floor(Math.random() * 2)', Math.floor(Math.random() * 2));
  const newCategoriesResults = [];
  array.forEach(item => {
    const dataObj = {
      id: item.Ref_Key,
      name: item.Description,
      icon: null,
      image: '/assets/images/icons/categories.svg',
      // image: iconsCategory[Math.floor(Math.random() * 2)],
      slug: item.Description,
      parent: [],
      description: 'Upto 60% off',
      for: {
        demo: 'grocery-2',
        type: 'top-categories'
      }
    };
    newCategoriesResults.push(dataObj);
  });
  return newCategoriesResults;
};

const viewCategoriesDatabase = (array) => {
  const newCategoriesResults = [];
  array.forEach(item => {
    const dataObj = {
      id: item.refKey,
      name: item.title,
      icon: null,
      image: '/assets/images/icons/top-categories.svg',
      // image: iconsCategory[Math.floor(Math.random() * 3)],
      slug: item.slug,
      parent: [],
      description: '',
      for: {
        demo: 'grocery-2',
        type: 'top-categories'
      }
    };
    newCategoriesResults.push(dataObj);
  });
  return newCategoriesResults;
};

const viewProduct = (product) => {
  return {
    id: product.Ref_Key,
    slug: 'premium-grocery-collection',
    shop: {
      id: '44f51c75-74b5-49f0-b5b8-9b62b4534946',
      slug: 'anytime-buys',
      user: {
        id: '88c8daa1-340c-475d-a1f1-3038951ae76d',
        email: 'Adaline_Steuber@gmail.com',
        phone: '572.876.1950',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1180.jpg',
        password: 'TfmXzIKQYEo3gKH',
        dateOfBirth: '1943-05-27T09:11:02.553Z',
        verified: true,
        name: {
          firstName: 'Ruby',
          lastName: 'Koelpin'
        }
      },
      email: 'Freda.Dach@hotmail.com',
      name: 'Anytime Buys',
      phone: '(613) 343-9004',
      address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
      verified: false,
      coverPicture: '/assets/images/banners/banner-6.png',
      profilePicture: '/assets/images/faces/propic(5).png',
      socialLinks: {
        facebook: null,
        youtube: null,
        twitter: null,
        instagram: null
      }
    },
    title: product.Description,
    comment: product['Комментарий'],
    brand: null,
    price: 188,
    size: null,
    colors: [],
    discount: 6,
    thumbnail: '/assets/images/products/Groceries/2.PremiumGroceryCollection.png',
    images: ['/assets/images/products/Groceries/2.PremiumGroceryCollection.png', '/assets/images/products/Groceries/2.PremiumGroceryCollection.png', '/assets/images/products/Groceries/2.PremiumGroceryCollection.png'],
    categories: ['groceries'],
    status: null,
    reviews: [],
    rating: 4,
    for: {
      demo: 'grocery-2',
      type: 'featured-items'
    },
    package: 5
  };
};

const viewProductsCategory = (array) => {
  const newProductsCategory = [];
  array.forEach(item => {
    const dataObj = {
      id: item.Ref_Key,
      slug: item.Ref_Key,
      count: item.count,
      shop: {
        id: 'acfa0595-3e11-4afc-a3e4-c59ddafe5ea5',
        slug: 'scarlett-beauty',
        user: {
          id: '15e04e05-4446-4a3f-954f-4995ee9cd706',
          email: 'Valentine10@gmail.com',
          phone: '(644) 648-8515 x03713',
          avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1203.jpg',
          password: 'tCcmXOtawl_2QD3',
          dateOfBirth: '1976-08-28T14:44:08.160Z',
          verified: true,
          name: {
            firstName: 'Emelie',
            lastName: 'Rogahn'
          }
        },
        email: 'Woodrow.Dietrich51@yahoo.com',
        name: 'Scarlett Beauty',
        phone: '(613) 343-9004',
        address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
        verified: false,
        coverPicture: '/assets/images/banners/cycle.png',
        profilePicture: '/assets/images/faces/propic.png',
        socialLinks: {
          facebook: null,
          youtube: null,
          twitter: null,
          instagram: null
        }
      },
      title: item.Description,
      comment: item['Комментарий'],
      brand: null,
      price: item.price,
      size: null,
      colors: [],
      discount: 0,
      thumbnail: item.thumbnail,
      // thumbnail: '/assets/images/products/Automotive/1.Ford2019.png',
      images: ['/assets/images/products/Automotive/1.Ford2019.png', '/assets/images/products/Automotive/1.Ford2019.png'],
      categories: ['automotive'],
      status: null,
      reviews: [],
      rating: 4,
      unit: 'kg'
    };
    newProductsCategory.push(dataObj);
  });
  return newProductsCategory;
};

export const viewProductsCategoryDataBae = (array) => {
  const newProductsCategory = [];
  array.forEach(item => {
    const dataObj = {
      id: item.refKey,
      _id: item._id,
      slug: item.slug,
      parent: item.parent,
      count: item.multiplicity,
      shop: {
        id: 'acfa0595-3e11-4afc-a3e4-c59ddafe5ea5',
        slug: 'scarlett-beauty',
        user: {
          id: '15e04e05-4446-4a3f-954f-4995ee9cd706',
          email: 'Valentine10@gmail.com',
          phone: '(644) 648-8515 x03713',
          avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1203.jpg',
          password: 'tCcmXOtawl_2QD3',
          dateOfBirth: '1976-08-28T14:44:08.160Z',
          verified: true,
          name: {
            firstName: 'Emelie',
            lastName: 'Rogahn'
          }
        },
        email: 'Woodrow.Dietrich51@yahoo.com',
        name: 'Scarlett Beauty',
        phone: '(613) 343-9004',
        address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
        verified: false,
        coverPicture: '/assets/images/banners/cycle.png',
        profilePicture: '/assets/images/faces/propic.png',
        socialLinks: {
          facebook: null,
          youtube: null,
          twitter: null,
          instagram: null
        }
      },
      title: item.title,
      comment: item.description,
      brand: null,
      price: item.price,
      size: null,
      colors: [],
      discount: 0,
      thumbnail: item.thumbnail ? item.thumbnail : '/assets/images/nofoto.jpg',
      // thumbnail: '/assets/images/products/Automotive/1.Ford2019.png',
      images: ['/assets/images/products/Automotive/1.Ford2019.png', '/assets/images/products/Automotive/1.Ford2019.png'],
      categories: ['automotive'],
      status: null,
      reviews: [],
      rating: 4,
      unit: 'kg'
    };
    newProductsCategory.push(dataObj);
  });
  return newProductsCategory;
};

function arrayToTree(items) {
  const newItem = {};
  const roots = [];
  const resultRoots = [];

  // Сначала создаём все узлы и сохраняем их в newItem по id
  items.forEach(item => {
    newItem[item.Ref_Key] = { ...item, children: [] };
  });

  // Затем проходимся второй раз, чтобы построить дерево
  items.forEach(item => {
    const node = newItem[item.Ref_Key];

    if (item.Parent_Key && newItem[item.Parent_Key]) {
      newItem[item.Parent_Key].children.push(node);
    } else {
      roots.push(node);
    }
  });

  roots.forEach(item => {
    if (item.Parent_Key === '00000000-0000-0000-0000-000000000000') {
      resultRoots.push(item);
    }
  });
  return resultRoots;
  // return roots;
}

const getServices = cache(async () => {
  const response = await axios.get('/api/grocery-2/services');
  return response.data;
});

const getCategories = cache(async () => {
  const uerName = 'odata.user';
  const password = 'Uz5FFx=k\\W–1q]Knn';
  const credentials = `${uerName}:${password}`;
  // const base64Credentials = btoa(credentials);
  // const headers = {
  //   'Authorization': `Basic b2RhdGEudXNlcjpVejVGRng9a1xX4oCTMXFdSw==`
  // };
  const response = await startLoadCategory(routes.rootCategories);
  // console.log('response', response);
// начало запроса Odata 1c
  // const url = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_Номенклатура?$filter=IsFolder eq true and DeletionMark eq false and startswith(Description, \'Я_\') eq false&$select=${selectProps}&$format=json`;
  // const responseApi = await axios.get(url, { headers: headers });
  // конец запроса Odata 1c
  // console.log(response);
  // const categoriesApi = arrayToTree(responseApi.data.value);
  // console.log('viewCategories(categoriesApi)', viewCategories(categoriesApi));
  if (response && response.categories) {
    return viewCategoriesDatabase(response.categories);
  }
  // return viewCategories(categoriesApi);

  //
  // const newCategoriesResults = [];
  // categoriesApi.forEach(item => {
  //   const dataObj = {
  //     id: item.Ref_Key,
  //     name: item.Description,
  //     icon: null,
  //     image: iconsCategory[Math.floor(Math.random() * 5)],
  //     slug: item.Description,
  //     parent: [],
  //     description: 'Upto 60% off',
  //     for: {
  //       demo: 'grocery-2',
  //       type: 'top-categories'
  //     }
  //   };
  //   newCategoriesResults.push(dataObj);
  // });
  // return newCategoriesResults;
  // categoriesApi.forEach(item => {
  //   item.children.forEach(i => {
  //     console.log('itemRes', i);
  //   });
  // });
  // console.log('categoriesApi', categoriesApi);
  // console.log('categoriesApi lenght', categoriesApi.length);
  // const response = await axios.get('/api/grocery-2/categories');
  // return response.data;
});

const getCategoriesId = cache(async (param) => {
  console.log('param', param);
  const password = 'Uz5FFx=k\\W–1q]Knn';
  // const credentials = `${uerName}:${password}`;
  // const base64Credentials = btoa(credentials);
  // const headers = {
  //   'Authorization': `Basic J29kYXRhLnVzZXInOidVejVGRng9a1xX4oCTMXFdS25uLyc=`
  // };
  const response = await startLoadCategory(`${routes.categories}/${param}`);
  console.log('response найти всех по refkey', response);
  // const url = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_Номенклатура?$filter=Parent_Key eq guid'${param}' and IsFolder eq true and DeletionMark eq false and startswith(Description, 'Я_') eq false&$select=${selectProps}&$format=json`;
  // const responseApi = await axios.get(url, { headers: headers });
  // console.log('responseApi', responseApi);
  // const categoriesApi = arrayToTree(responseApi.data.value);
  // const newCategoriesResults = [];
  // categoriesApi.forEach(item => {
  //   const dataObj = {
  //     id: item.Ref_Key,
  //     name: item.Description,
  //     icon: null,
  //     image: iconsCategory[Math.floor(Math.random() * 5)],
  //     slug: item.Description,
  //     parent: [],
  //     description: 'Upto 60% off',
  //     for: {
  //       demo: 'grocery-2',
  //       type: 'top-categories'
  //     }
  //   };
  //   newCategoriesResults.push(dataObj);
  // });
  return {
    categories: viewCategoriesDatabase(response.categories),
    parentCategory: response.parentCategory
  }
  // return viewCategories(responseApi.data.value);
});

const getCategoryProducts = cache(async (categoryId, page) => {
  try {
    // console.log('getCategoryProducts', categoryId);
    const uerName = 'odata.user';
    // const credentials = `${uerName}:${password}`;
    // const base64Credentials = btoa(credentials);
    // const headers = {
    //   'Authorization': `Basic b2RhdGEudXNlcjpVejVGRng9a1xX4oCTMXFdSw==`
    // };
    console.log('categoryId, page', categoryId, page);
    const response = await startLoadCategory(`${routes.products}/${categoryId}?page=${page}`);
    // console.log('response', response);

    // const urProductsCategory = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_Номенклатура?$filter=Parent_Key eq guid'${categoryId}' and IsFolder eq false and DeletionMark eq false&$select=${selectProductProps}&$format=json`;
    // const responseApiProductsCategory = await axios.get(urProductsCategory, { headers: headers });
    // ФайлКартинки_Key
    // console.log('responseApiProductsCategory.data.value', responseApiProductsCategory.data.value);
    const products = await makeRequestsFileDatabase(response.products);
    // console.log('products', products);

    const imgUrl = products[0].thumbnail;
    // console.log('imgUrl', imgUrl);
    // .then(res => {
    //   console.log(res.data);
    // })
    // .catch(error => {
    //   console.log(`Ошибка загрузки изображения ${products[0].thumbnail}`, error);
    // });

    // console.log('products', products);
    // const products = await makeRequestsFile(responseApiProductsCategory.data.value);
    // Можно отдать категорию из выше запроса


    // console.log('productsGetCategoryProducts', products);
    // const ownerFiles = await makeRequestsOwnerFiles(files);
    // const registerFiles = await makeRequestsRegisterFiles(ownerFiles);


    // const ownerUrl = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_НоменклатураПрисоединенныеФайлы?$filter=ВладелецФайла_Key eq guid${ownerID}&$format=json`;
    // console.log('files', files);
    // console.log('registerFiles', registerFiles);

    // products.filter(item => {
    //   if (item['ФайлКартинки@navigationLinkUrl']){
    //     getRequest(item);
    //     // const imageFile = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/${item['ФайлКартинки@navigationLinkUrl']}?$format=json`;
    //     // const responseApiProductsCategory = await axios.get(imageFile, { headers: headers });
    //     // console.log('responseApiProductsCategory', responseApiProductsCategory.data.value);
    //     // ВладелецФайла_Key
    //     // разширение указать
    //   }
    // });
    // console.log('products', products);
    // const responseApi = await axios.get(url, { headers: headers });
    // console.log('responseApigetCategoryProducts', responseApi);
    // console.log('responseApiProductsCategory', responseApiProductsCategory);
    // return [];
    // console.log('viewProductsCategoryDataBae(products)', viewProductsCategoryDataBae(products));
    return {
      products: viewProductsCategoryDataBae(products),
      countCollection: response.countCollection
    };
  } catch (e) {
    console.log('error', e);
  }

  // console.log('responseApi', responseApi);
  // const categoriesApi = arrayToTree(responseApi.data.value);
  // const newCategoriesResults = [];
  // categoriesApi.forEach(item => {
  //   const dataObj = {
  //     id: item.Ref_Key,
  //     name: item.Description,
  //     icon: null,
  //     image: iconsCategory[Math.floor(Math.random() * 5)],
  //     slug: item.Description,
  //     parent: [],
  //     description: 'Upto 60% off',
  //     for: {
  //       demo: 'grocery-2',
  //       type: 'top-categories'
  //     }
  //   };
  //   newCategoriesResults.push(dataObj);
  // });
});

const getSearchProducts = cache(async (title, page = 1) => {
  try {
    console.log('title, page', title, page);
    const response = await startLoadSearch(`${routes.products}/search/?title=${title}&page=${page}`);
    // console.log('getSearchProductsResponse', response);

    // const urProductsCategory = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_Номенклатура?$filter=Parent_Key eq guid'${categoryId}' and IsFolder eq false and DeletionMark eq false&$select=${selectProductProps}&$format=json`;
    // const responseApiProductsCategory = await axios.get(urProductsCategory, { headers: headers });
    // ФайлКартинки_Key
    // console.log('responseApiProductsCategory.data.value', responseApiProductsCategory.data.value);
    // const products = await makeRequestsFileDatabase(response.products);
    // console.log('products', products);

    // const imgUrl = products[0].thumbnail;
    // console.log('imgUrl', imgUrl);
    // .then(res => {
    //   console.log(res.data);
    // })
    // .catch(error => {
    //   console.log(`Ошибка загрузки изображения ${products[0].thumbnail}`, error);
    // });

    // console.log('products', products);
    // const products = await makeRequestsFile(responseApiProductsCategory.data.value);
    // Можно отдать категорию из выше запроса


    // console.log('productsGetCategoryProducts', products);
    // const ownerFiles = await makeRequestsOwnerFiles(files);
    // const registerFiles = await makeRequestsRegisterFiles(ownerFiles);


    // const ownerUrl = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_НоменклатураПрисоединенныеФайлы?$filter=ВладелецФайла_Key eq guid${ownerID}&$format=json`;
    // console.log('files', files);
    // console.log('registerFiles', registerFiles);

    // products.filter(item => {
    //   if (item['ФайлКартинки@navigationLinkUrl']){
    //     getRequest(item);
    //     // const imageFile = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/${item['ФайлКартинки@navigationLinkUrl']}?$format=json`;
    //     // const responseApiProductsCategory = await axios.get(imageFile, { headers: headers });
    //     // console.log('responseApiProductsCategory', responseApiProductsCategory.data.value);
    //     // ВладелецФайла_Key
    //     // разширение указать
    //   }
    // });
    // console.log('products', products);
    // const responseApi = await axios.get(url, { headers: headers });
    // console.log('responseApigetCategoryProducts', responseApi);
    // console.log('responseApiProductsCategory', responseApiProductsCategory);
    // return [];
    // console.log('viewProductsCategoryDataBae(products)', viewProductsCategoryDataBae(products));
    return {
      products: viewProductsCategoryDataBae(response.products),
      countCollection: response.countCollection
    };
  } catch (e) {
    console.log('error', e);
  }

  // console.log('responseApi', responseApi);
  // const categoriesApi = arrayToTree(responseApi.data.value);
  // const newCategoriesResults = [];
  // categoriesApi.forEach(item => {
  //   const dataObj = {
  //     id: item.Ref_Key,
  //     name: item.Description,
  //     icon: null,
  //     image: iconsCategory[Math.floor(Math.random() * 5)],
  //     slug: item.Description,
  //     parent: [],
  //     description: 'Upto 60% off',
  //     for: {
  //       demo: 'grocery-2',
  //       type: 'top-categories'
  //     }
  //   };
  //   newCategoriesResults.push(dataObj);
  // });
});

const getImagesBase64 = cache(async () => {
  const req = 'https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_ХранилищеДвоичныхДанных(guid\'b205ca32-5ef6-11ef-9363-fa163eb77d5d\')?$format=json';
  const responseApi = await axios.get(req, { headers: headers });
  // console.log('getImagesBase64', responseApi.data.value);
  return responseApi.data['ДвоичныеДанные_Base64Data'];
});

const getProductsId = cache(async (productId) => {
  try {
    // console.log('ProductsId', productId);
    const uerName = 'odata.user';
    // const credentials = `${uerName}:${password}`;
    // const base64Credentials = btoa(credentials);
    // const headers = {
    //   'Authorization': `Basic b2RhdGEudXNlcjpVejVGRng9a1xX4oCTMXFdSw==`
    // };

    const url = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_Номенклатура?$filter=Ref_Key eq guid'${productId}' and IsFolder eq false and DeletionMark eq false&$format=json`;
    const responseApi = await axios.get(url, { headers: headers });
    // console.log('responseProductsId', responseApi.data.value);
    // return viewProductsCategory(responseApi.data.value);
    return viewProduct(responseApi.data.value.length && responseApi.data.value[0]);
  } catch (e) {
    console.log('error', e);
  }

  // console.log('responseApi', responseApi);
  // const categoriesApi = arrayToTree(responseApi.data.value);
  // const newCategoriesResults = [];
  // categoriesApi.forEach(item => {
  //   const dataObj = {
  //     id: item.Ref_Key,
  //     name: item.Description,
  //     icon: null,
  //     image: iconsCategory[Math.floor(Math.random() * 5)],
  //     slug: item.Description,
  //     parent: [],
  //     description: 'Upto 60% off',
  //     for: {
  //       demo: 'grocery-2',
  //       type: 'top-categories'
  //     }
  //   };
  //   newCategoriesResults.push(dataObj);
  // });
});

const getDiscountBannerList = cache(async () => {
  const response = await axios.get('/api/grocery-2/discount-card-list');
  return response.data;
});
const getNavigationList = cache(async () => {
  const response = await axios.get('/api/grocery-2/category-navigation');
  return response.data;
});
const getFeaturedProducts = cache(async () => {
  const response = await axios.get('/api/grocery-2/featured-products');
  return response.data;
});
const getBestSellProducts = cache(async () => {
  const response = await axios.get('/api/grocery-2/best-sell-products');
  return response.data;
});
const getBestHomeProducts = cache(async () => {
  const response = await axios.get('/api/grocery-2/home-essentials-products');
  return response.data;
});
const getDairyProducts = cache(async () => {
  const response = await axios.get('/api/grocery-2/more-products');
  return response.data;
});
const getTestimonials = cache(async () => {
  const response = await axios.get('/api/grocery-2/testimonial-list');
  return response.data;
});
const getMainCarousel = cache(async () => {
  const response = await axios.get('/api/grocery-2/main-carousel');
  return response.data;
});
export default {
  getServices,
  getCategories,
  getTestimonials,
  getMainCarousel,
  getDairyProducts,
  getNavigationList,
  getFeaturedProducts,
  getBestSellProducts,
  getBestHomeProducts,
  getDiscountBannerList,
  getCategoriesId,
  getCategoryProducts,
  getProductsId,
  getImagesBase64,
  getSearchProducts
};
