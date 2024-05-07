import express from 'express'

const PORT = 3000

const app = express()

app.get('/', (_req, res) => {
    console.log('Request received')
    res.send('Hello World!')
})

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))