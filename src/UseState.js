import React from 'react';

const SECURITY_CODE = 'paradigma'

function UseState({ name }){
    // Estado compuesto
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        confirm: false,
        deleted: false,
    })

    // Estados independientes
    // const [value, setValue] = React.useState('')
    // const [error, setError] = React.useState(false)
    // const [loading, setLoading] = React.useState(false)

    // Funciones para actualizar el estado de forma semideclarativa
    const onConfirm = () => {
        setState({
            ...state,
            loading: false,
            error: false,
            confirm: true
        })
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        })
    }

    const onChange = (newValue) => {
        setState({
            ...state,
            value: newValue
        })
    }

    const onCheck = () => {
        setState({
            ...state,
            error: false,
            loading: true
        })
    }

    const onDelete = () => {
        setState({
            ...state,
            deleted: true
        })
    }

    const onReset  = () => {
        setState({
            ...state,
            confirm: false,
            deleted: false,
            value: ''
        })
    }

    React.useEffect(() => {
        console.log('iniciando efecto');

        if(state.loading){
            setTimeout(() => {
                console.log('iniciando validación');

                if(state.value === SECURITY_CODE){
                    // Actualizando los estados independientes de forma imperativa
                    //setLoading(false)

                    // Actualizando el estado compuesto de forma imperativa
                    // setState({
                    //     ...state,
                    //     loading: false,
                    //     error: false,
                    //     confirm: true
                    // })

                    // Actualizando el estado de forma semideclarativa
                    onConfirm()
                }else{
                    // Actualizando los estados independientes de forma imperativa
                    // setError(true)
                    // setLoading(false)

                    // Actualizando el estado compuesto de forma imperativa
                    // setState({
                    //     ...state,
                    //     error: true,
                    //     loading: false
                    // })

                    // Actualizando el estado de forma semideclarativa
                    onError()
                }

                console.log('terminando validación');
            }, 3000)
        }
        
        console.log('terminando efecto');
    }, [state.loading])

    if(!state.confirm && !state.deleted){
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {(state.error && !state.loading) && <p>Error: el código es incorrecto</p>}
                {state.loading && <p>Cargando...</p>}
                <input 
                    placeholder='Código de seguridad'
                    value={state.value}
                    onChange={(event) => {
                        // Actualizando los estados independientes de forma imperativa
                        //setValue(event.target.value)

                        // Actualizando el estado compuesto de forma imperativa
                        // setState({(estado compuesto)
                        //     ...state,
                        //     value: event.target.value
                        // })

                        // Actualizando el estado de forma semideclaratva
                        onChange(event.target.value)
                    }}
                />
                <button
                    onClick={() => {
                        // Actualizando los estados independientes de forma imperativa
                        // setError(false)
                        // setLoading(true)

                        // Actualizando el estado compuesto de forma imperativa
                        // setState({
                        //     ...state,
                        //     error: false,
                        //     loading: true
                        // })

                        // Actualizando el estado de forma semideclarativa
                        onCheck()
                    }}
                >
                    Comprobar
                </button>
            </div>
        );
    }else if (state.confirm && !state.deleted){
        return(
            <React.Fragment>
                <p>¿Estás seguro?</p>
                <button
                    onClick={() => {
                        // Actualizando el estado de forma imperativa
                        // setState({
                        //     ...state,
                        //     deleted: true
                        // })

                        // Actualizando el estado de forma semideclarativa
                        onDelete()
                    }}
                >
                    Sí, estoy seguro
                </button>
                <button
                    onClick={() => {
                        // Actualizando el estado de forma imperativa
                        // setState({
                        //     ...state,
                        //     confirm: false,
                        //     deleted: false,
                        //     value: ''
                        // }

                        // Actualizando el estado de forma semideclarativa
                        onReset()
                    }}
                >
                    No, quiero regresar
                </button>
            </React.Fragment>
        )
    }else{
        return(
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button
                    onClick={() => {
                        // Actualizando el estado de forma imperativa
                        // setState({
                        //     ...state,
                        //     confirm: false,
                        //     deleted: false,
                        //     value: ''
                        // })

                        // Actualizando el estado de forma semideclarativa
                        onReset()
                    }}
                >
                    Resetear
                </button>
            </React.Fragment>
        )
    }
}

export { UseState };