import Planet from './Planet';
import Celestial from './Celestial';
import Headline from './Headline';

export default function SystemPlanetary({ content, openPlanet: open }) {
  return (
    <div className="system system-planetary">
      <Celestial id="celestial-sun" />
      <Headline>let <em>me</em> = new&nbsp;<em>Webdev</em>();</Headline>
      <ul className="planets">
        {content.map((folder) =>
          <Planet key={folder.id} id={folder.id} title={folder.title} link={folder.link ? folder.link : false} openPlanet={open} />
        )}
      </ul>
    </div>
  );
}
