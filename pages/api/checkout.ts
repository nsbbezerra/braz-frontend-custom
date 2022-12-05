// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CREATE_ORDER, PUBLISH_ORDER } from "../../graphql/order";
import { clientMutation } from "../../lib/urql";

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
  name: string;
  phone: string;
  city: string;
  state: string;
  information?: string;
  email: string;
  total: number;
  items: Cart[];
  statusSale: string;
};

type Data = {
  id?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { order, items } = req.body;

  const orderParsed: Order = JSON.parse(order);
  const itemsParsed: Cart[] = JSON.parse(items);

  const orderToSave: Order = {
    items: itemsParsed,
    city: orderParsed.city,
    email: orderParsed.email,
    name: orderParsed.name,
    phone: orderParsed.phone,
    state: orderParsed.state,
    total: orderParsed.total,
    information: orderParsed.information,
    statusSale: "Negociando",
  };

  try {
    const { data: dataCreateOrder, error: errorCreateOrder } =
      await clientMutation.mutation(CREATE_ORDER, orderToSave).toPromise();
    if (errorCreateOrder) {
      res.status(400).json({
        message: `Ocorreu um erro ao salvar o pedido: ${errorCreateOrder.message}`,
      });
    }

    const orderID = dataCreateOrder.createOrder.id;

    const { error: errorPublishOrder } = await clientMutation
      .mutation(PUBLISH_ORDER, { id: orderID })
      .toPromise();

    if (errorPublishOrder) {
      res.status(400).json({
        message: `Ocorreu um erro ao publicar o pedido: ${errorPublishOrder.message}`,
      });
    }
    res.status(200).json({
      message: "Pedido realizado, aguarde para visualizar suas informações",
      id: orderID,
    });
  } catch (error) {
    res.status(400).json({ message: "Ocorreu um erro ao finalizar o pedido" });
  }
}
