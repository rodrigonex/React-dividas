import React from 'react'

export default function Todos(props) {

    const row = props.data.map((row, index) => {
        const divida = row.done;
        const cor = (divida === false) ? "#ff6e6e" : "#a8ed98";

        function altera () {
            props.alterarDivida(index);   
        }
        
        return(
            <li key={index} className="list-group-item m-1" style={{background: cor}} onClick={altera} >
                <span style={{fontWeight: "bold"}}>{row.date}</span>
                <span className="ml-3">{row.description}</span>
            </li>
        )
    })

    return (
        <ul className="list-group">
            {row}
        </ul>
        
    )
}
