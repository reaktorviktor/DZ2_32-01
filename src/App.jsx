import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const ADD_USER = 'ADD_USER'
const addUser = (name, email, password) => ({
    type: ADD_USER,
    payload: { name, email, password }
})
const initialState = {
    users: []
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        default:
            return state
    }
}
const store = createStore(reducer)
const UserForm = ({ addUser }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        addUser(name, email, password)
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="user-form">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Почта"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
            />
            <button onClick={handleSubmit}>Добавить</button>
        </div>
    )
}
const UserTable = ({ users }) => (
    <table className="user-table">
        <thead>
        <tr>
            <th>Имя</th>
            <th>Почта</th>
            <th>Пароль</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user, index) => (
            <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
            </tr>
        ))}
        </tbody>
    </table>
)
const mapStateToProps = (state) => ({
    users: state.users
})
const mapDispatchToProps = (dispatch) => ({
    addUser: (name, email, password) => dispatch(addUser(name, email, password))
})
const ConnectedUserForm = connect(null, mapDispatchToProps)(UserForm)
const ConnectedUserTable = connect(mapStateToProps)(UserTable)
const App = () => (
    <Provider store={store}>
        <div>
            <h2>Добавление пользователей</h2>
            <ConnectedUserForm />
            <h2>Таблица пользователей</h2>
            <ConnectedUserTable />
        </div>
    </Provider>
)
export default App;
import './App.css';

