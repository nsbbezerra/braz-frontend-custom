import Image from "next/image";
import Link from "next/link";
import {
  AddressBook,
  CaretDown,
  CircleNotch,
  FloppyDisk,
  House,
  IdentificationBadge,
  ImageSquare,
  Leaf,
  List,
  Phone,
  ShoppingCart,
  SignIn,
  SignOut,
  Tag,
  TShirt,
  User,
  X,
} from "phosphor-react";
import { Fragment, useContext, useEffect, useState, memo } from "react";
import * as Popover from "@radix-ui/react-popover";
import Drawer from "./Drawer";
import { CategoriesProps } from "../../types";
import CartContext from "../../context/cart/cart";
import Toast from "./Toast";
import { isAxiosError } from "axios";
import { api } from "../../configs";
import * as Dialog from "@radix-ui/react-dialog";
import ModalsContext from "../../context/modals/modals";
import Button from "./Button";
import ReactInputMask from "react-input-mask";
import * as yup from "yup";
import { useFormik } from "formik";

interface ProductProps {
  id: string;
  name: string;
}

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface ClientProps {
  id: string;
  name: string;
  document: string;
  phone: string;
  email: string;
  street: string;
  number: string;
  comp: string;
  district: string;
  cep: string;
  city: string;
  password: string;
  state: string;
}

