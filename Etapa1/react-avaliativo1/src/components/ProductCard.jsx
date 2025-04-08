import React from 'react';

function ProductCard({ id, nome, preco, onEdit, onDelete }) {
  return (
    <div>
      <p><strong>Nome:</strong> {nome}</p>
      <p><strong>Preço:</strong> {preco}</p>
      <button onClick={() => onEdit(id)}>Editar</button>
      <button onClick={() => onDelete(id)}>Excluir</button>
      <button onClick={() => alert("Produto adicionado ao carrinho")}>Adicionar ao carrinho</button>
    </div>
  );
}

export default ProductCard;