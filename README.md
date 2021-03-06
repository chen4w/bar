> 本项目的建立采用 [Create React App](https://marmelab.com/react-admin/Tutorial.html).
BAAS部署为区块链部署带来便利，但是在应用的开发和实施中，仍然需要开发许多区块链应用的基础功能，
包括：账户/密钥管理，区块数据同步与检索，交易的签名与提交等。
Linke BaseApp提供了这些通用的基础功能实现，区块链应用实施者既可以直接复用其提供的功能，
也可以在其源代码的基础上进行开发，快速开发自己的DAppp
![Linkel BaseApp](pics/Linkel%20BaseApp.png)

## 项目介绍
本项目为[RepChain](https://gitee.com/BTAJL/repchain)
的应用提供可复用的功能支持，包括：
- 概览：简要信息展示
- 密钥对管理: 数据保存在indexedDB，支持导入导出（所有用户）
- 证书管理：在区块链完成注册的用户数据，通过数据同步提供数据检索和查看（所有用户）
- 账户：在区块链完成注册的用户数据，通过数据同步提供数据检索和查看 （节点管理员可以注册新账号，普通用户只能查看）
- 交易签名和提交：默认向RepChain服务以字节流方式提交签名交易
- 组网管理：即参与p2p组网形成一个链实例，包括创世块建立、信任证书列表维护（平台管理员可以建立组网）
- 节点管理：节点证书管理、节点的入网管理、节点服务启停 （节点管理员可以维护节点）
- 区块管理：从区块链同步数据之后，提供区块检索、查看、验证 （只读检索和查看）
- 交易管理：从区块链同步数据之后，提供交易检索、查看、验证 （只读检索和查看，构造和新建签名交易）

## 如何运行bar
git clone到本地之后，
- `yarn install` 安装依赖
- `cd server`
- `yarn install` 安装server依赖
- `cd ..`
- `yarn start` 同时启动React App和文件上传下载服务
## 通过brew安装prisma工具
- `brew tap prisma/prisma`
- `brew install prisma`
## 如何运行graphql服务[gdb](https://github.com/prisma/prisma/blob/master/docs/1.9/03-Tutorials2/08-Bootstrapping-Boilerplates/02-Node.md)
- `cd gdb`
- `yarn install` 安装依赖
- 安装[docker](https://docs.docker.com/install/)以及[docker-compose](https://docs.docker.com/compose/install/)
- `cd database` 切换到gdb/database目录
- `docker-compose up -d` 启动prisma和mysql5.7的docker实例
- datamodel.graphql  按需要修改数据schema,然后`prisma deploy` 部署schema

- `yarn start` 启动app服务
- `yarn dev` 启动app服务（数据操作子集）和db服务（数据操作全集）

## 关于自动化测试选型
- Jest：nodejs单元测试
- Jest+ Puppeteer：浏览器端无头测试，集成测试，e2e测试
- Cypress：e2e测试
- jest+enzyme：React组件测试
- 能够进行多浏览真实测试的是：jasmine+karma

以上测试不适用于indexedDB测试，只能进行fake 或 mock，
- 本项目拟采用Jest作为nodejs单元测试，
- 采用Jest+ Puppeteer作为集成测试
- 针对密钥对管理的indexedDB，采用独立的DataProvider以及独立的测试手段