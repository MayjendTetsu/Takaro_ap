// ── i18n SYSTEM ──────────────────────────────────────────────
const TRANSLATIONS = {
  id: {
    login_sub: 'Manajemen keuangan untuk generasi muda',
    tab_login: 'Masuk', tab_register: 'Daftar',
    label_email: 'Email / No. HP', label_fullname: 'Nama Lengkap',
    forgot_password: 'Lupa password?', btn_login: 'Masuk', btn_register: 'Buat Akun',
    or_continue: 'atau lanjutkan dengan', btn_google: 'Masuk dengan Google',
    btn_guest: 'Masuk sebagai Tamu', btn_cancel: 'Batal', btn_continue: 'Lanjutkan',
    google_title: 'Masuk dengan Google', google_desc: 'Masukkan akun Google yang ingin kamu gunakan',
    forgot_title: 'Lupa Password', forgot_desc: 'Masukkan email yang terdaftar untuk mereset password kamu.',
    label_new_pass: 'Password Baru', label_confirm_pass: 'Konfirmasi Password',
    btn_next: 'Selanjutnya', btn_reset: 'Reset Password',
    total_balance: 'Total Saldo', income: 'Pemasukan', expense: 'Pengeluaran',
    recent_activity: 'Aktivitas Terkini', weekly: 'Mingguan', monthly: 'Bulanan',
    see_all: 'Lihat Semua Transaksi →', monthly_budget: 'Budget Bulanan',
    add_transaction: 'Tambah Transaksi', nominal: 'Nominal', category: 'Kategori',
    description: 'Keterangan', date: 'Tanggal', account: 'Akun',
    save_transaction: 'Simpan Transaksi', toast_saved: 'Transaksi berhasil disimpan!',
    transaction_history: 'Riwayat Transaksi', type: 'Tipe', all: 'Semua',
    edit_transaction: 'Edit Transaksi', delete: 'Hapus', save: 'Simpan',
    financial_report: 'Laporan Keuangan', from: 'Dari', to: 'Sampai',
    transaction_detail: 'Detail Transaksi', multi_account: 'Multi Akun',
    add_account: 'Tambah Akun', account_name: 'Nama Akun', account_type: 'Jenis Akun',
    initial_balance: 'Saldo Awal', color: 'Warna',
    edit_profile: 'Edit Profil', appearance: 'Tampilan Aplikasi',
    language: 'Bahasa', notification_settings: 'Pengaturan Notifikasi',
    logout: 'Keluar', transactions: 'Transaksi', save_changes: 'Simpan Perubahan',
    delete_account: 'Hapus Akun',
    select_theme: 'PILIH TEMA', light_mode: 'Light Mode', dark_mode: 'Dark Mode',
    system_mode: 'Ikuti Perangkat', select_language: 'PILIH BAHASA',
    daily_notif: 'Notifikasi Harian', remind_daily: 'Ingatkan saya setiap hari pukul:',
    notifications: 'Notifikasi', report: 'Laporan', accounts: 'Akun',
    add_budget: 'Tambah Budget', budget_limit: 'Batas Budget (Rp)',
    nav_home: 'Dashboard', nav_history: 'Riwayat', nav_report: 'Laporan', nav_profile: 'Profil',
  },
  en: {
    login_sub: 'Financial management for young generation',
    tab_login: 'Login', tab_register: 'Register',
    label_email: 'Email / Phone', label_fullname: 'Full Name',
    forgot_password: 'Forgot password?', btn_login: 'Login', btn_register: 'Create Account',
    or_continue: 'or continue with', btn_google: 'Sign in with Google',
    btn_guest: 'Continue as Guest', btn_cancel: 'Cancel', btn_continue: 'Continue',
    google_title: 'Sign in with Google', google_desc: 'Enter the Google account you want to use',
    forgot_title: 'Forgot Password', forgot_desc: 'Enter your registered email to reset your password.',
    label_new_pass: 'New Password', label_confirm_pass: 'Confirm Password',
    btn_next: 'Next', btn_reset: 'Reset Password',
    total_balance: 'Total Balance', income: 'Income', expense: 'Expense',
    recent_activity: 'Recent Activity', weekly: 'Weekly', monthly: 'Monthly',
    see_all: 'See All Transactions →', monthly_budget: 'Monthly Budget',
    add_transaction: 'Add Transaction', nominal: 'Amount', category: 'Category',
    description: 'Description', date: 'Date', account: 'Account',
    save_transaction: 'Save Transaction', toast_saved: 'Transaction saved!',
    transaction_history: 'Transaction History', type: 'Type', all: 'All',
    edit_transaction: 'Edit Transaction', delete: 'Delete', save: 'Save',
    financial_report: 'Financial Report', from: 'From', to: 'To',
    transaction_detail: 'Transaction Detail', multi_account: 'Multi Account',
    add_account: 'Add Account', account_name: 'Account Name', account_type: 'Account Type',
    initial_balance: 'Initial Balance', color: 'Color',
    edit_profile: 'Edit Profile', appearance: 'App Appearance',
    language: 'Language', notification_settings: 'Notification Settings',
    logout: 'Logout', transactions: 'Transactions', save_changes: 'Save Changes',
    delete_account: 'Delete Account',
    select_theme: 'SELECT THEME', light_mode: 'Light Mode', dark_mode: 'Dark Mode',
    system_mode: 'Use Device Setting', select_language: 'SELECT LANGUAGE',
    daily_notif: 'Daily Notification', remind_daily: 'Remind me every day at:',
    notifications: 'Notifications', report: 'Report', accounts: 'Accounts',
    add_budget: 'Add Budget', budget_limit: 'Budget Limit (Rp)',
    nav_home: 'Dashboard', nav_history: 'History', nav_report: 'Report', nav_profile: 'Profile',
  }
};

let currentLang = localStorage.getItem('takaro_lang') || 'id';

function applyTranslations() {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['id'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('takaro_lang', lang);
  document.querySelectorAll('.lang-option').forEach(el => el.classList.remove('active'));
  const el = document.getElementById('lang-' + lang);
  if (el) el.classList.add('active');
  applyTranslations();
}

// ── THEME SYSTEM ──────────────────────────────────────────────
let currentTheme = localStorage.getItem('takaro_theme') || 'light';

function applyTheme(theme) {
  let actual = theme;
  if (theme === 'system') {
    actual = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', actual);
}

function setTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('takaro_theme', theme);
  applyTheme(theme);
  document.querySelectorAll('.theme-option').forEach(el => el.classList.remove('active'));
  const el = document.getElementById('theme-' + theme);
  if (el) el.classList.add('active');
}

// Listen for system theme changes
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (currentTheme === 'system') applyTheme('system');
  });
}

// ── GREETING ──────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 11) return currentLang === 'en' ? 'Good Morning' : 'Selamat Pagi';
  if (h < 15) return currentLang === 'en' ? 'Good Afternoon' : 'Selamat Siang';
  if (h < 18) return currentLang === 'en' ? 'Good Evening' : 'Selamat Sore';
  return currentLang === 'en' ? 'Good Night' : 'Selamat Malam';
}

