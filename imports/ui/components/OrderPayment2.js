// import React, {Component, PropTypes} from 'react';
// import {browserHistory} from 'react-router';
// import moment from 'moment';
// import numeral from 'numeral';
// import Spin from 'antd/lib/spin';
// import notification  from 'antd/lib/notification';
// import Form from 'antd/lib/form';
// import Input from 'antd/lib/input';
// import InputNumber from 'antd/lib/input-number';
// import Select from 'antd/lib/select';
// import Button from 'antd/lib/button';
// const FormItem = Form.Item;
// const Option = Select.Option;
//
// import {insertPayment} from '../../api/payments/methods';
//
// const OrderPayment = ({form, order}) => {
//     componentDidMount = () => {
//         this.paidAmountRef.focus();
//     };
//
//     handleSubmit = (e) => {
//         e.preventDefault();
//         form.validateFields((err, values) => {
//             if (!err) {
//                 console.log(values);
//
//                 insertPayment.callPromise(values).then((result) => {
//                     notification.success({message: 'Success'});
//
//                     handleModalCancel();
//                 }).catch((err) => {
//                     notification.error({message: err.reason});
//                 });
//             }
//         });
//     };
//
//     handlePaidAmountChange = (value) => {
//         let dueAmount = form.getFieldValue('dueAmount');
//
//         form.setFieldsValue({
//             balance: dueAmount - value,
//         });
//     };
//
//     const {getFieldDecorator} = form;
//     const style = {
//         width: '100%'
//     };
//     const formItemLayout = {
//         labelCol: {span: 6},
//         wrapperCol: {span: 14},
//     };
//     const buttonItemLayout = {
//         wrapperCol: {span: 14, offset: 6},
//     };
//
//     return (
//         <Form onSubmit={this.handleSubmit}>
//             <FormItem label="Due amount" {...formItemLayout} >
//                 {/*Hidden*/}
//                 {getFieldDecorator('orderId', {initialValue: order._id})(<Input type="hidden"/>)}
//                 {getFieldDecorator('paidDate', {initialValue: order.orderedDate})(<Input type="hidden"/>)}
//
//                 {getFieldDecorator('dueAmount', {
//                     initialValue: order.total
//                 })(
//                     <InputNumber
//                         formatter={(value) => numeral(value).format("0,0.00")}
//                         disabled={true}
//                         style={style}
//                     />
//                 )}
//             </FormItem>
//             <FormItem label="Paid amount" {...formItemLayout} >
//                 {getFieldDecorator('paidAmount', {
//                     rules: [{required: true, message: 'Please select your gender!'}],
//                     initialValue: order.total,
//                     onChange: this.handlePaidAmountChange
//                 })(
//                     <InputNumber
//                         ref={ref => this.paidAmountRef = ref}
//                         step={0.01}
//                         style={style}
//                     />
//                 )}
//             </FormItem>
//             <FormItem label="Balance" {...formItemLayout} >
//                 {getFieldDecorator('balance', {
//                     initialValue: 0,
//                 })(
//                     <InputNumber
//                         formatter={(value) => numeral(value).format("0,0.00")}
//                         disabled={true}
//                         style={style}
//                     />
//                 )}
//             </FormItem>
//
//             <FormItem {...buttonItemLayout} >
//                 <Button type="primary" htmlType="submit">
//                     Submit
//                 </Button>
//             </FormItem>
//         </Form>
//     );
// };
//
// OrderPayment.propTypes = {
//     order: PropTypes.object,
//     handleModalCancel: PropTypes.func
// };
//
// const WrappedForm = Form.create()(OrderPayment);
// export default WrappedForm;
