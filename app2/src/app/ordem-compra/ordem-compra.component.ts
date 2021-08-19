import { Component, OnInit } from '@angular/core';
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrdemCompraService } from './ordem-compra.service';
import { CarrinhoService } from '../shared/carrinho.service';
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app2-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {
  /* FormControl aceita 3 parâmetros opcionais:
  1 - Valor inicial do campo
  2 - Array de validadores
  3 - Array de validadores assíncronos
  */

  public formulario: FormGroup = new FormGroup({
    "endereco": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    "numero": new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    "complemento": new FormControl(null),
    "formaPagamento": new FormControl(null, Validators.required)
  })

  public idPedidoCompra!: number
  public itensCarrinho: ItemCarrinho[] = []
  public totalCarrinhoCompras: number = 0

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens()
  }

  public confirmarCompra(): void {

    if (this.formulario.status === 'INVALID') {
      // Método para Angular 4 ou anterior
      // this.formulario.get('endereco').markAsTouched()
      // this.formulario.get('numero').markAsTouched()
      // this.formulario.get('complemento').markAsTouched()
      // this.formulario.get('formaPagamento').markAsTouched()

      // Método para versão atual do Angular
      this.formulario.controls.endereco.markAsTouched()
      this.formulario.controls.numero.markAsTouched()
      this.formulario.controls.complemento.markAsTouched()
      this.formulario.controls.formaPagamento.markAsTouched()
    } else {

      if (this.carrinhoService.exibirItens().length === 0) {
        alert('Você não selecionou nenhum item!')
      } else {

        let pedido: Pedido = new Pedido(
          this.formulario.value.endereco,
          this.formulario.value.numero,
          this.formulario.value.complemento,
          this.formulario.value.formaPagamento,
          this.itensCarrinho
        )
        this.ordemCompraService.efetivarCompra(pedido)
          .subscribe((idPedido: number) => {
            this.carrinhoService.limparCarrinho()
            this.idPedidoCompra = idPedido
          })
      }
    }
  }

  public adicionar(item: ItemCarrinho) {
    this.carrinhoService.adicionarQuantidade(item)
  }

  public diminuir(item: ItemCarrinho) {
    this.carrinhoService.diminiuirQuantidade(item)
  }

  //Usei método de outro curso (Restaurants)
  //Incluí este méttodo pois não estava conseguindo utilizar o carrinhoService diretamente no template
  public total(): number {
    return this.totalCarrinhoCompras = this.carrinhoService.totalCarrinhoCompras()
  }

  //Incluí este méttodo pois não estava conseguindo utilizar o carrinhoService diretamente no template
  public haItensNoCarrinho(): boolean {
    return this.carrinhoService.exibirItens().length > 0
  }
}
