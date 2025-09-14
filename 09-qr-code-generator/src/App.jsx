import { Button, Form, Input, Modal, QRCode } from "antd";
import { Download } from "lucide-react";
import { useRef, useState } from "react";

const App = () => {
  const [open, setOpen] = useState(false)
  const [qr, setQr] = useState({
    value: 'https://www.google.com/',
    icon: '',
    bgColor: 'white',
    color: 'black',
  })

  const devRef = useRef();
  const downloadNow = () => {
    const div = devRef.current;
    const canvas = div.querySelector("canvas");
    const base64String = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = base64String;
    a.download = "qr-code.png";
    a.click();
    a.remove();
  };

  const generateQr = (values) => {
    values.bgColor = values.bgColor || "white"
    values.color = values.color || "color"
    setOpen(false)
    setQr((prev) => ({
      ...prev,
      ...values
    }))
  }
  return (
    <div className="bg-gray-100 h-screen py-12 flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-12 font-bold">Generator - QR CODE</h1>
      <div className="mb-12 rounded-xl p-4 bg-white shadow-lg w-fit hover:scale-115 transition-transform duration-300 hover:shadow-2xl">
        <QRCode
          ref={devRef}
          value="qr.value"
          size={300}
          icon={qr.icon}
          bgColor={qr.bgColor}
          color={qr.color}
        />
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => setOpen(true)}
          size="large"
          type="primary"
          className="!bg-rose-500"
        >
          Generate new QR
        </Button>
        <Button
          onClick={downloadNow}
          size="large"
          type="primary"
          icon={<Download className="w-4 h-4" />}
        >
          Download Now
        </Button>
      </div>

      <Modal open={open} footer={null} onCancel={() => setOpen(false)}>
        <h1 className="text-lg font-medium mb-4">Generate your QR</h1>
        <Form onFinish={generateQr}>
          <Form.Item
            label="URL"
            name="url"
            rules={[{ required: true, type: "url" }]}
          >
            <Input size="large" placeholder="https://domain.com" />
          </Form.Item>

          <Form.Item label="BG Color" name="bgColor">
            <Input type="color" size="large" />
          </Form.Item>

          <Form.Item label="Color" name="color">
            <Input type="color" size="large" />
          </Form.Item>

          <Form.Item label="Logo" name="logo">
            <Input type="file" size="large" accept="image/*" />
          </Form.Item>
          <Form.Item>
            <Button  type="primary" size="large" htmlType="submit">
              Generate
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
