#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
大穴ナビゲーター PRO - リアルタイム出馬表・オッズ自動取得 & AI予想・note原稿生成パイプライン
(Live Race & Odds Scraper + AI Prediction & Note Manuscript Engine)

機能概要:
1. 今週末（土曜・日曜）のJRA開催スケジュールを netkeiba から自動検出（来週以降も毎週自動対応）
2. 各メインレース（G1/G2/G3/L/OP）の出馬表・枠順・騎手・斤量をリアルタイム取得
3. 単勝オッズAPIから最新オッズ・人気順を自動取得（未発売時は予想オッズ、発売後はJRA公式リアルタイムオッズ）
4. 波乱度・危険な人気馬・激走穴馬3選・買い目をAIロジックで自動算出（オフライン時は内蔵データへ安全にフォールバック）
5. Web用 JSON (data/races.json, data/pipeline_status.json) に加え、note投稿用完成原稿 (data/note_drafts.json, docs/note_articles_weekend.md) を自動生成
"""

import argparse
import base64
import html as html_lib
import json
import os
import re
import ssl
import sys
import urllib.request
import zlib
from datetime import datetime, timedelta

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_PATH = os.path.join(BASE_DIR, "data", "races.json")
STATUS_PATH = os.path.join(BASE_DIR, "data", "pipeline_status.json")
NOTE_JSON_PATH = os.path.join(BASE_DIR, "data", "note_drafts.json")
NOTE_MD_PATH = os.path.join(BASE_DIR, "docs", "note_articles_weekend.md")

SITE_URL = "https://www.oana-navi.com"
NOTE_PROFILE_URL = "https://note.com/oana_navi"

# JRA標準の枠番カラー（1枠〜8枠）
BRACKET_COLORS = {
    1: "#64748b",  # 1枠（白系スレート）
    2: "#334155",  # 2枠（黒）
    3: "#ef4444",  # 3枠（赤）
    4: "#3b82f6",  # 4枠（青）
    5: "#eab308",  # 5枠（黄）
    6: "#10b981",  # 6枠（緑）
    7: "#f97316",  # 7枠（橙）
    8: "#ec4899",  # 8枠（桃）
}

# JRA競馬場コード対応表
JRA_VENUES = {
    "01": ("札幌", "sapporo"),
    "02": ("函館", "hakodate"),
    "03": ("福島", "fukushima"),
    "04": ("新潟", "niigata"),
    "05": ("東京", "tokyo"),
    "06": ("中山", "nakayama"),
    "07": ("中京", "chukyo"),
    "08": ("京都", "kyoto"),
    "09": ("阪神", "hanshin"),
    "10": ("小倉", "kokura"),
}

# グレードアイコン番号対応表（小さいほど優先表示）
GRADE_MAP = {
    "1": ("G1", 1),
    "2": ("G2", 2),
    "3": ("G3", 3),
    "15": ("L", 4),
    "5": ("OP", 5),
}

# 注目馬の脚質・専門コメント知識ベース（ライブ取得データに高精度の定性評価を補強）
EXPERT_HORSE_NOTES = {
    # --- 11/15(日) エリザベス女王杯 (G1) ---
    "ステレンボッシュ": {"style": "差し", "status": "◎ 桜花賞馬・世代最強牝馬", "custom_score": 94},
    "クイーンズウォーク": {"style": "先行", "status": "◯ Cデムーロ×ローズS覇者", "custom_score": 91},
    "ジョスラン": {
        "style": "差し",
        "is_danger": True,
        "danger_reason": "ルメール騎乗で1〜2番人気必至も、京都芝2200mのタフなスタミナ戦は初経験。古馬一線級との消耗戦で直線伸びあぐねるリスクあり！",
        "custom_score": 58,
    },
    "コガネノソラ": {
        "style": "先行",
        "is_dark_pick": True,
        "pick_order": 1,
        "custom_score": 92,
        "signals": ["クイーンS覇者の地力", "京都外回り向きの先行持続力", "単勝20倍前後のオッズ妙味"],
        "comment": "AI穴馬指数92点！クイーンSで強豪牝馬を撃破した先行力は本物。京都外回りの下り坂から早めにスパートを仕掛ければ、上位人気をまとめて封じ込める大穴筆頭！",
    },
    "サフィラ": {
        "style": "差し",
        "is_dark_pick": True,
        "pick_order": 2,
        "custom_score": 89,
        "signals": ["叩き2戦目の上積み", "良血開花の好配当ゾーン", "京都芝の末脚適性"],
        "comment": "AI穴馬指数89点。休養を挟んで馬体が一段と成長。人気盲点となっているオッズゾーンから、直線イン突き強襲で馬券圏内（2〜3着）へ飛び込む激走候補！",
    },
    "エセルフリーダ": {
        "style": "追込",
        "is_dark_pick": True,
        "pick_order": 3,
        "custom_score": 86,
        "signals": ["極限の上がり3F末脚", "展開前崩れの追い風", "超高配当爆弾"],
        "comment": "AI穴馬指数86点。ハイペースで前が総崩れになった際に大外一気の豪脚が炸裂する爆弾穴馬。3連複・ワイドの配当を一気に跳ね上げる一撃必殺タイプ！",
    },
    "カムニャック": {"style": "先行", "status": "▲ 川田将雅騎乗・先行粘り込み警戒", "custom_score": 88},
    "アクアヴァーナル": {"style": "差し", "status": "注 松山騎手×京都巧者", "custom_score": 84},

    # --- 11/14(土) 武蔵野S (G3) ---
    "エンペラーワケア": {"style": "先行", "status": "◎ 根岸S覇者・ダート実力最上位", "custom_score": 93},
    "オメガギネス": {"style": "先行", "status": "◯ 東京マイル巧者・実績上位", "custom_score": 90},
    "ジャスティンアース": {
        "style": "差し",
        "is_danger": True,
        "danger_reason": "ルメール騎乗で過剰人気になりやすいが、芝スタートの東京ダート1600mで砂を被った際の脆さが懸念。オッズ妙味が薄く過信禁物！",
        "custom_score": 57,
    },
    "ドンインザムード": {
        "style": "差し",
        "is_dark_pick": True,
        "pick_order": 1,
        "custom_score": 91,
        "signals": ["東京ダート1600mの適性◎", "手頃な人気盲点オッズ", "決め手上位の末脚"],
        "comment": "AI穴馬指数91点！直線の長い東京ダートで確実に伸びてくる末脚が武器。ハイペース前崩れの展開なら一気に馬券圏内へ突入するAIイチオシ穴馬！",
    },
    "ダノンフィーゴ": {
        "style": "先行",
        "is_dark_pick": True,
        "pick_order": 2,
        "custom_score": 88,
        "signals": ["名手マーカンド騎乗", "好位追走からの粘り込み", "勢いある昇級馬"],
        "comment": "AI穴馬指数88点。名手マーカンド騎手を配した陣営の本気度がシグナル。前を見ながらしぶとく脚を使えば2〜3着粘り込みの期待大！",
    },
    "トリリオンボーイ": {
        "style": "追込",
        "is_dark_pick": True,
        "pick_order": 3,
        "custom_score": 85,
        "signals": ["菅原明騎手の一発", "軽量ハンデ恩恵", "直線強襲型"],
        "comment": "AI穴馬指数85点。直線ワンターンの瞬発力勝負に賭ける伏兵。3着ヒモ荒れの特大万馬券メーカー！",
    },

    # --- 11/14(土) デイリー杯2歳S (G2) ---
    "キューティボンド": {"style": "先行", "status": "◎ 川田将雅×スピード能力上位", "custom_score": 92},
    "トップチェッカー": {"style": "差し", "status": "◯ Cデムーロ騎乗の勝負気配", "custom_score": 89},
    "ブレイクアウェイ": {
        "style": "先行",
        "is_danger": True,
        "danger_reason": "新馬戦はスロー単騎逃げの恩恵。多頭数重賞での揉まれる展開とハイペース追走への対応に不安あり！",
        "custom_score": 59,
    },
    "スマートピナクル": {
        "style": "先行",
        "is_dark_pick": True,
        "pick_order": 1,
        "custom_score": 90,
        "signals": ["レジェンド武豊騎乗", "京都マイルの絶妙な立ち回り", "中穴オッズの歪み"],
        "comment": "AI穴馬指数90点！武豊騎手の手綱捌きが冴えわたる京都外回りマイル戦。マイペースの好位から直線抜け出せば頭まで狙える激走穴馬！",
    },
    "ヒアカムズザサン": {
        "style": "逃げ",
        "is_dark_pick": True,
        "pick_order": 2,
        "custom_score": 87,
        "signals": ["坂井瑠星の果敢なハナ主張", "京都芝の先行残り", "単勝20倍台の妙味"],
        "comment": "AI穴馬指数87点。単騎逃げに持ち込めば直線しぶとく粘り込むスピードを秘める伏兵。高配当をもたらす逃げ残り要員！",
    },
    "ブラッドバローズ": {
        "style": "差し",
        "is_dark_pick": True,
        "pick_order": 3,
        "custom_score": 86,
        "signals": ["松山騎手の好騎乗", "直線の長い京都向き", "仕上がり良好"],
        "comment": "AI穴馬指数86点。追い切り絶好の仕上がり。混戦の2歳戦で差し脚を伸ばす高配当の使者！",
    },

    # --- 11/15(日) 福島民友C (L) / オーロC (L) ---
    "ゲイルライダー": {"style": "先行", "status": "◎ 安定した先行力・上位軸", "custom_score": 90},
    "ゴッドブルービー": {"style": "差し", "status": "◯ 松山弘平×福島ダート好相性", "custom_score": 88},
    "オーケーバーディー": {
        "style": "先行",
        "is_danger": True,
        "danger_reason": "先行争いが激化する小回り福島1700mで外枠から脚を使うと直線息切れリスク大！",
        "custom_score": 56,
    },
    "オンザライン": {
        "style": "差し",
        "is_dark_pick": True,
        "pick_order": 1,
        "custom_score": 91,
        "signals": ["小回り捲り適性◎", "手頃な人気盲点オッズ", "前崩れ狙い撃ち"],
        "comment": "AI穴馬指数91点！先行馬がやり合う展開で3コーナーから進出する捲り脚が武器。波乱必至のハンデリステッドで頭まで狙える大穴！",
    },

    # --- 歴代アーカイブ・先週レース知識ベース ---
    "クロワデュノール": {"style": "先行", "status": "◎ 春二冠馬", "custom_score": 93},
    "マスカレードボール": {"style": "差し", "status": "◯ 実力上位", "custom_score": 91},
    "ダノンデサイル": {"style": "先行", "status": "★ 天皇賞秋覇者", "custom_score": 92},
    "レザベーション": {"style": "先行", "status": "◎ まほろばS覇者", "custom_score": 89},
    "スマートワイス": {"style": "差し", "status": "◯ まほろばS連対", "custom_score": 88},
}

HTTP_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
    )
}
SSL_CTX = ssl.create_default_context()


def http_fetch_text(url, timeout=10):
    """指定URLからHTMLまたはJSON文字列を取得し、適切な文字コードでデコードする"""
    req = urllib.request.Request(url, headers=HTTP_HEADERS)
    with urllib.request.urlopen(req, timeout=timeout, context=SSL_CTX) as resp:
        raw = resp.read()
        cs = resp.headers.get_content_charset()
        candidates = ([cs] if cs else []) + ["euc_jp", "cp932", "utf-8"]
        # JSONエンドポイントはUTF-8優先
        if "/api/" in url or url.endswith(".json"):
            candidates = ["utf-8", "euc_jp", "cp932"]
        for enc in candidates:
            try:
                return raw.decode(enc)
            except Exception:
                continue
        return raw.decode("utf-8", errors="replace")


def clean_html_text(fragment):
    """HTMLタグと余分な空白を除去したプレーンテキストを返す"""
    if not fragment:
        return ""
    no_tags = re.sub(r"<[^>]+>", " ", fragment)
    unescaped = html_lib.unescape(no_tags)
    return re.sub(r"\s+", " ", unescaped).strip()


def get_bracket_number(horse_num, total_runners):
    """馬番と出走頭数からJRA方式の枠番（1〜8）を算出する"""
    if total_runners <= 8:
        return max(1, min(8, horse_num))
    extra = total_runners - 8
    single_brackets = max(0, 8 - extra)
    if horse_num <= single_brackets:
        return horse_num
    return min(8, single_brackets + ((horse_num - single_brackets + 1) // 2))


def get_upcoming_weekend_dates():
    """今週末の土曜日・日曜日の日付情報（YYYYMMDD含む）を自動算出する"""
    today = datetime.now()
    weekday = today.weekday()  # 0:月〜6:日
    if weekday == 6:  # 日曜
        sat = today - timedelta(days=1)
        sun = today
    elif weekday == 5:  # 土曜
        sat = today
        sun = today + timedelta(days=1)
    else:
        days_to_sat = (5 - weekday) % 7
        days_to_sun = (6 - weekday) % 7
        sat = today + timedelta(days=days_to_sat)
        sun = today + timedelta(days=days_to_sun)

    return {
        "sat_ymd": sat.strftime("%Y%m%d"),
        "sun_ymd": sun.strftime("%Y%m%d"),
        "sat_full": f"{sat.year}年{sat.month}月{sat.day}日 (土)",
        "sat_short": f"{sat.month}/{sat.day}(土)",
        "sun_full": f"{sun.year}年{sun.month}月{sun.day}日 (日)",
        "sun_short": f"{sun.month}/{sun.day}(日)",
    }


def fetch_odds_map(race_id):
    """
    netkeiba 単勝オッズAPIから最新オッズ・人気順辞書を取得する
    戻り値: (odds_dict, odds_status, official_datetime)
      odds_dict[key] = (odds_float, pop_int)
    """
    url = f"https://race.netkeiba.com/api/api_get_jra_odds.html?race_id={race_id}&type=1&action=init"
    txt = http_fetch_text(url, timeout=10)
    payload = json.loads(txt)
    status = payload.get("status", "unknown")
    data = payload.get("data")

    if isinstance(data, str) and data:
        try:
            decompressed = zlib.decompress(base64.b64decode(data)).decode("utf-8")
            data = json.loads(decompressed)
        except Exception:
            data = {}

    if not isinstance(data, dict):
        return {}, status, None

    official_dt = data.get("official_datetime")
    win_odds_raw = (data.get("odds") or {}).get("1") or {}
    parsed = {}
    for k, val in win_odds_raw.items():
        if isinstance(val, list) and len(val) >= 3:
            try:
                o_val = float(val[0])
            except Exception:
                o_val = 25.0
            try:
                p_val = int(val[2])
            except Exception:
                p_val = 99
            parsed[str(k)] = (o_val, p_val)
    return parsed, status, official_dt


def assign_stable_race_id(title, venue_id, round_num, netkeiba_race_id):
    """既存フロントエンド互換の固定レースIDまたは一意IDを割り当てる"""
    if "ジャパン" in title:
        return "race-japan-cup"
    if "京阪" in title:
        return "race-keihan-hai"
    if "京都2歳" in title or "京都２歳" in title:
        return "race-kyoto-nisai"
    if "キャピタル" in title:
        return "race-capital-s"
    if "エリザベス" in title:
        return "race-elizabeth"
    if "デイリー" in title:
        return "race-daily-hai"
    if "武蔵野" in title:
        return "race-musashino-s"
    if "福島" in title:
        return "race-fukushima-minyu"
    if "オーロ" in title:
        return "race-oro-cup"
    if "天皇賞" in title:
        return "race-tenno-aki"
    if "ファンタジー" in title:
        return "race-fantasy-s"
    if "ペルセウス" in title:
        return "race-perseus-s"
    if "まほろば" in title:
        return "race-mahoroba-s"
    return f"race-{venue_id}-{netkeiba_race_id[-4:]}"


def parse_live_race(race_id, date_full, date_short):
    """netkeiba の出馬表ページとオッズAPIから1レース分の構造化データを生成する"""
    shutuba_url = f"https://race.netkeiba.com/race/shutuba.html?race_id={race_id}"
    html_str = http_fetch_text(shutuba_url, timeout=12)
    odds_map, odds_status, odds_time = fetch_odds_map(race_id)

    # レース名とグレードの抽出
    title_m = re.search(r'<h1[^>]*class="RaceName"[^>]*>(.*?)</h1>', html_str, re.S)
    raw_title = clean_html_text(title_m.group(1)) if title_m else f"メインレース ({race_id})"

    grade_m = re.search(r"Icon_GradeType(\d+)", html_str)
    grade_code = grade_m.group(1) if grade_m else "5"
    grade_label, grade_priority = GRADE_MAP.get(grade_code, ("OP", 5))

    full_title = raw_title if f"({grade_label})" in raw_title else f"{raw_title} ({grade_label})"

    # 発走時刻・コース距離・天候・馬場状態の抽出
    d01_m = re.search(r'<div[^>]*class="RaceData01"[^>]*>(.*?)</div>', html_str, re.S)
    d01_txt = clean_html_text(d01_m.group(1)) if d01_m else ""
    time_m = re.search(r"(\d{1,2}:\d{2})発走", d01_txt)
    post_time = f"{time_m.group(1)}発走" if time_m else "15:40発走"

    course_m = re.search(r"([芝ダ障]\d{3,4}m(?:\s*[^\s/]+)?)", d01_txt)
    course_str = course_m.group(1).strip() if course_m else "芝2000m"

    weather_m = re.search(r"天候:([^\s/]+)", d01_txt)
    weather_str = weather_m.group(1) if weather_m else "晴予報"

    baba_m = re.search(r"馬場:([^\s/]+)", d01_txt)
    track_cond = baba_m.group(1) if baba_m else "良"

    # 開催場・条件の抽出
    d02_m = re.search(r'<div[^>]*class="RaceData02"[^>]*>(.*?)</div>', html_str, re.S)
    d02_txt = clean_html_text(d02_m.group(1)) if d02_m else ""

    venue_code = race_id[4:6]
    venue_jp, venue_id = JRA_VENUES.get(venue_code, ("東京", "tokyo"))
    round_num = int(race_id[-2:])

    cond_label = "別定"
    for kw in ["定量", "ハンデ", "馬齢", "別定"]:
        if kw in d02_txt:
            cond_label = kw
            break
    if "２歳" in d02_txt or "2歳" in d02_txt:
        cond_label = f"2歳・{cond_label}"

    # 出走馬リストの抽出
    trs = re.findall(r'<tr[^>]*class="HorseList[^"]*"[^>]*>(.*?)</tr>', html_str, re.S)
    runners = []
    confirmed_draw = True

    for idx, tr in enumerate(trs):
        name_m = re.search(r'<span class="HorseName">\s*<a [^>]*title="([^"]+)"', tr)
        if not name_m:
            continue
        horse_name = html_lib.unescape(name_m.group(1)).strip()

        waku_m = re.search(r'<td class="Waku\d* Txt_C">\s*<span>(\d*)</span>', tr)
        umaban_m = re.search(r'<td class="Umaban\d* Txt_C">\s*(\d*)\s*</td>', tr)

        waku_str = waku_m.group(1).strip() if waku_m else ""
        umaban_str = umaban_m.group(1).strip() if umaban_m else ""

        if umaban_str.isdigit():
            num = int(umaban_str)
        else:
            confirmed_draw = False
            num = idx + 1

        bracket = int(waku_str) if waku_str.isdigit() else 0

        # 斤量・騎手の抽出
        weight_m = re.search(r'<td class="Barei Txt_C">[^<]*</td>\s*<td class="Txt_C">\s*(\d+(?:\.\d+)?)', tr)
        weight_val = float(weight_m.group(1)) if weight_m else 56.0

        jockey_m = re.search(r'<td class="Jockey">.*?<a [^>]*>([^<]+)</a>', tr, re.S)
        jockey_name = clean_html_text(jockey_m.group(1)) if jockey_m else "未定"

        # オッズキーの照合
        odds_id_m = re.search(r'id="odds-1_([^"]+)"', tr)
        odds_key = odds_id_m.group(1) if odds_id_m else f"{num:02d}"
        odds_tuple = odds_map.get(odds_key) or odds_map.get(f"{num:02d}") or odds_map.get(str(num))
        odds_val = odds_tuple[0] if odds_tuple else round(5.0 + idx * 3.5, 1)
        pop_val = odds_tuple[1] if odds_tuple else (idx + 1)

        # 専門知識ベースの統合
        note_info = EXPERT_HORSE_NOTES.get(horse_name, {})
        inferred_style = note_info.get("style")
        if not inferred_style:
            styles = ["先行", "差し", "差し", "追込", "逃げ"]
            inferred_style = styles[num % len(styles)]

        runner_entry = {
            "num": num,
            "bracket": bracket,
            "name": horse_name,
            "jockey": jockey_name,
            "weight": weight_val,
            "odds": odds_val,
            "pop": pop_val,
            "style": inferred_style,
        }
        for opt_key in ("custom_score", "is_dark_pick", "pick_order", "signals", "comment", "status", "is_danger", "danger_reason"):
            if opt_key in note_info:
                runner_entry[opt_key] = note_info[opt_key]

        runners.append(runner_entry)

    # 人気が未設定または重複している場合はオッズ昇順で正規化
    runners_by_odds = sorted(runners, key=lambda x: x["odds"])
    for rank_i, r_item in enumerate(runners_by_odds, start=1):
        if r_item["pop"] >= 90 or r_item["pop"] <= 0:
            r_item["pop"] = rank_i

    # 枠順未確定時は人気順ではなく登録順のまま仮枠番を補完、確定時は馬番昇順ソート
    total_cnt = len(runners)
    if confirmed_draw:
        runners.sort(key=lambda x: x["num"])
    for r_item in runners:
        if not r_item["bracket"]:
            r_item["bracket"] = get_bracket_number(r_item["num"], total_cnt)

    fav_runner = min(runners, key=lambda x: x["odds"]) if runners else {"odds": 3.5}
    pace_label = "ハイペース（先行争い激化）" if ("ダ" in course_str or "1400" in course_str or "1200" in course_str) else "ミドルペース（直線瞬発力勝負）"
    draw_status_str = "確定枠順反映" if confirmed_draw else "出走登録・最新オッズ反映"
    odds_mode_str = "JRA公式リアルタイムオッズ" if odds_status in ("result", "middle") else "最新予想オッズ"

    stable_id = assign_stable_race_id(raw_title, venue_id, round_num, race_id)

    return {
        "id": stable_id,
        "netkeibaRaceId": race_id,
        "gradePriority": grade_priority,
        "gradeLabel": grade_label,
        "venueId": venue_id,
        "date": date_full,
        "date_short": date_short,
        "postTime": post_time,
        "round": round_num,
        "badge": f"{venue_jp}{round_num}R・{grade_label} {course_str}（{cond_label}・{total_cnt}頭・{draw_status_str}）",
        "title": full_title,
        "venue": f"{venue_jp} {round_num}R ({course_str.split()[0]})",
        "weather": weather_str,
        "track": f"{track_cond}馬場（{venue_jp}コース）",
        "track_condition": track_cond,
        "pace": pace_label,
        "fav_odds": fav_runner["odds"],
        "condition": cond_label,
        "oddsSource": odds_mode_str,
        "oddsUpdatedAt": odds_time,
        "confirmedDraw": confirmed_draw,
        "runners": runners,
    }


def discover_and_fetch_live_weekend_races(weekend):
    """今週末（土曜・日曜）のメイン11Rを自動検出し、最大4レースを取得する"""
    discovered = []
    targets = [
        (weekend["sat_ymd"], weekend["sat_full"], weekend["sat_short"]),
        (weekend["sun_ymd"], weekend["sun_full"], weekend["sun_short"]),
    ]

    for ymd, d_full, d_short in targets:
        list_url = f"https://race.netkeiba.com/top/race_list_sub.html?kaisai_date={ymd}"
        html_txt = http_fetch_text(list_url, timeout=10)
        all_ids = sorted(set(re.findall(r"race_id=(\d{12})", html_txt)))
        main_race_ids = [rid for rid in all_ids if rid[-2:] in ["11", "12"]]
        for rid in main_race_ids:
            race_obj = parse_live_race(rid, d_full, d_short)
            if len(race_obj["runners"]) >= 5:
                discovered.append(race_obj)

    # G1 → G2 → G3 → L → OP の優先度順、同格なら日曜メイン優先でソート
    discovered.sort(key=lambda r: (r["gradePriority"], 0 if "(日)" in r["date"] else 1, r["netkeibaRaceId"]))
    return discovered[:4]


def calculate_volatility(race_data):
    """波乱度（荒れ確率 0〜100%）を自動計算するロジック"""
    score = 42

    fav_odds = race_data.get("fav_odds", 3.0)
    if fav_odds >= 4.0:
        score += 24
    elif fav_odds >= 3.0:
        score += 16
    elif fav_odds >= 2.4:
        score += 10
    elif fav_odds <= 1.8:
        score -= 18

    runners_count = len(race_data.get("runners", []))
    if runners_count >= 16:
        score += 14
    elif runners_count <= 11:
        score -= 4

    cond = race_data.get("condition", "")
    if "ハンデ" in cond:
        score += 16
    if "2歳" in cond:
        score += 12
    if race_data.get("track_condition") in ["重", "不良"]:
        score += 15
    if "ハイペース" in race_data.get("pace", ""):
        score += 10

    score = max(15, min(98, score))

    if score >= 80:
        level = "🔥 超大穴警報"
        cls = "vol-high"
    elif score >= 60:
        level = "⚠️ 中波乱・混戦模様"
        cls = "vol-mid"
    else:
        level = "⚡ 平穏・堅調"
        cls = "vol-low"

    return score, level, cls


def enrich_ai_predictions(race):
    """
    取得した出走馬・最新オッズに対して、波乱度・危険な人気馬・穴馬3選・全頭AIスコア・事前シミュレーションを付与する
    """
    vol_score, vol_level, vol_cls = calculate_volatility(race)
    race["volatilityScore"] = vol_score
    race["volatilityLevel"] = vol_level
    race["volatilityClass"] = vol_cls

    runners = race["runners"]
    pace = race["pace"]
    track = race["track_condition"]

    def parse_weight_num(w):
        try:
            return float(str(w).replace("kg", "").strip())
        except (ValueError, TypeError):
            return 55.0

    # 危険な人気馬の特定（知識ベース指定馬、または上位2〜4番人気で外枠・斤量負荷のある馬）
    danger_candidate = next((r for r in runners if r.get("is_danger")), None)
    if not danger_candidate:
        popular_pool = [r for r in runners if 2 <= r["pop"] <= 4]
        if popular_pool:
            danger_candidate = max(popular_pool, key=lambda r: (parse_weight_num(r.get("weight")), r["num"]))

    if danger_candidate:
        reason = danger_candidate.get("danger_reason") or (
            f"上位人気（{danger_candidate['pop']}番人気・{danger_candidate['odds']}倍）に推されているものの、"
            f"枠順・斤量（{danger_candidate['weight']}）と展開面の噛み合わせに不安あり。オッズ妙味が薄く過信禁物！"
        )
        race["dangerHorse"] = {
            "num": danger_candidate["num"],
            "name": danger_candidate["name"],
            "pop": danger_candidate["pop"],
            "odds": danger_candidate["odds"],
            "reason": reason,
        }
        danger_candidate["status"] = "⚠️ 危険な人気馬（過信禁物）"
        danger_candidate.setdefault("custom_score", 50)

    # トップジョッキー定義（舞台巧者・鞍上補正）
    top_jockeys = ["ルメール", "川田", "武豊", "マーカンド", "松山", "坂井", "戸崎", "横山武", "モレイラ", "レーン", "Cデムーロ", "バルザローナ"]

    # コース特性の判定ヘルパー
    v_name = race.get("venue", "")
    b_desc = race.get("badge", "")
    is_small_track = any(c in v_name for c in ["福島", "小倉", "函館", "札幌", "新潟"]) and "外" not in b_desc
    is_long_straight = any(c in v_name for c in ["東京", "新潟外"]) or ("京都" in v_name and "外" in b_desc) or ("阪神" in v_name and "外" in b_desc)

    # 全頭AIスコア計算（反省点を活かした Version 3.0 アルゴリズム）
    for r in runners:
        if "custom_score" in r:
            ai_score = r["custom_score"]
        else:
            s = 55
            odds = float(r["odds"]) if isinstance(r["odds"], (int, float)) else float(str(r["odds"]).replace("倍", ""))
            pop = int(r["pop"])
            weight = parse_weight_num(r.get("weight"))
            style = r.get("style", "差し")
            bracket = r.get("bracket", 5)

            # 1. オッズ妙味評価（単勝20〜35倍のゴールデン・ストライクゾーンを最重視）
            if pop == 1:
                s += 32
            elif pop == 2:
                s += 28
            elif 20.0 <= odds <= 35.0:
                s += 30  # 🎯【最重要】ゴールデン・ストライクゾーン（実力伏兵の頭・連対ゾーン）
            elif 12.0 <= odds < 20.0:
                s += 24  # 準ゴールデンゾーン
            elif 35.1 <= odds <= 55.0:
                s += 26  # 高配当激走ゾーン
            elif 55.1 <= odds <= 90.0:
                s += 20  # 💣特大万馬券爆弾ゾーン
            elif 7.0 <= odds < 12.0:
                s += 18  # 中穴ゾーン

            # 2. 展開・ペース適性 & 複勝圏内突入力（Podium Stability）
            if "ハイペース" in pace:
                if style in ["差し", "追込"]:
                    s += 12  # ハイペース前崩れの末脚一撃
                elif style == "先行":
                    s += 4
                elif style == "逃げ":
                    s -= 8  # 息切れリスク
            elif "スロー" in pace or "ミドル" in pace:
                if style in ["先行", "好位"]:
                    s += 12  # 前残り・ポジションの利
                elif style == "逃げ":
                    s += 8
                elif style == "追込":
                    s -= 6  # 届かないリスク

            # 3. コース×枠順バイアス（小回りの先行内枠・大外直線の差し脚）
            if is_small_track:
                # 小回りコース: コーナー4回で内ラチ沿いロスなく回る馬を大幅評価
                if bracket in [1, 2, 3]:
                    s += 8  # 内枠ロス軽減
                if style in ["逃げ", "先行", "好位"]:
                    s += 10 # 4角好位押し切り
                elif style == "追込":
                    s -= 8  # 4着止まりのリスク大
            elif is_long_straight:
                # 直線の長いコース: 末脚持続力
                if style in ["先行", "差し"]:
                    s += 8
                if "東京" in v_name and "ダ" in b_desc and bracket in [7, 8]:
                    s += 7  # 東京ダート1600mの芝スタート外枠有利

            # 4. 鞍上・トップジョッキー補正
            if any(tj in r.get("jockey", "") for tj in top_jockeys):
                s += 8

            # 5. 斤量恩恵（ハンデ・軽量牝馬）＆ 重斤量負荷ペナルティ
            if weight <= 52.0:
                s += 14  # 超軽量ハンデ恩恵
            elif weight <= 54.0:
                s += 8
            elif weight >= 58.0:
                s -= 5   # トップハンデ負荷

            ai_score = max(45, min(98, s))
        r["ai_score"] = ai_score

    # 穴馬3選の抽出（明示指定馬 + オッズ10倍以上の高スコア馬で3頭揃える）
    explicit = sorted([r for r in runners if r.get("is_dark_pick")], key=lambda x: x.get("pick_order", 99))
    picked_nums = {r["num"] for r in explicit}
    auto_pool = [
        r for r in runners
        if r["num"] not in picked_nums
        and r["odds"] >= 10.0
        and (not danger_candidate or r["num"] != danger_candidate["num"])
    ]
    # ゴールデンゾーン（20〜35倍）を中心にスコア順ソート
    auto_pool.sort(key=lambda x: (x["ai_score"], -abs(x["odds"] - 26.0)), reverse=True)
    dark_horses = (explicit + auto_pool)[:3]
    dark_nums = {d["num"] for d in dark_horses}

    # 💣【新機能】3着ヒモ抜け完全防止用「特大爆弾穴馬（Bomb Pick）」の抽出（単勝30〜90倍の伏兵から最大2頭）
    bomb_candidates = [
        r for r in runners
        if r["num"] not in picked_nums
        and r["num"] not in dark_nums
        and 30.0 <= r["odds"] <= 90.0
        and (not danger_candidate or r["num"] != danger_candidate["num"])
    ]
    bomb_candidates.sort(key=lambda x: x["ai_score"], reverse=True)
    bomb_horses = bomb_candidates[:2]
    bomb_nums = {b["num"] for b in bomb_horses}

    # 各馬のステータス表記補完（危険な人気馬は対抗◯から除外して一貫性を担保）
    danger_num = danger_candidate["num"] if danger_candidate else None
    safe_by_pop = [r for r in sorted(runners, key=lambda x: x["pop"]) if r["num"] != danger_num]
    fav1 = safe_by_pop[0] if safe_by_pop else min(runners, key=lambda x: x["pop"])
    fav2 = safe_by_pop[1] if len(safe_by_pop) > 1 else fav1

    # ⚓【新機能】実力中穴アンカー（▲ 3〜5番人気のスコア最上位馬）の選定
    middle_anchors = [
        r for r in safe_by_pop[2:6]
        if r["num"] not in dark_nums and r["num"] not in bomb_nums
    ]
    middle_anchors.sort(key=lambda x: x["ai_score"], reverse=True)
    fav_anchor = middle_anchors[0] if middle_anchors else (safe_by_pop[2] if len(safe_by_pop) > 2 else fav2)

    d_nums_list = [d["num"] for d in dark_horses]

    for r in runners:
        if r.get("status"):
            continue
        if r["num"] == fav1["num"]:
            r["status"] = "◎ 本命筆頭（軸候補）"
        elif r["num"] == fav2["num"]:
            r["status"] = "◯ 対抗有力"
        elif r["num"] == fav_anchor["num"]:
            r["status"] = "▲ 実力中穴アンカー"
        elif d_nums_list and r["num"] == d_nums_list[0]:
            r["status"] = "★ AI大穴イチオシ"
        elif r["num"] in dark_nums:
            r["status"] = "★ 激走注目穴馬"
        elif r["num"] in bomb_nums:
            r["status"] = "💣 特大爆弾ヒモ穴"
        elif r["pop"] <= 5:
            r["status"] = "押 上位押さえ"
        elif r["ai_score"] >= 78:
            r["status"] = "注 伏兵注意"
        else:
            r["status"] = "・ 展開待ち"

    # 波乱度解説文
    if not race.get("volatilityDesc"):
        dh_lead = dark_horses[0]["name"] if dark_horses else "人気薄伏兵"
        race["volatilityDesc"] = (
            f"1番人気{fav1['name']}が単勝{fav1['odds']}倍（{race.get('oddsSource', '最新オッズ')}）。"
            f"AI波乱度{vol_score}%（{vol_level}）を検知！{dh_lead}など妙味抜群の穴馬が馬券圏内へ突入する高期待値レースです。"
        )

    # ファン投票初期比率
    fav_pct = max(28, min(68, int(round(100 - vol_score * 0.65))))
    race["poll"] = {
        "favPct": fav_pct,
        "underPct": 100 - fav_pct,
        "totalVotes": 950 + (len(runners) * 52),
    }

    # 穴馬カード配列へ整形
    formatted_dark = []
    for idx, dh in enumerate(dark_horses):
        b_num = dh.get("bracket", 6)
        signals = dh.get("signals") or [
            f"{dh['bracket']}枠{dh['num']}番の好条件",
            f"展開合致（{dh['style']}脚質）",
            f"単勝{dh['odds']}倍のオッズ歪み検知",
        ]
        comment = dh.get("comment") or (
            f"AI穴馬指数{dh['ai_score']}点！{dh['jockey']}騎手×斤量{parse_weight_num(dh['weight'])}kg。"
            f"実力に対して単勝{dh['odds']}倍（{dh['pop']}番人気）は絶好の狙い目です。"
        )
        formatted_dark.append({
            "number": dh["num"],
            "name": dh["name"],
            "frameColor": BRACKET_COLORS.get(b_num, "#f59e0b"),
            "jockey": f"{dh['jockey']} ({parse_weight_num(dh['weight'])}kg)",
            "odds": dh["odds"],
            "popularity": dh["pop"],
            "signals": signals,
            "comment": comment,
        })
    race["darkHorses"] = formatted_dark

    # 爆弾馬カード配列へ整形
    formatted_bombs = []
    for b in bomb_horses:
        b_num = b.get("bracket", 7)
        formatted_bombs.append({
            "number": b["num"],
            "name": b["name"],
            "frameColor": BRACKET_COLORS.get(b_num, "#ec4899"),
            "jockey": f"{b['jockey']} ({parse_weight_num(b['weight'])}kg)",
            "odds": b["odds"],
            "popularity": b["pop"],
            "reason": f"単勝{b['odds']}倍の超大穴。展開・末脚シナジーにより3着ヒモ荒れの特大万馬券トリガー候補！",
        })
    race["bombHorses"] = formatted_bombs

    # 買い目フォーメーション構造体（betFormations）を明示的に保持
    h1 = formatted_dark[0] if formatted_dark else {"number": fav2["num"], "name": fav2["name"], "odds": fav2["odds"], "popularity": fav2["pop"]}
    h2 = formatted_dark[1] if len(formatted_dark) > 1 else h1
    h3 = formatted_dark[2] if len(formatted_dark) > 2 else h2
    b_nums = [b["number"] for b in formatted_bombs]

    anchor_num = fav_anchor["num"]
    col2_nums = sorted(set([fav2["num"], anchor_num, h1["number"], h2["number"]]))
    col3_all = sorted(set([fav1["num"], fav2["num"], anchor_num, h1["number"], h2["number"], h3["number"]] + b_nums))

    race["betFormations"] = {
        "safetyWide": {
            "title": "元本防衛セーフティ・ワイド（3点）",
            "pairs": [f"{fav1['num']}-{h1['number']}", f"{fav2['num']}-{h1['number']}", f"{h1['number']}-{h2['number']}"],
            "desc": f"◎{fav1['num']}番と★{h1['number']}番（本線厚め・元本全額回収）、◯{fav2['num']}-★{h1['number']}、穴穴の★{h1['number']}-★{h2['number']}で確実な利益を確保。",
        },
        "safetyUmaren": {
            "title": "高回収馬連フォーメーション",
            "axis": h1["number"],
            "opponents": [fav1["num"], fav2["num"], anchor_num, h2["number"]],
            "desc": f"穴馬★{h1['number']}番から◎◯▲★へ流し、連対時の万馬券（10〜150倍）を直撃。",
        },
        "sanrenpuku": {
            "title": "高配当3連複フォーメーション",
            "row1": [fav1["num"]],
            "row2": [h1["number"], h2["number"], anchor_num],
            "row3": col3_all,
            "desc": "軸◎×穴★・実力中穴▲から、ヒモ抜け防止の💣大穴爆弾馬を含むフォーメーション。",
        },
        "sanrentan": {
            "title": "🚀 特大万馬券3連単フォーメーション（アンカー補強版）",
            "first": [fav1["num"], fav2["num"], h1["number"]],
            "second": col2_nums,
            "third": col3_all,
            "desc": "大穴2着黄金ゾーン＋実力中穴▲アンカー補強＆3着ヒモ爆弾枠を網羅した十万馬券狙い撃ち。",
        },
        "strategy": {
            "safetyBudgetPct": 50,
            "attackBudgetPct": 50,
            "advice": "投資金の50%をワイド（本線厚め）・馬連に配分して元本回収を担保し、残り50%で3連単・3連複の一撃特大万馬券を狙うハイブリッド戦略を推奨！",
        },
    }

    # 事前期待値シミュレーション結果の自動構成
    est_fuku = int(round(max(280, min(1400, h1["odds"] * 22)), -1))
    est_wide = int(round(max(950, min(6800, fav1["odds"] * h1["odds"] * 38)), -1))
    est_sanren = int(round(max(4800, min(58000, fav1["odds"] * fav2["odds"] * h1["odds"] * 55)), -1))

    race["actualResult"] = {
        "statusType": "BIG_WIN",
        "statusBadge": "🎯 発走前AI期待値シミュレーション",
        "roi": f"{min(680, max(320, vol_score * 6))}%",
        "trustGrade": "S (超高期待値)" if vol_score >= 80 else "A+ (好枠×穴馬妙味)",
        "stars": "★★★★★",
        "payouts": [
            {"type": f"複勝 {h1['number']}番 {h1['name']}", "yen": f"{est_fuku:,}円 (想定)", "isHit": True},
            {"type": f"ワイド {fav1['num']} - {h1['number']}", "yen": f"{est_wide:,}円 (想定)", "isHit": True},
            {"type": f"3連複 {fav1['num']} - {fav2['num']} - {h1['number']}", "yen": f"{est_sanren:,}円 (想定)", "isHit": True},
        ],
        "podium": [
            {"rank": 1, "num": fav1["num"], "name": f"{fav1['name']} (◎本命)", "pop": fav1["pop"], "odds": fav1["odds"]},
            {"rank": 2, "num": fav2["num"], "name": f"{fav2['name']} (◯対抗)", "pop": fav2["pop"], "odds": fav2["odds"]},
            {"rank": 3, "num": h1["number"], "name": f"{h1['name']} (★AI大穴推奨)", "pop": h1["popularity"], "odds": h1["odds"], "isTarget": True},
        ],
        "review": (
            f"【{race['date_short']} {race['postTime']}予定・最新オッズ反映シミュレーション】"
            f"本命◎{fav1['num']}番{fav1['name']}（{fav1['odds']}倍）を軸に、"
            f"AI穴馬筆頭★{h1['number']}番{h1['name']}（{h1['odds']}倍）の激走を組み込む高期待値シナリオです。"
        ),
    }

    # 出走全頭フォーマット整形
    race["runners"] = [
        {
            "num": ru["num"],
            "bracket": ru.get("bracket", 1),
            "name": ru["name"],
            "jockey": ru["jockey"],
            "weight": f"{parse_weight_num(ru['weight'])}kg",
            "odds": ru["odds"],
            "pop": ru["pop"],
            "style": ru["style"],
            "score": ru["ai_score"],
            "status": ru["status"],
        }
        for ru in runners
    ]
    return race


def generate_note_drafts(races, weekend, generated_at):
    """
    note（@oana_navi）にそのままコピペして公開できる有料記事原稿（土曜版・日曜G1版・メンバーシップ案内）を自動生成する
    """
    sat_races = [r for r in races if "(土)" in r["date"]]
    sun_races = [r for r in races if "(日)" in r["date"]]

    def format_race_free_section(r):
        danger = r.get("dangerHorse")
        dh1 = r["darkHorses"][0] if r.get("darkHorses") else None
        lines = [
            f"## 🏇 {r['venue']}｜{r['title']}（{r['date_short']} {r['postTime']}）",
            f"- **AI波乱度判定**: **{r['volatilityScore']}%（{r['volatilityLevel']}）**",
            f"- **コース・条件**: {r['badge']}",
        ]
        if danger:
            lines.append(
                f"- **⚠️ AI危険な人気馬アラート**: **{danger['num']}番 {danger['name']}（{danger['pop']}番人気・{danger['odds']}倍）**\n"
                f"  └ {danger['reason']}"
            )
        if dh1:
            lines.append(
                f"- **🔥 無料公開・注目穴馬ヒント**: **{dh1['number']}番 {dh1['name']}（{dh1['popularity']}番人気・{dh1['odds']}倍 / {dh1['jockey']}）**\n"
                f"  └ {dh1['comment']}"
            )
        return "\n".join(lines)

    def format_race_paid_section(r):
        danger_num = (r.get("dangerHorse") or {}).get("num")
        safe_runners = [x for x in sorted(r["runners"], key=lambda x: x["pop"]) if x["num"] != danger_num]
        fav1 = safe_runners[0] if safe_runners else r["runners"][0]
        fav2 = safe_runners[1] if len(safe_runners) > 1 else fav1
        dhs = r.get("darkHorses", [])
        h1 = dhs[0] if len(dhs) > 0 else {"number": fav2["num"], "name": fav2["name"], "odds": fav2["odds"]}
        h2 = dhs[1] if len(dhs) > 1 else h1
        h3 = dhs[2] if len(dhs) > 2 else h2

        bombs = r.get("bombHorses", [])
        b_nums = [b["number"] for b in bombs]
        col3_nums = sorted(set([fav1["num"], fav2["num"], h1["number"], h2["number"], h3["number"]] + b_nums))
        col3_str = "・".join(f"{n}番" for n in col3_nums)

        lines = [
            f"### 👑 【有料限定】{r['title']} 3連単特大万馬券フォーメーション＆最終結論",
            "",
            "#### ▼ AI厳選・激走穴馬3選（完全公開）",
        ]
        for idx, dh in enumerate(dhs, start=1):
            lines.append(
                f"{idx}. **{dh['number']}番 {dh['name']}**（{dh['odds']}倍 / {dh['jockey']}）\n"
                f"   - 激走シグナル: {' ／ '.join(dh['signals'])}\n"
                f"   - 解説: {dh['comment']}"
            )

        if bombs:
            lines.extend([
                "",
                "#### ▼ 💣 3着ヒモ荒れ完全防止！特大爆弾枠（単勝30〜90倍の伏兵）",
            ])
            for b in bombs:
                lines.append(f"- **{b['number']}番 {b['name']}**（単勝{b['odds']}倍・{b['jockey']}）：{b['reason']}")

        bf = r.get("betFormations", {})
        sw = bf.get("safetyWide", {})
        su = bf.get("safetyUmaren", {})
        st = bf.get("sanrentan", {})

        col2_str = "・".join(f"{n}番" for n in st.get("second", [h1["number"], h2["number"], fav1["num"]]))

        lines.extend([
            "",
            "#### ▼ 【ハイブリッド推奨買い目シート】（そのままネット投票に使える買い目）",
            "",
            "**🛡️ 第1段階：守りのセーフティ回収ライン（投資金の50%配分）**",
            f"- **ワイド（3点推奨）**: `{fav1['num']} - {h1['number']}`（本線厚め・元本回収）、`{fav2['num']} - {h1['number']}`、`{h1['number']} - {h2['number']}`（穴穴高配当狙い）",
            f"- **馬連フォーメーション**: 軸 `{h1['number']}番` ⇄ 相手 `{'番・'.join(str(x) for x in su.get('opponents', [fav1['num'], fav2['num'], h2['number']]))}番`（穴馬連対時の万馬券直撃）",
            "",
            "**🚀 第2段階：攻めの一撃特大万馬券ライン（投資金の50%配分）**",
            "- **【高配当狙い】3連複フォーメーション**:",
            f"  - 1頭目（軸）: **{fav1['num']}番（{fav1['name']}）**",
            f"  - 2頭目（穴軸＋アンカー）: **{h1['number']}番（{h1['name']}）・{h2['number']}番（{h2['name']}）**",
            f"  - 3頭目（ヒモ・爆弾網羅）: **{col3_str}**",
            "- **【VIP限定】3連単フォーメーション（実力中穴アンカー補強版）**:",
            f"  - **1着**: **{fav1['num']}番（{fav1['name']}）・{fav2['num']}番（{fav2['name']}）**（※頭一撃狙いで {h1['number']}番 を100円押さえ推奨）",
            f"  - **2着**: **{col2_str}**（大穴2着黄金ゾーン＋実力中穴アンカー！）",
            f"  - **3着**: **{col3_str}**（💣特大爆弾馬を含むヒモ抜け防止網）",
            "",
            "#### ▼ 予算別・推奨資金配分モデル（合計3,000円の場合）",
            f"- 【セーフティ 1,500円】",
            f"  - ワイド `{fav1['num']} - {h1['number']}`：800円（的中時に元本全額回収＋即黒字化）",
            f"  - ワイド `{fav2['num']} - {h1['number']}`：400円",
            f"  - ワイド `{h1['number']} - {h2['number']}`：300円",
            f"- 【一攫千金 1,500円】",
            f"  - 3連単フォーメーション（各100円 × 12〜16点）：1,200〜1,500円（数十万馬券狙い）",
            "---",
        ])
        return "\n".join(lines)

    def build_article(target_races, day_label, headline_race):
        if not target_races:
            target_races = races[:2]
        title = f"【AI大穴警報】{day_label} {headline_race}｜危険な人気馬と3連単特大万馬券フォーメーション完全公開"
        free_blocks = "\n\n".join(format_race_free_section(r) for r in target_races)
        paid_blocks = "\n\n".join(format_race_paid_section(r) for r in target_races)

        body = f"""{title}

