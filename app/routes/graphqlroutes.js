const express = require('express')
const graphqlRouter = express.Router()
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

graphqlRouter.get("/graphql", async (request, response) => {
    const url = 'https://api.spacex.land/graphql/'
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `{
                company {
                ceo
                }
                roadster {
                    apoapsis_au
                }
            }
        `
    })
    }

    fetch(url, options)
        .then(res => res.json())
        .then((result) => {
            console.log(result)
            response.send(result)
        })
})

module.exports = graphqlRouter