// ── DATA VERSION (bump to clear stale localStorage) ───────────
const DATA_VERSION = '5';
if (localStorage.getItem('takaro_data_ver') !== DATA_VERSION) {
  localStorage.removeItem('takaro_trx');
  localStorage.removeItem('takaro_budgets');
  localStorage.setItem('takaro_data_ver', DATA_VERSION);
}

// ── DATA STORE ────────────────────────────────────────────────
const E = (code) => String.fromCodePoint(code);
const CATS_INCOME = [
  {id:'gaji',     emoji:E(0x1F4BC), label:'Gaji'},
  {id:'freelance',emoji:E(0x1F4BB), label:'Freelance'},
  {id:'transfer', emoji:E(0x1F4E8), label:'Transfer'},
  {id:'bonus',    emoji:E(0x1F381), label:'Bonus'},
  {id:'investasi',emoji:E(0x1F4C8), label:'Investasi'},
  {id:'jual',     emoji:E(0x1F6CD), label:'Jual'},
  {id:'beasiswa', emoji:E(0x1F393), label:'Beasiswa'},
  {id:'lain',     emoji:E(0x1F4B0), label:'Lainnya'},
];
const CATS_OUTCOME = [
  {id:'makan',    emoji:E(0x1F35C), label:'Makan'},
  {id:'transport',emoji:E(0x1F697), label:'Transport'},
  {id:'belanja',  emoji:E(0x1F6D2), label:'Belanja'},
  {id:'tagihan',  emoji:E(0x1F3E0), label:'Tagihan'},
  {id:'hiburan',  emoji:E(0x1F3AE), label:'Hiburan'},
  {id:'kesehatan',emoji:E(0x1F48A), label:'Kesehatan'},
  {id:'pendidikan',emoji:E(0x1F4DA),label:'Pendidikan'},
  {id:'lain',     emoji:E(0x1F4B8), label:'Lainnya'},
];
const DEFAULT_TRANSACTIONS = [];

const ACCOUNTS = [
  {id:'cash',name:'Cash',type:'Dompet Tunai',color:'linear-gradient(135deg,#1B2F6B,#3B5BDB)',balance:0},
  {id:'bank',name:'Bank BCA',type:'Rekening Bank',color:'linear-gradient(135deg,#0D5C8F,#1A7AB5)',balance:0},
  {id:'dompet',name:'GoPay / OVO',type:'Dompet Digital',color:'linear-gradient(135deg,#059669,#10B981)',balance:0},
];

const INIT_FLAG = 'takaro_initialized_v2';
if (!localStorage.getItem(INIT_FLAG)) {
  localStorage.removeItem('takaro_trx');
  localStorage.removeItem('takaro_budgets');
  localStorage.setItem(INIT_FLAG, '1');
}

// Per-user storage keys
function _activeUid() {
  try {
    if (currentUser?.uid) {
      return currentUser.uid;
    }

    if (
      typeof TakaroDB !== 'undefined' &&
      TakaroDB.auth &&
      typeof TakaroDB.auth.getSession === 'function'
    ) {
      const s = TakaroDB.auth.getSession();
      if (s?.uid) return s.uid;
    }

    const raw = localStorage.getItem('takaro_v1_session');
    const session = raw ? JSON.parse(raw) : null;

    return session?.uid || 'guest';
  } catch (e) {
    return 'guest';
  }
}
function _trxKey() { return 'takaro_trx_' + _activeUid(); }
function _budgetKey() { return 'takaro_budgets_' + _activeUid(); }

let BUDGETS = JSON.parse(localStorage.getItem(_budgetKey()) || 'null') || [];
function saveBudgets() {
  localStorage.setItem(_budgetKey(), JSON.stringify(BUDGETS));
}

let transactions = JSON.parse(localStorage.getItem(_trxKey()) || 'null') || DEFAULT_TRANSACTIONS;
let nextId = Math.max(0, ...transactions.map(t=>t.id)) + 1;

function save() {
  localStorage.setItem(_trxKey(), JSON.stringify(transactions));
}

function reloadUserData() {
  transactions = JSON.parse(localStorage.getItem(_trxKey()) || 'null') || [];
  BUDGETS = JSON.parse(localStorage.getItem(_budgetKey()) || 'null') || [];
  nextId = Math.max(0, ...transactions.map(t=>t.id)) + 1;
  try { ACCOUNTS.forEach(a => a.balance = 0); } catch(e) {}
}

// ── HELPERS ────────────────────────────────────────────────────
function fmt(n) {
  return 'Rp ' + Math.abs(n).toLocaleString('id-ID');
}
function fmtShort(n) {
  if(n >= 1000000) return 'Rp '+(n/1000000).toFixed(1)+'jt';
  if(n >= 1000) return 'Rp '+(n/1000).toFixed(0)+'rb';
  return 'Rp '+n;
}
function fmtDate(d) {
  const dt = new Date(d);
  return dt.toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'});
}
function today() {
  return new Date().toISOString().split('T')[0];
}

// ── NAVIGATION ─────────────────────────────────────────────────
let currentScreen = 'screen-splash';

const SCREEN_NAV_MAP = {
  'screen-home':     'home',
  'screen-history':  'history',
  'screen-report':   'report',
  'screen-accounts': 'accounts',
  'screen-profile':  'profile',
};

// Screens where bottom nav should be hidden
const SCREENS_NO_NAV = ['screen-history', 'screen-report', 'screen-add', 'screen-accounts',
  'screen-edit-profile', 'screen-notif-settings', 'screen-theme-settings',
  'screen-language-settings', 'screen-forgot-password', 'screen-splash', 'screen-login'];

function navigate(id, param) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('active');
    currentScreen = id;
    if (id === 'screen-home')         renderHome();
    if (id === 'screen-add') {
      setupAdd(param);
      currentType = param || 'outcome';
      renderCategoryGrid();
    }
    if (id === 'screen-history')      renderHistory();
    if (id === 'screen-report')       renderReport();
    if (id === 'screen-accounts')     renderAccounts();
    if (id === 'screen-profile')      renderProfile();
    if (id === 'screen-edit-profile') openEditProfile();
    if (id === 'screen-notif-settings') openNotifSettings();

    // Update bottom nav visibility
    const nav = document.getElementById('main-nav');
    if (nav) {
      if (SCREENS_NO_NAV.includes(id)) {
        nav.classList.add('nav-hidden');
      } else {
        nav.classList.remove('nav-hidden');
      }
    }

    // Auto-sync bottom nav active state
    const navName = SCREEN_NAV_MAP[id];
    if (navName) setNav(navName);
  }
}

function navTo(name) {
  const screenMap = {
    home: 'screen-home',
    history: 'screen-history',
    report: 'screen-report',
    profile: 'screen-profile',
  };
  const screen = screenMap[name];
  if (screen) {
    navigate(screen);
    setNav(name);
  }
}

