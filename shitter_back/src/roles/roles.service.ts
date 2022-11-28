import { Role } from './roles.model';
import { CreateRoleDto } from './dto/createRoleDto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRoles(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({
      where: { value },
    });
    return role;
  }
}
