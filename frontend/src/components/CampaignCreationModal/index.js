import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, InputNumber, Row, Col, Checkbox, Space, Button, Steps, message } from 'antd';
import { PlusOutlined, SettingOutlined, UserOutlined, DollarOutlined, RocketOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Step } = Steps;

const CampaignCreationModal = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [campaignData, setCampaignData] = useState({});

  const steps = [
    {
      title: 'Basic Info',
      icon: <PlusOutlined />,
    },
    {
      title: 'Targeting',
      icon: <UserOutlined />,
    },
    {
      title: 'Budget & Schedule',
      icon: <DollarOutlined />,
    },
    {
      title: 'Creative Assets',
      icon: <SettingOutlined />,
    },
  ];

  const audienceOptions = [
    'Tech Enthusiasts',
    'Pet Parents 25-35',
    'Urban Professionals',
    'Health Conscious',
    'Premium Seekers',
    'Millennial Cat Owners',
  ];

  const handleNext = async () => {
    try {
      const values = await form.validateFields();
      setCampaignData({ ...campaignData, ...values });
      
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Submit campaign
        message.success('Campaign created successfully!');
        onSuccess();
        form.resetFields();
        setCurrentStep(0);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Form.Item
              name="campaignName"
              label="Campaign Name"
              rules={[{ required: true, message: 'Please enter campaign name' }]}
            >
              <Input placeholder="Enter campaign name" />
            </Form.Item>

            <Form.Item
              name="objective"
              label="Campaign Objective"
              rules={[{ required: true, message: 'Please select objective' }]}
            >
              <Select placeholder="Select campaign objective">
                <Option value="conversions">Conversions</Option>
                <Option value="traffic">Traffic</Option>
                <Option value="awareness">Brand Awareness</Option>
                <Option value="engagement">Engagement</Option>
                <Option value="app_installs">App Installs</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="platforms"
              label="Platforms"
              rules={[{ required: true, message: 'Please select at least one platform' }]}
            >
              <Checkbox.Group style={{ width: '100%' }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Checkbox value="youtube">YouTube</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="tiktok">TikTok</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="instagram">Instagram</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="facebook">Facebook</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item name="description" label="Campaign Description">
              <TextArea rows={4} placeholder="Describe your campaign goals and strategy" />
            </Form.Item>
          </>
        );

      case 1:
        return (
          <>
            <Form.Item
              name="targetAudience"
              label="Target Audience"
              rules={[{ required: true, message: 'Please select target audience' }]}
            >
              <Select
                mode="multiple"
                placeholder="Select target audiences"
              >
                {audienceOptions.map(audience => (
                  <Option key={audience} value={audience}>
                    {audience}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="ageMin" label="Min Age">
                  <InputNumber min={18} max={65} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="ageMax" label="Max Age">
                  <InputNumber min={18} max={65} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="gender" label="Gender">
              <Select placeholder="Select gender">
                <Option value="all">All</Option>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>

            <Form.Item name="locations" label="Locations">
              <Select mode="multiple" placeholder="Select locations">
                <Option value="us">United States</Option>
                <Option value="ca">Canada</Option>
                <Option value="uk">United Kingdom</Option>
                <Option value="au">Australia</Option>
                <Option value="de">Germany</Option>
                <Option value="fr">France</Option>
              </Select>
            </Form.Item>

            <Form.Item name="interests" label="Interests & Behaviors">
              <Select mode="tags" placeholder="Add interests">
                <Option value="pet_care">Pet Care</Option>
                <Option value="technology">Technology</Option>
                <Option value="smart_home">Smart Home</Option>
                <Option value="health_wellness">Health & Wellness</Option>
              </Select>
            </Form.Item>
          </>
        );

      case 2:
        return (
          <>
            <Form.Item
              name="budget"
              label="Total Budget"
              rules={[{ required: true, message: 'Please enter budget' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                min={100}
                placeholder="Enter total budget"
              />
            </Form.Item>

            <Form.Item name="budgetType" label="Budget Type">
              <Select defaultValue="daily">
                <Option value="daily">Daily Budget</Option>
                <Option value="lifetime">Lifetime Budget</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="dateRange"
              label="Campaign Duration"
              rules={[{ required: true, message: 'Please select date range' }]}
            >
              <RangePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="bidStrategy" label="Bid Strategy">
              <Select defaultValue="auto">
                <Option value="auto">Automatic Bidding</Option>
                <Option value="manual">Manual Bidding</Option>
                <Option value="target_cpa">Target CPA</Option>
                <Option value="target_roas">Target ROAS</Option>
              </Select>
            </Form.Item>

            <Form.Item name="targetCPA" label="Target CPA" hidden={form.getFieldValue('bidStrategy') !== 'target_cpa'}>
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                placeholder="Enter target CPA"
              />
            </Form.Item>
          </>
        );

      case 3:
        return (
          <>
            <Form.Item name="adFormat" label="Ad Format">
              <Select placeholder="Select ad format">
                <Option value="video">Video</Option>
                <Option value="image">Image</Option>
                <Option value="carousel">Carousel</Option>
                <Option value="collection">Collection</Option>
              </Select>
            </Form.Item>

            <Form.Item name="headline" label="Headline">
              <Input placeholder="Enter ad headline" maxLength={60} showCount />
            </Form.Item>

            <Form.Item name="primaryText" label="Primary Text">
              <TextArea rows={3} placeholder="Enter primary ad text" maxLength={125} showCount />
            </Form.Item>

            <Form.Item name="cta" label="Call to Action">
              <Select placeholder="Select CTA">
                <Option value="shop_now">Shop Now</Option>
                <Option value="learn_more">Learn More</Option>
                <Option value="sign_up">Sign Up</Option>
                <Option value="get_offer">Get Offer</Option>
                <Option value="download">Download</Option>
              </Select>
            </Form.Item>

            <Form.Item name="landingPage" label="Landing Page URL">
              <Input placeholder="https://example.com/landing-page" />
            </Form.Item>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      title="Create New Campaign"
      visible={visible}
      onCancel={onClose}
      width={800}
      footer={null}
    >
      <Steps current={currentStep} style={{ marginBottom: 24 }}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} icon={step.icon} />
        ))}
      </Steps>

      <Form
        form={form}
        layout="vertical"
        initialValues={campaignData}
      >
        {renderStepContent()}
      </Form>

      <div style={{ marginTop: 24, textAlign: 'right' }}>
        <Space>
          {currentStep > 0 && (
            <Button onClick={handlePrev}>
              Previous
            </Button>
          )}
          <Button type="primary" onClick={handleNext} icon={currentStep === steps.length - 1 ? <RocketOutlined /> : null}>
            {currentStep === steps.length - 1 ? 'Create Campaign' : 'Next'}
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default CampaignCreationModal;