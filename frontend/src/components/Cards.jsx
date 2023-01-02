import Card from "./Card";

export default function Cards({ data, home }) {
  return (
    <div className="grid grid-cols-3">
      {
        // If home is true, we only display the first 6 cards
        home
          ? data.slice(0, 6).map((card) => <Card key={card.id} {...card} />)
          : data.map((card) => <Card key={card.id} {...card} />)
      }
    </div>
  );
}
