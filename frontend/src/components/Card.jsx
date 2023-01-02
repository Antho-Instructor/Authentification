export default function Card({ title, author }) {
  return (
    <div className="m-3 p-4 shadow-md">
      <h3 className="font-bold">{title}</h3>
      <p className="italic">{author}</p>
    </div>
  );
}
