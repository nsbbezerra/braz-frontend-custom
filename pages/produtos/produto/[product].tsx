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
import { clientQuery } from "../../../lib/urql";
import {
  FIND_PRODUCTS_PATH,
  FIND_PRODUCT_INFORMATION,
} from "../../../graphql/products";
import { ProductInformationPageProps } from "../../../types";
import Link from "next/link";
import CartContext from "../../../context/cart/cart";
import { nanoid } from "nanoid";
import Toast from "../../../components/layout/Toast";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Carousel from "../../../components/layout/Carousel";
import * as Dialog from "@radix-ui/react-dialog";

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
    let transform = price / 100;
    return transform.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  const { cart, setCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [size, setSize] = useState<string>("");
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
        category: information.product?.categories[0].name || "",
        product: information.product?.id || "",
        name: information.product?.name || "",
        quantity,
        size: size,
        thumbnail: information.product?.images[0].url || "",
        total: price,
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
      {!information.banners ? (
        ""
      ) : (
        <>
          <div className="w-full relative hidden sm:block">
            <Image
              src={information.banners.desktop.url}
              width={1920}
              height={461}
              alt="Braz Multimidia banner"
              layout="responsive"
            />
          </div>
          <div className="w-full relative block sm:hidden">
            <Image
              src={information.banners.mobile.url}
              alt="Braz Multimidia"
              layout="responsive"
              width={550}
              height={775}
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
              src={information.product?.images[0].url || ""}
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
              {information.product?.description}
            </p>
            <p>ID: {information.product?.id}</p>
            <p>
              Categoria:{" "}
              <Link
                href={`/produtos/${information.product?.categories[0].id}`}
                passHref
              >
                <a className="hover:underline cursor-pointer text-sky-700">
                  {information.product?.categories[0].name}
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
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option value={""}>Selecione um tamanho</option>
                    {information.productSizeVariants.map((size) => (
                      <option value={size.name} key={size.id}>
                        {size.name}
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
                  __html: information.product?.information?.html || "",
                }}
              />
            </Tabs.Content>
            <Tabs.Content value="model" className={"Content-tabs"}>
              <div className="w-full">
                <strong className="font-serif text-marinho-500 block w-full text-center">
                  COMO TIRAR SUAS MEDIDAS
                </strong>

                <div className="grid grid-cols-1 sm:grid-cols-3 container mx-auto max-w-3xl mt-5 items-start gap-5">
                  {information.product?.modelings.map((mod) => (
                    <div
                      className="w-full flex flex-col justify-center items-center"
                      key={mod.id}
                    >
                      <div className="w-3/4 max-w-[200px]">
                        <Image
                          src={mod.image.url}
                          alt="Modelagem svg"
                          layout="responsive"
                          width={400}
                          height={450}
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
                  {information.product?.measurements.map((mea) => (
                    <div
                      className="flex flex-col justify-center items-center"
                      key={mea.id}
                    >
                      <strong className="uppercase">{mea.title}</strong>
                      <div className="w-full max-w-sm">
                        <Image
                          src={mea.image.url}
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
        </div>

        <Carousel
          catalogs={information.product?.collections[0] || null}
          product={information.product?.id || null}
        />

        <Pedidos />
      </section>

      <div className="bg-gray-50 w-full mt-10 py-10">
        <div className="flex items-center flex-col gap-2 mb-10 w-full">
          <span className="block heading text-marinho-500 text-center">
            CONFIRA A QUALIDADE DOS NOSSOS PRODUTOS
          </span>
          <div className="border-marinho-500 border-b-2 w-56" />
        </div>
        <div className="container mx-auto px-5 xl:px-0 max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {information.portfolios.map((port) => (
            <div
              className="w-full rounded-md overflow-hidden shadow relative"
              key={port.id}
            >
              <Image
                src={port.image.url}
                width={626}
                height={417}
                layout="responsive"
                alt="Braz Multimidia"
              />
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-all">
                <button
                  className="text-gray-400 hover:text-white text-6xl p-2 rounded-2xl active:text-gray-400"
                  onClick={() => handleImage(port.image.url)}
                >
                  <MagnifyingGlassPlus />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
            <div className="dialog-body-img max-w-2xl">
              <Dialog.Close className="bg-sky-700 hover:bg-sky-800 rounded-full w-7 h-7 flex items-center justify-center active:bg-sky-700 absolute right-3 top-3 z-10 text-white">
                <X />
              </Dialog.Close>
              <div>
                <Image
                  src={url}
                  width={626}
                  height={417}
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
  const { data } = await clientQuery.query(FIND_PRODUCTS_PATH, {}).toPromise();

  const products: ProductProps[] = data.products;

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

  const { data } = await clientQuery
    .query(FIND_PRODUCT_INFORMATION, { id })
    .toPromise();

  return {
    props: {
      information: {
        banners: data.banners[0] || null,
        product: data.product || null,
        productSizeVariants: data.productSizeVariants || [],
        portfolios: data.portfolios || [],
      },
    },
    revalidate: 60,
  };
};
