import { UserRoles } from './../userRoles/userRoles.model';
import { User } from './../users/users.model';
import { Role } from './roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles])],
  exports: [RolesService],
})
export class RolesModule {}
