import { Button, Menu, Modal } from "@mantine/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CartIcon } from "../../icon/cart-icon";
import { useDisclosure } from "@mantine/hooks";
import { useGetOneUserQuery } from "@src/redux/endPoint/accounts";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const { data } = useGetOneUserQuery(id);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const retrievedUser = JSON.parse(storedUser);
      setId(retrievedUser.customerId);
      setRole(retrievedUser.role);
    }
  }, [id]);

  useEffect(() => {
    data
      ? setName(data?.fullname?.lastname + data?.fullname?.firstname)
      : setName("");
  }, [data]);

  const menu = [
    {
      name: "Books",
      path: "/staff",
    },
    {
      name: "Users",
      path: "/staff/user-controller",
    },
  ];

  return (
    <div className="w-full shadow-md">
      <div className="w-[80%] mx-[auto] py-[16px] flex flex-row justify-between justify-items-center">
        <div className="bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 flex items-center">
          <Link
            href="/"
            className="text-4xl font-extrabold text-transparent mr-8"
          >
            Book shop
          </Link>
          {router.asPath.includes("/staff") && (
            <div className="flex flex-row gap-4 items-center pt-2">
              {menu.map((item, index) => (
                <div
                  key={index}
                  onClick={() => router.push(item.path)}
                  className={`cursor-pointer ${
                    router.asPath === item.path
                      ? "bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 underline"
                      : ""
                  }`}
                >
                  <div className="cursor-pointer">{item.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-max flex gap-4 flex-row items-center justify-between justify-items-center">
          <div className="flex gap-4 flex-row items-center justify-between justify-items-center">
            {name && (
              <Menu>
                <Menu.Target>
                  <Button variant="white">{name}</Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>Information</Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      localStorage.removeItem("user");
                      setName("");
                      router.push("/");
                    }}
                  >
                    Log Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
            <div>
              <Link className="relative block w-max" href="/cart">
                <CartIcon size={26} fill="#000000" />
                <div className="absolute -top-[15px] -right-[10px] flex justify-center w-[24px] h-[24px] text-[16px] text-center bg-[#e20707] text-[#ffffff] rounded-full">
                  20
                </div>
              </Link>
            </div>
          </div>

          {!name && (
            <div>
              <Link href="/login">
                <Button className="w-max h-[42px] max-h-full rounded-md bg-[#d7348b] px-[10px] text-[#ffffff]">
                  Đăng nhập
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
