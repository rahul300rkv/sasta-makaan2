import React, { useState } from 'react';

const PMAYCalculator = ({ show, onClose }) => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [years, setYears] = useState('');
  const [subsidy, setSubsidy] = useState(null);

  // Simple PMAY calculation (replace with real logic as required)
  const calculateSubsidy = () => {
    const amount = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const tenure = parseFloat(years);
    // Basic example logic (replace with real PMAY calculation)
    if (amount && rate && tenure) {
      // Simulated PMAY: 2.67 lakh max (official max subsidy), or 6.5% interest
      const maxSubsidy = 267000;
      const savedInterest = (amount * Math.min(rate, 6.5) * Math.min(tenure, 20)) / 100;
      setSubsidy(Math.min(savedInterest, maxSubsidy).toFixed(2));
    } else {
      setSubsidy(null);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">PMAY Subsidy Calculator</h2>
          <button onClick={onClose} className="text-2xl leading-4">&times;</button>
        </div>
        <div className="space-y-3 mb-3">
          <input
            type="number"
            className="w-full border rounded px-2 py-1"
            placeholder="Loan Amount (₹)"
            value={loanAmount}
            onChange={e => setLoanAmount(e.target.value)}
          />
          <input
            type="number"
            className="w-full border rounded px-2 py-1"
            placeholder="Interest Rate (%)"
            value={interestRate}
            onChange={e => setInterestRate(e.target.value)}
          />
          <input
            type="number"
            className="w-full border rounded px-2 py-1"
            placeholder="Tenure (years)"
            value={years}
            onChange={e => setYears(e.target.value)}
          />
        </div>
        <button
          onClick={calculateSubsidy}
          className="w-full bg-primary text-white rounded py-2 font-medium"
        >
          Calculate
        </button>
        {subsidy && (
          <div className="mt-4 text-lg text-center">
            Estimated Subsidy: <span className="font-bold text-green-600">₹{subsidy}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PMAYCalculator;
