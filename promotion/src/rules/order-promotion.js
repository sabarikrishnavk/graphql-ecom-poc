const {  Rule } = require('rools');

const percentageOff = new Rule({
  name: '10% off on Order',
  priority: 5,
  when: (orders) => orders.total >= 100,
  then: (orders) => {
    orders.total = 0.9 * orders.total;
  },
});

const dollarOff = new Rule({
  name: '$10 off on order',
  priority: 10,
  when: (orders) => orders.total >= 250,
  then: (orders) => {
    orders.discount =  10 ;
  },
});

module.exports = {percentageOff, dollarOff};