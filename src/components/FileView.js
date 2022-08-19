import React, { Component } from 'react';
import { remark } from 'remark'
import re_html from 'remark-html'
import axios from 'axios';

class FileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null
    };
    this.storage_version = 2;
  }

  async componentDidMount() {
    this.loadContent(this.props.id);
  }

  async componentDidUpdate(prev_props, prev_state) {
    // re-set content if a new file is requested
    if (prev_props.id !== this.props.id) {
      this.loadContent(this.props.id);
    }
  }

  // load content and convert markdown to html
  async loadContent(id) {
    let content = this.getLocalItem(id);

    if (content) {
      // the content is already in local storage
      this.setState((state, props) => ({
        content: content
      }));
    } else {
      // show "loading" message
      content = '<h2>Lade...</h2>';
      this.setState((state, props) => ({
        content: content
      }));

      // load the file
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

          content = result_string;

          this.setLocalItem(id, content);
        } catch (e) {
          console.warn(e);
          content = this.getLocalItem(id, 99) ? this.getLocalItem(id, 99) : '<h2>Bitte prüfen Sie Ihre Internetverbindung.</h2>'; // show last version instead of error message
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

  // set local storage
  setLocalItem(id, content = '') {
    localStorage.setItem('content-' + this.storage_version + '-' + id, JSON.stringify({
      'content': content,
      'time': new Date().getTime()
    }));
  }

  // get local storage if it's not older than 'max_age' days
  getLocalItem(id, max_age = 3) {
    let item = localStorage.getItem('content-' + this.storage_version + '-' + id);
    if (!item) return false; // not yet set
    let { content = false, time = 0 } = JSON.parse(item);

    let age = ((new Date().getTime()) - time) / 1000 / 60 / 60 / 24; // in days
    return age < max_age ? content : false;
  }

  render() {
    let { content } = this.state;

    return (
      <div className="file_view">
        <div className="file_view-inner" dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    )
  }
}

export default FileView;