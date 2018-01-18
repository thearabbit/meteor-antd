import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Spin from 'antd/lib/spin';
import Table from 'antd/lib/table';
import notification  from 'antd/lib/notification';
import Popconfirm from 'antd/lib/popconfirm';
import numeral from 'numeral';

import {removePayment} from '../../api/payments/methods';

const PaymentList = ({loading, docs}) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Paid Date',
            dataIndex: 'paidDate',
            key: 'padiDate',
        },
        {
            title: 'Due Amount',
            dataIndex: 'dueAmount',
            key: 'dueAmount',
            render: (text, record) => (
                <span>{numeral(text).format("$ 0,0.00")}</span>
            )
        },
        {
            title: 'Paid Amount',
            dataIndex: 'paidAmount',
            key: 'paidAmount',
            render: (text, record) => (
                <span>{numeral(text).format("$ 0,0.00")}</span>
            )
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
            render: (text, record) => (
                <span>{numeral(text).format("$ 0,0.00")}</span>
            )
        },
        {
            title: 'Action',
            key: 'action',
            width: '100px',
            render: (text, record) => (
                <span>
                    <Link to={`/payment/${record._id}/edit`}>Edit</Link>
                    <span className="ant-divider"/>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleRemove(record._id)}>
                        <a href="#">Delete</a>
                    </Popconfirm>
                </span>
            ),
        }
    ];

    handleRemove = (_id) => {
        removePayment.callPromise({_id: _id}).then((result) => {
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

PaymentList.propTypes = {
    loading: PropTypes.bool,
    docs: PropTypes.array,
};

export default PaymentList;
