export default function Button({ title, class_name, action }) {
  return (
    <div className={class_name}>
      <button onClick={action}><span className="text">{title}</span></button>
    </div>
  );
}
