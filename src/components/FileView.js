import React, { Component } from 'react';
import Window from "./Window";
import { remark } from 'remark'
import re_html from 'remark-html'
import axios from 'axios';

class FileView extends Window {
  constructor(props) {
    super(props);
    this.state = {
      content: {}
    };
  }

  async componentDidMount() {
    this.getContent();
  }

  // relay to parent
  closeFile() {
    this.props.closeFile(this.props.id);
  }

  // load content and convert markdown to html
  async getContent() {
    let content = this.state.content;
    
    if (!this.state.content[this.props.id]) {
      content[this.props.id] = '404 - File Not Found';

      (async () => {
        try {
          let markdown = await this.requestData();
          let result = await remark().use(re_html).process(markdown);
          content[this.props.id] = result.value.toString();
        } catch (e) {
          console.warn(e);
        }

        this.setState((state, props) => ({
          content: content
        }));
      })();
    }
  }

  // request content from markdown file
  async requestData() {
    const res = await axios('/content/' + this.props.folder + '/' + this.props.id + '.md');
    return await res.data;
  }

  render() {
    let { content } = this.state;
    let loading = false;

    // fetch content if not yet loaded
    if (content[this.props.id] === undefined) {
      this.getContent();
      loading = true;
    }

    return (
      <div className="file_view">
        <div dangerouslySetInnerHTML={{ __html: content[this.props.id] }}></div>
        {<button onClick={this.closeFile.bind(this)}>
          Close File
        </button>}
      </div>
    )
  }
}

export default FileView;