import axios from 'axios';
import slugify from "slugify";

const headers = {
    'Authorization': `Basic b2RhdGEudXNlcjpVejVGRng9a1xX4oCTMXFdS25u`
};

async function getRequest(url) {
    return await axios.get(new URL(url).toString(), { headers });
}

const limitedParallelRequests = async (urls, limit, productsData, param, items, retries = 3, delay = 1000) => {
    const results = [];
    const promises = [];
    for (const url of urls) {
        const makeRequestWithRetry = async (url, retries = 3, delay = 1000) => {
            const promise = axios.get(new URL(url).toString(), { headers })
                .then(response => {
                    const data = response.data.value[0];
                    const key = data['Номенклатура_Key'];
                    const price = data['Цена'];
                    productsData[key].price = price;
                    results.push(response.data.value ? response.data.value : response.data);
                })
                .catch(async (error) => {
                    console.error(`Ошибка запроса по URL ${url}:`, error);
                    if (retries === 0) {
                        throw error; // Отбросить ошибку, если попытки закончились
                    }
                    await new Promise(resolve => setTimeout(resolve, delay));
                    return await makeRequestWithRetry(url, retries - 1, delay); // Рекурсивный вызов с уменьшением количества попыток
                });
            promises.push(promise);
        };
        await makeRequestWithRetry(url)
            .then(response => {
                console.log('Запрос успешен:', response);
            });
        // makeRequestWithRetry();
        if (promises.length >= limit) {
            await Promise.all(promises);
            promises.length = 0; // Очищаем массив для следующей пачки
        }
    }
    await Promise.all(promises); // Ждём завершения оставшихся запросов
    return results;
};


const getSlug = (title) => {
    const slug = slugify(title, {
        lower: true
    });
    const randomString = ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
    return `${slug}-${randomString}`;
}

