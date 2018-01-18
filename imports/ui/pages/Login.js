import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {
    AutoForm,
    AutoField,
    SubmitField,
    Dialog,
} from 'uniforms-antd';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import notification  from 'antd/lib/notification';

// Schema
import LoginSchema from '../../api/users/login.js';

export default class Login extends Component {

    handleSubmit = (doc) => {
        const email = doc.email;
        const password = doc.password;

        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                notification.error({message: err.reason});
            } else {
                const {location} = this.props;
                if (location.state && location.state.nextPathname) {
                    browserHistory.push(location.state.nextPathname);
                } else {
                    browserHistory.push('/');
                }
            }
        });
    };

    render() {
        const styles = {
            loginForm: {
                marginTop: '50px',
            },
            forgot: {
                float: 'right',
            },
            button: {
                width: '100%',
            },
        };
        return (
            <div style={styles.loginForm}>
                <Row type="flex" align="middle">
                    <Col span={6} offset={9}>
                        <h1>Please login...</h1>

                        <AutoForm
                            schema={LoginSchema}
                            showInlineError={true}
                            onSubmit={this.handleSubmit}
                        >
                            <AutoField name="email" label={false} placeholder="Email"/>
                            <AutoField name="password" label={false} placeholder="Password"/>

                            <SubmitField style={styles.button}/>
                        </AutoForm>
                    </Col>
                </Row>
            </div>
        );
    }

};
