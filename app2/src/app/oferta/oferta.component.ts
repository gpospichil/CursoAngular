import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from './ofertas.service';

@Component({
  selector: 'app2-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit {

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

    // this.route.params.subscribe((param: any) => {console.log(param.id)})
  }

}
