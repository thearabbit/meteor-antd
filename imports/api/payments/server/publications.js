import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import Payments from '../payments';

Meteor.publish('payments', (selector = {}, options = {}) => {

    return Payments.find(selector, options);
});
