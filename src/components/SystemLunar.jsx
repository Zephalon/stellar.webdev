'use client';

import { useEffect } from 'react';
import FileView from './FileView';
import Celestial from './Celestial';
import Headline from './Headline';
import Button from './Button';

export default function SystemLunar({ content, html, closeMoon: close }) {
  // scroll content window to top — runs after every update, like the class version
  useEffect(() => {
    const container = document.getElementsByClassName('file-container')[0];
    if (container) container.scrollTop = 0;
  });

  return (
    <div className="system system-lunar">
      <Celestial id="celestial-moon" />
      <Headline>{content.title}</Headline>
      <div className="file-container container">
        <FileView html={html} />
      </div>
      <Button title="Zurück ⇻" class_name="button-back" action={close} />
    </div>
  );
}
