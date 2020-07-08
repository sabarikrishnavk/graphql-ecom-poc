// const{ typeDefs } = require( './schema/schema.graphql');
const {ElasticSearchClient} = require('./server.elasticsearch');
const elasticSearchSchema = require('./server.es.schema');
const {makeExecutableSchema} = require('graphql-tools');
const typeDefs = `
type Inventory {
  id : String
  stock: String
}

type Query {
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

module.exports = makeExecutableSchema({
  "typeDefs": [typeDefs],
  "resolvers": resolvers
});
