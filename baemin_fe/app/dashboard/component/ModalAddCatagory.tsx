import { createCategory, updateCategory } from "@/app/apis/dashboard.api";
import { PlusCircleOutlined } from "@ant-design/icons";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Button, Form, Input, message, Modal } from "antd";
import { set } from "lodash";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const ModalAddCatagory = forwardRef(({}, ref) => {
  const [form] = Form.useForm();
  const [id, setId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: createMutate, isPending: createIsPending } = useMutation({
    mutationFn: (body: any) => createCategory(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      message.success("Tạo thành công");
      form.resetFields();
      handleOk();
    },
  });

  const { mutate: updateMutate, isPending: updateIsPending } = useMutation({
    mutationFn: (data: { id: number; body: any }) =>
      updateCategory(data.id, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      message.success("Tạo thành công");
      form.resetFields();
      handleOk();
    },
  });

  const showModal = (data: any) => {
    if (data.id) {
      form.setFieldsValue(data);
      setId(data.id);
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  useImperativeHandle(ref, () => ({ showModal, handleOk, handleCancel }));

  const validateMessages = {
    required: "${label} is required!",
  };
  const onFinish = (values: any) => {
    if (id) {
      updateMutate({ id, body: values });
    } else {
      createMutate(values);
    }
  };

  return (
    <div>
      <PlusCircleOutlined onClick={showModal} />
      <Modal
        centered
        title={id ? "Sửa danh mục" : "Thêm danh mục"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
        >
          <Form.Item name={["name"]} label="Tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={["description"]}
            label="Mô tả"
            rules={[
              {
                required: true,
                message: "Please enter a valid URL",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={["image"]}
            label="Link hình"
            rules={[
              {
                required: true,
                message: "Please enter a valid URL",
              },
              {
                pattern: /^(https?:\/\/)/,
                message: "URL must start with http:// or https://",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.labelCol, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={createIsPending || updateIsPending}
            >
              {id ? "Sửa" : "Tạo"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
ModalAddCatagory.displayName = "ModalAddCatagory";
export default ModalAddCatagory;
