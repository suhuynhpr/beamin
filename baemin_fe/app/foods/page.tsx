"use client";
import { Col, Pagination, Row } from "antd";
import FoodItem from "./component/FoodItem";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-auto p-10">
      <Row gutter={[16, 16]}>
        <Col className="gutter-row" span={3}>
          <FoodItem />
        </Col>
        <Col className="gutter-row" span={3}>
          <FoodItem />
        </Col>
        <Col className="gutter-row" span={3}>
          <FoodItem />
        </Col>
        <Col className="gutter-row" span={3}>
          <FoodItem />
        </Col>
        <Col className="gutter-row" span={3}>
          <FoodItem />
        </Col>
        <Col className="gutter-row" span={3}>
          <FoodItem />
        </Col>
        <Col className="gutter-row" span={3}>
          <FoodItem />
        </Col>
        <Col className="gutter-row" span={3}>
          <FoodItem />
        </Col>
        <Col className="gutter-row" span={3}>
          <FoodItem />
        </Col>
        <Col className="gutter-row" span={3}>
          <FoodItem />
        </Col>
        <Col className="gutter-row" span={3}>
          <FoodItem />
        </Col>
        <Col className="gutter-row" span={3}>
          <FoodItem />
        </Col>
        <Col className="gutter-row" span={3}>
          <FoodItem />
        </Col>
        <Col className="gutter-row" span={3}>
          <FoodItem />
        </Col>
        <Col className="gutter-row" span={3}>
          <FoodItem />
        </Col>
        <Col className="gutter-row" span={3}>
          <FoodItem />
        </Col>
      </Row>
      <div className="flex justify-center mt-4">
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
}
