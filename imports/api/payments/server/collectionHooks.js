import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import Payments from '../payments';

Payments.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Payments, 3);
});

Payments.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
});
