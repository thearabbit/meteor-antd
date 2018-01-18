import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import SimpleSchema from 'simpl-schema';

import rateLimit from '../../modules/rateLimit';

import Products from './products';

// Insert
export const insertProduct = new ValidatedMethod({
    name: 'products.insert',
    mixins: [CallPromiseMixin],
    // validate: Products.schema.validator(),
    validate: null,
    run(doc) {
        if (!this.userId) {
            // Throw errors with a specific error code
            throw new Meteor.Error('NotLoggedIn',
                'Must be logged in to make private lists.');
        }

        return Products.insert(doc);
    }
});

// Update
export const updateProduct = new ValidatedMethod({
    name: 'products.update',
    mixins: [CallPromiseMixin],
    // validate: Products.schema.validator(),
    validate: null,
    run(doc) {
        if (!this.userId) {
            // Throw errors with a specific error code
            throw new Meteor.Error('NotLoggedIn',
                'Must be logged in to make private lists.');
        }

        return Products.update({_id: doc._id}, {$set: doc});
    }
});

export const removeProduct = new ValidatedMethod({
    name: 'products.remove',
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

        return Products.remove(selector);
    }
});

rateLimit({
    methods: [
        insertProduct,
        updateProduct,
        removeProduct,
    ],
    limit: 5,
    timeRange: 1000,
});
