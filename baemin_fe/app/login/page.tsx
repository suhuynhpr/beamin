"use client";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  FacebookOutlined,
  GoogleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import React from "react";
import { login } from "../apis/auth.api";
import { useRouter } from "next/navigation";
const Page: React.FC = () => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/");
  };
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: any) => login(body),
    onSuccess: (e) => {
      window.localStorage.setItem("token", e.data.data.access_token);
      handleNavigate();
    },
  });

  const onFinish = (values: any) => {
    mutate(values);
  };

  return (
    <>
      <div className="mt-14 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
        <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
          Đăng Nhập
        </div>
        <Form onFinish={onFinish}>
          <div className="flex flex-col w-full gap-3">
            <Form.Item
              name={["email"]}
              rules={[
                { required: true, message: "Vui lòng nhập" },
                { type: "email", message: "Không đúng định dạng" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                className="h-[40px]"
              />
            </Form.Item>
          </div>
          <div className="flex flex-col w-full mt-3">
            <Form.Item
              name={["password"]}
              rules={[
                { required: true, message: "Vui lòng nhập" },
                { min: 6, message: "Tối thiểu 6 ký tự" },
              ]}
            >
              <Input.Password
                placeholder="Mật khẩu"
                className="h-[40px]"
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </div>

          <div className="flex flex-col w-full mt-3">
            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full h-[40px] uppercase text-white rounded-lg"
                type="primary"
                loading={isPending}
                style={{
                  backgroundColor: "rgb(58 197 201)",
                  borderColor: "rgb(58 197 201)",
                }}
              >
                Đăng Nhập
              </Button>
            </Form.Item>
            {/* <div className="flex flex-row justify-end items-center w-full text-sm text-beamin mt-2">
            <span className="cursor-pointer">Quên mật khẩu </span>
            <span className="cursor-pointer">Đăng nhập bằng SMS </span>
          </div> */}
          </div>
        </Form>
        {/* <div className="flex items-center justify-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-600">HOẶC</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex flex-row items-center justify-center gap-5 h-[40px] ">
          <button className="flex items-center justify-center gap-3 border w-full h-full p-1 text-beamin text-base">
            <FacebookOutlined />
            <span>Facebook</span>
          </button>
          <button className="flex items-center justify-center gap-3 border w-full h-full p-1 text-beamin text-base">
            <GoogleOutlined />
            <span>Google</span>
          </button>
        </div> */}
        <div className="flex items-center justify-center gap-1">
          <span className="text-gray-600">Bạn mới biết đến Baemin?</span>
          <Link className="text-beamin cursor-pointer" href={"/register"}>
            Đăng kí
          </Link>
        </div>
      </div>
    </>
  );
};
export default Page;
