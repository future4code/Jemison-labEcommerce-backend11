import {app} from './app'
import {postUserAdd} from './endpoints/postUsersAdd'
import {getAllUsers} from './endpoints/getAllUsers'
import {postProductAdd} from './endpoints/postProductAdd'
import {getAllProducts} from './endpoints/getAllProducts'
import { postPurchaseAdd } from './endpoints/postPurchaseAdd'
import {getUserPurchases} from './endpoints/getUserPurchases'

app.post('/users', postUserAdd)

app.get('/users', getAllUsers)

app.post('/products', postProductAdd )

app.get('/products', getAllProducts)

app.post('/purchases', postPurchaseAdd)

app.get('/users/:user_id/purchases', getUserPurchases)