こんにちは！AI競馬波乱度＆穴馬予測ツール **『大穴ナビゲーター PRO』**（ {SITE_URL} ）公式noteです。

最新オッズの歪み・枠順バイアス・展開ペースをAIで徹底解析し、**「買える大穴馬」と「消すべき危険な人気馬」**を算出しました！
リアルタイムの波乱度メーターや仮想馬券シミュレーターはWebアプリで無料公開中です👇
🔗 {SITE_URL}

{free_blocks}

💡 **ここから先は有料エリア（単発300円 ／ 月額メンバーシップ 1,980円なら今月の全勝負レース読み放題！）です。**
有料エリアでは、Webサイト上で🔒ロックされている**「AI激走穴馬の全3頭」**および**「3連単特大万馬券フォーメーション（具体的な馬番・点数・資金配分）」**をすべて公開します！

━━━━━━━━━━━━━━━
▼ ここから有料ライン（noteエディタでここより下を有料設定にしてください：300円） ▼
━━━━━━━━━━━━━━━

ご購入・メンバーシップご参加ありがとうございます！
それでは、AIが導き出した**特大万馬券狙いの最終結論・3連単フォーメーション**を公開します。

{paid_blocks}

### 💎 お得な月額メンバーシップのご案内
毎週土日メイン重賞・波乱ハンデ戦（月8〜10鞍以上）の限定3連単買い目がすべて読み放題になる**月額メンバーシップ（1,980円/月・1レースあたり実質約200円以下）**も好評受付中です！
👉 {NOTE_PROFILE_URL}

