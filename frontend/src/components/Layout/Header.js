import React from 'react';
import { Layout, Space, Button, Badge, Avatar, Dropdown, Menu, message } from 'antd';
import { BellOutlined, SettingOutlined, UserOutlined, LogoutOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';

const { Header: AntHeader } = Layout;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleMenuClick = async ({ key }) => {
    if (key === 'logout') {
      // Logout disabled in demo mode
      message.info('Logout is disabled in demo mode');
      /*
      try {
        await dispatch(logout()).unwrap();
        message.success('Logged out successfully');
        navigate('/login');
      } catch (error) {
        message.error('Failed to logout');
      }
      */
    } else if (key === 'profile') {
      // Navigate to profile page (to be implemented)
      message.info('Profile page coming soon');
    } else if (key === 'settings') {
      // Navigate to settings page (to be implemented)
      message.info('Settings page coming soon');
    }
  };

  const userMenu = (
    <Menu onClick={handleMenuClick}>
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
            <Avatar 
              icon={<UserOutlined />} 
              style={{ backgroundColor: '#1890ff' }}
            >
              {user?.username?.charAt(0).toUpperCase()}
            </Avatar>
            <span>{user?.username || 'User'}</span>
          </Space>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header;