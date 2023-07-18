import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    try{
      const values = await axios.get('/api/values/current');
      if(values&&values.data){
        this.setState({ values: values.data });
      }
      
    }catch(e){
      console.log("error:"+e.message);
    } 
    
  }

  async fetchIndexes() {
    try{
      const seenIndexes = await axios.get('/api/values/all');
      if(seenIndexes&&seenIndexes.data){
        this.setState({
          seenIndexes: seenIndexes.data,
      });
      }
    }catch(e){
      console.log(`erorr: ${e.message}`)
    }
    
  
  }

  handleSubmit = async (event) => {
    try{
      event.preventDefault();

      await axios.post('/api/values', {
        index: this.state.index,
      });
      this.setState({ index: '' });
      this.fetchIndexes();
      this.fetchValues();
    }catch(e){
      console.log(e.message);
    }
    
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
