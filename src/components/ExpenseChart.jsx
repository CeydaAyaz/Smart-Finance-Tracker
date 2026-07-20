import React, { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function ExpenseChart() {
  const { expenses, subscriptions, budgetLimit, payDayDate } = useContext(FinanceContext);

  const activeDate = payDayDate ? new Date(payDayDate) : new Date();
  const activeYear = activeDate.getFullYear();
  const activeMonth = activeDate.getMonth();

  const currentMonthExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    return expDate.getFullYear() === activeYear && expDate.getMonth() === activeMonth;
  });

  const totalExpense = currentMonthExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalSubscriptions = subscriptions.reduce((acc, curr) => acc + curr.amount, 0);
  const grandTotal = totalExpense + totalSubscriptions;

  const numericBudget = budgetLimit !== '' ? parseFloat(budgetLimit) : 0;
  const isOverBudget = numericBudget > 0 && grandTotal > numericBudget;

  const categoryTotals = currentMonthExpenses.reduce((acc, curr) => {
    const cat = curr.category || 'Genel';
    acc[cat] = (acc[cat] || 0) + curr.amount;
    return acc;
  }, {});

  const data = [
    { name: 'Genel', value: categoryTotals['Genel'] || 0 },
    { name: 'Gıda', value: categoryTotals['Gıda'] || 0 },
    { name: 'Fatura', value: categoryTotals['Fatura'] || 0 },
    { name: 'Eğlence', value: categoryTotals['Eğlence'] || 0 },
    { name: 'Ulaşım', value: categoryTotals['Ulaşım'] || 0 },
    { name: 'Abonelikler', value: totalSubscriptions },
  ].filter(item => item.value > 0);

  const COLORS = ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#0dcaf0', '#6f42c1'];

  return (
    <div className="card shadow-sm p-3 border-0 bg-white">
      <h2 className="h6 fw-bold mb-2 text-secondary">📊 Finansal Özet ve Dağılım</h2>

      {isOverBudget && (
        <div className="alert alert-danger py-1 px-2 mb-2 small" role="alert">
          <strong>⚠️ Dikkat!</strong> Harcama ({grandTotal.toFixed(2)} TL), {numericBudget} TL olan bütçenizi aştı!
        </div>
      )}
      
      <div className="row align-items-center g-2">
        <div className="col-md-5">
          <div className="row g-2 text-center">
            <div className="col-12">
              <div className={`p-2 bg-light rounded border-start border-3 ${isOverBudget ? 'border-danger' : 'border-primary'}`}>
                <span className="text-muted" style={{ fontSize: '11px' }}>Bu Ayın Toplamı / Bütçe</span>
                <h5 className={`fw-bold mb-0 ${isOverBudget ? 'text-danger' : 'text-dark'}`}>
                  {grandTotal.toFixed(2)} <span className="fs-6 text-muted">{numericBudget > 0 ? `/ ${numericBudget}` : ''}</span>
                </h5>
              </div>
            </div>
            <div className="col-6">
              <div className="p-1 bg-light rounded">
                <span className="text-muted" style={{ fontSize: '10px' }}>Tekil Harcama</span>
                <h6 className="fw-bold text-primary mb-0" style={{ fontSize: '13px' }}>{totalExpense.toFixed(2)} TL</h6>
              </div>
            </div>
            <div className="col-6">
              <div className="p-1 bg-light rounded">
                <span className="text-muted" style={{ fontSize: '10px' }}>Abonelikler</span>
                <h6 className="fw-bold mb-0" style={{ fontSize: '13px', color: '#6f42c1' }}>{totalSubscriptions.toFixed(2)} TL</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-7" style={{ height: '150px' }}>
          {grandTotal > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="45%"
                  innerRadius={30}
                  outerRadius={55}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toFixed(2)} TL`} />
                <Legend 
                  verticalAlign="bottom" 
                  height={24} 
                  iconSize={8} 
                  wrapperStyle={{ fontSize: '10px' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100 text-muted small" style={{ fontSize: '12px' }}>
              Veri bulunmuyor.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpenseChart;