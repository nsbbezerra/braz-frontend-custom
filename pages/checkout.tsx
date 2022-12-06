import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { FloppyDisk, Leaf, ShoppingCart, SignIn, Trash } from "phosphor-react";
import { Fragment, useContext, useEffect, useState } from "react";
import Button from "../components/layout/Button";
import Footer from "../components/layout/Footer";
import HeadApp from "../components/layout/Head";
import Header from "../components/layout/Header";
import Toast from "../components/layout/Toast";
import CartContext from "../context/cart/cart";
import { BannersProps } from "../types";
import { api, configs } from "../configs";
import ModalsContext from "../context/modals/modals";
import { useRouter } from "next/router";

interface Props {
  banner: BannersProps | null;
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

const Checkout: NextPage<Props> = ({ banner }) => {
  const { push } = useRouter();
  const { modals, setModals } = useContext(ModalsContext);
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState<number>(0);
  const calcPrice = (price: number) => {
    return parseFloat(String(price)).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  const [information, setInformation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [client, setClient] = useState<ClientProps | null>(null);

  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);

  const removeFromCart = (id: string) => {
    const result = cart.filter((obj) => obj.id !== id);
    setCart(result);
  };

  function findClientInfo() {
    const findClient = localStorage.getItem("client");
    if (findClient) {
      setClient(JSON.parse(findClient));
    } else {
      setClient(null);
    }
  }

  useEffect(() => {
    findClientInfo();
  }, [modals]);

  useEffect(() => {
    findClientInfo();
  }, []);

  useEffect(() => {
    const sum = cart.reduce((a, b) => +a + +b.total, 0);
    setTotal(sum);
  }, [cart]);

  async function CreateOrder() {
    setLoading(true);

    try {
      const items = cart.map((cart) => {
        return {
          productId: cart.product,
          sizeId: cart.sizeId,
          quantity: cart.quantity,
          total: cart.total,
          thumbnail: cart.thumbnail,
          name: cart.name,
          unity: cart.unity,
        };
      });
      const order = {
        clientId: client?.id,
        orderStatus: "payment",
        paymentStatus: "waiting",
        observation: information,
        total: total,
      };
      const response = await api.post("/order", {
        order,
        items,
      });
      setToast({
        type: "success",
        message: response.data.message,
        title: "Sucesso",
      });
      setOpenToast(true);
      setLoading(false);
      setCart([]);
      push(response.data.url);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.message) {
        setToast({
          type: "error",
          message: error.response?.data.message,
          title: "Error",
        });
        setOpenToast(true);
      }
    }
  }

  return (
    <Fragment>
      <Toast
        title={toast.title}
        message={toast.message}
        onClose={setOpenToast}
        open={openToast}
        scheme={toast.type}
      />
      <HeadApp title={`Checkout | ${configs.companyName}`} />
      <Header />
      {!banner ? (
        ""
      ) : (
        <>
          <div className="w-full relative">
            <Image
              src={banner.banner}
              width={1920}
              height={461}
              alt="Braz Multimidia banner"
              layout="responsive"
            />
          </div>
        </>
      )}

      <section className="mt-10 container mx-auto px-5 xl:px-0 max-w-3xl">
        <div className="flex gap-3 heading text-marinho-500 items-center border-b border-b-marinho-500">
          <ShoppingCart />
          MEU CARRINHO
        </div>

        {cart.length === 0 ? (
          <div className="flex justify-center items-center flex-col gap-1 mt-10">
            <Leaf className="text-6xl animate-bounce" />
            <span>Nada para mostrar</span>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 divide-y border rounded-md px-3 shadow">
            {cart.map((car) => (
              <div
                className="grid grid-cols-[80px_1fr] gap-5 items-start py-5"
                key={car.id}
              >
                <div className="w-full">
                  <Image
                    src={car.thumbnail}
                    width={600}
                    height={600}
                    layout="responsive"
                    alt={configs.companyName}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <strong>{car.name}</strong>
                    <span>{calcPrice(car.total)}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p>{car.size}</p>
                      <p>Categoria: {car.category}</p>
                      <span className="flex items-center gap-5">
                        QTD: {car.quantity}
                      </span>
                    </div>
                    <Button
                      buttonSize="sm"
                      scheme="error"
                      variant="outline"
                      onClick={() => removeFromCart(car.id)}
                    >
                      <Trash />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-gray-50 rounded-md py-3 px-5 mt-5 shadow">
          {!client ? (
            <>
              <h3 className="text-xl mb-2">
                Não encontramos seus dados, escolha uma opção abaixo:
              </h3>
              <div className="grid grid-cols-2 divide-x">
                <div className="pr-3">
                  <Button
                    buttonSize="lg"
                    isFullSize
                    onClick={() =>
                      setModals({
                        login: true,
                        register: false,
                      })
                    }
                  >
                    <SignIn /> Login
                  </Button>
                </div>
                <div className="pl-3">
                  <Button
                    buttonSize="lg"
                    isFullSize
                    scheme="warning"
                    onClick={() =>
                      setModals({
                        login: false,
                        register: true,
                      })
                    }
                  >
                    <FloppyDisk /> Cadastre-se
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <span className="text-2xl font-bold">Meus Dados</span>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label htmlFor="name" className="block">
                    Seu nome <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full"
                    value={client.name}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block">
                    Seu telefone <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="phone"
                    className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full"
                    value={client.phone}
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-3 mt-1">
                <div>
                  <label htmlFor="email" className="block">
                    Seu email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full"
                    value={client.email}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block">
                    Sua cidade <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="city"
                    className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full"
                    value={client.city}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block">
                    Estado <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="state"
                    className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full"
                    value={client.state}
                    readOnly
                  />
                </div>
              </div>
              <div className="mt-1">
                <label htmlFor="state" className="block">
                  Informações Adicionais
                </label>
                <textarea
                  id="state"
                  className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full resize-none"
                  rows={4}
                  value={information}
                  onChange={(e) => setInformation(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <div className="bg-gray-50 rounded-md py-3 px-5 mt-5 mb-10 shadow">
          <div className="grid grid-cols-1">
            <div className="flex justify-between py-2 items-center font-bold font-serif text-2xl px-5">
              <span>Total</span>
              <span>{calcPrice(total)}</span>
            </div>
            <div className="py-1">
              <Button
                buttonSize="lg"
                isFullSize
                isLoading={loading}
                isDisabled={!client || cart.length === 0}
                onClick={() => CreateOrder()}
              >
                <ShoppingCart /> Finalizar Compra
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </Fragment>
  );
};

export default Checkout;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("/fromCartPageBanner");

  return {
    props: {
      banner: data || null,
    },
    revalidate: 120,
  };
};
