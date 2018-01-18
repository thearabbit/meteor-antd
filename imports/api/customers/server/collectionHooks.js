import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import Customers from '../customers';

Customers.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Customers, 6);
});

Customers.before.update(function (userId, doc, fieldNames, modifier, options) {
});
