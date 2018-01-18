import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Spin from 'antd/lib/spin';
import Table from 'antd/lib/table';
import notification  from 'antd/lib/notification';
import Popconfirm from 'antd/lib/popconfirm';
import numeral from 'numeral';

import {removeProduct} from '../../api/products/methods';

const ProductList = ({loading, docs}) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'categoryId',
            key: 'categoryId',
        },
        {
            title: 'Sale Price',
            dataIndex: 'salePrice',
            key: 'salePrice',
            render: (text, record) => (
                <span>{numeral(text).format("$ 0,0.00")}</span>
            )
        },
        {
            title: 'Default Qty',
            dataIndex: 'defaultQty',
            key: 'defaultQty',
        },
        {
            title: 'Action',
            key: 'action',
            width: '100px',
            render: (text, record) => (
                <span>
                    <Link to={`/product/${record._id}/edit`}>Edit</Link>
                    <span className="ant-divider"/>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleRemove(record._id)}>
                        <a href="#">Delete</a>
                    </Popconfirm>
                </span>
            ),
        }
    ];

    handleRemove = (_id) => {
        removeProduct.callPromise({_id: _id}).then((result) => {
            notification.success({message: 'Success'});
        }).catch((error) => {
            notification.error({message: err.reason});
        });
    };

    return (
        <div>
            {loading ?
                <Spin size="large"/>
                :
                <div>
                    <Table rowKey={record => record._id} columns={columns} dataSource={docs}/>
                </div>
            }
        </div>
    );
};

ProductList.propTypes = {
    loading: PropTypes.bool,
    docs: PropTypes.array,
};

export default ProductList;
