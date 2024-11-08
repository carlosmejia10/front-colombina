export function nombreFlujo(flujo: string): string {
  switch (flujo) {
    case 'A1':
    case 'B1':
      return 'Solicitud de trámite';
    case 'A2':
    case 'B2':
      return 'Apertura del trámite';
    case 'A3':
    case 'B3':
      return 'Diligenciar información de control';
    case 'A4':
    case 'B4':
      return 'Revisión de documentación';
    case 'A5':
    case 'B5':
      return 'Consolidación/Radicación del trámite';
    case 'A6':
    case 'B6':
      return 'Seguimiento del trámite';
    case 'A7':
    case 'B7':
      return 'Aprobación del trámite (Entidad Sanitaria)';
    case 'A8':
    case 'B8':
      return 'Aprobación del trámite (Solicitante)';
    case 'A9':
      return 'Control posterior';
    default:
      return flujo;
  }
}

export function nombreCortoFlujo(flujo: string): string {
  switch (flujo) {
    case 'A1':
    case 'B1':
      return 'Solicitud';
    case 'A2':
    case 'B2':
      return 'Apertura';
    case 'A3':
    case 'B3':
      return 'Información de control';
    case 'A4':
    case 'B4':
      return 'Revisión de documentación';
    case 'A5':
    case 'B5':
      return 'Consolidación/Radicación';
    case 'A6':
    case 'B6':
      return 'Seguimiento';
    case 'A7':
    case 'B7':
      return 'Aprobación (Entidad Sanitaria)';
    case 'A8':
    case 'B8':
      return 'Aprobación (Solicitante)';
    case 'A9':
      return 'Control posterior';
    default:
      return flujo;
  }
}