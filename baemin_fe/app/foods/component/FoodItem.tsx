import { Card } from "antd";
import React from "react";
const { Meta } = Card;

const FoodItem = ({ id }: { id: number }) => {
  return (
    <Card
      hoverable
      //   style={{ width: 240 }}
      cover={
        <img alt="example" src={`https://picsum.photos/200/300?random=${id}`} />
      }
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  );
};

export default FoodItem;
