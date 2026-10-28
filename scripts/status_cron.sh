#!/usr/bin/env bash
# ==============================================================================
# 大穴ナビゲーター PRO - cron稼働状態＆最新ログ確認スクリプト
# ==============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "=========================================================="
echo "📊 大穴ナビゲーター PRO - 自動実行システム 稼働状況"
echo "=========================================================="

echo "【現在のcrontab設定】"
CRON_OUTPUT=$(crontab -l 2>/dev/null || true)
if [ -z "$CRON_OUTPUT" ]; then
    echo "⚠️  現在、cronジョブは登録されていません。"
    echo "👉 登録するには: ./scripts/setup_cron.sh"
else
    echo "$CRON_OUTPUT"
fi

echo ""
echo "=========================================================="
echo "【最新の実行ログ (直近15行)】"
LATEST_LOG=$(ls -t "$SCRIPT_DIR/logs"/pipeline_*.log 2>/dev/null | head -n 1 || true)

if [ -n "$LATEST_LOG" ] && [ -f "$LATEST_LOG" ]; then
    echo "ログファイル: $LATEST_LOG"
    tail -n 15 "$LATEST_LOG"
else
    echo "ℹ️  実行ログはまだありません。"
fi
echo "=========================================================="
