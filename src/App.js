import React from 'react';
import { FinanceProvider } from './context/FinanceContext';
import PaydaySettings from './components/PaydaySettings';
import ExpenseForm from './components/ExpenseForm';
import ExpenseChart from './components/ExpenseChart';
import ExpenseList from './components/ExpenseList';
import SubscriptionManager from './components/SubscriptionManager';

function App() {
  return (
    <FinanceProvider>
      {/* Sayfanın kenar boşluklarını daraltıp tam ekran genişliği sağladık */}
      <div className="container-fluid py-2 px-4" style={{ maxWidth: '100%' }}>
        {/* Başlık */}
        <header className="text-center mb-2">
          <h1 className="h5 fw-bold text-dark mb-0">Finans Takipçim</h1>
        </header>

        {/* Genişletilmiş Desktop Grid Düzeni */}
        <div className="row g-2">
          
          {/* Üst Kısım: Bütçe / Tarih Ayarları */}
          <div className="col-12">
            <PaydaySettings />
          </div>

          {/* Sol Kolon: Grafik ve Formlar (Genişletildi) */}
          <div className="col-lg-7 d-flex flex-column gap-2">
            <ExpenseChart />
            <div className="row g-2">
              <div className="col-md-6">
                <ExpenseForm />
              </div>
              <div className="col-md-6">
                <SubscriptionManager />
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Harcama Listesi */}
          <div className="col-lg-5">
            <div className="card shadow-sm border-0 p-3 bg-white h-100">
              <h2 className="h6 fw-bold mb-2 text-secondary">Harcama Listesi</h2>
              <div style={{ maxHeight: '430px', overflowY: 'auto' }} className="pe-1">
                <ExpenseList />
              </div>
            </div>
          </div>

        </div>
      </div>
    </FinanceProvider>
  );
}

App.displayName = "App";

export default App;