# FoodFabric API Spec

## Running API tests locally

To locally run the provided Postman collection against your backend, execute:

```
APIURL=http://localhost:3000/api
```

## Considerations for your backend with [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)

If the backend is about to run on a different host/port than the frontend, make sure to handle `OPTIONS` too and return correct `Access-Control-Allow-Origin` and `Access-Control-Allow-Headers` (e.g. `Content-Type`).

### Authentication Header:

`Authorization: Bearer jwt.token.here`

## JSON Objects returned by API:

Make sure the right content type like `Content-Type: application/json; charset=utf-8` is correctly returned.

### Users (for Registration)

```JSON
{
  "user": {
     "_id": "61477a5c13782c2ea6e9e488",
     "image": null,
     "secondName": "secondname",
     "surname": "surname",
     "name": "jake"
    }
}
```

### User (for login)

```JSON
{
  "user": {
    "_id": "61477a5c13782c2ea6e9e488",
    "createdAt": "2021-09-19T17:58:13.213Z",
    "image": null,
    "secondName": "secondname",
    "surname": "surname",
    "name": "jake",
    "phone": "phone",
    "email": "jake@jake.jake",
    "token": "Bearer jwt.token"
  }
}
```

### User (for current)

```JSON
{
  "user": {
    "id": "61477a5c13782c2ea6e9e488",
    "createdAt": "2021-09-19T17:58:13.213Z",
    "image": null,
    "secondName": "secondname",
    "surname": "surname",
    "name": "jake",
    "phone": "phone",
    "email": "jake@jake.jake"
  }
}
```

### Single Product

```JSON
{
 "product": {
     "slug": "how-to-train-your-dragon",
     "title": "How to train your dragon",
     "price": "price",
     "active": true,
     "categoryId": "categoryId",
     "composition": "composition",
     "weight": 100,
     "images": [
       "https://static.productionready.io/images/smiley-cyrus.jpg",
       "https://static.productionready.io/images/smiley-cyrus.jpg",
       "https://static.productionready.io/images/smiley-cyrus.jpg"
     ],
     "description": "Ever wonder how?",
     "createdAt": "2016-02-18T03:22:56.637Z",
     "favorited": false,
     "favoritesCount": 0
   }
}
```

### Multiple Products

```JSON
{
  "products":[{
   "slug": "how-to-train-your-dragon",
        "title": "How to train your dragon",
        "price": "price",
        "active": true,
        "categoryId": "categoryId",
        "composition": "composition",
        "weight": 100,
        "images": [
          "https://static.productionready.io/images/smiley-cyrus.jpg",
          "https://static.productionready.io/images/smiley-cyrus.jpg",
          "https://static.productionready.io/images/smiley-cyrus.jpg"
        ],
        "description": "Ever wonder how?",
        "createdAt": "2016-02-18T03:22:56.637Z",
        "favorited": false,
        "favoritesCount": 0
  }, {
    "slug": "how-to-train-your-dragon",
         "title": "How to train your dragon",
         "price": "price",
         "active": true,
         "categoryId": "categoryId",
         "composition": "composition",
         "weight": 100,
         "images": [
           "https://static.productionready.io/images/smiley-cyrus.jpg",
           "https://static.productionready.io/images/smiley-cyrus.jpg",
           "https://static.productionready.io/images/smiley-cyrus.jpg"
         ],
         "description": "Ever wonder how?",
         "createdAt": "2016-02-18T03:22:56.637Z",
         "favorited": false,
         "favoritesCount": 0
  }],
  "productsCount": 2
}
```


### Single Category

```JSON
{
 "category": {
     "slug": "category-slug",
     "title": "category",
     "products": [
       {
         "productId": "productId"
       }
     ],
     "active": true,
     "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
     "createdAt": "2016-02-18T03:22:56.637Z",
     "updatedAt": "2016-02-18T03:48:35.824Z"
   }
}
```

### Multiple Category

```JSON
{
  "categories":[{
       "slug": "category-slug",
        "title": "category",
        "products": [
          {
            "productId": "productId"
          }
        ],
        "active": true,
        "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
        "createdAt": "2016-02-18T03:22:56.637Z",
        "updatedAt": "2016-02-18T03:48:35.824Z"
  }, {
        "slug": "category-slug",
         "title": "category",
         "products": [
           {
             "productId": "productId"
           }
         ],
         "active": true,
         "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
         "createdAt": "2016-02-18T03:22:56.637Z",
         "updatedAt": "2016-02-18T03:48:35.824Z"
}],
  "categoriesCount": 2
}
```

