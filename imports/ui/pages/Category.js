import React from 'react';
import {browserHistory} from 'react-router';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import CategoryList from '../containers/CategoryList';

const Category = () => {
    handleAdd = () => {
        browserHistory.push('/category/new');
    };

    return (
        <div>
            <Button type="primary" style={{marginBottom: '10px'}} onClick={this.handleAdd}>
                <Icon type="plus"/> Add New
            </Button>
            <CategoryList />
        </div>
    );
};

export default Category;
