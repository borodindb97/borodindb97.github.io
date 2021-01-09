import axios from "axios";

export default function getUser() {
    return {
        type: 'GET_USER',
        payload: axios.get(`https://jsonplaceholder.typicode.com${window.location.pathname}`).then(response => response.data)
            .catch(err => {
                console.log('Пользователь не получен: ' + err)
            })
    }
}