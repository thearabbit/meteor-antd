import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Spin from 'antd/lib/spin';
import Table from 'antd/lib/table';
import notification  from 'antd/lib/notification';
import Popconfirm from 'antd/lib/popconfirm';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
const FormItem = Form.Item;
import _ from 'lodash';
import {AutoForm, AutoField, DateField, LongTextField, RadioField, SubmitField} from 'uniforms-antd';

import Customers from '../../api/customers/customers';
import {insertCustomerAndUpdateOrder, updateCustomer, removeCustomer} from '../../api/customers/methods';
import {updateOrder} from '../../api/orders/methods';

export  default class OrderCustomer extends Component {
    state = {
        showType: 'view',
        currentCustomer: {}
    };

    componentWillReceiveProps(nextProps) {
        this.setState({currentCustomer: nextProps.currentCustomer});
    }

    handleSubmit = (doc) => {
        if (this.state.showType == 'add') {
            insertCustomerAndUpdateOrder.callPromise({doc, orderId: this.props.order._id}).then((result) => {
                notification.success({message: 'Success'});
                this.props.handleModalCancel();
            }).catch((err) => {
                notification.error({message: err.reason});
            });
        } else if (this.state.showType == 'edit') {
            updateCustomer.callPromise(doc).then((result) => {
                notification.success({message: 'Success'});
                this.props.handleModalCancel();
            }).catch((err) => {
                notification.error({message: err.reason});
            });
        }
    };

    handleRowClick = (record) => {
        this.setState({currentCustomer: record, showType: 'view'});
    };

    handleCustomerChange = () => {
        let doc = {
            _id: this.props.order._id,
            customerId: this.state.currentCustomer._id
        };

        updateOrder.callPromise(doc).then((result) => {
            notification.success({message: 'Success'});
            this.props.handleModalCancel();
        }).catch((err) => {
            notification.error({message: err.reason});
        });
    };

    handleAdd = () => {
        this.setState({showType: 'add'});
    };

    handleUpdate = () => {
        this.setState({showType: 'edit'});
    };

    render() {
        let {loading, docs, order} = this.props;
        let {currentCustomer, showType} = this.state;

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
        ];
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 14},
        };
        const buttonItemLayout = {
            wrapperCol: {span: 14, offset: 4},
        };
        let showTypeComponent = (
            <Row style={{fontSize: 16, margin: "10px 0 10px 0"}}>
                <Col span={12}>
                    <strong>ID:</strong> {currentCustomer._id}<br/>
                    <strong>Name:</strong> {currentCustomer.name} ({currentCustomer.gender})
                </Col>
                <Col span={12}>
                    <strong>Telephone:</strong> {currentCustomer.telephone}<br/>
                    <strong>Address:</strong> {currentCustomer.address}
                </Col>
            </Row>
        );

        if (showType == 'add') {
            showTypeComponent = (<AutoForm
                schema={Customers.schema}
                showInlineError={true}
                onSubmit={this.handleSubmit}
            >
                <Row>
                    <Col span={12}>
                        <AutoField name="name" {...formItemLayout} />
                        <RadioField name="gender" {...formItemLayout} />
                        <AutoField name="telephone" {...formItemLayout} />
                    </Col>
                    <Col span={12}>
                        <LongTextField name="address" {...formItemLayout} />
                        <FormItem {...buttonItemLayout}>
                            <SubmitField/>
                            <Button onClick={() => this.setState({showType: 'view'})}>Cancel</Button>
                        </FormItem>
                    </Col>
                </Row>
            </AutoForm>);
        } else if (showType == 'edit') {
            showTypeComponent = (<AutoForm
                schema={Customers.schema}
                showInlineError={true}
                onSubmit={this.handleSubmit}
                model={this.state.currentCustomer}
            >
                <Row>
                    <Col span={12}>
                        <AutoField name="name" {...formItemLayout} />
                        <RadioField name="gender" {...formItemLayout} />
                        <AutoField name="telephone" {...formItemLayout} />
                    </Col>
                    <Col span={12}>
                        <LongTextField name="address" {...formItemLayout} />
                        <FormItem {...buttonItemLayout}>
                            <SubmitField/>
                            <Button onClick={() => this.setState({showType: 'view'})}>Cancel</Button>
                        </FormItem>
                    </Col>
                </Row>
            </AutoForm>);
        }

        return (
            <div>
                {loading ?
                    <Spin size="large"/>
                    :
                    <div>
                        {showType != 'view' ?
                            ""
                            :
                            <Row>
                                <Col span={8}>
                                    <Button type="primary" style={{marginBottom: '10px'}} onClick={this.handleAdd}>
                                        <Icon type="plus"/> Add New
                                    </Button>
                                </Col>

                                <Col span={8} style={{textAlign: "center"}}>
                                    <Button type="default" style={{marginBottom: '10px'}} onClick={this.handleUpdate}>
                                        <Icon type="edit"/> Edit
                                    </Button>
                                </Col>
                                <Col span={8}>
                                    < Button type="primary" style={{marginBottom: '10px', float: 'right'}}
                                             onClick={this.handleCustomerChange}>
                                        <Icon type="play-circle"/> Change Customer
                                    </Button>
                                </Col>
                            </Row>
                        }

                        {showTypeComponent}

                        <Table
                            rowKey={record => record._id}
                            columns={columns}
                            dataSource={docs}
                            onRowClick={(record, index) => this.handleRowClick(record)}
                        />

                    </div>
                }
            </div>
        );
    }
};

OrderCustomer.propTypes = {
    loading: PropTypes.bool,
    order: PropTypes.object,
    currentCustomer: PropTypes.object,
    docs: PropTypes.array,
    handleModalCancel: PropTypes.func,
};
