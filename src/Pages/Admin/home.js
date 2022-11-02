import React from 'react'
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import { DELETE, LOGOUT } from '../../GraphQl/graphql';
import Navbar from '../../Component/Navbar'
const Home = () => {
  // const [logoutUser, {client, data, loading, error }] = useMutation(LOGOUT);
  // const [deleteUser, { }] = useMutation(DELETE);
  // const navigate = useNavigate();
  // const deleteRole=()=>{
  //   deleteUser({
  //     variables:{
  //       id:1
  //     }
  //   }).then(res=>{
  //     console.log(res.message)
  //   }).catch(err=>{
  //     console.log(err.graphQLErrors[0])
  //   })

  // }
  // const logout=()=>{
  //   logoutUser({
  //     variables:{
  //     }
  //   }).then(res=>{
  //     console.log(res.data.logout.message)
  //     console.log(client)
  //     client.resetStore()
  //     sessionStorage.clear()
  //     navigate("/")
  //   }).catch(err=>{
  //     console.log(err)
  //   })
  // }
  return (
    <div>
      {/* Home
      <button onClick={logout}>logout</button>
      <button onClick={deleteRole}>delete</button> */}
      <Navbar/>
    </div>
  )
}

export default Home