import axios from 'axios'

export default function getComments() {
    return {
        type: 'GET_COMMENTS',
        payload: axios.get('https://jsonplaceholder.typicode.com/comments').then(response => response.data)
            .catch(err => {
                console.log('Комментарии не получены: ' + err)
            })
    }
}