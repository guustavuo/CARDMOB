import React, { useState } from 'react';
import ProductCard from './ProductCard';

function ProductList() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [editId, setEditId] = useState(null);

  const handleAddProduto = (e) => {
    e.preventDefault();
    if (editId) {
      // Atualizar produto existente
      setProdutos(
        produtos.map((produto) =>
          produto.id === editId ? { ...produto, nome, preco } : produto
        )
      );
      setEditId(null);
    } else {
      // Adicionar novo produto
      const newProductCard = {
        id: Date.now(),
        nome,
        preco,
      };
      setProdutos([...produtos, newProductCard]);
    }
    setNome('');
    setPreco('');
  };

  const handleEditProduto = (id) => {
    const produto = produtos.find((produto) => produto.id === id);
    setNome(produto.nome);
    setPreco(produto.preco);
    setEditId(id);
  };

  const handleDeleteProduto = (id) => {
    setProdutos(produtos.filter((produto) => produto.id !== id));
  };

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <form onSubmit={handleAddProduto}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Preco"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Atualizar' : 'Adicionar produto'}</button>
      </form>
      <div>
        {produtos.map((produto) => (
          <ProductCard
            key={produto.id}
            id={produto.id}
            nome={produto.nome}
            preco={produto.preco}
            onEdit={handleEditProduto}
            onDelete={handleDeleteProduto}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;