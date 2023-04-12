// User Model

import { Model } from 'pinia-orm'

export default class User extends Model {
  // entity is a required property for all models.
  static entity = 'users'

  // List of all fields (schema) of the post model. `this.string()` declares
  // a string field type with a default value as the first argument.
  // `this.uid()` declares a unique id if none provided.
  static fields () {
    return {
      id: this.uid(),
      name: this.string(''),
      email: this.string('')
    }
  }
  // For typescript support of the field include also the next lines
  declare id: string
  declare name: string
  declare email: string
}
