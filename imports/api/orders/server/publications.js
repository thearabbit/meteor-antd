import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import Orders from '../orders';
import OrderDetails from '../orderDetails';

// Order
Meteor.publish('orders.list', (selector) => {
    // Meteor._sleepForMs(100);
    check(selector, Object);

    return Orders.find(selector);
});

Meteor.publish('orders', (selector, options) => {
    return Orders.find(selector, options);
});

Meteor.publish('orders.view', (_id) => {
    check(_id, String);

    return Orders.find(_id);
});

// Order Detail
Meteor.publish('orderDetails.byOrder', (orderId) => {
    Meteor._sleepForMs(100);

    return OrderDetails.find({orderId: orderId});
});

Meteor.publish('orderDetails.view', (_id) => {
    Meteor._sleepForMs(100);
    check(_id, String);

    return OrderDetails.find(_id);
});
