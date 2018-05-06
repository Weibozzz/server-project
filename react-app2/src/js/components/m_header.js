import React, {Component} from 'react';
import {Row, Col} from 'antd';
import {Menu, Icon} from 'antd';


import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import {
  Tabs,
  message,
  Form,
  Input,
  Button,
  CheckBox,
  Modal
} from 'antd';

const FormItem = Form.Item;

const TabPane = Tabs.TabPane;

class m_header extends Component {
  constructor() {
    super();
    this.state = {
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userid: 0
    };
  }

  login() {
    this.setModalVisible(true);
  };

  handleClick = (e) => {
    if (e.key === "register") {
      this.setState({current: 'register'});
      this.setModalVisible(true);
    } else {
      {
        this.setState({current: e.key});
      }
    }
  }

  callback(key) {
    if (key == 1) {
      this.setState({action: 'login'});
    } else if (key == 2) {
      this.setState({action: 'register'});
    }
  }

  setModalVisible(value) {
    this.setState({
      modalVisible: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var myFetchOptions = {
      method: 'GET'
    };
    var formData = this.props.form.getFieldsValue();
    console.log(formData)
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
      + "&username=" + formData.userName + "&password=" + formData.password
      + "&r_userName=" + formData.r_userName + "&r_password="
      + formData.r_password + "&r_confirmPassword="
      + formData.r_confirmPassword, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({userNickName: json.NickUserName, userid: json.UserId});
        localStorage.userid = json.UserId;
        localStorage.userNickName = json.NickUserName;
      });
    if (this.state.action == "login") {
      this.setState({hasLogined: true});
    }
    message.success('请求成功！');
    this.setModalVisible(false)
  }

  render() {
    let {getFieldProps} = this.props.form;
    const userShow = this.state.hasLogined
      ? <Router>
        <Link to={`/usercenter`}>
          <Icon type="inbox"/>
        </Link>
      </Router>
      : <Icon type="setting" onClick={this.login.bind(this)}/>
    return (
      <div id="mobileheader">
        <header>
          <img src={require('../../images/logo.png')} alt="logo"/>
          <span>ReactNews</span>
          {userShow}
        </header>

        <Modal
          title="用户中心"
          visible={this.state.modalVisible}
          onCancel={() => this.setModalVisible(false)}
          onOk={() => this.setModalVisible(false)}
          okText="关闭"
          cancelText="取消"
        >
          <Tabs type="card">
            <TabPane tab="登录" key="1">
              <Form horizontal="true" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  <Input placeholder="请输入您的账号" {...getFieldProps('userName')}/>
                </FormItem>
                <FormItem label="密码">
                  <Input type="password" placeholder="请输入您的密码" {...getFieldProps('password')}/>
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
              </Form>
            </TabPane>
            <TabPane tab="注册" key="2">
              <Form horizontal="true" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  <Input placeholder="请输入您的账号" {...getFieldProps('r_userName')}/>
                </FormItem>
                <FormItem label="密码">
                  <Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
                </FormItem>
                <FormItem label="确认密码">
                  <Input type="password" placeholder="请再次输入您的密码" {...getFieldProps('r_confirmPassword')}/>
                </FormItem>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default m_header = Form.create()(m_header)
