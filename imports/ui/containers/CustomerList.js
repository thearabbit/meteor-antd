import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import Customers from '../../api/customers/customers';
import CustomerList from '../components/CustomerList';

export default CustomerListContainer = createContainer(() => {
    const handle = Meteor.subscribe('customers.list');
    const loading = !handle.ready();
    const docs = Customers.find({}, {sort: {_id: 1}}).fetch();

    return {
        loading,
        docs,
    };
}, CustomerList);