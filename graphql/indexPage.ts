import { gql } from "urql";

const FIND_INDEX_PAGE = gql`
  query FindIndex {
    imagePages(last: 1) {
      simulatorImage {
        id
        url
      }
      imagesWhoIAm {
        id
        url
      }
    }
    banners(where: { page: Index }, last: 10) {
      id
      desktop {
        id
        url
      }
      mobile {
        id
        url
      }
      redirect
      page
    }
    categories(last: 8) {
      id
      name
      image {
        id
        url
      }
    }
  }
`;

const FIND_ALL_CATEGORIES = gql`
  query FindCategories {
    categories(last: 50, orderBy: name_ASC) {
      id
      name
      image {
        id
        url
      }
    }
    products(last: 50, orderBy: name_ASC) {
      id
      name
    }
  }
`;

const FIND_OTHER_BANNER = gql`
  query FindBanner {
    banners(where: { page: Outras }, last: 1) {
      id
      desktop {
        id
        url
      }
      mobile {
        id
        url
      }
    }
  }
`;

const FIND_PRODUCT_BANNER = gql`
  query FindBanner {
    banners(where: { page: Produto }, last: 1) {
      id
      desktop {
        id
        url
      }
      mobile {
        id
        url
      }
    }
  }
`;

const FIND_PRODUCTS_BANNER = gql`
  query FindBanner {
    banners(where: { page: Produtos }, last: 1) {
      id
      desktop {
        id
        url
      }
      mobile {
        id
        url
      }
    }
  }
`;

const FIND_CART_BANNER = gql`
  query FindBanner {
    banners(where: { page: Carrinho }, last: 1) {
      id
      desktop {
        id
        url
      }
      mobile {
        id
        url
      }
    }
  }
`;

const FIND_CATALOG_BANNER = gql`
  query FindBanner {
    banners(where: { page: Catalogo }, last: 1) {
      id
      desktop {
        id
        url
      }
      mobile {
        id
        url
      }
    }
  }
`;

export {
  FIND_INDEX_PAGE,
  FIND_ALL_CATEGORIES,
  FIND_OTHER_BANNER,
  FIND_PRODUCT_BANNER,
  FIND_PRODUCTS_BANNER,
  FIND_CART_BANNER,
  FIND_CATALOG_BANNER,
};
