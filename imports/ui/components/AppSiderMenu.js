import {Meteor} from  'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';

import Menu from 'antd/lib/menu';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import Icon from 'antd/lib/icon';

class AppSiderMenu extends Component {

    linkTo = (item) => {
        browserHistory.push(item.key);
    };

    render() {

        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['AppSiderMenu.home']}
                  onClick={this.linkTo}>
                <Menu.Item key="/">
                    <Icon type="home"/>
                    <span className="nav-text">Home</span>
                </Menu.Item>
                <Menu.Item key="/order">
                    <Icon type="file"/>
                    <span className="nav-text">Order</span>
                </Menu.Item>
                <Menu.Item key="/payment">
                    <Icon type="file"/>
                    <span className="nav-text">Payment</span>
                </Menu.Item>
                <Menu.Item key="/customer">
                    <Icon type="file"/>
                    <span className="nav-text">Customer</span>
                </Menu.Item>
                <Menu.Item key="/product">
                    <Icon type="file"/>
                    <span className="nav-text">Product</span>
                </Menu.Item>
                <Menu.Item key="/category">
                    <Icon type="video-camera"/>
                    <span className="nav-text">Category</span>
                </Menu.Item>

                <SubMenu key="sub1"
                         title={<span><Icon type="mail"/><span className="nav-text">Navigation One</span></span>}>
                    <MenuItemGroup title="Item 1">
                        <Menu.Item key="3">Option 1</Menu.Item>
                        <Menu.Item key="4">Option 2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="Item 2">
                        <Menu.Item key="5">Option 3</Menu.Item>
                        <Menu.Item key="6">Option 4</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>

                <SubMenu key="sub2"
                         title={<span><Icon type="mail"/><span className="nav-text">Navigation One</span></span>}>
                    <MenuItemGroup title="Item 1">
                        <Menu.Item key="7">Option 1</Menu.Item>
                        <Menu.Item key="8">Option 2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="Item 2">
                        <Menu.Item key="9">Option 3</Menu.Item>
                        <Menu.Item key="10">Option 4</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
            </Menu>
        );
    }
}

export default AppSiderMenu;
