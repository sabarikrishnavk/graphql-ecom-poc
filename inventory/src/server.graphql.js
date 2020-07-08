// const{ typeDefs } = require( './schema/schema.graphql');
const {ElasticSearchClient} = require('./server.elasticsearch');
const elasticSearchSchema = require('./server.es.schema');
const { buildFederatedSchema } = require("@apollo/federation");
const {gql} = require("apollo-server");

//const {makeExecutableSchema} = require('graphql-tools');
const typeDefs =  gql`
  type Inventory @key(fields: "id")  {
    id : String
    stock: String
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
    }),
  }
};
const inventorySchema = buildFederatedSchema({
  "typeDefs": [typeDefs],
  "resolvers": resolvers
});
module.exports = inventorySchema;