function Header() {
  const { cart } = useContext(CartContext);
  const { modals, setModals } = useContext(ModalsContext);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [client, setClient] = useState<ClientProps | null>(null);

  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);

  async function findInformation() {
    setFetching(true);
    try {
      const { data } = await api.get("/findProductsAndCategories");
      setCategories(data.categories);
      setProducts(data.products);
      setFetching(false);
    } catch (error) {
      setFetching(false);
      if (isAxiosError(error) && error.message) {
        setToast({
          message: error.response?.data.message,
          title: "Erro",
          type: "error",
        });
        setOpenToast(true);
      }
    }
  }

  useEffect(() => {
    findInformation();
    const findClient = localStorage.getItem("client");
    if (findClient) {
      setClient(JSON.parse(findClient));
    } else {
      setClient(null);
    }
  }, []);

  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Insira um email válido")
      .required("Insira um email"),
    password: yup.string().required("Insira uma senha"),
  });

  async function Login(email: string, password: string) {
    setLoading(true);
    try {
      const { data } = await api.post("/login", {
        email,
        password,
      });
      setToast({
        type: "success",
        message: data.message,
        title: "Sucesso",
      });
      setOpenToast(true);
      setLoading(false);
      setClient(data.client);
      localStorage.setItem("client", JSON.stringify(data.client));
      setModals({
        login: false,
        register: false,
      });
      handleLogin.resetForm();
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error) && error.message) {
        setToast({
          type: "error",
          message: error.response?.data.message,
          title: "Erro",
        });
        setOpenToast(true);
      }
    }
  }

  const handleLogin = useFormik({
    validationSchema: validationLogin,
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      Login(values.email, values.password);
    },
  });

  const validationRegister = yup.object().shape({
    name: yup.string().required("Insira seu nome"),
    document: yup.string().required("Insira seu CPF"),
    phone: yup.string().required("Insira seu telefone"),
    email: yup
      .string()
      .email("Insira um email válido")
      .required("Insira seu email"),
    street: yup.string().required("Insira seu endereço"),
    number: yup.string().required("Insira seu número"),
    district: yup.string().required("Insira seu bairro"),
    cep: yup.string().required("Insira seu CEP"),
    city: yup.string().required("Insira sua cidade"),
    password: yup.string().required("Insira sua senha"),
    state: yup.string().required("Selecione seu estado"),
  });

  async function Register(values: ClientProps) {
    setLoading(true);
    try {
      const { data } = await api.post("/clients", values);

      setToast({
        type: "success",
        message: data.message,
        title: "Sucesso",
      });
      setOpenToast(true);
      setLoading(false);
      handleRegister.resetForm();
      setModals({
        login: false,
        register: false,
      });
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error) && error.message) {
        setToast({
          type: "error",
          message: error.response?.data.message,
          title: "Erro",
        });
        setOpenToast(true);
      }
    }
  }

  const handleRegister = useFormik({
    initialValues: {
      id: "",
      name: "",
      document: "",
      phone: "",
      email: "",
      street: "",
      number: "",
      comp: "",
      district: "",
      cep: "",
      city: "",
      password: "",
      state: "",
    },
    validationSchema: validationRegister,
    onSubmit: (values) => {
      Register(values);
    },
  });

  function Logout() {
    localStorage.removeItem("client");
    setClient(null);
  }

  const MenuItems = () => (
    <div className="flex items-center flex-col lg:flex-row gap-1 lg:gap-0">
      <Link href={"/"} passHref>
        <a className="menu-items">
          <House /> Início
        </a>
      </Link>
      <Link href={"/quemsomos"} passHref>
        <a className="menu-items">
          <IdentificationBadge /> Quem somos
        </a>
      </Link>
      <Popover.Root>
        <Popover.Trigger className="menu-items">
          <Tag /> Produtos <CaretDown />
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content className="Content-product lg:mt-8">
            {fetching ? (
              <div className="flex items-center justify-center p-5">
                <CircleNotch className="text-3xl animate-spin" />
              </div>
            ) : (
              <>
                {categories.length === 0 ? (
                  <div className="flex justify-center items-center flex-col gap-1">
                    <Leaf className="text-3xl" />
                    <span>Nada para mostrar</span>
                  </div>
                ) : (
                  <>
                    {categories.map((cat) => (
                      <div key={cat.id}>
                        <Link href={`/produtos/${cat.id}`} passHref>
                          <a className="menu-items-product uppercase">
                            <TShirt />
                            {cat.name}
                          </a>
                        </Link>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <Popover.Root>
        <Popover.Trigger className="menu-items">
          <ImageSquare /> Catálogos <CaretDown />
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content className="Content-product lg:mt-8">
            {fetching ? (
              <div className="flex items-center justify-center p-5">
                <CircleNotch className="text-3xl animate-spin" />
              </div>
            ) : (
              <>
                {products.length === 0 ? (
                  <div className="flex justify-center items-center flex-col gap-1">
                    <Leaf className="text-3xl" />
                    <span>Nada para mostrar</span>
                  </div>
                ) : (
                  <>
                    {products.map((cat) => (
                      <div key={cat.id}>
                        <Link href={`/produtos/catalogos/${cat.id}`} passHref>
                          <a className="menu-items-product uppercase">
                            <TShirt />
                            <span className="line-clamp-1">{cat.name}</span>
                          </a>
                        </Link>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <Link href={"/faleconosco"} passHref>
        <a className="menu-items">
          <Phone /> Fale conosco
        </a>
      </Link>
      <div>
        <Popover.Root>
          <Popover.Trigger className="menu-items-sim">
            <User /> Área do Cliente <CaretDown />
          </Popover.Trigger>
          <Popover.Anchor />
          <Popover.Portal>
            <Popover.Content className="Content-product-client mt-1">
              {!client ? (
                <>
                  <button
                    className="menu-items-product uppercase"
                    onClick={() =>
                      setModals({
                        login: true,
                        register: false,
                      })
                    }
                  >
                    <SignIn />
                    Login
                  </button>
                  <button
                    className="menu-items-product uppercase"
                    onClick={() =>
                      setModals({
                        login: false,
                        register: true,
                      })
                    }
                  >
                    <FloppyDisk />
                    Cadastre-se
                  </button>
                </>
              ) : (
                <>
                  <a className="menu-items-product uppercase">
                    <AddressBook />
                    Meus Dados
                  </a>
                  <Link
                    href={`/areadocliente/minhascompras?client=${client.id}`}
                  >
                    <a className="menu-items-product uppercase">
                      <ShoppingCart />
                      Minhas Compras
                    </a>
                  </Link>
                  <div className="h-1 border-b" />
                  <button
                    className="menu-items-product-red button-red uppercase"
                    onClick={() => Logout()}
                  >
                    <SignOut />
                    Sair
                  </button>
                </>
              )}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );

  return (
    <Fragment>
      <Toast
        title={toast.title}
        message={toast.message}
        onClose={setOpenToast}
        open={openToast}
        scheme={toast.type}
      />
      <header className="w-full sticky top-0 min-h-fit shadow-lg bg-white bg-opacity-80 backdrop-blur-sm z-20">
        <div className="container mx-auto pl-5 lg:px-5 xl:px-0 max-w-6xl flex items-center justify-between h-14">
          <Link href={"/"} passHref>
            <a className="w-[100px] flex">
              <Image
                src="/img/logo.svg"
                width={115}
                height={50}
                alt="Braz Multimídia"
              />
            </a>
          </Link>

          <div className="hidden lg:flex">
            <MenuItems />
            <button
              className="w-14 h-14 bg-marinho-500 text-white flex justify-center items-center text-3xl relative hover:bg-marinho-700 active:bg-marinho-500"
              onClick={() => setOpenCart(!openCart)}
            >
              <ShoppingCart />
              <span className="w-5 h-5 bg-white text-marinho-500 flex items-center justify-center text-xs rounded-full absolute top-2 right-2">
                {cart.length}
              </span>
            </button>
          </div>
          <div className="flex lg:hidden">
            <Popover.Root>
              <Popover.Trigger className="w-14 h-14 text-marinho-500 flex justify-center items-center text-3xl">
                <List />
              </Popover.Trigger>
              <Popover.Anchor />
              <Popover.Portal>
                <Popover.Content className="Content">
                  <MenuItems />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            <button
              className="w-14 h-14 bg-marinho-500 text-white flex justify-center items-center text-2xl relative hover:bg-marinho-700 active:bg-marinho-500"
              onClick={() => setOpenCart(!openCart)}
            >
              <ShoppingCart />
              <span className="w-5 h-5 bg-white text-marinho-500 flex items-center justify-center text-xs rounded-full absolute top-2 right-2">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      <Drawer isOpen={openCart} items={cart || []} onClose={setOpenCart} />

      <Dialog.Root
        onOpenChange={() =>
          setModals({
            login: false,
            register: false,
          })
        }
        open={modals.login}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="dialog-content p-2">
            <div className="dialog-body max-w-sm">
              <div>
                <div className="py-3 px-4 flex justify-between items-center border-b">
                  <span className="font-bold text-xl">LOGIN</span>
                  <Dialog.Close className="bg-sky-700 hover:bg-sky-800 rounded-full w-7 h-7 flex items-center justify-center active:bg-sky-700 z-10 text-white">
                    <X />
                  </Dialog.Close>
                </div>

                <form onSubmit={handleLogin.handleSubmit}>
                  <div className="p-4">
                    <label htmlFor="email" className="block">
                      Seu email <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="email"
                      id="email"
                      className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full"
                      autoFocus
                      value={handleLogin.values.email}
                      onChange={handleLogin.handleChange}
                    />
                    {handleLogin.touched.email &&
                    Boolean(handleLogin.errors.email) ? (
                      <span className="text-sm text-red-600">
                        {handleLogin.touched.email && handleLogin.errors.email}
                      </span>
                    ) : (
                      ""
                    )}

                    <label htmlFor="password" className="block mt-3">
                      Sua senha <span className="text-red-600">*</span>
                    </label>
                    <input
                      className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full"
                      type={"password"}
                      id="password"
                      name="password"
                      value={handleLogin.values.password}
                      onChange={handleLogin.handleChange}
                    />
                    {handleLogin.touched.password &&
                    Boolean(handleLogin.errors.password) ? (
                      <span className="text-sm text-red-600">
                        {handleLogin.touched.password &&
                          handleLogin.errors.password}
                      </span>
                    ) : (
                      ""
                    )}

                    <a className="mb-4 hover:underline block mt-2 cursor-pointer w-fit text-orange-500 font-semibold">
                      Esqueci minha senha
                    </a>

                    <Button
                      isFullSize
                      buttonSize="lg"
                      type="submit"
                      isLoading={loading}
                    >
                      <SignIn />
                      Login
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root
        onOpenChange={() =>
          setModals({
            login: false,
            register: false,
          })
        }
        open={modals.register}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="dialog-content p-2">
            <div className="dialog-body max-w-2xl">
              <div>
                <div className="py-3 px-4 flex justify-between items-center border-b sticky top-0 bg-white">
                  <span className="font-bold text-xl">CADASTRO</span>
                  <Dialog.Close className="bg-sky-700 hover:bg-sky-800 rounded-full w-7 h-7 flex items-center justify-center active:bg-sky-700 z-10 text-white">
                    <X />
                  </Dialog.Close>
                </div>

                <form onSubmit={handleRegister.handleSubmit}>
                  <div className="px-6 py-4">
                    <label htmlFor="name" className="block">
                      Nome <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full"
                      autoFocus
                      value={handleRegister.values.name}
                      onChange={handleRegister.handleChange}
                    />
                    {handleRegister.touched.name &&
                    Boolean(handleRegister.errors.name) ? (
                      <span className="text-sm text-red-600">
                        {handleRegister.touched.name &&
                          handleRegister.errors.name}
                      </span>
                    ) : (
                      ""
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label htmlFor="document" className="block mt-3">
                          CPF <span className="text-red-600">*</span>
                        </label>
                        <ReactInputMask
                          id="document"
                          mask={"999.999.999-99"}
                          name="document"
                          className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full mb-4"
                          value={handleRegister.values.document}
                          onChange={handleRegister.handleChange}
                        />
                        {handleRegister.touched.document &&
                        Boolean(handleRegister.errors.document) ? (
                          <span className="text-sm text-red-600">
                            {handleRegister.touched.document &&
                              handleRegister.errors.document}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block mt-3">
                          Email <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full mb-4"
                          value={handleRegister.values.email}
                          onChange={handleRegister.handleChange}
                        />
                        {handleRegister.touched.email &&
                        Boolean(handleRegister.errors.email) ? (
                          <span className="text-sm text-red-600">
                            {handleRegister.touched.email &&
                              handleRegister.errors.email}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block mt-3">
                          Telefone <span className="text-red-600">*</span>
                        </label>
                        <ReactInputMask
                          mask={"(99) 99999-9999"}
                          id="phone"
                          name="phone"
                          className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full mb-4"
                          value={handleRegister.values.phone}
                          onChange={handleRegister.handleChange}
                        />
                        {handleRegister.touched.phone &&
                        Boolean(handleRegister.errors.phone) ? (
                          <span className="text-sm text-red-600">
                            {handleRegister.touched.phone &&
                              handleRegister.errors.phone}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <label htmlFor="password" className="block">
                      Senha de usuário <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="password"
                      className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full mb-3"
                      type="password"
                      name="password"
                      value={handleRegister.values.password}
                      onChange={handleRegister.handleChange}
                    />
                    {handleRegister.touched.password &&
                    Boolean(handleRegister.errors.password) ? (
                      <span className="text-sm text-red-600">
                        {handleRegister.touched.password &&
                          handleRegister.errors.password}
                      </span>
                    ) : (
                      ""
                    )}

                    <div className="grid grid-cols-4 gap-3">
                      <div className="col-span-3">
                        <label htmlFor="street" className="block">
                          Rua <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="street"
                          name="street"
                          className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full mb-4"
                          value={handleRegister.values.street}
                          onChange={handleRegister.handleChange}
                        />
                        {handleRegister.touched.street &&
                        Boolean(handleRegister.errors.street) ? (
                          <span className="text-sm text-red-600">
                            {handleRegister.touched.street &&
                              handleRegister.errors.street}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <label htmlFor="number" className="block">
                          Número <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="number"
                          name="number"
                          className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full mb-4"
                          value={handleRegister.values.number}
                          onChange={handleRegister.handleChange}
                        />
                        {handleRegister.touched.number &&
                        Boolean(handleRegister.errors.number) ? (
                          <span className="text-sm text-red-600">
                            {handleRegister.touched.number &&
                              handleRegister.errors.number}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="comp" className="block">
                          Complemento
                        </label>
                        <input
                          id="comp"
                          name="comp"
                          className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full mb-4"
                          value={handleRegister.values.comp}
                          onChange={handleRegister.handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="district" className="block">
                          Bairro <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="district"
                          name="district"
                          className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full mb-4"
                          value={handleRegister.values.district}
                          onChange={handleRegister.handleChange}
                        />
                        {handleRegister.touched.district &&
                        Boolean(handleRegister.errors.district) ? (
                          <span className="text-sm text-red-600">
                            {handleRegister.touched.district &&
                              handleRegister.errors.district}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label htmlFor="cep" className="block">
                          CEP <span className="text-red-600">*</span>
                        </label>
                        <ReactInputMask
                          mask={"99.999-999"}
                          id="cep"
                          name="cep"
                          className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full mb-4"
                          value={handleRegister.values.cep}
                          onChange={handleRegister.handleChange}
                        />
                        {handleRegister.touched.cep &&
                        Boolean(handleRegister.errors.cep) ? (
                          <span className="text-sm text-red-600">
                            {handleRegister.touched.cep &&
                              handleRegister.errors.cep}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <label htmlFor="city" className="block">
                          Cidade <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="city"
                          name="city"
                          className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full mb-4"
                          value={handleRegister.values.city}
                          onChange={handleRegister.handleChange}
                        />
                        {handleRegister.touched.city &&
                        Boolean(handleRegister.errors.city) ? (
                          <span className="text-sm text-red-600">
                            {handleRegister.touched.city &&
                              handleRegister.errors.city}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <label htmlFor="state" className="block">
                          Estado <span className="text-red-600">*</span>
                        </label>
                        <select
                          id="state"
                          name="state"
                          className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full mb-4"
                          value={handleRegister.values.cep}
                          onChange={handleRegister.handleChange}
                        >
                          <option value="AC">AC</option>
                          <option value="AL">AL</option>
                          <option value="AP">AP</option>
                          <option value="AM">AM</option>
                          <option value="BA">BA</option>
                          <option value="CE">CE</option>
                          <option value="DF">DF</option>
                          <option value="ES">ES</option>
                          <option value="GO">GO</option>
                          <option value="MA">MA</option>
                          <option value="MT">MT</option>
                          <option value="MS">MS</option>
                          <option value="MG">MG</option>
                          <option value="PA">PA</option>
                          <option value="PB">PB</option>
                          <option value="PR">PR</option>
                          <option value="PE">PE</option>
                          <option value="PI">PI</option>
                          <option value="RJ">RJ</option>
                          <option value="RN">RN</option>
                          <option value="RS">RS</option>
                          <option value="RO">RO</option>
                          <option value="RR">RR</option>
                          <option value="SC">SC</option>
                          <option value="SP">SP</option>
                          <option value="SE">SE</option>
                          <option value="TO">TO</option>
                        </select>
                        {handleRegister.touched.state &&
                        Boolean(handleRegister.errors.state) ? (
                          <span className="text-sm text-red-600">
                            {handleRegister.touched.state &&
                              handleRegister.errors.state}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <Button buttonSize="lg" type="submit" isLoading={loading}>
                      <FloppyDisk />
                      Cadastrar
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Fragment>
  );
}

export default memo(Header);