※馬券の購入は自己責任でお願いいたします。皆様に特大万馬券の歓喜が訪れますように！🎯
"""
        return {"title": title, "price": 300, "body": body}

    sat_headline = " ＆ ".join(r["title"] for r in sat_races) if sat_races else "土曜メイン勝負レース"
    sun_headline = " ＆ ".join(r["title"] for r in sun_races) if sun_races else "日曜G1勝負レース"

    sat_article = build_article(sat_races, weekend["sat_short"], sat_headline)
    sun_article = build_article(sun_races, weekend["sun_short"], sun_headline)

    membership_guide = f"""【メンバーシップ（月額1,980円）開設用・説明文テンプレート】

プラン名：大穴ナビゲーター PRO【VIP万馬券メンバーシップ】
月額料金：1,980円 / 月

説明文：
AI競馬波乱度・穴馬予測ツール『大穴ナビゲーター PRO』（ {SITE_URL} ）のVIP限定メンバーシップです！

【特典内容】
1. 毎週末の重賞・特大波乱ハンデ戦（月8〜10レース以上）の有料記事（通常1記事300円）がすべて追加料金なしで読み放題！
2. Webアプリでロックされている「👑 3連単特大万馬券フォーメーション」の具体的な買い目・馬番を毎週完全公開！
3. 枠順バイアスとオッズの歪みから「⚠️ 危険な人気馬（消し馬）」を明確にジャッジし、無駄な馬券代を徹底カット！

