import express from 'express'
import path from 'path'
import {requestTime, logger} from './midllewares.js'
import serverRoutes from './routes/servers.js'

const PORT = process.env.PORT ?? 3000
const __dirname = path.resolve()

// Init Express
const app = express()

app.set('view engine' , 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'))

// Adding middleware
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(requestTime)
app.use(logger)

app.use(serverRoutes)

app.get('/', (req, res) => {
    res.render('index', {title: 'Main Page', active: 'main'})
})

app.get('/features', (req, res) => {
    res.render('features', {title: 'Feature Page', active: 'features'})
})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})