import {
  CircleNotch,
  GearSix,
  MagnifyingGlass,
  MagnifyingGlassPlus,
  Minus,
  Plus,
  X,
} from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import Button from "../../components/layout/Button";
import Footer from "../../components/layout/Footer";
import HeadApp from "../../components/layout/Head";
import Header from "../../components/layout/Header";
import Toast from "../../components/layout/Toast";
import { FIND_ORDERS_PAG, UPDATE_STATUS } from "../../graphql/order";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";

type Cart = {
  id: string;
  category: string;
  product: string;
  thumbnail: string;
  name: string;
  quantity: number;
  total: number;
  size: string;
};

type Order = {
  id: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  information?: string;
  email: string;
  total: number;
  items: Cart[];
  statusSale: string;
  createdAt: Date;
};

type PageInfoProps = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
};

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

export default function Admin() {
  const [page, setPage] = useState<number>(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfoProps | null>(null);
  const [dialog, setDialog] = useState<boolean>(false);
  const [orderToShow, setOrderToShow] = useState<Order | null>(null);
  const [status, setStatus] = useState<string>("");

  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);

  const [findOrdersResults, findOrders] = useQuery({
    query: FIND_ORDERS_PAG,
    variables: { page },
  });

  const [updateOrderResults, updateOrder] = useMutation(UPDATE_STATUS);
  const { fetching: loadingUpdate } = updateOrderResults;

  const { fetching, data, error } = findOrdersResults;

  useEffect(() => {
    if (data) {
      setOrders(data.orders);
      setPageInfo(data.ordersConnection.pageInfo);
    }
    if (error) {
      let message = error.message;
      setToast({
        title: "Erro",
        message: message,
        type: "error",
      });
      setOpenToast(true);
    }
  }, [data, error]);

  const calcPrice = (price: number) => {
    let transform = price / 100;
    return transform.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  function formateDate(date: Date) {
    const initialDate = new Date(date);
    const day = initialDate.getDate();
    const month = initialDate.toLocaleString("pt-br", { month: "long" });
    const year = initialDate.getFullYear();

    return `${day} de ${month} de ${year}`;
  }

  const handleNext = () => {
    const actual = page;
    setPage(actual + 1);
    findOrders();
  };
  const handlePrev = () => {
    const actual = page;
    setPage(actual - 1);
    findOrders();
  };

  const handleOrder = (id: string) => {
    const result = orders.find((obj) => obj.id === id);
    setOrderToShow(result || null);
    setStatus(result?.statusSale || "");
    setDialog(true);
  };

  const setUpdateOrder = async (status: string, id: string) => {
    setStatus(status);
    await updateOrder({ statusSale: status, id }).then((response) => {
      console.log(response);
      findOrders();
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
      <HeadApp
        title="Braz Camiseteria | Uniforme Empresarial, Uniforme Esportivo, Uniforme
        Promocional, Abadás"
      />
      <Header />
      <div className="bg-gradient-to-b h-52 from-marinho-500 to-marinho-900 flex justify-center items-center flex-col px-5 text-white text-center">
        <GearSix className="text-7xl" />
        <strong className="text-3xl mt-2">PAINEL ADMINISTRATIVO</strong>
      </div>

      <section className="container mx-auto max-w-5xl px-5 xl:px-0 my-10">
        <div className="flex items-end gap-3 w-full mb-10">
          <div className="w-full">
            <label htmlFor="name" className="block">
              Buscar pelo número do pedido{" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              className="border h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full"
            />
          </div>
          <Button onClick={findOrders}>
            <MagnifyingGlass />
            Buscar
          </Button>
        </div>

        <div className="rounded-md overflow-auto border shadow max-w-full">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left bg-zinc-100">
                <th className="p-2 min-w-[280px]">NOME</th>
                <th className="p-2 min-w-[170px]">NÚMERO</th>
                <th className="p-2 min-w-[100px]">VALOR</th>
                <th className="p-2 min-w-[100px]">DATA</th>
                <th className="p-2">STATUS</th>
                <th className="p-2">AÇÃO</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((ord) => (
                <tr key={ord.id}>
                  <td className="p-2">{ord.name}</td>
                  <td className="p-2">{ord.id}</td>
                  <td className="p-2">{calcPrice(ord.total)}</td>
                  <td className="p-2">{formateDate(ord.createdAt)}</td>
                  <td className="p-2">{ord.statusSale}</td>
                  <td className="p-2">
                    <Button
                      buttonSize="sm"
                      isFullSize
                      variant="outline"
                      onClick={() => handleOrder(ord.id)}
                    >
                      Detalhes
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pageInfo && (
            <div className="border-t p-2 w-full flex items-center gap-3">
              <Button
                isDisabled={!pageInfo.hasPreviousPage}
                onClick={() => handlePrev()}
                isLoading={fetching}
              >
                <Minus />
                Anterior
              </Button>
              <span>{pageInfo.pageSize} Itens</span>
              <Button
                isDisabled={!pageInfo.hasNextPage}
                onClick={() => handleNext()}
                isLoading={fetching}
              >
                Próxima
                <Plus />
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />

      <Dialog.Root onOpenChange={() => setDialog(!dialog)} open={dialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="dialog-content p-2">
            <div className="dialog-body max-w-5xl max-h-full overflow-auto">
              <div className="dialog-header border-b sticky top-0 bg-white">
                <span>Visualizar Compra</span>
                <Dialog.Close className="dialog-close">
                  <X />
                </Dialog.Close>
              </div>
              <div>
                <div className="text-sm sm:text-base">
                  <div className="px-3 py-2 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      {formateDate(orderToShow?.createdAt || new Date())}
                    </h3>
                    <p className="mt-1 max-w-2xl text-gray-500">
                      ID: {orderToShow?.id}
                    </p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-zinc-50 px-3 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-medium text-gray-500">Nome</dt>
                        <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
                          {orderToShow?.name}
                        </dd>
                      </div>
                      <div className="bg-white px-3 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
                          {orderToShow?.email}
                        </dd>
                      </div>
                      <div className="bg-zinc-50 px-3 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-medium text-gray-500">Telefone</dt>
                        <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
                          {orderToShow?.phone}
                        </dd>
                      </div>
                      <div className="bg-white px-3 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-medium text-gray-500">
                          Status da Compra
                        </dt>
                        <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
                          <label>Selecione para alterar o status:</label>
                          {loadingUpdate ? (
                            <div className="w-52 h-10 flex items-center justify-center border rounded-md">
                              <CircleNotch className="animate-spin" />
                            </div>
                          ) : (
                            <select
                              className="h-10 border rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-marinho-500 ml-2 w-52"
                              onChange={(e) =>
                                setUpdateOrder(
                                  e.target.value,
                                  orderToShow?.id || ""
                                )
                              }
                              value={status}
                            >
                              <option value="Negociando">Negociando</option>
                              <option value="Produzindo">Produzindo</option>
                              <option value="Embalando">Embalando</option>
                              <option value="Enviado">Enviado</option>
                              <option value="Finalizado">Finalizado</option>
                            </select>
                          )}
                        </dd>
                      </div>
                      <div className="bg-zinc-50 px-3 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-medium text-gray-500">Endereço</dt>
                        <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
                          <div className="flex flex-col">
                            <span>Cidade: {orderToShow?.city}</span>
                            <span>Estado: {orderToShow?.state}</span>
                          </div>
                        </dd>
                      </div>
                      <div className="px-3 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-medium text-gray-500">
                          Informações
                        </dt>
                        <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
                          {orderToShow?.information}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="grid grid-cols-1 divide-y border-t">
                  {orderToShow &&
                    orderToShow.items.map((item) => (
                      <div
                        className="grid grid-cols-[70px_1fr] sm:grid-cols-[100px_1fr] gap-5 px-5 py-2"
                        key={item.id}
                      >
                        <div>
                          <Image
                            src={item.thumbnail}
                            width={600}
                            height={600}
                            layout="responsive"
                            alt="Braz Multimidia"
                          />
                        </div>
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col">
                            <strong className="font-bold text-marinho-500 sm:text-lg">
                              {item.name}
                            </strong>
                            <span className="text-sm sm:text-base">
                              Quantidade: {item.quantity}
                            </span>
                            <span className="text-sm sm:text-base">
                              {item.size}
                            </span>
                            <span className="text-sm sm:text-base">
                              Categoria: {item.category}
                            </span>
                          </div>
                          <div className="w-32 font-bold text-right sm:text-lg">
                            {calcPrice(item.total)}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex justify-between p-4 border-t text-xl font-bold text-marinho-500 bg-zinc-50">
                  <span>Total da compra</span>
                  <span>{calcPrice(orderToShow?.total || 0)}</span>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Fragment>
  );
}
