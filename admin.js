/**
 * 大穴ナビゲーター PRO - 管理者ダッシュボード制御スクリプト
 */

const ADMIN_DEFAULT_PIN = "7777";

// 期間別データモック
const METRICS_DATA = {
  this_month: {
    pv: "48,250",
    uu: "19,420",
    revenue: "¥426,800",
    profit: "¥371,316",
    subscribers: "142",
    tickets: "482",
    cvr: "3.85"
  },
  last_30: {
    pv: "52,180",
    uu: "21,300",
    revenue: "¥458,200",
    profit: "¥398,634",
    subscribers: "148",
    tickets: "510",
    cvr: "3.92"
  },
  weekend: {
    pv: "18,650",
    uu: "8,920",
    revenue: "¥184,200",
    profit: "¥160,254",
    subscribers: "38",
    tickets: "244",
    cvr: "4.45"
  },
  all: {
    pv: "128,400",
    uu: "46,800",
    revenue: "¥1,142,000",
    profit: "¥993,540",
    subscribers: "142",
    tickets: "1,280",
    cvr: "3.72"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  setupPeriodSelector();
  setupRefreshButton();
  setupCopyCommand();
});

// --- 認証管理 ---
function initAuth() {
  const authScreen = document.getElementById("admin-auth-screen");
  const dashboard = document.getElementById("admin-dashboard");
  const pinInput = document.getElementById("admin-pin");
  const loginBtn = document.getElementById("admin-login-btn");
  const errorMsg = document.getElementById("auth-error-msg");
  const logoutBtn = document.getElementById("admin-logout-btn");

  const isAuth = sessionStorage.getItem("oana_admin_auth") === "true";

  if (isAuth) {
    showDashboard();
  }

  function handleLogin() {
    const val = pinInput.value.trim();
    if (val === ADMIN_DEFAULT_PIN) {
      sessionStorage.setItem("oana_admin_auth", "true");
      errorMsg.setAttribute("hidden", "true");
      showDashboard();
    } else {
      errorMsg.removeAttribute("hidden");
      pinInput.value = "";
      pinInput.focus();
    }
  }

  loginBtn.addEventListener("click", handleLogin);
  pinInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleLogin();
  });

  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("oana_admin_auth");
    dashboard.setAttribute("hidden", "true");
    authScreen.style.display = "flex";
    pinInput.value = "";
  });

  function showDashboard() {
    authScreen.style.display = "none";
    dashboard.removeAttribute("hidden");
  }
}

// --- 期間セレクター ---
function setupPeriodSelector() {
  const buttons = document.querySelectorAll(".period-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const period = btn.getAttribute("data-period");
      updateMetrics(period);
    });
  });
}

function updateMetrics(period) {
  const data = METRICS_DATA[period] || METRICS_DATA.this_month;
  
  const elPv = document.getElementById("kpi-pv");
  const elUu = document.getElementById("kpi-uu");
  const elRev = document.getElementById("kpi-revenue");
  const elSubs = document.getElementById("kpi-subscribers");
  const elTickets = document.getElementById("kpi-tickets");
  const elCvr = document.getElementById("kpi-cvr");

  if (elPv) elPv.innerHTML = `${data.pv} <span class="kpi-unit">PV</span>`;
  if (elUu) elUu.innerHTML = `${data.uu} <span class="kpi-unit">人</span>`;
  if (elRev) elRev.innerHTML = data.revenue;
  if (elSubs) elSubs.innerHTML = `${data.subscribers} <span class="kpi-unit">名</span>`;
  if (elTickets) elTickets.innerHTML = `${data.tickets} <span class="kpi-unit">回</span>`;
  if (elCvr) elCvr.innerHTML = `${data.cvr} <span class="kpi-unit">%</span>`;
}

// --- 更新ボタン ---
function setupRefreshButton() {
  const btn = document.getElementById("refresh-data-btn");
  const text = document.getElementById("last-updated-text");
  if (!btn || !text) return;

  btn.addEventListener("click", () => {
    btn.textContent = "同期中...";
    btn.disabled = true;

    setTimeout(() => {
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const timeStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
      text.textContent = `最終同期: ${timeStr}`;
      btn.textContent = "🔄 データ更新";
      btn.disabled = false;
      alert("✅ 最新のアクセス・売上ログと同期しました！");
    }, 600);
  });
}

// --- 📢 X投稿コピペ機能 ---
function copyXPost(type) {
  const textareaId = type === 'friday' ? 'x-post-friday' : 'x-post-morning';
  const textarea = document.getElementById(textareaId);
  if (!textarea) return;

  const text = textarea.value;
  navigator.clipboard.writeText(text).then(() => {
    alert("📋 X(Twitter)用の投稿文をクリップボードにコピーしました！\nこの後開くXの画面に貼り付けて投稿してください。");
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(intentUrl, "_blank");
  }).catch(() => {
    prompt("以下の文章をコピーしてください：", text);
  });
}

window.copyXPost = copyXPost;

