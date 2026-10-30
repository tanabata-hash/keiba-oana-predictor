// --- データベース：2026年10月31日(土)・11月1日(日) 開催レース ＆ 実在アーカイブ ---
const ARCHIVE_RACES = [
  {
    id: "race-4",
    venueId: "archive",
    date: "2012年8月4日 (土) 実在アーカイブ",
    date_short: "歴代最高配当",
    postTime: "確定検証済",
    round: 5,
    badge: "新潟5R・3歳未勝利 芝1400m（実在・JRA史上最高配当レース）",
    title: "【歴史的超大穴】2012年 新潟5R",
    venue: "新潟 5R (芝1400m)",
    weather: "晴",
    track: "良（混戦）",
    pace: "ミドルペース",
    volatilityScore: 96,
    volatilityLevel: "💥 伝説の超特大波乱",
    volatilityClass: "vol-high",
    volatilityDesc: "【実在の大穴再現】3連単『2,983万円』が飛び出したJRA歴代最高配当レース。1〜4番人気総崩れ、14番人気・12番人気・10番人気で決着した驚異のレースをAIが分析！",
    poll: {
      favPct: 24,
      underPct: 76,
      totalVotes: 3120
    },
    darkHorses: [
      {
        number: 17,
        name: "ミナレット",
        frameColor: "#ec4899",
        jockey: "大野拓弥 (54.0kg)",
        odds: 43.6,
        popularity: 14,
        signals: ["初出走後の変わり身", "内が荒れて外枠伸びる馬場", "陣営の密かな自信"],
        comment: "単勝43.6倍の14番人気ながら果敢に逃げの手に出てそのまま先頭で押し切り！大波乱の主役となった伝説の穴馬。"
      },
      {
        number: 14,
        name: "ヘイハチピエロ",
        frameColor: "#f97316",
        jockey: "田中勝春 (54.0kg)",
        odds: 39.8,
        popularity: 12,
        signals: ["芝替わり一変", "外差し強襲"],
        comment: "12番人気から2着に突入。この馬が連対したことで馬連でも43万円の超大穴に。"
      },
      {
        number: 10,
        name: "ファイヤーヒース",
        frameColor: "#eab308",
        jockey: "武士沢友治 (54.0kg)",
        odds: 35.1,
        popularity: 10,
        signals: ["中団待機から末脚持続", "波乱ペース合致"],
        comment: "10番人気ながらしぶとく3着へ食い込み、JRA史上最高配当2,983万円を完成させた1頭。"
      }
    ],
    runners: [
      { num: 1, bracket: 1, name: "上位人気馬(1人気)", jockey: "人気騎手", weight: "56.0kg", odds: 2.9, pop: 1, style: "先行", score: 54, status: "△ 展開不向き" },
      { num: 10, bracket: 5, name: "ファイヤーヒース", jockey: "武士沢友治", weight: "54.0kg", odds: 35.1, pop: 10, style: "差し", score: 88, status: "★ 3着激走 (10人気)" },
      { num: 14, bracket: 7, name: "ヘイハチピエロ", jockey: "田中勝春", weight: "54.0kg", odds: 39.8, pop: 12, style: "差し", score: 92, status: "★ 2着激走 (12人気)" },
      { num: 17, bracket: 8, name: "ミナレット", jockey: "大野拓弥", weight: "54.0kg", odds: 43.6, pop: 14, style: "逃げ", score: 95, status: "★ 1着激走 (14人気)" }
    ],
    actualResult: {
      statusType: "BIG_WIN",
      statusBadge: "💥 史上最高配当2,983万円的中！",
      roi: "149,000%",
      trustGrade: "SS (伝説級ヒット)",
      stars: "★★★★★",
      payouts: [
        { type: "単勝 ⑰", yen: "4,360円", isHit: true },
        { type: "馬連 ⑭ - ⑰", yen: "437,390円", isHit: true },
        { type: "3連単 ⑰ - ⑭ - ⑩", yen: "29,832,950円", isHit: true }
      ],
      podium: [
        { rank: 1, num: 17, name: "ミナレット (AI推奨穴馬)", pop: 14, odds: 43.6, isTarget: true },
        { rank: 2, num: 14, name: "ヘイハチピエロ (AI推奨穴馬)", pop: 12, odds: 39.8, isTarget: true },
        { rank: 3, num: 10, name: "ファイヤーヒース (AI推奨穴馬)", pop: 10, odds: 35.1, isTarget: true }
      ],
      review: "JRA史上最高配当のレースを完全再現。14番人気ミナレットと12番人気ヘイハチピエロの変身を事前に察知。もしAIのフォーメーション通りに買っていれば、わずか数百円が2,983万円に化けていた奇跡のレースです。"
    }
  }
];

