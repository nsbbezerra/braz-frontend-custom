import Image from "next/image";
import Link from "next/link";
import { CaretLeft, CaretRight, Leaf } from "phosphor-react";
import { Fragment, useRef } from "react";
import { CatalogProps } from "../../types";

interface Props {
  catalogs: CatalogProps | null;
  product: string | null;
}

export default function Carousel({ catalogs, product }: Props) {
  const carousel = useRef<HTMLDivElement>(null);

  const handeLeftClick = (e: any) => {
    e.preventDefault();
    if (carousel.current) {
      carousel.current.scrollLeft -= carousel.current?.offsetWidth || 0;
    }
  };

  const handeRightClick = (e: any) => {
    e.preventDefault();
    if (carousel.current) {
      carousel.current.scrollLeft += carousel.current?.offsetWidth || 0;
    }
  };

  return (
    <Fragment>
      {!catalogs ? (
        <div className="flex p-10 flex-col gap-5 justify-center items-center">
          <Leaf className="text-7xl animate-bounce" />
          <span>Nenhuma informação para mostrar</span>
        </div>
      ) : (
        <>
          <div
            className="mt-5 container mx-auto max-w-6xl carousel"
            ref={carousel}
          >
            {catalogs?.images.map((cat) => (
              <div className="carousel-item" key={cat.id}>
                <Image
                  src={cat.url}
                  width={600}
                  height={600}
                  layout="responsive"
                  alt="Braz Multimidia"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-5 justify-center mt-3">
            <button
              className="flex items-center gap-1 hover:underline"
              onClick={handeLeftClick}
            >
              <CaretLeft />
              Anterior
            </button>
            <button
              className="flex items-center gap-1 hover:underline"
              onClick={handeRightClick}
            >
              Próxima
              <CaretRight />
            </button>
          </div>
          <div className="flex justify-center">
            {product && (
              <Link href={`/produtos/catalogos/${product}`} passHref>
                <a className="card-action-button-orange w-fit px-4 mt-5">
                  VEJA O CATÁLOGO COMPLETO
                </a>
              </Link>
            )}
          </div>
        </>
      )}
    </Fragment>
  );
}
