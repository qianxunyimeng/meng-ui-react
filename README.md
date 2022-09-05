## meng-ui-react component library

## 使用 React+typescript 从零到一打造一套你自己的组件库

### 安装最后已经发布的组件库来试试

~~~javascript
npm install meng-ui-react --save
~~~

### 使用

使用前请确认项目react的版本必须大于16.8

~~~javascript
// 加载样式
import 'meng-ui-react/dist/index.css'
// 引入组件
import { Button } from 'meng-ui-react'
~~~



### 一些本地开发命令

~~~bash
//启动本地环境
npm run stroybook

//跑单元测试
npm test

//build可发布静态文件
npm run build

//发布到 npm
npm run publish
~~~