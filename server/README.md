# Forum server

## Install

* Run:

```shell
npm install
```

## Initialize DB

* Run:

```shell
npm run initialize-db
```

## Bootstrap server

> **NOTE:** initialize DB before start server!

* For development:

```shell
npm run start-dev --port 3000
```

* For production:

```shell
npm run start --port 3000
```

## Test

```shell
npm test
```

___



## API

* Get messages list:

|Url|`/api/messages`|
|---|---|
|Method|`GET`|
|Response format|`{ messages: Array<{ id: number, header: string }> }`|

* Create message:

|Url|`/api/messages`|
|---|---|
|Method|`POST`|
|Request format|`{ header: string, body: string }`|
|Response format|`{ id: number }`|

* Get message:

|Url|`/api/messages/:id`|
|---|---|
|Method|`GET`|
|Response format|`{ id: number, header: string, body: string }`|

* Update message:

|Url|`/api/messages/:id`|
|---|---|
|Method|`PUT`|
|Request format|`{ header: string, body: string }`|

* Delete message:

|Url|`/api/messages/:id`|
|---|---|
|Method|`DELETE`|

___

## Used technologies

* Express.js

* SQLite 3