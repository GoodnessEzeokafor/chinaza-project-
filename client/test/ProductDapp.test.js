const ProductDapp = artifacts.require('./ProductDapp.sol')



contract("ProductDapp", ([deployer, seller, buyer])=> {
    // console.log(deployer)
    // console.log(seller)
    // console.log(buyer)
    

    // assigns the deployed contract to this.shop
    before(async() => {
      this.shop =  await ProductDapp.deployed()  // calls the deployed contract
    })


    // checks if the contract deployed successfully
    it("", async() => {
        const address = this.shop.address
        // console.log("Contract address:",address)
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })


    //

})