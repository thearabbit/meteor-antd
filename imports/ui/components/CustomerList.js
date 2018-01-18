import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Spin from 'antd/lib/spin';
import Table from 'antd/lib/table';
import notification  from 'antd/lib/notification';
import Popconfirm from 'antd/lib/popconfirm';
import _ from 'lodash';

import {removeCustomer} from '../../api/customers/methods';

const CustomerList = ({loading, docs}) => {

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
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Telephone',
            dataIndex: 'telephone',
            key: 'telephone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            width: '100px',
            render: (text, record) => (
                <span>
                    {
                        record.name == 'General' ?
                            ""
                            :
                            <span>
                                <Link to={`/customer/${record._id}/edit`}>Edit</Link>
                                < span className="ant-divider"/>
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleRemove(record._id)}>
                                <a href="#">Delete</a>
                                </Popconfirm>
                            </span>
                    }
                </span>
            ),
        }
    ];

    handleRemove = (_id) => {
        removeCustomer.callPromise({_id: _id}).then((result) => {
            notification.success({message: 'Success'});
        }).catch((err) => {
            notification.error({message: err.reason});
        });
    };

    return (
        <div>
            {loading ?
                <Spin size="large"/>
                :
                <Table rowKey={record => record._id} columns={columns} dataSource={docs}/>
            }
        </div>
    );
};

CustomerList.propTypes = {
    loading: PropTypes.bool,
    docs: PropTypes.array,
};

export default CustomerList;
