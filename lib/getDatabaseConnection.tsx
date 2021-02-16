import {createConnection, getConnectionManager} from 'typeorm'
import {Post} from '../src/entity/Post'
import {User} from '../src/entity/User'
import {Comment} from '../src/entity/Comment'
import config from 'ormconfig.json'
import "reflect-metadata"

const promise = (async function () {
  const manger = await getConnectionManager()
  if (manger.has('default')) {
    const current = manger.get('default')
    if (current.connect()) {
      return current
    }
  }
  // @ts-ignore
  return createConnection({
    ...config,
    entities:[Post,User,Comment]
  })
})()

export const getDatabaseConnection = async () => {
  return promise
}