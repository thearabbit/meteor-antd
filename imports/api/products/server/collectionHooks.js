import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import Products from '../products';

Products.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Products, 3);
});

Products.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
});
