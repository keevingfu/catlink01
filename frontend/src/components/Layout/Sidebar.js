import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  PlayCircleOutlined,
  TeamOutlined,
  FundOutlined,
  LineChartOutlined,
  UserOutlined,
  BulbOutlined,
  GlobalOutlined,
  BarChartOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const menuItems = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: <Link to="/dashboard">Overview</Link>,
  },
  {
    key: '/trends',
    icon: <LineChartOutlined />,
    label: <Link to="/trends">Content Insights</Link>,
  },
  {
    key: '/content-intelligence',
    icon: <BulbOutlined />,
    label: <Link to="/content-intelligence">Content Testing</Link>,
  },
  {
    key: '/influencers',
    icon: <UserOutlined />,
    label: <Link to="/influencers">Content for KOL</Link>,
  },
  {
    key: '/ad-campaigns',
    icon: <FundOutlined />,
    label: <Link to="/ad-campaigns">Content for Ads</Link>,
  },
  {
    key: '/audience-insights',
    icon: <TeamOutlined />,
    label: <Link to="/audience-insights">Content for Private</Link>,
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width={250}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div style={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
      }}>
        Catlink
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;