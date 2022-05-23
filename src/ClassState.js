import React from 'react';

const SECURITY_CODE = 'paradigma'

class ClassState extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            value: '',
            error: false,
            loading: false,
        }
    }

    componentDidUpdate(){
        console.log('actualizando');

        if(this.state.loading){
            setTimeout(() => {
                console.log('iniciando validación');

                if(SECURITY_CODE === this.state.value){
                    this.setState({ loading: false })
                }else{
                    this.setState({ error: true, loading: false })
                }

                
                console.log('terminando validación');
            }, 3000)
        }
    }

    render(){
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {(this.state.error && !this.state.loading) && <p>Error: el código es incorrecto</p>}
                {this.state.loading && <p>Cargando...</p>}
                <input 
                    placeholder='Código de seguridad'
                    value={this.state.value}
                    onChange={(event) => {
                        this.setState({ value: event.target.value })
                    }}
                />
                <button
                    onClick={() => this.setState({ error: false, loading: true })}
                >
                    Comprobar
                </button>
            </div>
        );
    }
}

export { ClassState };