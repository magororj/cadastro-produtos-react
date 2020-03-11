const PRODUTOS = '_PRODUTOS';

export function ErroValidacao(errors){
    this.errors = errors;
}

export default class ProdutosService {

    validar = (produto) => {
        const errors = []

        if(!produto.nome){
            errors.push("O campo Nome é Obrigatório.")
        }
        if(!produto.sku){
            errors.push("O campo SKU é Obrigatório.")
        }
        if(!produto.preco || produto.preco <= 0 ){
            errors.push("O campo Preço deve ter um valor maior que zero.")
        }

        if(!produto.fornecedor){
            errors.push("O campo Fornecedor é Obrigatório.")
        }

        if(errors.length > 0 ){
            throw new ErroValidacao(errors)
        }
    }



    salvar = (produto) => {

        this.validar(produto)

        let produtos = localStorage.getItem(PRODUTOS)

        if (!produtos){
            produtos = []
        }else {
            produtos = JSON.parse(produtos)
        }

        produtos.push(produto);

        localStorage.setItem(PRODUTOS, JSON.stringify(produtos) )
    }
}