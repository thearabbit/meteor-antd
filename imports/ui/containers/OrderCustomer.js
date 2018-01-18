import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import Customers from '../../api/customers/customers';
import OrderCustomer from '../components/OrderCustomer';

export default OrderCustomerContainer = createContainer(({order, currentCustomer, handleModalCancel}) => {
    const handle = Meteor.subscribe('customers.list');
    const loading = !handle.ready();
    const docs = Customers.find({}, {sort: {_id: 1}}).fetch();

    return {loading, docs, order, currentCustomer, handleModalCancel};
}, OrderCustomer);