import "reflect-metadata";
import {createConnection} from "typeorm";
import {Post} from './entity/Post'
// import {User} from "./entity/User";

createConnection().then(async connection => {
  const posts = await connection.manager.find(Post)
  if (posts.length===0){
    await connection.manager.save([1,2,3,4,5,6,7,8,9,10,11].map(n=>new Post({title:`${n}th Post`,content:`${n}th content`})))
    console.log('seeding success.')
  }
  await connection.close()
}).catch(error => console.log(error));
