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
# 1. 木曜 18:00 (JRA出走登録表・初期予想生成)
# 2. 金曜 18:00 (JRA枠順確定・note原稿作成)
# 3. 土曜 08:30 (土曜朝オッズ更新)
# 4. 土曜 17:00 (土曜レース確定着順＆的中結果自動反映)
# 5. 日曜 08:30 (日曜朝オッズ更新)
# 6. 日曜 17:00 (日曜G1・メイン確定着順＆的中結果自動反映)
# 7. 月曜 09:00 (週末全レース結果確定＆アーカイブ集計)
CRON_JOB_CONTENT="$MARKER_START
0 18 * * 4 \"$TARGET_SCRIPT\" predict >/dev/null 2>&1
0 18 * * 5 \"$TARGET_SCRIPT\" predict >/dev/null 2>&1
30 8 * * 6 \"$TARGET_SCRIPT\" predict >/dev/null 2>&1
0 17 * * 6 \"$TARGET_SCRIPT\" result >/dev/null 2>&1
30 8 * * 0 \"$TARGET_SCRIPT\" predict >/dev/null 2>&1
0 17 * * 0 \"$TARGET_SCRIPT\" result >/dev/null 2>&1
0 9 * * 1 \"$TARGET_SCRIPT\" all >/dev/null 2>&1
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
echo " 1. 毎週木曜 18:00 : JRA出走登録表の取得・初期AI予想生成 (predict)"
echo " 2. 毎週金曜 18:00 : JRA確定枠順・note原稿作成・本線予想確定 (predict)"
echo " 3. 毎週土曜 08:30 : 土曜朝の最新オッズ・歪み検知反映 (predict)"
echo " 4. 毎週土曜 17:00 : 土曜レース確定着順＆的中結果の自動反映 (result)"
echo " 5. 毎週日曜 08:30 : 日曜朝（G1・メイン開催日）の直前オッズ反映 (predict)"
echo " 6. 毎週日曜 17:00 : 日曜G1・メイン確定着順＆的中結果の自動反映 (result)"
echo " 7. 毎週月曜 09:00 : 週末全レース結果確定＆アーカイブ集計 (all)"
echo ""
echo "※ GitHub Actions も同時に設定されているため、PCがスリープしていてもクラウド側で自動実行されます。"
echo "【実行スクリプト】: $TARGET_SCRIPT"
echo "【ログ保存場所】: $SCRIPT_DIR/logs/"
echo "=========================================================="
echo "💡 登録内容を確認したい場合: ./scripts/status_cron.sh"
echo "💡 自動化を解除したい場合:   ./scripts/remove_cron.sh"
echo "=========================================================="
