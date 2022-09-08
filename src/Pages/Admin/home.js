import React from 'react'
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";

const LOGOUT = gql`
  mutation {
    logout{
      message
    }
  }
`;
const DELETE = gql`
  mutation ($id:ID!){
    deleterole(id:$id){
      id
    }
  }
`;
const Home = () => {
  const [logoutUser, { data, loading, error }] = useMutation(LOGOUT);
  const [deleteUser, { }] = useMutation(DELETE);
  const navigate = useNavigate();

  const deleteRole=()=>{
    deleteUser({
      variables:{
        id:1
      }
    }).then(res=>{
      console.log(res.message)
    }).catch(err=>{
      console.log(err.graphQLErrors[0])
    })

  }
  const logout=()=>{
    logoutUser({
      variables:{
      }
    }).then(res=>{
      // console.log(res)
      const data=res.json()
    }).then(data=>{
      console.log(data)
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <div>Home
      <button onClick={logout}>logout</button>
      <button onClick={deleteRole}>delete</button>
    </div>
  )
}

export default Home