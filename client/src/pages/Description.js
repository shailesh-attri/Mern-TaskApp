export const Description = ({ text }) => {
    const words = text.split(" ");
    const truncatedText = words.slice(0, 10).join(" ");
    return (
      <div className="description">
        {truncatedText}
        {words.length > 8 && "..."}
      </div>
    );
  };