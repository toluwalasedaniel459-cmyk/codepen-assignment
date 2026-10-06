function Card({ card, index, isSelected, onSelect }) {
  const style = {
    "--rot": card.rot,
    "--dx": card.dx,
    "--dy": card.dy,
    zIndex: index,
  };

  return (
    <div
      className={`card${isSelected ? " is-selected" : ""}`}
      style={style}
      onClick={() => onSelect(card.id)}
      dangerouslySetInnerHTML={{ __html: card.svg }}
    />
  );
}

export default Card;
