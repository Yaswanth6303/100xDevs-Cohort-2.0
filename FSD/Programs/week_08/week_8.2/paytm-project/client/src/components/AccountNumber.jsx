const AccountNumber = ({ value }) => {
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your account number:</div>
      <span className="font-semibold ml-1.5 text-lg">{value}</span>
    </div>
  );
};

export default AccountNumber;
