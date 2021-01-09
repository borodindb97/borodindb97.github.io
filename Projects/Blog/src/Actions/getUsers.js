import axios from 'axios'

export default function getUsers() {
    return {
        type: 'GET_USERS',
        payload: axios.get('https://jsonplaceholder.typicode.com/users').then(response => response.data)
            .catch(err => {
                console.log('Пользователи не получены: ' + err)
            })
    }
}