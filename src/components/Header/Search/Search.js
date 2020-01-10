import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(){
    super()
    this.state = {
      input: ''
    }
  }

  handleChange=({name, value})=>{this.setState({[name]: value})}

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed"
          value={this.state.input}
          name='input'
          onChange={e => {
            this.handleChange(e.target)
          }}/>

          <SearchIcon id="Search__icon" onClick={()=>{
            this.props.search(this.state.input)
          }}/>
        </div>
        
      </section>
    )
  }
}