### Basket

```JSON
{
 "basket": {
    "id": "id",
    "products": [
      {
        "productId": "productId",
        "count": 10
      }
    ],
    "total": 100,
    "userId": "userId",
    "discount": 30,
    "coupon": "couponId",
    "delivery": false,
    "createdAt": "2016-02-18T03:22:56.637Z"
   }
}
```

### Order

```JSON
{
  "order": {
    "id": "id",
    "createdAt": "2016-02-18T03:22:56.637Z",
    "basket": "basketId",
    "client": "clientId",
    "orderNumber": "orderNumber",
    "deliveryDate": "2016-02-18T03:22:56.637Z",
    "street": "street",
    "house": "house",
    "building": "building",
    "apartment": 5,
    "addressComment": "addressComment",
    "stageId": "stageId",
    "coupon": "couponId",
    "guestName": "guestName",
    "phone": "phone",
    "causeRejected": "causeRejected",
    "payType": "payType",
    "amountMoney": 1000,
    "wishes": "wishes"
    }
}
```

### Multiple Order

```JSON
{
  "orders":[{
    "id": "id",
    "createdAt": "2016-02-18T03:22:56.637Z",
    "basket": "basketId",
    "client": "clientId",
    "orderNumber": "orderNumber",
    "deliveryDate": "2016-02-18T03:22:56.637Z",
    "street": "street",
    "house": "house",
    "building": "building",
    "apartment": 5,
    "addressComment": "addressComment",
    "stageId": "stageId",
    "coupon": "couponId",
    "guestName": "guestName",
    "phone": "phone",
    "causeRejected": "causeRejected",
    "payType": "payType",
    "amountMoney": 1000,
    "wishes": "wishes"
  }, {
    "id": "id",
    "createdAt": "2016-02-18T03:22:56.637Z",
    "basket": "basketId",
    "client": "clientId",
    "orderNumber": "orderNumber",
    "deliveryDate": "2016-02-18T03:22:56.637Z",
    "street": "street",
    "house": "house",
    "building": "building",
    "apartment": 5,
    "addressComment": "addressComment",
    "stageId": "stageId",
    "coupon": "couponId",
    "guestName": "guestName",
    "phone": "phone",
    "causeRejected": "causeRejected",
    "payType": "payType",
    "amountMoney": 1000,
    "wishes": "wishes"
  }],
  "ordersCount": 2
}
```

### Place

```JSON
{
    "place": {
        "title:": "place",
        "address": "address",
        "info": "info",
        "email": "email",
        "phone": "phone",
        "director": "director",
        "description": "description",
        "createdAt": "2016-02-18T03:22:56.637Z"   
    }
}
```

### Multiple Place

```JSON
{
  "places":[{
    "title:": "place",
    "address": "address",
    "info": "info",
    "email": "email",
    "phone": "phone",
    "director": "director",
    "description": "description",
    "createdAt": "2016-02-18T03:22:56.637Z"
  }, {
    "title:": "place",
    "address": "address",
    "info": "info",
    "email": "email",
    "phone": "phone",
    "director": "director",
    "description": "description",
    "createdAt": "2016-02-18T03:22:56.637Z"
  }],
  "placeCount": 2
}
```

### FeedBack

```JSON
{
  "feedback": {
     "name": "name",
     "email": "email",
     "subject": "subject",
     "message": "message",
     "agreement": true,
     "stageId": "stageId",
     "createdAt": "2016-02-18T03:22:56.637Z"
    }
}
```


### Multiple Feedback

```JSON
{
  "feedback":[{
     "name": "name",
      "email": "email",
      "subject": "subject",
      "message": "message",
      "agreement": true,
      "stageId": "stageId",
      "createdAt": "2016-02-18T03:22:56.637Z"
  }, {
     "name": "name",
      "email": "email",
      "subject": "subject",
      "message": "message",
      "agreement": true,
      "stageId": "stageId",
      "createdAt": "2016-02-18T03:22:56.637Z"
  }],
  "feedbackCount": 2
}
```

### Coupon

