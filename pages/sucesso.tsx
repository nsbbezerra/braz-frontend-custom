import {
  CircleWavyCheck,
  Copy,
  ShoppingBag,
  WhatsappLogo,
} from "phosphor-react";
import { Fragment, useState } from "react";
import Footer from "../components/layout/Footer";
import HeadApp from "../components/layout/Head";
import Header from "../components/layout/Header";
import { useRouter } from "next/router";
import Link from "next/link";
import { configs } from "../configs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Toast from "../components/layout/Toast";
import Button from "../components/layout/Button";

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

export default function Sucesso() {
  const { query } = useRouter();
  const { order } = query;

  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);

  const handleCopy = () => {
    setToast({
      title: "Informação",
      message: `O valor: ${order} foi copiado para a área de transferência`,
      type: "info",
    });
    setOpenToast(true);
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
      <div className="bg-gradient-to-b h-52 from-green-400 to-green-700 flex justify-center items-center flex-col px-5 text-white text-center">
        <CircleWavyCheck className="text-7xl" />
        <strong className="text-3xl mt-2">PEDIDO FINALIZADO COM SUCESO!</strong>
      </div>

      <div className="container mx-auto px-5 xl:px-0 max-w-3xl mt-10 mb-10">
        <div className="flex items-center justify-center flex-col text-2xl text-center">
          <span>Este é o número do seu pedido:</span>
          <strong className="flex items-center gap-3 text-3xl text-orange-500">
            {order}{" "}
            <CopyToClipboard text={order as string} onCopy={() => handleCopy()}>
              <button className="rounded-full bg-gray-200 w-7 h-7 text-base flex items-center justify-center text-gray-900">
                <Copy />
              </button>
            </CopyToClipboard>
          </strong>

          <span className="mt-10">
            Agora copie o número do seu pedido e entre em contato conosco para
            proseguirmos para o pagamento, ou clique no botão abaixo para
            iniciar o atendimento via Whatsapp
          </span>

          <Link
            href={`https://api.whatsapp.com/send?phone=${configs.phone}&text=Ola realizei meu pedido com o numero: ${order}`}
            passHref
          >
            <a
              className="mt-5 bg-green-600 text-white rounded-full py-3 px-5 flex items-center gap-4 cursor-pointer hover:bg-green-700 active:bg-green-600 select-none"
              target={"_blank"}
            >
              <WhatsappLogo />
              Fale conosco agora
            </a>
          </Link>

          <span className="mt-10">
            <strong>
              É de suma importância você guardar o número do pedido
            </strong>
            , para poder verificar posteriormente o status e os detalhes do
            mesmo. Caso queira verificar os detalhes clique no botão abaixo:
          </span>

          <div className="flex justify-center mt-5">
            <Link href={`/minhascompras?order=${order}`}>
              <a>
                <Button buttonSize="lg">
                  <ShoppingBag />
                  Ver compra
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