function setNav(name) {
  document.querySelectorAll('.m3-nav-item').forEach(b => b.classList.remove('active'));
  const el = document.getElementById('nav-' + name);
  if (el) el.classList.add('active');
}

// ── HOME ───────────────────────────────────────────────────────
let currentPeriod = 'week';
function renderHome() {
  const income = transactions.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
  const outcome = transactions.filter(t=>t.type==='outcome').reduce((s,t)=>s+t.amount,0);
  document.getElementById('total-balance').textContent = fmt(income - outcome);
  document.getElementById('total-income').textContent = fmt(income);
  document.getElementById('total-outcome').textContent = fmt(outcome);
  renderHomeTransactions();
  renderBudgets();
}
function renderHomeTransactions() {
  const now = new Date();
  let filtered = transactions;
  if(currentPeriod === 'week') {
    const week = new Date(now); week.setDate(now.getDate()-7);
    filtered = transactions.filter(t => new Date(t.date) >= week);
  } else {
    filtered = transactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
  }
  filtered = filtered.sort((a,b) => new Date(b.date)-new Date(a.date)).slice(0,5);
  const container = document.getElementById('home-transactions');
  container.innerHTML = filtered.length ? filtered.map(trxHTML).join('') : '<p style="text-align:center;color:#9CA3AF;font-size:13px;padding:20px 0">Belum ada transaksi</p>';
}
function setPeriod(p, btn) {
  currentPeriod = p;
  document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderHomeTransactions();
}

// ── BUDGETS ───────────────────────────────────────────────────
function renderBudgets() {
  const container = document.getElementById('budget-cards');
  if (!BUDGETS.length) {
    container.innerHTML = '<p style="text-align:center;color:#9CA3AF;font-size:13px;padding:20px 0">Belum ada budget. Tambahkan budget bulananmu.</p>';
    return;
  }
  container.innerHTML = BUDGETS.map((b, idx) => {
    const spent = transactions.filter(t=>t.type==='outcome'&&t.cat===b.cat.toLowerCase()).reduce((s,t)=>s+t.amount,0);
    const pct = b.limit > 0 ? Math.min(100, Math.round(spent/b.limit*100)) : 0;
    const barColor = pct >= 90 ? '#EF4444' : pct >= 70 ? '#F59E0B' : b.color;
    return `<div class="budget-item" onclick="showBudgetMenu(${idx})">
      <div class="budget-top">
        <span class="budget-cat">${b.emoji} ${b.cat}</span>
        <span class="budget-pct" style="color:${barColor}">${pct}%</span>
      </div>
      <div class="budget-bar-bg"><div class="budget-bar" style="width:${pct}%;background:${barColor}"></div></div>
      <p class="budget-sub">${fmt(spent)} dari ${fmt(b.limit)}</p>
    </div>`;
  }).join('');
}

let selectedBudgetIndex = null;
let editingBudgetIndex = null;

function showBudgetMenu(idx) {
  selectedBudgetIndex = idx;

  document
    .getElementById('budget-action-modal')
    .classList.add('open');
}
function editBudget(idx) {
  editingBudgetIndex = idx;

  const budget = BUDGETS[idx];

  const sel = document.getElementById('budget-cat');

  sel.innerHTML = CATS_OUTCOME.map(
    c => `<option value="${c.id}">${c.emoji} ${c.label}</option>`
  ).join('');

  document.getElementById('budget-limit').value = budget.limit;

  const cat = CATS_OUTCOME.find(
    c => c.label === budget.cat
  );

  if (cat) {
    sel.value = cat.id;
  }

  closeBudgetActionModal();

  document
    .getElementById('budget-modal')
    .classList.add('open');
}
function closeBudgetActionModal() {
  document
    .getElementById('budget-action-modal')
    .classList.remove('open');
}

function openBudgetModal() {
  const sel = document.getElementById('budget-cat');
  sel.innerHTML = CATS_OUTCOME.map(c => `<option value="${c.id}">${c.emoji} ${c.label}</option>`).join('');
  document.getElementById('budget-limit').value = '';
  document.getElementById('budget-modal').classList.add('open');
}
function closeBudgetModal() {
  document.getElementById('budget-modal').classList.remove('open');
}

function saveBudget() {
  const catId = document.getElementById('budget-cat').value;
  const limit = parseInt(document.getElementById('budget-limit').value) || 0;

  if (limit < 1000) {
    alert('Minimal budget Rp 1.000!');
    return;
  }

  const cat = CATS_OUTCOME.find(c => c.id === catId);

  if (!cat) return;

  if (editingBudgetIndex !== null) {

    BUDGETS[editingBudgetIndex] = {
      cat: cat.label,
      emoji: cat.emoji,
      limit,
      color: '#22C55E'
    };

    editingBudgetIndex = null;

  } else {

    const existing = BUDGETS.findIndex(
      b => b.cat.toLowerCase() === catId
    );

    if (existing >= 0) {
      BUDGETS[existing].limit = limit;
    } else {
      BUDGETS.push({
        cat: cat.label,
        emoji: cat.emoji,
        limit,
        color: '#22C55E'
      });
    }
  }

  saveBudgets();

  closeBudgetModal();

  renderBudgets();
}
function deleteBudget(idx) {
  BUDGETS.splice(idx, 1);

  saveBudgets();

  closeBudgetActionModal();

  renderBudgets();
}

// ── TRANSACTION HTML ──────────────────────────────────────────
function trxHTML(t) {
  const sign = t.type === 'income' ? '+' : '-';
  return `<div class="trx-item" onclick="openEditTrxModal(${t.id})">
    <div class="trx-icon" style="background:${t.type==='income'?'#DCFCE7':'#FEE2E2'}">${t.emoji||'💳'}</div>
    <div class="trx-info">
      <p class="trx-name">${t.desc}</p>
      <p class="trx-date">${fmtDate(t.date)}</p>
    </div>
    <span class="trx-amount ${t.type}">${sign}${fmt(t.amount)}</span>
  </div>`;
}
function switchAccount(i) {
  document.querySelectorAll('.dot').forEach((d,idx) => d.classList.toggle('active', idx===i));
  const acc = ACCOUNTS[i];
  const accIncome = transactions.filter(t=>t.account===acc.id&&t.type==='income').reduce((s,t)=>s+t.amount,0);
  const accOutcome = transactions.filter(t=>t.account===acc.id&&t.type==='outcome').reduce((s,t)=>s+t.amount,0);
  document.getElementById('total-balance').textContent = fmt(acc.balance + accIncome - accOutcome);
}

