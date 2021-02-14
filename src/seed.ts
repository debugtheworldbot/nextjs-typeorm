import "reflect-metadata";
import {createConnection} from "typeorm";
import {Post} from './entity/Post'
import {User} from './entity/User'
// import {User} from "./entity/User";

createConnection().then(async connection => {
  const {manager} = connection
  const u1 = new User()
  u1.username='testName'
  u1.passwordDigest='testPassword'
  await manager.save(u1)
  console.log(u1.id)
  await connection.close()
}).catch(error => console.log(error));
