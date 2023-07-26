require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    assetChain: {
      url: `http://172.22.17.194:8547`,
      accounts: ["0x85077c332b92c1e1f9e8f22f10898825d13afbb388907e5cc41263da0df45e31"]
    }
  }
};