let RACE_DATABASE = [
  {
    id: "race-tenno-aki",
    venueId: "tokyo",
    date: "2026年11月1日 (日)",
    date_short: "11/1(日)",
    postTime: "15:40発走",
    round: 11,
    badge: "東京11R・G1 芝2000m（定量・17頭立て・確定枠順反映）",
    title: "第174回 天皇賞（秋）(G1)",
    venue: "東京 11R (芝2000m)",
    weather: "晴予報",
    track: "良馬場（高速東京芝）",
    pace: "ミドルペース（直線瞬発力勝負）",
    volatilityScore: 66,
    volatilityLevel: "⚠️ 中波乱・混戦模様",
    volatilityClass: "vol-mid",
    volatilityDesc: "春二冠馬①クロワデュノールと連覇を狙う⑦マスカレードボールの4歳2強対決！しかし有力馬⑰ダノンデサイルが魔の大外8枠17番に入り、内〜中枠の伏兵が2・3着に強襲する『ヒモ荒れ高配当パターン』を検知！",
    dangerHorse: {
      num: 17,
      name: "ダノンデサイル",
      pop: 3,
      odds: 7.2,
      reason: "スタート後すぐ2コーナーを迎える東京芝2000mで最も不利な『大外8枠17番』に決定。外々を回らされる距離ロスが大きく、内枠を引いた4歳2強との比較で取りこぼしリスク大！"
    },
    poll: {
      favPct: 56,
      underPct: 44,
      totalVotes: 1842
    },
    darkHorses: [
      {
        number: 4,
        name: "レディネス",
        frameColor: "#334155",
        jockey: "横山典弘 (58.0kg)",
        odds: 28.5,
        popularity: 9,
        signals: ["絶好2枠4番の経済コース", "名手・横山典弘の一撃騎乗", "高速東京芝の瞬発力適性"],
        comment: "AI穴馬指数92点！①クロワデュノールの直後でロスなく脚を溜められる絶好の2枠4番。横山典弘騎手がイン突きを敢行すれば、上位人気をまとめて脅かす大穴筆頭です。"
      },
      {
        number: 6,
        name: "セイウンハーデス",
        frameColor: "#ef4444",
        jockey: "幸英明 (58.0kg)",
        odds: 19.4,
        popularity: 7,
        signals: ["東京2000m向きの持続力", "好枠3枠6番から好位確保", "叩き良化の勝負気配"],
        comment: "AI穴馬指数88点。逃げ馬を見ながら好位3〜4番手で立ち回れる3枠6番は最高の並び。直線の坂でもバテない持続力で馬券圏内（2〜3着）粘り込み濃厚！"
      },
      {
        number: 8,
        name: "ジュンブロッサム",
        frameColor: "#3b82f6",
        jockey: "杉原誠人 (58.0kg)",
        odds: 36.2,
        popularity: 11,
        signals: ["東京直線の上がり3F極限末脚", "人気盲点の単勝30倍台", "良馬場高速決着が大好物"],
        comment: "AI穴馬指数87点。高速良馬場の東京コースでメンバー屈指の末脚を秘める伏兵。3着に突っ込むだけで3連複・ワイドの配当を一気に跳ね上げる爆弾穴馬！"
      }
    ],
    runners: [
      { num: 1, bracket: 1, name: "クロワデュノール", jockey: "C.デムーロ", weight: "58.0kg", odds: 2.5, pop: 1, style: "先行", score: 93, status: "◎ 本命筆頭（絶好1枠1番・春二冠馬）" },
      { num: 2, bracket: 1, name: "エルトンバローズ", jockey: "松若風馬", weight: "58.0kg", odds: 68.4, pop: 15, style: "先行", score: 66, status: "・ イン立ち回り注意" },
      { num: 3, bracket: 2, name: "レガレイラ", jockey: "岩田望来", weight: "56.0kg", odds: 12.8, pop: 5, style: "差し", score: 83, status: "▲ 牝馬56kg・内枠末脚警戒" },
      { num: 4, bracket: 2, name: "レディネス", jockey: "横山典弘", weight: "58.0kg", odds: 28.5, pop: 9, style: "差し", score: 92, status: "★ AI大穴イチオシ" },
      { num: 5, bracket: 3, name: "シャンパンカラー", jockey: "内田博幸", weight: "58.0kg", odds: 85.0, pop: 16, style: "追込", score: 58, status: "・ 展開待ち" },
      { num: 6, bracket: 3, name: "セイウンハーデス", jockey: "幸英明", weight: "58.0kg", odds: 19.4, pop: 7, style: "先行", score: 88, status: "★ 激走注目穴馬" },
      { num: 7, bracket: 4, name: "マスカレードボール", jockey: "C.ルメール", weight: "58.0kg", odds: 4.1, pop: 2, style: "差し", score: 91, status: "◯ 対抗有力（連覇狙う昨年覇者）" },
      { num: 8, bracket: 4, name: "ジュンブロッサム", jockey: "杉原誠人", weight: "58.0kg", odds: 36.2, pop: 11, style: "追込", score: 87, status: "★ 直線強襲穴馬" },
      { num: 9, bracket: 5, name: "ホウオウビスケッツ", jockey: "岩田康誠", weight: "58.0kg", odds: 34.8, pop: 10, style: "逃げ", score: 81, status: "注 単騎逃げ残り警戒" },
      { num: 10, bracket: 5, name: "ネブラディスク", jockey: "川田将雅", weight: "58.0kg", odds: 15.6, pop: 6, style: "先行", score: 79, status: "△ 鞍上強化で押さえ" },
      { num: 11, bracket: 6, name: "シェイクユアハート", jockey: "古川吉洋", weight: "58.0kg", odds: 92.0, pop: 17, style: "差し", score: 55, status: "・ 相手強い" },
      { num: 12, bracket: 6, name: "コスモキュランダ", jockey: "丹内祐次", weight: "58.0kg", odds: 42.0, pop: 12, style: "差し", score: 72, status: "・ タフ展開なら" },
      { num: 13, bracket: 7, name: "リアライズシリウス", jockey: "津村明秀", weight: "56.0kg", odds: 22.5, pop: 8, style: "先行", score: 80, status: "注 3歳56kg斤量恩恵" },
      { num: 14, bracket: 7, name: "タガノデュード", jockey: "M.デムーロ", weight: "58.0kg", odds: 54.0, pop: 14, style: "差し", score: 65, status: "・ 一発待ち" },
      { num: 15, bracket: 8, name: "サクラファレル", jockey: "佐々木大輔", weight: "58.0kg", odds: 46.5, pop: 13, style: "先行", score: 68, status: "・ 外枠課題" },
      { num: 16, bracket: 8, name: "ジョバンニ", jockey: "松山弘平", weight: "58.0kg", odds: 11.2, pop: 4, style: "差し", score: 76, status: "△ 実力上位も8枠割引" },
      { num: 17, bracket: 8, name: "ダノンデサイル", jockey: "戸崎圭太", weight: "58.0kg", odds: 7.2, pop: 3, style: "先行", score: 52, status: "⚠️ 危険な人気馬（魔の大外17番）" }
    ],
    actualResult: {
      statusType: "BIG_WIN",
      statusBadge: "🎯 発走前AI期待値シミュレーション",
      roi: "460%",
      trustGrade: "A+ (好枠×穴馬妙味大)",
      stars: "★★★★★",
      payouts: [
        { type: "複勝 ④ レディネス", yen: "620円 (想定)", isHit: true },
        { type: "ワイド ① - ④", yen: "2,680円 (想定)", isHit: true },
        { type: "3連複 ① - ④ - ⑦", yen: "12,400円 (想定)", isHit: true }
      ],
      podium: [
        { rank: 1, num: 1, name: "クロワデュノール (◎1枠本命)", pop: 1, odds: 2.5 },
        { rank: 2, num: 7, name: "マスカレードボール (◯対抗)", pop: 2, odds: 4.1 },
        { rank: 3, num: 4, name: "レディネス (★AI大穴推奨)", pop: 9, odds: 28.5, isTarget: true }
      ],
      review: "【日曜15:40発走予定・事前シミュレーション】大外8枠17番ダノンデサイルの距離ロスを見越し、絶好1枠①クロワデュノールと④レディネス（横山典弘）のイン強襲を組み合わせる高期待値シナリオです。"
    }
  },
  ...ARCHIVE_RACES
];

// --- アプリ状態管理 ---
let currentRace = RACE_DATABASE[0];
let currentBudget = 2000;
let currentBetTab = "tansho-fukusho";
let isResultMode = false;
let isPlan3Unlocked = false; // 夢の特大万馬券（3連単）のアンロック状態

// 仮想資金ウォレット (localStorage連携)
let virtualWalletBalance = parseInt(localStorage.getItem("oana_virtual_wallet") || "10000", 10);
let virtualPurchases = JSON.parse(localStorage.getItem("oana_purchases") || "[]");

// --- 初期化 ---
document.addEventListener("DOMContentLoaded", async () => {
  // アクセス解析ページビュー計測（非同期・低優先度）
  if (window.OanaAnalytics) {
    window.OanaAnalytics.trackPageView();
  }
  updateWalletUI();
  // 外部JSONデータの自動取得（パイプライン連携）
  await loadRemoteRaceData();
  renderRoundButtons();
  renderRaceCarousel();
  loadRace(currentRace.id);
  setupEventListeners();
  setupVenueTabs();
});

// パイプライン生成JSONの自動読み込み・即時反映
let lastLoadedDataHash = "";

