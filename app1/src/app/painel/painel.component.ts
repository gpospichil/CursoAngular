import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  @Output()
  public encerrarJogo: EventEmitter<string> = new EventEmitter()

  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public progresso: number = 0
  public resposta: string = ''
  public rodada: number = 0
  public rodadaFrase!: Frase;
  public tentativas: number = 3

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta(): void {
    if (this.rodadaFrase.frasePtBr === this.resposta) {

      this.rodada++
      this.progresso += (100 / this.frases.length)

      if (this.rodada === 4) {
        this.encerrarJogo.emit('Vitoria')
      }

      this.atualizaRodada()

    } else {

      this.tentativas--

      if (this.tentativas === -1) {
        this.encerrarJogo.emit('Derrota')
      }
    }
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada]
    this.resposta = ''
  }

}
