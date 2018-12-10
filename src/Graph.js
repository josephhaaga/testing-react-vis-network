import React, { Component } from 'react';
import { Network, Node, Edge } from '@lifeomic/react-vis-network';

class Graph extends Component {
  constructor(props){
    super(props)
    this.addNode = this.addNode.bind(this)
    this.state = {
      nodes: [
        {id: 'vader', label: 'Darth Vader'},
        {id: 'luke', label: 'Luke Skywalker'},
        {id: 'leia', label: 'Leia Organa'},
      ],
      edges: [
        {id: '1', from: 'vader', to: 'luke'},
        {id: '2', from: 'vader', to: 'leia'},
      ]
    }
  }

  addNode(){
    let n = this.state.nodes
    const newId = "vertex"+n.length
    n.push({id: newId, label:'New Node'})
    this.setState({nodes: n})
  }

  render(){
    const Decorator = props => {
      return (
        <button onClick={(e) => console.log(`You clicked ${props.label}`)}>
          Click Me
        </button>
      );
    };

    const nodes = this.state.nodes.map(x =>
      <Node key={"n"+x.id} id={x.id} label={x.label}  decorator={Decorator} />
    )
    const edges = this.state.edges.map(x =>
      <Edge key={"e"+x.id} id={x.id} from={x.from} to={x.to} />
    )
    return (
      <div>
        <button onClick={this.addNode}>Add Node</button>
        <Network>
          {nodes}
          {edges}
        </Network>
      </div>
    )
  }
}

export { Graph }
