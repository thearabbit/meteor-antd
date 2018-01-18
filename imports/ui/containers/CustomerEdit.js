import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import Customers from '../../api/customers/customers';
import CustomerEdit from '../pages/CustomerEdit';

export default CustomerEditContainer = createContainer(({params: {_id}}) => {
    const handle = Meteor.subscribe('customers.view', {_id});
    const loading = !handle.ready();
    const doc = Customers.findOne(_id);

    return {
        loading,
        doc,
    };
}, CustomerEdit);