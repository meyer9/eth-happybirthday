var Etherday = artifacts.require("./Etherday.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Etherday, accounts[0], 256);
};