// ── NOTIFICATIONS ──────────────────────────────────────────────
function showNotifPanel() {
  const panel = document.getElementById('notif-panel');
  const overlay = document.getElementById('notif-overlay');
  panel.classList.add('open');
  overlay.classList.add('show');
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth(), d = now.getDate();
  let incomeToday = 0, outcomeToday = 0;
  transactions.forEach(t => {
    const td = new Date(t.date);
    if (td.getFullYear()===y && td.getMonth()===m && td.getDate()===d) {
      if (t.type === 'income') incomeToday += t.amount;
      else if (t.type === 'outcome') outcomeToday += t.amount;
    }
  });
  const saldoToday = incomeToday - outcomeToday;
  const hasInput = incomeToday > 0 || outcomeToday > 0;
  const dynamicNotifs = hasInput ? [
    {icon:'💰',title:'Total Pemasukan Hari Ini',desc:fmt(incomeToday),time:'Baru saja',bg:'#F0FDF4'},
    {icon:'💸',title:'Total Pengeluaran Hari Ini',desc:fmt(outcomeToday),time:'Baru saja',bg:'#FEF2F2'},
    {icon:'🧾',title:'Total Saldo Hari Ini',desc:`${saldoToday>=0?'+':''}${fmt(saldoToday)}`,time:'Baru saja',bg:'#EEF2FF'},
  ] : [
    {icon:'💡',title:'Belum Ada Transaksi Hari Ini',desc:'Catat pemasukan atau pengeluaranmu.',time:'Baru saja',bg:'#EEF2FF'},
  ];
  document.getElementById('notif-list').innerHTML = dynamicNotifs.map(n =>
    `<div class="notif-item">
      <div class="notif-icon" style="background:${n.bg}">${n.icon}</div>
      <div class="notif-text">
        <p class="notif-title">${n.title}</p>
        <p class="notif-desc">${n.desc}</p>
        <p class="notif-time">${n.time}</p>
      </div>
    </div>`
  ).join('');
}
function hideNotifPanel() {
  document.getElementById('notif-panel').classList.remove('open');
  document.getElementById('notif-overlay').classList.remove('show');
}

// ── ADD TRANSACTION ────────────────────────────────────────────
let selectedCat = null;
let currentType = 'outcome';
function setupAdd(param) {
  const type = param || currentType;
  currentType = type;
  selectedCat = null;
  document.getElementById('amount-input').value = '';
  document.getElementById('add-desc').value = '';
  document.getElementById('add-date').value = today();
  const accSel = document.getElementById('add-account');
  if (accSel) {
    const prev = accSel.value;
    accSel.innerHTML = ACCOUNTS.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
    if (prev && ACCOUNTS.some(a => a.id === prev)) accSel.value = prev;
  }
  setType(type);
}
function setType(type) {
  currentType = type;
  selectedCat = null;
  document.getElementById('type-income').classList.toggle('active', type==='income');
  document.getElementById('type-outcome').classList.toggle('active', type==='outcome');
  renderCategoryGrid();
}
function renderCategoryGrid() {
  const cats = currentType === 'income' ? CATS_INCOME : CATS_OUTCOME;
  const grid = document.getElementById('category-grid');
  grid.innerHTML = cats.map(c =>
    `<button class="cat-btn ${selectedCat===c.id?'selected':''}" onclick="selectCat('${c.id}')">
      <span class="cat-emoji">${c.emoji}</span>
      <span class="cat-label">${c.label}</span>
    </button>`
  ).join('');
}
function selectCat(id) {
  selectedCat = id;
  renderCategoryGrid();
}
function formatAmount(el) {
  let val = el.value.replace(/\D/g,'');
  el.value = val ? parseInt(val).toLocaleString('id-ID') : '';
}
function saveTransaction() {
  const rawAmt = document.getElementById('amount-input').value.replace(/\./g,'').replace(/,/g,'');
  const amount = parseInt(rawAmt) || 0;
  const desc = document.getElementById('add-desc').value.trim() || 'Transaksi';
  const date = document.getElementById('add-date').value || today();
  const account = document.getElementById('add-account').value;
  if(amount <= 0) { alert('Masukkan nominal yang valid!'); return; }
  const cats = currentType === 'income' ? CATS_INCOME : CATS_OUTCOME;
  const catId = selectedCat || cats[cats.length-1].id;
  const cat = cats.find(c=>c.id===catId) || cats[cats.length-1];
  transactions.push({id:nextId++,type:currentType,cat:catId,emoji:cat.emoji,desc,amount,date,account});
  save();
  showToast();
  document.getElementById('amount-input').value = '';
  document.getElementById('add-desc').value = '';
  selectedCat = null;
  renderCategoryGrid();
}
function showToast() {
  const t = document.getElementById('toast-success');
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2500);
}

// ── HISTORY ────────────────────────────────────────────────────
let historyFilter = 'all';
let filterOpen = false;
function toggleFilter() {
  filterOpen = !filterOpen;
  document.getElementById('filter-bar').style.display = filterOpen ? 'block' : 'none';
}
function setHistoryFilter(f, btn) {
  historyFilter = f;
  document.querySelectorAll('.filter-pill').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderHistory();
}
function filterHistory() {
  renderHistory();
}
function renderHistory() {
  const query = (document.getElementById('search-input')?.value||'').toLowerCase();
  let data = transactions.filter(t => {
    const matchType = historyFilter === 'all' || t.type === historyFilter;
    const matchQ = !query || t.desc.toLowerCase().includes(query);
    return matchType && matchQ;
  });
  data = data.sort((a,b) => new Date(b.date)-new Date(a.date));
  const groups = {};
  data.forEach(t => {
    if(!groups[t.date]) groups[t.date] = [];
    groups[t.date].push(t);
  });
  const container = document.getElementById('history-list');
  if(!data.length) {
    container.innerHTML = '<p style="text-align:center;color:#9CA3AF;font-size:13px;padding:32px 0">Tidak ada transaksi ditemukan</p>';
    return;
  }
  container.innerHTML = Object.entries(groups).sort((a,b)=>new Date(b[0])-new Date(a[0])).map(([date, items]) =>
    `<div class="history-date-group">
      <p class="history-date-label">${fmtDate(date)}</p>
      <div class="history-items">${items.map(trxHTML).join('')}</div>
    </div>`
  ).join('');
}

// ── EDIT TRANSACTION ──────────────────────────────────────────
function openEditTrxModal(id) {
  const trx = transactions.find(t => t.id === id);
  if (!trx) return;
  document.getElementById('edit-trx-id').value = id;
  document.getElementById('edit-trx-desc').value = trx.desc;
  document.getElementById('edit-trx-amount').value = trx.amount;
  document.getElementById('edit-trx-date').value = trx.date;
  // Populate category select
  const cats = trx.type === 'income' ? CATS_INCOME : CATS_OUTCOME;
  const sel = document.getElementById('edit-trx-cat');
  sel.innerHTML = cats.map(c => `<option value="${c.id}" ${c.id===trx.cat?'selected':''}>${c.emoji} ${c.label}</option>`).join('');
  document.getElementById('edit-trx-modal').classList.add('open');
}
function closeEditTrxModal() {
  document.getElementById('edit-trx-modal').classList.remove('open');
}
function saveEditTransaction() {
  const id = parseInt(document.getElementById('edit-trx-id').value);
  const idx = transactions.findIndex(t => t.id === id);
  if (idx === -1) return;
  const desc = document.getElementById('edit-trx-desc').value.trim() || 'Transaksi';
  const amount = parseInt(document.getElementById('edit-trx-amount').value) || 0;
  const date = document.getElementById('edit-trx-date').value || today();
  const catId = document.getElementById('edit-trx-cat').value;
  if (amount <= 0) { alert('Nominal harus lebih dari 0!'); return; }
  const cats = transactions[idx].type === 'income' ? CATS_INCOME : CATS_OUTCOME;
  const cat = cats.find(c => c.id === catId) || cats[cats.length-1];
  transactions[idx] = { ...transactions[idx], desc, amount, date, cat: catId, emoji: cat.emoji };
  save();
  closeEditTrxModal();
  renderHistory();
}
function deleteTransaction() {
  const id = parseInt(document.getElementById('edit-trx-id').value);
  if (!confirm('Hapus transaksi ini?')) return;
  transactions = transactions.filter(t => t.id !== id);
  save();
  closeEditTrxModal();
  renderHistory();
}

