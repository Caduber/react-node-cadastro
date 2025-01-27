
import GlobalStyle from "./styles/global"
import styled from "styled-components"
import Form from "./components/Form.js"
import { toast, ToastContainer } from "react-toastify"
import Grid from "./components/Grid.js"
import "react-toastify/dist/ReactToastify.css"
import {useEffect, useState} from "react"
import axios from "axios"

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  gap: 10px;
`
const Title = styled.h2``

function App() {
  
  const [users, setUsers] = useState([])
  const [onEdit, setOnEdit] = useState(null)


  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800")
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)))
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [setUsers])

  return (
    <>
      <Container>
          <Title>Usuários</Title>
          <Form getUsers={getUsers} onEdit={onEdit} setOnEdit={setOnEdit} />
          <Grid users={users} setUsers={setUsers}/>
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left"/>
      <GlobalStyle />
    </>
  )
}

export default App;
