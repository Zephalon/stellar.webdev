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

  closeFile() {
    this.props.closeFile(this.props.id);
  }

  async componentDidMount() {
    this.getContent();
  }

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

  async requestData() {
    const res = await axios('/content/' + this.props.folder + '/' + this.props.id + '.md');
    return await res.data;
  }

  render() {
    let { content } = this.state;
    let loading = false;

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