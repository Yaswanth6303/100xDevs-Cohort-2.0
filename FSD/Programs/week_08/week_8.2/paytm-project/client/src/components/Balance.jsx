const Balance = ({ value }) => {
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance:</div>
      <span className="font-semibold ml-1.5 text-lg">₹{value}</span>
    </div>
  );
};

export default Balance;