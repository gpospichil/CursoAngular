import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from './ofertas.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app2-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  // private tempoObservableSubscription!: Subscription
  // private meuObservableTesteSubscription!: Subscription

  public oferta!: Oferta

  constructor(private route: ActivatedRoute,
    private ofertaService: OfertasService
  ) { }  

  ngOnInit(): void {

    this.ofertaService.getOfertaPorId(this.route.snapshot.params['id'])
      .then((oferta: any) => {
        this.oferta = oferta
        console.log(this.oferta)
      })

    // let tempo = interval(1000)

    // this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => {
    //   console.log(intervalo)
    // })

    // let meuObservableTeste = Observable.create((observer: Observer<number>) => {
    //   observer.next(1)
    //   observer.next(2)
    //   observer.complete()
    //   observer.next(3)
    // })

    // this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
    //   (resultado: number) => console.log(resultado),
    //   (erro: string) => console.log(erro),
    //   () => console.log('Stream de eventos foi finalizado')
    // )
  }
  
  ngOnDestroy(): void {
    // this.tempoObservableSubscription.unsubscribe()
    // this.meuObservableTesteSubscription.unsubscribe()
  }
}
