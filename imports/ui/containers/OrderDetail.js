import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import _ from 'lodash';

import OrderDetails from '../../api/orders/orderDetails';
import Customers from '../../api/customers/customers';
import OrderDetail from '../components/OrderDetail';

export default OrderContainer = createContainer(({order, containerHeight}) => {
    const handle = Meteor.subscribe('orderDetails.byOrder', order._id);
    const customerHandle = Meteor.subscribe('customers.view', {_id: order.customerId});
    const orderDetails = OrderDetails.find({orderId: order._id}).fetch();
    const customer = Customers.findOne({_id: order.customerId});
    const loading = !handle.ready() || _.isEmpty(customer);

    return {loading, order, orderDetails, customer, containerHeight};
}, OrderDetail);
