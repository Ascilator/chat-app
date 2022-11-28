import { CreateRoleDto } from './dto/createRoleDto';
import { RolesService } from './roles.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRoles(dto);
  }

  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
