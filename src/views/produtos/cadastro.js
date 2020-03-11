import React, { Component } from 'react'
import ProdutosService from '../../app/produtoService'

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    errors: []
}

class CadastroProdutos extends React.Component {

   

    state = estadoInicial

    constructor(){
        super()
        this.service = new ProdutosService();
    }

    onChange = (event) => {
        const valor = event.target.value
        const nomedoCampo = event.target.name
        this.setState({ [nomedoCampo]: valor })
    }

    onSubmit = (event) => {
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor

        }
        try {
            this.service.salvar(produto)
            this.limparCampos()
            this.setState({ sucesso: true})
        }catch(erro){
           const errors =  erro.errors
           this.setState({errors: errors})
        }
    }

    limparCampos = () => {

        this.setState(
            estadoInicial
        )
    }

    render() {
        return(
            <div className="card">
                <div className="card-header">
                    cadastro de Produtos
                </div>
                <div className="card-body">

                    { this.state.sucesso && // se somente tem a testar verdadeiro basta && sem o operador ternario
                <div className="alert alert-dismissible alert-success">
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                            Cadastro realizado com sucesso!
                </div>
                    }   

                      { this.state.errors.length > 0  && // se somente tem a testar verdadeiro basta && sem o operador ternario

                        this.state.errors.map( msg => {
                            return (
                                <div className="alert alert-dismissible alert-danger">
                                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>Erro!</strong> {msg}
                                </div>
                            )
                            })
                            }      
   


                    <div className="row">
                        <div className="col-md-6">
                            <label>Nome: *</label>
                            <input 
                                onChange={this.onChange}
                                name= "nome" 
                                type="text" 
                                value={this.state.nome} 
                                className="form-control"/>
                        </div>
                        <div className="col-md-6">
                            <label>SKU: *</label>
                            <input onChange={this.onChange} name= "sku" type="text" value={this.state.sku} className="form-control"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                            <label>Descrição do Produto: *</label>
                            <textarea onChange={this.onChange} name= "descricao" type="text"  value={this.state.descricao} className="form-control"/>
                            </div>
                        </div>
                     </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Preço: *</label>
                            <input onChange={this.onChange} name= "preco" type="text"  value={this.state.preco} className="form-control"/>
                        </div>
                        <div className="col-md-6">
                            <label>Fornecedor: *</label>
                            <input onChange={this.onChange} name= "fornecedor" type="text" value={this.state.fornecedor} className="form-control"/>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-1">
                            <button onClick={this.onSubmit} className="btn btn-success">Salvar</button>
                        </div>
                        <div className="col-md-1">
                            <button onClick={this.limparCampos} className="btn btn-primary">Limpar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default  CadastroProdutos;