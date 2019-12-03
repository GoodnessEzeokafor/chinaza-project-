const ProductDapp = artifacts.require("./ProductDapp");
module.exports = function(deployer) {
  deployer.deploy(ProductDapp);
};
