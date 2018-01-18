import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import Categories from '../../api/categories/categories';
import CategoryList from '../components/CategoryList';

export default CategoryListContainer = createContainer(() => {
    const handle = Meteor.subscribe('categories.list');
    const loading = !handle.ready();
    const docs = Categories.find({}, {sort: {_id: 1}}).fetch();

    return {
        loading,
        docs,
    };
}, CategoryList);