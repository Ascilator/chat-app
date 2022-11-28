import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

interface MessageCreationAttrs {
  message: string;
  sender: string;
}

@Table({ tableName: 'messages' })
export class Messages extends Model<Messages, MessageCreationAttrs> {
  @Column({
    type: DataType.STRING,
  })
  message: string;

  @Column({
    type: DataType.STRING,
  })
  sender: string;

  @ForeignKey(() => Room)
  @Column
  roomId: string;

  @BelongsTo(() => Room)
  room: Room;
}

@Table({ tableName: 'rooms' })
export class Room extends Model {
  @Column({
    type: DataType.STRING,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  roomId: string;

  @HasMany(() => Messages)
  messages: Messages[];
}
