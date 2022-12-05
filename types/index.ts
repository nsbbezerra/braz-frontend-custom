type ImagesProps = {
  id: string;
  url: string;
};

type BannersProps = {
  id: string;
  banner: string;
  redirect?: string | null;
};

type CategoriesProps = {
  id: string;
  name: string;
  thumbnail: string;
  Products: ProductsProps[];
};

interface ImagesPagesProps {
  banners: BannersProps[];
  categories: CategoriesProps[];
}

type ProductsCategoryPageProps = {
  id: string;
  name: string;
  price: number;
  images: ImagesProps[];
};

interface ProductsProps {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
}

interface CatalogProps {
  id: string;
  image: string;
}

type CategoriesPageProps = {
  id: string;
  name: string;
};

type CategoryProps = {
  id: string;
  name: string;
  products: ProductsCategoryPageProps[];
};

interface ProductsPageProps {
  banner: BannersProps;
  categories: CategoriesPageProps[];
  category: CategoryProps;
}

type ModelingsProps = {
  id: string;
  title: string;
  description: string;
  image: string;
};

type SizesProps = {
  id: string;
  size: string;
};

type SizeTablesProps = {
  id: string;
  table: string;
};

type ProductInformationProps = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: CategoriesProps;
  shortDescription?: string;
  price: number;
  video?: string | null;
  Modeling: ModelingsProps[];
  Sizes: SizesProps[];
  Catalogs: CatalogProps[];
  SizeTables: SizeTablesProps[];
};

type ProductsSizeVariantsProps = {
  id: string;
  name: string;
  size: string;
};

type PortifolioProps = {
  id: string;
  image: ImagesProps;
};

interface ProductInformationPageProps {
  banner: BannersProps | null;
  product: ProductInformationProps | null;
}

export type {
  ImagesPagesProps,
  ImagesProps,
  CategoriesProps,
  BannersProps,
  ProductsPageProps,
  ProductsProps,
  CatalogProps,
  ProductInformationPageProps,
};