// ── REPORT ────────────────────────────────────────────────────
let reportView = 'income';
const CHART_COLORS = ['#7B1F3A','#1B2F6B','#22C55E','#F59E0B','#8B5CF6','#EF4444','#3B82F6','#F97316'];

function renderReport() {
  const now = new Date();
  const ym = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
  const pm = now.getMonth() === 0 ? (now.getFullYear()-1)+'-12' : now.getFullYear()+'-'+String(now.getMonth()).padStart(2,'0');
  const rFrom = document.getElementById('report-from');
  const rTo = document.getElementById('report-to');
  if (rFrom && !rFrom.value) rFrom.value = pm;
  if (rTo && !rTo.value) rTo.value = ym;
  updateReport();
}

function setReportView(v, btn) {
  reportView = v;
  document.querySelectorAll('.report-period-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  updateReport();
}
function updateReport() {
  const from = document.getElementById('report-from').value;
  const to = document.getElementById('report-to').value;
  let data = transactions.filter(t => t.type === reportView);
  if(from) data = data.filter(t => t.date >= from+'-01');
  if(to) { const end = to+'-31'; data = data.filter(t => t.date <= end); }
  const total = data.reduce((s,t)=>s+t.amount, 0);
  document.getElementById('donut-total-text').textContent = fmtShort(total);
  const bycat = {};
  data.forEach(t => {
    const cats = reportView==='income'?CATS_INCOME:CATS_OUTCOME;
    const cat = cats.find(c=>c.id===t.cat) || cats[cats.length-1];
    if(!bycat[cat.label]) bycat[cat.label] = {amount:0, emoji:cat.emoji};
    bycat[cat.label].amount += t.amount;
  });
  const entries = Object.entries(bycat).sort((a,b)=>b[1].amount-a[1].amount);
  drawDonut(entries, total);
  const legend = document.getElementById('chart-legend');
  legend.innerHTML = entries.map(([label, val], i) => {
    const pct = total ? Math.round(val.amount/total*100) : 0;
    return `<div class="legend-item">
      <div class="legend-left">
        <div class="legend-dot" style="background:${CHART_COLORS[i%CHART_COLORS.length]}"></div>
        <div>
          <p class="legend-cat">${val.emoji} ${label}</p>
          <p class="legend-pct">${pct}%</p>
        </div>
      </div>
      <span class="legend-amount">${fmt(val.amount)}</span>
    </div>`;
  }).join('');
  const rtrx = document.getElementById('report-transactions');
  const sorted = data.sort((a,b)=>new Date(b.date)-new Date(a.date));
  rtrx.innerHTML = sorted.length ? sorted.map(trxHTML).join('') : '<p style="text-align:center;color:#9CA3AF;font-size:13px;padding:20px">Tidak ada data</p>';
}
function drawDonut(entries, total) {
  const svg = document.getElementById('donut-chart');
  const r = 70, cx = 100, cy = 100, sw = 28;
  const circ = 2 * Math.PI * r;
  svg.querySelectorAll('.seg').forEach(s=>s.remove());
  if(!total || !entries.length) return;
  let offset = -0.25 * circ;
  entries.forEach(([label, val], i) => {
    const frac = val.amount / total;
    const dash = frac * circ;
    const gap = circ - dash;
    const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('class','seg');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('fill','none');
    circle.setAttribute('stroke', CHART_COLORS[i%CHART_COLORS.length]);
    circle.setAttribute('stroke-width', sw);
    circle.setAttribute('stroke-dasharray', `${dash} ${gap}`);
    circle.setAttribute('stroke-dashoffset', -offset);
    circle.setAttribute('stroke-linecap','butt');
    svg.insertBefore(circle, svg.querySelector('.donut-center-g'));
    offset += dash;
  });
}

// ── ACCOUNTS ──────────────────────────────────────────────────
function renderAccounts() {
  const income = (id) => transactions.filter(t=>t.account===id&&t.type==='income').reduce((s,t)=>s+t.amount,0);
  const outcome = (id) => transactions.filter(t=>t.account===id&&t.type==='outcome').reduce((s,t)=>s+t.amount,0);
  document.getElementById('accounts-list').innerHTML = ACCOUNTS.map((a, idx) =>
    `<div class="account-card" style="background:${a.color}">
      <button class="account-delete-btn" onclick="deleteFinancialAccount(${idx})" title="Hapus akun">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>
      <p class="account-type">${a.type}</p>
      <p class="account-name">${a.name}</p>
      <div style="display:flex;gap:20px;margin-top:12px">
        <div>
          <p style="font-size:10px;color:rgba(255,255,255,0.6);font-weight:600">Masuk</p>
          <p style="font-size:13px;font-weight:700;color:#86EFAC">+${fmt(income(a.id))}</p>
        </div>
        <div>
          <p style="font-size:10px;color:rgba(255,255,255,0.6);font-weight:600">Keluar</p>
          <p style="font-size:13px;font-weight:700;color:#FCA5A5">-${fmt(outcome(a.id))}</p>
        </div>
      </div>
      <p class="account-balance">${fmt(a.balance + income(a.id) - outcome(a.id))}</p>
    </div>`
  ).join('');
}

function deleteFinancialAccount(idx) {
  if (ACCOUNTS.length <= 1) {
    alert('Minimal harus ada 1 akun!');
    return;
  }
  if (!confirm(`Hapus akun "${ACCOUNTS[idx].name}"?`)) return;
  ACCOUNTS.splice(idx, 1);
  renderAccounts();
  // Update account select in add transaction
  const accSel = document.getElementById('add-account');
  if (accSel) {
    accSel.innerHTML = ACCOUNTS.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
  }
}

// ── PROFILE ───────────────────────────────────────────────────
function renderProfile() {
  applyUser();
  const income  = transactions.filter(t=>t.type==='income') .reduce((s,t)=>s+t.amount,0);
  const outcome = transactions.filter(t=>t.type==='outcome').reduce((s,t)=>s+t.amount,0);
  document.getElementById('pstat-transactions').textContent = transactions.length;
  document.getElementById('pstat-income').textContent  = fmtShort(income);
  document.getElementById('pstat-outcome').textContent = fmtShort(outcome);
  const star = document.getElementById('profile-star');
  if (star) star.style.display = (currentUser?.role === 'admin') ? 'flex' : 'none';
}

// ── INIT ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Apply theme and language
  applyTheme(currentTheme);
  // Set theme option active
  document.querySelectorAll('.theme-option').forEach(el => el.classList.remove('active'));
  const themeEl = document.getElementById('theme-' + currentTheme);
  if (themeEl) themeEl.classList.add('active');
  // Set language option active
  document.querySelectorAll('.lang-option').forEach(el => el.classList.remove('active'));
  const langEl = document.getElementById('lang-' + currentLang);
  if (langEl) langEl.classList.add('active');

  applyTranslations();

  // Hide nav initially
  const nav = document.getElementById('main-nav');
  if (nav) nav.classList.add('nav-hidden');

  // After intro animation, go to login or home
  setTimeout(() => {
    try {
      if (typeof TakaroDB !== 'undefined') {
        currentUser = TakaroDB.auth.getSession();
      }

      if (!currentUser) {
        currentUser = JSON.parse(
          localStorage.getItem('takaro_v1_session') || 'null'
        );
      }
    } catch (e) {
      currentUser = null;
    }

    if (currentUser) {
      applyUser();
      navigate('screen-home');
    } else {
      navigate('screen-login');
    }
  }, 3000);
});

