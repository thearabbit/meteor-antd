import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import Payments from '../../api/payments/payments';
import PaymentList from '../components/PaymentList';

export default PaymentListContainer = createContainer(() => {
    const handle = Meteor.subscribe('payments');
    const loading = !handle.ready();
    const docs = Payments.find({}, {sort: {_id: 1}}).fetch();

    return {
        loading,
        docs,
    };
}, PaymentList);