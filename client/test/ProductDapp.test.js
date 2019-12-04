// require('chai')
//     .use(require('chai-as-promised'))
//     .should()


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

    // checks seller profile add functionality
    it("create seller profile",async()=> {
        const new_seller_profile= await this.shop.createSellerProfile(
                "John",
                "Doe",
                "John Doe Business",
                "johnDoeBusiness@gmail.com",
                "Exciting Business",
                "address",
                {'from':seller}
        )
        const new_seller_proile_count = await this.shop.seller_count()
        const event = new_seller_profile.logs[0].args
        //check if the id is correct
        assert.equal(event.id.toNumber(),new_seller_proile_count.toNumber(), "id is correct")
        // chek if the first name is correct
        assert.equal(event.first_name,"John", "First Name is correct")
        // check if the last name is correct
        assert.equal(event.last_name,"Doe", "Last Name is correct")
        // check if the business name is corrrect
        assert.equal(event.name_of_business,"John Doe Business","Business Name is correct")
        // check if the business address is correct
        assert.equal(event.email_address,"johnDoeBusiness@gmail.com","Business address is correct")
        // check if the business description is correct
        assert.equal(event.description_of_business,"Exciting Business","Business description")
        // check if the business address is correct
        assert.equal(event.business_address,"address","address")
        // check if the seller meta mask wallet address is correct
        assert.equal(event.seller_address,seller,"seller address is correct")
    })
    it("update seller profile", async()=>{
        const update_seller_profile_account = await this.shop.updateSellerAccount(
                1,
                "Jane",
                "Doe",
                "Jane Doe Business",
                "janeDoeBusiness@gmail.com",
                "Mad Business",
                "gwarandok",
                seller
        )
        const new_updated_seller_profile_count = await this.shop.seller_count()
        const event = update_seller_profile_account.logs[0].args
        assert.equal(event.id.toNumber(),new_updated_seller_profile_count.toNumber(), "seller id is correct")
        assert.equal(event.first_name, "Jane","First Name is Correct")
        assert.equal(event.last_name, "Doe", "Last Name is Correct")
        assert.equal(event.name_of_business, "Jane Doe Business", "Name of Business is Correct")
        assert.equal(event.email_address,"janeDoeBusiness@gmail.com","Business Email is Correct")
        assert.equal(event.description_of_business,"Mad Business","Business Description is Correct")
        assert.equal(event.business_address,"gwarandok","Business address is correct")
        assert.equal(event.seller_address, seller,"Seller address is correct")
    })
})