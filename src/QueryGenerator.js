import React, { Component } from 'react';
import { PrismCode } from "react-prism";

class QueryGenerator extends Component {
  render(){
    const srcs = this.props.edges.map(x => x.from)
    const dsts = this.props.edges.map(x => x.to)
    let allNodes = this.props.nodes.map(x => x.id)
    const usedNodes = new Set([...new Set(srcs), ...new Set(dsts)])
    let difference = [...new Set(
      [...new Set(allNodes)].filter(x => !usedNodes.has(x)))];

    const theQuery = ((this.props.generateScala)
      ? <div>
          <PrismCode className="language-scala">
            {'val a = g.motif("'+this.props.edges.map(x =>
                "("+x.from+")-["+x.id+"]->("+x.to+");"
              ).join(" ")
              +difference.map(x => "("+x+');')+'")'}
            <br/>
            {this.props.nodes.filter(x =>
              x.type !== "Vertex"
            ).map(x =>
              ".filter("+x.id+".type == '"+x.type+"')"
            )}
            <br />
            {this.props.edges.filter(x =>
              x.type !== "Edge"
            ).map(x =>
              ".filter("+x.id+".relationship == '"+x.type+"')"
            )};
          </PrismCode>
        </div>
      : null
    )

    return theQuery;
  }
}

export { QueryGenerator }
