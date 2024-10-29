
import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { NgFor } from '@angular/common';
import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';

@Component({
  selector: 'app-revision-documentacion',
  standalone: true,
  imports: [NgFor],
  templateUrl: './revision-documentacion.component.html',
  styleUrls: ['./revision-documentacion.component.css'] // Corrige styleUrl a styleUrls
})
export class RevisionDocumentacionComponent implements OnInit { // Implementa OnInit
  documentos: DocumentoDTO[] = []; // Inicializa como un array vacío

  ngOnInit() {
    // Crear una instancia de DocumentoDTO para un archivo de texto
    const documentoTexto = new DocumentoDTO(
        false,                       // aprobado
        false,                       // cumpleNormativas
        "informe_anual.txt",        // name
        new File(["Contenido del informe"], "informe_anual.txt", { type: "text/plain" }) // file
    );

    // Crear una instancia de DocumentoDTO para un archivo PDF
    const documentoPDF = new DocumentoDTO(
        true,                        // aprobado
        true,                        // cumpleNormativas
        "presentacion.pdf",         // name
        new File(["Contenido de la presentación"], "presentacion.pdf", { type: "application/pdf" }) // file
    );

    // Agregar documentos al array
    this.documentos.push(documentoTexto, documentoPDF);
}

}
