import { UpdateMessagesDto } from './dto/updateMessagesDto';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private roomService: RoomsService) {}

  @Get('/:value')
  getRoomByValue(@Param('roomId') roomId: string) {
    return this.roomService.getRoomByValue(roomId);
  }

  @Post()
  updateMessages(@Body() dto: UpdateMessagesDto) {
    return this.roomService.updateMessages(dto);
  }
}
