import React from 'react';
import System from "./System";
import Moon from "./Moon";
import Celestial from "./Celestial";
import Headline from "./Headline";
import Button from "./Button";

class SystemSatellite extends System {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { content, files, openPlanet: open, closePlanet: close } = this.props;

    return (
      <div className="system system-satellites">
        <Celestial id="celestial-planet" />
        <Headline title={content.title} />
        <ul className="planets">
          {files.map((file) =>
            <Moon key={file.id} id={file.id} title={file.title ? file.title : file.id} link={file.link ? file.link : false} openPlanet={open} />
          )}
        </ul>
        <Button title="Zurück ⇸" class_name="button-back" action={close} />
      </div>
    )
  }
}

export default SystemSatellite;