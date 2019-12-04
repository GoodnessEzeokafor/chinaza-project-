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

    // get a singel seller profile 
    it("get a singel seller profile", async()=> {
        const seller_count = await this.shop.seller_count()
        const get_single_seller_profile = await this.shop.getSingleSeller(seller_count)
        assert.equal(get_single_seller_profile['0'].toNumber(), seller_count.toNumber())
        assert.equal(get_single_seller_profile['1'], "John")
        assert.equal(get_single_seller_profile['2'], "Doe")
        assert.equal(get_single_seller_profile['3'], "John Doe Business")
        assert.equal(get_single_seller_profile['4'], "johnDoeBusiness@gmail.com")
        assert.equal(get_single_seller_profile['5'], "Exciting Business")
        assert.equal(get_single_seller_profile['6'], "address")
        assert.equal(get_single_seller_profile['7'], "0xBdb85c766ef7647AC11c7943766937b3520587BB")
    })

    // product add
    it("add product", async()=> {
        const added_product = await this.shop.createProduct(
            "Bag",
            "Nice Bag",
            web3.utils.toWei('2','Ether'),
            "dfnvldvfldflkmfdf8fdf",
            {'from':seller}
        )   
        const product_count = await this.shop.product_count()
        const event = added_product.logs[0].args
        assert.equal(event.id.toNumber(),product_count.toNumber(),"product id is correct")
        assert.equal(event.product_name,"Bag","product name is correct")
        assert.equal(event.product_description,"Nice Bag","product description is correct")
        assert.equal(event.product_price,"2000000000000000000","product price is correct")
        assert.equal(event.upload_image,"dfnvldvfldflkmfdf8fdf","product image hash is correct")
        assert.equal(event.sold,false,"product purchase is correct")
        assert.equal(event.seller,seller,"product seller is correct")
    })
    // product update
    it("update product",async() => {
        const updated_product = await this.shop.updateProduct(
            1,
            "Shoe",
            "Nice Shoe",
            web3.utils.toWei('5','Ether'),
            "dfnvldvfldflkmfdf8fdf",
            buyer
        )    
        const product_count = await this.shop.product_count()
        const event = updated_product.logs[0].args
        assert.equal(event.id.toNumber(),product_count.toNumber(),"product id is correct")
        assert.equal(event.product_name,"Shoe","product name is correct")
        assert.equal(event.product_description,"Nice Shoe","product description is correct")
        assert.equal(event.product_price,"5000000000000000000","product price is correct")
        assert.equal(event.upload_image,"dfnvldvfldflkmfdf8fdf","product image hash is correct")
        assert.equal(event.seller,buyer,"product seller is correct")
        
     }) 
    // get a single product
    it("single product",async() => {
        const product_count = await this.shop.product_count()
        const get_single_product = await this.shop.get_single_product(product_count)
        assert.equal(get_single_product['0'].toNumber(), product_count.toNumber())
        assert.equal(get_single_product['1'],"Bag")
        assert.equal(get_single_product['2'], "Nice Bag")
        assert.equal(get_single_product['3'], "2000000000000000000")
        assert.equal(get_single_product['4'],"dfnvldvfldflkmfdf8fdf")
        assert.equal(get_single_product['5'], false)
        assert.equal(get_single_product['6'], seller)
    }) 


    // buys product
    it("buy and  sells products",async()=> {
        const product_count = await this.shop.product_count()
        // track the seler balance before purchased
        let oldSellerBalance
        oldSellerBalance =await web3.eth.getBalance(seller)
        oldSellerBalance =new web3.utils.BN(oldSellerBalance)


        // Buyer makes purchase
        const result =await this.shop.buyProduct(
                    product_count, 
                    {"from":buyer, "value":web3.utils.toWei('2','Ether')}
        )  

        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(),product_count.toNumber(),'id is correct')
        assert.equal(event.product_name.toString(),"Bag","product name is correct")  
        assert.equal(event.product_price,"2000000000000000000" , "price correct")
        assert.equal(event.seller, seller , "seller is corect")
        assert.equal(event.sold, true)


        // check the seller revieve funds
        let newSellerBalance;
        newSellerBalance =await web3.eth.getBalance(seller)
        newSellerBalance =new web3.utils.BN(newSellerBalance)

        let price
        price = web3.utils.toWei('2','Ether')
        price = new web3.utils.BN(price)
        console.log("Seller Old Balance",oldSellerBalance)
        console.log("Seller New Balance",newSellerBalance)
        console.log("Price", price)
        

        const expectedBalance = oldSellerBalance.add(price)
        assert.equal(newSellerBalance.toString(), expectedBalance.toString())
    
    

    })
})