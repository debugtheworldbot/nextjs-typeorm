import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {User} from './User'
import {Comment} from './Comment'

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column('varchar')
  title: string
  @Column('text')
  content: string
  @CreateDateColumn()
  createdAt: Date
  @CreateDateColumn()
  updatedAt: Date
  @ManyToOne('User', 'posts')
  author: User
  @OneToMany('Comment', 'post')
  comments: Comment[]

  errors = {
    title: [] as string[],
    content: [] as string[]
  }

  validate () {
    if (!this.title) {
      console.log(this.title)
      this.errors.title.push(`title can't be empty`)
    }
    if (!this.content) {
      this.errors.content.push(`content can't be empty`)
    }


    return this.errors

  }

  hasErrors () {
    return !!Object.values(this.errors).find(value => value.length > 0)
  }
}
