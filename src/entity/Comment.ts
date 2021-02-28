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
  @ManyToOne('Post', 'comments')
  post: Post
  @ManyToOne('User', 'comments')
  user: User
}
