import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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

  public oferta!: Oferta

  constructor(private route: ActivatedRoute,
    private ofertaService: OfertasService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.ofertaService.getOfertaPorId(params.id)
        .then((oferta: any) => {
          this.oferta = oferta
        })
    })
  }

  ngOnDestroy(): void {
  }
}
