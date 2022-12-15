import { isAxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Barcode,
  Check,
  CircleNotch,
  CreditCard,
  CurrencyDollar,
  NoteBlank,
  Prohibit,
  ShoppingBag,
  X,
} from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import Button from "../../components/layout/Button";
import Footer from "../../components/layout/Footer";
import HeadApp from "../../components/layout/Head";
import Header from "../../components/layout/Header";
import Toast from "../../components/layout/Toast";
import { api, configs } from "../../configs";
import { useFetch } from "../../lib/useFetch";
import * as Dialog from "@radix-ui/react-dialog";

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface ClientProps {
  id: string;
  name: string;
}

type SizeProps = {
  size: string;
};

type ProductProps = {
  id: string;
  name: string;
  price: string;
  thumbnail: string;
  category: CategoryProps;
};

type CategoryProps = {
  name: string;
};

type OrderItemsProps = {
  id: string;
  product: ProductProps;
  quantity: number;
  size: SizeProps;
  total: string;
};

interface OrdersProps {
  id: string;
  checkoutId?: string;
  observation: string;
  orderStatus:
    | "payment"
    | "design"
    | "production"
    | "packing"
    | "shipping"
    | "finish";
  paymentStatus: "waiting" | "paidOut" | "refused" | "cancel";
  client: ClientProps;
  OrderItems: OrderItemsProps[];
  total: string;
  createdAt: Date;
  shippingCode: string;
  shippingInformation: string;
}

type PaymentProps = {
  status: "paid" | "unpaid" | "no_payment_required";
  method: ["boleto" | "card"];
};

