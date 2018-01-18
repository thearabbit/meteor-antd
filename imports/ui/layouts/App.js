import {Meteor} from  'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import {browserHistory, Link} from 'react-router';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';

import Layout from 'antd/lib/layout';
const {Header, Content, Footer, Sider} = Layout;
import Menu from 'antd/lib/menu';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Breadcrumb from 'antd/lib/breadcrumb';
import Breadcrumbs from 'react-router-breadcrumbs';

import AppHeaderContainer from '../containers/AppHeader';
import AppSiderMenu from '../components/AppSiderMenu';

class App extends Component {
    state = {
        collapsed: false,
        windowHeight: window.innerHeight
    };

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    handleResize = (e) => {
        this.setState({windowHeight: window.innerHeight})
    };

    linkTo = (item) => {
        browserHistory.push(item.key);
    };

    render() {
        const {routes, params, crumbResolver, children} = this.props;

        const minHeight = this.state.windowHeight - 172;
        const style = {
            logoImg: {
                width: "32px",
                marginRight: "8px"
            },
            logoTitle: {
                verticalAlign: "text-bottom",
                fontSize: "16px",
                textTransform: "uppercase",
                display: "inline-block",
            },
            username: {
                float: 'right'
            }
        };

        return (
            <LocaleProvider locale={enUS}>
                <Layout>
                    <Sider
                        collapsed={this.state.collapsed}
                        onCollapse={(collapsed, type) => {
                            this.setState({collapsed: collapsed})
                        }}
                        trigger={null}
                        collapsedWidth="0"
                        breakpoint="md"
                    >
                        <div className="logo">
                            <img src="/antd-logo.svg" style={style.logoImg}/>
                            <span style={style.logoTitle}>
                                METEOR ANTD
                            </span>
                        </div>

                        <AppSiderMenu/>
                    </Sider>

                    <Layout>

                        <AppHeaderContainer
                            toggle={{
                                type: this.state.collapsed ? 'menu-unfold' : 'menu-fold',
                                onClick: this.toggle
                            }}/>

                        <Content style={{margin: '0 16px'}}>
                            {/*<Breadcrumb style={{margin: '12px 0'}} routes={routes} params={params}/>*/}

                            <div style={{margin: '12px 0'}}>
                                <Breadcrumbs
                                    routes={routes}
                                    params={params}
                                    resolver={crumbResolver}
                                    className="ant-breadcrumb"
                                />
                            </div>

                            <div id="container" style={{background: '#fff', padding: 24, minHeight: minHeight}}>
                                {children}
                            </div>
                        </Content>

                        <Footer style={{textAlign: 'center'}}>
                            Rabbit Technology ©2017
                        </Footer>

                    </Layout>
                </Layout>
            </LocaleProvider>
        );
    }
}

App.propTypes = {
    children: PropTypes.node.isRequired,
};

export default App;
