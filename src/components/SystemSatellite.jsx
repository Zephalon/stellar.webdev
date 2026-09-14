import Planet from './Planet';
import Celestial from './Celestial';
import Headline from './Headline';
import Button from './Button';

export default function SystemSatellite({ content, files, openPlanet: open, closePlanet: close }) {
  return (
    <div className="system system-satellites">
      <Celestial id="celestial-planet" />
      <Headline>{content.title}</Headline>
      <ul className="planets">
        {files.map((file) =>
          <Planet key={file.id} id={file.id} title={file.title ? file.title : file.id} link={file.link ? file.link : false} openPlanet={open} />
        )}
      </ul>
      <Button title="Zurück ⇸" class_name="button-back" action={close} />
    </div>
  );
}
