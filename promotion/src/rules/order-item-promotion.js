const {  Rule } = require('rools');
 
const dollarOffItem = new Rule({
  name: '$10 off on SKU1',
  priority: 10,
  when: [
    (orders) => orders.items.filter(function(item) {
      return item.sku =='SKU1' && item.qty >=2;
    }).length > 0
  ],
  then: (orders) => { 
    let total = 0;
    orders.items.filter(function(item) {
      item.total =( item.qty * item.price) ; 
      item.discount = 10; 
      total = total + item.total;
    });
    orders.total =  total;
      
  },
});

module.exports = {dollarOffItem};