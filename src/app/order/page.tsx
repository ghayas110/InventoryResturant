"use client";

import React, { useState } from 'react';
import { Table, Button, Input, Modal, Form, InputNumber, Space, message, Select, Tag, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import moment from 'moment';

const logoUrl = "/images/logo/koita_logo.png";

interface Supplier {
  name: string;
  category: string;
}

interface Product {
  key: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

interface Order {
  key: string;
  sno: number;
  orderCode: string;
  orderDate: string;
  orderValidUntil: string;
  supplier: Supplier;
  products: Product[];
  status: string;
}

const generateRandomOrderCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const SolarOrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [whatsappPhone, setWhatsappPhone] = useState<string>('');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const [form] = Form.useForm();
  const [productForm] = Form.useForm();

  const showAddOrderModal = () => {
    form.resetFields();
    form.setFieldsValue({
      orderCode: generateRandomOrderCode(),
      orderDate: moment(),
    });
    setProducts([]);
    setIsEditMode(false);
    setIsModalVisible(true);
  };

  const showEditOrderModal = (order: Order) => {
    form.setFieldsValue({
      ...order,
      orderDate: moment(order.orderDate),
      orderValidUntil: moment(order.orderValidUntil),
      supplierName: order.supplier.name,
      supplierCategory: order.supplier.category,
    });
    setProducts(order.products);
    setEditingOrder(order);
    setIsEditMode(true);
    setIsModalVisible(true);
  };

  const handleDeleteOrder = (key: string) => {
    setOrders(orders.filter((order) => order.key !== key));
    message.success('Order deleted successfully');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      const newOrder: Order = {
        ...values,
        orderDate: values.orderDate.format('YYYY-MM-DD'),
        orderValidUntil: values.orderValidUntil.format('YYYY-MM-DD'),
        supplier: {
          name: values.supplierName,
          category: values.supplierCategory,
        },
        products,
      };

      if (isEditMode && editingOrder) {
        setOrders(orders.map((order) =>
          order.key === editingOrder.key ? { ...newOrder, key: editingOrder.key, sno: editingOrder.sno } : order
        ));
        message.success('Order edited successfully');
      } else {
        const newOrderWithKey = { ...newOrder, key: `${orders.length + 1}`, sno: orders.length + 1, status: "In Progress" };
        setOrders([...orders, newOrderWithKey]);
        message.success('Order added successfully');
      }

      setIsModalVisible(false);
    } catch (info) {
      console.log('Validate Failed:', info);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleAddProduct = () => {
    productForm
      .validateFields()
      .then((values) => {
        const newProduct: Product = {
          key: `${products.length + 1}`,
          ...values,
        };
        setProducts([...products, newProduct]);
        productForm.resetFields();
        setIsProductModalVisible(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleDeleteProduct = (key: string) => {
    setProducts(products.filter((product) => product.key !== key));
  };

  const filteredOrders = orders.filter((order) =>
    order.products.some(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleViewInvoice = async (order: Order) => {
    setCurrentOrder(order);
    setIsInvoiceModalVisible(true);
    try {
      const pdfDoc = await generateInvoicePDF(order);
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error("Error generating invoice:", error);
      message.error("Failed to generate PDF, but you can still send via WhatsApp.");
    }
  };

  const handleSendToWhatsapp = () => {
    if (!whatsappPhone) {
      message.warning('Please enter a WhatsApp phone number.');
      return;
    }
    if (!currentOrder) return;
    
    let totalAmt = 0;
    currentOrder.products.forEach(p => { totalAmt += (p.price * p.quantity); });
    
    let textMessage = `*Invoice for Order: ${currentOrder.orderCode}*\n`;
    textMessage += `Date: ${currentOrder.orderDate}\n`;
    textMessage += `Supplier: ${currentOrder.supplier.name} (${currentOrder.supplier.category})\n\n`;
    textMessage += `*Products:*\n`;
    currentOrder.products.forEach((p, idx) => {
        textMessage += `${idx + 1}. ${p.name} (Qty: ${p.quantity}, Price: $${p.price}) - Total: $${p.quantity * p.price}\n`;
    });
    textMessage += `\n*Grand Total: $${totalAmt}*\n\n`;
    textMessage += `Thank you!`;
    
    const encodedMessage = encodeURIComponent(textMessage);
    window.open(`https://wa.me/${whatsappPhone.replace(/[\s+]/g, '')}?text=${encodedMessage}`, '_blank');
  };

  const orderColumns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: 'Order Code',
      dataIndex: 'orderCode',
      key: 'orderCode',
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'Order Valid Until',
      dataIndex: 'orderValidUntil',
      key: 'orderValidUntil',
    },
    {
      title: 'Supplier Category',
      dataIndex: ['supplier', 'category'],
      key: 'supplierCategory',
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: (products: Product[]) => (
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product.name} (Category: {product.category}, Qty: {product.quantity}, Price: ${product.price})
            </li>
          ))}
        </ul>
      ),
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
          <Button
            onClick={() => handleViewInvoice(record)}
            style={{ backgroundColor: 'black', color: 'white', borderColor: 'black' }}
          >
            View Invoice
          </Button>
        </Space>
      ),
    },
  ];

  const productColumns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Price ($)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Product) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteProduct(record.key)}
          danger
        />
      ),
    },
  ];

  const generateInvoicePDF = async (order: Order) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    // Embed the font and the logo image
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    try {
      const logoImage = await fetch(logoUrl).then(res => res.arrayBuffer());
      let logo;
      try {
        logo = await pdfDoc.embedPng(logoImage);
      } catch (e) {
        logo = await pdfDoc.embedJpg(logoImage);
      }
      // Draw the logo
      page.drawImage(logo, {
        x: 450,
        y: 290,
        width: 100,
        height: 80,
      });
    } catch (e) {
      console.error("Could not embed logo image", e);
    }

    const { supplier, products, orderCode, orderDate, orderValidUntil } = order;

    page.drawText(`Invoice for Order: ${orderCode}`, {
      x: 50,
      y: 350,
      size: 20,
      font,
    });
    page.drawText(`Supplier Category: ${supplier.category}`, {
      x: 50,
      y: 320,
      size: 15,
      font,
    });
    page.drawText(`Order Date: ${orderDate}`, {
      x: 50,
      y: 290,
      size: 12,
      font,
    });
    page.drawText(`Valid Until: ${orderValidUntil}`, {
      x: 250,
      y: 290,
      size: 12,
      font,
    });

    const tableY = 260;

    // Draw top border line above the headers
    page.drawLine({
      start: { x: 45, y: tableY + 10 },
      end: { x: 550, y: tableY + 10 },
      thickness: 1,
      color: rgb(0, 0, 0)
    });

    const tableHeaders = [
      { text: 'No.', x: 50 },
      { text: 'Product Name', x: 90 },
      { text: 'Category', x: 230 },
      { text: 'Qty', x: 380 },
      { text: 'Price', x: 430 },
      { text: 'Total', x: 490 }
    ];

    tableHeaders.forEach(header => {
      page.drawText(header.text, { x: header.x, y: tableY, size: 12, color: rgb(0, 0, 0) });
    });

    let yPosition = tableY - 20;
    let grandTotal = 0;
    
    products.forEach((product, index) => {
      const lineTotal = product.quantity * (product.price || 0);
      grandTotal += lineTotal;
      
      page.drawText(`${index + 1}`, { x: 50, y: yPosition, size: 12 });
      page.drawText(product.name, { x: 90, y: yPosition, size: 12 });
      page.drawText(product.category, { x: 230, y: yPosition, size: 12 });
      page.drawText(product.quantity.toString(), { x: 380, y: yPosition, size: 12 });
      page.drawText(`$${product.price}`, { x: 430, y: yPosition, size: 12 });
      page.drawText(`$${lineTotal}`, { x: 490, y: yPosition, size: 12 });

      // Draw table borders
      page.drawLine({
        start: { x: 45, y: yPosition + 10 },
        end: { x: 550, y: yPosition + 10 },
        thickness: 0.5,
        color: rgb(0, 0, 0)
      });
      page.drawLine({
        start: { x: 45, y: yPosition - 10 },
        end: { x: 550, y: yPosition - 10 },
        thickness: 0.5,
        color: rgb(0, 0, 0)
      });
      yPosition -= 20;
    });

    // Draw vertical borders
    [45, 85, 225, 375, 425, 485, 550].forEach((xPos) => {
      page.drawLine({
        start: { x: xPos, y: tableY + 10 },
        end: { x: xPos, y: yPosition + 10 },
        thickness: 0.5,
        color: rgb(0, 0, 0)
      });
    });

    // Draw the bottom horizontal line of the table
    page.drawLine({
      start: { x: 45, y: yPosition + 10 },
      end: { x: 550, y: yPosition + 10 },
      thickness: 1,
      color: rgb(0, 0, 0)
    });
    
    // Draw Grand Total
    yPosition -= 20;
    page.drawText(`Grand Total: $${grandTotal}`, { x: 420, y: yPosition, size: 14, font });

    // Add the note at the bottom
    page.drawText('Note: This is electronically generated by Koita Battery Traders', {
      x: 50,
      y: 30,
      size: 10,
      font,
      color: rgb(0, 0, 0),
    });

    return pdfDoc;
  };

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
        <Table columns={orderColumns} dataSource={filteredOrders} />

        <Modal
          title={isEditMode ? 'Edit Order' : 'Add New Order'}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
          width={1000}
          okButtonProps={{ style: { backgroundColor: 'black', color: 'white', borderColor: 'black' } }}
        >
          <Form form={form} layout="vertical">
            <Form.Item name="orderCode" label="Order Code" rules={[{ required: true, message: 'Please enter the order code' }]}>
              <Input readOnly />
            </Form.Item>
            <Form.Item name="orderDate" label="Order Date" rules={[{ required: true, message: 'Please select the order date' }]}>
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item name="orderValidUntil" label="Order Valid Until" rules={[{ required: true, message: 'Please select the validity date' }]}>
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item name="supplierCategory" label="Supplier Category" rules={[{ required: true, message: 'Please select a supplier category' }]}>
              <Select>
                <Select.Option value="Local Supplier">Local Supplier</Select.Option>
                <Select.Option value="International Supplier">International Supplier</Select.Option>
              </Select>
            </Form.Item>

            <h3>Products</h3>
            <Button
              type="primary"
              onClick={() => setIsProductModalVisible(true)}
              style={{ backgroundColor: 'black', color: 'white', borderColor: 'black' }}
            >
              Add Product
            </Button>

            <Table
              columns={productColumns}
              dataSource={products}
              pagination={{ pageSize: 4 }}
              style={{ marginTop: 20 }}
            />
          </Form>
        </Modal>

        <Modal
          title="Invoice"
          open={isInvoiceModalVisible}
          onCancel={() => setIsInvoiceModalVisible(false)}
          footer={null}
          width={800}
        >
          {pdfUrl && (
            <div style={{ marginBottom: 16 }}>
              <iframe
                src={pdfUrl}
                width="100%"
                height="500px"
                title="Invoice PDF"
                style={{ border: 'none', borderBottom: '1px solid #ddd', marginBottom: 16 }}
              />
            </div>
          )}
          
          <div style={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '12px' }}>Send Invoice Text via WhatsApp</h4>
            <p style={{ fontSize: '12px', color: 'gray', marginBottom: '12px' }}>
              Note: WhatsApp links do not support attaching files directly. This will send a text summary. To send the PDF, download it first or use the manual "Share" feature if your browser supports it.
            </p>
            <Space>
              <Input 
                placeholder="Phone No with country code (e.g. +1234567890)" 
                value={whatsappPhone}
                onChange={(e) => setWhatsappPhone(e.target.value)}
                style={{ width: '250px' }}
              />
              <Button 
                type="primary" 
                onClick={handleSendToWhatsapp} 
                style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
              >
                Send Summary
              </Button>
              <Button 
                onClick={async () => {
                  if (pdfUrl) {
                     try {
                        const response = await fetch(pdfUrl);
                        const blob = await response.blob();
                        const file = new File([blob], `Invoice-${currentOrder?.orderCode || 'Order'}.pdf`, { type: 'application/pdf' });
                        if (navigator.canShare && navigator.canShare({ files: [file] })) {
                             await navigator.share({
                                 title: `Invoice ${currentOrder?.orderCode || ''}`,
                                 text: 'Here is the attached invoice.',
                                 files: [file]
                             });
                        } else {
                             message.info("Direct PDF sharing is not supported on this browser. Click 'Download PDF' instead.");
                        }
                     } catch (err) {
                         console.error('Error sharing', err);
                     }
                  }
                }} 
              >
                Share File directly
              </Button>
              <Button 
                onClick={() => {
                  if (pdfUrl) {
                    const a = document.createElement('a');
                    a.href = pdfUrl;
                    a.download = `Invoice-${currentOrder?.orderCode || 'Order'}.pdf`;
                    a.click();
                  }
                }} 
              >
                Download PDF
              </Button>
            </Space>
          </div>
        </Modal>

        {/* Modal for Adding Products */}
        <Modal
          title="Add Product"
          open={isProductModalVisible}
          onOk={handleAddProduct}
          onCancel={() => setIsProductModalVisible(false)}
          okButtonProps={{ style: { backgroundColor: 'black', color: 'white', borderColor: 'black' } }}
        >
          <Form form={productForm} layout="vertical">
            <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please enter the product name' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category' }]}>
              <Select>
                <Select.Option value="Solar Panels">Solar Panels</Select.Option>
                <Select.Option value="Inverters">Inverters</Select.Option>
                <Select.Option value="Batteries">Batteries</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please enter the quantity' }]}>
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the price' }]}>
              <InputNumber min={0} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </DefaultLayout>
  );
};

export default SolarOrderPage;
