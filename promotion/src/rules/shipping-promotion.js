const {  Rule } = require('rools');

const freeshipping = new Rule({
  name: 'Free Shipping over $100',
  priority: 25,
  when: (orders) => orders.total >= 100,
  then: (orders) => {
    orders.shipping =  0 ;
  },
});
 

module.exports = {freeshipping};