import React from 'react';

const SECURITY_CODE = 'paradigma'

function UseReducer({ name }){
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const onConfirm = () => dispatch({ type: actionsTypes.confirm })
    const onError = () => dispatch({ type: actionsTypes.error })
    const onWrite = ({ target: { value }}) => {
        dispatch({ type: actionsTypes.write, payload: value })
    }
    const onCheck = () => dispatch({ type: actionsTypes.check }) 
    const onDelete = () => dispatch({ type: actionsTypes.delete })
    const onReset = () => dispatch({ type: actionsTypes.reset })

    React.useEffect(() => {
        if(state.loading){
            setTimeout(() => {
                if(state.value === SECURITY_CODE){
                    onConfirm() 
                }else{
                    onError()   
                }
            }, 3000)
        }
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
                    onChange={onWrite}
                />
                <button onClick={onCheck}>
                    Comprobar
                </button>
            </div>
        );
    }else if (state.confirm && !state.deleted){
        return(
            <React.Fragment>
                <p>¿Estás seguro?</p>
                <button onClick={onDelete}>
                    Sí, estoy seguro
                </button>
                <button onClick={onReset}>
                    No, quiero regresar
                </button>
            </React.Fragment>
        )
    }else{
        return(
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button onClick={onReset}>
                    Resetear
                </button>
            </React.Fragment>
        )
    }
}

export { UseReducer };

const initialState = {
    value: '',
    error: false,
    loading: false,
    confirm: false,
    deleted: false,
}

const actionsTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    write: 'WRITE',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET',
}

// Creación de reducers

// Forma obvia

// const reducerIf = (state, action) => {
//     if(action.type === 'ERROR'){
//         return({
//             ...state,
//             error: true,
//             loading: false
//         })
//     }else if(action.type === 'CHECK'){
//         return({
//             ...state,
//             error: false,
//             loading: true
//         })
//     }else{
//         return({
//             ...state,
//         })
//     }
// }

// Forma popular

// const reducerSwitch = (state, action) => {
//     switch(action.type){
//         case 'ERROR': 
//             return({
//                 ...state,
//                 error: true,
//                 loading: false
//             })
//         case 'CHECK': 
//             return({
//                 ...state,
//                 error: false,
//                 loading: true
//             })
//         default: 
//             return({
//                 ...state,
//             })
//     }
// }

// Forma favorita
// Reducer object

const reducerObject = (state, payload) => ({
    [actionsTypes.confirm]: {
        ...state,
        loading: false,
        error: false,
        confirm: true
    },
    [actionsTypes.error]: {
        ...state,
        error: true,
        loading: false
    },
    [actionsTypes.write]: {
        ...state,
        value: payload,
    },
    [actionsTypes.check]: {
        ...state,
        error: false,
        loading: true
    },
    [actionsTypes.delete]: {
        ...state,
        deleted: true
    },
    [actionsTypes.reset]: {
        ...state,
        confirm: false,
        deleted: false,
        value: ''
    }
})

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type]
    }else{
        return({
            ...state,
        })
    }
}