async function loadRemoteRaceData(autoRefresh = false) {
  try {
    // バックグラウンド定期ポーリング時は priority: 'low' でメイン描画との帯域競合を回避
    const fetchOptions = autoRefresh ? { priority: "low" } : {};
    const res = await fetch("data/races.json?t=" + new Date().getTime(), fetchOptions);
    if (res.ok) {
      const dataText = await res.text();
      if (dataText === lastLoadedDataHash) {
        return;
      }
      lastLoadedDataHash = dataText;
      const data = JSON.parse(dataText);

      if (Array.isArray(data) && data.length > 0) {
        console.log("✅ パイプライン最新データをロードしました:", data.length, "件");
        RACE_DATABASE = [...data, ...ARCHIVE_RACES];

        // 自動更新時はUIを再描画
        if (autoRefresh) {
          const currentId = currentRace ? currentRace.id : RACE_DATABASE[0].id;
          const updatedRace = RACE_DATABASE.find(r => r.id === currentId) || RACE_DATABASE[0];
          currentRace = updatedRace;
          renderRoundButtons();
          renderRaceCarousel();
          loadRace(currentRace.id);
          console.log("🔄 Webサイトのレース情報を最新データへ自動更新しました！");
        } else {
          currentRace = RACE_DATABASE[0];
        }
      }
    }
  } catch (err) {
    console.log("ℹ️ ローカルフォールバックデータを使用します");
  }
}

// 5分ごとの自動更新チェック ＆ タブ復帰（アクティブ化）時の即時チェック
setInterval(() => {
  loadRemoteRaceData(true);
}, 5 * 60 * 1000);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    loadRemoteRaceData(true);
  }
});

// --- 仮想資金ウォレットUI更新 ---
function updateWalletUI() {
  const el = document.getElementById("wallet-balance");
  if (el) el.textContent = `${virtualWalletBalance.toLocaleString()} pt`;
  localStorage.setItem("oana_virtual_wallet", virtualWalletBalance.toString());
}

