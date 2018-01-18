import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import numeral from 'numeral';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import notification  from 'antd/lib/notification';
import Breadcrumb  from 'antd/lib/breadcrumb';
import Icon  from 'antd/lib/icon';
import Button  from 'antd/lib/button';
import Row  from 'antd/lib/row';
import Col  from 'antd/lib/col';
import Input from 'antd/lib/input';
const Search = Input.Search;

import Categories from '../../api/categories/categories';
import Products from '../../api/products/products';

import {upsertOrderDetail} from '../../api/orders/methods';

export default class OrderProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCategoryId: null,
            mainsBC: [],
            subsBC: [],
            products: []
        };
    }

    componentWillReceiveProps(nextProps) {
        const mainsBC = Categories.find({parent: {$exists: false}}).fetch();
        const currentCategoryId = mainsBC[0]._id;
        const subsBC = Categories.find({parent: currentCategoryId}).fetch();
        const products = Products.find().fetch();

        this.setState({currentCategoryId, mainsBC, subsBC, products})
    }

    handleCategoryChange = (doc) => {
        // Check first category
        if (doc._id == '001') {
            this.componentWillReceiveProps();
        } else {
            doc.ancestors.push(doc._id);

            const mainsBC = Categories.find({_id: {$in: doc.ancestors}}).fetch();
            const subsBC = Categories.find({parent: doc._id}).fetch();
            const products = Products.find({categoryId: doc._id}).fetch();

            this.setState({currentCategoryId: doc._id, mainsBC, subsBC, products})
        }

    };

    handleProductSearch = (value) => {
        let selector = {name: {$regex: value, $options: 'i'}};
        if (this.state.currentCategoryId != '001') {
            selector.categoryId = this.state.currentCategoryId;
        }

        const products = Products.find(selector).fetch();
        this.setState({products})
    };

    handleAdd = (product, eventType) => {
        let qty = product.defaultQty ? product.defaultQty : 1;
        let price = eventType == 'default' ? product.salePrice : 0;
        let amount = qty * price;

        let doc = {
            orderId: this.props.orderId,
            productId: product._id,
            qty,
            price,
            discount: 0,
            amount,
            productDoc: product
        };

        upsertOrderDetail.callPromise(doc).then((result) => {
            console.log(result);
        }).catch((err) => {
            notification.error({message: err.reason});
        });
    };

    render() {
        const {loading} = this.props;
        const colSpan = 6;
        const styles = {
            mainBc: {
                display: 'inline',
                fontSize: '16px',
                margin: "5px 0px 5px 0px",
                // padding: "5px",
                backgroundColor: "#f8f8f8"
            },
            mainBcSearch: {
                display: 'inline',
                fontSize: '16px',
                margin: "5px 0px 5px 0px",
                // padding: "5px",
                backgroundColor: "#f8f8f8",
                float: "right"
            },
            subBc: {
                fontSize: '1px',
                margin: "5px 0px 5px 0px",
                padding: "5px",
            }
        };

        return (
            <div>
                { loading ?
                    <Spin size="large"/>
                    :
                    <div>
                        {/*Main*/}
                        <div style={{display: 'inline'}}>
                            <Breadcrumb
                                separator=">"
                                style={{display: 'inline', fontSize: "16px"}}
                            >
                                {this.state.mainsBC.map((o) => {
                                    return (
                                        <Breadcrumb.Item key={o._id}>
                                            <a href="#" onClick={() => this.handleCategoryChange(o)}>
                                                {o.name == 'All' ? <Icon type="home"/> : o.name}
                                            </a>
                                        </Breadcrumb.Item>
                                    );
                                })}
                            </Breadcrumb>

                            <div style={{display: 'inline', float: "right"}}>
                                <Search
                                    placeholder="Search Products..."
                                    style={{width: 200}}
                                    onKeyUp={(event) => this.handleProductSearch(event.target.value)}
                                />
                            </div>

                        </div>
                        <hr/>

                        {/*Sub*/}
                        <div style={styles.subBc}>
                            {this.state.subsBC.map((o, k) => {
                                return (
                                    <span key={k}>
                                        {k > 0 ?
                                            <span className="ant-divider"/>
                                            :
                                            ""
                                        }

                                        <a
                                            href="#"
                                            key={o._id}
                                            onClick={() => this.handleCategoryChange(o)}
                                        >
                                            {o.name}
                                        </a>
                                    </span>
                                );
                            })}
                        </div>

                        {/*Products*/}
                        <Row gutter={10}>
                            {this.state.products.map((doc, key) => {
                                    return (
                                        <Col span={colSpan} key={key} style={{marginBottom: '10px'}}>
                                            <Card
                                                style={{width: "100%"}}
                                                bodyStyle={{padding: '0px'}}
                                            >
                                                <div
                                                    style={{cursor: 'pointer'}}
                                                    onClick={() => this.handleAdd(doc, 'default')}
                                                >
                                                    <img
                                                        style={{display: 'block'}}
                                                        alt="example"
                                                        width="100%"
                                                        src="/img/burger.jpg"
                                                    />
                                                </div>

                                                <div style={{padding: '10px 16px', textAlign: 'center'}}>
                                                    <h3>{doc.name}</h3>
                                                    <p>
                                                        {numeral(doc.salePrice).format("$ 0,0.00")}
                                                        <span className="ant-divider"></span>
                                                        <a href="#" onClick={() => this.handleAdd(doc, 'free')}>Free</a>
                                                    </p>
                                                </div>
                                            </Card>
                                        </Col>
                                    );
                                }
                            )}
                        </Row>

                    </div>
                }
            </div>
        );
    }
};

OrderProduct.propTypes = {
    loading: PropTypes.bool,
    orderId: PropTypes.string,
};
