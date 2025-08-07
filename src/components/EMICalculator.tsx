import React, { useState } from 'react';

const EMICalculator = ({ show, onClose }) => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 12 / 100;
    const N = parseFloat(years) * 12;
    if (P && R && N) {
      const e = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      setEmi(e.toFixed(2));
    } else {
      setEmi(null);
    }
  };

  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">EMI Calculator</h2>
          <button onClick={onClose} className="text-2xl leading-4">&times;</button>
        </div>
        <div className="space-y-3 mb-3">
          <input
            type="number"
            className="w-full border rounded px-2 py-1"
            placeholder="Principal Amount (₹)"
            value={principal}
            onChange={e => setPrincipal(e.target.value)}
          />
          <input
            type="number"
            className="w-full border rounded px-2 py-1"
            placeholder="Annual Interest Rate (%)"
            value={rate}
            onChange={e => setRate(e.target.value)}
          />
          <input
            type="number"
            className="w-full border rounded px-2 py-1"
            placeholder="Loan Tenure (years)"
            value={years}
            onChange={e => setYears(e.target.value)}
          />
        </div>
        <button
          onClick={calculateEMI}
          className="w-full bg-primary text-white rounded py-2 font-medium"
        >
          Calculate
        </button>
        {emi && (
          <div className="mt-4 text-lg text-center">
            Monthly EMI: <span className="font-bold text-green-600">₹{emi}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EMICalculator;
