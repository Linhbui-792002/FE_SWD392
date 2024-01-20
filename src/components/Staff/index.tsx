import React from 'react'
import { Table, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

const Staff = () => {

    const [openedAddBook, { open: openAddBook, close: closeAddBook }] = useDisclosure(false);
    const [openedEditBook, { open: openEditBook, close: closeEditBook }] = useDisclosure(false);
    const [openedDeleteBook, { open: openDeleteBook, close: closeDeleteBook }] = useDisclosure(false);


    const rows = elements.map((element: any) => (
        <Table.Tr key={element.name} className="border-b-2 border-[#000000]">
            <Table.Td>{element.position}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.symbol}</Table.Td>
            <Table.Td>{element.mass}</Table.Td>
            <Table.Td>{element.mass}</Table.Td>
            <Table.Td className="flex gap-4">
                <Button onClick={openEditBook} className="bg-[#8c9aac]">
                    Chỉnh sửa
                </Button>
                <Button onClick={openDeleteBook} className="bg-[#db0e0e]">
                    Xóa
                </Button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div className="w-full h-full">
            <div className="w-[80%] mx-[auto] mt-[30px]">
                <div className="flex justify-between text-2xl">Staff Manager
                    <Button onClick={openAddBook} className="bg-[#066cee]">
                        Thêm Sách
                    </Button>
                </div>
                <div className="flex justify-between text-xl">
                    Danh Sách: Sách trong cửa hàng
                </div>
                <div className="w-full">
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Ảnh</Table.Th>
                                <Table.Th>Tên Sách</Table.Th>
                                <Table.Th>Giá tiền</Table.Th>
                                <Table.Th>Số lượng</Table.Th>
                                <Table.Th>Tác giả</Table.Th>
                                <Table.Th>Hành động</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </div>
            </div>

            <Modal size="40%" opened={openedAddBook} onClose={closeAddBook} title="Thêm Sách">
                <form>
                    <TextInput
                        className="w-full"
                        label="Tên sách"
                        mt="md"
                        placeholder="Nhập tên sách" />

                    <TextInput className="w-full"
                        label="Tên tác giả"
                        mt="md"
                        placeholder="Nhập tác giả" />

                    <TextInput className="w-full"
                        label="Giá sách"
                        mt="md"
                        placeholder="Nhập giá sách" />

                    <TextInput className="w-full"
                        label="Số lượng sách"
                        mt="md"
                        placeholder="Nhập số lượng sách" />

                    <Button className="bg-[#08c546] float-end my-5">Thêm mới</Button>
                </form>
            </Modal>
            <Modal size="40%" opened={openedEditBook} onClose={closeEditBook} title="Chỉnh Sửa Sách">
                <form>
                    <TextInput
                        className="w-full"
                        label="Tên sách"
                        mt="md"
                        placeholder="Nhập tên sách" />

                    <TextInput className="w-full"
                        label="Tên tác giả"
                        mt="md"
                        placeholder="Nhập tác giả" />

                    <TextInput className="w-full"
                        label="Giá sách"
                        mt="md"
                        placeholder="Nhập giá sách" />

                    <TextInput className="w-full"
                        label="Số lượng sách"
                        mt="md"
                        placeholder="Nhập số lượng sách" />

                    <Button className="bg-[#08c546] float-end my-5">Thêm mới</Button>
                </form>
            </Modal>
            <Modal opened={openedDeleteBook} onClose={closeDeleteBook} title="Xóa Sách">
                <div>Bạn có muốn xóa sách :</div>
                <Button className="bg-[#db0e0e] float-end my-5">Xóa</Button>

            </Modal>

        </div>
    )
}

export default Staff