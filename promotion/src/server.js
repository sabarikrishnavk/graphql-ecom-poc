const express = require('express'); 
const bodyParser = require('body-parser');

const { Rools } =require( 'rools');
const {percentageOff,dollarOff } =require( './rules/order-promotion');
const {freeshipping } =require( './rules/shipping-promotion');
const {dollarOffItem } =require( './rules/order-item-promotion');

const path = require('path');
const app = express();


const PORT = 9000;
// TODO Set port for the app to listen on
app.set('port', process.env.PORT || 3001);

// TODO Set path to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// TODO Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method");
  next();
});
 
app.use(express.json());
app.post('/calculate', function (request, response) {

    let orders = request.body;  
    console.log(orders);

    const  promotions = { 
        order :[
            percentageOff , dollarOff 
        ],
        item :[
            dollarOffItem
        ],
        shipping :[
            freeshipping
        ]
    };

    orders.promotions=promotions;

    console.log("--------"); 

    // Run the engine to evaluate
    const orderitemsRule = new Rools();
    orderitemsRule.register(orders.promotions.item);
    orderitemsRule.evaluate(orders); 


    const shippingRule = new Rools();
    shippingRule.register(orders.promotions.shipping);
    shippingRule.evaluate(orders); 

    const orderRule = new Rools();
    orderRule.register(orders.promotions.order);
    orderRule.evaluate(orders); 

    orders.promotions=null;


    let total = 0;
    orders.items.filter(function(item) {
      item.total =( item.qty * item.price) ;  
      total = total + item.total;
    });
    orders.total =  total;

    response.send(orders)
  });

app.listen(PORT, function () {
  console.log(`Promotion API server listening on port :${PORT}`);
});



