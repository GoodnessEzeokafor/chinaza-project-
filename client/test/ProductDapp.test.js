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
    // check if the contract has a dapp name
    it("check dapp name", async()=> {
        const dapp_name = await this.shop.dapp_name()
        assert.equal(dapp_name, "DShop")
    })
    //checks if the contract has a dapp builder
    it("check dapp builder", async() => {
        const dapp_builder = await this.shop.dapp_builder()
        assert.equal(dapp_builder, "@GoodnessEzeokafor")
    })

    // checks if the product_count is set to 0 initially
    it("checks if the product_count is set to 0 initially",async()=>{
        const product_count = await this.shop.product_count()
        assert.equal(product_count, 0)            
    })
    // checks if the seller_count is set to 0 initially
    it("checks if the seller_count is set to 0 initially",async()=> {
        const seller_count = await this.shop.seller_count()
        assert.equal(seller_count,0)
    })
})