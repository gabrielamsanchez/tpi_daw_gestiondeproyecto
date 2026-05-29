import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ClienteService } from '../services/clientes.service';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { AuthGuardGuard } from '../../../auth/guards/auth-guard.guard'; // Verifica que esta ruta sea la correcta en tu árbol

@ApiTags('Clientes')
@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  // Crear cliente
  @ApiBearerAuth('token')
  @UseGuards(AuthGuardGuard)
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Cliente creado exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos.',
  })
  async create(@Body() createClienteDto: CreateClienteDto) {
    return await this.clienteService.create(createClienteDto);
  }

  // Obtener todos los clientes
  @ApiBearerAuth('token')
  @UseGuards(AuthGuardGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de clientes devuelta exitosamente.',
  })
  async findAll() {
    return await this.clienteService.findAll();
  }

  // Obtener un cliente por su ID
  @ApiBearerAuth('token')
  @UseGuards(AuthGuardGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del cliente',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cliente encontrado.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cliente no encontrado.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.clienteService.findOne(id);
  }

  // Actualizar un cliente
  @ApiBearerAuth('token')
  @UseGuards(AuthGuardGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un cliente existente' })
  @ApiParam({
    name: 'id',
    description: 'ID del cliente a modificar',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cliente actualizado correctamente.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cliente no encontrado.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    return await this.clienteService.update(id, updateClienteDto);
  }

  // Eliminar cliente (Baja Lógica)
  @ApiBearerAuth('token')
  @UseGuards(AuthGuardGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar un cliente (Baja Lógica)' })
  @ApiParam({
    name: 'id',
    description: 'ID del cliente a eliminar',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cliente eliminado correctamente.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cliente no encontrado.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.clienteService.remove(id);
  }
}
