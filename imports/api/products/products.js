import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import {Tracker} from 'meteor/tracker';

const Products = new Mongo.Collection('products');

Products.schema = new SimpleSchema({
    canBeSoldOrPurchased: {
        type: Array,
        label: 'Can be'
    },
    'canBeSoldOrPurchased.$': {
        type: String,
        allowedValues: ['Sold', 'Purchased']
    },
    type: {
        type: String,
        allowedValues: ['Service', 'Stock']
    },
    categoryId: {
        type: String,
    },
    code: {
        type: String,
        optional: true
    },
    name: {
        type: String,
    },
    salePrice: {
        type: Number,
    },
    cost: {
        type: Number,
    },
    defaultQty: {
        type: Number,
        defaultValue: 1,
        min: 1
    },
});

Products.attachSchema(Products.schema);

export default Products;
