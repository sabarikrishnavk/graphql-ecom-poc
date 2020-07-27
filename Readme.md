
Elastic instance:
----

docker-compose -f docker-product-es.yml up


create index based on es-mapping and load  data into index
----

cd setup
<br>
npm run setup:product
<br>
npm run setup:inventory
<br>
http://localhost:9200/product/_search 
<br>
http://localhost:9200/inventory/_search


Run Product API
----

cd product
<br>
npm install 
<br>
npm run start:dev
<br>
http://localhost:9100/graphql

Run Inventory API
---
cd inventory
<br>
npm install  
<br>
npm run start:dev
<br>
http://localhost:9101/graphql


Run Gateway (Apollo federation) API
---
cd gateway
<br>
npm install  
<br>
npm run start:dev
<br>
http://localhost:4000/graphql


Run Promotion API
---
cd inventory
<br>
npm install  
<br>
npm run start:dev
<br>

POST http://localhost:9000/calculate
<br>
{
    "items": [ 
        {
            "sku": "SKU3",
            "qty": 3,
            "price": 25.99
        },{
            "sku": "SKU2",
            "qty": 2,
            "price": 75.25
        }
    ], 
    "shipping": 5
 }

