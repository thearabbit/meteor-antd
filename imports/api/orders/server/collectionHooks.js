import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import Orders from '../orders';
import OrderDetails from '../orderDetails';

// Orders
Orders.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Orders, 3);
});

// Order details
OrderDetails.after.insert(function (userId, doc) {
    Orders.update({_id: doc.orderId}, {$inc: {total: doc.amount}});
});

OrderDetails.after.update(function (userId, doc, fieldNames, modifier, options) {
    let variantAmount = doc.amount - this.previous.amount;
    Orders.update({_id: doc.orderId}, {$inc: {total: variantAmount}});
});

OrderDetails.after.remove(function (userId, doc) {
    Orders.update({_id: doc.orderId}, {$inc: {total: -doc.amount}});
});
