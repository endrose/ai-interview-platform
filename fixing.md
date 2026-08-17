# 🛠️ Fix & Implement: AI Interview & Portfolio Generation Workflow

**Priority:** P0 (Critical - Core Feature Broken)  
**Target:** Resolving Background Job execution, Gemini AI API integration, and Candidate Portfolio generation.

---

## 📌 Task 1: Fix Background Job Infrastructure (Sidekiq / Inline Adapter)

- [x] **1.1 Configure Development Environment Queue**
  - [x] Buka `api/config/environments/development.rb`.
  - [x] Set `config.active_job.queue_adapter = :inline` (agar pekerjaan *async* berjalan tanpa perlu dependensi Sidekiq/Redis tambahan di Windows).
  - [x] Atau jika menggunakan Sidekiq, pastikan Redis service aktif (`redis-server`) dan jalankan `bundle exec sidekiq` tanpa error.
- [x] **1.2 Verify Job Execution**
  - [x] Pastikan job pencatatan/pemrosesan wawancara tidak berhenti di status `queued` atau `pending`.

---

## 📌 Task 2: Fix & Enable Gemini AI Interview Engine

- [x] **2.1 Audit Gemini API Environment Variables**
  - [x] Periksa file `api/.env` dan pastikan konfigurasi sudah diatur:
    ```env
    GEMINI_API_KEY="AIzaSy..." # Kunci API Valid dari Google AI Studio
    GEMINI_FLASH_MODEL="gemini-2.5-flash"
    GEMINI_PRO_MODEL="gemini-2.5-flash"
    ```
- [x] **2.2 Refactor Gemini Service / API Client**
  - [x] Periksa service class Gemini di `api/app/services/` (misal: `GeminiService` atau `AiInterviewService`).
  - [x] Tangani penanganan *error* saat API gagal merespons, terkena *rate limit* (429), atau memberikan format JSON tidak valid.
  - [x] Tambahkan log yang aman (tanpa mencetak PII/Data Pribadi Kandidat sesuai UU PDP).
- [x] **2.3 Test Interview AI Flow**
  - [x] Buka `web/` (`http://localhost:5173`), jalankan simulasi tes wawancara.
  - [x] Pastikan respons pertanyaan dari Gemini AI muncul secara interaktif dan status wawancara diperbarui.

---

## 📌 Task 3: Fix Portfolio & Report Generation

- [x] **3.1 Audit Portfolio Calculation Logic**
  - [x] Cek file job/service pembuat portofolio/laporan (misal: `GeneratePortfolioJob` atau `Assessments::SummaryService`).
  - [x] Tangani *edge cases*: kandidat dengan *skill* yang belum dinilai, rating kosong (`nil`), atau respons teks yang sangat panjang.
- [x] **3.2 Fix Frontend UI for Portfolio / Report**
  - [x] Periksa komponen React di `web/src/` yang menampilkan Ringkasan Portofolio Kandidat.
  - [x] Tambahkan *Loading Skeleton / Spinner* saat AI sedang memproses laporan.
  - [x] Tambahkan *Error Boundary / Retry Button* jika pemrosesan AI gagal, agar halaman tidak *crash* atau *blank*.

---

## 📌 Task 4: Automated Testing & Verification Proofs

- [x] **4.1 Write RSpec Specs for Gemini & Portfolio Jobs**
  - [x] Buat unit test di `api/spec/services/` menggunakan stub/mock (WebMock) agar pengujian tidak menghabiskan kuota Gemini API.
- [x] **4.2 Record AI Verification Moment**
  - [x] Catat 1 momen di mana kode hasil generatif AI sempat berisiko/salah, serta bagaimana solusi perbaikannya (untuk dimasukkan ke laporan PDF akhir).