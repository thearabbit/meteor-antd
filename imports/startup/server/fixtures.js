import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import {Accounts} from 'meteor/accounts-base';

import Categories from '../../api/categories/categories';
import Customers from '../../api/customers/customers';

if (!Meteor.isProduction) {
    // User
    const users = [{
        email: 'admin@admin.com',
        password: 'password',
        profile: {
            name: {first: 'Theara', last: 'Yuom'},
        },
        roles: ['admin'],
    }];

    users.forEach(({email, password, profile, roles}) => {
        const userExists = Meteor.users.findOne({'emails.address': email});

        if (!userExists) {
            const userId = Accounts.createUser({email, password, profile});
            Roles.addUsersToRoles(userId, roles);
        }
    });

    // Category
    const cateData = [{"name": "All"}];
    if (Categories.find().count() == 0) {
        cateData.forEach((doc) => {
            Categories.insert(doc);
        });
    }

    // Customer
    const cusData = [{name: 'General', gender: 'Male', telephone: '053 50 66 777', address: 'Battambang'}];
    if (Customers.find().count() == 0) {
        cusData.forEach((doc) => {
            Customers.insert(doc);
        });
    }

}
