1. npm init 
2. npm i -D typescript tslib ts-node @types/node tsconfig-paths tsc-alias
  - tsc-alias是tsc处理alias的
  - tsconfig-paths是ts-node处理别名的
3. tsconfig.json
4. npm i -D webpack webpack-cli
5. npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-typescript @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/plugin-proposal-object-rest-spread core-js


4. 下载node链接mongodb的驱动器：npm install mongodb
5. 配置本地mongodb：https://juejin.cn/post/7052585815037673479


6. debug:
node --inspect-brk  -r /Users/xmly/.nvm/versions/node/v14.19.3/lib/node_modules/ts-node/register /Users/xmly/Desktop/create-node-app/dist/main.cjs


TS_NODE_PROJECT=/Users/xmly/Documents/shadow/create-node-app/tsconfig.json node --loader /Users/xmly/.nvm/versions/node/v14.19.3/lib/node_modules/ts-node/esm/transpile-only.mjs /Users/xmly/Desktop/create-node-app/src/index.ts