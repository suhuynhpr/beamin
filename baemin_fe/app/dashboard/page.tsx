"use client";
import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, message, Space, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { deleteCategory, getCategories } from "../apis/dashboard.api";
import ModalAddCatagory from "./component/ModalAddCatagory";
export default function Home() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const refModalAddCatagory = useRef<any>(null);
  const queryCategories = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(1, 100),
    select: (data) => {
      return data.data;
    },
  });

  const {
    mutate: mutateDelete,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      message.success("Xóa thành công");
    },
  });

  const items = [
    {
      name: "Gà Rán",
      imageSrc: "/images/Ga.png",
      description: "Thức ăn nhanh",
    },
    {
      name: "Burger",
      imageSrc: "/images/burger.jpg",
      description: "Thức ăn nhanh",
    },
    {
      name: "Bún",
      imageSrc: "/images/noddle.png",
      description: "Thức ăn nhanh",
    },
    {
      name: "Mì",
      imageSrc: "/images/noddle.png",
      description: "Thức ăn nhanh",
    },
    {
      name: "Burger",
      imageSrc: "/images/noddle.png",
      description: "Thức ăn nhanh",
    },
  ];

  const banneritems = [
    {
      id: "1",
      name: "anh 1",
      url: "/images/map1.png",
    },
    {
      id: "2",
      name: "anh 2",
      url: "/images/map2.png",
    },
    {
      id: "3",
      name: "anh 32",
      url: "/images/map3.png",
    },
    {
      id: "3",
      name: "anh 32",
      url: "/images/map4.png",
    },
  ];
  const TodayFood = {
    title: "Hôm Nay ăn gì",
    items: [
      {
        id: "1",
        name: " Gà Ủ Muối Hoa Tiêu - Food",
        adrress: "4A Đường Số 71, P. Tân Quy, Quận 7, TP. HCM",
        img: "/food/ga1.jpg",
        kind: "Quan An",
      },
      {
        id: "31",
        name: " Gà Ủ Muối Hoa Tiêu - Food",
        adrress: "4A Đường Số 71, P. Tân Quy, Quận 7, TP. HCM",
        img: "/food/ga1.jpg",
        kind: "Quan An",
      },
      {
        id: "41",
        name: " Gà Ủ Muối Hoa Tiêu - Food",
        adrress: "4A Đường Số 71, P. Tân Quy, Quận 7, TP. HCM",
        img: "/food/ga1.jpg",
        kind: "Quan An",
      },
      {
        id: "51",
        name: " Gà Ủ Muối Hoa Tiêu - Food",
        adrress: "4A Đường Số 71, P. Tân Quy, Quận 7, TP. HCM",
        img: "/food/ga1.jpg",
        kind: "Quan An",
      },
      {
        id: "2213",
        name: " Gà Ủ Muối Hoa Tiêu - Food",
        adrress: "4A Đường Số 71, P. Tân Quy, Quận 7, TP. HCM",
        img: "/food/ga1.jpg",
        kind: "Quan An",
      },
      {
        id: "61",
        name: " Gà Ủ Muối Hoa Tiêu - Food",
        adrress: "4A Đường Số 71, P. Tân Quy, Quận 7, TP. HCM",
        img: "/food/ga1.jpg",
        kind: "Quan An",
      },
    ],
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 pt-3 pl-8 pr-8  z-40">
          <div className="flex flex-col fixed  bg-white w-64 rounded-2xl px-3 pt-2 pb-5 gap-3">
            <Flex justify="space-between">
              <span>Thực đơn</span>
              <ModalAddCatagory ref={refModalAddCatagory} />
            </Flex>

            {queryCategories?.data ? (
              queryCategories?.data?.data?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-row gap-3 cursor-pointer hover:bg-slate-100 justify-between group"
                >
                  <div
                    className="flex flex-row items-center gap-1"
                    onClick={() => {
                      router.push(`/foods/${item?.id}`);
                    }}
                  >
                    <Image
                      src={item?.image}
                      width={30}
                      height={30}
                      alt={item?.description}
                    />
                    <span>{item?.name}</span>
                  </div>
                  <Space className="opacity-0 group-hover:opacity-100">
                    <Button
                      icon={<EditOutlined style={{ color: "#3AC5C9" }} />}
                      onClick={() =>
                        refModalAddCatagory.current.showModal(item)
                      }
                    />
                    <Button
                      icon={<DeleteOutlined style={{ color: "red" }} />}
                      onClick={() => mutateDelete(item?.id)}
                    />
                  </Space>
                </div>
              ))
            ) : (
              <Spin />
            )}
          </div>
        </div>
        <div className="col-span-9 w-full  pt-3 pr-8 gap-3 flex flex-col">
          <ScrollBar items={banneritems}></ScrollBar>
          <ScrollFood items={TodayFood}></ScrollFood>
          <ScrollFood items={TodayFood}></ScrollFood>
        </div>
      </div>
    </>
  );
}
