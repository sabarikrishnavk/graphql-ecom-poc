const { Rools } =require( 'rools');
const {ORD_PERCENTAGE_OFF} = require( './rules/order-promotion');
const {ITEM_PERCENTAGE_OFF } =require( './rules/order-item-promotion'); 


const calculatePromotion = (orders) =>{ 
    orders.total = 0;
    orders.discount =0;
    orders.promotions={};
    orders.items.filter(function(item) {
        item.total = ( item.quantity * item.price) ; 
        orders.total = orders.total + item.total;
        item.discount = 0;
    }); 
    
    if(applicablePromos.item){   
        const rules =  applicablePromos.item.map(rules =>  rules.rule); 
        applicablePromos.item.map(rules =>  orders.promotions[rules.rule.name]=rules.config ); 
     
        const orderitemsRule = new Rools(); 
        orderitemsRule.register(rules);
        orderitemsRule.evaluate(orders);
        console.log("--item rules---");
        console.log(orders); 
        // console.log('skusInItemPercentageOff '+ skusInItemPercentageOff(orders).length); 
    
        // const itemFilter =orders.items.filter(function(item) {
        //     const skusInItemPercentageOff = orders.promotions.ITEM_PERCENTAGE_OFF.skus.filter( sku =>  sku == item.sku);
        //     return skusInItemPercentageOff && item.quantity >= orders.promotions.ITEM_PERCENTAGE_OFF.quantity;
        //   }).length > 0 ;
        //   console.log(itemFilter);
        // console.log("-----");
    
    }
    
    
    // if(orders.promotions.shipping){ 
    //     const shippingRule = new Rools();
    //     shippingRule.register(orders.promotions.shipping);
    //     shippingRule.evaluate(orders);
    //     console.log(orders);
    
    //     console.log("--------");
    // }
    
    if(applicablePromos.order){ 
    
        const rules =  applicablePromos.order.map(rules =>  rules.rule); 
        applicablePromos.order.map(rules =>  orders.promotions[rules.rule.name]=rules.config ); 
    
        const orderRule = new Rools(); 
        orderRule.register(rules);
        orderRule.evaluate(orders);
    
        console.log("--order rules---");
        console.log(orders);
        console.log("--------");
    }

    orders.totaldiscount = orders.discount;
    orders.items.filter(function(item) {
        item.total =( item.quantity * item.price) ; 
        orders.totaldiscount = orders.totaldiscount + item.discount;
    }); 

    console.log("--final orders---");
    console.log(orders);
    console.log("--------");
    return orders;
}
//Find eligible item level promotions,
// order level and shipping level promotions.
// facts
const applicablePromos =  {
    order :[
        { 
            rule : ORD_PERCENTAGE_OFF ,
            config : {
                name : "10% of for all orders more than 100",
                total : 100,
                percentage: 0.1
            } 
        } 
    ] ,
    item :[
        { 
            rule : ITEM_PERCENTAGE_OFF ,
            config : {
                name : "10% of for all product in category CAT1", 
                skus: ["SKU1","SKU3"],
                quantity: 2,
                percentage: 0.1
            } 
        } 
    ] 
};
const orders = {  
    items: [ 
        {
            sku: "SKU1",
            quantity: 4,
            price: 25
        },{
            sku: "SKU2",
            quantity: 3,
            price: 75
        }
    ], 
    // payments:[
    //     {
    //         type: "VISA",
    //         amount: 100
    //     },
    //     {
    //         type: "GC",
    //         amount: 50
    //     }
    // ],
    shipping: 5
  };
calculatePromotion(orders);
  // Run the engine to evaluate
module.exports = {calculatePromotion};