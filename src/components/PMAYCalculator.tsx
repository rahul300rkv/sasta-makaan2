import React, { useState } from 'react';

const PMAYCalculator = ({ show, onClose }) => {
  const [income, setIncome] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [category, setCategory] = useState('EWS');
  const [subsidy, setSubsidy] = useState(null);

  const handleCalculate = () => {
    // Demo logic for category-based subsidy; replace with official calculation
    let maxLoan = 0, subsidyRate = 0, maxSubsidy = 0;
    switch(category) {
      case 'EWS': case 'LIG':
        maxLoan = 600000; subsidyRate = 6.5; maxSubsidy = 267280; break;
      case 'MIG-I':
        maxLoan = 900000; subsidyRate = 4.0; maxSubsidy = 235068; break;
      case 'MIG-II':
        maxLoan = 1200000; subsidyRate = 3.0; maxSubsidy = 230156; break;
      default: return setSubsidy(null);
    }
    const principal = Math.min(parseFloat(loanAmount), maxLoan);
    if (!principal || !interestRate || !tenure) return setSubsidy(null);
    const n = Math.min(parseFloat(tenure), 20) * 12;
    const r = subsidyRate / 12 / 100;
    // Subsidy calculation (simple NPV, for demonstration)
    const emiSubsidy = (principal * r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1);
    const totalInterest = (emiSubsidy * n) - principal;
    setSubsidy(Math.min(totalInterest, maxSubsidy).toFixed(0));
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">PMAY Subsidy Calculator</h2>
          <button onClick={onClose} className="text-2xl leading-4">&times;</button>
        </div>
        <div className="space-y-3 mb-3">
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="EWS">EWS</option>
            <option value="LIG">LIG</option>
            <option value="MIG-I">MIG-I</option>
            <option value="MIG-II">MIG-II</option>
          </select>
          <input
            type="number"
            className="w-full border rounded px-2 py-1"
            placeholder="Annual Family Income"
            value={income}
            onChange={e => setIncome(e.target.value)}
          />
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
            placeholder="Loan Tenure (years)"
            value={tenure}
            onChange={e => setTenure(e.target.value)}
          />
        </div>
        <button
          onClick={handleCalculate}
          className="w-full bg-primary text-white rounded py-2 font-medium"
        >
          Calculate Subsidy
        </button>
        {subsidy && (
          <div className="mt-4 text-lg text-center">
            Estimated PMAY Subsidy: <span className="font-bold text-green-600">₹{subsidy}</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default PMAYCalculator;
