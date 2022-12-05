import Image from "next/image";
import Link from "next/link";
import { Leaf } from "phosphor-react";
import { CategoriesProps } from "../../types";

interface Props {
  categories: CategoriesProps[];
}

export default function Cards({ categories }: Props) {
  return (
    <>
      {categories.length === 0 ? (
        <div className="flex p-10 flex-col gap-5 justify-center items-center">
          <Leaf className="text-7xl animate-bounce" />
          <span>Nenhuma informação para mostrar</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {categories.map((cat) => (
            <Link href={`/produtos/${cat.id}`} passHref key={cat.id}>
              <div className="card cursor-pointer">
                <div>
                  <Image
                    src={cat.image.url}
                    width={600}
                    height={600}
                    layout="responsive"
                    alt="Braz Multimidia"
                  />
                </div>
                <div className="p-2 md:p-4">
                  <strong className="text-center text-sm sm:text-base font-extrabold w-full block uppercase">
                    {cat.name}
                  </strong>
                  <Link href={`/produtos/${cat.id}`} passHref>
                    <a className="card-action-button">VER PRODUTO</a>
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
