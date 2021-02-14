import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import {Post} from './Post'
import {User} from './User'

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column('text')
  content: string
  @CreateDateColumn()
  createdAt: Date
  @CreateDateColumn()
  updatedAt: Date
  @ManyToOne(type => Post, post => post.comments)
  post: Post
  @ManyToOne(type => User, user => user.comments)
  user: User
}
