import React, { Component } from 'react'


const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: ''
}

class CadastroProdutos extends React.Component {

   

    state = estadoInicial

    onChange = (event) => {
        const valor = event.target.value
        const nomedoCampo = event.target.name
        this.setState({ [nomedoCampo]: valor })
    }

    onSubmit = (event) => {
        console.log(this.state)
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