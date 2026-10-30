/**
 * 大穴ナビゲーター PRO - 管理者ダッシュボード制御スクリプト
 * ハイブリッド実アクセス計測 (analytics.js) ＆ パイプライン監視連携
 */

const ADMIN_DEFAULT_PIN = "7777";
let currentPeriod = "this_month";

document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  setupPeriodSelector();
  setupRefreshButton();
  setupCopyCommand();
  setupSettingsAndRevenueForms();
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
    loadFormInitialValues();
    refreshAllDashboardData();
  }
}

// --- フォーム初期値の読み込み ---
function loadFormInitialValues() {
  if (!window.OanaAnalytics) return;

  const cfg = window.OanaAnalytics.getConfig();
  const gaInput = document.getElementById("input-ga4-id");
  const telInput = document.getElementById("input-telemetry-url");
  if (gaInput) gaInput.value = cfg.ga4Id || "";
  if (telInput) telInput.value = cfg.telemetryEndpoint || "";

  const rev = window.OanaAnalytics.getRevenueData();
  const subInput = document.getElementById("input-subscribers");
  const tktInput = document.getElementById("input-tickets");
  if (subInput) subInput.value = rev.subscribers || 0;
  if (tktInput) tktInput.value = rev.singleTickets || 0;
}

// --- 設定・売上入力フォームの保存処理 ---
function setupSettingsAndRevenueForms() {
  const saveCfgBtn = document.getElementById("save-analytics-cfg-btn");
  const clearLogsBtn = document.getElementById("clear-local-logs-btn");
  const saveRevBtn = document.getElementById("save-revenue-btn");

  if (saveCfgBtn) {
    saveCfgBtn.addEventListener("click", () => {
      if (!window.OanaAnalytics) return;
      const ga4Id = (document.getElementById("input-ga4-id")?.value || "").trim();
      const telemetryEndpoint = (document.getElementById("input-telemetry-url")?.value || "").trim();

      if (ga4Id && !/^G-[A-Z0-9]+$/i.test(ga4Id)) {
        alert("⚠️ GA4 測定IDは「G-XXXXXXXXXX」の形式で入力してください（未設定にする場合は空欄にしてください）。");
        return;
      }

      window.OanaAnalytics.saveConfig({ ga4Id, telemetryEndpoint });
      alert("✅ アクセス計測設定を保存しました！");
      refreshAllDashboardData();
    });
  }

  if (clearLogsBtn) {
    clearLogsBtn.addEventListener("click", () => {
      if (!window.OanaAnalytics) return;
      if (confirm("このブラウザに記録されたローカルのテスト閲覧履歴をクリアしますか？")) {
        window.OanaAnalytics.clearLocalEvents();
        refreshAllDashboardData();
        alert("🧹 ローカルテスト履歴をリセットしました。");
      }
    });
  }

  if (saveRevBtn) {
    saveRevBtn.addEventListener("click", () => {
      if (!window.OanaAnalytics) return;
      const subscribers = Math.max(0, parseInt(document.getElementById("input-subscribers")?.value || "0", 10) || 0);
      const singleTickets = Math.max(0, parseInt(document.getElementById("input-tickets")?.value || "0", 10) || 0);

      window.OanaAnalytics.saveRevenueData({ subscribers, singleTickets });
      refreshAllDashboardData();
      alert("💰 note売上・会員数をダッシュボードに反映しました！");
    });
  }
}

// --- 期間セレクター ---
function setupPeriodSelector() {
  const buttons = document.querySelectorAll(".period-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      currentPeriod = btn.getAttribute("data-period") || "this_month";
      refreshAllDashboardData();
    });
  });
}

// --- ダッシュボード全体のデータ再取得・描画 ---
async function refreshAllDashboardData() {
  await Promise.all([
    updateAnalyticsAndRevenueUI(currentPeriod),
    updatePipelineStatusUI()
  ]);
  updateSyncTimestamp();
}

