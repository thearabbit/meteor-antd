import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {AutoForm, AutoField, DateField, SelectField, SubmitField} from 'uniforms-antd';
import moment from 'moment';
import Spin from 'antd/lib/spin';
import Form from 'antd/lib/form';
const FormItem = Form.Item;
import notification  from 'antd/lib/notification';

import Products from '../../api/products/products';
import {updateProduct} from '../../api/products/methods';

const ProductEdit = ({loading, categoryOpts, doc}) => {
    const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 14},
    };
    const buttonItemLayout = {
        wrapperCol: {span: 14, offset: 4},
    };

    handleSubmit = (doc) => {
        updateProduct.callPromise(doc).then((result) => {
            notification.success({message: 'Success'});

            browserHistory.push('/product');
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
                    schema={Products.schema}
                    showInlineError={true}
                    onSubmit={this.handleSubmit}
                    model={doc}
                >

                    <SelectField name="canBeSoldOrPurchased" {...formItemLayout} />
                    <SelectField name="type" {...formItemLayout} />
                    <SelectField
                        name="categoryId"
                        options={categoryOpts}
                        {...formItemLayout}
                    />
                    <AutoField name="code" {...formItemLayout}/>
                    <AutoField name="name" {...formItemLayout}/>
                    <AutoField name="salePrice" {...formItemLayout}/>
                    <AutoField name="cost" {...formItemLayout}/>
                    <AutoField name="defaultQty" {...formItemLayout}/>

                    <FormItem {...buttonItemLayout}>
                        <SubmitField/>
                    </FormItem>
                </AutoForm>
            }
        </div>
    );
};

ProductEdit.propTypes = {
    loading: PropTypes.bool,
    categoryOpts: PropTypes.array,
    doc: PropTypes.object
};

export default ProductEdit;
