import React, { useState, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

function ExpenseForm() {
  const { addExpense } = useContext(FinanceContext);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Genel');
  const [installments, setInstallments] = useState('1');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    addExpense({
      title,
      amount: parseFloat(amount),
      category,
      installments: parseInt(installments)
    });

    setTitle('');
    setAmount('');
    setCategory('Genel');
    setInstallments('1');
  };

  return (
    <div className="card shadow-sm mb-4 p-4 border-0">
      <h2 className="h5 fw-bold mb-3 text-secondary">Yeni Harcama / Taksit Ekle</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-sm-6">
          <input 
            className="form-control" 
            placeholder="Harcama Adı (Örn: Market)" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        <div className="col-sm-6">
          <input 
            className="form-control" 
            type="number" 
            placeholder="Tutar (TL)" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
          />
        </div>
        <div className="col-sm-6">
          <select 
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Genel">Genel</option>
            <option value="Gıda">Gıda</option>
            <option value="Fatura">Fatura</option>
            <option value="Eğlence">Eğlence</option>
            <option value="Ulaşım">Ulaşım</option>
          </select>
        </div>
        <div className="col-sm-6">
          <select 
            className="form-select"
            value={installments}
            onChange={(e) => setInstallments(e.target.value)}
          >
            <option value="1">Tek Çekim</option>
            <option value="2">2 Taksit</option>
            <option value="3">3 Taksit</option>
            <option value="6">6 Taksit</option>
            <option value="12">12 Taksit</option>
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            Harcama Ekle
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;