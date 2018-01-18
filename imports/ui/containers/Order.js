import {Meteor} from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var';
import {createContainer} from 'meteor/react-meteor-data';
import notification  from 'antd/lib/notification';

import Orders from '../../api/orders/orders';
import {createNewInactiveOrderIfDoNot} from '../../api/orders/methods';
import Order from '../pages/Order';

export default OrderContainer = createContainer(() => {
    let methodCallIsReady = new ReactiveVar(false);

    createNewInactiveOrderIfDoNot.callPromise().then((result) => {
        methodCallIsReady.set(true);
    }).catch((err) => {
        console.log(err);
    });

    const handle = Meteor.subscribe('orders.list', {status: 'inactive', createdBy: Meteor.userId()});
    const loading = !handle.ready() || !methodCallIsReady;
    const inactiveOrders = Orders.find().fetch();

    return {loading, inactiveOrders};
}, Order);