```JSON
{
  "coupon": {
    "id": "id",
    "secret:": "secret",
    "expire": "2016-02-18T03:22:56.637Z",
    "createdAt": "2016-02-18T03:22:56.637Z",
    "type": "type",
    "count": 10,
    "active": true
    }
}
```


### Multiple Coupon

```JSON
{
  "coupons":[{
    "id": "id",
    "secret:": "secret",
    "expire": "2016-02-18T03:22:56.637Z",
    "createdAt": "2016-02-18T03:22:56.637Z",
    "type": "type",
    "count": 10,
    "active": true
  }, {
    "id": "id",
    "secret:": "secret",
    "expire": "2016-02-18T03:22:56.637Z",
    "createdAt": "2016-02-18T03:22:56.637Z",
    "type": "type",
    "count": 10,
    "active": true
  }],
  "couponsCount": 2
}
```

### Stage

```JSON
{
  "stage": {
      "id": "id",
      "title": "title",
      "color": "color",
      "createdAt": "2016-02-18T03:22:56.637Z",
      "active": true
    }
}
```


### Multiple Stage

```JSON
{
  "stages":[{
    "id": "id",
    "title": "title",
    "color": "color",
    "createdAt": "2016-02-18T03:22:56.637Z",
    "active": true
  }, {
    "id": "id",
    "title": "title",
    "color": "color",
    "createdAt": "2016-02-18T03:22:56.637Z",
    "active": true
  }],
  "stagesCount": 2
}
```

### Errors and Status Codes

If a request fails any validations, expect a 422 and errors in the following format:

```JSON
{
  "errors":{
    "body": [
      "can't be empty"
    ]
  }
}
```

#### Other status codes:

401 for Unauthorized requests, when a request requires authentication but it isn't provided

403 for Forbidden requests, when a request may be valid but the user doesn't have permissions to perform the action

404 for Not found requests, when a resource can't be found to fulfill the request

400 for Bad Request requests, when a resource unvalidation

500 for Internal Server Error


## Endpoints:

### Authentication:

`POST /api/users/login`

Example request body:
```JSON
{
    "email": "jake@jake.jake",
    "password": "jakejake"
}
```
Required fields: `email`, `password`

