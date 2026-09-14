import Link from 'next/link';

export const metadata = {
  title: 'Nicht gefunden'
};

export default function NotFound() {
  return (
    <div className="not_found container">
      <h1 className="headline">
        <span className="not_found-code">404</span> – Hier draußen ist nichts.
      </h1>
      <Link className="button" href="/">
        <span className="text">Zurück ins System ⇻</span>
      </Link>
    </div>
  );
}
