import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {AutoForm, AutoField, RadioField, LongTextField, SubmitField} from 'uniforms-antd';
import moment from 'moment';
import Spin from 'antd/lib/spin';
import Form from 'antd/lib/form';
const FormItem = Form.Item;
import notification  from 'antd/lib/notification';

import Customers from '../../api/customers/customers';
import {updateCustomer} from '../../api/customers/methods';

const CustomerEdit = ({loading, doc}) => {
    const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 14},
    };
    const buttonItemLayout = {
        wrapperCol: {span: 14, offset: 4},
    };

    handleSubmit = (doc) => {
        updateCustomer.callPromise(doc).then((result) => {
            notification.success({message: 'Success'});
            browserHistory.push('/customer');
        }).catch((err) => {
            notification.error({message: err.reason});
        });
    };

    return (
        <div>
            {loading ?
                <Spin size="large"/>
                :

                <AutoForm
                    schema={Customers.schema}
                    showInlineError={true}
                    onSubmit={this.handleSubmit}
                    model={doc}
                >

                    <AutoField name="name" {...formItemLayout} />
                    <RadioField name="gender" {...formItemLayout} />
                    <AutoField name="telephone" {...formItemLayout} />
                    <LongTextField name="address" {...formItemLayout} />

                    <FormItem {...buttonItemLayout}>
                        <SubmitField/>
                    </FormItem>
                </AutoForm>
            }
        </div>
    );
};

CustomerEdit.propTypes = {
    loading: PropTypes.bool,
    doc: PropTypes.object
};

export default CustomerEdit;