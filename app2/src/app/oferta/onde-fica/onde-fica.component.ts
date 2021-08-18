import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app2-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [OfertasService]
})
export class OndeFicaComponent implements OnInit {

  public ondeFica: string = ''

  constructor(private route: ActivatedRoute,
    private oferaSevice: OfertasService
  ) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params: Params) => {
      this.oferaSevice.getOndeFicaOfertaPorId(params.id)
        .then((descricao: any) => {
          this.ondeFica = descricao
        })
    })

  }

}
