import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {AutoForm, AutoField, DateField, SelectField, SubmitField} from 'uniforms-antd';
import moment from 'moment';
import Spin from 'antd/lib/spin';
import Form from 'antd/lib/form';
const FormItem = Form.Item;
import notification  from 'antd/lib/notification';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

import Categories from '../../api/categories/categories';
import {insertCategory} from '../../api/categories/methods';


const Parent = ({onChange, ...props}) => {
    console.log(props);

    return (<AutoField
        name={props.name}
        onChange={value => onChange(value, 'name')}
        value={props.value}
        {...filterDOMProps(props)}
    />)
};

const ParentField = connectField(Parent, {ensureValue: false, includeInChain: false});


export default class CategoryNew extends Component {
    handleSubmit = (doc) => {
        console.log(doc);
        // insertCategory.callPromise(doc).then((result) => {
        //     notification.success({message: 'Success'});
        //     browserHistory.push('/category');
        // }).catch((err) => {
        //     notification.error({message: err.reason});
        // });
    };

    render() {
        const {loading, parentOpts} = this.props;

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
                        schema={Categories.schema}
                        showInlineError={true}
                        onSubmit={this.handleSubmit}
                    >

                        <ParentField
                            name="parent"
                            // options={parentOpts}
                            {...formItemLayout}
                        />
                        <AutoField
                            name="name"
                            {...formItemLayout}
                        />

                        <FormItem {...buttonItemLayout}>
                            <SubmitField />
                        </FormItem>
                    </AutoForm>
                }
            </div>
        );
    }
}

CategoryNew.propTypes = {
    loading: PropTypes.bool,
    parentOpts: PropTypes.array
};
