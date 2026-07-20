# 💰 Smart Finance Tracker (Gelişmiş Kişisel Finans Yönetim Sistemi)

Smart Finance Tracker, bileşen tabanlı (component-based) mimari kullanılarak ReactJS ile geliştirilmiş, asenkron veri simülasyonu ve global state yönetimi içeren profesyonel bir finansal takip otomasyonudur. 

Bu proje; bütçe planlaması, harcama analizleri ve abonelik tabanlı dinamik gider yönetimini tek bir ekranda (Single Page Dashboard) optimize edilmiş performans ile sunar.

---

## 🛠️ Detaylı Teknik Analiz ve Proje Mimarisi

### 1. Global State Yönetimi: React Context API
Projede verilerin yukarıdan aşağıya (Props Drilling) taşınarak performans kaybı yaratmasını önlemek amacıyla **React Context API** kullanılmıştır. `FinanceContext.js` dosyası projenin ana veri motorudur.

*   **Merkezi Veri Havuzu (Global State):** Harcamalar (`expenses`), düzenli abonelikler (`subscriptions`), maaş günü (`payDayDate`), bütçe sınırı (`budgetLimit`) ve takvim bitiş tarihi (`endDate`) tek bir Context üzerinde tutulur.
*   **Dinamik Context Metotları:** `addExpense`, `deleteExpense`, `updateExpense`, `addSubscription`, `cancelSubscription` gibi tüm CRUD fonksiyonları Context içerisinde tanımlanarak uygulamanın en uçtaki yaprak bileşenlerine (örn: `ExpenseForm`, `SubscriptionManager`) tek bir satırla (`useContext`) enjekte edilir.

### 2. Akıllı Bütçe ve Maaş Döngüsü Mantığı (Finansal Algoritma)
Uygulama, standart uygulamalardan farklı olarak **akıllı bir zaman/bütçe filtresi** algoritmasına sahiptir:
*   **Gelecek Ay Filtreleme Mantığı:** Kullanıcı bir sonraki aya ait veya gelecekteki bir tarihe abonelik/harcama girdiğinde, bu veriler **mevcut bütçe limitinden düşülmez**. 
*   **Dinamik Kalan Bütçe Hesaplaması:** Sistem, girilen `payDayDate` ile `endDate` arasındaki aktif aralığı anlık olarak kontrol eder. Toplam harcamalar hesaplanırken, yalnızca bu tarih aralığına denk gelen güncel harcamalar formüle dahil edilir. Böylece kullanıcıya sahte bütçe alarmları verilmesi engellenir.

### 3. Kullanılan Modern React Hook'ları ve Rolleri
*   **`useState`:** Form girdilerinin (Input control) anlık takibi, modal açılış/kapanış animasyonları ve düzenleme (Edit mode) durumlarının local state yönetiminde kullanıldı.
*   **`useContext`:** `FinanceContext` yapısına bağlanarak tüm finansal havuzun global olarak okunmasını ve tetiklenmesini sağladı.
*   **`useEffect`:** Kullanıcının girdiği verilerin tarayıcı hafızasında saklanması (**LocalStorage senkronizasyonu**) ve veri değişikliklerinde grafiklerin tetiklenerek yeniden render (Re-chart re-rendering) edilmesini yönetti.

### 4. Görsel Veri Analizi: Recharts
Kullanıcının harcama alışkanlıklarını analiz edebilmesi için **Recharts** kütüphanesi entegre edilmiştir. 
*   Veri kümesi (dataset), harcama kategorilerine göre (`Gıda`, `Fatura`, `Eğlence`, `Ulaşım` vb.) `reduce` fonksiyonu ile gruplanır.
*   Dinamik pasta grafik (Pie Chart) veya bar grafik yapıları kullanılarak harcamaların oransal dağılımı kullanıcıya görsel bir rapor olarak sunulur.

### 5. UI/UX Tasarımı ve Sayfa Düzeni (Layout)
*   **Bootstrap 5 Flex & Grid:** Proje dikeyde taşma yapmaması (No-scroll layout) için tamamen Bootstrap 5'in `row`, `col-lg-*` ve `d-flex` sınıfları ile tasarlanmıştır. Tüm bileşenler tek bir ekrana sığacak şekilde ölçeklenmiştir.
*   **Custom Scroll Panelleri (`index.css`):** Sürekli uzayabilecek olan harcama ve abonelik listeleri için özel `max-height` ve `overflow-y: auto` içeren CSS sınıfları yazılmıştır. Bu sayede sayfanın genel bütünlüğü bozulmadan liste içi kaydırma deneyimi (In-app scrolling) sağlanmıştır.

---

## ⚙️ Sistemi Yerel Bilgisayarda Çalıştırma

1. Projeyi klonlayın:
   ```bash
   git clone [https://github.com/CeydaAyaz/Smart-Finance-Tracker.git](https://github.com/CeydaAyaz/Smart-Finance-Tracker.git)

2. Proje dizinine girin:

   ```bash
    cd smart-finance-tracker

3. Gerekli kütüphaneleri ve bağımlılıkları indirin:
   ```bash
   npm install

4. Projeyi lokal sunucuda ayağa kaldırın:
    ```bash
    npm start

Uygulama tarayıcınızda otomatik olarak http://localhost:3000 adresinde açılacaktır.

  👩‍💻 Geliştirici **Ceyda Ayaz** - [GitHub Profili](https://github.com/CeydaAyaz)



