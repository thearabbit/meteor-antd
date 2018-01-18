import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {AutoForm, AutoField, DateField, LongTextField, RadioField, SubmitField} from 'uniforms-antd';
import moment from 'moment';
import Spin from 'antd/lib/spin';
import Form from 'antd/lib/form';
const FormItem = Form.Item;
import notification  from 'antd/lib/notification';
import _ from 'lodash';

import Customers from '../../api/customers/customers';
import {insertCustomer} from '../../api/customers/methods';

export default class CustomerNew extends Component {
    constructor(props) {
        super(props);
        this.state = {model: {name: 'Hi'}};
    }

    handleSubmit = (doc) => {
        console.log(doc);

        // insertCustomer.callPromise(doc).then((result) => {
        //     notification.success({message: 'Success'});
        //
        //     browserHistory.push('/customer');
        // }).catch((err) => {
        //     notification.error({message: err.reason});
        // });
    };

    handleChange = (key, val) => {
        this.setState(state => ({model: _.set(_.cloneDeep(state.model), key, val)}));

        if (key === 'gender') {
            this.setState(state => ({model: _.set(_.cloneDeep(state.model), 'address', val)}));
        }
    };

    render() {
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
                    schema={Customers.schema}
                    showInlineError={true}
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChange}
                    model={this.state.model}
                >

                    <AutoField name="name" {...formItemLayout} />
                    <RadioField name="gender" {...formItemLayout} />
                    <AutoField name="telephone" {...formItemLayout} />
                    <LongTextField name="address" {...formItemLayout} />

                    <FormItem {...buttonItemLayout}>
                        <SubmitField/>
                    </FormItem>
                </AutoForm>
            </div>
        );
    }
};
