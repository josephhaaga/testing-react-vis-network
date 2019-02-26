import React, { Component } from 'react';

class OperationChooser extends Component {
    constructor(props) {
        super(props)
        this.operations = [
            { name: "Query", description: "Observe data matching a provided pattern.", available: true },
            { name: "Find Cliques", description: "Find cliques matching a provided pattern.",  available: true },
            { name: "Find Influencers", description: "Find influencers in networks matching a provided pattern.", available: false },
            { name: "Find Relationships", description: "Observe how entities are related.", available: false },
            { name: "Find Similarities", description: "Find equivalent entities across different subnetworks.", available: false },
        ]
    }
    render() {
        const operationsList = this.operations.map((x, idx) => 
            <li key={idx}>
                <button 
                    onClick={e => this.props.select(x)}
                    href="#"
                    className={((!x.available) ? "disabled" : null)} 
                    aria-disabled={!x.available}>{x.name}</button> - {x.description}
            </li>
        )
        return (
            <div className="operations-list">
                <h1>Choose an operation</h1>
                <ul>
                    {operationsList}
                </ul>
            </div>
        )
    }        
}

export { OperationChooser }