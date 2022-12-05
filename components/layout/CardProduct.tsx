import Image from "next/image";
import Link from "next/link";
import { Leaf, ShoppingCart } from "phosphor-react";
import { ProductsProps } from "../../types";

interface Props {
  products: ProductsProps[];
}

export default function CardsProduct({ products }: Props) {
  const calcPrice = (price: number) => {
    let transform = price / 100;
    return transform.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <>
      {products.length === 0 ? (
        <div className="flex p-10 flex-col gap-5 justify-center items-center">
          <Leaf className="text-7xl animate-bounce" />
          <span>Nenhuma informação para mostrar</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {products.map((prod) => (
            <div className="card" key={prod.id}>
              <div>
                <Image
                  src={prod.images[0].url}
                  width={600}
                  height={600}
                  layout="responsive"
                  alt="Braz Multimidia"
                />
              </div>
              <div className="p-2 md:p-4">
                <strong className="text-center text-sm sm:text-base font-extrabold w-full block uppercase">
                  {prod.name}
                </strong>

                <strong className="text-center text-sm sm:text-base w-full block font-light">
                  {calcPrice(prod.price)}
                </strong>

                <Link href={`/produtos/produto/${prod.id}`} passHref>
                  <a className="card-action-button-orange">
                    <ShoppingCart /> COMPRAR
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
