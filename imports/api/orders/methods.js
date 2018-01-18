import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import SimpleSchema from 'simpl-schema';
import _ from 'lodash';

import rateLimit from '../../modules/rateLimit';

import Orders from './orders';
import OrderDetails from './orderDetails';
import Customers from '../customers/customers';

/*******
 * Order
 ******/
const addNewOrder = ({createdBy}) => {
    let generalCustomer = Customers.findOne({name: 'General'});

    if (!_.isEmpty(generalCustomer)) {
        const doc = {
            orderedDate: new Date(),
            customerId: generalCustomer._id,
            total: 0,
            status: 'inactive',
            createdBy: createdBy
        };

        return Orders.insert(doc);
    }
};

// Check exist active order
export const createNewInactiveOrderIfDoNot = new ValidatedMethod({
    name: 'orders.createNewInactiveIfDoNot',
    mixins: [CallPromiseMixin],
    // validate: Orders.schema.validator(),
    validate: null,
    run() {
        if (!this.isSimulation) {
            if (!this.userId) {
                // Throw errors with a specific error code
                throw new Meteor.Error('NotLoggedIn',
                    'Must be logged in to make private lists.');
            }

            let existInactive = Orders.findOne({status: 'inactive'});
            if (existInactive) {
                return 'has';
            } else {
                return addNewOrder({createdBy: this.userId});
            }
        }
    }
});

// Insert
export const insertOrder = new ValidatedMethod({
    name: 'orders.insert',
    mixins: [CallPromiseMixin],
    // validate: Orders.schema.validator(),
    validate: null,
    run() {
        if (!this.isSimulation) {
            if (!this.userId) {
                // Throw errors with a specific error code
                throw new Meteor.Error('NotLoggedIn',
                    'Must be logged in to make private lists.');
            }

            return addNewOrder({createdBy: this.userId});
        }
    }
});

// Update
export const updateOrder = new ValidatedMethod({
    name: 'orders.update',
    mixins: [CallPromiseMixin],
    // validate: Orders.schema.validator(),
    validate: null,
    run(doc) {
        if (!this.isSimulation) {
            if (!this.userId) {
                // Throw errors with a specific error code
                throw new Meteor.Error('NotLoggedIn',
                    'Must be logged in to make private lists.');
            }

            return Orders.update({_id: doc._id}, {$set: doc});
        }
    }
});

export const removeOrder = new ValidatedMethod({
    name: 'orders.remove',
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


            Orders.remove(selector);
            OrderDetails.remove({orderId: selector._id});

            return 'success';
        }
    }
});

/**************
 * Order Detail
 *************/
// Upsert
export const upsertOrderDetail = new ValidatedMethod({
    name: 'orderDetails.upsert',
    mixins: [CallPromiseMixin],
    // validate: Orders.schema.validator(),
    validate: null,
    run(doc) {
        if (!this.isSimulation) {
            if (!this.userId) {
                // Throw errors with a specific error code
                throw new Meteor.Error('NotLoggedIn',
                    'Must be logged in to make private lists.');
            }

            // Check product exist (ID and Price)
            let proExist = OrderDetails.findOne({
                orderId: doc.orderId,
                productId: doc.productId,
                price: doc.price,
                discount: doc.discount
            });

            if (_.isEmpty(proExist)) {
                return OrderDetails.insert(doc);
            } else {
                proExist.qty += doc.qty;
                let amount = proExist.qty * doc.price;
                amount -= amount * proExist.discount / 100;
                proExist.amount = amount;
                proExist.productDoc = doc.productDoc;

                return OrderDetails.update({_id: proExist._id}, {$set: proExist});
            }
        }
    }
});

// Insert
export const insertOrderDetail = new ValidatedMethod({
    name: 'orderDetails.insert',
    mixins: [CallPromiseMixin],
    // validate: Orders.schema.validator(),
    validate: null,
    run(doc) {
        if (!this.isSimulation) {
            if (!this.userId) {
                // Throw errors with a specific error code
                throw new Meteor.Error('NotLoggedIn',
                    'Must be logged in to make private lists.');
            }

            return OrderDetails.insert(doc);
        }
    }
});

// Update
export const updateOrderDetail = new ValidatedMethod({
    name: 'orderDetails.update',
    mixins: [CallPromiseMixin],
    // validate: Orders.schema.validator(),
    validate: null,
    run(docs) {
        if (!this.isSimulation) {
            if (!this.userId) {
                // Throw errors with a specific error code
                throw new Meteor.Error('NotLoggedIn',
                    'Must be logged in to make private lists.');
            }

            if (_.isArray(docs)) {
                docs.forEach((doc) => {
                    OrderDetails.update({_id: doc._id}, {$set: doc});
                });
            } else {
                OrderDetails.update({_id: docs._id}, {$set: docs});
            }

            return true;
        }
    }
});

export const removeOrderDetail = new ValidatedMethod({
    name: 'orderDetails.remove',
    mixins: [CallPromiseMixin],
    validate: null,
    // validate: new SimpleSchema({
    //     selector: {type: Object},
    // }).validator(),
    run(selector) {
        if (!this.isSimulation) {
            if (!this.userId) {
                // Throw errors with a specific error code
                throw new Meteor.Error('NotLoggedIn',
                    'Must be logged in to make private lists.');
            }

            return OrderDetails.remove(selector);
        }
    }
});

rateLimit({
    methods: [
        insertOrder,
        updateOrder,
        removeOrder,
        insertOrderDetail,
        updateOrderDetail,
        removeOrderDetail,
    ],
    limit: 5,
    timeRange: 1000,
});
