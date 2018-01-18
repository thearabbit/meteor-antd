import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import AppHeader from '../components/AppHeader.js';

export default AppHeaderContainer = createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, AppHeader);