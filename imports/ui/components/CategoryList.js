import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Spin from 'antd/lib/spin';
import Table from 'antd/lib/table';
import notification  from 'antd/lib/notification';
import Popconfirm from 'antd/lib/popconfirm';
import _ from 'lodash';

import {removeCategory} from '../../api/categories/methods';

const CategoryList = ({loading, docs}) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            render: (text, record) => {
                let marginLeft = record.ancestors ? record.ancestors.length * 10 : 0;

                return (
                    <span style={{marginLeft: `${marginLeft}px`}}>
                        {text}
                    </span>
                );
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Parent',
            dataIndex: 'parent',
            key: 'parent',
        },
        {
            title: 'Action',
            key: 'action',
            width: '100px',
            render: (text, record) => (
                <span>
                {
                    record.name == 'All' ?
                        ""
                        :
                        <span>
                            <Link to={`/category/${record._id}/edit`}>Edit</Link>
                            <span className="ant-divider"/>
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
        removeCategory.callPromise({_id: _id}).then((result) => {
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
                <div>
                    <Table rowKey={record => record._id} columns={columns} dataSource={docs}/>
                </div>
            }
        </div>
    );
};

CategoryList.propTypes = {
    loading: PropTypes.bool,
    docs: PropTypes.array,
};

export default CategoryList;
