import React, { use, useEffect, useState } from "react";
import { Button, Modal, Select, Table, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  useAddUsersMutation,
  useDeleteOneUsersMutation,
  useGetListUserQuery,
} from "@src/redux/endPoint/accounts";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";

interface IUser {
  _id?: string;
  fullname: {
    lastname: string;
    firstname: string;
    midname: string;
  };
  phone: number;
  email: string;
}

const User = () => {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit: handleAddNewUser,
    reset,
    setValue,
  } = useForm();

  const [openedAddBook, { open: openAddBook, close: closeAddBook }] =
    useDisclosure(false);
  const [openedEditBook, { open: openEditBook, close: closeEditBook }] =
    useDisclosure(false);
  const [openedDeleteBook, { open: openDeleteBook, close: closeDeleteBook }] =
    useDisclosure(false);
  const [params, setParams] = useState({});
  const [dataTable, setDataTable] = useState<IUser[]>([]);
  const [id, setId] = useState<string>("");
  const [role, setRole] = useState<string | null>("");

  const { data } = useGetListUserQuery(params);
  // const { data: dataBook } = useGetOneBookQuery(id);

  const [deleteUser] = useDeleteOneUsersMutation();
  const [createUser] = useAddUsersMutation();

  // console.log("dataById", dataById);

  // useEffect(() => {
  //   if (data) {
  //     setDataTable(data);
  //   }
  // }, [params]);

  // console.log("dataTable", dataTable);

  useEffect(() => {}, [id]);
  const onSubmit = async (data: any) => {
    try {
      if (data) {
        const dataSubmit = {
          phone: data.phone,
          email: data.email,
          fullname: {
            lastname: data.lastname,
            middname: data.middname,
            firstname: data.firstname,
          },
          addresses: [
            {
              street: data.street,
              city: data.city,
            },
          ],
          account: {
            username: data.username,
            password: data.password,
            role: role,
          },
        };
        const res = await createUser(dataSubmit).unwrap();
        notifications.show({
          title: "Thành công",
          color: "#06d6a0",
          autoClose: 2000,
          message: "Tạo tài khoản thành công",
        });
      }
    } catch (error: any) {
      notifications.show({
        title: "Lỗi",
        color: "#ef476f",
        autoClose: 2000,
        message: "Tạo tài khoản không thành công",
      });
    }
  };

  const handleEditBook = async (id: string) => {
    Array.from(String(id)).length !== 24
      ? setId("65ab94f5cf9299efdd33d089")
      : setId(id);
    openEditBook();
  };

  const handleDeleteBook = async (id: string) => {
    setId(id);
    openDeleteBook();
  };

  const deleteBook = async () => {
    const res = await deleteUser(id);
    if (res) {
      console.log(res);
      closeDeleteBook();
    }
  };

  const rows = data?.map((element: IUser) => (
    <Table.Tr key={element._id} className="border-b-2 border-blue-300 ">
      <Table.Td>{element._id}</Table.Td>
      <Table.Td>
        {element.fullname.firstname + " " + element.fullname.lastname}
      </Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.phone}</Table.Td>
      <Table.Td className="text-right">
        <Button
          onClick={() => handleEditBook(element._id as string)}
          className="bg-[#8c9aac] mr-1"
        >
          Chỉnh sửa
        </Button>
        <Button
          onClick={() => handleDeleteBook(element._id as string)}
          className="bg-[#db0e0e]"
        >
          Xóa
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (  
    <div className="w-full h-full ">
      <div className="w-[80%] min-h-[80vh] mx-[auto] mt-[30px]">
        <div className="flex justify-between text-2xl">
          User Manager
          <Button onClick={openAddBook} className="bg-[#066cee]">
            Thêm User
          </Button>
        </div>
        <div className="flex justify-between text-xl">
          Danh Sách: User hệ thống
        </div>
        <div className="w-full p-4">
          <Table className="w-full">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Họ tên</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>SĐT</Table.Th>
                <Table.Th className="text-right">Hành động</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </div>
      <Modal
        size="40%"
        opened={openedAddBook}
        onClose={closeAddBook}
        title="Thêm User"
      >
        <form onSubmit={handleAddNewUser(onSubmit)}>
          <TextInput
            className="w-full"
            label="Tên"
            mt="md"
            placeholder="Nhập tên"
            {...register("firstname", {
              required: "Không được để trống ",
            })}
          />
          <TextInput
            className="w-full"
            label="Họ"
            mt="md"
            placeholder="Nhập họ"
            {...register("lastname", {
              required: "Không được để trống ",
            })}
          />
          <TextInput
            className="w-full"
            label="Tên đệm"
            mt="md"
            placeholder="Nhập tên đệm"
            {...register("middname", {
              required: "Không được để trống ",
            })}
          />

          <TextInput
            className="w-full"
            label="Số điện thoại"
            mt="md"
            placeholder="Nhập số điện thoại"
            type="number"
            {...register("phone", {
              required: "Không được để trống ",
            })}
          />

          <TextInput
            className="w-full"
            label="Email"
            mt="md"
            placeholder="Nhập email"
            {...register("email", {
              required: "Không được để trống ",
            })}
          />

          <TextInput
            className="w-full"
            label="Đường"
            mt="md"
            placeholder="Nhập tên đường"
            {...register("street", {
              required: "Không được để trống ",
            })}
          />

          <TextInput
            className="w-full"
            label="Thành phố"
            mt="md"
            placeholder="Nhập tên thành phố"
            {...register("city", {
              required: "Không được để trống ",
            })}
          />

          <TextInput
            className="w-full"
            label="Tên tài khoản"
            mt="md"
            placeholder="Nhập tài khoản"
            {...register("username", {
              required: "Không được để trống ",
            })}
          />

          <TextInput
            className="w-full"
            label="Mật khẩu"
            mt="md"
            placeholder="Nhập mật khẩu"
            {...register("password", {
              required: "Không được để trống ",
            })}
          />
          <Select
            label="Quyền"
            placeholder="Chọn quyền"
            searchable
            data={["CUSTOMER", "STAFF"]}
            value={role}
            onChange={setRole}
          />

          <Button type="submit" className="bg-[#08c546] float-end my-5">
            Thêm mới
          </Button>
        </form>
      </Modal>

      <Modal
        size="40%"
        opened={openedEditBook}
        onClose={closeEditBook}
        title="Chỉnh Sửa Sách"
      >
        <form>
          <TextInput
            className="w-full"
            label="Tên sách"
            mt="md"
            placeholder="Nhập tên sách"
          />

          <TextInput
            className="w-full"
            label="Tên tác giả"
            mt="md"
            placeholder="Nhập tác giả"
          />

          <TextInput
            className="w-full"
            label="Giá sách"
            mt="md"
            placeholder="Nhập giá sách"
          />

          <TextInput
            className="w-full"
            label="Số lượng sách"
            mt="md"
            placeholder="Nhập số lượng sách"
          />

          <Button className="bg-[#08c546] float-end my-5">Thêm mới</Button>
        </form>
      </Modal>

      <Modal
        opened={openedDeleteBook}
        onClose={closeDeleteBook}
        title="Xóa Sách"
      >
        <div>Bạn có muốn xóa sách : {id}</div>
        <Button className="bg-[#db0e0e] float-end my-5" onClick={deleteBook}>
          Xóa
        </Button>
      </Modal>
    </div>
  );
};

export default User;
