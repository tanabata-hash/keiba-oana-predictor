#!/usr/bin/env bash
# ==============================================================================
# 大穴ナビゲーター PRO - ローカル即時更新スクリプト
# 使い方: ./run_pipeline.sh
# ==============================================================================

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🏇 [$(date '+%Y-%m-%d %H:%M:%S')] pipeline.py を実行中..."
python3 pipeline.py

echo "📤 [$(date '+%Y-%m-%d %H:%M:%S')] GitHubへプッシュして本番（oana-navi.com）へ自動デプロイ..."
git add data/races.json
if git diff --staged --quiet; then
    echo "ℹ️  データに変更はありませんでした。"
else
    git commit -m "manual: レースデータ更新 ($(date '+%Y-%m-%d %H:%M:%S'))"
    git push origin main
    echo "🎉 デプロイ完了！ https://oana-navi.com に数秒で自動反映されます。"
fi
