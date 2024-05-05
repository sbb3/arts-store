import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation insert_user($email: String!, $password: String!, $name: String) {
    insert_users_one(
      object: { email: $email, password: $password, name: $name }
    ) {
      id
      email
      name
      role
    }
  }
`;

export const FIND_USER_BY_EMAIL_QUERY = gql`
  query FindUserByEmail($email: String!) {
    users(distinct_on: email, where: { email: { _eq: $email } }) {
      id
      name
      email
      password
      role
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      image
      description
      reviews
    }
  }
`;

export const GET_PAGINATED_PRODUCTS_QUERY = gql`
  query GetProducts($limit: Int!, $offset: Int!) {
    products(limit: $limit, offset: $offset) {
      id
      name
      price
      image
      description
      reviews
    }
    products_aggregate {
      aggregate {
        count
      }
    }
  }
`;
