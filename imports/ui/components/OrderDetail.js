import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import Spin from 'antd/lib/spin';
import Popconfirm from 'antd/lib/popconfirm';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import notification  from 'antd/lib/notification';
import Row  from 'antd/lib/row';
import Col  from 'antd/lib/col';
import Button  from 'antd/lib/button';
import DatePicker  from 'antd/lib/date-picker';
import Modal  from 'antd/lib/modal';
import {AutoForm, AutoField, DateField, SelectField, SubmitField} from 'uniforms-antd';
import Form from 'antd/lib/form';
const FormItem = Form.Item;

import {updateOrder, removeOrderDetail} from '../../api/orders/methods';
import OrderCalculator from './OrderCalculator';
import OrderCustomerContainer from '../containers/OrderCustomer';
import OrderPayment from './OrderPayment';

export default class OrderDetail extends Component {
    state = {
        selectedItemRows: [],
        modalKey: 0,
        visibleModal: false,
        modalType: null,
    };

    componentWillReceiveProps(nextProps) {
    }

    handleRemove = (orderDetailId) => {
        removeOrderDetail.callPromise({_id: orderDetailId}).then((result) => {
            console.log(result);
        }).catch((err) => {
            notification.error({message: err.reason});
        });
    };

    handleOrderedDateUpdate = (date) => {
        let doc = {
            _id: this.props.order._id,
            orderedDate: moment(date).toDate()
        };

        updateOrder.callPromise(doc).then((result) => {
            console.log(result);
        }).catch((err) => {
            notification.error({message: err.reason});
        });
    };

    handleCustomerClick = (modalType) => {
        this.setState({
            modalKey: 1,
            visibleModal: true,
            modalType,
        });
    };

    handleModalCancel = () => {
        this.setState({
            modalKey: 0,
            visibleModal: false,
        });
    };

    footerComponent = (data) => {
        let totalAmount = _.sumBy(data, 'amount');

        return (
            <div style={{fontWeight: 'bold'}}>
                Total: {numeral(totalAmount).format("$ 0,0.00")}
            </div>
        );
    };

    render() {
        const {loading, order, orderDetails, customer, containerHeight} = this.props;

        const columns = [
            {
                title: 'Item',
                dataIndex: 'productDoc.name',
                key: 'item',
                render: (text, record) => {
                    return (<span>
                        <h3>{text}</h3>
                        <h4>
                            {numeral(record.price).format("$ 0,0.00")}
                            {record.discount > 0 ?
                                ` (${numeral(record.discount).format("0,0.00")}% Dis)`
                                :
                                ""
                            }
                        </h4>
                    </span>);
                },
            },
            {
                title: 'Qty',
                dataIndex: 'qty',
                key: 'qty',
                render: (text, record) => (
                    <h3>{numeral(text).format("0,0.00")}</h3>
                )
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                render: (text, record) => (
                    <h3>{numeral(text).format("$ 0,0.00")}</h3>
                )
            },
            // {
            //     title: <Icon type="minus-circle-o"/>,
            //     key: 'action',
            //     width: '30px',
            //     render: (text, record) => (
            //         <a href="#" onClick={() => this.handleRemove(record._id)}><Icon type="minus-circle-o"/></a>
            //     ),
            // }
        ];

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({selectedItemRows: selectedRows});
            },
            // onSelect: (record, selected, selectedRows) => {
            //     console.log('onSelect');
            //     console.log(record, selected, selectedRows);
            // },
            // onSelectAll: (selected, selectedRows, changeRows) => {
            //     console.log('onSelectAll');
            //     console.log(selected, selectedRows, changeRows);
            // },
            // getCheckboxProps: (record) => {
            //     console.log('getCheckboxProps', record);
            //     return {disabled: record.name === 'Disabled User'};    // Column configuration not to be checked
            // },
        };

        // Modal type
        let modalComponent;
        if (this.state.modalType == 'Customer') {
            modalComponent = (
                <OrderCustomerContainer
                    order={order}
                    currentCustomer={customer}
                    handleModalCancel={this.handleModalCancel}
                />
            );
        } else if (this.state.modalType == 'Payment') {
            modalComponent = (
                <OrderPayment
                    order={order}
                    handleModalCancel={this.handleModalCancel}
                />
            );
        }

        return (
            <dvi>
                { loading ?
                    <Spin size="large"/>
                    :
                    <div>
                        <Table
                            scroll={{y: containerHeight}}
                            style={{marginBottom: "10px"}}
                            rowSelection={rowSelection}
                            rowKey={record => record._id}
                            size="small"
                            pagination={false}
                            columns={columns}
                            // onRowClick={(record, index) => this.setState({selectedRows: record})}
                            dataSource={orderDetails}
                            footer={(currentPageData) => this.footerComponent(currentPageData)}
                        />

                        <Row gutter={10}>
                            <Col span={8}>
                                <Button
                                    style={{width: "100%"}}
                                    icon="user"
                                    onClick={() => this.handleCustomerClick('Customer')}
                                >
                                    {customer.name}
                                </Button>
                                <DatePicker
                                    style={{width: "100%"}}
                                    // showTime={true}
                                    defaultValue={moment(order.orderedDate)}
                                    format="DD/MM/YYYY HH:mm:ss"
                                    onChange={(date, dateString) => this.handleOrderedDateUpdate(date)}
                                    onOk={(date) => this.handleOrderedDateUpdate(date)}
                                />
                                <Button
                                    style={{width: "100%"}}
                                    icon="calculator"
                                    onClick={() => this.handleCustomerClick('Payment')}
                                >
                                    Payment
                                </Button>
                            </Col>
                            <Col span={16}>
                                <OrderCalculator selectedItemRows={this.state.selectedItemRows}/>
                            </Col>
                        </Row>

                        {/*Modal*/}
                        <Modal
                            title={this.state.modalType}
                            key={this.state.modalKey}
                            visible={this.state.visibleModal}
                            onCancel={this.handleModalCancel}
                            footer={null}
                            style={{top: 64}}
                        >

                            {modalComponent}

                        </Modal>

                    </div>
                }
            </dvi>
        );
    }
};

OrderDetail.propTypes = {
    loading: PropTypes.bool,
    order: PropTypes.object,
    orderDetails: PropTypes.array,
    customer: PropTypes.object,
};
