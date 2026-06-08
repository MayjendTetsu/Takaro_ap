/**
 * db.js — Takaro Database Layer
 *
 * Abstraksi database yang bisa dipakai dengan:
 *   1. LocalStorage (default, offline)
 *   2. Firebase Firestore (uncomment bagian firebase di bawah)
 *
 * Cara pakai Firebase:
 *   1. Buat project di console.firebase.google.com
 *   2. Isi FIREBASE_CONFIG di bawah
 *   3. Set USE_FIREBASE = true
 */

// ─────────────────────────────────────────────────────────────
// FIREBASE CONFIG (isi jika ingin deploy online)
// ─────────────────────────────────────────────────────────────
const USE_FIREBASE = false;
const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID",
};

// ─────────────────────────────────────────────────────────────
// LOCAL DB (localStorage — selalu tersedia offline)
// ─────────────────────────────────────────────────────────────

/** LocalStorage DB namespace */
const DB_PREFIX = 'takaro_v1_';

const LocalDB = {
  _key(table, userId) {
    return `${DB_PREFIX}${table}_${userId || 'guest'}`;
  },

  /** Ambil semua record dari tabel */
  async getAll(table, userId) {
    const raw = localStorage.getItem(this._key(table, userId));
    return raw ? JSON.parse(raw) : [];
  },

  /** Simpan semua record */
  async setAll(table, userId, data) {
    localStorage.setItem(this._key(table, userId), JSON.stringify(data));
  },

  /** Tambah satu record (auto-generate id) */
  async add(table, userId, record) {
    const data = await this.getAll(table, userId);
    const newRecord = {
      ...record,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    data.push(newRecord);
    await this.setAll(table, userId, data);
    return newRecord;
  },

  /** Update record berdasarkan id */
  async update(table, userId, id, changes) {
    const data = await this.getAll(table, userId);
    const idx = data.findIndex(r => r.id === id);
    if (idx === -1) throw new Error('Record not found');
    data[idx] = { ...data[idx], ...changes, updatedAt: new Date().toISOString() };
    await this.setAll(table, userId, data);
    return data[idx];
  },

  /** Hapus record berdasarkan id */
  async delete(table, userId, id) {
    const data = await this.getAll(table, userId);
    const filtered = data.filter(r => r.id !== id);
    await this.setAll(table, userId, filtered);
  },

  /** Simpan satu objek (bukan array — untuk settings/profile) */
  async getDoc(key) {
    const raw = localStorage.getItem(DB_PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  },

  async setDoc(key, value) {
    localStorage.setItem(DB_PREFIX + key, JSON.stringify(value));
  },

  async deleteDoc(key) {
    localStorage.removeItem(DB_PREFIX + key);
  },
};

// ─────────────────────────────────────────────────────────────
// AUTH DB
// ─────────────────────────────────────────────────────────────

const AuthDB = {
  USERS_KEY: DB_PREFIX + 'users',

  /** Ambil semua user terdaftar */
  _getUsers() {
    const raw = localStorage.getItem(this.USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  },
  _saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  },

  /** Daftar user baru */
  register({ name, email, password }) {
    const users = this._getUsers();
    if (users.find(u => u.email === email)) {
      return { ok: false, error: 'Email sudah terdaftar!' };
    }
    const uid = 'u_' + Date.now();
    const user = {
      uid,
      name,
      email,
      password, // In production: hash this! e.g. bcrypt
      initial: name[0].toUpperCase(),
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    this._saveUsers(users);
    return { ok: true, user: this._sanitize(user) };
  },

  /** Login */
  login({ email, password }) {
    // Admin check
    if (email === 'admin' && password === 'admin123') {
      return { ok: true, user: { uid: 'admin', name: 'Administrator', email: 'admin', initial: 'A', role: 'admin' } };
    }
    const users = this._getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { ok: false, error: 'Email atau password salah.' };
    return { ok: true, user: this._sanitize(found) };
  },

  /** Google login (simulasi — email/nama dari pilihan modal) */
  loginWithGoogle({ email, name }) {
    if (!email) return { ok: false, error: 'Pilih akun Google yang valid.' };
    const users = this._getUsers();
    let found = users.find(u => u.email === email);
    if (!found) {
      // Auto-register Google user
      const uid = 'g_' + Date.now();
      found = { uid, name, email, password: null, initial: name[0].toUpperCase(), role: 'user', provider: 'google', createdAt: new Date().toISOString() };
      users.push(found);
      this._saveUsers(users);
    }
    return { ok: true, user: { ...this._sanitize(found), provider: 'google' } };
  },

  /** Simpan session aktif */
  setSession(user) {
    localStorage.setItem(DB_PREFIX + 'session', JSON.stringify(user));
  },

  /** Ambil session aktif */
  getSession() {
    const raw = localStorage.getItem(DB_PREFIX + 'session');
    return raw ? JSON.parse(raw) : null;
  },

  /** Hapus session (logout) */
  clearSession() {
    localStorage.removeItem(DB_PREFIX + 'session');
  },

  /** Cari user berdasarkan email */
  findByEmail(email) {
    const users = this._getUsers();
    return users.find(u => u.email === email) || null;
  },

  /** Reset password berdasarkan email */
  resetPassword(email, newPassword) {
    const users = this._getUsers();
    const idx = users.findIndex(u => u.email === email);
    if (idx === -1) return { ok: false, error: 'Email tidak ditemukan.' };
    if (!newPassword || newPassword.length < 8) return { ok: false, error: 'Password minimal 8 karakter!' };
    users[idx].password = newPassword;
    this._saveUsers(users);
    return { ok: true };
  },

  /** Update user data */
  updateUser(uid, changes) {
    const users = this._getUsers();
    const idx = users.findIndex(u => u.uid === uid);
    if (idx === -1) return { ok: false, error: 'User tidak ditemukan.' };
    users[idx] = { ...users[idx], ...changes };
    this._saveUsers(users);
    return { ok: true, user: this._sanitize(users[idx]) };
  },

  /** Hapus user + semua datanya */
  deleteUser(uid) {
    const users = this._getUsers();
    const filtered = users.filter(u => u.uid !== uid);
    this._saveUsers(filtered);
    // Hapus semua data transaksi & budget milik user
    localStorage.removeItem('takaro_trx_' + uid);
    localStorage.removeItem('takaro_budgets_' + uid);
    localStorage.removeItem(DB_PREFIX + 'transactions_' + uid);
    localStorage.removeItem(DB_PREFIX + 'budgets_' + uid);
    this.clearSession();
    return { ok: true };
  },

  /** Hapus password sebelum expose ke UI */
  _sanitize(u) {
    const { password, ...safe } = u;
    return safe;
  },
};

// ─────────────────────────────────────────────────────────────
// TRANSACTION DB
// ─────────────────────────────────────────────────────────────

const TrxDB = {
  async getAll(uid) {
    return LocalDB.getAll('transactions', uid);
  },
  async add(uid, trx) {
    return LocalDB.add('transactions', uid, trx);
  },
  async update(uid, id, changes) {
    return LocalDB.update('transactions', uid, id, changes);
  },
  async delete(uid, id) {
    return LocalDB.delete('transactions', uid, id);
  },
  async setAll(uid, data) {
    return LocalDB.setAll('transactions', uid, data);
  },
};

// ─────────────────────────────────────────────────────────────
// BUDGET DB
// ─────────────────────────────────────────────────────────────

const BudgetDB = {
  async get(uid) {
    return (await LocalDB.getDoc('budgets_' + uid)) || [
      { cat: 'Makan',     emoji: String.fromCodePoint(0x1F35C), limit: 800000,  color: '#22C55E' },
      { cat: 'Transport', emoji: String.fromCodePoint(0x1F697), limit: 300000,  color: '#3B82F6' },
      { cat: 'Hiburan',   emoji: String.fromCodePoint(0x1F3AE), limit: 200000,  color: '#8B5CF6' },
    ];
  },
  async save(uid, budgets) {
    return LocalDB.setDoc('budgets_' + uid, budgets);
  },
};

// ─────────────────────────────────────────────────────────────
// EXPORT (global access)
// ─────────────────────────────────────────────────────────────
window.TakaroDB = {
  auth: AuthDB,
  transactions: TrxDB,
  budgets: BudgetDB,
  local: LocalDB,
};

console.log('[Takaro DB] Database layer loaded. Mode:', USE_FIREBASE ? 'Firebase' : 'LocalStorage');
