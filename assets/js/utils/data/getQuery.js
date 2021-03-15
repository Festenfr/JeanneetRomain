import { request } from 'graphql-request'
const cache = new Map()
const getQuery = async (graphqlUrl, query, variables = {}, dataName) => {
    if (cache.get(dataName)) {
        return cache.get(dataName)
    }
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        request(graphqlUrl, query, variables)
            .then((response) => {
                cache.set(dataName, response)
                resolve(response)
            })
            .catch((e) => {
                reject(e)
                throw e
            })
    })
}

export default getQuery
