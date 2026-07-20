import React, { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

function PaydaySettings() {
  const { payDayDate, setPayDayDate, endDate, setEndDate, budgetLimit, setBudgetLimit } = useContext(FinanceContext);

  const handleBudgetChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d+$/.test(val)) {
      setBudgetLimit(val === '' ? '' : parseInt(val, 10).toString());
    }
  };

  return (
    <div className="card shadow-sm p-2 px-3 border-0 bg-white">
      <h2 className="h6 fw-bold mb-1 text-secondary">Bütçe / Tarih Aralıkları</h2>
      <div className="row g-2">
        <div className="col-sm-4">
          <label className="form-label text-muted mb-0" style={{ fontSize: '11px' }}>Maaş / Başlangıç</label>
          <input 
            type="date" 
            className="form-control form-control-sm py-1"
            value={payDayDate}
            onChange={(e) => setPayDayDate(e.target.value)}
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label text-muted mb-0" style={{ fontSize: '11px' }}>Bitiş Tarihi</label>
          <input 
            type="date" 
            className="form-control form-control-sm py-1"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label text-muted mb-0" style={{ fontSize: '11px' }}>Aylık Bütçe (TL)</label>
          <input 
            type="text" 
            className="form-control form-control-sm py-1"
            placeholder="Örn: 5000"
            value={budgetLimit}
            onChange={handleBudgetChange}
          />
        </div>
      </div>
    </div>
  );
}

export default PaydaySettings;