import { Package, Truck } from "phosphor-react";
import { Fragment } from "react";

export default function Pedidos() {
  return (
    <Fragment>
      <div className="flex items-center flex-col gap-2 mt-16 w-full">
        <span className="block heading text-marinho-500 text-center">
          PEDIDOS E PRAZOS
        </span>
        <div className="border-marinho-500 border-b-2 w-36" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-10 mt-10 w-full container mx-auto max-w-4xl mb-10">
        <div className="flex gap-5 border-4 border-marinho-500 rounded-md p-4">
          <div className="text-7xl w-full flex items-center justify-center text-marinho-500">
            <Truck />
          </div>
          <div>
            <strong className="font-serif text-lg text-marinho-500 block">
              Produção e Entrega
            </strong>
            <span className="block">
              O Tempo médio de produção de camisa de time é de 20 á 22 Dias
              úteis. Para sua comodidade nós enviamos nossos produtos para Todo
              Brasil.
            </span>
          </div>
        </div>
        <div className="flex gap-5 border-4 border-marinho-500 rounded-md p-4">
          <div className="text-7xl w-full flex items-center justify-center text-marinho-500">
            <Package />
          </div>
          <div>
            <strong className="font-serif text-lg text-marinho-500 block">
              Pedido mínimo
            </strong>
            <span className="block">
              A Quantidade mínima por pedido de uniformes personalizados são de
              30 unidades. Conseguimos atender pedidos de grande porte com
              entrega rápida.
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
