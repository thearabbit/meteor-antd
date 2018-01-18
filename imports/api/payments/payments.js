import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import {Tracker} from 'meteor/tracker';
import moment from 'moment';

const Payments = new Mongo.Collection('payments');

Payments.schema = new SimpleSchema({
    paidDate: {
        type: Date,
        defaultValue: moment().toDate(),
        optional: true
    },
    dueAmount: {
        type: Number,
    },
    paidAmount: {
        type: Number,
    },
    balance: {
        type: Number,
        optional: true
    },
    orderId: {
        type: String,
    },
});

Payments.attachSchema(Payments.schema);

export default Payments;
