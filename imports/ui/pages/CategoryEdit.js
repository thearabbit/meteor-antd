import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {AutoForm, AutoField, DateField, SelectField, SubmitField} from 'uniforms-antd';
import moment from 'moment';
import Spin from 'antd/lib/spin';
import Form from 'antd/lib/form';
const FormItem = Form.Item;
import notification  from 'antd/lib/notification';

import Categories from '../../api/categories/categories';
import {updateCategory} from '../../api/categories/methods';

const CategoryEdit = ({loading, parentOpts, doc}) => {
    const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 14},
    };
    const buttonItemLayout = {
        wrapperCol: {span: 14, offset: 4},
    };

    handleSubmit = (doc) => {
        updateCategory.callPromise(doc).then((result) => {
            notification.success({ message: 'Success'});
            browserHistory.push('/category');
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
                    schema={Categories.schema}
                    showInlineError={true}
                    onSubmit={this.handleSubmit}
                    model={doc}
                >

                    <SelectField
                        name="parent"
                        options={parentOpts}
                        {...formItemLayout}
                    />
                    <AutoField name="name" {...formItemLayout}/>

                    <FormItem {...buttonItemLayout}>
                        <SubmitField/>
                    </FormItem>
                </AutoForm>
            }
        </div>
    );
};

CategoryEdit.propTypes = {
    loading: PropTypes.bool,
    parentOpts: PropTypes.array,
    doc: PropTypes.object
};

export default CategoryEdit;