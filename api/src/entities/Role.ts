import {
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
  } from 'typeorm';
  
  import is from 'utils/validation';
  import {User } from '.';
  
  @Entity()
  class Role extends BaseEntity {
    static validations = {
      name: [is.required(), is.maxLength(100)],
    };
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('varchar')
    name: string;
  
    @Column('text', { nullable: true })
    description: string | null;
  
    @OneToMany(
      () => User,
      user => user.project,
    )
    users: User[];
  }
  
  export default Role;
  