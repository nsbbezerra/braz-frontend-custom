import Image from "next/image";
import Link from "next/link";
import {
  CaretDown,
  CircleNotch,
  House,
  IdentificationBadge,
  ImageSquare,
  Leaf,
  List,
  Phone,
  ShoppingCart,
  Tag,
  TShirt,
} from "phosphor-react";
import { Fragment, useContext, useEffect, useState, memo } from "react";
import * as Popover from "@radix-ui/react-popover";
import Drawer from "./Drawer";
import { useQuery } from "urql";
import { FIND_ALL_CATEGORIES } from "../../graphql/indexPage";
import { CategoriesProps } from "../../types";
import CartContext from "../../context/cart/cart";

interface ProductProps {
  id: string;
  name: string;
}

function Header() {
  const { cart } = useContext(CartContext);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);

  const [findCategoriesResults] = useQuery({
    query: FIND_ALL_CATEGORIES,
  });

  const { data, fetching } = findCategoriesResults;

  useEffect(() => {
    if (data) {
      setCategories(data.categories);
      setProducts(data.products);
    }
  }, [data]);

  const MenuItems = () => (
    <div className="flex items-center flex-col lg:flex-row gap-1 lg:gap-0">
      <Link href={"/"} passHref>
        <a className="menu-items">
          <House /> Início
        </a>
      </Link>
      <Link href={"/quemsomos"} passHref>
        <a className="menu-items">
          <IdentificationBadge /> Quem somos
        </a>
      </Link>
      <Popover.Root>
        <Popover.Trigger className="menu-items">
          <Tag /> Produtos <CaretDown />
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content className="Content-product lg:mt-8">
            {fetching ? (
              <div className="flex items-center justify-center p-5">
                <CircleNotch className="text-3xl animate-spin" />
              </div>
            ) : (
              <>
                {categories.length === 0 ? (
                  <div className="flex justify-center items-center flex-col gap-1">
                    <Leaf className="text-3xl" />
                    <span>Nada para mostrar</span>
                  </div>
                ) : (
                  <>
                    {categories.map((cat) => (
                      <div key={cat.id}>
                        <Link href={`/produtos/${cat.id}`} passHref>
                          <a className="menu-items-product uppercase">
                            <TShirt />
                            {cat.name}
                          </a>
                        </Link>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <Popover.Root>
        <Popover.Trigger className="menu-items">
          <ImageSquare /> Catálogos <CaretDown />
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content className="Content-product lg:mt-8">
            {fetching ? (
              <div className="flex items-center justify-center p-5">
                <CircleNotch className="text-3xl animate-spin" />
              </div>
            ) : (
              <>
                {products.length === 0 ? (
                  <div className="flex justify-center items-center flex-col gap-1">
                    <Leaf className="text-3xl" />
                    <span>Nada para mostrar</span>
                  </div>
                ) : (
                  <>
                    {products.map((cat) => (
                      <div key={cat.id}>
                        <Link href={`/produtos/catalogos/${cat.id}`} passHref>
                          <a className="menu-items-product uppercase">
                            <TShirt />
                            {cat.name}
                          </a>
                        </Link>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <Link href={"/faleconosco"} passHref>
        <a className="menu-items">
          <Phone /> Fale conosco
        </a>
      </Link>
      <a className="menu-items-sim">
        <TShirt /> Simulador
      </a>
    </div>
  );

  return (
    <Fragment>
      <header className="w-full sticky top-0 min-h-fit shadow-lg bg-white bg-opacity-80 backdrop-blur-sm z-20">
        <div className="container mx-auto pl-5 lg:px-5 xl:px-0 max-w-6xl flex items-center justify-between h-14">
          <Link href={"/"} passHref>
            <a className="w-[100px] flex">
              <Image
                src="/img/logo.svg"
                width={115}
                height={50}
                alt="Braz Multimídia"
              />
            </a>
          </Link>

          <div className="hidden lg:flex">
            <MenuItems />
            <button
              className="w-14 h-14 bg-marinho-500 text-white flex justify-center items-center text-3xl relative hover:bg-marinho-700 active:bg-marinho-500"
              onClick={() => setOpenCart(!openCart)}
            >
              <ShoppingCart />
              <span className="w-5 h-5 bg-white text-marinho-500 flex items-center justify-center text-xs rounded-full absolute top-2 right-2">
                {cart.length}
              </span>
            </button>
          </div>
          <div className="flex lg:hidden">
            <Popover.Root>
              <Popover.Trigger className="w-14 h-14 text-marinho-500 flex justify-center items-center text-3xl">
                <List />
              </Popover.Trigger>
              <Popover.Anchor />
              <Popover.Portal>
                <Popover.Content className="Content">
                  <MenuItems />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            <button
              className="w-14 h-14 bg-marinho-500 text-white flex justify-center items-center text-2xl relative hover:bg-marinho-700 active:bg-marinho-500"
              onClick={() => setOpenCart(!openCart)}
            >
              <ShoppingCart />
              <span className="w-5 h-5 bg-white text-marinho-500 flex items-center justify-center text-xs rounded-full absolute top-2 right-2">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      <Drawer isOpen={openCart} items={cart || []} onClose={setOpenCart} />
    </Fragment>
  );
}

export default memo(Header);
