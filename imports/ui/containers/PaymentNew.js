import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import Orders from '../../api/orders/orders';
import PaymentNew from '../pages/PaymentNew';

export default PaymentNewContainer = createContainer(() => {
    const handle = Meteor.subscribe('orders', {});
    const loading = !handle.ready();

    const orderOpts = [{label: "", value: null}];
    Orders.find().forEach((obj) => {
        orderOpts.push({label: obj.name, value: obj._id});
    });

    return {
        loading,
        orderOpts,
    };
}, PaymentNew);