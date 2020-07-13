const {  Rule } = require('rools');
  
const skusInItemPercentageOff = (orders) => { 
  return orders.items.filter(function(item) {
    return item.quantity >= orders.promotions.ITEM_PERCENTAGE_OFF.quantity &&  
          orders.promotions.ITEM_PERCENTAGE_OFF.skus.filter( sku =>  sku == item.sku).length > 0;  
    }).map(item => item.sku);
};
const ITEM_PERCENTAGE_OFF = new Rule({
  name: 'ITEM_PERCENTAGE_OFF',
  priority: 10,
  when: [
    (orders) => skusInItemPercentageOff(orders).length > 0 
  ],
  then: (orders) => {  
    orders.items.forEach(function(item) { 
      skusInItemPercentageOff(orders).forEach(sku => {
        if(sku == item.sku){
          item.discount = orders.promotions.ITEM_PERCENTAGE_OFF.percentage * item.total;
        }
      });
    });
  },
});
// const ITM_PERCENTAGE_OFF = new Rule({
//   name: 'ITM_PERCENTAGE_OFF',
//   priority: 10,
//   when: [
//     (orders) => orders.items.filter(function(item) {
//       return item.sku =='SKU1' && item.qty >=2;
//     }).length > 0,
//     (orders) => orders.payment !=null && orders.payment.filter(function(payment){
//       return payment.type =='VISA';
//     }).length > 0,
//   ],
//   then: (orders) => { 
//     let total = 0;
//     orders.items.filter(function(item) {
//       item.total =( item.qty * item.price) ; 
//       item.discount = 10; 
//       total = total + item.total;
//     });
//     orders.total =  total; 
//   },
// });

module.exports = {ITEM_PERCENTAGE_OFF, skusInItemPercentageOff};