import { ApiProperty } from "@nestjs/swagger";
import { EstadosClientesEnum } from "../../enum/estados-cliente-enum";

export class ListClienteDTO {

    @ApiProperty()
    id!: number;

    @ApiProperty()
    nombre!: string;

    @ApiProperty()
    estado!: EstadosClientesEnum;

}