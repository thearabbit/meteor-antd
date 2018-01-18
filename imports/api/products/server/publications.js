import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import Products from '../products.js';

Meteor.publish('products.list', () => {
    // Meteor._sleepForMs(500);
    return Products.find({});
});

Meteor.publish('products', (selector = {}, options = {}) => {
    // check(_id, String);

    return Products.find(selector, options);
});
