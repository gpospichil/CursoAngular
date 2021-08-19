import { ItemCarrinho } from "./item-carrinho.model"
import { Oferta } from "./oferta.model"

class CarrinhoService {

    public itens: ItemCarrinho[] = []

    public exibirItens(): ItemCarrinho[] {
        return this.itens
    }

    public incluirItem(oferta: Oferta) {
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        )

        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id == itemCarrinho.id)

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1
        } else {
            this.itens.push(itemCarrinho)
        }
    }
    
    //Usei método de outro curso (Restaurants)
    public totalCarrinhoCompras(): number {

        return this.itens.map(item => item.subTotal()).reduce((prev, subTotal) => prev + subTotal, 0)
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho) {
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id == itemCarrinho.id)

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1
        }
    }

    public diminiuirQuantidade(itemCarrinho: ItemCarrinho) {
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id == itemCarrinho.id)

        if (itemCarrinhoEncontrado && itemCarrinhoEncontrado.quantidade > 0) {
            itemCarrinhoEncontrado.quantidade -= 1

            if (itemCarrinhoEncontrado.quantidade === 0) {
                this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1)
            }
        }
    }

    public limparCarrinho(){
        this.itens = []
    }
}

export { CarrinhoService }