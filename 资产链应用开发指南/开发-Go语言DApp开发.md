# Go语言DApp开发


## 1 通过工具开发go语言合约
从 [DApp开发介绍](./开发-dapp开发介绍.md) 章节的内容可以得知，一个DApp由执行器、命令行、RPC接口 三部分组成。以下通过chain33官方的开发工具实现一个加减法功能的DApp，来演示这三部分开发的过程

- <font color=blue>**[开发工具介绍](https://github.com/33cn/chain33/blob/master/cmd/tools/doc/gendapp.md)**</font>
- <font color=blue>**[合约例子代码](https://github.com/bysomeone/plugin/tree/dapp-example-calculator)**</font>

## 2 注意事项
1. protoc-gen-go版本要求： 使用github.com/golang/protobuf库的，v1.3.4版本
2. 合约开发完成要运行时，需要在配置文件中增加如下开关
[fork.sub.calculator]
Enable=0

