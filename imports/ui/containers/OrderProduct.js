import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import _ from 'lodash';

import Categories from '../../api/categories/categories';
import Products from '../../api/products/products';
import OrderProduct from '../components/OrderProduct';

export default OrderProductContainer = createContainer(({orderId}) => {
    const categoriesHandle = Meteor.subscribe('categories.list');
    const handle = Meteor.subscribe('products.list');
    const loading = !handle.ready() || !categoriesHandle;

    return {
        loading,
        orderId
    };
}, OrderProduct);