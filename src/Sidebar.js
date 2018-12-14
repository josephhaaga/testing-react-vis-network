import React, { Component } from 'react';

class Sidebar extends Component {
  render() {

    const listOfNodes = this.props.nodes.map((x, idx) =>
      <div className="cell small-12 entity" key={idx}>
        <div className="grid-x">
          <div className="cell small-4">{x.id}</div>
          <div className="cell small-4" style={{color: "red"}}>isa</div>
          <div className="cell small-4">
            <select
              value={x.type}
              disabled={this.props.avail}
              onChange={(e)=>this.props.changeType(x.id, e)}>
              {this.props.nodeTypes.map((y, idx) =>
                <option key={idx} value={y}>{y}</option>
              )}
            </select>
            <button className="delete" onClick={(e) => this.props.deleteNode(x.id)}>X</button>
          </div>
          {(("filters" in x)
            ? <div className="cell small-12">
                <ul className="filters">
                  {x.filters.map((f, idx2) =>
                    <li key={idx2}>
                      <div className="grid-x" style={{position: "relative"}}>
                        <button
                          className="delete-filter"
                          onClick={(e) => this.props.deleteFilter(x.id, f)}
                          >x</button>
                        {Object.keys(f).filter(key => key !== "dtype").map((a, idx3) =>
                          <div key={idx3} className="cell small-4">
                            <select onChange={e => {
                              let newFilter = f
                              f[a] = e.target.value
                              this.props.updateFilter(x.id, f, newFilter)
                            }}>
                              <option>{f[a]}</option>
                              <option>Another option</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            : null
          )}
          <div className="cell small-12">
            <button
              className="button"
              onClick={(e) => this.props.addFilter(x.id)}>Add Filters</button>
          </div>
        </div>
      </div>
    )

    const listOfEdges = ((this.props.edges)
      ? this.props.edges.map(x =>
          <div className="cell small-12 entity" key={x.id}>
            <div className="grid-x">
              <div className="cell small-3">
                <select
                  disabled={this.props.avail}
                  onChange={e => this.changeType(x.id, {"from": e.target.value})}
                  value={x.from}>
                  {this.props.nodes.map((a, idx) =>
                    <option key={idx} value={a.id}>{a.id}</option>
                  )}
                </select>
              </div>
              <div className="cell small-6">
                <select
                  disabled={this.props.avail}
                  onChange={e => this.changeType(x.id, {"type": e.target.value})}
                  value={x.type}>
                  {this.props.edgeTypes.map((a, idx) =>
                    <option key={idx} value={a}>{a}</option>
                  )}
                </select>
              </div>
              <div className="cell small-3">
                <select
                  disabled={this.props.avail}
                  onChange={e => this.changeType(x.id, {"to": e.target.value})}
                  value={x.to}>
                  {this.props.nodes.map((a, idx) =>
                    <option key={idx} value={a.id}>{a.id}</option>
                  )}
                </select>
              </div>
              {(("filters" in x)
                ? <div className="cell small-12">
                    {<ul className="filters">
                        {x.filters.map((f, idx2) =>
                          <li key={idx2}>
                            <div className="grid-x" style={{position: "relative"}}>
                              <button className="delete-filter">x</button>
                              {Object.keys(f).filter(key => key !== "dtype").map((a, idx3) =>
                                <div key={idx3} className="cell small-4">
                                  <select onChange={e => this.updateFilter(e, x.id, a)}>
                                    <option>{f[a]}</option>
                                    <option>Another option</option>
                                  </select>
                                </div>
                              )}
                            </div>
                          </li>
                        )}
                      </ul>
                    }
                  </div>
                : null
              )}
              <div className="cell small-12">
                <button
                  className="button"
                  onClick={(e) => this.addFilter(x.id)}>Add Filters</button>
              </div>
              <div className="delete">
                <button disabled={this.props.avail} onClick={(e) => this.props.deleteEdge(x.id)}>X</button>
              </div>
            </div>
          </div>
        )
      : null
    )


    return (
      <div className="sidebar" style={{textAlign: "left"}}>
        <div className="grid-x">
          <div className="cell small-6">
            <h2>Nodes</h2>
          </div>
          <div className="cell small-6" style={{alignSelf: "flex-end", textAlign: "right"}}>
            <button className="button"
              onClick={this.props.addNode}>+</button>
          </div>
          <div className="cell small-12">
            <div className="grid-x">
              {listOfNodes}
            </div>
          </div>
        </div>
        <div className="grid-x">
          <div className="cell small-6">
            <h2>Edges</h2>
          </div>
          <div className="cell small-6" style={{alignSelf: "flex-end", textAlign: "right"}}>
            <button className="button"
             onClick={this.props.addEdge}>+</button>
          </div>
          <div className="cell small-12">
            <div className="grid-x">
              {listOfEdges}
            </div>
          </div>
          <button
            onClick={this.props.genScal}
            className="button success">Generate Scala</button>
        </div>
      </div>
    )
  }
}

export { Sidebar }
