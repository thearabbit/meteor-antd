import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {AutoForm, AutoField, DateField, SelectField, SubmitField} from 'uniforms-antd';
import moment from 'moment';
import Spin from 'antd/lib/spin';
import Form from 'antd/lib/form';
const FormItem = Form.Item;
import notification  from 'antd/lib/notification';

import Products from '../../api/products/products';
import {insertProduct} from '../../api/products/methods';

const ProductNew = ({loading, categoryOpts}) => {

    handleSubmit = (doc) => {
        insertProduct.callPromise(doc).then((result) => {
            notification.success({message: 'Success'});

            browserHistory.push('/product');
        }).catch((err) => {
            notification.error({message: err.reason});
        });
    };

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
                    schema={Products.schema}
                    showInlineError={true}
                    onSubmit={this.handleSubmit}
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

ProductNew.propTypes = {
    loading: PropTypes.bool,
    categoryOpts: PropTypes.array
};

export default ProductNew;