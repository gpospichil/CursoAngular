import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';

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
    this.oferaSevice.getComoUsarOfertaPorId(this.route.parent?.snapshot.params['id'])
      .then((descricao: any) => {
        this.comoUsar = descricao
      })
  }

}
