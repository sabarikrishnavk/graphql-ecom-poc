const express = require('express'); 
const bodyParser = require('body-parser');
 
const {calculatePromotion } =require( './evaluator');

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
    console.log("requested : " +orders);

    console.log("--------");   

    calculatePromotion(orders);

    response.send(orders)
  }); 

app.listen(PORT, function () {
  console.log(`Promotion API server listening on port :${PORT}`);
});



