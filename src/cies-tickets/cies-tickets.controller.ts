import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { TicketCiesService } from './cies-tickets.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { ROLES } from 'src/common/constants/roles.constants';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RegisterTicket } from './entity/create-ticket.entity';

@ApiTags('Tickets CIES')
@ApiBearerAuth()
@Auth(ROLES.ADMIN_ROLE)
@Controller('tickets-cies')
export class TicketCiesController {
  constructor(private readonly ticketCiesService: TicketCiesService) {}

  @Get('ticket/:date')
  @ApiOperation({ summary: 'Obtener fichas por fecha' })
  @ApiParam({ name: 'Date', description: 'Fecha para obtener las fichas' })
  @ApiResponse({ status: 200, description: 'Lista de fichas obtenida exitosamente.' })
  getTicketsByDate(@Param('Date') fecha: string) {
    return this.ticketCiesService.getTicketsByDate(fecha);
  }

  @Post('registerTicket')
  @ApiOperation({ summary: 'Registrar una nueva ficha' })
  @ApiResponse({ status: 201, description: 'Ficha registrada exitosamente.' })
  @ApiBody({
    description: 'Cuerpo de la solicitud para registrar una ficha',
    type: RegisterTicket,
    examples: {
      example1: {
        summary: 'Ejemplo de una ficha',
        value: {
          id_paciente: 1,
          id_medico: 2,
          id_servicio: 3,
          fecha: '2024-09-19'
        }
      }
    }})
  registerTicket(@Body() ticketData: any) {
    return this.ticketCiesService.registerTicket(ticketData);
  }

  @Put('cancelTicket/:ticket_id')
  @ApiOperation({ summary: 'Cancelar una ficha por ID' })
  @ApiParam({ name: 'ticket_id', description: 'ID de la ficha a cancelar' })
  @ApiResponse({ status: 200, description: 'Ficha cancelada exitosamente.' })
  cancelTicket(@Param('ticket_id') id_ficha: number) {
    return this.ticketCiesService.cancelTicket(id_ficha);
  }
}
