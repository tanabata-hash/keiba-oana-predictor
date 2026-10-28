#!/usr/bin/env bash
# ==============================================================================
# 大穴ナビゲーター PRO - cron自動起動解除スクリプト
# ==============================================================================

set -e

MARKER_START="# --- KEIBA_OANA_PIPELINE_START ---"
MARKER_END="# --- KEIBA_OANA_PIPELINE_END ---"

CURRENT_CRON=$(crontab -l 2>/dev/null || true)
CLEANED_CRON=$(echo "$CURRENT_CRON" | sed "/$MARKER_START/,/$MARKER_END/d" | sed '/^[[:space:]]*$/d')

if [ -z "$CLEANED_CRON" ]; then
    crontab -r 2>/dev/null || true
else
    echo "$CLEANED_CRON" | crontab -
fi

echo "=========================================================="
echo "🛑 cron自動起動ジョブを解除（削除）しました。"
echo "=========================================================="
echo "再度有効化したい場合は ./scripts/setup_cron.sh を実行してください。"
