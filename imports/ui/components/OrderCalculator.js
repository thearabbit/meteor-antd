import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import numeral from 'numeral';
import Radio  from 'antd/lib/radio';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import Button from 'antd/lib/button';
const ButtonGroup = Button.Group;
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import notification  from 'antd/lib/notification';
import _ from 'lodash';
import onClickOutside from 'react-onclickoutside';

import {updateOrderDetail, removeOrderDetail} from '../../api/orders/methods';

class OrdersCalculator extends Component {
    state = {
        calOn: 'qty',
        calOperator: '',
        calNumber: ''
    };

    handleClickOutside = (event) => {
        this.setState({calOperator: ''});
        this.setState({calNumber: ''});
    };

    handleCalOnChange = (val) => {
        this.setState({calOn: val});
        this.setState({calOperator: val});
        this.setState({calNumber: ''});
    };

    handleOperatorChange = (val) => {
        this.setState({calOperator: val});
        this.setState({calNumber: ''});
    };

    handleNumberClick = (value) => {
        let tmpDocs = [];
        let docs = this.props.selectedItemRows;
        let calNumberConcat = `${this.state.calNumber}${value}`;

        // Set new state
        this.setState({calNumber: calNumberConcat});

        calNumberConcat = _.toNumber(calNumberConcat);

        // Check docs
        if (docs.length > 0) {
            let calOn = this.state.calOn;
            let operator = this.state.calOperator;

            docs.forEach((doc) => {
                // Check cal operator
                if (operator == '+') {
                    doc[this.state.calOn] += calNumberConcat;
                } else if (operator == '-') {
                    doc[this.state.calOn] -= calNumberConcat;

                } else if (operator == '*') {
                    doc[this.state.calOn] *= calNumberConcat;
                } else {
                    doc[this.state.calOn] = calNumberConcat;
                }

                let amount = doc.qty * doc.price;
                amount -= amount * doc.discount / 100;
                doc.amount = amount;

                tmpDocs.push(doc);
            });

            updateOrderDetail.callPromise(tmpDocs).then((result) => {
                console.log(result);
            }).catch((err) => {
                notification.error({message: err.reason});
            });
        } else {
            notification.warning({message: 'Please select items'});
        }
    };

    handleRemove = () => {
        let docs = this.props.selectedItemRows;

        // Check docs
        if (docs.length > 0) {
            let ids = _.map(docs, '_id');

            removeOrderDetail.callPromise({_id: {$in: ids}}).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
        } else {
            notification.warning({message: 'Please select items'});
        }

    };

    render() {
        const rowGutter = 0;
        const styles = {
            button: {
                width: '100%',
            },
            radioButtonGroup: {
                display: 'flex'
            },
            radioButton: {
                marginLeft: 16,
                marginBottom: 16,
                width: 'auto'
            },
            margin: {
                margin: '10px 0'
            }
        };

        return (
            <dvi>
                {/*<RadioGroup*/}
                {/*size="large"*/}
                {/*onChange={(event) => this.setState({calNumber: ''})}*/}
                {/*defaultValue="qty"*/}
                {/*style={styles.margin}*/}
                {/*>*/}
                {/*<RadioButton value="qty">Qty</RadioButton>*/}
                {/*<RadioButton value="discount">Dis (%)</RadioButton>*/}
                {/*<RadioButton value="price">Price</RadioButton>*/}
                {/*</RadioGroup>*/}

                <div>
                    <Row gutter={rowGutter}>
                        <Col span={6}>
                            <Button
                                style={styles.button}
                                onClick={() => this.handleNumberClick(1)}>1
                            </Button>
                        </Col>
                        <Col span={6}>
                            <Button
                                style={styles.button}
                                onClick={() => this.handleNumberClick(2)}>2
                            </Button>
                        </Col>
                        <Col span={6}>
                            <Button
                                style={styles.button}
                                onClick={() => this.handleNumberClick(3)}>3
                            </Button>
                        </Col>
                        <Col span={3}>
                            <Button
                                style={styles.button}
                                type={this.state.calOperator == '+' ? 'primary' : 'dashed'}
                                onClick={() => this.handleOperatorChange('+')}>+
                            </Button>
                        </Col>
                        <Col span={3}>
                            <Button
                                style={styles.button}
                                type={this.state.calOn == 'qty' ? 'primary' : 'dashed'}
                                onClick={() => this.handleCalOnChange('qty')}>Qty
                            </Button>
                        </Col>
                    </Row>
                </div>

                <div style={styles.margin}>
                    <Row gutter={rowGutter}>
                        <Col span={6}>
                            <Button
                                style={styles.button}
                                onClick={() => this.handleNumberClick(4)}>4
                            </Button>
                        </Col>
                        <Col span={6}>
                            <Button
                                style={styles.button}
                                onClick={() => this.handleNumberClick(5)}>5
                            </Button>
                        </Col>
                        <Col span={6}>
                            <Button
                                style={styles.button}
                                onClick={() => this.handleNumberClick(6)}>6
                            </Button>
                        </Col>
                        <Col span={3}>
                            <Button
                                style={styles.button}
                                type={this.state.calOperator == '-' ? 'primary' : 'dashed'}
                                onClick={() => this.handleOperatorChange('-')}>-
                            </Button>
                        </Col>
                        <Col span={3}>
                            <Button
                                style={styles.button}
                                type={this.state.calOn == 'discount' ? 'primary' : 'dashed'}
                                onClick={() => this.handleCalOnChange('discount')}>Dis
                            </Button>
                        </Col>
                    </Row>
                </div>

                <div style={styles.margin}>
                    <Row gutter={rowGutter}>
                        <Col span={6}>
                            <Button
                                style={styles.button}
                                onClick={() => this.handleNumberClick(7)}>7
                            </Button>
                        </Col>
                        <Col span={6}>
                            <Button
                                style={styles.button}
                                onClick={() => this.handleNumberClick(8)}>8
                            </Button>
                        </Col>
                        <Col span={6}>
                            <Button
                                style={styles.button}
                                onClick={() => this.handleNumberClick(9)}>9
                            </Button>
                        </Col>
                        <Col span={3}>
                            <Button
                                style={styles.button}
                                type={this.state.calOperator == '*' ? 'primary' : 'dashed'}
                                onClick={() => this.handleOperatorChange('*')}>*
                            </Button>
                        </Col>
                        <Col span={3}>
                            <Button
                                style={styles.button}
                                type={this.state.calOn == 'price' ? 'primary' : 'dashed'}
                                onClick={() => this.handleCalOnChange('price')}>Price
                            </Button>
                        </Col>
                    </Row>
                </div>

                <div style={styles.margin}>
                    <Row gutter={rowGutter}>
                        <Col span={12}>
                            <Button
                                style={styles.button}
                                onClick={() => this.handleNumberClick(0)}>0
                            </Button>
                        </Col>
                        <Col span={6}>
                            <Button
                                style={styles.button}
                                onClick={() => this.handleNumberClick('.')}>.
                            </Button>
                        </Col>
                        <Col span={6}>
                            <Button
                                style={styles.button}
                                type="danger"
                                onClick={this.handleRemove}>Delete
                            </Button>
                        </Col>
                    </Row>
                </div>

            </dvi>
        );

    }
}

OrdersCalculator.propTypes = {
    selectedItemRows: PropTypes.array,
};

// export default OrdersCalculator;
export default onClickOutside(OrdersCalculator);