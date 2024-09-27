"use client";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "../apis/auth.api";

const Page: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/login");
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: any) => register(body),
    onSuccess: () => {
      handleNavigate();
      message.success("Đăng ký thành công");
    },
  });

  const onFinish = (values: any) => {
    const body = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    mutate(body);
  };
  return (
    <>
      <div className="mt-28 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
        <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
          Đăng Kí
        </div>
        <Form onFinish={onFinish} form={form}>
          <div className="w-full gap-2">
            <Form.Item
              name={["name"]}
              rules={[{ required: true, message: "Vui lòng nhập" }]}
            >
              <Input placeholder="Họ và Tên" className="w-full h-[40px]" />
            </Form.Item>
            {/* <Input placeholder="Tên" className="h-[40px]" /></Form.Item> */}
          </div>
          <div className="flex flex-col w-full gap-3">
            <Form.Item
              name={["email"]}
              rules={[
                { required: true, message: "Vui lòng nhập" },
                { type: "email", message: "Không đúng định dạng" },
              ]}
            >
              <Input placeholder="Email" className="h-[40px]" />
            </Form.Item>
          </div>
          {/* <div className="flex flex-col w-full gap-3">
          <Input placeholder="Tên đăng nhập" className="h-[40px]" />
        </div> */}
          {/* <div className="flex flex-col w-full gap-3">
          <Input placeholder="Số điện thoại" className="h-[40px]" />
        </div> */}

          <div className="flex flex-col w-full ">
            <Form.Item
              name={["password"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập  mật khẩu",
                },
              ]}
            >
              <Input.Password
                placeholder="Mật khẩu"
                className="h-[40px]"
                onChange={(e) => {
                  form.setFields([
                    {
                      name: ["password_confirm"],
                      errors: [],
                      value: "",
                    },
                  ]);
                }}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </div>
          <div className="flex flex-col w-full ">
            <Form.Item
              name={["password_confirm"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lại mật khẩu",
                },
                { min: 6, message: "Tối thiểu 6 ký tự" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu nhập lại không khớp")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Nhập lại mật khẩu"
                className="h-[40px]"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </div>
          <div className="flex flex-col w-full">
            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full h-[40px] uppercase text-white rounded-lg"
                type="primary"
                // loading={isPending}
                style={{
                  backgroundColor: "rgb(58 197 201)",
                  borderColor: "rgb(58 197 201)",
                }}
              >
                Đăng Kí
              </Button>
            </Form.Item>
          </div>
          <div className="flex items-center justify-center gap-1">
            <span className="text-gray-600">Bạn đã có tài khoản?</span>
            <Link className="text-beamin cursor-pointer" href={"/login"}>
              Đăng nhập
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
};
export default Page;
