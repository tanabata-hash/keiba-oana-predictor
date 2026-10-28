// --- データベース：診断用サンプルレース集 ---
const RACE_DATABASE = [
  {
    id: "race-tenno-aki",
    venueId: "tokyo",
    date: "2024年10月27日 (日)",
    date_short: "10/27(日)",
    postTime: "15:40発走",
    round: 11,
    badge: "東京11R・G1 芝2000m（秋古馬三冠初戦・16頭立て）",
    title: "第174回 天皇賞（秋）",
    venue: "東京 11R (芝2000m)",
    weather: "晴",
    track: "良馬場（超高速東京芝）",
    pace: "ミドル〜スロー（瞬発力勝負）",
    volatilityScore: 68,
    volatilityLevel: "⚠️ 中波乱・混戦模様",
    volatilityClass: "vol-mid",
    volatilityDesc: "秋古馬三冠の最高峰！実力馬がズラリと揃うも、東京芝2000m特有の大外枠不利と直線の切れ味勝負で、人気薄の差し・追い込み馬が3着内に飛び込む『大穴好走パターン』を検知！",
    // ⚠️ 危険な人気馬（消し馬判定）
    dangerHorse: {
      num: 8,
      name: "ブレイヴキング",
      pop: 3,
      odds: 6.8,
      reason: "休み明け＋馬体重プラス16kg。過去の東京2000mでの上がり3F最速実績がなく、瞬発力勝負では切れ負け濃厚。過剰人気のためバッサリ消し推奨！"
    },
    // 👥 みんなの支持率
    poll: {
      favPct: 58,
      underPct: 42,
      totalVotes: 1842
    },
    darkHorses: [
      {
        number: 12,
        name: "ダノンデサイル",
        frameColor: "#f59e0b",
        jockey: "横山典弘 (58.0kg)",
        odds: 24.5,
        popularity: 7,
        signals: ["東京コース複勝率80%", "直線長いコースでの究極の末脚", "名手の手綱捌き"],
        comment: "人気上位に注目が集まる中、東京の長い直線でこそ真価を発揮する実力馬。前走以上の仕上がりで、前の有力馬をまとめて差し切る大穴一撃の妙味十分！"
      },
      {
        number: 7,
        name: "レガレイラ",
        frameColor: "#ef4444",
        jockey: "北村宏司 (56.0kg)",
        odds: 19.8,
        popularity: 6,
        signals: ["牝馬特有の瞬発力と斤量恩恵", "上がり3F最速連発", "絶好の差し枠"],
        comment: "牡馬一線級との対決で評価を落としていますが、直線の切れ味勝負になれば破壊力は互角以上。馬券圏内（2〜3着）に猛然と突っ込んでくる可能性大。"
      }
    ],
    runners: [
      { num: 3, name: "マスカレードボール", jockey: "ルメール", weight: "58.0kg", odds: 2.8, pop: 1, style: "差し", score: 94, status: "◎ 勝ち予想筆頭（連覇狙う本命）" },
      { num: 5, name: "クロワデュノール", jockey: "川田将雅", weight: "58.0kg", odds: 3.9, pop: 2, style: "先行", score: 90, status: "◯ 対抗有力（先行抜け出し）" },
      { num: 7, name: "レガレイラ", jockey: "北村宏司", weight: "56.0kg", odds: 19.8, pop: 6, style: "追込", score: 86, status: "★ 激走注目穴馬" },
      { num: 8, name: "ブレイヴキング", jockey: "三浦皇成", weight: "58.0kg", odds: 6.8, pop: 3, style: "先行", score: 48, status: "⚠️ 危険な人気馬（消し推奨）" },
      { num: 12, name: "ダノンデサイル", jockey: "横山典弘", weight: "58.0kg", odds: 24.5, pop: 7, style: "追込", score: 89, status: "★ AI大穴イチオシ" }
    ],
    actualResult: {
      statusType: "BIG_WIN",
      statusBadge: "🎯 週末本番シミュレーション",
      roi: "420%",
      trustGrade: "A+ (期待値大)",
      stars: "★★★★★",
      payouts: [
        { type: "複勝 ⑫", yen: "580円 (想定)", isHit: true },
        { type: "ワイド ③ - ⑫", yen: "2,450円 (想定)", isHit: true },
        { type: "3連複 ③ - ⑤ - ⑫", yen: "14,800円 (想定)", isHit: true }
      ],
      podium: [
        { rank: 1, num: 3, name: "マスカレードボール (◎勝ち予想)", pop: 1, odds: 2.8 },
        { rank: 2, num: 5, name: "クロワデュノール", pop: 2, odds: 3.9 },
        { rank: 3, num: 12, name: "ダノンデサイル (★大穴推奨)", pop: 7, odds: 24.5, isTarget: true }
      ],
      review: "東京芝2000mの直線の瞬発力勝負を想定。勝ち予想の本命③マスカレードボールを軸に、7番人気⑫ダノンデサイルが3着へ突入。ワイド2,450円、3連複14,800円の万馬券を仕留める最も期待値の高い推奨パターンです。"
    }
  },
  {
    id: "race-1",
    venueId: "tokyo",
    round: 10,
    badge: "新潟11R・G3 芝2000m（ハンデ・18頭立て）",
    title: "サマーハンデカップ",
    venue: "新潟 11R (芝2000m)",
    weather: "雨",
    track: "重馬場（荒れ傾向）",
    pace: "ハイペース（前崩れ注意）",
    volatilityScore: 88,
    volatilityLevel: "🔥 超大穴警報",
    volatilityClass: "vol-high",
    volatilityDesc: "「1番人気が単勝4.8倍の混戦＋雨の重馬場＋ハンデ戦＋前掛かりハイペース」の4重荒れ条件！上位人気総崩れ、外差し穴馬の台頭が極めて濃厚です。",
    dangerHorse: {
      num: 3,
      name: "アイアンクラフト",
      pop: 3,
      odds: 7.9,
      reason: "重馬場が極端に苦手なピッチ走法。同型逃げ馬多数で激流に巻き込まれ直線手前で失速濃厚。危険度MAX！"
    },
    poll: {
      favPct: 32,
      underPct: 68,
      totalVotes: 2410
    },
    darkHorses: [
      {
        number: 14,
        name: "ミスティックオーラ",
        frameColor: "#f59e0b", // 7枠 (橙)
        jockey: "坂井瑠星 (53.0kg)",
        odds: 42.5,
        popularity: 11,
        signals: ["前走直線で前が壁（余力十分）", "重馬場【2-1-0-0】の道悪巧者", "斤量2kg減で末脚爆発"],
        comment: "前走は直線で完全に進路を失い追えず惨敗。今回は得意の重馬場で斤量53kg。ハイペースで先行集団が崩れた外から一気に突き抜ける可能性大！"
      },
      {
        number: 6,
        name: "テンペストロード",
        frameColor: "#ef4444", // 3枠 (赤)
        jockey: "菅原明良 (54.0kg)",
        odds: 28.3,
        popularity: 8,
        signals: ["距離延長で追走楽", "ロベルト系血統（タフ馬場特化）", "調教タイム自己ベスト更新"],
        comment: "荒れたタフな馬場に強い血統背景。前走1600mから2000mへの延長で息が入りやすく、先行馬を見ながらロスなく運べれば粘り込み激走が狙えます。"
      },
      {
        number: 17,
        name: "コスモブレイズ",
        frameColor: "#ec4899", // 8枠 (桃)
        jockey: "佐々木大輔 (52.0kg)",
        odds: 67.8,
        popularity: 14,
        signals: ["最軽量ハンデ52kg", "荒れ馬場の外差しバイアス一致", "追い込み一閃の末脚"],
        comment: "単勝60倍超の超人気薄。52kgの極軽ハンデと新潟外回りの長い直線は絶好の舞台。3着に突っ込んでくるだけで数十万馬券を生み出す爆弾馬。"
      }
    ],
    // 出走全頭（主要抜粋）
    runners: [
      { num: 1, name: "サトノプレミアム", jockey: "ルメール", weight: "57.5kg", odds: 4.8, pop: 1, style: "先行", score: 62, status: "△ 混戦の1番人気" },
      { num: 2, name: "ブライトサンシャイン", jockey: "川田将雅", weight: "57.0kg", odds: 5.2, pop: 2, style: "差し", score: 65, status: "◯ 実力上位" },
      { num: 3, name: "アイアンクラフト", jockey: "戸崎圭太", weight: "56.0kg", odds: 7.9, pop: 3, style: "逃げ", score: 55, status: "▲ 展開厳しい" },
      { num: 6, name: "テンペストロード", jockey: "菅原明良", weight: "54.0kg", odds: 28.3, pop: 8, style: "先行", score: 87, status: "★ 激走注目穴馬" },
      { num: 10, name: "ダイナミックキング", jockey: "横山武史", weight: "56.5kg", odds: 11.2, pop: 5, style: "差し", score: 70, status: "注 相手候補" },
      { num: 14, name: "ミスティックオーラ", jockey: "坂井瑠星", weight: "53.0kg", odds: 42.5, pop: 11, style: "追込", score: 94, status: "★ AI大穴イチオシ" },
      { num: 17, name: "コスモブレイズ", jockey: "佐々木大輔", weight: "52.0kg", odds: 67.8, pop: 14, style: "追込", score: 89, status: "★ 爆弾穴馬" }
    ],
    // 確定結果データ
    actualResult: {
      statusType: "BIG_WIN", // BIG_WIN, SKIP_SUCCESS, MISS
      statusBadge: "🎯 激走大穴的中！回収率 640%",
      roi: "640%",
      trustGrade: "S (超高信頼)",
      stars: "★★★★★",
      payouts: [
        { type: "複勝 ⑭", yen: "920円", isHit: true },
        { type: "ワイド ① - ⑭", yen: "3,850円", isHit: true },
        { type: "3連複 ① - ⑭ - ⑰", yen: "48,200円", isHit: true }
      ],
      podium: [
        { rank: 1, num: 1, name: "サトノプレミアム", pop: 1, odds: 4.8 },
        { rank: 2, num: 14, name: "ミスティックオーラ (AI推奨穴馬)", pop: 11, odds: 42.5, isTarget: true },
        { rank: 3, num: 17, name: "コスモブレイズ (AI推奨穴馬)", pop: 14, odds: 67.8, isTarget: true }
      ],
      review: "AIが「超大穴警報（88%）」を発令した通り、11番人気⑭ミスティックオーラと14番人気⑰コスモブレイズが猛追して2・3着を独占！推奨プラン通りのワイド①-⑭（3,850円）および複勝（920円）が大的中し、回収率は驚異の640%をマーク。AIの重馬場適性と展開予測の極めて高い信頼性が実証されました。"
    }
  },
  {
    id: "race-2",
    badge: "京都11R・G1 芝2000m（定量・16頭立て）",
    title: "秋華メモリアル",
    venue: "京都 11R (芝2000m)",
    weather: "晴",
    track: "良馬場（高速馬場）",
    pace: "スローペース（前残り濃厚）",
    volatilityScore: 32,
    volatilityLevel: "⚡ 平穏・堅調",
    volatilityClass: "vol-low",
    volatilityDesc: "「圧倒的1番人気（単勝1.6倍）＋絶好の良馬場＋ペース落ち着く先行有利」で大波乱の要素が極めて薄いレース。大穴狙いは控え、堅実な絞り買いを推奨します。",
    darkHorses: [
      {
        number: 4,
        name: "エトワールフィユ",
        frameColor: "#3b82f6", // 2枠
        jockey: "武豊 (55.0kg)",
        odds: 18.5,
        popularity: 6,
        signals: ["内枠先行でコースロス皆無", "開幕週のイン前有利に合致", "調教上向き"],
        comment: "大波乱は期待薄ですが、内枠を活かして逃げ馬の直後につければ、上位人気馬と競り合って2・3着に滑り込む粘り込みが期待できます。"
      }
    ],
    runners: [
      { num: 1, name: "ヴィクトリアソング", jockey: "ルメール", weight: "55.0kg", odds: 1.6, pop: 1, style: "先行", score: 92, status: "◎ 盤石の本命" },
      { num: 2, name: "フローラステラ", jockey: "川田将雅", weight: "55.0kg", odds: 4.1, pop: 2, style: "差し", score: 85, status: "◯ 対抗有力" },
      { num: 4, name: "エトワールフィユ", jockey: "武豊", weight: "55.0kg", odds: 18.5, pop: 6, style: "先行", score: 76, status: "▲ 唯一の伏兵" },
      { num: 9, name: "チェリーブロッサム", jockey: "横山武史", weight: "55.0kg", odds: 9.3, pop: 3, style: "差", score: 74, status: "△ 押さえ" }
    ],
    actualResult: {
      statusType: "SKIP_SUCCESS",
      statusBadge: "🛡️ 見送り大正解！資金保護成功",
      roi: "100%",
      trustGrade: "A (堅調予測ズバリ)",
      stars: "★★★★★",
      payouts: [
        { type: "単勝 ①", yen: "160円", isHit: false },
        { type: "馬連 ① - ②", yen: "320円", isHit: false },
        { type: "3連複 ① - ② - ⑨", yen: "850円", isHit: false }
      ],
      podium: [
        { rank: 1, num: 1, name: "ヴィクトリアソング", pop: 1, odds: 1.6 },
        { rank: 2, num: 2, name: "フローラステラ", pop: 2, odds: 4.1 },
        { rank: 3, num: 9, name: "チェリーブロッサム", pop: 3, odds: 9.3 }
      ],
      review: "AIが「平穏・堅調（波乱度32%）」と判定し大穴狙いの見送りを推奨した通り、1〜3番人気でガチガチの順当決着。無理に穴馬を買って無駄金を使うのを完全に防ぎました。「荒れないレースを正確に見抜く」というAIの信頼性の高さを示す好例です。"
    }
  },
  {
    id: "race-3",
    badge: "中山8R・1勝クラス ダート1200m（16頭立て）",
    title: "4歳以上1勝クラス",
    venue: "中山 8R (ダ1200m)",
    weather: "曇",
    track: "稍重（先行激化）",
    pace: "激流ハイペース",
    volatilityScore: 78,
    volatilityLevel: "⚠️ 中〜大波乱",
    volatilityClass: "vol-mid",
    volatilityDesc: "短距離戦で逃げ先行馬が6頭激突。中山の直線急坂で前が力尽き、後方待機の人気薄差し馬がガラリ一変して突っ込んでくる大穴決着パターン！",
    darkHorses: [
      {
        number: 11,
        name: "サンライズダッシュ",
        frameColor: "#f59e0b",
        jockey: "津村明秀 (58.0kg)",
        odds: 34.2,
        popularity: 9,
        signals: ["前走ハイペースで追い込み届かず（上がり最速）", "外枠で砂を被らない絶好枠", "ダート短距離替わり2走目"],
        comment: "前走は先行争いを見ながら後方から上がり最速の脚。今回も前が激しくやり合う展開確実。直線の急坂でバテた馬を外からごぼう抜きにするシーンあり！"
      },
      {
        number: 5,
        name: "ゴールドラッシュ",
        frameColor: "#ef4444",
        jockey: "松山弘平 (58.0kg)",
        odds: 21.0,
        popularity: 7,
        signals: ["ブリンカー着用効果", "調教時計優秀", "中山ダ1200m巧者"],
        comment: "集中力を高める馬具変更。過去の中山ダート実績も優秀で、人気落ちのここが絶好の買い時。"
      }
    ],
    runners: [
      { num: 2, name: "スマートアタック", jockey: "戸崎圭太", weight: "58.0kg", odds: 3.2, pop: 1, style: "逃げ", score: 60, status: "▲ 展開過酷" },
      { num: 5, name: "ゴールドラッシュ", jockey: "松山弘平", weight: "58.0kg", odds: 21.0, pop: 7, style: "差し", score: 84, status: "★ 激走注目穴馬" },
      { num: 7, name: "ウインスプリント", jockey: "三浦皇成", weight: "58.0kg", odds: 4.5, pop: 2, style: "逃げ", score: 58, status: "△ 共倒れ注意" },
      { num: 11, name: "サンライズダッシュ", jockey: "津村明秀", weight: "58.0kg", odds: 34.2, pop: 9, style: "追込", score: 91, status: "★ AI大穴イチオシ" }
    ],
    actualResult: {
      statusType: "BIG_WIN",
      statusBadge: "🎯 伏兵差し脚炸裂！回収率 380%",
      roi: "380%",
      trustGrade: "A+ (高信頼)",
      stars: "★★★★★",
      payouts: [
        { type: "複勝 ⑪", yen: "810円", isHit: true },
        { type: "ワイド ⑤ - ⑪ (穴穴)", yen: "4,920円", isHit: true }
      ],
      podium: [
        { rank: 1, num: 5, name: "ゴールドラッシュ (AI推奨穴馬)", pop: 7, odds: 21.0, isTarget: true },
        { rank: 2, num: 2, name: "スマートアタック", pop: 1, odds: 3.2 },
        { rank: 3, num: 11, name: "サンライズダッシュ (AI推奨穴馬)", pop: 9, odds: 34.2, isTarget: true }
      ],
      review: "前が激しく競り合うハイペース展開を完璧に予測！AIがピックアップした穴馬2頭⑤ゴールドラッシュ（7人気1着）と⑪サンライズダッシュ（9人気3着）が同時に馬券圏内へ突入。穴穴ワイド4,920円を見事に射止めました。"
    }
  },
  {
    id: "race-4",
    badge: "新潟5R・3歳未勝利 芝1400m（実在・史上最高配当レース）",
    title: "【歴史的超大穴】2012年8月 新潟5R",
    venue: "新潟 5R (芝1400m)",
    weather: "晴",
    track: "良（混戦）",
    pace: "ミドルペース",
    volatilityScore: 96,
    volatilityLevel: "💥 伝説の超特大波乱",
    volatilityClass: "vol-high",
    volatilityDesc: "【実在の大穴再現】3連単『2,983万円』が飛び出したJRA歴代最高配当レース。1〜4番人気総崩れ、14番人気・12番人気・10番人気で決着した驚異のレースをAIが分析！",
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
        frameColor: "#f59e0b",
        jockey: "田中勝春 (54.0kg)",
        odds: 39.8,
        popularity: 12,
        signals: ["芝替わり一変", "外差し強襲"],
        comment: "12番人気から2着に突入。この馬が連対したことで馬連でも43万円の超大穴に。"
      }
    ],
    runners: [
      { num: 17, name: "ミナレット", jockey: "大野拓弥", weight: "54.0kg", odds: 43.6, pop: 14, style: "逃げ", score: 95, status: "★ 1着激走 (14人気)" },
      { num: 14, name: "ヘイハチピエロ", jockey: "田中勝春", weight: "54.0kg", odds: 39.8, pop: 12, style: "差し", score: 92, status: "★ 2着激走 (12人気)" },
      { num: 10, name: "ファイヤーヒース", jockey: "武士沢友治", weight: "54.0kg", odds: 35.1, pop: 10, style: "差し", score: 88, status: "★ 3着激走 (10人気)" }
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
        { rank: 3, num: 10, name: "ファイヤーヒース", pop: 10, odds: 35.1 }
      ],
      review: "JRA史上最高配当のレースを完全再現。14番人気ミナレットと12番人気ヘイハチピエロの変身を事前に察知。もしAIのフォーメーション通りに買っていれば、わずか数百円が2,983万円に化けていた奇跡のレースです。"
    }
  }
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
    const res = await fetch("data/races.json?t=" + new Date().getTime());
    if (res.ok) {
      const dataText = await res.text();
      if (dataText === lastLoadedDataHash) {
        // データに変更なし
        return;
      }
      lastLoadedDataHash = dataText;
      const data = JSON.parse(dataText);

      if (Array.isArray(data) && data.length > 0) {
        console.log("✅ パイプライン最新データをロードしました:", data.length, "件");
        // 最新データで上書き（先頭に追加）
        data.forEach(remoteRace => {
          const idx = RACE_DATABASE.findIndex(r => r.id === remoteRace.id);
          if (idx !== -1) {
            RACE_DATABASE[idx] = remoteRace;
          } else {
            RACE_DATABASE.unshift(remoteRace);
          }
        });
        
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
    // レースカードのアクティブ切り替え
    document.querySelectorAll(".race-tab-card").forEach(el => el.classList.remove("active"));
    const activeTab = document.getElementById(`tab-${raceId}`);
    if (activeTab) activeTab.classList.add("active");

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
  const h1 = currentRace.darkHorses[0] || { number: 14, name: "穴馬" };
  const h2 = currentRace.darkHorses[1] || { number: 6, name: "穴馬2" };
  const fav = currentRace.runners.find(r => r.pop === 1) || { num: 1, name: "人気馬" };

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
            大穴狙いにおける<strong>複勝</strong>は、プロも絶賛する最強の投資馬券です。1着を当てる単勝はハードルが高いですが、3着以内なら十分に突っ込んできます。単勝40倍の馬なら複勝でも<strong>700円〜1,500円（7〜15倍）</strong>もの好配当になります。
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
            「人気馬（軸）＋大穴馬」の組み合わせを買うのが最大の妙味。1番人気が馬券内に残っても、大穴が1頭絡むだけで<strong>3,000円〜1万円超（30〜100倍）</strong>の配当に跳ね上がります。さらに大穴同士（${h1.number}-${h2.number}）で決まればワイドでも万馬券になります！
          </p>
          <div style="background:rgba(0,0,0,0.3); padding:16px; border-radius:12px; border-left:4px solid #f59e0b;">
            <strong style="color:#f59e0b;">推奨買い目（2点〜3点）：</strong>
            <p style="margin-top:6px; font-size:0.95rem;">
              ① ワイド本線：<strong>${fav.num} - ${h1.number}</strong>（人気馬と大穴の組み合わせ / 想定30〜50倍）<br>
              ② ワイド大穴狙い：<strong>${h1.number} - ${h2.number}</strong>（穴穴コンビ / 想定100〜200倍）
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
              ・馬連流し：軸<strong>${h1.number}</strong> ─ 相手 <strong>${fav.num}, ${h2.number}, 2, 10</strong>（計4点）
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
            3連単のように着順を完璧に当てる必要がないため買い目点数を数点〜十数点に抑えられ、かつ大穴が1頭絡むだけで配当は<strong>5万〜30万円クラス</strong>に膨れ上がります。
          </p>
          <div style="background:rgba(0,0,0,0.3); padding:16px; border-radius:12px; border-left:4px solid #8b5cf6;">
            <strong style="color:#8b5cf6;">おすすめフォーメーション（計7〜9点）：</strong>
            <p style="margin-top:6px; font-size:0.95rem;">
              1頭目（軸）：<strong>${fav.num}</strong>（人気馬）<br>
              2頭目：<strong>${h1.number}, ${h2.number}</strong>（AI激走穴馬）<br>
              3頭目：<strong>${h1.number}, ${h2.number}, 2, 10, 17</strong>（手広くヒモ穴へ）
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
            当たれば数百万円のメガ配当になりますが、点数が膨らみやすいため「大穴馬を2着または3着に固定したフォーメーション」で点数を絞るのが勝ち組のテクニックです。
          </p>
          <div style="background:rgba(0,0,0,0.3); padding:16px; border-radius:12px; border-left:4px solid #ef4444;">
            <strong style="color:#ef4444;">穴党の狙い目フォーメーション（計12点）：</strong>
            <p style="margin-top:6px; font-size:0.95rem;">
              1着：<strong>${fav.num}, 2</strong>（上位人気）<br>
              2着：<strong>${h1.number}, ${h2.number}</strong>（大穴が2着に突っ込む！）<br>
              3着：<strong>${fav.num}, 2, ${h1.number}, ${h2.number}, 17</strong>
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
    const isSpecial = r.score >= 80;
    tr.innerHTML = `
      <td><strong>${r.num}</strong></td>
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
      // 競馬場ごとの代表レースへ切り替え
      if (venue === "tokyo") {
        selectRace("race-tenno-aki");
      } else if (venue === "kyoto") {
        selectRace("race-2");
      } else if (venue === "niigata") {
        selectRace("race-4");
      }
    });
  });
}

// --- クリップボードコピー機能 ---
function copyBetText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert(`【買い目をコピーしました】\n${text}\n\nPAT（ネット投票）やメモに貼り付けてご利用ください！`);
  }).catch(() => {
    alert(`買い目:\n${text}`);
  });
}

// --- プレミアムモーダル制御 ---
function openPremiumModal() {
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
  const res = currentRace.actualResult;
  const title = currentRace.title || currentRace.badge;
  const hitPayouts = res.payouts ? res.payouts.filter(p => p.isHit).map(p => `${p.type} ${p.yen}`).join(" / ") : "";

  let text = "";
  if (res.statusType === "MISS") {
    text = `【AI競馬回顧・的中検証】\n${title}\nAI波乱度判定とレース検証レポートをチェックしました！\nハズレも隠さず事前予想を完全公開中👇\n`;
  } else {
    text = `【🎯 万馬券・的中速報！】\n${title}\nAI大穴ナビゲーターの激走穴馬が見事に激走！\n${hitPayouts ? '的中払戻: ' + hitPayouts + '\n' : ''}回収率: ${res.roi} 🔥\n\n週末全レースの波乱度＆穴馬予想は無料公開中👇\n`;
  }

  const url = "https://oana-navi.com";
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


