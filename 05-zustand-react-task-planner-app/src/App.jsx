import {
  Badge,
  Button,
  Card,
  DatePicker,
  Empty,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Tag,
} from "antd";
import { Delete, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { usePlanner } from "./store/usePlanner";
import moment from "moment/moment";

const desc =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s";

const App = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(new Date().toLocaleTimeString());

  const { tasks, addTask, deleteTask, updateStatus, deleteAllTask } =
    usePlanner();

  const highestTask = tasks.filter((item) => item.priority === "highest");
  const mediumTask = tasks.filter((item) => item.priority === "medium");
  const lowestTask = tasks.filter((item) => item.priority === "lowest");

  const createTask = (value) => {
    value.id = Date.now();
    value.status = "pending";
    value.createdAt = new Date();
    addTask(value);
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="bg-gray-200 h-screen overflow-hidden">
      <nav className="bg-white h-[60px] fixed top-0 left-0 w-full flex justify-between items-center px-8">
        <div className="flex items-center">
          <button
            className="w-10 h-10 rounded-full font-bold text-white 
            bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600"
          >
            PL
          </button>
          <h1 className="text-xl font-bold ml-px">anner</h1>
        </div>
        <div className="flex gap-5 items-center">
          <h1 className="text-2xl font-bold md:block hidden">{timer} AM</h1>
          <DatePicker placeholder="Filter" className="!py-1.5" />
          <button
            onClick={() => setOpen(true)}
            className="focus:shadow-lg hover:scale-105 transition-transform duration-300 py-2 px-3 rounded bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 text-white text-sm flex items-center gap-1 font-medium"
          >
            <Plus className="w-4 h-4" />
            Add task
          </button>

          <Popconfirm title="Do you want to delete all tasks ?" onConfirm={()=> deleteAllTask()}>
            <button
              className="focus:shadow-lg hover:scale-105 transition-transform duration-300 py-2 px-3 rounded bg-gradient-to-tr from-rose-600 via-red-500 to-rose-600 text-white text-sm flex items-center gap-1 font-medium"
            >
              <Delete className="w-4 h-4" />
              Delete All Task
            </button>
          </Popconfirm>
        </div>
      </nav>

      <section className="fixed top-[60px] left-0 h-[calc(100%-120px)] w-full overflow-x-auto overflow-y-visible grid xl:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-8 p-8">
        <div className="lg:h-full lg:min-h-0 h-[300px]">
          <Badge.Ribbon
            text="Highest"
            className="z-10 !bg-gradient-to-br !from-rose-500 !via-pink-500 !to-rose-500 !font-medium"
          />
          <div className="bg-white rounded-lg h-full min-h-0 overflow-auto p-6 space-y-8">
            <div className="flex flex-col gap-8">
              {highestTask.length === 0 && (
                <>
                  <Empty description="There is no task added as highest priority" />
                  <button
                    onClick={() => setOpen(true)}
                    className="w-fit mx-auto focus:shadow-lg hover:scale-105 transition-transform duration-300 py-2 px-3 rounded bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 text-white text-sm flex items-center gap-1 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add task
                  </button>
                </>
              )}
              {highestTask.map((item, index) => (
                <Card hoverable key={index}>
                  <Card.Meta
                    title={item.title}
                    description={item.description}
                  />
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      {item.status === "pending" && (
                        <Tag className="capitalize">{item.status}</Tag>
                      )}
                      {item.status === "inProgress" && (
                        <Tag className="capitalize" color="geekblue">
                          {item.status}
                        </Tag>
                      )}

                      {item.status === "completed" && (
                        <Tag className="capitalize" color="green">
                          {item.status}
                        </Tag>
                      )}

                      <Tag
                        className="!bg-rose-500 !border-rose-500 !text-white"
                        onClick={() => deleteTask(item.id)}
                      >
                        Delete
                      </Tag>
                    </div>
                    <Select
                      size="small"
                      placeholder="Change status"
                      onChange={(status) => updateStatus(item.id, status)}
                    >
                      <Select.Option value="pending">Pending</Select.Option>
                      <Select.Option value="inProgress">
                        inProgress
                      </Select.Option>
                      <Select.Option value="completed">Completed</Select.Option>
                    </Select>
                  </div>
                  <label className="text-slate-600 text-xs mt-3 flex">
                    {moment(item.createdAt).format("DD MMM YYYY hh:mm A")}
                  </label>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:h-full lg:min-h-0 h-[300px]">
          <Badge.Ribbon
            text="Medium"
            className="z-10 !bg-gradient-to-br !from-indigo-500 !via-indigo-500 !to-indigo-500 !font-medium"
          />
          <div className="bg-white  rounded-lg h-full min-h-0 overflow-auto p-6 space-y-8">
            <div className="flex flex-col gap-8">
              {mediumTask.length === 0 && (
                <>
                  <Empty description="There is no task added as highest priority" />
                  <button
                    onClick={() => setOpen(true)}
                    className="w-fit mx-auto focus:shadow-lg hover:scale-105 transition-transform duration-300 py-2 px-3 rounded bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 text-white text-sm flex items-center gap-1 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add task
                  </button>
                </>
              )}
              {mediumTask.map((item, index) => (
                <Card hoverable key={index}>
                  <Card.Meta
                    title={item.title}
                    description={item.description}
                  />
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      {item.status === "pending" && (
                        <Tag className="capitalize">{item.status}</Tag>
                      )}
                      {item.status === "inProgress" && (
                        <Tag className="capitalize" color="geekblue">
                          {item.status}
                        </Tag>
                      )}

                      {item.status === "completed" && (
                        <Tag className="capitalize" color="green">
                          {item.status}
                        </Tag>
                      )}

                      <Tag
                        className="!bg-rose-500 !border-rose-500 !text-white"
                        onClick={() => deleteTask(item.id)}
                      >
                        Delete
                      </Tag>
                    </div>
                    <Select
                      size="small"
                      placeholder="Change status"
                      onChange={(status) => updateStatus(item.id, status)}
                    >
                      <Select.Option value="pending">Pending</Select.Option>
                      <Select.Option value="inProgress">
                        inProgress
                      </Select.Option>
                      <Select.Option value="completed">Completed</Select.Option>
                    </Select>
                  </div>
                  <label className="text-slate-600 text-xs mt-3 flex">
                    {moment(item.createdAt).format("DD MMM YYYY hh:mm A")}
                  </label>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:h-full lg:min-h-0 h-[300px]">
          <Badge.Ribbon
            text="Lowest"
            className="z-10 !bg-gradient-to-br !from-amber-500 !via-orange-500 !to-amber-500 !font-medium"
          />
          <div className="bg-white  rounded-lg h-full min-h-0 overflow-auto p-6 space-y-8">
            <div className="flex flex-col gap-8">
              {lowestTask.length === 0 && (
                <>
                  <Empty description="There is no task added as highest priority" />
                  <button
                    onClick={() => setOpen(true)}
                    className="w-fit mx-auto focus:shadow-lg hover:scale-105 transition-transform duration-300 py-2 px-3 rounded bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 text-white text-sm flex items-center gap-1 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add task
                  </button>
                </>
              )}
              {lowestTask.map((item, index) => (
                <Card hoverable key={index}>
                  <Card.Meta
                    title={item.title}
                    description={item.description}
                  />
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      {item.status === "pending" && (
                        <Tag className="capitalize">{item.status}</Tag>
                      )}
                      {item.status === "inProgress" && (
                        <Tag className="capitalize" color="geekblue">
                          {item.status}
                        </Tag>
                      )}

                      {item.status === "completed" && (
                        <Tag className="capitalize" color="green">
                          {item.status}
                        </Tag>
                      )}

                      <Tag
                        className="!bg-rose-500 !border-rose-500 !text-white"
                        onClick={() => deleteTask(item.id)}
                      >
                        Delete
                      </Tag>
                    </div>
                    <Select
                      size="small"
                      placeholder="Change status"
                      onChange={(status) => updateStatus(item.id, status)}
                    >
                      <Select.Option value="pending">Pending</Select.Option>
                      <Select.Option value="inProgress">
                        inProgress
                      </Select.Option>
                      <Select.Option value="completed">Completed</Select.Option>
                    </Select>
                  </div>
                  <label className="text-slate-600 text-xs mt-3 flex">
                    {moment(item.createdAt).format("DD MMM YYYY hh:mm A")}
                  </label>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-white h-[60px] fixed bottom-0 left-0 w-full flex items-center justify-between px-8">
        <h1 className="text-2xl font-bold">Total task - {tasks.length}</h1>
        <a href="https://zahid.com" className="text-gray-400 hover:underline">
          www.zahid.com
        </a>
      </footer>
      <Modal
        open={open}
        onCancel={handleClose}
        maskClosable={false}
        footer={null}
      >
        <h1 className="text-lg font-medium mb-4">Add new task</h1>
        <Form
          onFinish={createTask}
          form={form}
          initialValues={{ description: desc }}
        >
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input placeholder="Task name" size="large" />
          </Form.Item>
          <Form.Item name="description" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Task description goes here" rows={5} />
          </Form.Item>

          <Form.Item name="priority" rules={[{ required: true }]}>
            <Select size="large" placeholder="Choose priority">
              <Select.Option value="highest">Highest</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="lowest">Lowest</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
