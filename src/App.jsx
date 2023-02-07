import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://node-five-tau.vercel.app'
});

function App() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  useEffect(() => {
    api.get("/").then((response) => {
      console.log(response.data);
      setUsers(response.data)
    })
  }, [])

  const newUser = () => {
    api.post("/ins", {
        name,
        age,
      })
      .then((response) => {
        console.log("Nome: " + response.data.name + " --- Idade: " + response.data.age);
        window.location.reload(true);
      })
  }

  return (
    <div>
      <h1>Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.name}>
            Nome: {user.name} - Idade: {user.age}
          </li>
        ))}
      </ul>
      <h2>Adicionar novo usuário</h2>

      <input type='text' placeholder='Nome' onChange={(event) => setName(event.target.value)} />
      <input type='text' placeholder='idade' onChange={(event) => setAge(event.target.value)} />
      <button onClick={newUser}>Adicionar</button>
    </div>
  )
}

export default App
