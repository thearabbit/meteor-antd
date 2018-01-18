import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import SimpleSchema from 'simpl-schema';

import rateLimit from '../../modules/rateLimit';

import Customers from './customers';
import Orders from '../orders/orders';

// Insert
export const insertCustomer = new ValidatedMethod({
    name: 'customers.insert',
    mixins: [CallPromiseMixin],
    // validate: Customer.schema.validator(),
    validate: null,
    run(doc) {
        if (!this.userId) {
            // Throw errors with a specific error code
            throw new Meteor.Error('NotLoggedIn',
                'Must be logged in to make private lists.');
        }

        return Customers.insert(doc);
    }
});

// Insert
export const insertCustomerAndUpdateOrder = new ValidatedMethod({
    name: 'customers.insertAndUpdateOrder',
    mixins: [CallPromiseMixin],
    // validate: Customer.schema.validator(),
    validate: null,
    run({doc, orderId}) {
        if (!this.userId) {
            // Throw errors with a specific error code
            throw new Meteor.Error('NotLoggedIn',
                'Must be logged in to make private lists.');
        }

        let customerId = Customers.insert(doc);
        Orders.update({_id: orderId}, {$set: {customerId}});

        return customerId;
    }
});

// Update
export const updateCustomer = new ValidatedMethod({
    name: 'customers.update',
    mixins: [CallPromiseMixin],
    // validate: Customer.schema.validator(),
    validate: null,
    run(doc) {
        if (!this.userId) {
            // Throw errors with a specific error code
            throw new Meteor.Error('NotLoggedIn',
                'Must be logged in to make private lists.');
        }

        return Customers.update({_id: doc._id}, {$set: doc});
    }
});

export const removeCustomer = new ValidatedMethod({
    name: 'customers.remove',
    mixins: [CallPromiseMixin],
    // validate: null,
    validate: new SimpleSchema({
        _id: {type: String},
    }).validator(),
    run(selector) {
        if (!this.userId) {
            // Throw errors with a specific error code
            throw new Meteor.Error('NotLoggedIn',
                'Must be logged in to make private lists.');
        }

        return Customers.remove(selector);
    }
});

rateLimit({
    methods: [
        insertCustomer,
        updateCustomer,
        removeCustomer,
    ],
    limit: 5,
    timeRange: 1000,
});
