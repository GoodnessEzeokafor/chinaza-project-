pragma solidity ^0.5.0;


/*
Seller 
    - id
    - first_name
    - last_name
    - name_of_business
    - email_address
    - description_of_business
Product 
    - id
    - product_name
    - product_price
    - upload_image
    - sold
    - seller
*/
contract ProductDapp{
    uint public product_count= 0;
    uint public seller_count=0;
    string public dapp_name = "DShop"; // dapp name
    string public dapp_builder = "@GoodnessEzeokafor";
    mapping(uint => Product) public products;
    mapping(uint => Seller) public sellers;



    struct Product{
        // Product structure
        uint id;
        string product_name;
        string product_description;
        uint product_price;
        string upload_image;
        bool sold;
        address payable seller;
    }


    struct Seller{
        // Seller Structure
        uint id;
        string first_name;
        string last_name;
        string name_of_business;
        string email_address;
        string description_of_business;
        string business_address;
        address seller_address;
    }
    /*
    Events for consoling
    */
    event ProductCreated(
        uint id,
        string product_name,
        string product_description,
        uint product_price,
        string upload_image,
        bool sold,
        address seller
    );
    event SellerCreated(
        uint id,
        string first_name,
        string last_name,
        string name_of_business,
        string email_address,
        string description_of_business,
        string business_address,
        address seller_address
    );

    event ProductUpdated(
        uint id,
        string product_name,
        string product_description,
        uint product_price,
        string upload_image,
        bool sold,
        address  seller
    );

    event SellerUpdated(
        uint id,
        string first_name,
        string last_name,
        string name_of_business,
        string email_address,
        string description_of_business,
        string business_address,
        address seller_address
    );
    event ProductPurchased(
        uint id, // product id with a positive integer type
        string product_name,// product name
        uint product_price, // product price with a positive integer type
        address payable seller, // product owner with a type of address
        bool sold
    );

    // event GetSingleSeller(
        // uint id,
        // string first_name,
        // string last_name,
        // string name_of_business,
        // string email_address,
        // string description_of_business,
        // string business_address,
        // address seller_address
    // );
    /*
    END EVENTS
    */

    function createSellerProfile(
                            string memory _first_name,
                            string memory _last_name,
                            string memory _name_of_business,
                            string memory _email_address,
                            string memory _description_of_business,
                            string memory _business_address
                            )public{
        require(bytes(_first_name).length > 0,"Add A First Name"); // First name's length is more than 0
        require(bytes(_last_name).length > 0,"Add A Last Name"); // Last Name length is more than 0
        require(bytes(_name_of_business).length > 0,"Add The Name Of Business"); // _name_of_business length is more than 0
        require(bytes(_email_address).length > 0,"Add An Email address"); // _email_address length is more than 0
        require(bytes(_description_of_business).length > 0,"Add A Description Of Business"); // _description_of_business length is more than 0
        require(bytes(_business_address).length > 0,"Add A Address Of Business");  //
        seller_count++;
        sellers[seller_count]= Seller(
            seller_count,
            _first_name,
            _last_name,
            _name_of_business,
            _email_address,
            _description_of_business,
            _business_address,
            msg.sender
        );
        emit SellerCreated(
            seller_count,
            _first_name,
            _last_name,
            _name_of_business,
            _email_address,
            _description_of_business,
            _business_address,
            msg.sender
        );

    }

    function updateSellerAccount(                   
                            uint _id,       
                            string memory _first_name,
                            string memory _last_name,
                            string memory _name_of_business,
                            string memory _email_address,
                            string memory _description_of_business,
                            string memory _business_address,
                            address _seller_address
                            )public{
        Seller memory s = sellers [_id];
        s.first_name = _first_name;
        s.last_name = _last_name;
        s.name_of_business = _name_of_business;
        s.email_address=_email_address;
        s.description_of_business = _description_of_business;
        s.business_address = _business_address;
        s.seller_address = _seller_address;
        emit SellerUpdated(
                s.id,       
                s.first_name,
                s.last_name,
                s.name_of_business,
                s.email_address,
                s.description_of_business,
                s.business_address,
                s.seller_address
        );
    }
    //set single seller profile
    function getSingleSeller(uint _id)public view returns(
                                  uint id,
                                  string memory,
                                  string memory,
                                  string memory,
                                  string memory,
                                  string memory,
                                  string memory,
                                  address
    ){
        Seller memory s = sellers [_id];
        return (
            s.id,
            s.first_name,
            s.last_name,
            s.name_of_business,
            s.email_address,
            s.description_of_business,
            s.business_address,
            s.seller_address
        );
    }
    // create product functionality
    function createProduct(
                        string memory _product_name,
                        string memory _product_description,
                        uint _product_price,
                        string memory _upload_image
                        )public{
        require(bytes(_product_name).length > 0,"Add A Product Name"); // Product name's length is more than 0
        require(bytes(_product_description).length > 0,"Add A Product Description"); // Product Description length is more than 0
        require(bytes(_upload_image).length > 0,"Add An Upload Image"); // Upload Image length is more than 0
        product_count++;
        products[product_count]= Product(
            product_count,
            _product_name,
            _product_description,
            _product_price,
            _upload_image,
            false,
            msg.sender
        );
        emit ProductCreated(
            product_count,
            _product_name,
            _product_description,
            _product_price,
            _upload_image,
            false,
            msg.sender
        );
    }
    // update product functionality

    function updateProduct(
                            uint _id,
                            string memory _product_name,
                            string memory _product_description,
                            uint _product_price,
                            string memory _upload_image,
                            address payable _seller
                            )public{
        Product memory p = products[_id];
        p.product_name = _product_name;
        p.product_description=_product_description;
        p.product_price = _product_price;
        p.upload_image = _upload_image;
        p.seller = _seller;
        emit ProductUpdated(
            p.id,
            p.product_name,
            p.product_description,
            p.product_price,
            p.upload_image,
            p.sold,
            p.seller    
        );
    }  
  function get_single_product(uint _id)public view returns(
                                  uint id,
                                  string memory,
                                  string memory,
                                  uint,
                                  string memory,
                                  bool,
                                 address                
                                  ){
     Product memory p = products [_id];
        return (
            p.id,
            p.product_name,
            p.product_description,
            p.product_price,
            p.upload_image,
            p.sold,
            p.seller
        );
  }

    function buyProduct(uint _id) public payable{
        // fetch the product
                // Product memory p = products[_id];

        Product memory _product = products[_id];
        // fetch the owner
        address payable _seller = _product.seller;
        // make sure the product is is valid
        require(_product.id > 0 && _product.id <= product_count,"NOT A PRODUCT ID");
        // require that there is enough Ether in the transaction
        require(msg.value >= _product.product_price,"You Don't Have Enough Ether");
        // require that the product has not been purchased
        require(!_product.sold,"PRODUCT ALREADY PURCHASED");
        // require that the buyer is not the seller
        require(_seller != msg.sender,"Seller Can't Purchase His Item");
        // transfer ownership
        // _product.owner = msg.sender;
        // mark as purchased
        _product.sold = true;
        //update the product
        products[_id] = _product;
        // pay the seller by paying them ether
        address(_seller).transfer(msg.value); 
        // trigger an event
        emit ProductPurchased(
            _id,
            _product.product_name,
            _product.product_price,
            _product.seller,
            true
        );
    }

}

