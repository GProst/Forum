# Forum

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

## Used technologies

* TODO: client link

* TODO: server link

* Unit tests:

  * Mocha

  * Chai

  * Sinon