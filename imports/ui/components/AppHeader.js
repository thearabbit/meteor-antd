import {Meteor} from  'meteor/meteor';
import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import Layout from 'antd/lib/layout';
const {Header} = Layout;
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';

const AppHeader = ({currentUser, toggle}) => {
    const username = currentUser && currentUser.profile ? `${currentUser.profile.name.last} ${currentUser.profile.name.first}` : 'No user';

    const style = {
        logoImg: {
            width: "32px",
            marginRight: "8px"
        },
    };

    const menuHeader = (
        <Menu>
            <Menu.Item>
                <a rel="noopener noreferrer" href="http://www.alipay.com/"><Icon type="user"/> Profile</a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href="#" onClick={this.handleLogout}><Icon type="logout"/> Logout</a>
            </Menu.Item>
        </Menu>
    );

    handleLogout = () => {
        Meteor.logout(() => browserHistory.push('/login'));
    };

    return (
        <Header style={{background: '#fff', padding: '0 16px'}}>
            <Icon
                className="trigger"
                {...toggle}
            />

            <div style={{float: 'right'}}>
                <Dropdown overlay={menuHeader} placement="bottomRight">
                    <a className="ant-dropdown-link" href="#">
                        {username} <Icon type="down"/>
                    </a>
                </Dropdown>
            </div>
        </Header>
    );
};

AppHeader.propTypes = {
    currentUser: PropTypes.object,
    toggle: PropTypes.object
};

export default AppHeader;