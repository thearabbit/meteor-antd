import React from 'react';
import {browserHistory} from 'react-router';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import CustomerList from '../containers/CustomerList';

const Customer = () => {
    handleAdd = () => {
        browserHistory.push('/customer/new');
    };

    return (
        <div>
            <Button type="primary" style={{marginBottom: '10px'}} onClick={this.handleAdd}>
                <Icon type="plus"/> Add New
            </Button>

            <CustomerList />
        </div>
    );
};

export default Customer;
