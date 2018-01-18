import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Categories from '../categories.js';

Meteor.publish('categories.list', () => {
    // Meteor._sleepForMs(100);
    return Categories.find({});
});

Meteor.publish('categories.view', (selector) => {
    check(selector, Object);

    return Categories.find(selector);
});