async function makeRequestsFile(items) {
    const arr1 = [];
    const arr2 = [];
    const productsData = {};
    for (let i = 0; i < items.length; i++) {
        productsData[items[i].Ref_Key.toString()] = {
            title: items[i]['Description'],
            description: items[i]['Комментарий'],
            parent: items[i]['Parent_Key'].toString(),
            parentKey: items[i]['Parent_Key'].toString(),
            measurement: 'шт.',
            slug: getSlug(items[i]['Description']),
            price: 1,
            multiplicity: 1,
            file: items[i]['ФайлКартинки_Key'].toString()
        };
        try {
            const productPriceUrl: string = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/InformationRegister_ЦеныНоменклатуры?$filter=Номенклатура_Key eq guid'${items[i]['Ref_Key']}' and ВидЦен_Key eq guid'dff4e03c-5920-11ed-85c9-fa163e5d098a'&$orderby=Period desc&$select=Цена,Номенклатура_Key&$format=json`;
            arr1.push(productPriceUrl);

            if (items[i]['ДополнительныеРеквизиты'] && items[i]['ДополнительныеРеквизиты'].length >= 1) {
                const propsProduct = items[i]['ДополнительныеРеквизиты'][0]['Значение'];
                const countProductUrl = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_ЗначенияСвойствОбъектов?$filter=Ref_Key eq guid'${propsProduct}'&$select=Description,Ref_Key&$format=json`;
                const countProduct = getRequest(countProductUrl)
                    .then(res => {
                        const count = res.data.value[0];
                        productsData[items[i].Ref_Key].multiplicity = parseInt(count['Description']);
                        return Promise.resolve(res.data);
                    })
                    .catch(error => {
                        // console.log('произошла ошибка в запросе ДополнительныеРеквизиты', error);
                        // console.log('items[i]', items[i]);
                        // console.log('propsProduct', propsProduct);
                    });
                arr2.push(countProduct);
            }

            if (items[i]['ФайлКартинки_Key'] === '00000000-0000-0000-0000-000000000000') {
                // 00000000-0000-0000-0000-000000000000 если нет картинки
                // productsData = {
                //     ...items[i],
                //     thumbnail:  'https://cdn-icons-png.flaticon.com/512/4054/4054617.png',
                //     price: product[0]['Цена'] ? productPrice.data.value[0]['Цена'].toFixed(2) : 0,
                //     count: countProductBasket
                // };
            } else {
                const url = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/InformationRegister_ХранилищеФайлов(Файл='${items[i]['ФайлКартинки_Key']}',Файл_Type='StandardODATA.Catalog_НоменклатураПрисоединенныеФайлы')?$format=json`;
                // const reqFiles = getRequest(url)
                //     .then((response) => {
                //         // console.log('response # 1', response.data);
                //         const storageFile = `${response.data['ХранилищеДвоичныхДанных_Key']}`;
                //         const urlFileStorage = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_ХранилищеДвоичныхДанных(guid'${storageFile}')?$format=json`;
                //         return getRequest(urlFileStorage)
                //     })
                //     .then(res => {
                //         const data = {
                //             product_id: items[i].Ref_Key,
                //             thumbnail: res.data['ДвоичныеДанные_Base64Data']
                //         };
                //         filesData.push(data);
                //         console.log('--files--');
                //         return res.data;
                //         // console.log('res # 2', res.data);
                //     });
                // filesStorage.push(reqFiles);
                //
                // console.log('reqFiles', reqFiles);
                // const responseApi = await getRequest(url);
                // allReq.filesStorage.push(url);
                // const storageFile = `${responseApi.data['ХранилищеДвоичныхДанных_Key']}`;
                // const urlFileStorage = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_ХранилищеДвоичныхДанных(guid'${storageFile}')?$format=json`;
                // const responseApiFile = await getRequest(urlFileStorage);
                // const str = `data:image/jpg;base64, ${responseApiFile.data['ДвоичныеДанные_Base64Data']}`;
                // productsData = {
                //     ...items[i],
                //     thumbnail: responseApi.data && responseApiFile.data ? str : null,
                //     price: product[0]['Цена'] ? productPrice.data.value[0]['Цена'].toFixed(2) : 0,
                //     count: countProductBasket
                // };
            }
            // newItems.push(productPrice.data.value);
            // newItems.push(productsData);
        } catch (error) {
            console.error(`Ошибка при запросе к ${items[i]}:`, error);
        }
    }
    // console.log('allReq', allReq);
    // const res: any = await fetchAllData(allReq);
    // const allReq = await Promise.all([
    //     Promise.all(pricesCopy),
    //     Promise.all(countProps),
    //     // Promise.all(filesStorage)
    // ]);
    const resBacth1 = await limitedParallelRequests(arr1, 100, productsData, 'price', items);
    // const resBacth2 = await limitedParallelRequests(arr2, 100, productsData, 'multiplicity', items);
    await Promise.all([
        // limitedParallelRequests(arr1, 100, productsData, 'price', items),
        // limitedParallelRequests(arr2, 100, productsData, 'multiplicity', items)
        Promise.all(arr2)
    ]);
    // console.log('resBacth1', resBacth1);
    // console.log('resBacth2', resBacth2);
    //
    // const countReq = resBacth1.map(el => el[0]);
    // const countReq2 = resBacth2.map(el => el[0]);
    // console.log('countReq', countReq);
    const data = Object
        .keys(productsData)
        .map(el => {
            return {
                refKey: el,
                title: productsData[el].title,
                description: productsData[el].description,
                parentKey: productsData[el].parent,
                parent: productsData[el].parent,
                measurement: productsData[el].measurement,
                slug: productsData[el].slug,
                price: productsData[el].price,
                multiplicity: productsData[el].multiplicity,
                file: productsData[el].file === '00000000-0000-0000-0000-000000000000' ? null : productsData[el].file,
                thumbnail: productsData[el].file === '00000000-0000-0000-0000-000000000000' ? null : `https://upack.storage.yandexcloud.net/folder_products_images/${el}.jpg`

                // https://upack.storage.yandexcloud.net/folder_products_images/a3d299a6-812e-11ed-89fe-fa163eb77d5d.jpg'
            }
        });
    // console.log('data', data);
    // console.log('productsData', productsData['b8990f36-ae59-11f0-8916-fa163eb77d5d']);
    // console.log('productsData', productsData['9d979f44-c03b-11ee-8336-fa163eb77d5d']);
    // console.log('productsData', productsData['e99b59f2-4823-11ee-84d1-fa163eb77d5d']);

    // const filesR = await Promise.all([
    //     Promise.all(filesStorage)
    // ]);
    // console.log('allReq', allReq);
    // console.log('filesR', filesR);
    // console.log('filesR', filesR);
    // const res: any = await limitedParallelRequests(prices, 50);
    // console.log('limitedParallelRequestsRes', res);
    // const productPrice = res[0].map(el => {
    //     // console.log('el.data', el.data);
    //     return el.data;
    // });
    // const productCount = res[1].filter(el => el.data);
    // const productFileStorage = res[2].filter(el => el.data);
    // console.log('productPrice', productPrice);
    // console.log('productCount', productCount);
    // console.log('productFileStorage', productFileStorage);

    // await limitedParallelRequests(urls, 5)
    //     .then(responses => {
    //         let productResult = {};
    //         responses.forEach(el => {
    //             items.forEach(item => {
    //                 el.value.forEach(e => {
    //                     if(item.Ref_Key === e['Номенклатура_Key']){
    //                         productResult = {
    //                             id: item.Ref_Key,
    //                             price: e['Цена'].toFixed(2),
    //                             deletionMark: item.DeletionMark,
    //                             parent_key: item.Parent_Key,
    //                             title: item.Description,
    //                             article: item['Артикул'],
    //                             description: item['Комментарий'],
    //                             slug: getSlug(item.Description),
    //                             file_id: item['ФайлКартинки_Key'],
    //                             additionalProps: item['ДополнительныеРеквизиты']
    //                         }
    //                     }
    //                 });
    //             });
    //             productsItems.push(productResult);
    //         });
    //         // return productResult;
    //     })
    //     .then(res => {
    //         console.log('productsItems', productsItems)
    //     });
    // Начало доп реквизит
    // await limitedParallelRequests(urlsCount, 5)
    //     .then(responses => {
    //         console.log('responsesДопРеквизит', responses);
    //         const filterArray = responses.map(el => {
    //             return el.value[0];
    //         });
    //         console.log('filterArray', filterArray)
    //         // let productResult = {};
    //         // responses.forEach(el => {
    //         //     items.forEach(item => {
    //         //         el.value.forEach(e => {
    //         //             if(item.Ref_Key === e['Номенклатура_Key']){
    //         //                 productResult = {
    //         //                     id: item.Ref_Key,
    //         //                     price: e['Цена'].toFixed(2),
    //         //                     deletionMark: item.DeletionMark,
    //         //                     parent_key: item.Parent_Key,
    //         //                     title: item.Description,
    //         //                     article: item['Артикул'],
    //         //                     description: item['Комментарий'],
    //         //                     slug: getSlug(item.Description),
    //         //                     file_id: item['ФайлКартинки_Key'],
    //         //                     additionalProps: item['ДополнительныеРеквизиты']
    //         //                 }
    //         //             }
    //         //         });
    //         //     });
    //         //     productsItems.push(productResult);
    //         // });
    //         // return productResult;
    //     });
    // Конец доп реквизит
    // console.timeEnd('myTimer');
    // const endTime = new Date().getTime(); // Или просто Date.now()
    // const duration = endTime - startTime;
    // console.log(`Время выполнения: ${duration} мс`);
    // return newItems;
    return data;
}

