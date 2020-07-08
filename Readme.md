
Elastic instance:
----

docker-compose -f docker-product-es.yml up


create index based on es-mapping and load  data into index
----

cd setup

npm run setup:product
npm run setup:inventory

http://localhost:9200/product/_search 
http://localhost:9200/inventory/_search


Run Product API
----

cd product
npm install 
npm run start:dev

http://localhost:9100/graphql

Run Inventory API
---
cd product
npm install  
npm run start:dev

http://localhost:9101/graphql

