import React, { Component } from 'react';
import { remark } from 'remark'
import re_html from 'remark-html'
import axios from 'axios';

class FileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {}
    };
  }

  async componentDidMount() {
    this.getContent();
  }

  // load content and convert markdown to html
  async getContent() {
    let content = this.state.content;

    if (!this.state.content[this.props.id]) {
      content[this.props.id] = '<h2>Lade...</h2>';

      (async () => {
        try {
          let markdown = await this.requestData();
          let result = await remark().use(re_html).process(markdown);
          let result_string = result.value.toString();

          // add headline highlights
          ['h1', 'h2', 'h3', 'h4'].forEach(tag => {
            result_string = result_string.replaceAll('<' + tag + '>', '<' + tag + '><span class="highlight">');
            result_string = result_string.replaceAll('</' + tag + '>', '<span class="highlight"></' + tag + '>');
          });

          content[this.props.id] = result_string;
        } catch (e) {
          console.warn(e);
          content[this.props.id] = '<h2>Bitte prüfen Sie Ihre Internetverbindung.</h2>';
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

    // fetch content if not yet loaded
    if (content[this.props.id] === undefined) {
      this.getContent();
    }

    return (
      <div className="file_view">
        <div className="file_view-inner" dangerouslySetInnerHTML={{ __html: content[this.props.id] }}></div>
        {/*<button onClick={this.props.closeFile}>
          Close File
    </button>*/}
      </div>
    )
  }
}

export default FileView;