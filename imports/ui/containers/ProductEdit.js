import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import Categories from '../../api/categories/categories';
import Products from '../../api/products/products';
import ProductEdit from '../pages/ProductEdit';

export default ProductEditContainer = createContainer(({params: {_id}}) => {
    const categoriesHandle = Meteor.subscribe('categories.list');
    const handle = Meteor.subscribe('products', {_id});
    const loading = !handle.ready() || !categoriesHandle.ready();
    const doc = Products.findOne(_id);

    const categoryOpts = [{label: "", value: null}];
    Categories.find().forEach((obj) => {
        categoryOpts.push({label: `${obj._id} : ${obj.name}`, value: obj._id});
    });

    return {
        loading,
        doc,
        categoryOpts,
    };
}, ProductEdit);