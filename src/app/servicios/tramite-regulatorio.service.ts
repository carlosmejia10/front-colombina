import { HttpClient } from "@angular/common/http";
import { Tramite } from "../modelos/tramite";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class TramiteService{
    constructor(
        private http: HttpClient
    ){}
    private baseUrl = 'http://localhost:8080/tramites';

    findAll(): Observable<Tramite[]>{
        return this.http.get<Tramite[]> ("http.//localhost:8090/api/tramites");
    }

    findById(id:number):Observable<Tramite>{
        return this.http.get<Tramite> ("http.//localhost:8090/api/tramites"+id);
    }

    addTramite(tramite:Tramite){
        this.http.post("http.//localhost:8090/api/tramites",tramite).subscribe;
    }

    updateTramite(tramite:Tramite){
        this.http.put("http.//localhost:8090/api/tramites/update",tramite).subscribe;
    }
    escalarTramite(idTramite: number): Observable<any> {
        return this.http.post(`${this.baseUrl}/${idTramite}/escalar`, {});
    }
}
