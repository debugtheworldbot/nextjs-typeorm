import {createConnection, getConnectionManager} from 'typeorm'

const promise = (async function () {
  const manger = await getConnectionManager()
  if (manger.has('default')) {
    const current = manger.get('default')
    if (current.connect()) {
      return current
    }
  }
  return createConnection()
})()

export const getDatabaseConnection = async () => {
  return promise
}