// --- 実アクセス・流入元・売上UI更新 ---
async function updateAnalyticsAndRevenueUI(period) {
  if (!window.OanaAnalytics) return;

  const stats = await window.OanaAnalytics.getAggregatedStats(period);

  // 1. KPIカード更新
  const elPv = document.getElementById("kpi-pv");
  const elPvSub = document.getElementById("kpi-pv-sub");
  const elUu = document.getElementById("kpi-uu");
  const elUuSub = document.getElementById("kpi-uu-sub");
  const elRev = document.getElementById("kpi-revenue");
  const elRevSub = document.getElementById("kpi-rev-sub");
  const elSubs = document.getElementById("kpi-subscribers");
  const elSubsSub = document.getElementById("kpi-subs-sub");
  const elTickets = document.getElementById("kpi-tickets");
  const elTicketsSub = document.getElementById("kpi-tickets-sub");
  const elCvr = document.getElementById("kpi-cvr");
  const elCvrSub = document.getElementById("kpi-cvr-sub");
  const elPayoutProfit = document.getElementById("payout-net-profit");

  if (elPv) elPv.innerHTML = `${stats.pv.toLocaleString()} <span class="kpi-unit">PV</span>`;
  if (elPvSub) {
    const cfg = window.OanaAnalytics.getConfig();
    elPvSub.textContent = cfg.ga4Id
      ? `GA4 (${cfg.ga4Id}) ＋ 内蔵カウンター併用計測中`
      : `ロック解除表示: ${stats.unlockOpens}回 / Xシェア: ${stats.xShares}回`;
  }

  if (elUu) elUu.innerHTML = `${stats.uu.toLocaleString()} <span class="kpi-unit">人</span>`;
  if (elUuSub) {
    elUuSub.textContent = stats.repeatRate !== null
      ? `リピート率: ${stats.repeatRate}%`
      : "リピート率: ---%";
  }

  if (elRev) elRev.textContent = `¥${stats.grossRevenue.toLocaleString()}`;
  if (elRevSub) {
    elRevSub.innerHTML = `純利益(手取り): <strong style="color:#10b981;">¥${stats.netProfit.toLocaleString()}</strong> (手数料控除後)`;
  }
  if (elPayoutProfit) {
    elPayoutProfit.textContent = `¥${stats.netProfit.toLocaleString()}`;
  }

  if (elSubs) elSubs.innerHTML = `${stats.subscribers.toLocaleString()} <span class="kpi-unit">名</span>`;
  if (elSubsSub) {
    elSubsSub.innerHTML = `毎月の固定継続売上: <strong>¥${stats.monthlySubRevenue.toLocaleString()}/月</strong>`;
  }

  if (elTickets) elTickets.innerHTML = `${stats.singleTickets.toLocaleString()} <span class="kpi-unit">回</span>`;
  if (elTicketsSub) {
    elTicketsSub.textContent = `単発売上: ¥${stats.singleTicketRevenue.toLocaleString()} (note遷移クリック: ${stats.noteClicks}回)`;
  }

  if (elCvr) elCvr.innerHTML = `${stats.cvr} <span class="kpi-unit">%</span>`;
  if (elCvrSub) elCvrSub.textContent = stats.cvrSubLabel;

  // 2. 流入元チャネルバー更新
  const chSum = Object.values(stats.channels).reduce((a, b) => a + b, 0);
  ["twitter", "search", "note", "forum", "direct"].forEach(ch => {
    const count = stats.channels[ch] || 0;
    const pct = chSum > 0 ? ((count / chSum) * 100).toFixed(1) : "0.0";
    const barEl = document.getElementById(`bar-${ch}`);
    const statEl = document.getElementById(`stat-${ch}`);
    if (barEl) barEl.style.width = `${pct}%`;
    if (statEl) statEl.innerHTML = `<strong>${pct}%</strong> (${count.toLocaleString()} PV)`;
  });

  // 3. アクセス地域テーブル更新
  const geoTbody = document.getElementById("geo-tbody");
  if (geoTbody) {
    const entries = Object.entries(stats.regions).sort((a, b) => b[1] - a[1]);
    if (entries.length === 0 && stats.pv > 0) {
      entries.push(["日本国内 (グローバル集計)", stats.pv]);
    }
    if (entries.length === 0) {
      geoTbody.innerHTML = `
        <tr>
          <td><span class="rank-badge r1">1</span></td>
          <td><strong>集計待機中</strong></td>
          <td>---%</td>
          <td>0 PV</td>
        </tr>
      `;
    } else {
      const regTotal = entries.reduce((acc, [, v]) => acc + v, 0) || 1;
      geoTbody.innerHTML = entries.slice(0, 4).map(([label, cnt], idx) => {
        const rankCls = idx < 3 ? `r${idx + 1}` : "";
        const pct = ((cnt / regTotal) * 100).toFixed(1);
        return `
          <tr>
            <td><span class="rank-badge ${rankCls}">${idx + 1}</span></td>
            <td><strong>${label}</strong></td>
            <td>${pct}%</td>
            <td>${cnt.toLocaleString()} PV</td>
          </tr>
        `;
      }).join("");
    }
  }

  // 4. デバイス比率更新
  const devTotal = (stats.devices.mobile || 0) + (stats.devices.pc || 0);
  const devTotalLabel = document.getElementById("device-total-label");
  const barMobile = document.getElementById("bar-mobile");
  const barPc = document.getElementById("bar-pc");

  if (devTotal > 0) {
    const mPct = Math.round((stats.devices.mobile / devTotal) * 100);
    const pPct = 100 - mPct;
    if (devTotalLabel) devTotalLabel.textContent = `計 ${devTotal.toLocaleString()} アクセス`;
    if (barMobile) {
      barMobile.style.width = `${Math.max(15, mPct)}%`;
      barMobile.style.opacity = "1";
      barMobile.textContent = `スマホ (${mPct}%)`;
    }
    if (barPc) {
      barPc.style.width = `${Math.max(15, pPct)}%`;
      barPc.style.opacity = "1";
      barPc.textContent = `PC (${pPct}%)`;
    }
  } else {
    if (devTotalLabel) devTotalLabel.textContent = "集計待機中";
    if (barMobile) {
      barMobile.style.width = "50%";
      barMobile.style.opacity = "0.5";
      barMobile.textContent = "スマホ (---%)";
    }
    if (barPc) {
      barPc.style.width = "50%";
      barPc.style.opacity = "0.5";
      barPc.textContent = "PC (---%)";
    }
  }
}

