import React from 'react';
import {browserHistory} from 'react-router';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import PaymentList from '../containers/PaymentList';

const Categories = () => {
    handleAdd = () => {
        browserHistory.push('/payment/new');
    };

    return (
        <div>
            <Button type="primary" style={{marginBottom: '10px'}} onClick={this.handleAdd}>
                <Icon type="plus"/> Add New
            </Button>

            <PaymentList />
        </div>
    );
};

export default Categories;