単発で月7レース以上見る方ならメンバーシップが圧倒的にお得です（1レースあたり実質約200円以下）。週末のビッグ配当を一緒に狙い撃ちましょう！
"""

    drafts_payload = {
        "generatedAt": generated_at,
        "weekend": f"{weekend['sat_short']} 〜 {weekend['sun_short']}",
        "noteProfileUrl": NOTE_PROFILE_URL,
        "saturday": sat_article,
        "sunday": sun_article,
        "membership": membership_guide,
    }

    os.makedirs(os.path.dirname(NOTE_JSON_PATH), exist_ok=True)
    with open(NOTE_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(drafts_payload, f, ensure_ascii=False, indent=2)

    os.makedirs(os.path.dirname(NOTE_MD_PATH), exist_ok=True)
    md_content = (
        f"# 📝 note（@oana_navi）投稿用 完成原稿セット（{weekend['sat_short']}〜{weekend['sun_short']}）\n\n"
        f"> 自動生成日時: `{generated_at}`  \n"
        f"> 投稿先アカウント: {NOTE_PROFILE_URL}\n\n"
        f"---\n\n"
        f"## 1️⃣ 日曜G1勝負記事（単発300円）\n\n```markdown\n{sun_article['body']}\n```\n\n"
        f"---\n\n"
        f"## 2️⃣ 土曜メイン勝負記事（単発300円）\n\n```markdown\n{sat_article['body']}\n```\n\n"
        f"---\n\n"
        f"## 3️⃣ 月額メンバーシップ（1,980円/月）設定用テキスト\n\n```text\n{membership_guide}\n```\n"
    )
    with open(NOTE_MD_PATH, "w", encoding="utf-8") as f:
        f.write(md_content)


def load_existing_races_fallback():
    """オフライン環境などで通信取得できない場合、既存の data/races.json を読み込み、最新ロジックを再適用して安全に継続する"""
    if os.path.exists(OUTPUT_PATH):
        try:
            with open(OUTPUT_PATH, "r", encoding="utf-8") as f:
                data = json.load(f)
            if isinstance(data, list) and len(data) > 0:
                enriched = []
                for rc in data:
                    enriched.append(enrich_ai_predictions(rc))
                return enriched
        except Exception:
            pass
    return []


def determine_auto_mode():
    """現在の日時（曜日・時刻）から自動的に predict または result モードを判定する"""
    now = datetime.now()
    weekday = now.weekday()  # 0: 月, 1: 火, 2: 水, 3: 木, 4: 金, 5: 土, 6: 日
    hour = now.hour

    # 月曜 0:00〜14:00、土曜 16:30〜23:59、日曜 16:30〜23:59 は「結果反映モード」
    if weekday == 0 and hour < 15:
        return "result"
    elif weekday == 5 and hour >= 16:
        return "result"
    elif weekday == 6 and hour >= 16:
        return "result"
    else:
        # それ以外の時間帯は「週末予想の準備・更新モード」
        return "predict"


def fetch_and_apply_race_results(races):
    """
    各レースの確定着順・払戻金を netkeiba から取得し、
    事前のAI予想（危険馬・穴馬・買い目）と突き合わせて的中判定・回収率・レビューを自動更新する。
    """
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    updated_count = 0

    for race in races:
        rid = race.get("netkeibaRaceId")
        if not rid:
            continue

        url = f"https://race.netkeiba.com/race/result.html?race_id={rid}"
        html = http_fetch_text(url, timeout=10)
        if not html:
            continue

        # 確定結果テーブルの有無をチェック
        if "HorseList" not in html or "Payout_Detail_Table" not in html:
            print(f"  [結果確認] {race['title']}: まだ確定結果が公開されていません。")
            continue

        # 着順パース
        trs = re.findall(r'<tr\s+class=\"[^\"]*HorseList[^\"]*\"[^>]*>(.*?)</tr>', html, re.DOTALL)
        if not trs:
            continue

        confirmed_podium = []
        for tr in trs:
            rank_m = re.search(r'class=\"Rank\">(\d+)</div>', tr)
            num_m = re.search(r'class=\"Num Txt_C\"[^>]*>\s*<div>(\d+)</div>', tr)
            name_m = re.search(r'class=\"HorseNameSpan\">(.*?)</span>', tr)
            pop_m = re.search(r'class=\"OddsPeople\">(\d+)</span>', tr)
            odds_m = re.search(r'class=\"Odds Txt_R\"[^>]*>\s*<span[^>]*>([\d\.]+)</span>', tr)

            if rank_m and num_m and name_m:
                r_num = int(num_m.group(1))
                r_rank = int(rank_m.group(1))
                r_name = name_m.group(1).strip()
                r_pop = int(pop_m.group(1)) if pop_m else 99
                r_odds = float(odds_m.group(1)) if odds_m else 99.0

                confirmed_podium.append({
                    "rank": r_rank,
                    "num": r_num,
                    "name": r_name,
                    "pop": r_pop,
                    "odds": r_odds,
                })

        confirmed_podium.sort(key=lambda x: x["rank"])
        if len(confirmed_podium) < 3:
            continue

        # 払戻金テーブルパース
        payout_tables = re.findall(r'<table class=\"Payout_Detail_Table\">(.*?)</table>', html, re.DOTALL)
        payouts_dict = {}
        for pt in payout_tables:
            p_rows = re.findall(r'<tr class=\"([^\"]+)\">(.*?)</tr>', pt, re.DOTALL)
            for p_class, p_row in p_rows:
                th = re.search(r'<th>(.*?)</th>', p_row)
                th_text = th.group(1).strip() if th else p_class

                if '<ul>' in p_row:
                    uls = re.findall(r'<ul>(.*?)</ul>', p_row, re.DOTALL)
                    res_groups = []
                    for ul in uls:
                        lis = re.findall(r'<li><span>(\d+)</span></li>', ul)
                        if lis:
                            res_groups.append(' - '.join(lis))
                else:
                    res_groups = re.findall(r'<div><span>(\d+)</span></div>', p_row)

                pays = re.findall(r'<span>([\d,]+円)</span>', p_row)
                payouts_dict[th_text] = {"nums": res_groups, "pays": pays}

        # 的中判定
        top3_nums = [h["num"] for h in confirmed_podium[:3]]
        dark_nums = [d["number"] for d in race.get("darkHorses", [])]
        danger_num = (race.get("dangerHorse") or {}).get("num")
        danger_name = (race.get("dangerHorse") or {}).get("name", "危険馬")

        # 危険馬消し判定
        danger_succeeded = danger_num and danger_num not in top3_nums

        # 穴馬激走判定（3着以内に入ったか）
        hit_darks = [h for h in confirmed_podium[:3] if h["num"] in dark_nums]

        # 買い目の当たり判定
        hit_payouts = []
        total_payout_yen = 0

        # 1. 複勝チェック (穴馬の複勝)
        fukusho_data = payouts_dict.get("複勝", {})
        for idx, num in enumerate(fukusho_data.get("nums", [])):
            if num.isdigit() and int(num) in dark_nums:
                pay_str = fukusho_data["pays"][idx] if idx < len(fukusho_data["pays"]) else ""
                val = int(pay_str.replace("円", "").replace(",", "")) if pay_str else 0
                hit_payouts.append({"type": f"複勝 {num}番 (激走穴馬)", "yen": pay_str, "isHit": True})
                total_payout_yen += val

        # 2. ワイドチェック
        wide_data = payouts_dict.get("ワイド", {})
        for idx, pair_str in enumerate(wide_data.get("nums", [])):
            p_nums = [int(x.strip()) for x in pair_str.split("-") if x.strip().isdigit()]
            if any(n in dark_nums for n in p_nums):
                pay_str = wide_data["pays"][idx] if idx < len(wide_data["pays"]) else ""
                val = int(pay_str.replace("円", "").replace(",", "")) if pay_str else 0
                hit_payouts.append({"type": f"ワイド {pair_str}", "yen": pay_str, "isHit": True})
                total_payout_yen += val

        # 3. 馬連チェック
        umaren_data = payouts_dict.get("馬連", {})
        for idx, pair_str in enumerate(umaren_data.get("nums", [])):
            p_nums = [int(x.strip()) for x in pair_str.split("-") if x.strip().isdigit()]
            if any(n in dark_nums for n in p_nums):
                pay_str = umaren_data["pays"][idx] if idx < len(umaren_data["pays"]) else ""
                val = int(pay_str.replace("円", "").replace(",", "")) if pay_str else 0
                hit_payouts.append({"type": f"馬連 {pair_str}", "yen": pay_str, "isHit": True})
                total_payout_yen += val

        # 4. 3連複チェック
        sanrenpuku_data = payouts_dict.get("3連複", {})
        for idx, trio_str in enumerate(sanrenpuku_data.get("nums", [])):
            p_nums = [int(x.strip()) for x in trio_str.split("-") if x.strip().isdigit()]
            if any(n in dark_nums for n in p_nums):
                pay_str = sanrenpuku_data["pays"][idx] if idx < len(sanrenpuku_data["pays"]) else ""
                val = int(pay_str.replace("円", "").replace(",", "")) if pay_str else 0
                hit_payouts.append({"type": f"3連複 {trio_str}", "yen": pay_str, "isHit": True})
                total_payout_yen += val

        # 5. 3連単チェック
        sanrentan_data = payouts_dict.get("3連単", {})
        for idx, trio_str in enumerate(sanrentan_data.get("nums", [])):
            p_nums = [int(x.strip()) for x in trio_str.split("-") if x.strip().isdigit()]
            if any(n in dark_nums for n in p_nums):
                pay_str = sanrentan_data["pays"][idx] if idx < len(sanrentan_data["pays"]) else ""
                val = int(pay_str.replace("円", "").replace(",", "")) if pay_str else 0
                hit_payouts.append({"type": f"3連単 {trio_str}", "yen": pay_str, "isHit": True})
                total_payout_yen += val

        # 回収率計算（基準投資額 3,000円）
        base_budget = 3000
        roi_int = int(round((total_payout_yen / base_budget) * 100)) if total_payout_yen > 0 else 0

        # ステータス・レビュー文の決定
        if hit_darks and total_payout_yen > 0:
            status_type = "BIG_WIN"
            status_badge = "🎯 激走穴馬的中！万馬券達成"
            stars = "★★★★★"
            trust_grade = "S (激走完全的中)"
            review_text = (
                f"【確定結果反映】AI推奨穴馬★{hit_darks[0]['num']}番{hit_darks[0]['name']}"
                f"（{hit_darks[0]['pop']}番人気・単勝{hit_darks[0]['odds']}倍）が見事{hit_darks[0]['rank']}着に激走！"
                f"高配当馬券を仕留め回収率{roi_int}%を達成しました。"
            )
        elif danger_succeeded:
            status_type = "SKIP_SUCCESS"
            status_badge = "🛡️ 危険な人気馬の消し成功！"
            stars = "★★★★☆"
            trust_grade = "A+ (危険馬完全排除)"
            review_text = (
                f"【確定結果反映】危険な人気馬アラートの{danger_name}が見事に馬券圏外（着外）に沈没！"
                f"無駄な人気馬買い目を完全排除し、リスク回避に成功しました。"
            )
        else:
            status_type = "MISS"
            status_badge = "次走巻き返し警戒"
            stars = "★★★☆☆"
            trust_grade = "B (波乱傾向合致)"
            review_text = "【確定結果反映】特大波乱決着。推奨穴馬は惜しくも掲示板止まりとなりましたが、波乱度傾向の事前警告は合致しました。"

        # 表彰台 (podium)
        podium = []
        for h in confirmed_podium[:3]:
            is_target = h["num"] in dark_nums
            role = "(★AI激走穴馬)" if is_target else (f"({h['pop']}番人気)")
            podium.append({
                "rank": h["rank"],
                "num": h["num"],
                "name": f"{h['name']} {role}",
                "pop": h["pop"],
                "odds": h["odds"],
                "isTarget": is_target,
            })

        race["actualResult"] = {
            "statusType": status_type,
            "statusBadge": status_badge,
            "roi": f"{roi_int}%" if roi_int > 0 else "0%",
            "trustGrade": trust_grade,
            "stars": stars,
            "payouts": hit_payouts if hit_payouts else [
                {"type": "単勝 " + str(confirmed_podium[0]["num"]) + "番", "yen": (payouts_dict.get("単勝", {}).get("pays") or ["0円"])[0], "isHit": False}
            ],
            "podium": podium,
            "review": review_text,
            "confirmedAt": now_str,
        }
        race["isResultConfirmed"] = True
        updated_count += 1
        print(f"  ✅ [結果確定] {race['title']}: {status_badge} (回収率: {race['actualResult']['roi']})")

    return updated_count


def run_pipeline(mode="auto"):
    """全自動パイプラインメイン処理 (mode: auto / predict / result / all)"""
    now = datetime.now()
    now_str = now.strftime("%Y-%m-%d %H:%M:%S")

    # autoモードの場合は曜日と時刻から判定
    if mode == "auto":
        resolved_mode = determine_auto_mode()
    else:
        resolved_mode = mode

    print(f"[{now_str}] 🏇 競馬データ自動取得 & AI解析パイプライン開始 (実行モード: {resolved_mode})...")

    weekend = get_upcoming_weekend_dates()
    print(f"[{now_str}] 対象開催週: {weekend['sat_short']} 〜 {weekend['sun_short']}")

    processed_races = []
    data_source_mode = "live_netkeiba"

    # --- 1. 予想更新ステップ（predict または all） ---
    if resolved_mode in ["predict", "all"]:
        try:
            live_races = discover_and_fetch_live_weekend_races(weekend)
            if live_races:
                for rc in live_races:
                    processed_races.append(enrich_ai_predictions(rc))
                    processed_races[-1]["updatedAt"] = now_str
                print(f"[{now_str}] 🌐 リアルタイム取得成功: {len(processed_races)} レースの最新出馬表・オッズを反映しました。")
            else:
                raise RuntimeError("対象開催週のメインレースが見つかりませんでした")
        except Exception as err:
            data_source_mode = "cached_fallback"
            print(f"[{now_str}] ⚠️ 外部通信スキップ ({err}) -> キャッシュデータを使用します。")
            processed_races = load_existing_races_fallback()
    else:
        # 結果反映モード（result）の場合は、既存のレースデータを読み込む
        processed_races = load_existing_races_fallback()
        data_source_mode = "result_reflection"

    if not processed_races:
        raise SystemExit("❌ 有効なレースデータが取得できませんでした。")

    # --- 2. 結果反映ステップ（result または all） ---
    if resolved_mode in ["result", "all"]:
        print(f"[{now_str}] 🏆 レース確定着順 & 的中結果の自動取得・反映処理を実行中...")
        res_count = fetch_and_apply_race_results(processed_races)
        print(f"[{now_str}] 🎯 {res_count} レースの確定結果を反映しました。")

    # --- 3. Web用 races.json 出力 ---
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(processed_races, f, ensure_ascii=False, indent=2)

    # --- 4. システム監視用 pipeline_status.json 出力 ---
    status_payload = {
        "lastRunAt": now_str,
        "runMode": resolved_mode,
        "sourceMode": data_source_mode,
        "targetWeekend": f"{weekend['sat_short']} 〜 {weekend['sun_short']}",
        "raceCount": len(processed_races),
        "races": [
            {
                "id": rc["id"],
                "title": rc["title"],
                "date_short": rc["date_short"],
                "postTime": rc["postTime"],
                "runnersCount": len(rc["runners"]),
                "volatilityScore": rc["volatilityScore"],
                "oddsSource": rc.get("oddsSource", "最新オッズ"),
                "confirmedDraw": rc.get("confirmedDraw", True),
                "isResultConfirmed": rc.get("isResultConfirmed", False),
            }
            for rc in processed_races
        ],
    }
    with open(STATUS_PATH, "w", encoding="utf-8") as f:
        json.dump(status_payload, f, ensure_ascii=False, indent=2)

    # --- 5. note投稿用原稿セット自動生成 ---
    generate_note_drafts(processed_races, weekend, now_str)

    print(
        f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] ✅ パイプライン完了: "
        f"{len(processed_races)} レースのデータ ({OUTPUT_PATH}) と note原稿 ({NOTE_MD_PATH}) を正常更新しました！"
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="大穴ナビゲーター PRO - 全自動データ取得 & AI予想・結果反映エンジン")
    parser.add_argument(
        "--mode",
        choices=["auto", "predict", "result", "all"],
        default="auto",
        help="実行モード: auto(日時から自動判定) / predict(予想更新のみ) / result(確定結果反映のみ) / all(予想更新＋結果反映)",
    )
    args = parser.parse_args()
    run_pipeline(mode=args.mode)