// ── AUTH (uses TakaroDB from db.js) ──────────────────────────
let currentUser = null;

try {
  if (typeof TakaroDB !== 'undefined') {
    currentUser = TakaroDB.auth.getSession();
  }

  if (!currentUser) {
    currentUser = JSON.parse(
      localStorage.getItem('takaro_v1_session') || 'null'
    );
  }
} catch (e) {
  currentUser = null;
}

const ADMIN = { uid:'admin', name:'Administrator', email:'admin', initial:'A', role:'admin' };

function setLoginTab(tab) {
  document.getElementById('tab-masuk').classList.toggle('active', tab === 'masuk');
  document.getElementById('tab-daftar').classList.toggle('active', tab === 'daftar');
  document.getElementById('form-masuk').style.display = tab === 'masuk' ? 'block' : 'none';
  document.getElementById('form-daftar').style.display = tab === 'daftar' ? 'block' : 'none';
  // Clear login error
  hideLoginError();
}
function togglePass(id) {
  const el = document.getElementById(id);
  el.type = el.type === 'password' ? 'text' : 'password';
}

function showLoginError(msg) {
  const el = document.getElementById('login-error');
  const txt = document.getElementById('login-error-text');
  if (el && txt) {
    txt.textContent = msg;
    el.style.display = 'flex';
  }
}
function hideLoginError() {
  const el = document.getElementById('login-error');
  if (el) el.style.display = 'none';
}

function doLogin() {
  hideLoginError();
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-pass').value;
  if (!email || !password) { showLoginError('Isi email/username dan password!'); return; }
  const result = TakaroDB.auth.login({ email, password });
  if (!result.ok) { showLoginError(result.error); return; }
  _setUser(result.user);
}
function doRegister() {
  hideLoginError();
  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-pass').value;
  if (!name || !email || !password) { showLoginError('Lengkapi semua data!'); return; }
  if (password.length < 8) { showLoginError('Password minimal 8 karakter!'); return; }
  const result = TakaroDB.auth.register({ name, email, password });
  if (!result.ok) { showLoginError(result.error); return; }
  _setUser(result.user);
}
function doGuestLogin() {
  _setUser({ uid: 'guest', name: 'Tamu', email: '-', initial: 'T', role: 'guest' });
}
function doLogout() {
  if (!confirm('Yakin ingin keluar?')) return;
  currentUser = null;
  TakaroDB.auth.clearSession();
  // Reset Google button text
  const btnGoogle = document.getElementById('btn-google');
  if (btnGoogle) {
    const span = btnGoogle.querySelector('span');
    if (span) span.textContent = TRANSLATIONS[currentLang]?.btn_google || 'Masuk dengan Google';
  }
  // Clear any login error
  hideLoginError();
  navigate('screen-login');
}
function _setUser(user) {
  currentUser = user;
  TakaroDB.auth.setSession(user);
  reloadUserData();
  applyUser();
  navigate('screen-home');
  try { renderHome(); } catch(e) {}
}
function applyUser() {
  if (!currentUser) return;
  const initial = currentUser.initial || currentUser.name[0].toUpperCase();
  const name = currentUser.name || 'Pengguna';
  const firstName = name.split(' ')[0];
  const greeting = getGreeting();
  document.querySelectorAll('.avatar').forEach(el => el.textContent = initial);
  document.querySelectorAll('.greeting').forEach(el => el.textContent = greeting);
  document.querySelectorAll('.username').forEach(el => el.textContent = 'Halo, ' + firstName + '!');
  document.querySelectorAll('.profile-avatar').forEach(el => el.textContent = initial);
  document.querySelectorAll('.profile-name').forEach(el => el.textContent = name);
  document.querySelectorAll('.profile-email').forEach(el => el.textContent = currentUser.email || '');
  if (currentUser.role === 'admin') {
    document.querySelectorAll('.greeting').forEach(el => el.textContent = greeting + ' - Mode Admin');
  }
}

// ── GOOGLE LOGIN ──────────────────────────────────────────────
let _googleLoginCancelled = false;

function doGoogleLogin() {
  _googleLoginCancelled = false;
  const nameInput = document.getElementById('google-name-input');
  const emailInput = document.getElementById('google-email-input');
  if (nameInput) nameInput.value = '';
  if (emailInput) emailInput.value = '';
  const errEl = document.getElementById('google-error');
  if (errEl) errEl.style.display = 'none';
  document.getElementById('google-modal').classList.add('open');
}
function closeGoogleModal() {
  _googleLoginCancelled = true;
  document.getElementById('google-modal').classList.remove('open');
  const btnGoogle = document.getElementById('btn-google');
  if (btnGoogle) {
    const span = btnGoogle.querySelector('span');
    if (span) span.textContent = TRANSLATIONS[currentLang]?.btn_google || 'Masuk dengan Google';
  }
}
function submitGoogleForm() {
  const name = document.getElementById('google-name-input').value.trim();
  const email = document.getElementById('google-email-input').value.trim();
  const errEl = document.getElementById('google-error');
  const errTxt = document.getElementById('google-error-text');
  if (errEl) errEl.style.display = 'none';
  if (!name || !email) {
    if (errEl && errTxt) { errTxt.textContent = 'Lengkapi nama dan email!'; errEl.style.display = 'flex'; }
    return;
  }
  if (!email.includes('@')) {
    if (errEl && errTxt) { errTxt.textContent = 'Email tidak valid!'; errEl.style.display = 'flex'; }
    return;
  }
  const result = TakaroDB.auth.loginWithGoogle({ email, name });
  if (!result.ok) {
    if (errEl && errTxt) { errTxt.textContent = result.error; errEl.style.display = 'flex'; }
    return;
  }
  _googleLoginCancelled = false;
  document.getElementById('google-modal').classList.remove('open');
  const btnGoogle = document.getElementById('btn-google');
  if (btnGoogle) { const span = btnGoogle.querySelector('span'); if (span) span.textContent = 'Menghubungkan...'; }
  setTimeout(() => {
    const btn = document.getElementById('btn-google');
    if (btn) { const s = btn.querySelector('span'); if (s) s.textContent = TRANSLATIONS[currentLang]?.btn_google || 'Masuk dengan Google'; }
    _setUser(result.user);
  }, 900);
}