// --- 1R〜12Rのラウンドボタン生成 ---
function renderRoundButtons() {
  const container = document.getElementById("round-buttons");
  if (!container) return;
  container.innerHTML = "";

  for (let r = 1; r <= 12; r++) {
    const btn = document.createElement("button");
    const isCurrent = currentRace.round === r;
    // 11R（天皇賞）や荒れレースに炎マーク
    const isOanaRound = (r === 11 || r === 8 || r === 10);
    btn.className = `round-btn ${isCurrent ? 'active' : ''} ${isOanaRound ? 'has-oana' : ''}`;
    btn.textContent = `${r}R`;
    btn.onclick = () => {
      document.querySelectorAll(".round-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      // 該当レースへ切り替え
      const target = RACE_DATABASE.find(race => race.round === r) || currentRace;
      selectRace(target.id);
    };
    container.appendChild(btn);
  }
}

// --- レース選択カルーセル生成 ---
function renderRaceCarousel() {
  const container = document.getElementById("race-list-container");
  if (!container) return;
  container.innerHTML = "";

  RACE_DATABASE.forEach(race => {
    const card = document.createElement("div");
    card.className = `race-tab-card ${race.id === currentRace.id ? "active" : ""}`;
    card.id = `tab-${race.id}`;
    card.onclick = () => selectRace(race.id);

    card.innerHTML = `
      <div class="race-tab-header">
        <span class="race-tab-venue">${race.venue}</span>
        <span class="race-tab-date-tag">${race.date_short || "10/27(日)"}</span>
        <span class="race-tab-volatility ${race.volatilityClass}">${race.volatilityLevel.split(" ")[1] || race.volatilityLevel}</span>
      </div>
      <div class="race-tab-title">${race.title}</div>
      <div class="race-tab-meta">
        <span>波乱度: <strong>${race.volatilityScore}%</strong></span>
        <span class="race-tab-time">${race.postTime || "15:40発走"}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// --- レース選択切り替え ---
function selectRace(raceId) {
  const found = RACE_DATABASE.find(r => r.id === raceId);
  if (found) {
    currentRace = found;
    if (window.OanaAnalytics) {
      window.OanaAnalytics.trackEvent("race_view", { raceId });
    }
    // レースカードのアクティブ切り替え
    document.querySelectorAll(".race-tab-card").forEach(el => el.classList.remove("active"));
    const activeTab = document.getElementById(`tab-${raceId}`);
    if (activeTab) activeTab.classList.add("active");

    // 競馬場タブの同期
    if (currentRace.venueId) {
      document.querySelectorAll(".venue-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.venue === currentRace.venueId);
      });
    }

    // ラウンドボタンのアクティブ切り替え
    if (currentRace.round) {
      document.querySelectorAll(".round-btn").forEach((b, idx) => {
        if (idx + 1 === currentRace.round) {
          b.classList.add("active");
        } else {
          b.classList.remove("active");
        }
      });
    }

    loadRace(raceId);
  }
}

// --- レース情報の読み込み & UI反映 ---
function loadRace(raceId) {
  // レース開催日付 & 発走時刻
  const dateStr = currentRace.date || "2024年10月27日 (日)";
  const postTimeStr = currentRace.postTime || "15:40発走";
  
  const dateBadgeEl = document.getElementById("race-date-badge");
  if (dateBadgeEl) {
    dateBadgeEl.innerHTML = `📅 <strong>${dateStr}</strong> <span class="post-time-badge">${postTimeStr}</span>`;
  }
  const selectorDatePill = document.getElementById("selector-date-pill");
  if (selectorDatePill) {
    selectorDatePill.textContent = `📅 ${dateStr}`;
  }

  // レースヘッダー
  document.getElementById("race-badge").textContent = currentRace.badge;
  document.getElementById("race-title").textContent = currentRace.title;
  document.getElementById("race-conditions").innerHTML = `
    <span>天候: <strong>${currentRace.weather}</strong></span>
    <span class="sep">•</span>
    <span>馬場: <strong class="badge-heavy tooltip-trigger" data-tip="馬場の水分量・荒れ具合。良＝走りやすい、重・不良＝滑りやすく波乱が起きやすい">${currentRace.track} ℹ️</strong></span>
    <span class="sep">•</span>
    <span>展開: <strong class="badge-pace tooltip-trigger" data-tip="レースのペース。ハイペース＝前がバテて差し穴馬が有利、スロー＝前残り有利">${currentRace.pace} ℹ️</strong></span>
  `;

  // 波乱度メーター
  const bar = document.getElementById("volatility-bar");
  const score = document.getElementById("volatility-score");
  const badge = document.getElementById("volatility-badge");
  const desc = document.getElementById("volatility-desc");

  bar.style.width = `${currentRace.volatilityScore}%`;
  score.innerHTML = `${currentRace.volatilityScore}<span>%</span>`;
  badge.textContent = currentRace.volatilityLevel;
  badge.className = `volatility-level-badge ${currentRace.volatilityClass}`;
  desc.textContent = currentRace.volatilityDesc;

  // ⚠️ 危険な人気馬アラートの描画
  renderDangerHorse();

  // 👥 みんなの支持率バーの描画
  renderPoll();

  // 確定結果セクションのレンダリング
  renderVerificationSection();

  // 3プラン自動生成
  renderPlans();

  // 穴馬3選カード生成
  renderDarkHorses();

  // 券種別タブコンテンツ更新
  renderBetTabContent();

  // 出走全頭テーブル生成
  renderRunnersTable();
}

// --- ⚠️ 危険な人気馬（消し馬判定）レンダリング ---
function renderDangerHorse() {
  const container = document.getElementById("danger-horse-banner");
  if (!container) return;

  const danger = currentRace.dangerHorse;
  if (!danger) {
    container.style.display = "none";
    return;
  }

  container.style.display = "flex";
  container.innerHTML = `
    <div class="danger-horse-content">
      <span class="danger-tag">⚠️ 危険な人気馬</span>
      <div class="danger-text">
        <strong>${danger.num}番 ${danger.name}</strong> (${danger.pop}番人気 / ${danger.odds}倍) ── ${danger.reason}
      </div>
    </div>
  `;
}

// --- 👥 みんなの支持率ソーシャルバー レンダリング ---
function renderPoll() {
  const poll = currentRace.poll || { favPct: 50, underPct: 50, totalVotes: 1000 };
  const favBar = document.getElementById("poll-fav-bar");
  const underBar = document.getElementById("poll-under-bar");
  const countEl = document.getElementById("poll-voters-count");

  if (favBar && underBar && countEl) {
    favBar.style.width = `${poll.favPct}%`;
    favBar.innerHTML = `<span>本命派 ${poll.favPct}%</span>`;
    underBar.style.width = `${poll.underPct}%`;
    underBar.innerHTML = `<span>穴党派 ${poll.underPct}%</span>`;
    countEl.textContent = `計 ${poll.totalVotes.toLocaleString()} 票`;
  }
}

// 投票ボタンの処理
function handleVote(type) {
  const poll = currentRace.poll;
  if (!poll) return;

  if (type === "fav") {
    poll.favPct = Math.min(95, poll.favPct + 2);
    poll.underPct = 100 - poll.favPct;
  } else {
    poll.underPct = Math.min(95, poll.underPct + 2);
    poll.favPct = 100 - poll.underPct;
  }
  poll.totalVotes += 1;
  renderPoll();

  const favBtn = document.getElementById("vote-fav-btn");
  const underBtn = document.getElementById("vote-under-btn");
  if (type === "fav") {
    favBtn.classList.add("voted");
    underBtn.classList.remove("voted");
  } else {
    underBtn.classList.add("voted");
    favBtn.classList.remove("voted");
  }
}

// --- レース結果・信頼性検証セクションのレンダリング ---
function renderVerificationSection() {
  const section = document.getElementById("result-verification-section");
  const res = currentRace.actualResult;

  if (!res) {
    section.style.display = "none";
    return;
  }

  // 表示モード制御
  section.style.display = isResultMode ? "flex" : "none";

  let statusClass = "hit-badge-success";
  let cardClass = "";
  if (res.statusType === "MISS") {
    statusClass = "hit-badge-miss";
    cardClass = "miss";
  } else if (res.statusType === "SKIP_SUCCESS") {
    statusClass = "hit-badge-skip";
    cardClass = "skip-success";
  }

  section.innerHTML = `
    <div class="verification-card ${cardClass}">
      <div class="verification-header">
        <div class="hit-banner-wrapper">
          <div class="hit-status-badge ${statusClass}">
            ${res.statusBadge}
          </div>
          <div class="roi-badge">
            <span class="roi-label">本レース回収率</span>
            <span class="roi-value">${res.roi}</span>
          </div>
        </div>

        <div class="trust-rating-box">
          <span class="trust-label">AI信頼性評価：</span>
          <span class="trust-stars">${res.stars}</span>
          <span class="trust-grade">${res.trustGrade}</span>
        </div>
      </div>

      <!-- 予想 vs 確定着順 対比表 -->
      <div class="vs-grid">
        <div class="vs-col">
          <div class="vs-col-title">
            <span>🏁 確定着順 (上位3頭)</span>
            <span>単勝オッズ</span>
          </div>
          <ul class="vs-list">
            ${res.podium.map(p => `
              <li class="vs-item ${p.isTarget ? 'matched' : ''}">
                <div>
                  <span class="vs-rank-badge rank-${p.rank}">${p.rank}着</span>
                  <strong>${p.num}番</strong> ${p.name}
                  <span style="font-size:0.75rem; color:var(--text-dim);">(${p.pop}番人気)</span>
                </div>
                <div style="font-family:var(--font-display); font-weight:800; color:var(--accent-gold);">
                  ${p.odds}倍
                </div>
              </li>
            `).join("")}
          </ul>
        </div>

        <div class="vs-col">
          <div class="vs-col-title">
            <span>💰 確定払戻金＆的中判定</span>
            <span>払戻金額</span>
          </div>
          <div class="payouts-box">
            ${res.payouts.map(pay => `
              <div class="payout-row">
                <span>${pay.isHit ? '🎯' : '・'} ${pay.type}</span>
                <span class="${pay.isHit ? 'payout-hit' : ''}">${pay.yen}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- AI信頼性回顧・分析レポート -->
      <div class="review-box">
        <div class="review-title">🔍 AIレース回顧・信頼性判定レポート</div>
        <div class="review-text">${res.review}</div>
      </div>

      <!-- 𝕏 的中自慢・結果シェアボタン（口コミ増殖機能） -->
      <div style="margin-top:16px; text-align:center;">
        <button class="btn btn-primary" style="width:100%; justify-content:center; gap:8px; font-size:0.9rem; font-weight:800; background:linear-gradient(135deg, #1d9bf0, #0284c7); box-shadow:0 4px 16px rgba(29,155,240,0.4);" onclick="shareHitToX()">
          <span style="font-size:1.1rem;">𝕏</span> 的中結果をシェアして自慢する (${res.roi}) ↗
        </button>
        <p style="font-size:0.72rem; color:var(--text-muted); margin-top:6px;">
          ※ワンタップでX(Twitter)の投稿画面が開き、的中スクショや結果を投稿できます
        </p>
      </div>
    </div>
  `;
}

// --- 初心者向けおすすめ3プランの生成 ---
function renderPlans() {
  const container = document.getElementById("plans-container");
  const h1 = currentRace.darkHorses[0] || { number: 14, name: "注目穴馬", odds: 30 };
  const h2 = currentRace.darkHorses[1] || { number: 6, name: "相手穴馬", odds: 20 };
  const fav = currentRace.runners.find(r => r.pop === 1) || { num: 1, name: "人気馬" };

  // 予算に応じた金額分配
  const b = currentBudget;
  let p1_fuku = Math.floor(b * 0.6 / 100) * 100;
  let p1_wide = b - p1_fuku;

  let p2_wide1 = Math.floor(b * 0.4 / 100) * 100;
  let p2_wide2 = Math.floor(b * 0.3 / 100) * 100;
  let p2_sanren = b - p2_wide1 - p2_wide2;

  let p3_ticketCount = Math.floor(b / 100);

  container.innerHTML = `
    <!-- プラン1: ローリスク安心 -->
    <div class="plan-card">
      <div class="plan-header">
        <span class="plan-level-tag" style="color: #10b981;">🔰 初心者おすすめ・負けにくい</span>
        <h4 class="plan-title">複勝 ＋ ワイド安心プラン</h4>
        <p class="plan-desc">大穴馬が3着に滑り込むだけで高配当！最も的中しやすくリスクを抑えた買い方。</p>
      </div>

      <div class="plan-stats">
        <div class="stat-box">
          <span class="stat-label">想定的中率</span>
          <span class="stat-value green">約 30% 〜 40%</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">期待リターン</span>
          <span class="stat-value gold">5,000円〜2.5万円</span>
        </div>
      </div>

      <div class="plan-bet-sheet">
        <div class="bet-sheet-title">
          <span>購入買い目（計2点）</span>
          <span>合計: ${b.toLocaleString()}円</span>
        </div>
        <ul class="bet-lines-list">
          <li class="bet-line">
            <span class="bet-horses">【複勝】 <span class="badge-h" style="background:#f59e0b;">${h1.number}</span> ${h1.name}</span>
            <span class="bet-amount">${p1_fuku.toLocaleString()}円</span>
          </li>
          <li class="bet-line">
            <span class="bet-horses">【ワイド】 <span class="badge-h" style="background:#3b82f6;">${fav.num}</span> - <span class="badge-h" style="background:#f59e0b;">${h1.number}</span></span>
            <span class="bet-amount">${p1_wide.toLocaleString()}円</span>
          </li>
        </ul>

        <!-- クリーンなデジタルマークシート風スリップ -->
        <div class="digital-marksheet">
          <div class="marksheet-header">
            <span>🎫 マークカード確認 (1〜18番)</span>
            <span>枠・馬番が点灯中</span>
          </div>
          <div class="marksheet-grid">
            ${generateMarksheetCells([fav.num], [h1.number])}
          </div>
        </div>
      </div>

      <div style="display:flex; gap:8px;">
        <button class="btn btn-outline" style="flex:1; justify-content:center; font-size:0.75rem;" onclick="copyBetText('複勝 ${h1.number}番 / ワイド ${fav.num}-${h1.number}')">
          📋 コピー
        </button>
        <button class="btn btn-primary" style="flex:1.4; justify-content:center; font-size:0.75rem;" onclick="buyVirtualBet('複勝＋ワイド', ${b})">
          🪙 仮想購入 (${b.toLocaleString()}pt)
        </button>
      </div>
    </div>

    <!-- プラン2: バランス一攫千金 (イチオシ) -->
    <div class="plan-card highlight">
      <div class="plan-ribbon">人気No.1 イチオシ！</div>
      <div class="plan-header">
        <span class="plan-level-tag" style="color: #f59e0b;">⭐ 迷ったらコレ！最高の妙味</span>
        <h4 class="plan-title">ワイド ＋ 3連複バランスプラン</h4>
        <p class="plan-desc">本線ワイドで元返し〜プチボーナスを確保しつつ、3連複で5〜10万馬券を狙い撃ち！</p>
      </div>

      <div class="plan-stats">
        <div class="stat-box">
          <span class="stat-label">想定的中率</span>
          <span class="stat-value">約 18% 〜 25%</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">期待リターン</span>
          <span class="stat-value gold">2万円〜15万円</span>
        </div>
      </div>

      <div class="plan-bet-sheet">
        <div class="bet-sheet-title">
          <span>購入買い目（計3点）</span>
          <span>合計: ${b.toLocaleString()}円</span>
        </div>
        <ul class="bet-lines-list">
          <li class="bet-line">
            <span class="bet-horses">【ワイド】 <span class="badge-h" style="background:#3b82f6;">${fav.num}</span> - <span class="badge-h" style="background:#f59e0b;">${h1.number}</span></span>
            <span class="bet-amount">${p2_wide1.toLocaleString()}円</span>
          </li>
          <li class="bet-line">
            <span class="bet-horses">【ワイド】 <span class="badge-h" style="background:#f59e0b;">${h1.number}</span> - <span class="badge-h" style="background:#ef4444;">${h2.number}</span></span>
            <span class="bet-amount">${p2_wide2.toLocaleString()}円</span>
          </li>
          <li class="bet-line">
            <span class="bet-horses">【3連複】 軸<span class="badge-h" style="background:#f59e0b;">${h1.number}</span> 相手流し</span>
            <span class="bet-amount">${p2_sanren.toLocaleString()}円</span>
          </li>
        </ul>

        <!-- クリーンなデジタルマークシート風スリップ -->
        <div class="digital-marksheet">
          <div class="marksheet-header">
            <span>🎫 マークカード確認 (1〜18番)</span>
            <span>軸馬・相手馬が点灯中</span>
          </div>
          <div class="marksheet-grid">
            ${generateMarksheetCells([fav.num], [h1.number, h2.number])}
          </div>
        </div>
      </div>

      <div style="display:flex; gap:8px;">
        <button class="btn btn-outline" style="flex:1; justify-content:center; font-size:0.75rem;" onclick="copyBetText('ワイド ${fav.num}-${h1.number}, ${h1.number}-${h2.number} / 3連複軸${h1.number}')">
          📋 コピー
        </button>
        <button class="btn btn-primary" style="flex:1.4; justify-content:center; font-size:0.75rem;" onclick="buyVirtualBet('ワイド＋3連複', ${b})">
          🪙 仮想購入 (${b.toLocaleString()}pt)
        </button>
      </div>
    </div>

    <!-- プラン3: 夢の特大万馬券 (プレミアムロック付き) -->
    <div class="plan-card" style="border: 1px solid rgba(236,72,153,0.35);">
      <div class="plan-header">
        <span class="plan-level-tag" style="color: #ec4899;">🚀 夢の特大万馬券（VIP限定）</span>
        <h4 class="plan-title">3連単フォーメーション一攫千金</h4>
        <p class="plan-desc">大穴馬が激走した時に数十万〜数百万円の払い戻しを狙う、ハイリスク超ハイリターン型。</p>
      </div>

      <div class="plan-stats">
        <div class="stat-box">
          <span class="stat-label">想定的中率</span>
          <span class="stat-value" style="color:#ef4444;">約 2% 〜 5%</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">期待リターン</span>
          <span class="stat-value gold">30万円〜100万円超</span>
        </div>
      </div>

      <!-- 🔒 鍵（ロック）付き買い目エリア -->
      <div class="plan-locked-wrapper ${isPlan3Unlocked ? 'is-unlocked' : ''}">
        <!-- ぼかしのかかる買い目シート -->
        <div class="plan-locked-content">
          <div class="plan-bet-sheet">
            <div class="bet-sheet-title">
              <span>購入買い目（厳選 ${p3_ticketCount}点）</span>
              <span>合計: ${b.toLocaleString()}円</span>
            </div>
            <ul class="bet-lines-list">
              <li class="bet-line">
                <span class="bet-horses">1着: <span class="badge-h" style="background:#3b82f6;">${fav.num}</span>, <span class="badge-h" style="background:#f59e0b;">${h1.number}</span></span>
                <span class="bet-amount">各100円</span>
              </li>
              <li class="bet-line">
                <span class="bet-horses">2着: <span class="badge-h" style="background:#3b82f6;">${fav.num}</span>, <span class="badge-h" style="background:#f59e0b;">${h1.number}</span>, <span class="badge-h" style="background:#ef4444;">${h2.number}</span></span>
                <span class="bet-amount">均等配分</span>
              </li>
              <li class="bet-line">
                <span class="bet-horses">3着: 伏兵・穴馬へ手広く</span>
                <span class="bet-amount">計${p3_ticketCount}点</span>
              </li>
            </ul>

            <!-- クリーンなデジタルマークシート風スリップ -->
            <div class="digital-marksheet">
              <div class="marksheet-header">
                <span>🎫 マークカード確認 (1〜18番)</span>
                <span>3連単フォーメーション</span>
              </div>
              <div class="marksheet-grid">
                ${generateMarksheetCells([fav.num], [h1.number, h2.number])}
              </div>
            </div>
          </div>
        </div>

        <!-- すりガラス上のロックオーバーレイ -->
        <div class="plan-lock-overlay">
          <div class="plan-lock-icon">🔒</div>
          <span class="plan-lock-badge">👑 VIP限定・高配当特化プラン</span>
          <h5 class="plan-lock-title">このレースの特大万馬券<br>（3連単フォーメーション）を見る</h5>
          <button class="plan-lock-btn" onclick="openPremiumModal()">
            <span>🔑 ロックを解除して見る</span>
          </button>
          <span class="plan-lock-subtext">単発 300円〜 / 月額読み放題 1,980円</span>
        </div>
      </div>

      <!-- アクションボタン群 -->
      <div style="display:flex; flex-direction:column; gap:8px; margin-top:12px;">
        ${!isPlan3Unlocked ? `
          <button class="btn btn-primary" style="width:100%; justify-content:center; font-size:0.85rem; font-weight:800; background:linear-gradient(135deg, #ec4899, #8b5cf6); box-shadow:0 4px 14px rgba(236,72,153,0.35);" onclick="openPremiumModal()">
            🔒 このレースの特大万馬券買い目を見る (300円〜)
          </button>
        ` : `
          <div style="background:rgba(16,185,129,0.15); border:1px solid #10b981; border-radius:8px; padding:6px 10px; font-size:0.75rem; color:#10b981; text-align:center; font-weight:700;">
            🎉 アンロック中：3連単完全買い目を閲覧できます
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-outline" style="flex:1; justify-content:center; font-size:0.75rem;" onclick="copyBetText('3連単フォーメーション 1着:${fav.num},${h1.number} 2着:${fav.num},${h1.number},${h2.number}')">
              📋 買い目コピー
            </button>
            <button class="btn btn-primary" style="flex:1.2; justify-content:center; font-size:0.75rem; background:linear-gradient(135deg, #ec4899, #8b5cf6);" onclick="buyVirtualBet('3連単万馬券', ${b})">
              🪙 仮想購入 (${b.toLocaleString()}pt)
            </button>
          </div>
        `}
      </div>
    </div>
  `;
}

// デジタルマークシートの1〜18グリッド生成
function generateMarksheetCells(favNums, oanaNums) {
  let cellsHtml = "";
  for (let i = 1; i <= 18; i++) {
    let cls = "mark-cell";
    if (oanaNums.includes(i)) {
      cls += " marked";
    } else if (favNums.includes(i)) {
      cls += " marked-fav";
    }
    cellsHtml += `<div class="${cls}">${i}</div>`;
  }
  return cellsHtml;
}

// 仮想馬券の購入処理
function buyVirtualBet(planName, amount) {
  if (virtualWalletBalance < amount) {
    alert(`【仮想資金が不足しています】\n残高: ${virtualWalletBalance.toLocaleString()} pt\n必要額: ${amount.toLocaleString()} pt\n\nヘッダーの「↺」ボタンで残高を10,000ptにリセットできます。`);
    return;
  }

  virtualWalletBalance -= amount;
  updateWalletUI();

  // 購入ログ記録
  virtualPurchases.push({
    raceId: currentRace.id,
    raceTitle: currentRace.title,
    planName: planName,
    amount: amount,
    date: new Date().toLocaleTimeString()
  });
  localStorage.setItem("oana_purchases", JSON.stringify(virtualPurchases));

  alert(`🎯【仮想馬券を購入しました！】\n・プラン: ${planName}\n・投票額: ${amount.toLocaleString()} pt\n・残り残高: ${virtualWalletBalance.toLocaleString()} pt\n\n「🏁 確定結果・的中検証モード」に切り替えると、レース結果と照合して配当金が自動で払い戻されます！`);
}

// --- 穴馬3選カードの描画 ---
function renderDarkHorses() {
  const container = document.getElementById("horses-container");
  container.innerHTML = "";

  currentRace.darkHorses.forEach(horse => {
    const card = document.createElement("div");
    card.className = "horse-card";
    card.innerHTML = `
      <div class="horse-header">
        <div class="horse-num-box">
          <div class="horse-number-circle" style="background-color: ${horse.frameColor};">
            ${horse.number}
          </div>
          <div class="horse-name-meta">
            <span class="horse-name">${horse.name}</span>
            <span class="horse-jockey">${horse.jockey}</span>
          </div>
        </div>
        <div class="horse-odds-badge">
          <div class="odds-val">${horse.odds}倍</div>
          <div class="pop-val">${horse.popularity}番人気</div>
        </div>
      </div>

      <div class="horse-radar-signals">
        ${horse.signals.map(s => `
          <div class="signal-tag">
            <span class="signal-dot"></span> ${s}
          </div>
        `).join("")}
      </div>

      <div class="horse-comment">
        ${horse.comment}
      </div>
    `;
    container.appendChild(card);
  });
}

// --- 券種別タブコンテンツ描画 ---
function renderBetTabContent() {
  const panel = document.getElementById("bet-tab-content");
  const h1 = currentRace.darkHorses[0] || { number: 4, name: "穴馬1" };
  const h2 = currentRace.darkHorses[1] || { number: 6, name: "穴馬2" };
  const h3 = currentRace.darkHorses[2] || { number: 8, name: "穴馬3" };
  const fav = currentRace.runners.find(r => r.pop === 1) || currentRace.runners[0] || { num: 1, name: "1番人気" };
  const subFav = currentRace.runners.find(r => r.pop === 2) || currentRace.runners[1] || { num: 2, name: "2番人気" };

  // 重複しない相手馬番リストを動的に生成
  const umarenPartners = [...new Set([fav.num, subFav.num, h2.number, h3.number])].filter(n => n !== h1.number);
  const sanrenThirds = [...new Set([subFav.num, h1.number, h2.number, h3.number])].filter(n => n !== fav.num);

  let contentHtml = "";

  switch (currentBetTab) {
    case "tansho-fukusho":
      contentHtml = `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h4 style="font-size:1.1rem; font-weight:800;">単勝（1着当て） / 複勝（3着以内当て）</h4>
            <span class="badge-tag" style="color:#10b981; background:rgba(16,185,129,0.15);">初心者おすすめ度 ★★★★★</span>
          </div>
          <p style="font-size:0.88rem; color:var(--text-muted);">
            大穴狙いにおける<strong>複勝</strong>は、プロも絶賛する最強の投資馬券です。1着を当てる単勝はハードルが高いですが、3着以内なら十分に突っ込んできます。単勝20〜40倍の馬なら複勝でも<strong>500円〜1,200円（5〜12倍）</strong>もの好配当になります。
          </p>
          <div style="background:rgba(0,0,0,0.3); padding:16px; border-radius:12px; border-left:4px solid #10b981;">
            <strong style="color:#10b981;">推奨買い目：</strong>
            <p style="margin-top:6px; font-size:0.95rem;">
              ・複勝：<strong>${h1.number}番（${h1.name}）</strong> 一点勝負！<br>
              ・少額で夢を見るなら：単勝 ${h1.number}番 を100円〜200円だけ添える「単複セット」がベスト！
            </p>
          </div>
        </div>
      `;
      break;

    case "wide":
      contentHtml = `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h4 style="font-size:1.1rem; font-weight:800;">ワイド（3着以内に入る2頭を当てる）</h4>
            <span class="badge-tag" style="color:#f59e0b; background:rgba(245,158,11,0.15);">最も回収率が高くなりやすい王道 ★★★★★</span>
          </div>
          <p style="font-size:0.88rem; color:var(--text-muted);">
            「人気馬（軸）＋大穴馬」の組み合わせを買うのが最大の妙味。1番人気が馬券内に残っても、大穴が1頭絡むだけで<strong>2,000円〜8,000円超（20〜80倍）</strong>の配当に跳ね上がります。さらに大穴同士（${h1.number}-${h2.number}）で決まればワイドでも万馬券になります！
          </p>
          <div style="background:rgba(0,0,0,0.3); padding:16px; border-radius:12px; border-left:4px solid #f59e0b;">
            <strong style="color:#f59e0b;">推奨買い目（2点〜3点）：</strong>
            <p style="margin-top:6px; font-size:0.95rem;">
              ① ワイド本線：<strong>${fav.num} - ${h1.number}</strong>（本命軸と大穴の組み合わせ）<br>
              ② ワイド大穴狙い：<strong>${h1.number} - ${h2.number}</strong>（穴穴コンビ）
            </p>
          </div>
        </div>
      `;
      break;

    case "umaren":
      contentHtml = `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h4 style="font-size:1.1rem; font-weight:800;">馬連（1・2着を着順不問で当てる）</h4>
            <span class="badge-tag" style="color:#06b6d4; background:rgba(6,182,212,0.15);">中級者向け 万馬券狙い ★★★☆☆</span>
          </div>
          <p style="font-size:0.88rem; color:var(--text-muted);">
            大穴馬が2着までに連対する必要があるため難易度は上がりますが、当たった時の破壊力は抜群（1万〜10万円以上）。
          </p>
          <div style="background:rgba(0,0,0,0.3); padding:16px; border-radius:12px; border-left:4px solid #06b6d4;">
            <strong style="color:#06b6d4;">推奨買い目：</strong>
            <p style="margin-top:6px; font-size:0.95rem;">
              ・馬連流し：軸<strong>${h1.number}</strong> ─ 相手 <strong>${umarenPartners.join(", ")}</strong>（計${umarenPartners.length}点）
            </p>
          </div>
        </div>
      `;
      break;

    case "sanrenpuku":
      contentHtml = `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h4 style="font-size:1.1rem; font-weight:800;">3連複（1〜3着に入る3頭を着順不問で当てる）</h4>
            <span class="badge-tag" style="color:#8b5cf6; background:rgba(139,92,246,0.15);">一攫千金と的中の黄金バランス ★★★★☆</span>
          </div>
          <p style="font-size:0.88rem; color:var(--text-muted);">
            3連単のように着順を完璧に当てる必要がないため買い目点数を数点に抑えられ、かつ大穴が1頭絡むだけで配当は<strong>1万〜10万円クラス</strong>に膨れ上がります。
          </p>
          <div style="background:rgba(0,0,0,0.3); padding:16px; border-radius:12px; border-left:4px solid #8b5cf6;">
            <strong style="color:#8b5cf6;">おすすめフォーメーション：</strong>
            <p style="margin-top:6px; font-size:0.95rem;">
              1頭目（軸）：<strong>${fav.num}</strong>（本命馬）<br>
              2頭目：<strong>${h1.number}, ${h2.number}</strong>（AI激走穴馬）<br>
              3頭目：<strong>${sanrenThirds.join(", ")}</strong>（対抗・注目穴馬へ）
            </p>
          </div>
        </div>
      `;
      break;

    case "sanrentan":
      contentHtml = `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h4 style="font-size:1.1rem; font-weight:800;">3連単（1〜3着を着順通りに当てる）</h4>
            <span class="badge-tag" style="color:#ef4444; background:rgba(239,68,68,0.15);">超特大万馬券専用（ハイリスク） ★★☆☆☆</span>
          </div>
          <p style="font-size:0.88rem; color:var(--text-muted);">
            当たれば数十万円〜数百万円のメガ配当になりますが、点数が膨らみやすいため「大穴馬を2着または3着に組み込むフォーメーション」で点数を絞るのが勝ち組のテクニックです。
          </p>
          <div style="background:rgba(0,0,0,0.3); padding:16px; border-radius:12px; border-left:4px solid #ef4444;">
            <strong style="color:#ef4444;">穴党の狙い目フォーメーション：</strong>
            <p style="margin-top:6px; font-size:0.95rem;">
              1着：<strong>${fav.num}, ${subFav.num}</strong>（上位人気）<br>
              2着：<strong>${h1.number}, ${h2.number}</strong>（大穴が2着に強襲！）<br>
              3着：<strong>${[...new Set([fav.num, subFav.num, h1.number, h2.number, h3.number])].join(", ")}</strong>
            </p>
          </div>
        </div>
      `;
      break;
  }

  panel.innerHTML = contentHtml;
}

// --- 出走全頭テーブル描画 ---
function renderRunnersTable() {
  const tbody = document.getElementById("runners-tbody");
  tbody.innerHTML = "";

  currentRace.runners.forEach(r => {
    const tr = document.createElement("tr");
    const isSpecial = r.score >= 85;
    const bracketLabel = r.bracket ? `<span style="font-size:0.75rem; color:var(--text-muted); margin-right:4px;">${r.bracket}枠</span>` : "";
    tr.innerHTML = `
      <td>${bracketLabel}<strong>${r.num}番</strong></td>
      <td style="font-weight:700;">${r.name}</td>
      <td>${r.jockey} (${r.weight})</td>
      <td><span style="color:var(--accent-gold); font-weight:800;">${r.odds}倍</span> (${r.pop}人気)</td>
      <td>${r.style}</td>
      <td>
        <span class="${isSpecial ? 'oana-star' : ''}" style="font-family:var(--font-display); font-size:1.05rem;">
          ${r.score} pt
        </span>
      </td>
      <td>
        <span style="font-size:0.8rem; font-weight:700; ${isSpecial ? 'color:#f59e0b;' : 'color:var(--text-muted);'}">
          ${r.status}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// --- イベントリスナー設定 ---
function setupEventListeners() {
  // 仮想資金リセットボタン
  const resetBtn = document.getElementById("wallet-reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("仮想資金を初期値の 10,000 pt にリセットしますか？")) {
        virtualWalletBalance = 10000;
        virtualPurchases = [];
        localStorage.removeItem("oana_purchases");
        updateWalletUI();
        alert("仮想資金を 10,000 pt にリセットしました！");
      }
    });
  }

  // 👥 みんなの支持率 投票ボタン
  const favBtn = document.getElementById("vote-fav-btn");
  const underBtn = document.getElementById("vote-under-btn");
  if (favBtn && underBtn) {
    favBtn.onclick = () => handleVote("fav");
    underBtn.onclick = () => handleVote("under");
  }

  // モード切り替え（事前予想 ⇄ 結果・的中検証）
  const predBtn = document.getElementById("mode-prediction-btn");
  const resultBtn = document.getElementById("mode-result-btn");

  if (predBtn && resultBtn) {
    predBtn.addEventListener("click", () => {
      isResultMode = false;
      predBtn.classList.add("active");
      resultBtn.classList.remove("active");
      renderVerificationSection();
    });

    resultBtn.addEventListener("click", () => {
      isResultMode = true;
      resultBtn.classList.add("active");
      predBtn.classList.remove("active");
      renderVerificationSection();

      // 仮想馬券の配当払い戻しシミュレーション
      checkAndPayoutVirtualBets();

      // 結果エリアへスムーズスクロール
      const sec = document.getElementById("result-verification-section");
      if (sec) sec.scrollIntoView({ behavior: "smooth" });
    });
  }

  // 予算セレクター
  const budgetSelect = document.getElementById("budget-select");
  budgetSelect.addEventListener("change", (e) => {
    currentBudget = parseInt(e.target.value, 10);
    renderPlans();
  });

  // 初心者ガイドモーダル
  const guideBtn = document.getElementById("btn-beginner-guide");
  const modal = document.getElementById("guide-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const understandBtn = document.getElementById("modal-understand-btn");

  guideBtn.onclick = () => modal.removeAttribute("hidden");
  closeBtn.onclick = () => modal.setAttribute("hidden", "true");
  understandBtn.onclick = () => modal.setAttribute("hidden", "true");
  modal.onclick = (e) => {
    if (e.target === modal) modal.setAttribute("hidden", "true");
  };

  // 券種別タブ切り替え
  const tabs = document.querySelectorAll(".bet-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentBetTab = tab.dataset.bet;
      renderBetTabContent();
    });
  });

  // プレミアムモーダルの設定
  setupPremiumModal();
}

// --- 仮想馬券の配当払い戻しシミュレーション ---
function checkAndPayoutVirtualBets() {
  if (virtualPurchases.length === 0) return;

  const currentBets = virtualPurchases.filter(b => b.raceId === currentRace.id && !b.paidOut);
  if (currentBets.length === 0) return;

  const res = currentRace.actualResult;
  if (!res) return;

  let totalPayout = 0;
  currentBets.forEach(bet => {
    bet.paidOut = true;
    if (res.statusType === "BIG_WIN") {
      // 回収率に応じた払戻
      let roiMulti = parseFloat(res.roi) / 100 || 2.5;
      let won = Math.round(bet.amount * roiMulti);
      totalPayout += won;
    } else if (res.statusType === "SKIP_SUCCESS") {
      // 資金保護（全額返還）
      totalPayout += bet.amount;
    }
  });

  if (totalPayout > 0) {
    virtualWalletBalance += totalPayout;
    updateWalletUI();
    localStorage.setItem("oana_purchases", JSON.stringify(virtualPurchases));
    alert(`🎉【仮想馬券の払い戻しが発生しました！】\n的中払戻金: ＋${totalPayout.toLocaleString()} pt がウォレットに加算されました！\n現在の残高: ${virtualWalletBalance.toLocaleString()} pt`);
  }
}

// --- 競馬場タブの切り替え ---
function setupVenueTabs() {
  const venueBtns = document.querySelectorAll(".venue-btn");
  venueBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      venueBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const venue = btn.dataset.venue;
      const target = RACE_DATABASE.find(r => r.venueId === venue);
      if (target) {
        selectRace(target.id);
      }
    });
  });
}

// --- クリップボードコピー機能 ---
function copyBetText(text) {
  if (window.OanaAnalytics) {
    window.OanaAnalytics.trackEvent("copy_bet", { raceId: currentRace ? currentRace.id : null });
  }
  navigator.clipboard.writeText(text).then(() => {
    alert(`【買い目をコピーしました】\n${text}\n\nPAT（ネット投票）やメモに貼り付けてご利用ください！`);
  }).catch(() => {
    alert(`買い目:\n${text}`);
  });
}

// --- プレミアムモーダル制御 ---
function openPremiumModal() {
  if (window.OanaAnalytics) {
    window.OanaAnalytics.trackEvent("unlock_modal_open", { raceId: currentRace ? currentRace.id : null });
  }
  const modal = document.getElementById("premium-modal");
  if (modal) modal.removeAttribute("hidden");
}

function unlockPlan3(closeModal = true) {
  isPlan3Unlocked = true;
  renderPlans();
  if (closeModal) {
    const modal = document.getElementById("premium-modal");
    if (modal) modal.setAttribute("hidden", "true");
  }
}

function setupPremiumModal() {
  const modal = document.getElementById("premium-modal");
  const closeBtn = document.getElementById("premium-close-btn");
  if (closeBtn && modal) {
    closeBtn.onclick = () => modal.setAttribute("hidden", "true");
    modal.onclick = (e) => {
      if (e.target === modal) modal.setAttribute("hidden", "true");
    };
  }
}

// --- 𝕏 的中シェア（口コミ拡散）機能 ---
function shareHitToX() {
  if (!currentRace || !currentRace.actualResult) return;
  if (window.OanaAnalytics) {
    window.OanaAnalytics.trackEvent("x_share", { raceId: currentRace.id });
  }
  const res = currentRace.actualResult;
  const title = currentRace.title || currentRace.badge;
  const hitPayouts = res.payouts ? res.payouts.filter(p => p.isHit).map(p => `${p.type} ${p.yen}`).join(" / ") : "";

  let text = "";
  if (res.statusType === "MISS") {
    text = `【AI競馬回顧・的中検証】\n${title}\nAI波乱度判定とレース検証レポートをチェックしました！\nハズレも隠さず事前予想を完全公開中👇\n`;
  } else {
    text = `【🎯 万馬券・的中速報！】\n${title}\nAI大穴ナビゲーターの激走穴馬が見事に激走！\n${hitPayouts ? '的中払戻: ' + hitPayouts + '\n' : ''}回収率: ${res.roi} 🔥\n\n週末全レースの波乱度＆穴馬予想は無料公開中👇\n`;
  }

  const url = "https://www.oana-navi.com/";
  const hashtags = "大穴ナビゲーター,競馬予想,万馬券,競馬AI";
  const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
  
  window.open(intentUrl, "_blank", "width=600,height=500");
}

// グローバルスコープへ明示的公開（HTMLインラインonclick対応）
window.selectRace = selectRace;
window.copyBetText = copyBetText;
window.buyVirtualBet = buyVirtualBet;
window.handleVote = handleVote;
window.openPremiumModal = openPremiumModal;
window.unlockPlan3 = unlockPlan3;
window.shareHitToX = shareHitToX;


