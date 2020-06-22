export interface SolicitudInterface {
    id?: string;
    nombreSolicitante?: string;
    cedulaSolicitante?: string;
    emailSolicitante?: string;
    fechaSolicitud?: number;
    descripcion?: string;
    tipoSolicitud?: string;
    estadoSolicitud?: string;
    respuesta?: string;
}
