import {
  Body,
  Controller,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TareasService } from '../tareaservice/tareaservice.service';
import { CreateTareaDto } from '../dtos/input/create-tarea-dto';
import { UpdateTareaDto } from '../dtos/input/update-tarea-dto';
import { AuthGuardGuard } from '../../../auth/auth-guard/auth-guard.guard';

@Controller('tareacontroller')
export class TareacontrollerController {
  constructor(private readonly tareasService: TareasService) {}

  //crear tarea
  @ApiBearerAuth()
  @UseGuards(AuthGuardGuard)
  @Post()
  async createTarea(
    @Param('idProyecto', ParseIntPipe) idProyecto: number,
    @Body() dto: CreateTareaDto,
  ): Promise<{ id: number }> {
    return await this.tareasService.crearTarea(dto, idProyecto);
  }

  //actualizar
  @ApiBearerAuth()
  @UseGuards(AuthGuardGuard)
  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTareaDto,
  ): Promise<void> {
    return await this.tareasService.actualizarTarea(dto, id);
  }

  //eliminar
  @ApiBearerAuth()
  @UseGuards(AuthGuardGuard)
  @Delete(':id')
  async eliminarTarea(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.tareasService.eliminarTarea(id);
  }
}
