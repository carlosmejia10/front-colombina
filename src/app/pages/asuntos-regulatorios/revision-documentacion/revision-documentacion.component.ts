
import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { NgFor } from '@angular/common';
import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';
import { DocumentoService } from '@/app/servicios/documento.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-revision-documentacion',
  standalone: true,
  imports: [NgFor],
  templateUrl: './revision-documentacion.component.html',
  styleUrls: ['./revision-documentacion.component.css'] // Corrige styleUrl a styleUrls
})
export class RevisionDocumentacionComponent implements OnInit { // Implementa OnInit
  documentos: DocumentoDTO[] = []; // Inicializa como un array vacío

  constructor(private route: ActivatedRoute,private documentoService:DocumentoService){}
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        console.log("recibido" + id)
        this.cargarArchivos(id);
      } else {
        console.error('ID no válido en la ruta');
      }
    });
}

cargarArchivos(id: number): void {
  this.documentoService.findAll(id).subscribe(
    (data: DocumentoDTO[]) => {
      console.log('Datos recibidos:', data); // Agrega esta línea
      this.documentos = data;
    },
    (error) => {
      console.error('Error al cargar los archivos:', error);
    }
  );
}


}