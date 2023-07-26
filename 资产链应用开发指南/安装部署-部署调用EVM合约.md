## 下载合约和编译器
- windows: [evm.zip](https://bty33.oss-cn-shanghai.aliyuncs.com/assetchainDev/parachain/windows/evm.zip)

下载后解压到assetchain所在目录，软件包包含
```text
store.sol    --- 示例合约
solc.exe     --- solidity编译器(0.6.0)
```

- linux

```bash
wget https://bty33.oss-cn-shanghai.aliyuncs.com/assetchainDev/parachain/linux/evm.tar.gz
```

下载后解压到assetchain所在目录
```bash
tar -xzvf evm.tar.gz -C assetchain
```

软件包包含
```text
store.sol    --- 示例合约
solc         --- solidity编译器(0.6.0)
```

## store合约

store合约提供两个接口，分别是`get()`和`set()`，用于获取/设置合约变量`value`。合约内容如下:

```solidity
pragma solidity ^0.6;

contract MyStore {
    uint value;
    constructor() public{
        value=9999999;
    }

    function set(uint x) public {
        value = x;
    }

    function get() public returns (uint){
        return value;
    }
}
```

## 部署store合约

部署之前需要导入钱包并解锁钱包，执行命令部署合约

```bash
./assetchain-cli evm create -c 16ui7XJ1VLM7YXcNhWwWsWS6CRC3ZA2sJ1 --sol store.sol
```
返回交易哈希txhash。合约名对应是`user.evm.<txhash>`，例如`user.evm.0x942dbf23fc0a373ff669ab103dd2f4631460956e30c6b34b6604124c7bcf3fd7`

### 调用store合约

### 1. 查询默认value值
```bash
##-a <合约名> -b <调用函数> -c <合约创建地址>
./assetchain-cli evm call -e "user.evm.0x942dbf23fc0a373ff669ab103dd2f4631460956e30c6b34b6604124c7bcf3fd7" -b "get()" -c "16ui7XJ1VLM7YXcNhWwWsWS6CRC3ZA2sJ1"
```
返回交易哈希，通过交易哈希查询交易日志
```bash
./assetchain-cli tx query -s 0xb22e16e73160aa46da9a25ae48ab4c62410575eaf0a14fed8c35bb5f59efb90d"
```

交易日志中查找合约信息
```text
"ty": 603,
"tyName": "LogCallContract",
"log": {
    "caller": "16ui7XJ1VLM7YXcNhWwWsWS6CRC3ZA2sJ1",
    "contractName": "",
    "contractAddr": "15nACVC6avSbTQ7q5yXaLXnepgnnUiW5va",
    "usedGas": "248",
    "ret": "0x0000000000000000000000000000000000000000000000000000000000000378",
    "jsonRet": "[{\"name\":\"\",\"type\":\"uint256\",\"value\":9999999}]"
},
```
可以看到value是默认值9999999


### 2. 设置value为888
```bash
./assetchain-cli evm call -e "user.evm.0x942dbf23fc0a373ff669ab103dd2f4631460956e30c6b34b6604124c7bcf3fd7" -b "set(888)" -c "16ui7XJ1VLM7YXcNhWwWsWS6CRC3ZA2sJ1"
```

### 3. 查询value值

```bash
./assetchain-cli evm call -e "user.evm.0x942dbf23fc0a373ff669ab103dd2f4631460956e30c6b34b6604124c7bcf3fd7" -b "get()" -c "16ui7XJ1VLM7YXcNhWwWsWS6CRC3ZA2sJ1"
```

返回交易哈希，通过交易哈希查询交易日志
```bash
./assetchain-cli tx query -s 0x018dd1aa63c9a431d9a2e313232e36e670e1cb0c0fe6956632d7ba52ebba19bd"
```

查找合约信息
```text
"ty": 603,
"tyName": "LogCallContract",
"log": {
    "caller": "16ui7XJ1VLM7YXcNhWwWsWS6CRC3ZA2sJ1",
    "contractName": "",
    "contractAddr": "15nACVC6avSbTQ7q5yXaLXnepgnnUiW5va",
    "usedGas": "248",
    "ret": "0x0000000000000000000000000000000000000000000000000000000000000378",
    "jsonRet": "[{\"name\":\"\",\"type\":\"uint256\",\"value\":888}]"
},
```
value值更新为888

**注：**
1. 在windows环境，使用终端进入assetchain目录，执行assetchain-cli.exe
2. 命令中的交易哈希和对应的合约名需要根据实际的交易哈希替换
