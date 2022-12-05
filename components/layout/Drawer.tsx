import Image from "next/image";
import Link from "next/link";
import { Leaf, ShoppingBag, ShoppingCart, Trash, X } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cart/cart";
import Button from "./Button";
interface Cart {
  id: string;
  category: string;
  product: string;
  thumbnail: string;
  name: string;
  quantity: number;
  total: number;
  size: string;
}

interface Props {
  isOpen: boolean;
  items: Cart[];
  onClose: (data: boolean) => void;
}

export default function Drawer({ isOpen, items, onClose }: Props) {
  const { setCart } = useContext(CartContext);
  const [total, setTotal] = useState<number>(0);

  const calcPrice = (price: number) => {
    let transform = price / 100;
    return transform.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  const removeFromCart = (id: string) => {
    const result = items.filter((obj) => obj.id !== id);
    setCart(result);
  };

  useEffect(() => {
    const sum = items.reduce((a, b) => +a + +b.total, 0);
    setTotal(sum);
  }, [items]);

  return (
    <div
      className={`fixed bg-black bg-opacity-50 right-0 left-0 bottom-0 top-0 ${
        isOpen ? "ml-0" : "-ml-[-100%]"
      } z-40 transition-all delay-200 flex justify-end`}
    >
      <div className="bg-white h-full w-full max-w-xs sm:max-w-md shadow-xl shadow-black relative max-h-[100%]">
        <div className="overflow-auto pb-24 h-full max-h-full">
          <div className="p-3 flex items-center justify-between bg-orange-500 text-white sticky top-0 z-10">
            <div className="flex items-center gap-3 font-bold">
              <ShoppingCart />
              MEU CARRINHO
            </div>
            <button className="text-xl" onClick={() => onClose(false)}>
              <X />
            </button>
          </div>

          <div className="px-4 py-2">
            {items.length === 0 ? (
              <div className="flex justify-center items-center flex-col gap-1">
                <Leaf className="text-4xl" />
                <span>Nada para mostrar</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 divide-y">
                {items.map((item) => (
                  <div
                    className="grid grid-cols-[80px_1fr] gap-5 items-start py-2"
                    key={item.id}
                  >
                    <div className="w-full">
                      <Image
                        src={item.thumbnail}
                        width={600}
                        height={600}
                        layout="responsive"
                        alt="Braz Multimidia"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <strong>{item.name}</strong>
                        <span>{calcPrice(item.total)}</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <p>{item.size}</p>
                          <p>Categoria: {item.category}</p>
                          <p>QTD: {item.quantity}</p>
                        </div>
                        <Button
                          buttonSize="sm"
                          scheme="error"
                          variant="outline"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="px-4 py-2 border-t absolute bottom-0 right-0 left-0 bg-white">
          <div className="flex items-center justify-between mb-2 px-2 font-serif text-xl font-bold">
            <span>Total</span>
            <span>{calcPrice(total)}</span>
          </div>
          <Link href={"/checkout"}>
            <Button isFullSize buttonSize="lg">
              <ShoppingBag />
              Finalizar pedido
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