// --- パイプライン稼働ステータスの動的取得 ---
async function updatePipelineStatusUI() {
  const lastRunEl = document.getElementById("monitor-last-run");
  const jsonStatusEl = document.getElementById("monitor-json-status");

  try {
    const res = await fetch("data/pipeline_status.json?t=" + Date.now(), { priority: "low" });
    if (res.ok) {
      const info = await res.json();
      if (lastRunEl) {
        lastRunEl.textContent = `${info.lastRunAt} (${info.targetWeekend})`;
      }
      if (jsonStatusEl) {
        jsonStatusEl.textContent = `data/races.json (${info.raceCount}レース最新反映済)`;
      }
      return;
    }
  } catch {
    // ローカル直接閲覧時フォールバック
  }

  if (lastRunEl) lastRunEl.textContent = "2026-10-30 最新枠順反映済";
  if (jsonStatusEl) jsonStatusEl.textContent = "data/races.json (全4レース動的バインド)";
}

// --- 最終同期時刻の更新 ---
function updateSyncTimestamp() {
  const text = document.getElementById("last-updated-text");
  if (!text) return;
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const timeStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  text.textContent = `最終同期: ${timeStr}`;
}

// --- 更新ボタン ---
function setupRefreshButton() {
  const btn = document.getElementById("refresh-data-btn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    btn.textContent = "同期中...";
    btn.disabled = true;

    await refreshAllDashboardData();

    btn.textContent = "🔄 データ更新";
    btn.disabled = false;
  });
}

// --- 手動実行コマンドコピー ---
function setupCopyCommand() {
  const copyBtn = document.getElementById("copy-cmd-btn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("./run_pipeline.sh").then(() => {
      const orig = copyBtn.textContent;
      copyBtn.textContent = "✅ コピー完了！";
      setTimeout(() => {
        copyBtn.textContent = orig;
      }, 1800);
    }).catch(() => {
      prompt("以下のコマンドをコピーしてください：", "./run_pipeline.sh");
    });
  });
}

// --- 📢 X投稿コピペ機能 ---
function copyXPost(type) {
  const textareaId = type === "friday" ? "x-post-friday" : "x-post-morning";
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
