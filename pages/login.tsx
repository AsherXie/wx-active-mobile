import React, { useState } from 'react';
import { List, InputItem, Button, WingBlank, WhiteSpace } from 'antd-mobile';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');

  function handleLogin() {
    // 处理登录逻辑
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Captcha Code:', captchaCode);
  }

  return (
    <div className='login-page'>
      <WingBlank size='lg'>
        <WhiteSpace size='xl' />
        <List>
          <InputItem
            clear
            placeholder='请输入用户名'
            value={username}
            onChange={(value: string) => setUsername(value)}
          >
            用户名：
          </InputItem>
          <InputItem
            clear
            type='password'
            placeholder='请输入密码'
            value={password}
            onChange={(value: string) => setPassword(value)}
          >
            密码：
          </InputItem>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <InputItem
              clear
              placeholder='请输入验证码'
              value={captchaCode}
              onChange={(value: string) => setCaptchaCode(value)}
            >
              验证码：
            </InputItem>
            {/* 这里放置图形验证码组件 */}
          </div>
        </List>

        {/* 登录按钮 */}
        <Button type='primary' onClick={handleLogin}>
          登录
        </Button>
      </WingBlank>
    </div>
  );
}

export default LoginPage;