// ── FORGOT PASSWORD ──────────────────────────────────────────
let _forgotEmail = '';

function forgotStep1() {
  const email = document.getElementById('forgot-email').value.trim();
  const errEl = document.getElementById('forgot-error');
  const errTxt = document.getElementById('forgot-error-text');
  const sucEl = document.getElementById('forgot-success');

  errEl.style.display = 'none';
  sucEl.style.display = 'none';

  if (!email) { errTxt.textContent = 'Masukkan email!'; errEl.style.display = 'block'; return; }

  const user = TakaroDB.auth.findByEmail(email);
  if (!user) {
    errTxt.textContent = 'Email tidak ditemukan di database.';
    errEl.style.display = 'block';
    return;
  }

  _forgotEmail = email;
  document.getElementById('forgot-step1').style.display = 'none';
  document.getElementById('forgot-step2').style.display = 'block';
}

function forgotStep2() {
  const newPass = document.getElementById('forgot-new-pass').value;
  const confirmPass = document.getElementById('forgot-confirm-pass').value;
  const errEl = document.getElementById('forgot-error');
  const errTxt = document.getElementById('forgot-error-text');
  const sucEl = document.getElementById('forgot-success');
  const sucTxt = document.getElementById('forgot-success-text');

  errEl.style.display = 'none';
  sucEl.style.display = 'none';

  if (!newPass || newPass.length < 8) {
    errTxt.textContent = 'Password minimal 8 karakter!';
    errEl.style.display = 'block';
    return;
  }
  if (newPass !== confirmPass) {
    errTxt.textContent = 'Password tidak cocok!';
    errEl.style.display = 'block';
    return;
  }

  const result = TakaroDB.auth.resetPassword(_forgotEmail, newPass);
  if (!result.ok) {
    errTxt.textContent = result.error;
    errEl.style.display = 'block';
    return;
  }

  sucTxt.textContent = 'Password berhasil direset! Silakan login.';
  sucEl.style.display = 'block';
  document.getElementById('forgot-step2').style.display = 'none';

  // Navigate back to login after 2 seconds
  setTimeout(() => {
    document.getElementById('forgot-step1').style.display = 'block';
    document.getElementById('forgot-step2').style.display = 'none';
    sucEl.style.display = 'none';
    errEl.style.display = 'none';
    navigate('screen-login');
  }, 2000);
}

// ── EDIT PROFILE ──────────────────────────────────────────────
function openEditProfile() {
  if (!currentUser) return;
  document.getElementById('edit-username').value = currentUser.name || '';
  document.getElementById('edit-email').value    = currentUser.email && currentUser.email !== '-' ? currentUser.email : '';
  document.getElementById('edit-phone').value    = currentUser.phone || '';
  document.getElementById('edit-password').value = '';
  document.getElementById('edit-avatar').textContent = (currentUser.initial || (currentUser.name||'U')[0]).toUpperCase();
}
function saveEditProfile() {
  if (!currentUser) return;
  const name  = document.getElementById('edit-username').value.trim();
  const email = document.getElementById('edit-email').value.trim();
  const phone = document.getElementById('edit-phone').value.trim();
  const pass  = document.getElementById('edit-password').value;
  if (!name) { alert('Username tidak boleh kosong!'); return; }
  currentUser = {
    ...currentUser,
    name,
    email: email || currentUser.email,
    phone,
    initial: name[0].toUpperCase(),
  };
  if (pass) currentUser.password = pass;
  TakaroDB.auth.setSession(currentUser);
  // Also update in DB
  if (currentUser.uid && currentUser.uid !== 'guest') {
    TakaroDB.auth.updateUser(currentUser.uid, { name, email: email || currentUser.email, phone, initial: name[0].toUpperCase() });
  }
  applyUser();
  alert('Profil berhasil diperbarui!');
  navigate('screen-profile');
}

// ── DELETE USER ACCOUNT ──────────────────────────────────────
function deleteUserAccount() {
  if (!currentUser) return;
  if (currentUser.uid === 'guest') {
    alert('Akun tamu tidak bisa dihapus!');
    return;
  }
  if (currentUser.uid === 'admin') {
    alert('Akun admin tidak bisa dihapus!');
    return;
  }
  if (!confirm('Yakin ingin menghapus akun? Semua data transaksi akan hilang dan tidak bisa dikembalikan.')) return;
  if (!confirm('Apakah kamu benar-benar yakin? Tindakan ini TIDAK BISA dibatalkan!')) return;

  TakaroDB.auth.deleteUser(currentUser.uid);
  currentUser = null;
  hideLoginError();
  navigate('screen-login');
  alert('Akun berhasil dihapus.');
}

// ── NOTIFICATION SETTINGS ─────────────────────────────────────
function _loadNotifSettings() {
  try { return JSON.parse(localStorage.getItem('takaro_notif')) || {}; }
  catch(e) { return {}; }
}
let _notifTime = '20:00';
function _setNotifTimeBtn(v) {
  if (!/^\d{2}:\d{2}$/.test(v || '')) v = '20:00';
  _notifTime = v;
  const btn = document.getElementById('notif-time-btn');
  if (btn) btn.title = 'Jam: ' + v;
  const inp = document.getElementById('notif-time-input');
  if (inp && inp.value !== v) inp.value = v;
}
function onNotifTimeInputChange(v) {
  _setNotifTimeBtn(v || '20:00');
}
function openNotifSettings() {
  const s = _loadNotifSettings();
  _setNotifTimeBtn(s.time || '20:00');
  document.getElementById('notif-silent').checked  = !!s.silent;
  document.getElementById('notif-income').checked  = s.income !== false;
  document.getElementById('notif-outcome').checked = s.outcome !== false;
}
function saveNotifSettings() {
  const data = {
    time:    _notifTime,
    silent:  document.getElementById('notif-silent').checked,
    income:  document.getElementById('notif-income').checked,
    outcome: document.getElementById('notif-outcome').checked,
  };
  localStorage.setItem('takaro_notif', JSON.stringify(data));
  _scheduleDailyNotif();
  if ('Notification' in window && Notification.permission === 'default') {
    try { Notification.requestPermission(); } catch(e) {}
  }
  alert('Pengaturan notifikasi disimpan!');
  navigate('screen-profile');
}

