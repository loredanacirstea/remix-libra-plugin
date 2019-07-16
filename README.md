# IDE for Compiling and Deploying Libra Scripts

In-work plugin for [Remix IDE](http://remix.ethereum.org) for compiling and deploying Libra scripts and modules.

## Features

- compile scripts and modules
- modules need to be defined in the same file now

Planned:
- deploying compiled scripts and modules on user-provided Libra chain node
- adding the plugin as a Remix official plugin

## Use

Connect to a local plugin, on Remix:

![remix_plugin.png](/docs/images/remix_plugin.png)

- name the plugin: `Move`
- url: `https://libra.pipeos.one`
- notifications: check `fileManager - currentFileChanged`
- location: `Side Panel`

![remix_plugin_connect.png](/docs/images/remix_plugin_connect.png)

Compile Libra script/module: choose the file from the Remix filebrowser

![compile.png](/docs/images/compile.png)

Deploy Libra script/module (not ready yet)

![deploy.png](/docs/images/deploy.png)

## Development

### Client
```
cd client
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Run your tests
```
npm run test
```

#### Lints and fixes files
```
npm run lint
```

### Server

- build Libra's compiler: [here](https://developers.libra.org/docs/my-first-transaction#clone-and-build-libra-core) and [here](https://developers.libra.org/docs/crates/ir-to-bytecode#example-usage)
- set compiler path [here](https://github.com/loredanacirstea/remix-libra-plugin/blob/master/server/index.js#L9).

```
npm start
```
