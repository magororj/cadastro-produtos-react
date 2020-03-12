import React, { Component } from 'react'
import Card from '../../components/card'
import ProdutosService from '../../app/produtoService'
import { withRouter } from 'react-router-dom'

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    errors: [],
    atualizando: false
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
        event.preventDefault();
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

        this.setState(estadoInicial)
    }

    componentDidMount(){
       // console.log(this.props.match)
       const sku =  this.props.match.params.sku

       if(sku){
          const resultado = 
           this.service.obterProdutos().filter( produto => produto.sku === sku)

           if(resultado.length === 1){
               const produtoEncontrado = resultado[0]
               this.setState({ ...produtoEncontrado, atualizando: true })
           }
       }
    }

    render() {
        return(
            <Card header={this.state.atualizando ? 'Atualização de Produto' : 'Cadastro de Produto'} >
                
               
            <form id="frmProduto" onSubmit={this.onSubmit}>
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
                            <input onChange={this.onChange} disabled= {this.state.atualizando} name= "sku" type="text" value={this.state.sku} className="form-control"/>
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
                            <button type="submit" className="btn btn-success">{this.state.atualizando ? 'Atualizando' : 'Salvar'}</button>
                        </div>
                        <div className="col-md-1">
                            <button onClick={this.limparCampos} className="btn btn-primary">Limpar</button>
                        </div>
                    </div>
                    </form>
               
                </Card>
        )
    }
}


export default  withRouter(CadastroProdutos);