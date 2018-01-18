import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Spin from 'antd/lib/spin';
import Button from 'antd/lib/button';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import notification  from 'antd/lib/notification';
import moment from 'moment';

import {insertOrder, removeOrder} from '../../api/orders/methods';
import OrderProductContainer from "../containers/OrderProduct";
import OrderDetailContainer from "../containers/OrderDetail";

class Order extends Component {
    state = {
        selectedOrderId: null,
        selectedIndex: 0,
        selectedOrderIdChange: true,
        containerHeight: 0
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.selectedOrderIdChange) {
            const {inactiveOrders} = nextProps;
            // Update select order id state
            this.setState({selectedOrderId: inactiveOrders[0]._id, selectedOrderIdChange: false});
        }
    }

    componentDidMount() {
        const containerHeight = document.getElementById('container').clientHeight;
        this.setState({containerHeight});
    }

    handleSelectTab = (key) => {
        this.setState({selectedOrderId: key});
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        insertOrder.callPromise().then((result) => {
            console.log(result);
        }).catch((err) => {
            notification.error({message: err.reason});
        });
    };

    remove = (_id) => {
        if (this.state.selectedOrderId == _id) {
            this.setState({selectedOrderIdChange: true});
        }

        removeOrder.callPromise({_id}).then((result) => {
            console.log(result);
        }).catch((err) => {
            notification.error({message: err.reason});
        });
    };

    render() {
        const {loading, inactiveOrders} = this.props;
        const styles = {};

        const containerHeight = this.state.containerHeight - (130 + 220);

        return (
            <div>
                { loading ?
                    <Spin size="large"/>
                    :
                    <div>
                        <Tabs
                            activeKey={this.state.selectedOrderId}
                            onChange={this.handleSelectTab}
                            type="editable-card"
                            onEdit={this.onEdit}
                        >
                            {inactiveOrders.map((obj, key) => (
                                <TabPane
                                    tab={`${obj._id}`}
                                    key={obj._id}
                                    closable={inactiveOrders.length > 1 ? true : false}
                                >
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <OrderDetailContainer order={obj} containerHeight={containerHeight}/>
                                        </Col>
                                        <Col span={12}>
                                            <OrderProductContainer orderId={obj._id}/>
                                        </Col>
                                    </Row>
                                </TabPane>
                            ))}
                        </Tabs>
                    </div>
                }
            </div>
        );
    }
}
;

Order.propTypes = {
    loading: PropTypes.bool,
    inactiveOrders: PropTypes.array,
};

export default Order;