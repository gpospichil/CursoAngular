import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { OfertasService } from '../shared/ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { of } from 'rxjs';

@Component({
  selector: 'app2-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas!: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((termo: string) => {
          if (termo === '') {
            return of<Oferta[]>([])
          }
          return this.ofertasService.pesquisaOfertas(termo)
        }),
        catchError((erro: any) => {
          console.log(erro)
          return of<Oferta[]>([])
        })
      )
  }

  public pesquisa(termoBusca: string): void {
    this.subjectPesquisa.next(termoBusca)
  }

  public limpaPesquisa(): void{
    this.subjectPesquisa.next()
  }

}
