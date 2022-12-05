type ImagesProps = {
  id: string;
  url: string;
};

type BannersProps = {
  id: string;
  desktop: ImagesProps;
  mobile: ImagesProps;
  redirect?: string | null;
};

type CategoriesProps = {
  id: string;
  name: string;
  image: ImagesProps;
};

interface ImagesPagesProps {
  banners: BannersProps[];
  simulatorImage: ImagesProps[];
  imagesWhoIAm: ImagesProps[];
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
  images: ImagesProps[];
}

interface CatalogProps {
  id: string;
  images: ImagesProps[];
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
  banners: BannersProps[];
  categories: CategoriesPageProps[];
  category: CategoryProps;
}

type ModelingsProps = {
  id: string;
  title: string;
  description: string;
  image: ImagesProps;
};

type MeasurementsProps = {
  id: string;
  title: string;
  image: ImagesProps;
};

type InformationProps = {
  html: string;
};

type ProductInformationProps = {
  id: string;
  name: string;
  description: string;
  images: ImagesProps[];
  categories: CategoriesProps[];
  information?: InformationProps | null;
  price: number;
  video?: string | null;
  modelings: ModelingsProps[];
  measurements: MeasurementsProps[];
  collections: CatalogProps[];
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
  banners: BannersProps | null;
  product: ProductInformationProps | null;
  productSizeVariants: ProductsSizeVariantsProps[];
  portfolios: PortifolioProps[];
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
