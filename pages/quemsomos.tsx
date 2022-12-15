import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { Info } from "phosphor-react";
import { Fragment } from "react";
import Footer from "../components/layout/Footer";
import HeadApp from "../components/layout/Head";
import Header from "../components/layout/Header";
import { api, baseURL } from "../configs";
import { BannersProps } from "../types";

interface Props {
  banner: BannersProps | null;
}

const Who: NextPage<Props> = ({ banner }) => {
  return (
    <Fragment>
      <HeadApp
        title="Quem somos | Braz Camiseteria | Uniforme Empresarial, Uniforme Esportivo, Uniforme
        Promocional, Abadás"
      />
      <Header />

      {!banner ? (
        <div className="bg-gradient-to-b h-52 from-marinho-500 to-marinho-900 flex justify-center items-center flex-col px-5 text-white text-center">
          <Info className="text-7xl" />
          <strong className="text-3xl mt-2">QUEM SOMOS</strong>
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
            />
          </div>
        </>
      )}

      <section className="my-10 container mx-auto max-w-4xl px-5 xl:px-0">
        <div className="flex items-center justify-center">
          <div className="w-52">
            <Image
              src="/img/logo.svg"
              width={115}
              height={50}
              alt="Braz Multimídia"
              layout="responsive"
            />
          </div>
        </div>

        <strong className="heading text-marinho-500 block mt-10 w-full border-b pb-1 border-b-marinho-500 mb-5">
          Quem somos?
        </strong>
        <p className="text-lg text-justify leading-loose indent-5">
          A Braz Multimídia é uma empresa especializada na fabricação e
          comercialização de uniformes.
        </p>
        <p className="text-lg text-justify leading-loose indent-5">
          Com fábricas situadas na região de Brasília - DF, a Braz Multimídia
          atua em todo o território brasileiro e veste diversas empresas,
          eventos, times, alunos e etc, no país.
        </p>
        <p className="text-lg text-justify leading-loose indent-5">
          A qualidade estampada em nossos produtos é resultado de um constante
          trabalho de pesquisa que busca inovações, tecnologias e tendências do
          mercado, para que, interagindo com os clientes, possamos oferecer o
          que há de melhor em uniformes e personalizados no Brasil.
        </p>

        <strong className="heading text-marinho-500 block mt-10 w-full border-b pb-1 border-b-marinho-500 mb-5">
          Nossa estrutura
        </strong>
        <p className="text-lg text-justify leading-loose indent-5">
          A Braz Multimídia orgulha-se de empregar em seus processos produtivos
          e administrativos, tecnologias e equipamentos de ponta no mercado, a
          fim de tornar sua operação mais rápida, ágil e principalmente
          eficiente. Desde o primeiro contato, os dados do cliente e de seu
          pedido são inseridos em um sistema de gestão online que é acessado
          pela equipe interna em todos os setores.
        </p>
        <p className="text-lg text-justify leading-loose indent-5">
          Desta forma, são minimizados as chances de desencontro de informações
          e consequentemente, erros nos pedidos. Na produção o cliente conta com
          mais tecnologia. Nossa fábrica trabalha com os equipamentos mais
          modernos dentre os quais se destacam os de impressão digital para
          sublimação, bordado, corte, costura e serigrafia. Além disso, emprega
          insumos de primeira qualidade em todos os componentes das peças,
          aliando assim, beleza e conforto em todos os produtos.
        </p>
      </section>

      <Footer />
    </Fragment>
  );
};

export default Who;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${baseURL}/fromOthersPageBanner`);
  const data = await response.json();
  return {
    props: {
      banner: data || null,
    },
    revalidate: 120,
  };
};
