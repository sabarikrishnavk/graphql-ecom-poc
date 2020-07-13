const {  Rule } = require('rools');

const ORD_PERCENTAGE_OFF = new Rule({
  name: 'ORD_PERCENTAGE_OFF',
  priority: 5,
  when: (orders) => orders.price >= orders.promotions.ORD_PERCENTAGE_OFF.total,
  then: (orders) => {
    orders.discount = orders.promotions.ORD_PERCENTAGE_OFF.percentage * orders.price; 
  },
});

const ORD_DOLLAR_OFF = new Rule({
  name: 'ORD_DOLLAR_OFF',
  priority: 10,
  when: (orders) => orders.total >= 250,
  then: (orders) => {
    orders.discount =  10 ;
  },
});

module.exports = {ORD_PERCENTAGE_OFF, ORD_DOLLAR_OFF};