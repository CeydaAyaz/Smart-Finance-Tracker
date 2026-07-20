import React, { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';

function SubscriptionManager() {
  const { subscriptions, addSubscription, deleteSubscription, updateSubscription } = useContext(FinanceContext);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [day, setDay] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editDay, setEditDay] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !day) return;
    addSubscription({
      title,
      amount: parseFloat(amount),
      day: parseInt(day)
    });
    setTitle('');
    setAmount('');
    setDay('');
  };

  const startEditing = (sub) => {
    setEditingId(sub.id);
    setEditTitle(sub.title);
    setEditAmount(sub.amount);
    setEditDay(sub.day);
  };

  const handleUpdate = (id) => {
    if (!editTitle || !editAmount || !editDay) return;
    updateSubscription(id, {
      title: editTitle,
      amount: parseFloat(editAmount),
      day: parseInt(editDay)
    });
    setEditingId(null);
  };

  return (
    <div className="card shadow-sm p-3 border-0 bg-white">
      <h2 className="h6 fw-bold mb-2 text-secondary">Düzenli Ödemeler / Abonelikler</h2>
      
      {/* Abonelik Ekleme Formu */}
      <form onSubmit={handleSubmit} className="row g-2 mb-3">
        <div className="col-4">
          <input 
            type="text" 
            className="form-control form-control-sm" 
            placeholder="Abonelik Adı" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        <div className="col-3">
          <input 
            type="number" 
            className="form-control form-control-sm" 
            placeholder="Tutar (TL)" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
          />
        </div>
        <div className="col-3">
          <input 
            type="number" 
            className="form-control form-control-sm" 
            placeholder="Ödeme Günü" 
            min="1" 
            max="31" 
            value={day} 
            onChange={(e) => setDay(e.target.value)} 
          />
        </div>
        <div className="col-2">
          <button type="submit" className="btn btn-primary btn-sm w-100 fw-semibold" style={{ fontSize: '11px' }}>Ekle</button>
        </div>
      </form>

      {/* Kaydırılabilir (Scrollable) Abonelikler Listesi Alanı */}
      <div style={{ maxHeight: '150px', overflowY: 'auto' }} className="pe-1">
        {subscriptions.length === 0 ? (
          <p className="text-muted small mb-0">Aktif abonelik bulunmuyor.</p>
        ) : (
          <ul className="list-group list-group-flush">
            {subscriptions.map((sub) => (
              <li key={sub.id} className="list-group-item px-0 py-2">
                {editingId === sub.id ? (
                  <div className="row g-1 align-items-center">
                    <div className="col-4">
                      <input 
                        type="text" 
                        className="form-control form-control-sm" 
                        value={editTitle} 
                        onChange={(e) => setEditTitle(e.target.value)} 
                      />
                    </div>
                    <div className="col-3">
                      <input 
                        type="number" 
                        className="form-control form-control-sm" 
                        value={editAmount} 
                        onChange={(e) => setEditAmount(e.target.value)} 
                      />
                    </div>
                    <div className="col-2">
                      <input 
                        type="number" 
                        className="form-control form-control-sm" 
                        value={editDay} 
                        onChange={(e) => setEditDay(e.target.value)} 
                      />
                    </div>
                    <div className="col-3 d-flex gap-1">
                      <button onClick={() => handleUpdate(sub.id)} className="btn btn-success btn-sm w-100" style={{ fontSize: '10px' }}>Kaydet</button>
                      <button onClick={() => setEditingId(null)} className="btn btn-secondary btn-sm w-100" style={{ fontSize: '10px' }}>İptal</button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0 fw-semibold" style={{ fontSize: '13px' }}>{sub.title}</h6>
                      <small className="text-muted" style={{ fontSize: '11px' }}>Her ayın {sub.day}. günü</small>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-bold" style={{ fontSize: '13px', color: '#6f42c1' }}>{sub.amount} TL</span>
                      <div className="d-flex gap-1">
                        <button onClick={() => startEditing(sub)} className="btn btn-outline-primary btn-sm py-0 px-1" style={{ fontSize: '10px' }}>Güncelle</button>
                        <button onClick={() => deleteSubscription(sub.id)} className="btn btn-outline-danger btn-sm py-0 px-1" style={{ fontSize: '10px' }}>İptal Et</button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SubscriptionManager;