// const{ typeDefs } = require( './schema/schema.graphql');
const {ElasticSearchClient} = require('./server.elasticsearch');
const elasticSearchSchema = require('./server.es.schema');
const { buildFederatedSchema } = require("@apollo/federation");
const {gql} = require("apollo-server");

//const {makeExecutableSchema} = require('graphql-tools');
const typeDefs =  gql`
  type Inventory @key(fields: "id")  {
    id : String!
    sku: String
    stock: String
    location: String
    product: Product
  }
  extend type Product @key(fields: "id") {
    id: String! @external
    inventorys: [Inventory]
  }
  extend type Query {
    inventory: [Inventory]
  }
  `;

// The root provides a resolver function for each API endpoint
const resolvers = {
  Query: {
    inventory: () => new Promise((resolve, reject) => {
      ElasticSearchClient({...elasticSearchSchema})
        .then(r => {
          let _source = r['hits']['hits'];
              _source.map((item, i) => _source[i] = item._source);

          resolve(_source);
        });
    })
  },
  Product: {
    inventorys:(product) => new Promise((resolve, reject) => {
      const searchBody = {
        "size": 1000,
        "from": 0,
        "query": {
          "match": {
            "sku": product.id
          }
        }
      };
      ElasticSearchClient({...searchBody})
        .then(r => {
          let _source = r['hits']['hits'];
              _source.map((item, i) => _source[i] = item._source); 
          resolve(_source);
        });
    })
  },
  Inventory:{
    product(inventory){
      return { __typename: "Product", id: inventory.sku };
    } 
  }
};
const inventorySchema = buildFederatedSchema({
  "typeDefs": [typeDefs],
  "resolvers": resolvers
});
module.exports = inventorySchema;
