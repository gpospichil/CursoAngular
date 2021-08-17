import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { URL_API } from "../app.api"
import { Oferta } from "../shared/oferta.model"

@Injectable({ providedIn: 'root' })
export class OfertasService {

    constructor(private http: HttpClient) { }

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: any) => resposta)
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
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
}