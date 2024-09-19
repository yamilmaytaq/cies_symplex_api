export class RegisterTicket {
    id_paciente: number;
    id_medico: number;
    id_servicio: number;
    fecha: Date;
  
    constructor(id_paciente: number, id_medico: number, id_servicio: number, fecha: Date) {
      this.id_paciente = id_paciente;
      this.id_medico = id_medico;
      this.id_servicio = id_servicio;
      this.fecha = fecha;
    }
  }
  