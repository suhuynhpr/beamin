"use client";
import { ShoppingCartOutlined } from "@ant-design/icons";
import React from "react";
import TypeSelector from "./type";
import AreaSelector from "./area";
import FilterSelector from "./filter";
import ResultFood from "./result";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getFoods } from "../apis/food.api";

const Page: React.FC = () => {
  const searchParams = useSearchParams();

  const queryUser = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      getFoods(
        Number(searchParams?.get("page")) || 1,
        Number(searchParams?.get("limit")) || 1000,
        searchParams?.get("value") ?? ""
      ),
    enabled: !!searchParams?.get("value"),
    select: (data) => {
      return data.data;
    },
  });

  console.log(queryUser.data.data);

  const items = [
    {
      id: "1",
      name: "Cơm Chiên & Nui Xào Bò - Cống Quỳnh",
      address: "102/12 Cống Quỳnh, Quận 1, TP. HCM",
      image: "/food/ga1.jpg",
      kind: "Quán Ăn",
    },
    {
      id: "1",
      name: "Cơm Chiên & Nui Xào Bò - Cống Quỳnh",
      address: "102/12 Cống Quỳnh, Quận 1, TP. HCM",
      image: "/food/ga1.jpg",
      kind: "Quán Ăn",
    },
    {
      id: "1",
      name: "Cơm Chiên & Nui Xào Bò - Cống Quỳnh",
      address: "102/12 Cống Quỳnh, Quận 1, TP. HCM",
      image: "/food/ga1.jpg",
      kind: "Quán Ăn",
    },
    {
      id: "1",
      name: "Cơm Chiên & Nui Xào Bò - Cống Quỳnh",
      address: "102/12 Cống Quỳnh, Quận 1, TP. HCM",
      image: "/food/ga1.jpg",
      kind: "Quán Ăn",
    },
    {
      id: "1",
      name: "Cơm Chiên & Nui Xào Bò - Cống Quỳnh",
      address: "102/12 Cống Quỳnh, Quận 1, TP. HCM",
      image: "/food/ga1.jpg",
      kind: "Quán Ăn",
    },
    {
      id: "1",
      name: "Cơm Chiên & Nui Xào Bò - Cống Quỳnh",
      address: "102/12 Cống Quỳnh, Quận 1, TP. HCM",
      image: "/food/ga1.jpg",
      kind: "Quán Ăn",
    },
    {
      id: "1",
      name: "Cơm Chiên & Nui Xào Bò - Cống Quỳnh",
      address: "102/12 Cống Quỳnh, Quận 1, TP. HCM",
      image: "/food/ga1.jpg",
      kind: "Quán Ăn",
    },
    {
      id: "1",
      name: "Cơm Chiên & Nui Xào Bò - Cống Quỳnh",
      address: "102/12 Cống Quỳnh, Quận 1, TP. HCM",
      image: "/food/ga1.jpg",
      kind: "Quán Ăn",
    },
    {
      id: "1",
      name: "Cơm Chiên & Nui Xào Bò - Cống Quỳnh",
      address: "102/12 Cống Quỳnh, Quận 1, TP. HCM",
      image: "/food/ga1.jpg",
      kind: "Quán Ăn",
    },
    {
      id: "1",
      name: "Cơm Chiên & Nui Xào Bò - Cống Quỳnh",
      address: "102/12 Cống Quỳnh, Quận 1, TP. HCM",
      image: "/food/ga1.jpg",
      kind: "Quán Ăn",
    },
    {
      id: "1",
      name: "Cơm Chiên & Nui Xào Bò - Cống Quỳnh",
      address: "102/12 Cống Quỳnh, Quận 1, TP. HCM",
      image: "/food/ga1.jpg",
      kind: "Quán Ăn",
    },
    {
      id: "1",
      name: "Cơm Chiên & Nui Xào Bò - Cống Quỳnh",
      address: "102/12 Cống Quỳnh, Quận 1, TP. HCM",
      image: "/food/ga1.jpg",
      kind: "Quán Ăn",
    },
    {
      id: "1",
      name: "Cơm Chiên & Nui Xào Bò - Cống Quỳnh",
      address: "102/12 Cống Quỳnh, Quận 1, TP. HCM",
      image: "/food/ga1.jpg",
      kind: "Quán Ăn",
    },
  ];
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center border-b border-solid">
        <div className="flex flex-row gap-3">
          <AreaSelector />
          <TypeSelector />
        </div>
        <div className="flex items-center justify-center ">
          <FilterSelector></FilterSelector>
        </div>
      </div>

      <ResultFood items={queryUser?.data?.data || []} />
    </>
  );
};
export default Page;
