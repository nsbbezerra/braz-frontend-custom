import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import {
  CaretRight,
  Check,
  House,
  MagnifyingGlassPlus,
  ShoppingBag,
  ShoppingCart,
  TShirt,
  X,
} from "phosphor-react";
import { Fragment, useContext, useEffect, useState } from "react";
import Button from "../../../components/layout/Button";
import Footer from "../../../components/layout/Footer";
import HeadApp from "../../../components/layout/Head";
import Header from "../../../components/layout/Header";
import * as Tabs from "@radix-ui/react-tabs";
import Pedidos from "../../../components/layout/Pedidos";
import { ProductInformationPageProps } from "../../../types";
import Link from "next/link";
import CartContext from "../../../context/cart/cart";
import { nanoid } from "nanoid";
import Toast from "../../../components/layout/Toast";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import { api } from "../../../configs";

interface ProductProps {
  id: string;
}

interface Props {
  information: ProductInformationPageProps;
}

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

const Produto: NextPage<Props> = ({ information }) => {
  const calcPrice = (price: number) => {
    return parseFloat(String(price)).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  const { cart, setCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [size, setSize] = useState<string>("");
  const [sizeId, setSizeId] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [preview, setPreview] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);

  useEffect(() => {
    const myPrice = information.product?.price || 0;
    const sum = myPrice * quantity;
    if (isNaN(sum)) {
      setPrice(myPrice);
    } else {
      setPrice(sum);
    }
  }, [quantity, information]);

  const addToCart = () => {
    const findProduct = cart.find(
      (obj) => obj.name === information.product?.name && obj.size === size
    );
    if (findProduct) {
      setToast({
        title: "Atenção",
        message: "Este produto com este tamanho já foi adicionado ao carrinho",
        type: "warning",
      });
      setOpenToast(true);
      return false;
    }
    if (size === "") {
      setToast({
        title: "Atenção",
        message: "Selecione um tamanho",
        type: "warning",
      });
      setOpenToast(true);
      return false;
    }
    setCart([
      ...cart,
      {
        id: nanoid(),
        category: information.product?.category.name || "",
        product: information.product?.id || "",
        name: information.product?.name || "",
        quantity,
        size: size,
        thumbnail: information.product?.thumbnail || "",
        total: price,
        unity: Number(information.product?.price),
        sizeId: sizeId,
      },
    ]);
    setIsDialogOpen(true);
    setQuantity(1);
    setSize("");
  };

  const handleImage = (ref: string) => {
    setUrl(ref);
    setPreview(true);
  };

  const handleSize = (id: string) => {
    let name = information.product?.Sizes.find((obj) => obj.id === id);
    setSize(String(name?.size));
    setSizeId(id);
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
      <HeadApp title={`${information.product?.name} | Braz Camiseteria`} />
      <Header />
      {!information.banner ? (
        ""
      ) : (
        <>
          <div className="w-full relative">
            <Image
              src={information.banner.banner}
              width={1920}
              height={461}
              alt="Braz Multimidia banner"
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </>
      )}

      <section className="container mx-auto px-5 xl:px-0 max-w-6xl py-5">
        <div className="flex items-center gap-3">
          <Link href={"/"} passHref>
            <a className="flex items-center gap-2 cursor-pointer hover:underline">
              <House />
              Início
            </a>
          </Link>
          <CaretRight />
          <Link href={`/produtos/produto/${information.product?.id}`}>
            <a className="flex items-center gap-2 cursor-pointer hover:underline uppercase">
              <TShirt />
              {information.product?.name}
            </a>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[380px_1fr] gap-5 mt-5 justify-items-center">
          <div className="w-full rounded-md overflow-hidden h-fit max-w-sm">
            <Image
              src={information.product?.thumbnail || ""}
              width={600}
              height={600}
              layout="responsive"
              alt="Braz Multimidia"
            />
          </div>

          <div>
            <strong className="heading text-marinho-500 block">
              {information.product?.name}
            </strong>
            <p className="md:text-lg mb-3">
              {information.product?.shortDescription}
            </p>
            <p>ID: {information.product?.id}</p>
            <p>
              Categoria:{" "}
              <Link
                href={`/produtos/${information.product?.category.id}`}
                passHref
              >
                <a className="hover:underline cursor-pointer text-sky-700">
                  {information.product?.category.name}
                </a>
              </Link>
            </p>

            <div className="flex justify-between md:items-center mt-10 flex-col gap-5 md:flex-row">
              <div>
                <span>Total a pagar:</span>
                <strong className="text-3xl block">{calcPrice(price)}</strong>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-[150px_100px_1fr] md:grid-cols-2 gap-3 xl:max-w-lg items-end lg:grid-cols-[150px_100px_1fr]">
                <div className="flex flex-col">
                  <label htmlFor="qtd" className="mr-2 hidden sm:block">
                    Tamanho:
                  </label>
                  <select
                    className="border h-12 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full bg-transparent"
                    placeholder="Selecione um tamanho"
                    value={size}
                    onChange={(e) => handleSize(e.target.value)}
                  >
                    <option value={""}>Selecione um tamanho</option>
                    {information.product?.Sizes.map((size) => (
                      <option value={size.id} key={size.id}>
                        {size.size}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="qtd" className="mr-2 hidden sm:block">
                    QTD:
                  </label>
                  <input
                    id="qtd"
                    className="border h-12 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-marinho-500 w-full"
                    type={"number"}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </div>
                <div className="col-span-2 sm:col-auto md:col-span-2 lg:col-auto">
                  <Button
                    buttonSize="lg"
                    scheme="warning"
                    isFullSize
                    onClick={() => addToCart()}
                  >
                    <ShoppingCart />
                    Adicionar ao carrinho
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Tabs.Root className={"Root-tabs"} defaultValue="desc">
            <Tabs.List className={"List-tabs"} aria-label="tabs example">
              <Tabs.Trigger value="desc" className={"Trigger-tabs"}>
                DESCRIÇÃO
              </Tabs.Trigger>
              <Tabs.Trigger value="model" className={"Trigger-tabs"}>
                MODELAGEM
              </Tabs.Trigger>
              <Tabs.Trigger value="video" className={"Trigger-tabs"}>
                VÍDEO
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="desc" className={"Content-tabs"}>
              <div
                className="html-parsed"
                dangerouslySetInnerHTML={{
                  __html: information.product?.description || "",
                }}
              />
            </Tabs.Content>
            <Tabs.Content value="model" className={"Content-tabs"}>
              <div className="w-full">
                <strong className="font-serif text-marinho-500 block w-full text-center">
                  COMO TIRAR SUAS MEDIDAS
                </strong>

                <div className="grid grid-cols-1 sm:grid-cols-3 container mx-auto max-w-3xl mt-5 items-start gap-5">
                  {information.product?.Modeling.map((mod) => (
                    <div
                      className="w-full flex flex-col justify-center items-center"
                      key={mod.id}
                    >
                      <div className="w-3/4 max-w-[200px]">
                        <Image
                          src={mod.image}
                          alt="Modelagem svg"
                          layout="responsive"
                          width={400}
                          height={400}
                        />
                      </div>
                      <div className="p-2 text-center">
                        <strong>{mod.title}</strong>
                        <p>{mod.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 container mx-auto max-w-3xl mt-5 items-start gap-5">
                  {information.product?.SizeTables.map((mea) => (
                    <div
                      className="flex flex-col justify-center items-center"
                      key={mea.id}
                    >
                      <div className="w-full max-w-sm">
                        <Image
                          src={mea.table}
                          alt="Modelagem svg"
                          layout="responsive"
                          width={400}
                          height={300}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tabs.Content>
            <Tabs.Content value="video" className={"Content-tabs"}>
              {!information.product?.video ? (
                ""
              ) : (
                <div className="w-full flex justify-center">
                  <iframe
                    className="aspect-video w-full rounded-md"
                    src={information.product.video}
                  />
                </div>
              )}
            </Tabs.Content>
          </Tabs.Root>
        </div>

        <div className="flex items-center flex-col gap-2 mt-16 w-full">
          <span className="block heading text-marinho-500 text-center">
            CATÁLOGOS DE MODELOS PRONTOS
          </span>
          <div className="border-marinho-500 border-b-2 w-56" />

          <div className="grid grid-cols-4 gap-10 w-full mt-10">
            {information.product?.Catalogs.map((cat) => (
              <div
                key={cat.id}
                className="w-full rounded-md shadow overflow-hidden cursor-pointer hover:scale-105 transition-all delay-150"
                onClick={() => handleImage(cat.image)}
              >
                <Image
                  src={cat.image}
                  alt="Modelagem svg"
                  layout="responsive"
                  width={300}
                  height={300}
                />
              </div>
            ))}
          </div>

          <Link href={`/produtos/catalogos/${information.product?.id}`}>
            <a className="buttom-md buttom-yellow cursor-pointer mt-5">
              Veja o catálogo completo
            </a>
          </Link>
        </div>

        <Pedidos />
      </section>

      <Footer />

      <AlertDialog.Root open={isDialogOpen}>
        <AlertDialog.Trigger asChild />
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-60 z-40" />
          <AlertDialog.Content className="fixed w-[80%] left-[10%] right-[10%] sm:w-[50%] sm:left-[25%] sm:right-[25%] md:w-[40%] md:left-[30%] md:right-[30%] lg:w-[30%] bg-white shadow-2xl rounded-md top-[15%] z-50 lg:left-[35%] lg:right-[35%] flex items-center justify-center flex-col p-5 gap-2">
            <AlertDialog.Title className="text-white px-4 py-3 font-semibold text-4xl w-20 h-20 flex items-center justify-center bg-green-600 rounded-full">
              <Check />
            </AlertDialog.Title>
            <AlertDialog.Description className="text-green-600 text-2xl font-semibold">
              Sucesso
            </AlertDialog.Description>
            <div className="text-center mb-5">
              <span className="text-zinc-800 text-lg">
                Item adicionado ao carrinho com sucesso!
              </span>
            </div>
            <div className="flex items-center gap-3 w-full flex-col xl:flex-row">
              <AlertDialog.Cancel
                className="buttom-md buttom-gray buttom-full"
                onClick={() => setIsDialogOpen(false)}
              >
                <ShoppingBag /> Continuar comprando
              </AlertDialog.Cancel>
              <Link href={"/checkout"}>
                <AlertDialog.Action className="buttom-md buttom-blue buttom-full">
                  <ShoppingCart /> Ir para o carrinho
                </AlertDialog.Action>
              </Link>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <Dialog.Root onOpenChange={() => setPreview(!preview)} open={preview}>
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="dialog-content p-2">
            <div className="dialog-body-img max-w-md sm:max-w-lg">
              <Dialog.Close className="bg-sky-700 hover:bg-sky-800 rounded-full w-7 h-7 flex items-center justify-center active:bg-sky-700 absolute right-3 top-3 z-10 text-white">
                <X />
              </Dialog.Close>
              <div className="z-10">
                <Image
                  src={url}
                  width={300}
                  height={300}
                  layout="responsive"
                  alt="Braz Multimidia"
                />
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Fragment>
  );
};

export default Produto;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get("/fromProductPagePaths");

  const products: ProductProps[] = data;

  const paths = products.map((prod) => {
    return { params: { product: prod.id } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.product || "";

  const { data } = await api.get(`/fromProductPage/${id}`);

  return {
    props: {
      information: {
        banner: data.banner || null,
        product: data.product || null,
      },
    },
    revalidate: 60,
  };
};
