const typeDefs = `
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
  type Product {
    id: String
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

  type Query {
    products: [Product]
  }
`;

module.exports = typeDefs;

