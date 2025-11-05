import axios from 'axios';
import * as fs from 'fs';

let EasyYandexS3 = require('easy-yandex-s3').default;
import { join } from 'path';
import { Schema } from "mongoose";

export let s3 = new EasyYandexS3({
    auth: {
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey
    },
    Bucket: 'upack', // Название бакета
    debug: false // Дебаг в консоли
});

const getBase64ToBuffer = base64 => {
    const ptopStr = 'base64,';
    const indexOfStr = base64.indexOf(ptopStr);
    const sliceStr = base64.slice(indexOfStr + ptopStr.length);
    return Buffer.from(sliceStr.trim(), "base64");
};

const fileStorage = async (file, key) => {
    let upload = await s3.Upload(
        {
            buffer: file,
            name: `${key}.jpg`
        },
        '/folder_products_images/'
    );
    return upload;
};

const fileArrayStorage = async (files) => {
    let upload = await s3.Upload(
        files,
        '/folder_products_images/'
    );
    return upload;
};

// async function compressImageBuffer(inputBuffer, quality = 80) {
//     try {
//         const compressedBuffer = await sharp(inputBuffer)
//             .jpeg({
//                 quality: quality, // Установка качества сжатия (от 1 до 100, по умолчанию 80)
//                 chromaSubsampling: '4:4:4', // Дополнительные опции для лучшего качества при высоком сжатии
//                 mozjpeg: true // Использование mozjpeg для уменьшения размера файла (медленнее)
//             })
//             .toBuffer(); // Получение сжатого изображения в виде буфера
//
//         console.log('Изображение успешно сжато в буфер.');
//         return compressedBuffer;
//     } catch (error) {
//         console.error('Ошибка при сжатии изображения:', error);
//         throw error;
//     }
// }


export class FileService {
    private readonly filePath = join(process.cwd(), 'productImages.json'); // Путь к файлу

    async writeJson(data: any): Promise<void> {
        try {
            // Преобразование объекта в строку JSON. Параметры null, 2 для форматирования с отступами.
            const jsonString = JSON.stringify(data, null, 2);

            // Асинхронная запись строки в файл
            await fs.promises.writeFile(this.filePath, jsonString, 'utf8');
            console.log('Данные успешно записаны в productImages.json');
        } catch (error) {
            console.error('Ошибка записи файла:', error);
            throw new Error('Не удалось записать данные в файл');
        }
    }

    async readJson(): Promise<any> {
        try {
            // Асинхронное чтение содержимого файла как строки
            const jsonString = await fs.promises.readFile(this.filePath, 'utf8');

            // Преобразование строки JSON в JavaScript-объект
            const data = JSON.parse(jsonString);
            return data;
        } catch (error) {
            console.error('Ошибка чтения файла:', error);
            // Можно вернуть значение по умолчанию или выбросить ошибку
            return null;
        }
    }
}

const headers = {
    'Authorization': `Basic b2RhdGEudXNlcjpVejVGRng9a1xX4oCTMXFdS25u`
};

async function getRequest(url) {
    return await axios.get(new URL(url).toString(), { headers });
}

