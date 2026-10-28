#!/usr/bin/env bash
# ==============================================================================
# 大穴ナビゲーター PRO - 全自動データ取得 & 本番デプロイスクリプト
# cron自動実行 / 手動即時実行 兼用
# ==============================================================================

# cron環境向けにPATHを明示的に設定
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin:$HOME/.local/bin:$PATH"

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ログディレクトリの作成
LOG_DIR="$SCRIPT_DIR/logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/pipeline_$(date '+%Y%m%d').log"

log() {
    local msg="[$(date '+%Y-%m-%d %H:%M:%S')] $1"
    echo "$msg"
    echo "$msg" >> "$LOG_FILE"
}

log "=========================================================="
log "🏇 大穴ナビゲーター PRO パイプライン実行開始"
log "=========================================================="

# 1. pipeline.py の実行
log "⚙️ ① 出馬表・オッズ取得 & AI解析 (pipeline.py) を実行中..."
python3 pipeline.py >> "$LOG_FILE" 2>&1

# 2. Git差分チェックとプッシュ
log "📤 ② 生成データ (data/races.json) をコミット＆GitHubへプッシュ中..."
git add data/races.json

if git diff --staged --quiet; then
    log "ℹ️  データに変更はありませんでした（既に最新データです）。"
else
    git commit -m "auto: 週末レース予想データ自動更新 ($(date '+%Y-%m-%d %H:%M:%S'))" >> "$LOG_FILE" 2>&1
    git push origin main >> "$LOG_FILE" 2>&1
    log "🎉 デプロイ完了！ 本番サイト (https://oana-navi.com) に数秒で自動即時反映されます。"
fi

log "✅ パイプライン正常終了"
log "=========================================================="

