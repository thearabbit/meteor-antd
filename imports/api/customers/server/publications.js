import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Customers from '../customers.js';

Meteor.publish('customers.list', () => {
    // Meteor._sleepForMs(100);
    return Customers.find({});
});

Meteor.publish('customers.view', (selector) => {
    check(selector, Object);

    return Customers.find(selector);
});
