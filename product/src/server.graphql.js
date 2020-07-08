// const{ typeDefs } = require( './schema/schema.graphql');
const {ElasticSearchClient} = require('./server.elasticsearch');
const elasticSearchSchema = require('./server.es.schema');
// const {makeExecutableSchema} = require('graphql-tools');

const { buildFederatedSchema } = require("@apollo/federation");
const {gql} = require("apollo-server");

const typeDefs = gql`
  type inOthers {
    name: String!
    quantity: String!
    uuid: String!
  }

  type inStocks {
    name: String!
    quantity: String!
    uuid: String!
  } 
  type Product @key(fields: "id") {
    id : String
    name: String
    default_image: String
    new_product: Boolean
    brand: String!
    promos: [String]
    country: String
    article: String
    promotion: Boolean
    price: String
    in_stocks: [inStocks]
    in_others: inOthers
    in_waiting: inOthers
    currency_name: String 
  }

  extend type Query {
    products: [Product]
  }
  `;

// The root provides a resolver function for each API endpoint
const resolvers = {
  Query: {
    products: () => new Promise((resolve, reject) => {
      ElasticSearchClient({...elasticSearchSchema})
        .then(r => {
          let _source = r['hits']['hits'];
              _source.map((item, i) => _source[i] = item._source);

          resolve(_source);
        });
    }),
  }
};

 const productSchema = buildFederatedSchema({
  "typeDefs": [typeDefs],
  "resolvers": resolvers
});
module.exports =productSchema;
