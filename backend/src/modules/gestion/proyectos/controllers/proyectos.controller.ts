import { Body, Controller, Post, Get, Put, Delete, Param, ParseIntPipe, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProyectosService } from '../services/proyectos.service';
import { CreateProyectoDto } from '../dtos/input/create-proyecto.dto';
import { UpdateProyectoDto } from '../dtos/input/update-proyecto.dto';
import { AuthGuardGuard } from '../../../auth/guards/auth-guard.guard';
import { Proyecto } from '../entities/proyecto.entity'; // Ajusta la ruta a tu Guard
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { ROLES } from '../../../auth/decorators/roles.decorators';
import { RolUsuario } from '../../usuarios/enum/rol-usuario.enum';

@ApiTags('Proyectos')
@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  // Crear proyecto
  @ApiBearerAuth('token')
  @UseGuards(AuthGuardGuard)
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo proyecto' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Proyecto creado exitosamente.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos inválidos o el nombre ya existe.' })
  async createProyecto(@Body() dto: CreateProyectoDto): Promise<{ id: number }> {
    return await this.proyectosService.crearProyecto(dto);
  }

  // Obtener todos
  @ApiBearerAuth('token')
  @UseGuards(AuthGuardGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener todos los proyectos' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de proyectos devuelta exitosamente.' })
  async obtenerProyectos() {
    return await this.proyectosService.obtenerTodos();
  }

  // Obtener uno
  @ApiBearerAuth('token')
  @UseGuards(AuthGuardGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proyecto por su ID' })
  @ApiParam({ name: 'id', description: 'ID del proyecto', example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: 'Proyecto encontrado.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Proyecto no encontrado.' })
  async obtenerUnProyecto(@Param('id', ParseIntPipe) id: number) {
    return await this.proyectosService.obtenerPorId(id);
  }

//   // Actualizar
//   @ApiBearerAuth('token')
//   @UseGuards(AuthGuardGuard)
//   @Put(':id')
//   @HttpCode(HttpStatus.NO_CONTENT)
//   @ApiOperation({ summary: 'Actualizar un proyecto existente' })
//   @ApiParam({ name: 'id', description: 'ID del proyecto', example: 1 })
//   @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Proyecto actualizado correctamente.' })
//   @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Proyecto no encontrado.' })
//   async actualizarProyecto(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() dto: UpdateProyectoDto,
//   ): Promise<void> {
//     return await this.proyectosService.actualizarProyecto(id, dto);
//   }

//   // Eliminar (Baja Lógica)
//   @ApiBearerAuth('token')
//   @UseGuards(AuthGuardGuard)
//   @Delete(':id')
//   @HttpCode(HttpStatus.NO_CONTENT)
//   @ApiOperation({ summary: 'Eliminar un proyecto (Baja Lógica)' })
//   @ApiParam({ name: 'id', description: 'ID del proyecto', example: 1 })
//   @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Proyecto eliminado.' })
//   async eliminarProyecto(@Param('id', ParseIntPipe) id: number): Promise<void> {
//     await this.proyectosService.eliminarProyecto(id);
//   }
// }

// Actualizar (Corregido a 200 OK devolviendo el proyecto)
  @ApiBearerAuth('token')
  @UseGuards(AuthGuardGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK) // Cambiado de NO_CONTENT a OK
  @ApiOperation({ summary: 'Actualizar un proyecto existente' })
  @ApiParam({ name: 'id', description: 'ID del proyecto', example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: 'Proyecto actualizado correctamente.', type: Proyecto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Proyecto no encontrado.' })
  async actualizarProyecto(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProyectoDto,
  ): Promise<Proyecto> { // Ahora retorna el Proyecto modificado
    return await this.proyectosService.actualizarProyecto(id, dto);
  }

  // Eliminar - Baja Lógica (Corregido a 200 OK devolviendo confirmación)
  @ApiBearerAuth('token')
  @UseGuards(AuthGuardGuard, RolesGuard)
  @ROLES(RolUsuario.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.OK) // Cambiado de NO_CONTENT a OK
  @ApiOperation({ summary: 'Eliminar un proyecto (Baja Lógica)' })
  @ApiParam({ name: 'id', description: 'ID del proyecto', example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: 'Proyecto eliminado lógicamente de forma correcta.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Proyecto no encontrado.' })
  async eliminarProyecto(@Param('id', ParseIntPipe) id: number) {
    return await this.proyectosService.eliminarProyecto(id);
  }
}
