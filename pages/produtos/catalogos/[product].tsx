import Image from "next/image";
import {
  CaretDown,
  CaretRight,
  House,
  ImageSquare,
  MagnifyingGlassPlus,
  TShirt,
  X,
} from "phosphor-react";
import { Fragment, useState } from "react";
import Footer from "../../../components/layout/Footer";
import HeadApp from "../../../components/layout/Head";
import Header from "../../../components/layout/Header";
import * as Accordion from "@radix-ui/react-accordion";
import * as Popover from "@radix-ui/react-popover";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { clientQuery } from "../../../lib/urql";
import {
  FIND_COLLECTION_INFORMATION,
  FIND_PRODUCTS_PATH,
} from "../../../graphql/products";
import { BannersProps } from "../../../types";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";

interface ProductProps {
  id: string;
}

type ProductNameProps = {
  id: string;
  name: string;
};

type ImageProps = {
  id: string;
  url: string;
};

type CategoriesProps = {
  id: string;
  name: string;
  products: ProductNameProps[];
};

type CollectionsProps = {
  id: string;
  product: ProductNameProps;
  images: ImageProps[];
};

interface Props {
  banners: BannersProps | null;
  collections: CollectionsProps | null;
  categories: CategoriesProps[];
}

const Catalogos: NextPage<Props> = ({ collections, categories, banners }) => {
  const AccordionApp = () => (
    <Accordion.Root
      type="single"
      className={"Container-accordion"}
      defaultValue={categories[0].id}
    >
      {categories.map((cat) => (
        <Accordion.Item
          value={cat.id}
          className={"Item-accordion"}
          key={cat.id}
        >
          <Accordion.Header className={"Header-accordion"}>
            <Accordion.Trigger className={"Trigger-accordion"}>
              <TShirt className="flex-shrink-0" />
              <span>{cat.name}</span>
              <CaretDown aria-hidden className={"Icon-accordion"} />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className={"Content-accordion"}>
            <div className="flex flex-col gap-1">
              {cat.products.map((prod) => (
                <div key={prod.id}>
                  <Link href={`/produtos/catalogos/${prod.id}`} passHref>
                    <a className="Content-link-item-accordion">
                      <ImageSquare className="flex-shrink-0" />
                      <span className="block line-clamp-1">{prod.name}</span>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );

  const [preview, setPreview] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  const handleImage = (ref: string) => {
    setUrl(ref);
    setPreview(true);
  };

  return (
    <Fragment>
      <HeadApp
        title={`Catálogo - ${collections?.product.name} | Braz Camiseteria`}
      />
      <Header />
      {!banners ? (
        ""
      ) : (
        <>
          <div className="w-full relative hidden sm:block">
            <Image
              src={banners.desktop.url}
              width={1920}
              height={461}
              alt="Braz Multimidia banner"
              layout="responsive"
            />
          </div>
          <div className="w-full relative block sm:hidden">
            <Image
              src={banners.mobile.url}
              alt="Braz Multimidia"
              layout="responsive"
              width={550}
              height={775}
              objectFit="cover"
            />
          </div>
        </>
      )}

      <section className="py-10 container mx-auto px-5 xl:px-0 max-w-7xl">
        <div className="flex items-center gap-3">
          <Link href={"/"} passHref>
            <a className="flex items-center gap-2 cursor-pointer hover:underline">
              <House />
              Início
            </a>
          </Link>
          <CaretRight />
          <a className="flex items-center gap-2 cursor-pointer hover:underline">
            <ImageSquare />
            Catálogos
          </a>
          <CaretRight />
          <Link href={`/produtos/catalogos/${collections?.product.id || ""}`}>
            <a className="flex items-center gap-2 cursor-pointer hover:underline">
              <TShirt />
              {collections?.product.name}
            </a>
          </Link>
        </div>

        <div className="w-fit">
          <Popover.Root>
            <Popover.Trigger className="flex gap-3 bg-orange-500 text-white items-center py-2 px-3 font-semibold text-lg lg:hidden mt-5 rounded-md">
              <TShirt /> PRODUTOS <CaretDown />
            </Popover.Trigger>
            <Popover.Anchor />
            <Popover.Portal>
              <Popover.Content className="Content-drop">
                <AccordionApp />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] lg:gap-10 mt-10">
          <div className="hidden lg:block rounded-md border overflow-hidden h-fit shadow">
            <AccordionApp />
          </div>

          <div>
            <strong className="heading text-marinho-500 flex items-center gap-3 w-full border-b border-b-marinho-500 pb-1 mb-5">
              <ImageSquare />{" "}
              <span className="line-clamp-1">{collections?.product.name}</span>
            </strong>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
              {collections?.images.map((picture) => (
                <div
                  className="w-full relative rounded-md overflow-hidden"
                  key={picture.id}
                >
                  <Image
                    src={picture.url}
                    width={600}
                    height={600}
                    layout="responsive"
                    alt="Braz Multimidia"
                  />
                  <div className="absolute top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
                    <button
                      className="text-gray-400 hover:text-white text-6xl p-2 rounded-2xl active:text-gray-400"
                      onClick={() => handleImage(picture.url)}
                    >
                      <MagnifyingGlassPlus />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <Dialog.Root onOpenChange={() => setPreview(!preview)} open={preview}>
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="dialog-content p-2">
            <div className="dialog-body-img max-w-md sm:max-w-lg">
              <Dialog.Close className="bg-sky-700 hover:bg-sky-800 rounded-full w-7 h-7 flex items-center justify-center active:bg-sky-700 absolute right-3 top-3 z-10 text-white">
                <X />
              </Dialog.Close>
              <div>
                <Image
                  src={url}
                  width={600}
                  height={600}
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

export default Catalogos;

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
    .query(FIND_COLLECTION_INFORMATION, { id })
    .toPromise();

  return {
    props: {
      banners: data.banners[0] || null,
      collections: data.collections[0] || null,
      categories: data.categories || [],
    },
    revalidate: 60,
  };
};
