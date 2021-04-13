import React from 'react';
import { 
  Input,
} from 'antd';
import { 
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './style.less';

const TestLogin = () => {  
  return (
    <div className="login-container">
      <div className="login-title">
        欢迎来到U Share
      </div>
      <div className="login-form">
        <div className="login-phone login-item" >
          <div className="input-wrapper">
            <Input placeholder="请输入手机号" prefix={<UserOutlined className="login-icon" />} />
          </div>
        </div>
        <div className="login-pass login-item" >
          <div className="input-wrapper">
            <Input placeholder="请输入验证码"prefix={<UserOutlined className="login-icon" />} />
          </div>
        </div>
        <div className="login-info">
          未注册的手机号验证后自动创建账号
        </div>
        <div className="login-submit" >登录</div>
        <div className="login-user">
          登录即同意
          <Link className="user-items" to='/testUser'> 用户协议</Link>
        </div>
      </div>
    </div>
  )
}

export default TestLogin