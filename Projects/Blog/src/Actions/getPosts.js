import axios from 'axios'

export default function getPosts() {
    return {
        type: 'GET_POSTS',
        payload: axios.get('https://jsonplaceholder.typicode.com/posts').then(response => response.data)
            .catch(err => {
                console.log('Посты не получены: ' + err)
            })
    }
}