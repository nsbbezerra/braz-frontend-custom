import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import {
  CaretDown,
  CaretRight,
  House,
  Leaf,
  Tag,
  TShirt,
} from "phosphor-react";
import { Fragment } from "react";
import CardsProduct from "../../components/layout/CardProduct";
import Footer from "../../components/layout/Footer";
import HeadApp from "../../components/layout/Head";
import Header from "../../components/layout/Header";
import * as Popover from "@radix-ui/react-popover";
import Pedidos from "../../components/layout/Pedidos";

import { BannersProps, CategoriesProps } from "../../types";
import Link from "next/link";
import { api } from "../../configs";
import { useRouter } from "next/router";

interface Props {
  banner: BannersProps;
  categories: CategoriesProps[];
  category: CategoriesProps;
}

const Produtos: NextPage<Props> = ({ banner, categories, category }) => {
  const { query } = useRouter();
  const { product } = query;

  const Items = () => (
    <>
      {!categories ? (
        ""
      ) : (
        <>
          {categories.length === 0 ? (
            <div className="flex justify-center items-center flex-col gap-1">
              <Leaf className="text-3xl" />
              <span>Nada para mostrar</span>
            </div>
          ) : (
            <div className="p-1 flex flex-col gap-1">
              {categories.map((cat) => (
                <Link key={cat.id} href={`/produtos/${cat.id}`} passHref>
                  <a className="flex w-full items-center gap-2 text-marinho-500 font-semibold h-8 rounded-md hover:bg-marinho-500 hover:text-white active:bg-marinho-600 select-none px-4 cursor-pointer focus:outline-none focus:bg-marinho-500 focus:text-white uppercase">
                    <Tag />
                    {cat.name}
                  </a>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );

  return (
    <Fragment>
      <HeadApp title={`${category.name} | Braz Camiseteria`} />
      <Header />
      {!banner ? (
        <div className="bg-gradient-to-b h-52 from-marinho-500 to-marinho-900 flex justify-center items-center flex-col px-5 text-white text-center">
          <Tag className="text-7xl" />
          <strong className="text-3xl mt-2">PRODUTOS</strong>
        </div>
      ) : (
        <>
          <div className="w-full relative">
            <Image
              src={banner.banner}
              width={1920}
              height={461}
              alt="Braz Multimidia banner"
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </>
      )}

      <section className="container mx-auto px-5 xl:px-0 max-w-7xl py-5">
        <div className="flex items-center gap-3">
          <Link href={"/"}>
            <a className="flex items-center gap-2 cursor-pointer hover:underline">
              <House />
              Início
            </a>
          </Link>
          <CaretRight />
          <Link href={`/produtos/${category.id}`}>
            <a className="flex items-center gap-2 cursor-pointer hover:underline uppercase">
              <TShirt />
              {category.name}
            </a>
          </Link>
        </div>

        <div className="w-fit">
          <Popover.Root>
            <Popover.Trigger className="flex gap-3 bg-orange-500 text-white items-center py-2 px-3 font-semibold text-lg lg:hidden mt-5 rounded-md">
              <TShirt /> CATEGORIAS <CaretDown />
            </Popover.Trigger>
            <Popover.Anchor />
            <Popover.Portal>
              <Popover.Content className="Content-drop">
                <Items />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 mt-5">
          <div className="hidden lg:block border rounded-md overflow-hidden shadow h-fit">
            <div className="flex gap-3 bg-orange-500 text-white items-center py-2 px-3 font-semibold text-lg">
              <TShirt />
              CATEGORIAS
            </div>

            <Items />
          </div>
          <div>
            <CardsProduct products={category.Products || []} />
          </div>
        </div>

        <Pedidos />
      </section>

      <Footer />
    </Fragment>
  );
};

export default Produtos;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get("/fromCategoriesPagePaths");

  const categories: CategoriesProps[] = data;

  const paths = categories.map((cat) => {
    return { params: { product: cat.id } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.product || "";
  const { data } = await api.get(`/fromCategoriesPage/${id}`);

  return {
    props: {
      categories: data.categories || null,
      banner: data.banner || null,
      category: data.category || null,
    },
    revalidate: 60,
  };
};
