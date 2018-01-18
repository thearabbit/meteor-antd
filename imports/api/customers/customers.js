import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import {Tracker} from 'meteor/tracker';

const Customers = new Mongo.Collection('customers');

Customers.schema = new SimpleSchema({
    name: {
        type: String,
    },
    gender: {
        type: String,
        defaultValue: 'Male',
        allowedValues: ['Male', 'Female']
    },
    telephone: {
        type: String,
        optional: true
    },
    address: {
        type: String,
        optional: true
    },
});

Customers.attachSchema(Customers.schema);

export default Customers;
