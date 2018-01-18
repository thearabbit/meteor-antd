import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import SimpleSchema from 'simpl-schema';
import _ from 'lodash';

import rateLimit from '../../modules/rateLimit';

import Payments from './payments';

// Insert
export const insertPayment = new ValidatedMethod({
    name: 'payments.insert',
    mixins: [CallPromiseMixin],
    // validate: Payments.schema.validator(),
    validate: null,
    run(doc) {
        if (!this.isSimulation) {
            if (!this.userId) {
                // Throw errors with a specific error code
                throw new Meteor.Error('NotLoggedIn',
                    'Must be logged in to make private lists.');
            }

            return Payments.insert(doc);
        }
    }
});

// Update
export const updatePayment = new ValidatedMethod({
    name: 'payments.update',
    mixins: [CallPromiseMixin],
    // validate: Payments.schema.validator(),
    validate: null,
    run(doc) {
        if (!this.isSimulation) {
            if (!this.userId) {
                // Throw errors with a specific error code
                throw new Meteor.Error('NotLoggedIn',
                    'Must be logged in to make private lists.');
            }

            return Payments.update({_id: doc._id}, {$set: doc});
        }
    }
});

export const removePayment = new ValidatedMethod({
    name: 'payments.remove',
    mixins: [CallPromiseMixin],
    // validate: null,
    validate: new SimpleSchema({
        _id: {type: String},
    }).validator(),
    run(selector) {
        if (!this.isSimulation) {
            if (!this.userId) {
                // Throw errors with a specific error code
                throw new Meteor.Error('NotLoggedIn',
                    'Must be logged in to make private lists.');
            }

            Payments.remove(selector);

            return 'success';
        }
    }
});

rateLimit({
    methods: [
        insertPayment,
        updatePayment,
        removePayment,
    ],
    limit: 5,
    timeRange: 1000,
});
