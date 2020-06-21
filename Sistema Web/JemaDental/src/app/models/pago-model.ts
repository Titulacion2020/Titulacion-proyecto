export interface PagosInterface {
  id?: string;
  fechaPago?: any;
  cedulaPaciente?: string;
  nombrePaciente?: string;
  seguro?:string;
  valorPagar?: number; 
  valorPago?: number;  
  valorPendiente?: number;
  ultimoValorCancelado?: number; 
  tratamiento?:string; 
}
