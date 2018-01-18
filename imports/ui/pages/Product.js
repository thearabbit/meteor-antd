import React from 'react';
import {browserHistory} from 'react-router';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import ProductList from '../containers/ProductList';

const Product = () => {
    handleAdd = () => {
        browserHistory.push('/product/new');
    };

    return (
        <div>
            <Button type="primary" style={{marginBottom: '10px'}} onClick={this.handleAdd}>
                <Icon type="plus"/> Add New
            </Button>

            <ProductList />
        </div>
    );
};

export default Product;
