class ItemCarrinho {
    constructor(
        public id: Number,
        public img: Img,
        public titulo: string,
        public descricao_oferta: string,
        public valor: number,
        public quantidade: number
    ) { }    

    subTotal(): number {
        return this.quantidade * this.valor
    }
}

interface Img {
    url: any        
}

export { ItemCarrinho }