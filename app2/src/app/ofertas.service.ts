import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { MEAT_API } from "./app.api"
import { Oferta } from "./shared/oferta.model"

@Injectable({providedIn: 'root'})
export class OfertasService {

    constructor(private http: HttpClient) { }    

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${MEAT_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: any) => resposta)
    }

    // public getOfertas(): Observable<Oferta[]> {
    //     return this.http.get<Oferta[]>(`${MEAT_API}/ofertas`)
    // }    
}