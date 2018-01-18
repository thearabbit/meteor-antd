import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import {Tracker} from 'meteor/tracker';

const Orders = new Mongo.Collection('orders');

Orders.schema = new SimpleSchema({
    orderedDate: {
        type: Date,
    },
    total: {
        type: Number,
        optional: true
    },
    status: {
        type: String, // inactive, active, closed, block
    },
    memo: {
        type: String,
        optional: true
    },
    customerId: {
        type: String,
    },
    createdBy: {
        type: String,
    },
});

Orders.attachSchema(Orders.schema);

export default Orders;
