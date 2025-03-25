import React, { useState } from "react";

const TodoList = ({ name }) => {
    const [todos, setTodo] = useState([]);
    const [task, setTask] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    // callbacks do CRUD

    // CREATE
    const addTodo = () => {
        if (task.trim() === "") return;
        setTodo([...todos, {id: Date.now(), text: task}]);
        setTask("");
    }

    // Read =>
        // não vamos ter callback pois será gerada uma listagem 

    // Read
    const startEditing = ( id, text) => {
        setEditingId(id);
        setEditingText(text);
    }

    // Update
    const saveEdit = () => {
        setTodo(
            todos.map((todo) =>
                todo.id === editingId ? { ...todo, text: editingText} : todo
            )
        );
        setEditingId(null);
        setEditingText("");
    }

    // Delete
    const deleteTodo = (id) => {
        setTodo(todos.filter((todo) => todo.id !== id))
    }

    // Cancel editing
    const cancelediting = () => {
        setEditingId(null);
        setEditingText("");
    }

    return (
        <div style={{textAlign: "center", marginTop: "50px"}}>
            <h2>A fazer: {name}</h2>
            <input
                type="text"
                value={task}
                onChange={(event) => setTask(event.target.value)}
                placeholder="escreva sua tarefa..."            
            />
            <button onClick={addTodo}>Incluir tarefa</button>
            <ul style={{ listStyle: "nome", padding: 0}}>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ margin: "10px 0"}}>
                        {editingId === todo.id ? (
                            <>
                            <input
                                type="text"
                                value={editingText}
                                onChange={(event) => setEditingText(event.target.value)}
                            />
                            <button onClick={saveEdit}>Salvar</button>
                            <a href="#" onClick={cancelediting}>Cancelar</a>
                            </>
                        ) : (
                            <>
                                {todo.text}
                                <button onClick={() => startEditing(todo.id, todo.text)}>editar</button>
                                <button onClick={() => deleteTodo(todo.id)}>excluir</button>
                            </>
                        ) }
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default TodoList;