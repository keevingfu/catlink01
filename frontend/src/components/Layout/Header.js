import React from 'react';
import { Layout, Space, Button, Badge, Avatar, Dropdown, Menu } from 'antd';
import { BellOutlined, SettingOutlined, UserOutlined, LogoutOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const Header = () => {
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader 
      style={{ 
        background: '#fff', 
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <Space size="large">
        <Button type="text" icon={<QuestionCircleOutlined />}>
          Help
        </Button>
        <Badge count={5} size="small">
          <Button type="text" icon={<BellOutlined />} />
        </Badge>
        <Dropdown overlay={userMenu} trigger={['click']}>
          <Space style={{ cursor: 'pointer' }}>
            <Avatar icon={<UserOutlined />} />
            <span>Admin User</span>
          </Space>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header;