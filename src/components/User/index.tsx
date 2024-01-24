import React, { use, useEffect, useState } from "react";
import { Button, Modal, Table, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  useAddBookMutation,
  useGetListBookQuery,
  useGetOneBookQuery,
  useDeleteOneBookMutation,
} from "@src/redux/endPoint/book";
import { useGetListUserQuery } from "@src/redux/endPoint/accounts";

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
  const initData = {
    name: "",
    author: "",
    price: 0,
    stock_quantity: 0,
  };

  const [formData, setFormData] = useState<IUser>({});

  const [openedAddBook, { open: openAddBook, close: closeAddBook }] =
    useDisclosure(false);
  const [openedEditBook, { open: openEditBook, close: closeEditBook }] =
    useDisclosure(false);
  const [openedDeleteBook, { open: openDeleteBook, close: closeDeleteBook }] =
    useDisclosure(false);
  const [params, setParams] = useState({});
  const [dataTable, setDataTable] = useState<IUser[]>([]);
  const [id, setId] = useState<string>("");
  const { data } = useGetListUserQuery(params);
  console.log(data);

  // const { data: dataBook } = useGetOneBookQuery(id);

  const [deleteOneBook] = useDeleteOneBookMutation();
  // console.log("dataById", dataById);

  // useEffect(() => {
  //   if (data) {
  //     setDataTable(data);
  //   }
  // }, [params]);

  // console.log("dataTable", dataTable);

  useEffect(() => {}, [id]);

  const [createBook] = useAddBookMutation();
  const addNewBook = async () => {
    const res = await createBook(formData).unwrap();
    if (res) {
      console.log(res);
      closeAddBook();
    }
  };

  const handleInputChange = (fieldName: string, value: string | number) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
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
    const res = await deleteOneBook(String(id));
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
    <div className="w-full h-full">
      <div className="w-[80%] mx-[auto] mt-[30px]">
        <div className="flex justify-between text-2xl">
          User Manager
          <Button onClick={openAddBook} className="bg-[#066cee]">
            Thêm Sách
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
        title="Thêm Sách"
      >
        <form onSubmit={addNewBook}>
          <TextInput
            className="w-full"
            label="Tên sách"
            mt="md"
            placeholder="Nhập tên sách"
            // value={formData.name}
            onChange={(event) => handleInputChange("name", event.target.value)}
          />

          <TextInput
            className="w-full"
            label="Tên tác giả"
            mt="md"
            placeholder="Nhập tác giả"
            // value={formData.author}
            onChange={(event) =>
              handleInputChange("author", event.target.value)
            }
          />

          <TextInput
            className="w-full"
            label="Giá sách"
            mt="md"
            placeholder="Nhập giá sách"
            type="number"
            // value={formData.price}
            onChange={(event) =>
              handleInputChange("price", +event.target.value)
            }
          />

          <TextInput
            className="w-full"
            label="Số lượng sách"
            mt="md"
            placeholder="Nhập số lượng sách"
            type="number"
            // value={formData.stock_quantity}
            onChange={(event) =>
              handleInputChange("stock_quantity", +event.target.value)
            }
          />

          <Button className="bg-[#08c546] float-end my-5" onClick={addNewBook}>
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
