import React, { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';

function ExpenseList() {
  const { expenses, deleteExpense, updateExpense } = useContext(FinanceContext);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const startEditing = (expense) => {
    setEditingId(expense.id);
    setEditTitle(expense.title);
    setEditAmount(expense.amount);
    setEditCategory(expense.category || 'Genel');
  };

  const handleUpdate = (id) => {
    if (!editTitle || !editAmount) return;
    updateExpense(id, {
      title: editTitle,
      amount: parseFloat(editAmount),
      category: editCategory
    });
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bu harcamayı silmek istediğinizden emin misiniz?")) {
      deleteExpense(id);
    }
  };

  // Bugünün tarihini YYYY-MM-DD formatında alalım
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="card shadow-sm mb-4 p-4 border-0">
      <h2 className="h5 fw-bold mb-3 text-secondary">Harcama Listesi</h2>
      {expenses.length === 0 ? (
        <p className="text-muted small mb-0">Henüz eklenmiş bir harcama yok.</p>
      ) : (
        <ul className="list-group list-group-flush">
          {expenses.map((expense) => {
            const isFuture = expense.date > todayStr; // Gelecek aya ait mi kontrolü

            return (
              <li key={expense.id} className="list-group-item py-3">
                {editingId === expense.id ? (
                  <div className="row g-2 align-items-center">
                    <div className="col-md-4">
                      <input 
                        type="text" 
                        className="form-control form-control-sm" 
                        value={editTitle} 
                        onChange={(e) => setEditTitle(e.target.value)} 
                      />
                    </div>
                    <div className="col-md-3">
                      <input 
                        type="number" 
                        className="form-control form-control-sm" 
                        value={editAmount} 
                        onChange={(e) => setEditAmount(e.target.value)} 
                      />
                    </div>
                    <div className="col-md-3">
                      <select 
                        className="form-select form-select-sm"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                      >
                        <option value="Genel">Genel</option>
                        <option value="Gıda">Gıda</option>
                        <option value="Fatura">Fatura</option>
                        <option value="Eğlence">Eğlence</option>
                        <option value="Ulaşım">Ulaşım</option>
                      </select>
                    </div>
                    <div className="col-md-2 d-flex gap-1">
                      <button onClick={() => handleUpdate(expense.id)} className="btn btn-success btn-sm w-100">Kaydet</button>
                      <button onClick={() => setEditingId(null)} className="btn btn-secondary btn-sm w-100">İptal</button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <h6 className="mb-0 fw-semibold">{expense.title}</h6>
                        {isFuture && (
                          <span className="badge bg-warning text-dark" style={{ fontSize: '10px' }}>
                            ⏳ Gelecek Ay Ödenecek
                          </span>
                        )}
                      </div>
                      <small className="text-muted">{expense.category} • {expense.date}</small>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span className="fw-bold text-danger">-{expense.amount} TL</span>
                    <div className="d-flex gap-1">
                        <button onClick={() => startEditing(expense)} className="btn btn-outline-primary btn-sm">Güncelle</button>
                        <button onClick={() => handleDelete(expense.id)} className="btn btn-outline-danger btn-sm">Sil</button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;