/**
 * 大穴ナビゲーター PRO - ハイブリッド実アクセス解析・テレメトリ計測モジュール
 * 1. Google Analytics 4 (GA4) 動的タグ連携
 * 2. グローバル共有カウンターAPI連携（低優先度バックグラウンド通信）
 * 3. ローカルイベントログ蓄積（流入元・デバイス・期間別集計・CVR算出）
 * 4. fetchLater() によるフルセッション滞在・行動テレメトリ送信
 */

// 未対応ブラウザ向けの fetchLater() 標準フォールバックポリフィル
globalThis.fetchLater ??= function fetchLater(url, init = {}) {
  let timeoutHandle;
  let activated = false;

  function sendNow() {
    if (!(init.signal && init.signal.aborted)) {
      if (
        "keepalive" in Request.prototype ||
        init.method !== "POST" ||
        init.headers
      ) {
        fetch(url, Object.assign({}, init, { keepalive: true })).catch(() => {});
        activated = true;
      } else {
        activated = navigator.sendBeacon(url, init.body);
      }
    }
    destroy();
  }

  function destroy() {
    document.removeEventListener("visibilitychange", sendNow);
    clearTimeout(timeoutHandle);
  }

  if (document.visibilityState === "hidden") {
    queueMicrotask(sendNow);
  } else {
    document.addEventListener("visibilitychange", sendNow);
    if (typeof init.activateAfter === "number" && init.activateAfter >= 0) {
      timeoutHandle = setTimeout(sendNow, init.activateAfter);
    }
  }

  if (init.signal) {
    init.signal.addEventListener("abort", destroy);
  }

  return {
    get activated() {
      return activated;
    }
  };
};

