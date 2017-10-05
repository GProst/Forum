# Forum

[![Build Status](https://travis-ci.org/GProst/Forum.svg?branch=master)](https://travis-ci.org/GProst/Forum)

## Requirements

* **Node.js** version **8.6.0+** (may work with previous versions, but not guaranteed)

* **npm** version **5.0.0+**

* **MacOSX**/**Linux** (may work with **Windows**, but not guaranteed)

## Install

* Run:

```shell
npm run install-project
```

## Bootstrap

> **NOTE:** all commands should run in the root project directory!

1. Build client static files:

```shell
npm run build
```

2. Initialize DB:

```shell
npm run initialize-db
```

3. Bootstrap server on provided `port` (default `3000`):

```shell
npm start --port 3000
```

4. Enter `localhost` to browser's address bar with corresponding `port`

Example:

```shell
localhost:3000
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

* Server:

  * Express.js (Node.js)

* Database:

  * SQLite

* Client:

  * ReactJS

  * React router

  * Redux

  * Webpack

  * Babel

  * Styled-components

* Unit tests:

  * Mocha

  * Chai

  * Sinon

* Common:

  * Eslint