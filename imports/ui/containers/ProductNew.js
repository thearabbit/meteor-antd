import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import Categories from '../../api/categories/categories';
import ProductNew from '../pages/ProductNew';

export default ProductNewContainer = createContainer(() => {
    const handle = Meteor.subscribe('categories.list');
    const loading = !handle.ready();

    const categoryOpts = [{label: "", value: null}];
    Categories.find().forEach((obj) => {
        categoryOpts.push({label: obj.name, value: obj._id});
    });

    return {
        loading,
        categoryOpts,
    };
}, ProductNew);