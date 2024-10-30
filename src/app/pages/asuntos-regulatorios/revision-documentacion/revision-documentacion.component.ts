import { Component, OnInit } from '@angular/core';
import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';
import { Router } from '@angular/router'; // Importamos el Router

@Component({
  selector: 'app-revision-documentacion',
  templateUrl: './revision-documentacion.component.html',
  styleUrls: ['./revision-documentacion.component.css'],
})
export class RevisionDocumentacionComponent implements OnInit {
  documentos: DocumentoDTO[] = [];

  constructor(private router: Router) {} // Inyectamos el Router en el constructor

  ngOnInit() {
    const documentoTexto = new DocumentoDTO(
      false,
      false,
      'informe_anual.txt',
      new File(['Contenido del informe'], 'informe_anual.txt', {
        type: 'text/plain',
      })
    );

    const documentoPDF = new DocumentoDTO(
      true,
      true,
      'presentacion.pdf',
      new File(['Contenido de la presentación'], 'presentacion.pdf', {
        type: 'application/pdf',
      })
    );

    this.documentos.push(documentoTexto, documentoPDF);
  }

  // Función para redirigir al componente de InfoControl
  continuar() {
    // Lógica que tengas adicional antes de redirigir (si aplica)
    console.log('Redirigiendo a Info Control...');
    this.router.navigate(['/info-control']);
  }

  regresar() {
    this.router.navigate(['/info-tramite']); // Redirige al componente de InfoTramite
  }

  revisarDocumento() {
    this.router.navigate(['/revision']); // Redirige a la página de revisión
  }
}
