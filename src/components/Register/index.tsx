import { Select, TextInput } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useAddUsersMutation } from "@src/redux/endPoint/accounts";
const Register = () => {
  const [creatCustomer] = useAddUsersMutation();
  const router = useRouter();
  const {
    control,
    register,
    formState: { errors },
    handleSubmit: handleSubmitLogin,
    reset,
    setValue,
  } = useForm();

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
          },
        };
        const res = await creatCustomer(dataSubmit).unwrap();
        localStorage.setItem("user", JSON.stringify(res.data));
        router.push("/login");
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
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <section className="w-[50%]">
        <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full p-6">
              <h1 className="pb-6 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Tạo Tài Khoản Của Bạn
              </h1>
              <form
                onSubmit={handleSubmitLogin(onSubmit)}
                className="w-full grid grid-cols-12 gap-4"
              >
                <div className="col-span-6">
                  <TextInput
                    className="w-full"
                    label="Email"
                    mt="md"
                    placeholder="Nhập Email"
                    required
                    {...register("email", {
                      required: "Không được để trống ",
                    })}
                  />
                  <TextInput
                    className="w-full"
                    label="Số điện thoại"
                    mt="md"
                    placeholder="Nhập số điện thoại"
                    required
                    {...register("phone", {
                      required: "Không được để trống ",
                    })}
                  />
                  <TextInput
                    className="w-full"
                    label="Họ của bạn"
                    mt="md"
                    placeholder="Nhập họ"
                    required
                    {...register("firstname", {
                      required: "Không được để trống ",
                    })}
                  />
                  <TextInput
                    className="w-full"
                    label="Tên đệm"
                    mt="md"
                    placeholder="Nhập tên đệm"
                    required
                    {...register("middname", {
                      required: "Không được để trống ",
                    })}
                  />
                  <TextInput
                    className="w-full"
                    label="Tên của bạn"
                    mt="md"
                    placeholder="Nhập tên"
                    required
                    {...register("lastname", {
                      required: "Không được để trống ",
                    })}
                  />
                </div>
                <div className="col-span-6">
                  <TextInput
                    className="w-full"
                    label="Tên Đường"
                    mt="md"
                    placeholder="Nhập tên đường"
                    required
                    {...register("street", {
                      required: "Không được để trống ",
                    })}
                  />
                  <TextInput
                    className="w-full"
                    label="Tên thành phố"
                    mt="md"
                    placeholder="Nhập tên thành phố"
                    required
                    {...register("city", {
                      required: "Không được để trống ",
                    })}
                  />
                  <TextInput
                    className="w-full"
                    label="Tên tài khoản"
                    mt="md"
                    placeholder="Nhập tên tài khoản"
                    required
                    {...register("username", {
                      required: "Không được để trống ",
                    })}
                  />
                  <TextInput
                    className="w-full"
                    label="Mật khẩu"
                    mt="md"
                    placeholder="Nhập mật khẩu"
                    required
                    {...register("password", {
                      required: "Không được để trống ",
                    })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full col-span-12 text-white bg-[#d7348b] hover:bg-[#f83da0] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Đăng Ký
                </button>
                <p className="col-span-12 text-sm font-light text-gray-500 dark:text-gray-400">
                  Bạn đã có tài khoản?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Đăng Nhập
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