export default function MinhasCompras() {
  const { query } = useRouter();
  const { client } = query;

  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrdersProps[]>([]);
  const [modalPayment, setModalPayment] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentInfo, setPaymentInfo] = useState<PaymentProps | null>(null);
  const [checkoutId, setcheckoutId] = useState<string>("");

  const { data, error, isLoading } = useFetch(`/orders/client/${client}`);

  useEffect(() => {
    if (error) {
      setToast({
        title: "Erro",
        type: "error",
        message:
          isAxiosError(error) && error.message
            ? error.response?.data.message
            : (error as Error).message,
      });
    }
    if (data) {
      setOrders(data);
    }
  }, [error, data]);

  function formateDate(date: Date) {
    const initialDate = new Date(date);
    const day = initialDate.getDate();
    const month = initialDate.toLocaleString("pt-br", { month: "long" });
    const year = initialDate.getFullYear();

    return `${day} de ${month} de ${year}`;
  }

  function formatCurrency(price: string) {
    return parseFloat(price).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  async function findPaymentDetails(checkout: string, order: string) {
    setcheckoutId(checkout);
    setLoading(true);
    try {
      const response = await api.get(`/order/payment/${checkout}/${order}`);
      setPaymentInfo(response.data);
      setLoading(false);
      setModalPayment(true);
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error) && error.message) {
        setToast({
          type: "error",
          title: "Erro",
          message: "Ocorreu um erro ao buscar as informações",
        });
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
      <HeadApp title={configs.companyName} />
      <Header />
      <div className="bg-gradient-to-b h-52 from-marinho-500 to-marinho-900 flex justify-center items-center flex-col px-5 text-white text-center">
        <ShoppingBag className="text-7xl" />
        <strong className="text-3xl mt-2">MINHAS COMPRAS</strong>
      </div>

      <div className="py-12 container mx-auto px-5 xl:px-0 max-w-4xl grid grid-cols-1 gap-5">
        {isLoading ? (
          <div className="flex justify-center flex-col items-center">
            <CircleNotch className="text-7xl animate-spin" />
            <p>Carrgando informações...</p>
          </div>
        ) : (
          <Fragment>
            {orders.length === 0 ? (
              <div className="flex justify-center flex-col items-center">
                <NoteBlank className="text-7xl" />
                <p>Nenhum pedido registrado</p>
              </div>
            ) : (
              <>
                {orders.map((order) => (
                  <div
                    className="rounded-md border shadow overflow-hidden"
                    key={order.id}
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center py-2 px-4 border-b">
                      <div className="flex flex-col">
                        {(order.orderStatus === "payment" && (
                          <strong className="text-orange-600 text-lg">
                            Processando Pagamento
                          </strong>
                        )) ||
                          (order.orderStatus === "design" && (
                            <strong className="text-blue-600 text-lg">
                              Criando o Design
                            </strong>
                          )) ||
                          (order.orderStatus === "production" && (
                            <strong className="text-green-600 text-lg">
                              Produzindo
                            </strong>
                          )) ||
                          (order.orderStatus === "packing" && (
                            <strong className="text-blue-600 text-lg">
                              Embalando o Pedido
                            </strong>
                          )) ||
                          (order.orderStatus === "shipping" && (
                            <strong className="text-green-600 text-lg">
                              Pedido Enviado
                            </strong>
                          )) ||
                          (order.orderStatus === "finish" && (
                            <strong className="text-green-600 text-lg">
                              Pedido Finalizado
                            </strong>
                          ))}
                        <span className="text-sm">
                          {(order.paymentStatus === "waiting" &&
                            "Aguardando o pagamento...") ||
                            (order.paymentStatus === "refused" &&
                              "Pagamento recusado") ||
                            (order.paymentStatus === "paidOut" &&
                              "Pagamento confirmado") ||
                            (order.paymentStatus === "cancel" &&
                              "Pagamento cancelado")}
                        </span>
                      </div>
                      <div className="flex flex-col sm:items-end">
                        <span>
                          {formateDate(new Date(order.createdAt as Date))}
                        </span>
                        {order.checkoutId && (
                          <Button
                            buttonSize="sm"
                            variant="outline"
                            isLoading={
                              checkoutId === order.checkoutId && loading
                            }
                            onClick={() =>
                              findPaymentDetails(
                                String(order.checkoutId),
                                order.id
                              )
                            }
                          >
                            <CurrencyDollar /> Detalhes do pagamento
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="border-b py-2 px-4">
                      <span>
                        Número do pedido: <strong>{order.id}</strong>
                      </span>
                    </div>
                    <div className="grid grid-cols-1 border-b py-2 px-4 gap-3 divide-y">
                      {order.OrderItems.map((item) => (
                        <div
                          className="grid grid-cols-[100px_1fr] gap-5 pt-2"
                          key={item.id}
                        >
                          <div className="rounded-md overflow-hidden">
                            <Image
                              alt={`${item.product.name} - ${configs.companyName}`}
                              src={item.product.thumbnail}
                              width={200}
                              height={200}
                              layout="responsive"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-[1fr_100px] gap-3">
                            <div>
                              <strong>{item.product.name}</strong>
                              <p>Categoria: {item.product.category.name}</p>
                              <p>Tamanho: {item.size.size}</p>
                              <p>Quantidade: {item.quantity}</p>
                            </div>
                            <div className="flex sm:justify-end text-lg">
                              <strong>{formatCurrency(item.total)}</strong>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {order.orderStatus === "shipping" &&
                    order.shippingInformation ? (
                      <div className="border-b py-2 px-4">
                        <p>
                          Detalhes do envio:{" "}
                          <strong>{order.shippingInformation}</strong>
                        </p>
                        <p>
                          Código de rastreamento:{" "}
                          <strong>{order.shippingCode}</strong>
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="flex justify-between items-center py-2 px-4 text-lg bg-zinc-50">
                      <strong>TOTAL DO PEDIDO</strong>
                      <strong>{formatCurrency(order.total)}</strong>
                    </div>
                  </div>
                ))}
              </>
            )}
          </Fragment>
        )}
      </div>

      <Footer />

      <Dialog.Root
        onOpenChange={() => setModalPayment(!modalPayment)}
        open={modalPayment}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="dialog-content p-2">
            <div className="dialog-body max-w-md sm:max-w-lg">
              <div className="z-10 dialog-header">
                <span>Informações do Pagamento</span>
                <Dialog.Close className="bg-sky-700 hover:bg-sky-800 rounded-full w-7 h-7 flex items-center justify-center active:bg-sky-700 z-10 text-white">
                  <X />
                </Dialog.Close>
              </div>

              <div className="p-5">
                {paymentInfo && (
                  <Fragment>
                    {paymentInfo.status === "paid" ? (
                      <div className="border-green-600 border rounded-md w-full bg-green-50 text-xl font-bold text-center flex justify-center items-center gap-3 text-green-600 py-5 px-3">
                        <Check /> PAGAMENTO CONFIRMADO
                      </div>
                    ) : (
                      <div className="border-red-600 border rounded-md w-full bg-green-50 text-xl font-bold text-center flex justify-center items-center gap-3 text-red-600 py-5 px-3">
                        <Prohibit /> PAGAMENTO NÃO CONFIRMADO
                      </div>
                    )}
                    <span className="block w-full text-center py-3">
                      FORMA DE PAGAMENTO:
                    </span>

                    <div className="grid grid-cols-1 gap-3">
                      {paymentInfo.method.map((method) => {
                        if (method === "boleto") {
                          return (
                            <div
                              className="border-zinc-600 border rounded-md w-full bg-zinc-50 text-xl font-bold text-center flex justify-center items-center gap-3 text-zinc-600 py-2 px-3"
                              key={method}
                            >
                              <Barcode /> BOLETO
                            </div>
                          );
                        } else {
                          return (
                            <div
                              className="border-zinc-600 border rounded-md w-full bg-zinc-50 text-xl font-bold text-center flex justify-center items-center gap-3 text-zinc-600 py-2 px-3"
                              key={method}
                            >
                              <CreditCard /> CARTÃO DE CRÉDITO
                            </div>
                          );
                        }
                      })}
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Fragment>
  );
}
