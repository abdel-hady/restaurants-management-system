import { gql } from "@apollo/client";
const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      token_info {
        access_token
        refresh_token
      }
    }
  }
`;
export default LOGIN;
export const FORGET = gql`
  mutation ($email: String!) {
    resetemail(email: $email)
  }
`;
export const RESET = gql`
  mutation ($id: ID!, $password: String!) {
    changepassword(id: $id, password: $password) {
      message
    }
  }
`;
export const DELETE = gql`
  mutation ($id: ID!) {
    deleterole(id: $id) {
      id
    }
  }
`;
export const LOGOUT = gql`
  mutation {
    logout {
      message
    }
  }
`;
