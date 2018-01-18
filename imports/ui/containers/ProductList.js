import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import Products from '../../api/products/products';
import ProductList from '../components/ProductList';

export default ProductListContainer = createContainer(() => {
    const handle = Meteor.subscribe('products.list');
    const loading = !handle.ready();
    const docs = Products.find({}, {sort: {_id: 1}}).fetch();

    return {
        loading,
        docs,
    };
}, ProductList);