import {Meteor} from 'meteor/meteor';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from '../../ui/layouts/App';
import NotFound from '../../ui/pages/NotFound';
import Login from '../../ui/pages/Login';
import Index from '../../ui/pages/Index';

// Category
import Category from '../../ui/pages/Category';
import CategoryNewContainer from '../../ui/containers/CategoryNew';
import CategoryEditContainer from '../../ui/containers/CategoryEdit';

// Product
import Product from '../../ui/pages/Product';
import ProductNewContainer from '../../ui/containers/ProductNew';
import ProductEditContainer from '../../ui/containers/ProductEdit';

// Customer
import Customer from '../../ui/pages/Customer';
import CustomerNew from '../../ui/pages/CustomerNew';
import CustomerEditContainer from '../../ui/containers/CustomerEdit';

// Order
import OrderContainer from '../../ui/containers/Order';

// Payment
import Payment from '../../ui/pages/Payment';
// import CustomerNew from '../../ui/pages/CustomerNew';
// import CustomerEditContainer from '../../ui/containers/CustomerEdit';

// Authentication
const authenticate = (nextState, replace) => {
    if (!Meteor.loggingIn() && !Meteor.userId()) {
        replace({
            pathname: '/login',
            state: {nextPathname: nextState.location.pathname},
        });
    }
};

Meteor.startup(() => {
    render(
        <Router history={browserHistory}>
            <Route path="login" component={Login}/>
            <Route name="Home" path="/" component={App} onEnter={authenticate}>
                <IndexRoute component={Index} breadcrumbIgnore/>

                <Route name="Order" path="order" component={OrderContainer}/>

                <Route name="Payment" path="/payment">
                    <IndexRoute component={Payment} breadcrumbIgnore/>
                    {/*<Route name="New" path="new" component={CategoryNewContainer}/>*/}
                    {/*<Route name="Edit" path=":_id/edit" component={CategoryEditContainer}/>*/}
                </Route>

                <Route name="Category" path="/category">
                    <IndexRoute component={Category} breadcrumbIgnore/>
                    <Route name="New" path="new" component={CategoryNewContainer}/>
                    <Route name="Edit" path=":_id/edit" component={CategoryEditContainer}/>
                </Route>

                <Route name="Product" path="/product">
                    <IndexRoute component={Product} breadcrumbIgnore/>
                    <Route name="New" path="new" component={ProductNewContainer}/>
                    <Route name="Edit" path=":_id/edit" component={ProductEditContainer}/>
                </Route>

                <Route name="Customer" path="/customer">
                    <IndexRoute component={Customer} breadcrumbIgnore/>
                    <Route name="New" path="new" component={CustomerNew}/>
                    <Route name="Edit" path=":_id/edit" component={CustomerEditContainer}/>
                </Route>

                <Route name="404: Not Found" path="*" component={NotFound}/>
            </Route>
        </Router>,
        document.getElementById('react-root'));
});
