import { gql, useMutation } from "@apollo/client";

export const CREATE_PRODUCT_MUTATION = gql`
  mutation AddProduct(
    $name: String!
    $description: String!
    $price: numeric!
    $image: String!
  ) {
    insert_products_one(
      object: {
        name: $name
        description: $description
        price: $price
        image: $image
      }
    ) {
      id
      name
      description
      price
      image
    }
  }
`;

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: Int!) {
    delete_products_by_pk(id: $id) {
      id
    }
  }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct(
    $id: Int!
    $name: String!
    $description: String!
    $price: numeric!
    $image: String!
  ) {
    update_products_by_pk(
      pk_columns: { id: $id }
      _set: {
        name: $name
        description: $description
        price: $price
        image: $image
      }
    ) {
      id
      name
      description
      price
      image
    }
  }
`;
