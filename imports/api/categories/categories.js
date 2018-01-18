import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import {Tracker} from 'meteor/tracker';

const Categories = new Mongo.Collection('categories');

Categories.schema = new SimpleSchema({
    parent: {
        type: String,
        optional: true,
        // allowedValues(){
        //     const parentOpts = [null];
        //     Categories.find().forEach((obj) => {
        //         parentOpts.push(obj._id);
        //     });
        //
        //     return parentOpts;
        // }
    },
    name: {
        type: String,
    },
    ancestors: {
        type: Array,
        optional: true
    },
    'ancestors.$': {
        type: String,
    },
    order: {
        type: String,
        optional: true
    }
});

Categories.attachSchema(Categories.schema);

export default Categories;
