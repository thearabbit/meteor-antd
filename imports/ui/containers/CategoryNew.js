import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import Categories from '../../api/categories/categories';
import CategoryNew from '../pages/CategoryNew';

export default CategoryNewContainer = createContainer(() => {
    const handle = Meteor.subscribe('categories.list');
    const loading = !handle.ready();
    const parentOpts = [{label: "", value: null}];

    Categories.find().forEach((obj) => {
        parentOpts.push({label: obj.name, value: obj._id});
    });

    return {
        loading,
        parentOpts,
    };
}, CategoryNew);