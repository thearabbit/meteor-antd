import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import Categories from '../../api/categories/categories';
import CategoryEdit from '../pages/CategoryEdit';

export default CategoryEditContainer = createContainer(({params: {_id}}) => {
    const handle = Meteor.subscribe('categories.list');
    const loading = !handle.ready();
    const doc = Categories.findOne(_id);

    const parentOpts = [{label: "", value: null}];
    Categories.find({_id: {$ne: _id}}).forEach((obj) => {
        parentOpts.push({label: `${obj._id} : ${obj.name}`, value: obj._id});
    });

    return {
        loading,
        doc,
        parentOpts
    };
}, CategoryEdit);