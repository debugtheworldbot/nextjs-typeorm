import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import {Post} from './Post'
import {User} from './User'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column('text')
  content: string
  @CreateDateColumn('time')
  createdAt: Date
  @CreateDateColumn('time')
  UpdatedAt: Date
  @ManyToOne(type => Post, post => post.comments)
  post: Post
  @ManyToOne(type => User, user => user.comments)
  user: User
}
