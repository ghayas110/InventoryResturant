"use client";

import React, { useState } from 'react';
import { Table, Button, Input, Modal, Form, InputNumber, Upload, Space, message, Select, Tag } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DefaultLayout from "../../components/Layouts/DefaultLayout";

interface Order {
  key: string;
  sno: number;
  productName: string;
  orderCode: string;
  category: string;
  quantity: number;
  totalPrice: number;
  invoice: File | null;
  status: string;
}

const RestaurantOrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);

  const [form] = Form.useForm();

  const showAddOrderModal = () => {
    form.resetFields();
    setInvoiceFile(null);
    setIsEditMode(false);
    setIsModalVisible(true);
  };

  const showEditOrderModal = (order: Order) => {
    form.setFieldsValue(order);
    setEditingOrder(order);
    setInvoiceFile(order.invoice || null);
    setIsEditMode(true);
    setIsModalVisible(true);
  };

  const handleDeleteOrder = (key: string) => {
    setOrders(orders.filter((order) => order.key !== key));
    message.success('Order deleted successfully');
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newOrder = {
          ...values,
          invoice: invoiceFile,
        };
        if (isEditMode && editingOrder) {
          // Edit order
          setOrders(orders.map((order) => (order.key === editingOrder.key ? { ...newOrder, key: editingOrder.key, sno: editingOrder.sno } : order)));
          message.success('Order edited successfully');
        } else {
          // Add new order with "In Progress" status
          const newOrderWithKey = { ...newOrder, key: `${orders.length + 1}`, sno: orders.length + 1, status: "In Progress" };
          setOrders([...orders, newOrderWithKey]);
          message.success('Order added successfully');
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleInvoiceUpload = (file: File) => {
    setInvoiceFile(file);
    return false;
  };

  const handleViewInvoice = (invoice: File | null) => {
    if (invoice) {
      const fileUrl = URL.createObjectURL(invoice);
      setPdfUrl(fileUrl);
    } else {
      message.error('No invoice available to view.');
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Order Code',
      dataIndex: 'orderCode',
      key: 'orderCode',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === "Delivered" ? "green" : status === "Dispatched" ? "blue" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: 'Invoice',
      dataIndex: 'invoice',
      key: 'invoice',
      render: (invoice: File | null) => (
        <Button
          type="link"
          onClick={() => handleViewInvoice(invoice)}
          style={{ color: 'black' }}
        >
          View Invoice
        </Button>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Order) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditOrderModal(record)}
            style={{ backgroundColor: 'black', color: 'white', borderColor: 'black' }}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteOrder(record.key)}
            danger
            style={{ backgroundColor: 'black', color: 'white', borderColor: 'black' }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div style={{ padding: '20px' }}>
        <h1>Sales Order</h1>
        <Input.Search
          placeholder="Search Orders"
          allowClear
          onSearch={handleSearch}
          style={{ width: 300, marginBottom: 20 }}
        />
        <Button
          type="primary"
          onClick={showAddOrderModal}
          style={{ backgroundColor: 'black', color: 'white', borderColor: 'black', marginBottom: 20 }}
        >
          Add New Order
        </Button>
        <Table columns={columns} dataSource={filteredOrders} />

        <Modal
          title={isEditMode ? 'Edit Order' : 'Add New Order'}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
          okButtonProps={{ style: { backgroundColor: 'black', color: 'white', borderColor: 'black' } }}
        >
          <Form form={form} layout="vertical">
            <Form.Item name="productName" label="Product Name" rules={[{ required: true, message: 'Please enter the product name' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="orderCode" label="Order Code" rules={[{ required: true, message: 'Please enter the order code' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category' }]}>
              <Select>
                <Select.Option value="Arabic Cuisine">Arabic Cuisine</Select.Option>
                <Select.Option value="Irani Cuisine">Irani Cuisine</Select.Option>
                <Select.Option value="Sweets">Sweets</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please enter the quantity' }]}>
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="totalPrice" label="Total Price" rules={[{ required: true, message: 'Please enter the total price' }]}>
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            {isEditMode && (
              <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select a status' }]}>
                <Select>
                  <Select.Option value="In Progress">In Progress</Select.Option>
                  <Select.Option value="Dispatched">Dispatched</Select.Option>
                  <Select.Option value="Delivered">Delivered</Select.Option>
                </Select>
              </Form.Item>
            )}
            <Form.Item name="invoice" label="Upload Invoice (PDF)" rules={[{ required: true, message: 'Please upload an invoice' }]}>
              <Upload
                beforeUpload={handleInvoiceUpload}
                fileList={invoiceFile ? [invoiceFile as any] : []}
                onRemove={() => setInvoiceFile(null)}
                accept=".pdf"
              >
                <Button icon={<UploadOutlined />}>Upload Invoice</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Invoice"
          open={!!pdfUrl}
          footer={null}
          onCancel={() => setPdfUrl(null)}
        >
          {pdfUrl && (
            <iframe src={pdfUrl} style={{ width: '100%', height: '500px' }} />
          )}
        </Modal>
      </div>
    </DefaultLayout>
  );
};

export default RestaurantOrderPage;
