import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../../shared/ofertas.service';

@Component({
  selector: 'app2-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = ''

  constructor(private route: ActivatedRoute,
    private oferaSevice: OfertasService
  ) { }

  ngOnInit(): void {

    this.route.parent?.params.subscribe((params: Params) => {
      this.oferaSevice.getComoUsarOfertaPorId(params.id)
        .then((descricao: any) => {
          this.comoUsar = descricao
        })
    })
  }

}
