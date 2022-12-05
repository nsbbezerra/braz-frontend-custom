import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { CircleWavyCheck } from "phosphor-react";
import { Fragment } from "react";
import Cards from "../components/layout/Cards";
import Footer from "../components/layout/Footer";
import HeadApp from "../components/layout/Head";
import Header from "../components/layout/Header";
import Panel from "../components/layout/Panel";
import { FIND_INDEX_PAGE } from "../graphql/indexPage";
import { clientQuery } from "../lib/urql";
import { ImagesPagesProps } from "../types";

interface Props {
  information: ImagesPagesProps;
}

const Home: NextPage<Props> = ({ information }) => {
  return (
    <Fragment>
      <HeadApp
        title="Braz Camiseteria | Uniforme Empresarial, Uniforme Esportivo, Uniforme
        Promocional, Abadás"
      />
      <Header />
      <Panel images={information.banners || []} />
      <section className="py-12 container mx-auto px-5 xl:px-0 max-w-6xl">
        <div className="flex gap-5 items-center justify-center">
          {!information.simulatorImage
            ? ""
            : information.simulatorImage.map((sim) => (
                <div
                  className="rounded-md overflow-hidden shadow max-w-lg h-fit w-full"
                  key={sim.id}
                >
                  <a className="cursor-pointer">
                    <Image
                      src={sim.url}
                      width={713}
                      height={449}
                      layout="responsive"
                      alt="Braz Multimidia"
                    />
                  </a>
                </div>
              ))}
        </div>

        <div className="w-full py-10 flex flex-col items-center text-center">
          <strong className="text-marinho-500 heading font-bold font-serif">
            VEJA NOSSOS MODELOS
          </strong>
          <span className="text-sm md:text-base">
            Uniformes para diferentes utilidades, escolha o que melhor lhe
            atender
          </span>
        </div>
        <Cards categories={information.categories || []} />
      </section>

      <section className="py-10 bg-gradient-to-r from-marinho-500 to-rose-700 relative hidden lg:block border-b-2 border-b-orange-500">
        <div className="container mx-auto px-5 max-w-6xl xl:px-0">
          <div className="rounded-md relative mt-20 xl:mt-16">
            <div className="overflow-hidden rounded-md">
              <Image
                src="/img/home/jumbo_bg.jpg"
                width={1628}
                height={308}
                layout="responsive"
                alt="Braz Multimidia"
                quality={100}
              />
            </div>

            <div className="grid grid-cols-[200px_1fr] z-10 absolute bottom-0 px-10 items-end gap-5">
              <div className="w-[200px]">
                <Image
                  src="/img/home/jumbo_one.png"
                  width={297}
                  height={427}
                  layout="responsive"
                  alt="Braz Multimidia"
                  quality={100}
                />
              </div>

              <div className="p-5">
                <strong className="text-yellow-200 font-black text-6xl xl:text-7xl block">
                  SIMULADOR 24 HORAS
                </strong>
                <div className="flex items-center gap-10 mt-5">
                  <div className="flex items-center gap-3 text-2xl font-bold text-white">
                    <CircleWavyCheck />
                    <span>MOBILE</span>
                  </div>
                  <div className="flex items-center gap-3 text-2xl font-bold text-white">
                    <CircleWavyCheck />
                    <span>DESKTOP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full relative bg-marinho-500 bg-jumbotronIndex bg-cover bg-center bg-no-repeat">
        <div className="bg-gradient-to-b from-black to-transparent bg-opacity-50 py-10">
          <div className="container mx-auto px-5 xl:px-0 max-w-6xl text-center text-white text-lg sm:text-xl md:text-2xl">
            <strong className="text-white font-black heading text-center w-full block mb-10">
              QUEM SOMOS
            </strong>

            <p className="mb-3">
              A Braz Multimídia é uma empresa especializada na fabricação e
              comercialização de uniformes.
            </p>
            <p className="mb-3">
              Com fábricas situadas na região de Brasília - DF, a Braz
              Multimídia atua em todo o território brasileiro e veste diversas
              empresas, eventos, times, alunos e etc, no país.
            </p>
            <p>
              A qualidade estampada em nossos produtos é resultado de um
              constante trabalho de pesquisa que busca inovações, tecnologias e
              tendências do mercado, para que, interagindo com os clientes,
              possamos oferecer o que há de melhor em uniformes e personalizados
              no Brasil.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-10 px-3 md:px-10 mt-10">
              {!information.imagesWhoIAm
                ? ""
                : information.imagesWhoIAm.map((image) => (
                    <div
                      className="w-full overflow-hidden rounded-md"
                      key={image.id}
                    >
                      <Image
                        src={image.url}
                        width={778}
                        height={583}
                        layout="responsive"
                        alt="Braz Multimidia"
                      />
                    </div>
                  ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-5 xl:px-0 max-w-6xl">
          <strong className="w-full block text-white text-center heading">
            VEJA PASSO A PASSO
          </strong>
          <span className="w-full block text-white text-center text-base">
            DESDE O MOMENTO DA ESCOLHA ATÉ O RECEBIMENTO EM SUA CASA
          </span>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-5 md:gap-0 md:pb-10">
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
              <a className="text-orange-500 font-semibold mt-2 hover:underline cursor-pointer">
                Nossos modelos
              </a>
              <a className="text-orange-500 font-semibold hover:underline cursor-pointer">
                Catálogos
              </a>
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
              <a className="text-orange-500 font-semibold mt-2 hover:underline cursor-pointer">
                Fale conosco
              </a>
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

      <Footer />
    </Fragment>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await clientQuery.query(FIND_INDEX_PAGE, {}).toPromise();

  return {
    props: {
      information: {
        simulatorImage: data.imagePages[0].simulatorImage || [],
        imagesWhoIAm: data.imagePages[0].imagesWhoIAm || [],
        banners: data.banners || [],
        categories: data.categories || [],
      },
    },
    revalidate: 120,
  };
};
