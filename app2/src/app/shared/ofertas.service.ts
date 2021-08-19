import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { URL_API } from "../app.api"
import { Oferta } from "./oferta.model"
import { map, retry } from "rxjs/operators"

@Injectable({ providedIn: 'root' })
export class OfertasService {

    constructor(private http: HttpClient) { }

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get<Oferta[]>(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: any) => resposta)
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get<Oferta[]>(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: any) => resposta)
    }

    public getOfertaPorId(id: number): Promise<Oferta[]> {
        return this.http.get<Oferta[]>(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: any) => {
                return resposta.shift()
            })
    }

    public getComoUsarOfertaPorId(id: number): Promise<Oferta[]> {
        return this.http.get<Oferta[]>(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: any) => {
                return resposta.shift().descricao
            })
    }

    public getOndeFicaOfertaPorId(id: number): Promise<Oferta[]> {
        return this.http.get<Oferta[]>(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: any) => {
                return resposta.shift().descricao
            })
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get<Oferta[]>(`${URL_API}/ofertas?titulo_like=${termo}`)
            .pipe(
                retry(10),
                map((resposta: any) => resposta)
            )
    }
}