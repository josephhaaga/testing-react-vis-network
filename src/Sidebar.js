import React, { Component } from 'react';

class Sidebar extends Component {

  render() {

    const listOfNodes = this.props.graph.getNodes().map((x, idx) =>
      <div className="cell small-12 entity" key={idx}>
        <div className="grid-x">
          <div className="cell small-4">{x.getId()}</div>
          <div className="cell small-4" style={{color: "red"}}>isa</div>
          <div className="cell small-4">
            <select
              value={x.getType()}
              onChange={(e) => {
                x.setType(e.target.value)
                this.props.update()
              }}>
              {this.props.nodeTypes.map((y, idx) =>
                <option key={idx} value={y}>{y}</option>
              )}
            </select>
            <button className="delete" disabled={(idx===0) ? true : false} onClick={(e) => {
              this.props.graph.deleteNode(x.id)
              this.props.update()
            }}>X</button>
          </div>
              <div className="cell small-12">
                {<ul className="filters">
                    {x.filters.map((f, idx2) =>
                      <li key={idx2}>
                        <div className="grid-x" style={{position: "relative"}}>
                          <button
                            onClick={e => {
                              x.deleteFilter(f)
                              this.props.update()
                            }}
                            className="delete-filter">x</button>
                          {Object.keys(f).filter(key => key !== "dtype").map((a, idx3) =>
                            <div key={idx3} className="cell small-4">
                              <select onChange={e => {
                                  let f2 = f
                                  f2[a] = e.target.value
                                  x.updateFilter(f, f2)
                                  this.props.update()
                                }
                              }>
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

          <div className="cell small-12">
            <button
              className="button"
              onClick={(e) => {
                x.addFilter()
                this.props.update()
              }}>Add Filters</button>
          </div>
        </div>
      </div>
    )

    // TODO: refactor redundant nested calls to .getEdges()

        const listOfEdges = ((this.props.graph.getEdges())
          ? this.props.graph.getEdges().map(x => {
              const allNodes = this.props.graph.getNodes()
              return (
                <div className="cell small-12 entity" key={x.getId()}>
                  <div className="grid-x">
                    <div className="cell small-3">
                      <select
                        onChange={e => {
                          x.setFrom(e.target.value)
                          this.props.update()
                        }}
                        value={x.from}>
                        {allNodes.map((a, idx) =>
                          <option key={idx} value={a.getId()}>{a.getId()}</option>
                        )}
                      </select>
                    </div>
                    <div className="cell small-6">
                      <select
                        onChange={e => {
                          x.setType(e.target.value)
                          this.props.update()
                        }}
                        value={x.type}>
                        {this.props.edgeTypes.map((a, idx) =>
                          <option key={idx} value={a}>{a}</option>
                        )}
                      </select>
                    </div>
                    <div className="cell small-3">
                      <select
                        onChange={e => {
                          x.setTo(e.target.value)
                          this.props.update()
                        }}
                        value={x.getTo()}>
                        {allNodes.map((a, idx) =>
                          <option key={idx} value={a.getId()}>{a.getId()}</option>
                        )}
                      </select>
                    </div>
                    <div className="cell small-12">
                      {<ul className="filters">
                          {x.filters.map((f, idx2) =>
                            <li key={idx2}>
                              <div className="grid-x" style={{position: "relative"}}>
                                <button className="delete-filter"
                                  onClick={e => {
                                    x.deleteFilter(f)
                                    this.props.update()
                                  }}>x</button>
                                {Object.keys(f).filter(key => key !== "dtype").map((a, idx3) =>
                                  <div key={idx3} className="cell small-4">
                                    <select onChange={e => {
                                        let f2 = f
                                        f2[a] = e.target.value
                                        x.updateFilter(f, f2)
                                        this.props.update()
                                      }
                                    }>
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
                    <div className="cell small-12">
                      <button
                        className="button"
                        onClick={(e) => {
                          x.addFilter()
                          this.props.update()
                        }}>Add Filters</button>
                    </div>
                    <div className="delete">

                    </div>
                  </div>
                </div>
              )
            })
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
              onClick={e => {
                this.props.graph.addNode()
                this.props.update()
              }}>+</button>
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
             onClick={e => {
               this.props.graph.addEdge()
               this.props.update()
             }}>+</button>
          </div>
          <div className="cell small-12">
            <div className="grid-x">
              {listOfEdges}
            </div>
          </div>
          <div className="cell small-12">
            <button className="button"
              onClick={this.props.submit}>Submit</button>
          </div>
        </div>
      </div>
    )
  }
}

export { Sidebar }
