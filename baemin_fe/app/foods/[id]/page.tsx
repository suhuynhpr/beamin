"use client";
import { Col, Pagination, Row, Space, Typography } from "antd";
import FoodItem from "../component/FoodItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoryById } from "@/app/apis/dashboard.api";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
export default function Home({ params }: { params: { id: number } }) {
  const router = useRouter();
  const queryCategoryById = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoryById(params.id),
    select: (data) => {
      return data.data;
    },
  });

  return (
    <div className="flex flex-col w-full h-auto px-10 pt-20">
      <Space align="center" size="large">
        <LeftOutlined
          style={{ fontSize: 24, marginBottom: 15 }}
          onClick={() => router.push("/")}
        />
        <Typography.Title>
          {queryCategoryById?.data?.data?.name}
        </Typography.Title>
      </Space>
      <Row gutter={[16, 16]}>
        {Array.from(Array(16).keys(), (i) => i + 1).map((i) => (
          <Col key={i} className="gutter-row" span={3}>
            <FoodItem id={i} />
          </Col>
        ))}
      </Row>
      <div className="flex justify-center mt-4">
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
}