No authentication required, returns a [User](#user-for-login)


### Registration:

`POST /api/users`

Example request body:
```JSON
{
  "user":{
    "email": "jake@jake.jake",
    "name": "jake",
    "surname": "surname",
    "secondName": "secondName",
    "password": "password",
    "passwordConfirm": "password",
    "phone": "phone"
  }
}
```

No authentication required, returns a [CurrentUser](#users-for-registration)
Required fields: `email`, `name`, `surname`, `password`, `passwordConfirm`


### Get Current User

`GET /api/user`

Authentication required, returns a [User](#user-for-current) that's the current user


### Update User

`PUT /api/user`

Example request body:
```JSON
{
  "user":{
    "email": "jake@jake.jake",
    "phone": "phone",
    "name": "jake",
    "surname": "surname",
    "secondName": "secondName",
    "password": "password",
    "passwordConfirm": "password",
    "image": "https://i.stack.imgur.com/xHWG8.jpg"
  }
}
```

Required fields: `email`, `name`, `surname`, `secondName`
Accepted fields: `passwordConfirm`, `password`, `image`

Authentication required, returns the [User](#user-for-current)

### List Category

`GET /api/categories`

Returns most recent products globally by default, provide `price` query parameter to filter results

Limit number of products (default is 20):

`?limit=20`

Offset/skip number of products (default is 0):

`?offset=0`

No authentication required,, will return [multiple categories](#multiple-category), ordered by most recent first


### Get Category

`GET /api/category/:slug`

No authentication required, will return [single article](#single-category)

### Create Category

`POST /api/category`

Example request body:

```JSON
{
  "category": {
      "title": "category",
      "image": "https://static.productionready.io/images/smiley-cyrus.jpg"
    }
}
```

Authentication required with `ADMIN` role, will return an [Category](#single-category)

Required fields: `title`; 

The `title` is unique;

Optional fields: `images`;


### Update Category

`PUT /api/category/:slug`

Example request body:

```JSON
{
   "category": {
       "title": "category",
       "active": true,
       "image": "https://static.productionready.io/images/smiley-cyrus.jpg"
     }
}
```

Required fields: `title`
Optional fields: `images`, `active`

The `slug` also gets updated when the `title` is changed;
The `title` is unique;

Authentication required with `ADMIN` role, returns the updated [Category](#single-category)


### Delete Category

`DELETE /api/category/:slug`

The Category can't deleted, if Category.products has any product;

Authentication required with `ADMIN` role

Return [multiple categories](#multiple-category)


### List Products

`GET /api/products`

Returns most recent products globally by default, provide `price` query parameter to filter results

Query Parameters:

Filter by price:

`?price=desc`

Limit number of products (default is 20):

`?limit=20`

Offset/skip number of products (default is 0):

`?offset=0`

Authentication optional, will return [multiple products](#multiple-products), ordered by most recent first


### Get Product

`GET /api/products/:slug`

No authentication required, will return [single product](#single-product)

### Create Product

`POST /api/products`

Example request body:

```JSON
{
  "product": {
    "title": "product",
    "price": "price",
    "categoryId": "categoryId",
    "composition": "composition",
    "active": true,
    "weight": 100,
    "images": [
      "https://static.productionready.io/images/smiley-cyrus.jpg",
      "https://static.productionready.io/images/smiley-cyrus.jpg",
      "https://static.productionready.io/images/smiley-cyrus.jpg"
    ],
    "description": "Ever wonder how?"
  }
}
```

Required fields: `title`, `price`, `categoryId`, `composition`, `active`, `weight`, `description`, 

Optional fields: `images` as an array of Strings

Authentication required with `ADMIN` role, will return an [Product](#single-product)


### Update Product

`PUT /api/products/:slug`

Example request body:

```JSON
{
  "product": {
    "title": "product",
    "price": "price",
    "categoryId": "categoryId",
    "composition": "composition",
    "active": true,
    "weight": 100,
    "images": [
      "https://static.productionready.io/images/smiley-cyrus.jpg",
      "https://static.productionready.io/images/smiley-cyrus.jpg",
      "https://static.productionready.io/images/smiley-cyrus.jpg"
    ],
    "description": "Ever wonder how?"
  }
}
```

Required fields: `title`, `price`, `categoryId`, `composition`, `active`, `weight`, `description`, 

Optional fields: `images` as an array of Strings

The `slug` also gets updated when the `title` is changed

Authentication required with `ADMIN` role, returns the updated [Product](#single-product)


### Delete Product

`DELETE /api/products/:slug`

Authentication required, will return [multiple products](#multiple-products)

### Favorite Product

`POST /api/products/:slug/favorite`

No additional parameters required

Authentication required, returns the [Product](#single-product)

### Unfavorite Product

`DELETE /api/products/:slug/favorite`

No additional parameters required

Authentication required, returns the [Product](#single-product)

### Get Basket

`GET /api/:localBasketId`

Authentication optional, will return [Basket](#basket)

### Create Basket

`POST /api/basket`

Example request body:

```JSON
{
  "basket": {
      "products": [
        {
          "productId": "productId",
          "count": 10
        }
      ],
      "coupon": "coupon",
      "delivery": true
    }
}
```

Required fields: `products`, `delivery`

Optional fields: `coupon`

Authentication optional, will return an [Basket](#basket)

### Update Basket

`PUT /api/basketId`

Example request body:

```JSON
{
   "basket": {
        "products": [
          {
            "productId": "productId",
            "count": 10
          }
        ],
        "coupon": "coupon",
        "delivery": true
      }
}
```

Required fields: `products`, `delivery`

Optional fields: `coupon`

Authentication optional, will return an [Basket](#basket)

### Delete Basket

`DELETE /api/basketId`

Authentication optional


### Get Order

`GET /api/:orderId`

Authentication required, will return [Order](#order)

### Create Order

`POST /api/order/:basketId`

Authentication optional, will return an [Order](#order)

### Update Order

`PUT /api/orderId`

Example request body:

```JSON
{
   "order": {
       "status": "status"
      }
}
```

Required fields: `status`

Authentication required with `ADMIN` role, will return an [Order](#order)


### Delete Order

`DELETE /api/orderId`

Authentication required with `ADMIN`

### Get Place

`GET /api/place`

No authentication required, will return [multiple place](#multiple-place)

### Get Place

`GET /api/place/:placeId`

No authentication required, will return [Place](#place)

### Create Place

`POST /api/place`

Example request body:

```JSON
{
  "place": {
      "title:": "place",
      "address": "address",
      "info": "info",
      "email": "email",
      "phone": "phone",
      "director": "director",
      "description": "description"
    }
}
```

Required fields: `title`, `address`, `info`, `email`, `phone`, `director`, `description`

Authentication required with `ADMIN` role, will return an [multiple place](#multiple-place)

### Update Place

`PUT /api/place/:placeId`

Example request body:

```JSON
{
  "place": {
      "title": "place",
      "address": "address",
      "info": "info",
      "email": "email",
      "phone": "phone",
      "director": "director",
      "description": "description"
    }
}
```

Required fields: `title`, `address`, `info`, `email`, `phone`, `director`, `description`

Authentication required with `ADMIN` role, will return an [Place](#place)


### Delete Place

`DELETE /api/place/:placeId`

Authentication required with `ADMIN` role, will return an [multiple place](#multiple-place)


### Get Feedback

`GET /api/:feedbackId`

Authentication required with `ADMIN` role, will return [Feedback](#feedback)

### Create Feedback

`POST /api/feedback`

Example request body:

```JSON
{
  "feedback": {
      "name:": "name",
      "email": "email",
      "subject": "subject",
      "message": "message",
      "agreement": true
    }
}
```

Required fields: `name`, `email`, `subject`, `message`, `agreement`

Authentication optional, will return an [Feedback](#feedback)

### List Feedback

`GET /api/feedback`

Returns most recent products globally by default, provide `stageId` query parameter to filter results

Query Parameters:

Filter by status:

`?stageId=new`

Limit number of products (default is 20):

`?limit=20`

Offset/skip number of products (default is 0):

`?offset=0`

Authentication required with `ADMIN` role, will return [Feedback](#multiple-feedback), ordered by most recent first


### Get Coupon

`GET /api/coupon/:secret`

Authentication required with `ADMIN` role, will return an [Coupon](#coupon)

### Create Coupon

`POST /api/coupon`

Example request body:

```JSON
{
  "coupon": {
    "secret:": "secret",
    "expire": "2016-02-18T03:22:56.637Z",
    "type": "type",
    "count": 10,
    "active": true
    }
}
```

Required fields: `name`, `expire`, `type`, `count`

Authentication required with `ADMIN` role, will return an [multiple-coupon](#multiple-coupon)

### Update Coupon

`PUT /api/coupon/:secret`

Example request body:

```JSON
{
  "coupon": {
    "secret:": "secret",
     "expire": "2016-02-18T03:22:56.637Z",
     "type": "type",
     "count": 10,
     "active": true
    }
}
```

Required fields: `name`, `expire`, `type`, `count`
Field type one of `[percent, sum]`

Authentication required with `ADMIN` role, will return an [Coupon](#coupon)


### List Coupon

`GET /api/coupon`

Authentication required with `ADMIN` role, will return [multiple-coupon](#multiple-coupon)


### Delete Coupon

`DELETE /api/place/:stageId`

Authentication required with `ADMIN` role, will return an [multiple-coupon](#multiple-coupon)


### Get Stage

`GET /api/stage/:stageId`

Authentication required with `ADMIN` role, will return an [Stage](#stage)

### Create Stage

`POST /api/stage`

Example request body:

```JSON
{
  "stage": {
    "title": "title",
    "color": "color",
    "active": true
  }
}
```

Required fields: `title`, `color`, `active`
Field type one of `[new, read, inwork, rejected, close]`

Authentication required with `ADMIN` role, will return an [multiple-stage](#multiple-stage)

### Update Stage

`PUT /api/stage/:stageId`

Example request body:

```JSON
{
  "stage": {
    "title": "title",
    "color": "color",
    "active": true
  }
}
```

Required fields: `title`, `color`, `active`
Field type one of `[new, read, inwork, rejected, close]`

Authentication required with `ADMIN` role, will return an [Stage](#stage)


### List Stage

`GET /api/stage`

Authentication required with `ADMIN` role, will return [multiple-stage](#multiple-stage)


### Delete Stage

`DELETE /api/stage/:stageId`

Authentication required with `ADMIN` role, will return an [multiple-stage](#multiple-stage)