// ── DAILY NOTIFICATION SCHEDULER ──────────────────────────────
let _notifTimer = null;
function _fireDailyNotif() {
  const s = _loadNotifSettings();
  if (s.silent) return;
  const title = 'Reminder Harian Takaro';
  let incomeToday = 0, outcomeToday = 0;
  try {
    const today = new Date();
    const y = today.getFullYear(), m = today.getMonth(), d = today.getDate();
    transactions.forEach(t => {
      const td = new Date(t.date);
      if (td.getFullYear()===y && td.getMonth()===m && td.getDate()===d) {
        if (t.type === 'income') incomeToday += t.amount;
        else if (t.type === 'outcome') outcomeToday += t.amount;
      }
    });
  } catch(e) {}
  const body = 'Total pemasukan hari ini: ' + fmt(incomeToday) +
               '\nTotal pengeluaran hari ini: ' + fmt(outcomeToday);
  if ('Notification' in window && Notification.permission === 'granted') {
    try { new Notification(title, { body: body, icon: 'logo.png' }); }
    catch(e) { alert(title + '\n' + body); }
  } else {
    alert(title + '\n' + body);
  }
}
function _scheduleDailyNotif() {
  if (_notifTimer) { clearTimeout(_notifTimer); _notifTimer = null; }
  const s = _loadNotifSettings();
  const t = (s.time || '20:00');
  const m = /^(\d{1,2}):(\d{2})$/.exec(t);
  if (!m) return;
  const hh = parseInt(m[1],10), mm = parseInt(m[2],10);
  const now = new Date();
  const next = new Date();
  next.setHours(hh, mm, 0, 0);
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
  const delay = next.getTime() - now.getTime();
  _notifTimer = setTimeout(function() {
    _fireDailyNotif();
    _scheduleDailyNotif();
  }, delay);
}
if (typeof window !== 'undefined') {
  try { _scheduleDailyNotif(); } catch(e) {}
  if ('Notification' in window && Notification.permission === 'default') {
    setTimeout(function(){ try { Notification.requestPermission(); } catch(e){} }, 1500);
  }
}

// Time Picker (scrolling wheel: hour + minute)
const TP_ITEM_H = 40;
function _buildWheel(innerEl, max) {
  let html = '';
  for (let i = 0; i < max; i++) {
    html += `<div class="tp-item" data-v="${i}">${String(i).padStart(2,'0')}</div>`;
  }
  innerEl.innerHTML = html;
}
function _updateWheelActive(wheelEl) {
  const idx = Math.round(wheelEl.scrollTop / TP_ITEM_H);
  const items = wheelEl.querySelectorAll('.tp-item');
  items.forEach((el, i) => el.classList.toggle('active', i === idx));
  return idx;
}
function _attachWheel(wheelEl) {
  if (wheelEl._tpBound) return;
  wheelEl._tpBound = true;
  let scrollTO = null;
  wheelEl.addEventListener('scroll', () => {
    _updateWheelActive(wheelEl);
    clearTimeout(scrollTO);
    scrollTO = setTimeout(() => {
      const idx = Math.round(wheelEl.scrollTop / TP_ITEM_H);
      wheelEl.scrollTo({ top: idx * TP_ITEM_H, behavior: 'smooth' });
    }, 90);
  });
  wheelEl.addEventListener('click', (e) => {
    const item = e.target.closest('.tp-item');
    if (!item) return;
    const idx = parseInt(item.dataset.v, 10);
    wheelEl.scrollTo({ top: idx * TP_ITEM_H, behavior: 'smooth' });
  });
}
function _setWheelValue(wheelEl, v) {
  wheelEl.scrollTop = v * TP_ITEM_H;
  _updateWheelActive(wheelEl);
}
function openTimePicker() {
  const wh = document.getElementById('tp-wheel-h');
  const wm = document.getElementById('tp-wheel-m');
  if (!wh.querySelector('.tp-item')) _buildWheel(document.getElementById('tp-wheel-h-inner'), 24);
  if (!wm.querySelector('.tp-item')) _buildWheel(document.getElementById('tp-wheel-m-inner'), 60);
  _attachWheel(wh);
  _attachWheel(wm);
  const [hh, mm] = (_notifTime || '20:00').split(':').map(Number);
  document.getElementById('tp-overlay').classList.add('show');
  document.getElementById('tp-modal').classList.add('show');
  const period = hh < 12 ? 'Pagi' : (hh < 18 ? 'Siang' : 'Malam');
  document.getElementById('tp-period').textContent = period + ' · ' + String(hh).padStart(2,'0') + ':' + String(mm).padStart(2,'0');
  requestAnimationFrame(() => {
    _setWheelValue(wh, hh);
    _setWheelValue(wm, mm);
  });
}
function closeTimePicker() {
  document.getElementById('tp-overlay').classList.remove('show');
  document.getElementById('tp-modal').classList.remove('show');
}
function confirmTimePicker() {
  const wh = document.getElementById('tp-wheel-h');
  const wm = document.getElementById('tp-wheel-m');
  const h = Math.max(0, Math.min(23, Math.round(wh.scrollTop / TP_ITEM_H)));
  const m = Math.max(0, Math.min(59, Math.round(wm.scrollTop / TP_ITEM_H)));
  _setNotifTimeBtn(String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0'));
  closeTimePicker();
}

// ── ADD ACCOUNT MENU ──────────────────────────────────────────
let _aaSelectedColor = 'linear-gradient(135deg,#1B2F6B,#3B5BDB)';

function openAddAccountModal() {
  const modal = document.getElementById('aa-modal');
  if (!modal) return;
  document.getElementById('aa-name').value = '';
  document.getElementById('aa-balance').value = '';
  document.getElementById('aa-type').value = 'Dompet Tunai';
  _aaSelectedColor = 'linear-gradient(135deg,#1B2F6B,#3B5BDB)';
  document.querySelectorAll('#aa-colors .aa-color').forEach((b, i) => {
    b.classList.toggle('active', i === 0);
    b.onclick = () => {
      document.querySelectorAll('#aa-colors .aa-color').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      _aaSelectedColor = b.dataset.color;
    };
  });
  modal.classList.add('open');
}

function closeAddAccountModal() {
  const modal = document.getElementById('aa-modal');
  if (modal) modal.classList.remove('open');
}

function saveNewAccount() {
  const name = document.getElementById('aa-name').value.trim();
  const type = document.getElementById('aa-type').value;
  if (!name) {
    alert('Nama akun tidak boleh kosong');
    return;
  }
  const balance = 0;
  const id = 'acc_' + Date.now();
  ACCOUNTS.push({ id, name, type, color: _aaSelectedColor, balance });
  closeAddAccountModal();
  if (typeof renderAccounts === 'function') renderAccounts();
}
document.addEventListener('click', () => {
  document.querySelectorAll('.budget-menu').forEach(menu => {
    menu.classList.remove('show');
  });
});
window.addEventListener("load", () => {
  document.getElementById("main-nav")
    ?.classList.add("nav-ready");
});
