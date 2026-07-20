import React, { createContext, useState, useEffect } from 'react';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('subscriptions');
    return saved ? JSON.parse(saved) : [];
  });

  const [payDayDate, setPayDayDate] = useState(() => {
    return localStorage.getItem('payDayDate') || new Date().toISOString().split('T')[0];
  });

  const [endDate, setEndDate] = useState(() => {
    return localStorage.getItem('endDate') || new Date().toISOString().split('T')[0];
  });

  const [budgetLimit, setBudgetLimit] = useState(() => {
    const saved = localStorage.getItem('budgetLimit');
    return saved ? saved : '';
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    localStorage.setItem('payDayDate', payDayDate);
    localStorage.setItem('endDate', endDate);
    localStorage.setItem('budgetLimit', budgetLimit);
  }, [expenses, subscriptions, payDayDate, endDate, budgetLimit]);

  // Taksitleri aylara göre üreten mantık
  const addExpense = (expense) => {
    const installments = parseInt(expense.installments) || 1;
    const totalAmount = parseFloat(expense.amount);
    const installmentAmount = parseFloat((totalAmount / installments).toFixed(2));
    
    if (installments > 1) {
      const generatedExpenses = [];
      const baseDate = new Date(); // Başlangıç bugünden itibaren aylara dağılır

      for (let i = 1; i <= installments; i++) {
        const targetDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + (i - 1), baseDate.getDate());
        
        generatedExpenses.push({
          id: `${Date.now()}-${i}`,
          title: `${expense.title} (${i}/${installments} Taksit)`,
          amount: installmentAmount,
          category: expense.category,
          date: targetDate.toISOString().split('T')[0],
          installmentInfo: { current: i, total: installments }
        });
      }
      setExpenses([...expenses, ...generatedExpenses]);
    } else {
      setExpenses([...expenses, { 
        ...expense, 
        amount: totalAmount,
        id: Date.now(), 
        date: new Date().toISOString().split('T')[0],
        installmentInfo: null 
      }]);
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const updateExpense = (id, updatedData) => {
    setExpenses(expenses.map(exp => exp.id === id ? { ...exp, ...updatedData, amount: parseFloat(updatedData.amount) } : exp));
  };

  const addSubscription = (sub) => {
    setSubscriptions([...subscriptions, { ...sub, id: Date.now() }]);
  };

  const deleteSubscription = (id) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
  };

  const updateSubscription = (id, updatedData) => {
    setSubscriptions(subscriptions.map(sub => sub.id === id ? { ...sub, ...updatedData, amount: parseFloat(updatedData.amount), day: parseInt(sub.day) } : sub));
  };

  return (
    <FinanceContext.Provider value={{ 
      expenses, 
      addExpense, 
      deleteExpense, 
      updateExpense,
      payDayDate, 
      setPayDayDate, 
      endDate, 
      setEndDate,
      subscriptions,
      addSubscription,
      deleteSubscription,
      updateSubscription,
      budgetLimit,
      setBudgetLimit
    }}>
      {children}
    </FinanceContext.Provider>
  );
};