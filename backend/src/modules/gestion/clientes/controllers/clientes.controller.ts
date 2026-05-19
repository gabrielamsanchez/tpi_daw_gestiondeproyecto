import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateClienteDto } from "../dto/input/create-cliente.dto";
import { UpdateClienteDto } from "../dto/input/update-cliente.dto";
import { ListClienteDTO } from "../dto/outpout/list-cliente-dto";
import { EstadosClientesEnum } from "../enum/estados-cliente-enum";
import { ClientesService } from "../services/clientes.service";
import { AuthGuard } from "../../auth/guards/auth.guard";

@ApiTags('Clientes')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('clientes')
export class ClientesController {

    constructor(private readonly clientesService: ClientesService) { }

    @Post()
    @ApiCreatedResponse({ 
        description: 'Cliente creado con éxito.', 
        type: ListClienteDTO // <-- Swagger ahora sabe que la respuesta tiene la forma de este DTO
    })
    crearCliente(@Body() dto: CreateClienteDto): Promise<ListClienteDTO> { 
        // Indicamos que el controlador expone y promete devolver el DTO de salida
        return this.clientesService.crearCliente(dto); 
    }

    @Put(":id")
    @ApiNoContentResponse({ description: 'Cliente actualizado con éxito.' })
    actualizarCliente(
        @Param("id", ParseIntPipe) id: number, 
        @Body() dto: UpdateClienteDto
    ): Promise<void> {
        return this.clientesService.actualizarCliente(id, dto);
    }

    @Get()
    @ApiOkResponse({ type: ListClienteDTO, isArray: true, description: 'Lista de clientes obtenida.' })
    @ApiQuery({
        name: 'estado',
        required: false,
        enum: EstadosClientesEnum
    })
    obtenerClientes(@Query("estado") estado?: EstadosClientesEnum): Promise<ListClienteDTO[]> {
        return this.clientesService.obtenerClientes(estado);
    }
}