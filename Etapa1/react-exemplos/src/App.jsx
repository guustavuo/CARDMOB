import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'

function App() {
  const [count, setCount] = useState(0)


  const updateCount = () => {
    //outros comando
    return count + 1;
  }

  const updateCount1 = () => count + 1; //return é implicito

  const dados = {
    "nome": "fulano",
    "atualiza": (novo_nome) => `Nome nome é ${novo_nome}`,
    "endereço": {
      "rua": "xyz",
      "numero": "111",
      "complementos": ["casa", "na esquina do supermercado"]
    }
  }; //é um objeto js
  dados.atualiza("gerson");
  dados.endereço.complementos[1];


  return (
    <>
    <Counter title="Contando..." />
    <Counter initial="100" />
    </>
  )
}

export default App
