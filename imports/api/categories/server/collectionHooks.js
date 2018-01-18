import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import Categories from '../categories';

Categories.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Categories, 3);

    // Get ancestors
    if (doc.parent) {
        let getAncestors = Categories.findOne({_id: doc.parent});
        let ancestors = getAncestors.ancestors || [];

        ancestors.push(doc.parent);
        doc.ancestors = ancestors;

        doc.order = `${getAncestors.order}${doc._id}`;
    } else {
        doc.order = doc._id;
    }
});

Categories.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};

    // Get ancestors
    if (modifier.$set.parent) {
        let getAncestors = Categories.findOne({_id: modifier.$set.parent});
        let ancestors = getAncestors.ancestors || [];

        ancestors.push(modifier.$set.parent);
        modifier.$set.ancestors = ancestors;

        modifier.$set.order = `${getAncestors.order}${modifier.$set._id}`;
    } else {
        modifier.$set.order = modifier.$set._id;
    }
});
