import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {AutoForm, AutoField, DateField, SelectField, SubmitField} from 'uniforms-antd';
import moment from 'moment';
import Spin from 'antd/lib/spin';
import Form from 'antd/lib/form';
const FormItem = Form.Item;
import notification  from 'antd/lib/notification';

import Payments from '../../api/payments/payments';
import {insertPayment} from '../../api/payments/methods';

export default class PaymentNew extends Component {
    constructor(props) {
        super(props);
        this.state = {model: {}};
    }

    handleChange = (key, val) => {
        this.setState(state => ({model: _.set(_.cloneDeep(state.model), key, val)}));

        if (key === 'paidAmount') {
            this.setState(state => ({model: _.set(_.cloneDeep(state.model), 'balance', val)}));
        }
    };

    handleSubmit = (doc) => {
        insertPayment.callPromise(doc).then((result) => {
            notification.success({message: 'Success'});

            browserHistory.push('/payment');
        }).catch((err) => {
            notification.error({message: err.reason});
        });
    };

    render() {
        let {loading, orderOpts} = this.props;

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 14},
        };
        const buttonItemLayout = {
            wrapperCol: {span: 14, offset: 4},
        };

        return (
            <div>
                {loading ?
                    <Spin size="large"/>
                    :
                    <AutoForm
                        schema={Payments.schema}
                        showInlineError={true}
                        onSubmit={this.handleSubmit}
                        model={this.state.model}
                        onChange="handleChange"
                    >

                        <SelectField
                            name="orderId"
                            options={orderOpts}
                            {...formItemLayout}
                        />
                        <AutoField name="paidDate" {...formItemLayout}/>
                        <AutoField name="dueAmount" {...formItemLayout}/>
                        <AutoField name="paidAmount" {...formItemLayout}/>
                        <AutoField name="balance" {...formItemLayout}/>

                        <FormItem {...buttonItemLayout}>
                            <SubmitField/>
                        </FormItem>
                    </AutoForm>
                }
            </div>
        );
    }
};

PaymentNew.propTypes = {
    loading: PropTypes.bool,
    orderOpts: PropTypes.array
};
