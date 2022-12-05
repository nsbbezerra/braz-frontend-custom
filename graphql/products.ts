import { gql } from "urql";

const FIND_CATEGORIES_PATH = gql`
  query FindCategoriesPath {
    categories(last: 50) {
      id
    }
  }
`;

const FIND_CATEGORIES_INFORMATION = gql`
  query FindCategoriesPath($id: ID!) {
    banners(where: { page: Produtos }) {
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
    categories(last: 50) {
      id
      name
    }
    category(where: { id: $id }) {
      id
      name
      products {
        id
        name
        price
        images {
          id
          url
        }
      }
    }
  }
`;

const FIND_PRODUCTS_PATH = gql`
  query FindProductsPath {
    products(last: 50) {
      id
    }
  }
`;

const FIND_PRODUCT_INFORMATION = gql`
  query FindProductInformation($id: ID!) {
    banners(where: { page: Produto }) {
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
    product(where: { id: $id }) {
      id
      name
      images {
        id
        url
      }
      categories {
        id
        name
      }
      description
      information {
        html
      }
      price
      video
      modelings(last: 3) {
        id
        title
        description
        image {
          id
          url
        }
      }
      measurements(last: 2) {
        id
        title
        image {
          id
          url
        }
      }
      collections(last: 1) {
        id
        images {
          id
          url
        }
      }
    }
    productSizeVariants(where: { product: { id: $id } }) {
      id
      name
      size
    }
    portfolios(last: 6) {
      id
      image {
        id
        url
      }
    }
  }
`;

const FIND_COLLECTION_INFORMATION = gql`
  query FindCollections($id: ID!) {
    banners(where: { page: Catalogo }) {
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
    collections(where: { product: { id: $id } }, last: 1) {
      id
      product {
        id
        name
      }
      images {
        id
        url
      }
    }
    categories(last: 50) {
      id
      name
      products {
        id
        name
      }
    }
  }
`;

export {
  FIND_CATEGORIES_PATH,
  FIND_CATEGORIES_INFORMATION,
  FIND_PRODUCTS_PATH,
  FIND_PRODUCT_INFORMATION,
  FIND_COLLECTION_INFORMATION,
};
