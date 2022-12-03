import {app} from './app'
import {postUserAdd} from './endpoints/postUsersAdd'
import {getAllUsers} from './endpoints/getAllUsers'

app.post('/users', postUserAdd)

app.get('/users', getAllUsers)