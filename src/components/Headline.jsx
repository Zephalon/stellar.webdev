export default function Headline({ children }) {
  return (
    <div className="headline-container container">
      <h1 className="headline"><span className="highlight">{children}</span></h1>
    </div>
  );
}
