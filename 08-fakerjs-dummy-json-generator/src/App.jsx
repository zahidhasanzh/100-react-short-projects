import "animate.css";
import {
  Button,
  Card,
  Empty,
  Form,
  InputNumber,
  message,
  Select,
  Tooltip,
} from "antd";
import { Copy } from "lucide-react";
import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const App = () => {
  const [payload, setPayload] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const generateUser = () => {
    return {
      id: nanoid(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      mobile: faker.phone.number({ style: "international" }),
      gender: faker.person.gender(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      pincode: Number(faker.location.zipCode()),
      createdAt: faker.date.anytime(),
    };
  };

  const generateProducts = () => {
    return {
      id: nanoid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: Number(faker.commerce.price()),
      discount: Number(faker.commerce.price({ min: 0, max: 50 })),
      rating: Number(faker.commerce.price({ min: 1, max: 5 })),
      category: faker.commerce.productAdjective(),
      brand: faker.company.buzzNoun(),
      image: faker.image.urlLoremFlickr({ category: "product", width: 1280 }),
      createdAt: faker.date.anytime(),
    };
  };

  const generatePayments = () => {
    return {
      id: nanoid(),
      user: {
        id: nanoid(),
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        mobile: faker.phone.number({ style: "international" }),
      },
      product: {
        id: nanoid(),
        title: faker.commerce.productName(),
      },
      amount: Number(faker.commerce.price()),
      orderId: `OID-${nanoid()}`,
      transactionId: `TSC-${nanoid()}`,
      method: "UPI",
      tax: Number(faker.commerce.price({ min: 0, max: 50 })),
      createdAt: faker.date.anytime(),
    };
  };

  const generateData = (values) => {
    const temp = [];
    for (let i = 0; i < values.numOfData; i++) {
      if (values.data === "users") {
        temp.push(generateUser());
      } else if (values.data === "products") {
        temp.push(generateProducts());
      }
       else if(values.data === "payments"){
        temp.push(generatePayments())
       }
    }
    const str = JSON.stringify(temp, null, 4);
    setPayload(str);
  };
  const onCopy = () => {
    navigator.clipboard.writeText(payload);
    messageApi.success("Data copied!");
  };
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      {contextHolder}
      <div className="w-9/12 mx-auto flex flex-col gap-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Dummy Data Generator</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            laborum, ex aut vero porro inventore expedita facere. Nisi, maxime
            rem.
          </p>
        </div>
        <Card>
          <Form
            className="flex gap-8"
            layout="vertical"
            onFinish={generateData}
            initialValues={{
              data: "users",
              numOfData: 24,
            }}
          >
            <Form.Item
              label="Choose Data"
              name="data"
              rules={[{ required: true }]}
              className="w-full"
            >
              <Select size="large" placeholder="Choose data">
                <Select.Option value="users">User</Select.Option>
                <Select.Option value="products">Products</Select.Option>
                <Select.Option value="payments">Payments</Select.Option>
                <Select.Option value="employees">Employees</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Number of Data"
              name="numOfData"
              rules={[{ required: true }]}
              className="w-full"
            >
              <InputNumber
                max={100}
                size="large"
                placeholder="Enter number of data"
                className="!w-full"
              />
            </Form.Item>
            <Form.Item label=" ">
              <Button htmlType="submit" type="primary" size="large">
                Generate
              </Button>
            </Form.Item>
          </Form>
        </Card>
        {payload.length === 0 ? (
          <Empty description="Click generate button to get your first payload" />
        ) : (
          <Card
            title="Users"
            extra={
              <Tooltip title="Copy data">
                <Copy onClick={onCopy} style={{ cursor: "pointer" }} />
              </Tooltip>
            }
          >
            <SyntaxHighlighter
              language="javascript"
              style={a11yDark}
              showLineNumbers
            >
              {payload}
            </SyntaxHighlighter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default App;