const selectProps = 'Ref_Key,IsFolder,DeletionMark,Description,Parent_Key';
const selectProductProps = 'Ref_Key,Description,Комментарий,IsFolder,DeletionMark,Parent_Key,ЕдиницаИзмерения,ФайлКартинки_Key,ДополнительныеРеквизиты';

export async function getRefresh() {
    // отсчет времени начало
    console.time('myTimer');
    const startTime = new Date().getTime(); // Или просто Date.now()
    // отсчет времени начало
    const categories = [];
    const url = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_Номенклатура?$filter=IsFolder eq true and DeletionMark eq false and startswith(Description, 'Я_') eq false&$select=${selectProps}&$format=json`;
    const urProducts = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_Номенклатура?$filter=IsFolder eq false and DeletionMark eq false&$select=${selectProductProps}&$format=json`;
    await getRequest(url)
        .then(res => {
            res.data.value.forEach(el => {
                const data = {
                    refKey: el.Ref_Key.toString(),
                    title: el['Description'],
                    slug: getSlug(el['Description']),
                    parent: el.Parent_Key.toString()
                    // parentKey: el.Parent_Key.toString()
                };
                categories.push(data);
            });
        })
        .catch(error => {
            console.log('произошла ошибка в запросе responseApiCategories', error);
        });
    // const products = [];
    const responseApiProducts = await getRequest(urProducts)
        .then(res => res.data.value)
        .catch(error => {
            console.log('произошла ошибка в запросе responseApiProducts', error);
        });
    const products = await makeRequestsFile(responseApiProducts);
    // console.log('products', products);

    // отсчет времени конец
    console.timeEnd('myTimer');
    const endTime = new Date().getTime(); // Или просто Date.now()
    const duration = endTime - startTime;
    console.log(`Время выполнения: ${duration} мс`);
    // отсчет времени конец


    // console.log('categoriesDb', categoriesDb);
    // console.log('responseApiCategory', responseApiCategory);
    // const responseApiProducts = await getRequest(urProducts);
    // console.log('responseApiCategory', responseApiCategory)
    // console.log('responseApiProducts', responseApiProducts);
    // const allReq = await Promise.all([getRequest(url), getRequest(urProducts)]);
    // console.log('allReq', allReq);
    // const products = await makeRequestsFile(responseApiProducts.data.value);
    // console.log('products', products);

    // const category = viewCategories(responseApiCategory.data.value);
    // return category;
    return {
        categories,
        products
    };
}
