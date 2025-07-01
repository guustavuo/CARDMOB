import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert } from 'react-native';

const BASE_URL = 'http://10.81.205.4:3000';

export default function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}`);
      const data = await response.json();
      setProducts(data.catalog || []);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (!name.trim() || !price) return;

    try {
      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price: parseFloat(price), enabled: true }),
      });
      if (response.ok) {
        setName('');
        setPrice('');
        fetchProducts();
      } else {
        console.error('Erro ao adicionar produto');
      }
    } catch (error) {
      console.error('Erro ao adicionar:', error);
    }
  };

  const updateProduct = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName, price: parseFloat(editPrice) }),
      });
      if (response.ok) {
        setEditId(null);
        setEditName('');
        setEditPrice('');
        fetchProducts();
      } else {
        console.error('Erro ao atualizar produto');
      }
    } catch (error) {
      console.error('Erro ao atualizar:', error);
    }
  };

  const deleteProduct = async (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Deseja realmente excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
              if (response.ok) fetchProducts();
              else console.error('Erro ao excluir');
            } catch (error) {
              console.error('Erro ao excluir:', error);
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => {
    if (item.id !== editId) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.name} - R${item.price?.toFixed(2)}</Text>
          <View style={styles.buttons}>
            <Button title='Editar' onPress={() => {
              setEditId(item.id);
              setEditName(item.name);
              setEditPrice(item.price.toString());
            }} />
            <Button title='Excluir' onPress={() => deleteProduct(item.id)} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.item}>
          <TextInput
            style={styles.editInput}
            value={editName}
            onChangeText={setEditName}
            placeholder="Nome"
          />
          <TextInput
            style={styles.editInput}
            value={editPrice}
            onChangeText={setEditPrice}
            placeholder="Preço"
            keyboardType='numeric'
          />
          <Button title='Salvar' onPress={() => updateProduct(item.id)} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Produtos</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder='Nome do produto'
      />
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder='Preço'
        keyboardType='numeric'
      />
      <Button title='Adicionar Produto' onPress={addProduct} />

      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        style={styles.list}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  list: {
    marginTop: 20,
  },
  item: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editInput: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
});
