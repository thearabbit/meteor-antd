import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import {Tracker} from 'meteor/tracker';

const OrderDetails = new Mongo.Collection('orderDetails');

OrderDetails.schema = new SimpleSchema({
    orderId: {
        type: String,
    },
    productId: {
        type: String,
    },
    qty: {
        type: Number,
    },
    price: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    productDoc: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

OrderDetails.attachSchema(OrderDetails.schema);

export default OrderDetails;
