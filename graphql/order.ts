import { gql } from "urql";

const CREATE_ORDER = gql`
  mutation CreateOrder(
    $name: String!
    $email: String!
    $total: Int!
    $phone: String!
    $city: String!
    $state: String!
    $information: String!
    $items: Json!
    $statusSale: String!
  ) {
    createOrder(
      data: {
        name: $name
        email: $email
        total: $total
        phone: $phone
        city: $city
        state: $state
        information: $information
        items: $items
        statusSale: $statusSale
      }
    ) {
      id
    }
  }
`;

const FIND_ORDER = gql`
  query FindOrder($id: ID!) {
    order(where: { id: $id }) {
      id
      name
      phone
      email
      city
      state
      information
      items
      statusSale
      createdAt
      total
    }
  }
`;

const FIND_ORDERS_PAG = gql`
  query FindCount($page: Int!) {
    ordersConnection(skip: $page, last: 20) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        pageSize
      }
    }
    orders(skip: $page, last: 20) {
      id
      name
      phone
      email
      city
      state
      information
      items
      statusSale
      createdAt
      total
    }
  }
`;

const PUBLISH_ORDER = gql`
  mutation PublishOrder($id: ID!) {
    publishOrder(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

const UPDATE_STATUS = gql`
  mutation UpdateStatus($id: ID!, $statusSale: String!) {
    updateOrder(where: { id: $id }, data: { statusSale: $statusSale }) {
      id
    }
  }
`;

export {
  CREATE_ORDER,
  PUBLISH_ORDER,
  FIND_ORDER,
  FIND_ORDERS_PAG,
  UPDATE_STATUS,
};
