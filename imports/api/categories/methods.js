import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import SimpleSchema from 'simpl-schema';

import rateLimit from '../../modules/rateLimit';

import Categories from './categories';

// Insert
export const insertCategory = new ValidatedMethod({
    name: 'categories.insert',
    mixins: [CallPromiseMixin],
    // validate: Categories.schema.validator(),
    validate: null,
    run(doc) {
        if (!this.userId) {
            // Throw errors with a specific error code
            throw new Meteor.Error('NotLoggedIn',
                'Must be logged in to make private lists.');
        }

        return Categories.insert(doc);
    }
});

// Update
export const updateCategory = new ValidatedMethod({
    name: 'categories.update',
    mixins: [CallPromiseMixin],
    // validate: Categories.schema.validator(),
    validate: null,
    run(doc) {
        if (!this.userId) {
            // Throw errors with a specific error code
            throw new Meteor.Error('NotLoggedIn',
                'Must be logged in to make private lists.');
        }

        return Categories.update({_id: doc._id}, {$set: doc});
    }
});

export const removeCategory = new ValidatedMethod({
    name: 'categories.remove',
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

        return Categories.remove(selector);
    }
});

rateLimit({
    methods: [
        insertCategory,
        updateCategory,
        removeCategory,
    ],
    limit: 5,
    timeRange: 1000,
});
