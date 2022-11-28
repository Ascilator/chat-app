import { UpdateMessagesDto } from './dto/updateMessagesDto';
import { Room } from './rooms.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room) private roomRepository: typeof Room) {}

  async getRoomByValue(roomId: string) {
    const room = await this.roomRepository.findOne({ where: { roomId } });
    return room;
  }

  async updateMessages(dto: UpdateMessagesDto) {
    const room = await this.roomRepository.findOne({
      where: { roomId: dto.roomId },
    });
  }
}
