import {createConnection} from 'typeorm'

const promise = (async function () {
  return createConnection()
})()

export const getDatabaseConnection = async () => {
  return promise
}