const limitedParallelRequests = async (urls, limit, productsData, param, items) => {
    const results = [];
    const promises = [];
    for (const url of urls) {
        const promise = axios.get(new URL(url).toString(), { headers })
            .then(response => {
                results.push(response.data.value ? response.data.value : response.data);
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

// const limitedParallelRequests = async (urls, limit, productsData, param, items) => {
//     const results = [];
//     const promises = [];
//     for (const url of urls) {
//         const promise = axios.get(new URL(url).toString(), { headers })
//             .then(response => {
//                 results.push(response.data.value ? response.data.value : response.data);
//             })
//             .catch(error => {
//                 console.error(`Ошибка запроса по URL ${url}:`, error);
//             });
//         promises.push(promise);
//         if (promises.length >= limit) {
//             await Promise.all(promises);
//             promises.length = 0; // Очищаем массив для следующей пачки
//         }
//     }
//     await Promise.all(promises); // Ждём завершения оставшихся запросов
//     return results;
// };

async function makeRequestsFile(items) {
    const storageData = [];
    const responseData = [];
    const file = '/assets/images/nofoto.jpg';
    const productsDataLoad = {};
    for (let i = 0; i < items.length; i++) {
        // let productsData = {
        //     ...items[i],
        //     thumbnail: file
        // };
        const current = items[i];
        productsDataLoad[current.refKey] = {
            title: current.title,
            description: current.description,
            parent: current.parent,
            measurement: current.measurement,
            slug: current.slug,
            price: current.price,
            multiplicity: current.multiplicity,
            file: current.file,
            thumbnail: file
        };
        try {
            if (items[i].file) {
                const makeRequestWithRetry = async (item, retries = 3, delay = 1000) => {
                    const url = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/InformationRegister_ХранилищеФайлов(Файл='${item.file}',Файл_Type='StandardODATA.Catalog_НоменклатураПрисоединенныеФайлы')?$format=json`;
                    await getRequest(url)
                        .then(async (response) => {
                            const storageFile = `${response.data['ХранилищеДвоичныхДанных_Key']}`;
                            const urlFileStorage = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_ХранилищеДвоичныхДанных(guid'${storageFile}')?$format=json`;
                            const responseApiFile = await getRequest(urlFileStorage);
                            console.log('indexApi', i);
                            const key = items[i].refKey;
                            const base64 = responseApiFile.data['ДвоичныеДанные_Base64Data'];
                            const currentDataFile = {
                                buffer: Buffer.from(base64.trim(), "base64"),
                                name: `${key}.jpg`
                            };
                            storageData.push(currentDataFile);
                            // productsDataLoad[item.refKey].thumbnail = `data:image/jpg;base64, ${responseApiFile.data['ДвоичныеДанные_Base64Data']}`;
                            // return {
                            //     refKey: current.refKey,
                            //     title: current.title,
                            //     description: current.description,
                            //     parent: current.parent,
                            //     measurement: current.measurement,
                            //     slug: current.slug,
                            //     price: current.price,
                            //     multiplicity: current.multiplicity,
                            //     file: current.file,
                            //     thumbnail: `data:image/jpg;base64, ${responseApiFile.data['ДвоичныеДанные_Base64Data']}`
                            // };
                            return true
                        })
                        .catch(async (error) => {
                            console.error(`Ошибка запроса по URL ${url}:`, error);
                            if (retries === 0) {
                                throw error; // Отбросить ошибку, если попытки закончились
                            }
                            await new Promise(resolve => setTimeout(resolve, delay));
                            return await makeRequestWithRetry(item, retries - 1, delay); // Рекурсивный вызов с уменьшением количества попыток
                        });
                };
                responseData.push(await makeRequestWithRetry(items[i]));
            }
            // if (items[i].file) {
            //     const url = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/InformationRegister_ХранилищеФайлов(Файл='${items[i].file}',Файл_Type='StandardODATA.Catalog_НоменклатураПрисоединенныеФайлы')?$format=json`;
            //     const res = getRequest(url)
            //         .then(async (response) => {
            //             const storageFile = `${response.data['ХранилищеДвоичныхДанных_Key']}`;
            //             const urlFileStorage = `https://1cfresh.com/a/sbm/2010500/odata/standard.odata/Catalog_ХранилищеДвоичныхДанных(guid'${storageFile}')?$format=json`;
            //             const responseApiFile = await getRequest(urlFileStorage);
            //             const current = items[i];
            //             return {
            //                 refKey: current.refKey,
            //                 title: current.title,
            //                 description: current.description,
            //                 parentKey: current.parentKey,
            //                 measurement: current.measurement,
            //                 slug: current.slug,
            //                 price: current.price,
            //                 multiplicity: current.multiplicity,
            //                 file: current.file,
            //                 thumbnail: `data:image/jpg;base64, ${responseApiFile.data['ДвоичныеДанные_Base64Data']}`
            //             };
            //         });
            //     responseData.push(res);
            // }
            // newItems.push(productsData);
        } catch (error) {
            console.error(`Ошибка при запросе к ${items[i]}:`, error);
        }
    }

    function splitArrayIntoThree(arr) {
        const chunkSize = Math.ceil(arr.length / 3);
        const firstChunk = arr.slice(0, chunkSize);
        const secondChunk = arr.slice(chunkSize, chunkSize * 2);
        const thirdChunk = arr.slice(chunkSize * 2);
        return [Promise.all(firstChunk), Promise.all(secondChunk), Promise.all(thirdChunk)];
    }

    function chunkArray(arr, numberOfChunks) {
        const chunkSize = Math.ceil(arr.length / numberOfChunks);
        const result = [];

        for (let i = 0; i < numberOfChunks; i++) {
            const start = i * chunkSize;
            const end = start + chunkSize;
            // Используем slice() для извлечения части массива
            result.push(arr.slice(start, end));
        }

        return result;
    }

    // console.log('responseData', responseData)
    await Promise.all([
        chunkArray(responseData, 5)
        // Promise.all(responseData)
    ]);
    // await limitedParallelRequests()
    // console.log('productsData', responseData);

    // console.log('productsDataLoad', productsDataLoad);
    // const data = Object
    //     .keys(productsDataLoad)
    //     .map(el => {
    //         return {
    //             refKey: el,
    //             ...productsDataLoad[el]
    //         }
    //     });

    // const storageData = Object
    //     .keys(productsDataLoad)
    //     .map(el => {
    //         return {
    //             buffer: getBase64ToBuffer(productsDataLoad[el].thumbnail),
    //             name: `${el}.jpg`
    //         }
    //     });
    const resultCreateFile = await fileArrayStorage(storageData);

    console.log('resultCreateFile', resultCreateFile);


    // console.log('data', data)

    // base64 encoded input string
    // let str = data[0].thumbnail;

// create buffer from base64 string
//     const ptopStr = 'base64,';
    // const indexOfStr = data[0].thumbnail.indexOf(ptopStr);
    // const sliceStr = data[0].thumbnail.slice(indexOfStr+ptopStr.length);
    // console.log('sliceStr', sliceStr.length);
    // console.log('sliceStr', sliceStr.trim().length);
    // let binaryData = Buffer.from(sliceStr.trim(), "base64");
    // const sendFileStorage = await fileStorage(binaryData, data[0].refKey);
    // console.log('sendFileStorage', sendFileStorage);


    // let list = await s3.GetList();
    // let list = await s3.GetList(`folder_products_images/`);
    // console.log('list', list);
    // console.log('list', list.Contents[1].Key.indexOf('a7ef575c-5ef6-11ef-9363-fa163eb77d5d'));


//     const decodedString = decode.toString('utf-8');
    // data[0].thumbnail = decodedString;
// decode buffer as utf8
//     let base64Dec  = binaryData.toString("utf8");
//     const decoBade64 = Buffer.from(binaryData, 'base64');
// "UsefulAngle"
//     console.log('binaryData', binaryData);
//     console.log('decodedString', decodedString);
    // const fileBuffer = await base64ToBufferAsync(storageTest);


    // конец нового
    // const File = new FileService();
    // await File.writeJson(productsDataLoad);
    // const files = await File.readJson();
    // const data = Object
    //     .keys(files)
    //     .map(el => {
    //         return {
    //             refKey: el,
    //             ...files[el]
    //         }
    //     });

    // const data = Object
    //     .keys(productsDataLoad)
    //     .map(el => {
    //         return {
    //             refKey: el,
    //             title: productsDataLoad[el].title,
    //             description: productsDataLoad[el].description,
    //             parentKey: productsDataLoad[el].parent,
    //             parent: productsDataLoad[el].parent,
    //             measurement: productsDataLoad[el].measurement,
    //             slug: productsDataLoad[el].slug,
    //             price: productsDataLoad[el].price,
    //             multiplicity: productsDataLoad[el].multiplicity,
    //             file: productsDataLoad[el].file,
    //             thumbnail: productsDataLoad[el].thumbnail
    //         }
    //     });

    // console.log('data________________________', data);

    return [];
    // return data;
}

export async function getRefreshFiles(products) {
    // отсчет времени начало
    console.time('myTimer');
    const startTime = new Date().getTime(); // Или просто Date.now()
    // отсчет времени начало
    const productsFile = await makeRequestsFile(products);

    // отсчет времени конец
    console.timeEnd('myTimer');
    const endTime = new Date().getTime(); // Или просто Date.now()
    const duration = endTime - startTime;
    console.log(`Время выполнения: ${duration} мс`);
    // отсчет времени конец
    return productsFile;
}
