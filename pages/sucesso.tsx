import {
  CircleNotch,
  CircleWavyCheck,
  Copy,
  House,
  ShoppingBag,
  WhatsappLogo,
} from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import HeadApp from "../components/layout/Head";
import Header from "../components/layout/Header";
import { useRouter } from "next/router";
import Link from "next/link";
import { api, configs } from "../configs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Toast from "../components/layout/Toast";
import Button from "../components/layout/Button";
import Image from "next/image";
import axios from "axios";

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

type ClientProps = {
  id: string;
  name: string;
};

type CategoryProps = {
  id: string;
  name: string;
};

type ProductProps = {
  id: string;
  name: string;
  thumbnail: string;
  category: CategoryProps;
};

type SizeProps = {
  id: string;
  size: string;
};

type OrderItemsProps = {
  id: string;
  quantity: number;
  product: ProductProps;
  size: SizeProps;
  total: number;
};

interface OrderProps {
  id: string;
  checkoutId?: string;
  createdAt: Date;
  client: ClientProps;
  observation: string;
  orderStatus:
    | "payment"
    | "design"
    | "production"
    | "packing"
    | "shipping"
    | "finish";
  paymentStatus: "waiting" | "paidOut" | "refused" | "cancel";
  OrderItems: OrderItemsProps[];
  total: number;
}

type PaymentStatusProps = {
  status: "paid" | "unpaid" | "no_payment_required";
};

export default function Sucesso() {
  const { query } = useRouter();
  const { order, status } = query;

  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [myOrder, setMyOrder] = useState<OrderProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusProps>({
    status: "no_payment_required",
  });

  async function findOrderInformation(id: string) {
    setLoading(true);
    try {
      const { data } = await api.get(`/order/${id}`);
      setMyOrder(data.order);
      setPaymentStatus({
        status: data.paymentStatus,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.message) {
        setToast({
          type: "error",
          message: error.response?.data.message,
          title: "Erro",
        });
        setOpenToast(true);
      }
    }
  }

  useEffect(() => {
    if (order) {
      findOrderInformation(String(order));
    }
  }, [order]);

  function formateDate(date: Date) {
    const initialDate = new Date(date);
    const day = initialDate.getDate();
    const month = initialDate.toLocaleString("pt-br", { month: "long" });
    const year = initialDate.getFullYear();

    return `${day} de ${month} de ${year}`;
  }

  const calcPrice = (price: number) => {
    return parseFloat(String(price)).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <Fragment>
      <Toast
        title={toast.title}
        message={toast.message}
        onClose={setOpenToast}
        open={openToast}
        scheme={toast.type}
      />
      <HeadApp title={configs.companyName} />
      <Header />
      <div className="bg-gradient-to-b h-52 from-green-400 to-green-700 flex justify-center items-center flex-col px-5 text-white text-center">
        <CircleWavyCheck className="text-7xl" />
        <strong className="text-3xl mt-2">PEDIDO FINALIZADO COM SUCESO!</strong>
      </div>

      <div className="container mx-auto px-5 xl:px-0 max-w-3xl mt-10 mb-10">
        {status === "completo" && (
          <>
            {loading ? (
              <div className="p-10 flex justify-center items-center">
                <CircleNotch className="text-6xl animate-spin" />
              </div>
            ) : (
              <>
                {order && (
                  <div className="rounded-md border shadow overflow-hidden">
                    <div className="flex justify-center items-center bg-zinc-50 p-2">
                      <div className="w-52">
                        <Image
                          src="/img/logo.svg"
                          width={115}
                          height={50}
                          alt={configs.companyName}
                          layout="responsive"
                        />
                      </div>
                    </div>

                    <div className="p-4">
                      <h1 className="text-xl font-semibold">
                        Olá {myOrder?.client.name},
                      </h1>
                      <span className="block mb-3">
                        Seu pedido foi confirmado e estamos iniciando a
                        preparação, avisaremos quando cada etapa for concluída,
                        você pode acompanhar o status também aqui pelo site na
                        seção <strong>Minhas Compras</strong> na Área do
                        Cliente.
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 sm:divide-x border-y py-3 mb-3">
                        <div className="flex flex-col">
                          <span className="text-zinc-600">Data:</span>
                          <span className="font-semibold">
                            {formateDate(myOrder?.createdAt as Date)}
                          </span>
                        </div>
                        <div className="flex flex-col sm:pl-4">
                          <span className="text-zinc-600">Identificação:</span>
                          <span className="font-semibold">{myOrder?.id}</span>
                        </div>
                        <div className="flex flex-col sm:pl-4">
                          <span className="text-zinc-600">Pagamento:</span>
                          <span
                            className={`font-semibold ${
                              (paymentStatus.status === "no_payment_required" &&
                                "text-zinc-900") ||
                              (paymentStatus.status === "unpaid" &&
                                "text-red-600") ||
                              (paymentStatus.status === "paid" &&
                                "text-green-600")
                            }`}
                          >
                            {(paymentStatus.status === "no_payment_required" &&
                              "Não requerido") ||
                              (paymentStatus.status === "unpaid" &&
                                "Não pago") ||
                              (paymentStatus.status === "paid" && "Pago")}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5 mb-3">
                        {myOrder?.OrderItems.map((item) => (
                          <div
                            className="grid grid-cols-[60px_1fr] sm:grid-cols-[100px_1fr] gap-3 sm:gap-10"
                            key={item.id}
                          >
                            <div className="w-full">
                              <Image
                                src={item.product.thumbnail}
                                width={600}
                                height={600}
                                layout="responsive"
                                alt={configs.companyName}
                              />
                            </div>
                            <div className="flex justify-between">
                              <div>
                                <strong>{item.product.name}</strong>
                                <p>Tamanho: {item.size.size}</p>
                                <p>Categoria: {item.product.category.name}</p>
                                <p>Quantidade: {item.quantity}</p>
                              </div>
                              <div className="text-right text-lg">
                                {calcPrice(item.total)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center py-5 border-y text-xl font-semibold mb-3">
                        <span>Total</span>
                        <span>{calcPrice(Number(myOrder?.total))}</span>
                      </div>

                      <p>
                        Fique atento ao seu telefone ou email, entraremos em
                        contato para a aprovação do design e para passarmos as
                        informações do envio do seu pedido.
                      </p>
                      <p>Obrigado pela preferência.</p>
                      <strong> {configs.companyName}</strong>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        <div className="flex justify-center mt-10">
          <Link href={"/"}>
            <Button scheme="success">
              <House />
              Ir ao início
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
