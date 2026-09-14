export default function Planet({ id, title, link = false, openPlanet }) {
  // relay to parent
  const open = () => {
    if (!link) {
      openPlanet(id);
    } else {
      window.open(link, '_blank');
    }
  };

  return (
    <li id={'planet-' + id} className="planet" onClick={open}>
      <div className="planet-inner">
        <div id={'planet-' + id + '-planet'} className="planet-planet"></div>
        <div className="planet-title">
          <div className="planet-title-inner">
            {title + (link ? ' ↝' : '')}
          </div>
        </div>
      </div>
    </li>
  );
}
