import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {AutoForm, AutoField, DateField, SelectField, SubmitField} from 'uniforms-antd';
import moment from 'moment';
import Spin from 'antd/lib/spin';
import Form from 'antd/lib/form';
const FormItem = Form.Item;
import notification  from 'antd/lib/notification';
import _ from 'lodash';

import Payments from '../../api/payments/payments';
import {insertPayment} from '../../api/payments/methods';

export default class OrderPayment extends Component {
    constructor(props) {
        super(props);
        let model = {
            orderId: props.order._id,
            paidDate: props.order.orderedDate,
            dueAmount: props.order.total,
            paidAmount: props.order.total,
            balance: 0,
        };
        this.state = {model: model};

        console.log(props);
    }

    handleChange = (key, val) => {
        this.setState(state => ({model: _.set(_.cloneDeep(state.model), key, val)}));
        if (key === 'paidAmount') {
            let balance = this.state.model.dueAmount - val;
            this.setState(state => ({model: _.set(_.cloneDeep(state.model), 'balance', balance)}));
        }
    };

    handleSubmit = (doc) => {
        console.log(doc);

        insertPayment.callPromise(doc).then((result) => {
            notification.success({message: 'Success'});
            this.props.handleModalCancel();
        }).catch((err) => {
            notification.error({message: err.reason});
        });
    };

    render() {
        // let {loading, orderOpts} = this.props;

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 14},
        };
        const buttonItemLayout = {
            wrapperCol: {span: 14, offset: 4},
        };

        return (
            <div>
                <AutoForm
                    schema={Payments.schema}
                    showInlineError={true}
                    onSubmit={this.handleSubmit}
                    model={this.state.model}
                    onChange={this.handleChange}
                >

                    <AutoField name="orderId" {...formItemLayout}/>
                    <AutoField name="paidDate" {...formItemLayout}/>
                    <AutoField name="dueAmount" {...formItemLayout}/>
                    <AutoField name="paidAmount" {...formItemLayout}/>
                    <AutoField name="balance" {...formItemLayout}/>

                    <FormItem {...buttonItemLayout}>
                        <SubmitField/>
                    </FormItem>
                </AutoForm>
            </div>
        );
    }
};

OrderPayment.propTypes = {
    order: PropTypes.object,
    handleModalCancel: PropTypes.func
};
