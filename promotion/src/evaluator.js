const { Rools } =require( 'rools');
const {percentageOff,dollarOff } =require( './rules/order-promotion');
const {freeshipping } =require( './rules/shipping-promotion');
const {dollarOffItem } =require( './rules/order-item-promotion');

//Find eligible item level promotions,
// order level and shipping level promotions.
// facts
const orders = { 
    promotions:{
        order :[
            percentageOff , dollarOff 
        ],
        item :[
            dollarOffItem
        ],
        shipping :[
            freeshipping
        ]
    },
    items: [ 
        {
            sku: "SKU1",
            qty: 3,
            price: 25,
        },{
            sku: "SKU2",
            qty: 2,
            price: 75,
        }
    ], 
    shipping: 5
  };
   
  // Run the engine to evaluate
const orderitemsRule = new Rools();
orderitemsRule.register(orders.promotions.item);
orderitemsRule.evaluate(orders);
console.log(orders);

console.log("-----");


const shippingRule = new Rools();
shippingRule.register(orders.promotions.shipping);
shippingRule.evaluate(orders);
console.log(orders);

console.log("--------");
const orderRule = new Rools();
orderRule.register(orders.promotions.order);
orderRule.evaluate(orders);

console.log(orders);
console.log("--------");
   
