#!/usr/bin/env bash
# ==============================================================================
# 大穴ナビゲーター PRO - cron自動起動セットアップスクリプト
# 毎週金曜夕方（枠順確定）および土日朝にパイプラインを自動実行し、
# Webサイトへ自動デプロイするcronジョブを登録します。
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_SCRIPT="$SCRIPT_DIR/run_pipeline.sh"

if [ ! -f "$TARGET_SCRIPT" ]; then
    echo "❌ エラー: $TARGET_SCRIPT が見つかりません。"
    exit 1
fi

chmod +x "$TARGET_SCRIPT"

# 識別用マーカー
MARKER_START="# --- KEIBA_OANA_PIPELINE_START ---"
MARKER_END="# --- KEIBA_OANA_PIPELINE_END ---"

# 登録するcronスケジュール:
# 1. 金曜 18:00 (JRA枠順確定直後)
# 2. 土曜 08:30 (土曜朝オッズ更新)
# 3. 日曜 08:30 (日曜朝オッズ更新)
CRON_JOB_CONTENT="$MARKER_START
0 18 * * 5 \"$TARGET_SCRIPT\" >/dev/null 2>&1
30 8 * * 6 \"$TARGET_SCRIPT\" >/dev/null 2>&1
30 8 * * 0 \"$TARGET_SCRIPT\" >/dev/null 2>&1
$MARKER_END"

# 現在のcrontabを取得（既存設定があれば保持、マーカー内は上書き）
CURRENT_CRON=$(crontab -l 2>/dev/null || true)
CLEANED_CRON=$(echo "$CURRENT_CRON" | sed "/$MARKER_START/,/$MARKER_END/d")

NEW_CRON=$(printf "%s\n%s\n" "$CLEANED_CRON" "$CRON_JOB_CONTENT" | sed '/^[[:space:]]*$/d')

# crontabに適用
echo "$NEW_CRON" | crontab -

echo "=========================================================="
echo "🎉 cron自動起動ジョブの登録が完了しました！"
echo "=========================================================="
echo "【登録されたスケジュール】"
echo " 1. 毎週金曜 18:00 : JRA枠順確定直後に自動実行・初期予想公開"
echo " 2. 毎週土曜 08:30 : 土曜朝の最新オッズを反映して自動更新"
echo " 3. 毎週日曜 08:30 : 日曜朝（メイン重賞開催日）の最新オッズ反映"
echo ""
echo "【実行スクリプト】: $TARGET_SCRIPT"
echo "【ログ保存場所】: $SCRIPT_DIR/logs/"
echo "=========================================================="
echo "💡 登録内容を確認したい場合: ./scripts/status_cron.sh"
echo "💡 自動化を解除したい場合:   ./scripts/remove_cron.sh"
echo "=========================================================="
