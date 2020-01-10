import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios'
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.handleSearch = this.handleSearch.bind( this )
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then(results => {
      this.setState({posts: results.data})
    }).catch(err => console.log(err))
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text: text}).then(results => {
      this.setState({posts: results.data})
    }).catch(err => console.log(err))
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then(
      results => {
        this.setState({posts: results.data})
      }
    ).catch(err => console.log(err))
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, { text: text }).then(
      results => {
        this.setState({posts: results.data})
      }
    ).catch(err => console.log(err))
  }

  handleSearch(text){
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${text}`).then(
      results => {
        this.setState({posts: results.data})
      }
    )
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header search={this.handleSearch}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {
            posts.map((element) => {
              return <Post key={element.id} text={element.text} date={element.date}
              updatePostFn={this.updatePost} id={element.id}
              deletePostFn={this.deletePost}
              />
            })
          }
          
        </section>
      </div>
    );
  }
}

export default App;
