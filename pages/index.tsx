import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { Fragment } from "react";
import Cards from "../components/layout/Cards";
import Footer from "../components/layout/Footer";
import HeadApp from "../components/layout/Head";
import Header from "../components/layout/Header";
import Panel from "../components/layout/Panel";
import { api, configs } from "../configs";
import { ImagesPagesProps } from "../types";
import { ShieldCheck, Truck, Cardholder, Clock } from "phosphor-react";
import CardsProduct from "../components/layout/CardProduct";

interface Props {
  information: ImagesPagesProps;
}

const Home: NextPage<Props> = ({ information }) => {
  return (
    <Fragment>
      <HeadApp title={configs.companyName} />
      <Header />
      <Panel images={information.banners || []} />
      <section className="py-12 container mx-auto px-5 xl:px-0 max-w-6xl">
        <div className="w-full pb-10 flex flex-col items-center text-center">
          <strong className="text-marinho-500 heading font-bold font-serif">
            NOSSAS CATEGORIAS DE PRODUTOS
          </strong>
          <span className="text-sm md:text-base">
            Uniformes para diferentes utilidades, escolha o que melhor lhe
            atender
          </span>
        </div>
        <Cards categories={information.categories || []} />
      </section>

      <section className="w-full relative bg-marinho-500 bg-cover bg-center bg-no-repeat py-12">
        <div className="container mx-auto px-5 xl:px-0 max-w-6xl">
          <strong className="w-full block text-orange-500 text-center heading">
            VEJA PASSO A PASSO
          </strong>
          <span className="w-full block text-white text-center text-base">
            DESDE O MOMENTO DA ESCOLHA ATÉ O RECEBIMENTO EM SUA CASA
          </span>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-5 md:gap-0 ">
            <div className="p-3 flex items-center flex-col relative border-l md:border-l-0">
              <span className="w-7 h-7 flex items-center justify-center bg-orange-500 text-white font-semibold rounded-full">
                1
              </span>
              <div className="w-[30px] absolute -left-2 top-10 md:hidden">
                <Image
                  src="/img/home/arrow.svg"
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="Braz Multimidia"
                />
              </div>
              <div className="w-1/2">
                <Image
                  src="/img/home/t-shirts.svg"
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="Braz Multimidia"
                />
              </div>
              <span className="text-center text-sm text-white">
                VOCÊ ESCOLHE O MODELO OU NOS ENVIA AS INFORMAÇÕES
              </span>
            </div>
            <div className="p-3 flex items-center flex-col relative border-l">
              <span className="w-7 h-7 flex items-center justify-center bg-orange-500 text-white font-semibold rounded-full">
                2
              </span>
              <div className="w-[30px] absolute -left-2 top-10">
                <Image
                  src="/img/home/arrow.svg"
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="Braz Multimidia"
                />
              </div>
              <div className="w-1/2">
                <Image
                  src="/img/home/balon.svg"
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="Braz Multimidia"
                />
              </div>
              <span className="text-center text-sm text-white">
                ALINHA SEU PEDIDO COM UM CONSULTOR
              </span>
            </div>
            <div className="p-3 flex items-center flex-col relative border-l">
              <span className="w-7 h-7 flex items-center justify-center bg-orange-500 text-white font-semibold rounded-full">
                3
              </span>
              <div className="w-[30px] absolute -left-2 top-10">
                <Image
                  src="/img/home/arrow.svg"
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="Braz Multimidia"
                />
              </div>
              <div className="w-1/2">
                <Image
                  src="/img/home/card.svg"
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="Braz Multimidia"
                />
              </div>
              <span className="text-center text-sm text-white">
                EFETUA O PAGAMENTO
              </span>
              <span className="text-center text-sm text-white">
                Via cartão de crédito ou depósito bancário
              </span>
            </div>
            <div className="p-3 flex items-center flex-col relative border-l">
              <span className="w-7 h-7 flex items-center justify-center bg-orange-500 text-white font-semibold rounded-full">
                4
              </span>
              <div className="w-[30px] absolute -left-2 top-10">
                <Image
                  src="/img/home/arrow.svg"
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="Braz Multimidia"
                />
              </div>
              <div className="w-1/2">
                <Image
                  src="/img/home/cut.svg"
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="Braz Multimidia"
                />
              </div>
              <span className="text-center text-sm text-white">
                PRODUZIMOS E PREPARAMOS SEU PEDIDO
              </span>
            </div>
            <div className="p-3 flex items-center flex-col relative border-t md:border-l col-span-2 sm:col-span-4 md:col-span-1 md:border-t-0 md:mt-0">
              <span className="w-7 h-7 flex items-center justify-center bg-orange-500 text-white font-semibold rounded-full">
                5
              </span>
              <div className="w-[30px] absolute -left-2 top-10 hidden md:block">
                <Image
                  src="/img/home/arrow.svg"
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="Braz Multimidia"
                />
              </div>
              <div className="w-[60%] sm:w-[30%] md:w-full">
                <Image
                  src="/img/home/brazil.svg"
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="Braz Multimidia"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 container mx-auto px-5 xl:px-0 max-w-6xl">
        <div className="w-full pb-10 flex flex-col items-center text-center">
          <strong className="text-marinho-500 heading font-bold font-serif">
            OS MAIS VENDIDOS
          </strong>
        </div>
        <CardsProduct products={information.products || []} />
      </section>

      <section className="container mx-auto px-5 xl:px-0 pb-12 grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl">
        <div className="flex flex-col justify-center items-center text-center gap-2">
          <ShieldCheck className="text-7xl text-marinho-500" />
          <span>Compra 100% Segura</span>
        </div>
        <div className="flex flex-col justify-center items-center text-center gap-2">
          <Truck className="text-7xl text-marinho-500" />
          <span>Entregamos em todo o Brasil</span>
        </div>
        <div className="flex flex-col justify-center items-center text-center gap-2">
          <Cardholder className="text-7xl text-marinho-500" />
          <span>Aceitamos todos os cartões</span>
        </div>
        <div className="flex flex-col justify-center items-center text-center gap-2">
          <Clock className="text-7xl text-marinho-500" />
          <span>Entrega rápida</span>
        </div>
      </section>

      <Footer />
    </Fragment>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("/fromIndexPage");
  return {
    props: {
      information: {
        banners: data.banners || [],
        categories: data.categories,
        products: data.products || [],
      },
    },
    revalidate: 120,
  };
};
