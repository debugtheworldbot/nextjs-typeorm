import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {Post} from './Post'
import {Comment} from './Comment'
import {getDatabaseConnection} from '../../lib/getDatabaseConnection'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column('varchar')
  username: string
  @Column('varchar')
  passwordDigest: string
  @CreateDateColumn()
  createdAt: Date
  @CreateDateColumn()
  updatedAt: Date
  @OneToMany(type => Post, post => post.author)
  posts: Post[]
  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[]
  errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[],
  }
  password: string
  passwordConfirmation: string

  async validate() {
    const trimName = this.username.trim()
    const connection = await getDatabaseConnection()
    const duplicated = await connection.manager.findOne(User, {username: this.username})
    if (!!duplicated) {
      this.errors.username.push('username has been token,please try to use another name')
    }
    if (trimName === '') {
      this.errors.username.push(`username can't be empty`)
    }
    if (!/[a-zA-Z0-9]/.test(trimName)) {
      this.errors.username.push('invalid username')
    }
    if (trimName.length > 42) {
      this.errors.username.push('too long')
    }
    if (trimName.length < 2) {
      this.errors.username.push('too short')
    }
    if (this.password === '') {
      this.errors.password.push(`password can't be empty`)
    }
    if (this.password.length < 6) {
      this.errors.password.push(`password is too short (minimum is 6 characters)`)
    }
    if (this.password !== this.passwordConfirmation) {
      this.errors.passwordConfirmation.push('Passwords do not match')
    }
    return this.errors
  }

  hasErrors() {
    return !!Object.values(this.errors).find(value => value.length > 0)
  }
}