(function () {
  const STORAGE_KEYS = {
    EVENTS: "oana_analytics_events_v1",
    VISITOR_ID: "oana_visitor_uid_v1",
    VISIT_COUNT: "oana_visit_count_v1",
    CONFIG: "oana_analytics_config_v1",
    REVENUE: "oana_revenue_data_v1"
  };

  // グローバルカウンター名前空間（外部公開時のクロスユーザー集計用）
  const COUNTER_API_BASE = "https://api.counterapi.dev/v1/oana-navi-pro-2026";

  // セッションテレメトリ状態管理
  const sessionState = {
    sessionId: typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : "sess_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
    startedAt: new Date().toISOString(),
    durationMs: 0,
    channel: "direct",
    device: "pc",
    viewedRaces: [],
    conversions: []
  };

  let fetchLaterController = null;

  /** 設定情報を取得する */
  function getConfig() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return raw ? JSON.parse(raw) : { ga4Id: "", telemetryEndpoint: "" };
    } catch {
      return { ga4Id: "", telemetryEndpoint: "" };
    }
  }

  /** 設定情報を保存する */
  function saveConfig(newCfg) {
    const merged = Object.assign(getConfig(), newCfg);
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(merged));
    if (merged.ga4Id) {
      initGA4(merged.ga4Id);
    }
    return merged;
  }

  /** 売上・会員数レコードを取得する */
  function getRevenueData() {
    const defaults = {
      subscribers: 0,
      singleTickets: 0,
      feeRatePct: 13, // note決済・プラットフォーム手数料目安(%)
      raceSales: {
        "race-tenno-aki": 0,
        "race-fantasy-s": 0,
        "race-perseus-s": 0,
        "race-mahoroba-s": 0
      },
      updatedAt: null
    };
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.REVENUE);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      return Object.assign({}, defaults, parsed, {
        raceSales: Object.assign({}, defaults.raceSales, parsed.raceSales || {})
      });
    } catch {
      return defaults;
    }
  }

  /** 売上・会員数レコードを保存する */
  function saveRevenueData(data) {
    const next = Object.assign(getRevenueData(), data, {
      updatedAt: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEYS.REVENUE, JSON.stringify(next));
    return next;
  }

  /** Google Analytics 4 (gtag.js) を動的に読み込む */
  function initGA4(ga4Id) {
    const cleanId = (ga4Id || "").trim();
    if (!/^G-[A-Z0-9]+$/i.test(cleanId)) return;
    if (window.__oanaGaLoaded === cleanId) return;
    window.__oanaGaLoaded = cleanId;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", cleanId, { send_page_view: true });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cleanId)}`;
    document.head.appendChild(script);
  }

  /** 流入元チャネルを判定する */
  function detectChannel() {
    try {
      const params = new URLSearchParams(window.location.search);
      const utm = (params.get("utm_source") || "").toLowerCase();
      const ref = (document.referrer || "").toLowerCase();

      if (utm.includes("twitter") || utm === "x" || ref.includes("t.co") || ref.includes("twitter.com") || ref.includes("x.com")) {
        return "twitter";
      }
      if (utm.includes("search") || ref.includes("google.") || ref.includes("yahoo.") || ref.includes("bing.") || ref.includes("duckduckgo.")) {
        return "search";
      }
      if (utm.includes("note") || ref.includes("note.com")) {
        return "note";
      }
      if (utm.includes("forum") || ref.includes("5ch.") || ref.includes("2ch.") || ref.includes("ameblo.") || ref.includes("livedoor.") || ref.includes("hatena.")) {
        return "forum";
      }
      return "direct";
    } catch {
      return "direct";
    }
  }

  /** 閲覧デバイス種別を判定する */
  function detectDevice() {
    if (navigator.userAgentData && typeof navigator.userAgentData.mobile === "boolean") {
      return navigator.userAgentData.mobile ? "mobile" : "pc";
    }
    return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || "") ? "mobile" : "pc";
  }

  /** ブラウザのタイムゾーン・言語設定から地域ヒントを推定する */
  function detectRegionLabel() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (tz === "Asia/Tokyo") return "日本国内 (JST)";
      if (tz) return tz;
      return "日本国内";
    } catch {
      return "日本国内";
    }
  }

  /** ローカルイベント一覧を取得する */
  function loadLocalEvents() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.EVENTS);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  /** ローカルイベントを追記する（最大2,000件保持） */
  function appendLocalEvent(evt) {
    const events = loadLocalEvents();
    events.push(evt);
    if (events.length > 2000) {
      events.splice(0, events.length - 2000);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch {
      // ストレージ上限時は古い履歴を圧縮
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events.slice(-500)));
    }
  }

  /** グローバル共有カウンターを低優先度でインクリメントする */
  function incrementGlobalCounter(counterKey) {
    try {
      fetch(`${COUNTER_API_BASE}/${encodeURIComponent(counterKey)}/up`, {
        method: "GET",
        priority: "low"
      }).catch(() => {});
    } catch {
      // オフライン・ブロッカー環境ではローカル計測へフォールバック
    }
  }

  /** グローバル共有カウンターの現在値を低優先度で取得する */
  async function readGlobalCounter(counterKey) {
    try {
      const res = await fetch(`${COUNTER_API_BASE}/${encodeURIComponent(counterKey)}`, {
        method: "GET",
        priority: "low"
      });
      if (!res.ok) return 0;
      const json = await res.json();
      return typeof json.count === "number" ? json.count : 0;
    } catch {
      return 0;
    }
  }

  /**
   * fetchLater() を用いてセッション全体の滞在時間・行動スナップショットを予約送信する
   * ページ離脱時にブラウザが確実に最終スナップショットを配信する
   */
  function queueSessionBeacon() {
    const cfg = getConfig();
    if (!cfg.telemetryEndpoint) return;

    if (fetchLaterController) {
      fetchLaterController.abort();
    }
    fetchLaterController = new AbortController();
    sessionState.durationMs = Math.round(performance.now());

    try {
      fetchLater(cfg.telemetryEndpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(sessionState),
        signal: fetchLaterController.signal
      });
    } catch {
      // クォータ上限や不正URLエラーを安全に無視
    }
  }

  /** 本番サイト (index.html) のページビューを記録する */
  function trackPageView() {
    const cfg = getConfig();
    if (cfg.ga4Id) {
      initGA4(cfg.ga4Id);
    }

    let visitorId = localStorage.getItem(STORAGE_KEYS.VISITOR_ID);
    const isNewVisitor = !visitorId;
    if (!visitorId) {
      visitorId = typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : "v_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
      localStorage.setItem(STORAGE_KEYS.VISITOR_ID, visitorId);
    }

    const visitCount = parseInt(localStorage.getItem(STORAGE_KEYS.VISIT_COUNT) || "0", 10) + 1;
    localStorage.setItem(STORAGE_KEYS.VISIT_COUNT, String(visitCount));

    const channel = detectChannel();
    const device = detectDevice();
    const region = detectRegionLabel();

    sessionState.channel = channel;
    sessionState.device = device;

    appendLocalEvent({
      type: "pv",
      ts: Date.now(),
      visitorId,
      isNewVisitor,
      isRepeat: visitCount > 1,
      channel,
      device,
      region
    });

    // グローバルカウンター非同期加算（UI描画を阻害しない priority: 'low'）
    incrementGlobalCounter("pv");
    if (isNewVisitor) {
      incrementGlobalCounter("uu");
    }
    incrementGlobalCounter(`ch_${channel}`);
    incrementGlobalCounter(`dev_${device}`);

    // セッションテレメトリ定期更新（15秒間隔）
    queueSessionBeacon();
    setInterval(queueSessionBeacon, 15000);
  }

  /** コンバージョン・行動イベントを記録する */
  function trackEvent(eventName, meta = {}) {
    appendLocalEvent({
      type: eventName,
      ts: Date.now(),
      raceId: meta.raceId || null,
      planType: meta.planType || null
    });

    if (eventName === "race_view" && meta.raceId) {
      if (!sessionState.viewedRaces.includes(meta.raceId)) {
        sessionState.viewedRaces.push(meta.raceId);
      }
    } else {
      sessionState.conversions.push({ eventName, ts: Date.now(), ...meta });
    }

    if (eventName === "unlock_modal_open") {
      incrementGlobalCounter("unlock_open");
    } else if (eventName === "note_click") {
      incrementGlobalCounter("note_clicks");
    } else if (eventName === "x_share") {
      incrementGlobalCounter("x_shares");
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, meta);
    }

    queueSessionBeacon();
  }

  /** 期間フィルターに応じた開始タイムスタンプを返す */
  function getPeriodStartMs(period) {
    const now = new Date();
    if (period === "this_month") {
      return new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    }
    if (period === "last_30") {
      return now.getTime() - 30 * 24 * 60 * 60 * 1000;
    }
    if (period === "weekend") {
      // 直近金曜0時以降
      const day = now.getDay(); // 0:日, 5:金, 6:土
      const diff = day >= 5 ? day - 5 : day + 2;
      const fri = new Date(now.getFullYear(), now.getMonth(), now.getDate() - diff);
      return fri.getTime();
    }
    return 0; // 全期間
  }

  /** 管理者ダッシュボード向けに集計済み統計データを取得する */
  async function getAggregatedStats(period = "this_month") {
    const startMs = getPeriodStartMs(period);
    const allEvents = loadLocalEvents();
    const filtered = allEvents.filter(e => (e.ts || 0) >= startMs);

    const pvEvents = filtered.filter(e => e.type === "pv");
    const uniqueVisitors = new Set(pvEvents.map(e => e.visitorId).filter(Boolean));
    const repeatEvents = pvEvents.filter(e => e.isRepeat);

    const localChannels = { twitter: 0, search: 0, note: 0, forum: 0, direct: 0 };
    const localDevices = { mobile: 0, pc: 0 };
    const localRegions = {};

    pvEvents.forEach(e => {
      const ch = localChannels[e.channel] !== undefined ? e.channel : "direct";
      localChannels[ch] += 1;
      const dv = e.device === "mobile" ? "mobile" : "pc";
      localDevices[dv] += 1;
      const reg = e.region || "日本国内 (JST)";
      localRegions[reg] = (localRegions[reg] || 0) + 1;
    });

    const localUnlockOpens = filtered.filter(e => e.type === "unlock_modal_open").length;
    const localNoteClicks = filtered.filter(e => e.type === "note_click").length;
    const localXShares = filtered.filter(e => e.type === "x_share").length;

    // グローバルカウンターの取得（全期間・今月では外部ユーザーのアクセス分も合算反映）
    let globalPv = 0;
    let globalUu = 0;
    let globalNoteClicks = 0;
    let globalUnlockOpens = 0;
    const globalChannels = { twitter: 0, search: 0, note: 0, forum: 0, direct: 0 };
    const globalDevices = { mobile: 0, pc: 0 };

    if (period === "all" || period === "this_month" || period === "last_30") {
      const [
        gPv, gUu, gNote, gUnlock,
        cTw, cSe, cNo, cFo, cDi,
        dMo, dPc
      ] = await Promise.all([
        readGlobalCounter("pv"),
        readGlobalCounter("uu"),
        readGlobalCounter("note_clicks"),
        readGlobalCounter("unlock_open"),
        readGlobalCounter("ch_twitter"),
        readGlobalCounter("ch_search"),
        readGlobalCounter("ch_note"),
        readGlobalCounter("ch_forum"),
        readGlobalCounter("ch_direct"),
        readGlobalCounter("dev_mobile"),
        readGlobalCounter("dev_pc")
      ]);
      globalPv = gPv;
      globalUu = gUu;
      globalNoteClicks = gNote;
      globalUnlockOpens = gUnlock;
      globalChannels.twitter = cTw;
      globalChannels.search = cSe;
      globalChannels.note = cNo;
      globalChannels.forum = cFo;
      globalChannels.direct = cDi;
      globalDevices.mobile = dMo;
      globalDevices.pc = dPc;
    }

    const totalPv = Math.max(pvEvents.length, globalPv);
    const totalUu = Math.max(uniqueVisitors.size, globalUu, totalPv > 0 ? 1 : 0);
    const totalNoteClicks = Math.max(localNoteClicks, globalNoteClicks);
    const totalUnlockOpens = Math.max(localUnlockOpens, globalUnlockOpens);

    const channels = {
      twitter: Math.max(localChannels.twitter, globalChannels.twitter),
      search: Math.max(localChannels.search, globalChannels.search),
      note: Math.max(localChannels.note, globalChannels.note),
      forum: Math.max(localChannels.forum, globalChannels.forum),
      direct: Math.max(localChannels.direct, globalChannels.direct)
    };

    const devices = {
      mobile: Math.max(localDevices.mobile, globalDevices.mobile),
      pc: Math.max(localDevices.pc, globalDevices.pc)
    };

    const repeatRate = pvEvents.length > 0
      ? ((repeatEvents.length / pvEvents.length) * 100).toFixed(1)
      : null;

    // 売上データの合算
    const rev = getRevenueData();
    const monthlySubRevenue = (rev.subscribers || 0) * 1980;
    const singleTicketRevenue = (rev.singleTickets || 0) * 300;
    const grossRevenue = monthlySubRevenue + singleTicketRevenue;
    const netProfit = Math.round(grossRevenue * (1 - (rev.feeRatePct || 13) / 100));

    // CVR計算: 実購入があれば実購入CVR、なければ課金導線（note遷移・アンロック）クリックCVRを算出
    const totalPurchases = (rev.subscribers || 0) + (rev.singleTickets || 0);
    let cvrValue = "---";
    let cvrSubLabel = "アクセスログ蓄積後に自動算出されます";
    if (totalPv > 0) {
      if (totalPurchases > 0) {
        cvrValue = ((totalPurchases / totalPv) * 100).toFixed(2);
        cvrSubLabel = `実課金CVR（note遷移クリック: ${totalNoteClicks}回）`;
      } else {
        const intentActions = totalNoteClicks || totalUnlockOpens;
        cvrValue = ((intentActions / totalPv) * 100).toFixed(2);
        cvrSubLabel = `課金モーダル/note遷移率 (ロック解除試行 ${totalUnlockOpens}回 / note遷移 ${totalNoteClicks}回)`;
      }
    }

    return {
      pv: totalPv,
      uu: totalUu,
      repeatRate,
      channels,
      devices,
      regions: localRegions,
      unlockOpens: totalUnlockOpens,
      noteClicks: totalNoteClicks,
      xShares: localXShares,
      subscribers: rev.subscribers || 0,
      singleTickets: rev.singleTickets || 0,
      monthlySubRevenue,
      singleTicketRevenue,
      grossRevenue,
      netProfit,
      raceSales: rev.raceSales || {},
      cvr: cvrValue,
      cvrSubLabel
    };
  }

  /** ローカル計測ログをリセットする（テストアクセス消去用） */
  function clearLocalEvents() {
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.VISITOR_ID);
    localStorage.removeItem(STORAGE_KEYS.VISIT_COUNT);
  }

  window.OanaAnalytics = {
    trackPageView,
    trackEvent,
    getConfig,
    saveConfig,
    getRevenueData,
    saveRevenueData,
    getAggregatedStats,
    clearLocalEvents
  };
})();
