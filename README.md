# Unity Quest - Unity iOS ゲーム開発 学習プラットフォーム

Web開発者（Laravel / React 経験者）向けに、Unity を使った iOS ゲーム開発を基礎から App Store 公開までステップバイステップで学べるトレーニングサイトです。

## 概要

Unity Quest は、Laravel/React の知識をベースに Unity の概念を対比しながら学べるカリキュラムを提供します。ゲーミフィケーション（XP・バッジ・ストリーク）を取り入れたインタラクティブな学習体験が特徴です。

### コース構成

| # | コース | 難易度 | 目安時間 |
|---|--------|--------|----------|
| 1 | **Unity入門** - 開発環境とエディタの基本 | 初級 | 3時間 |
| 2 | **2Dゲーム開発** - ブロック崩しを作ろう | 初級 | 5時間 |
| 3 | **3Dゲーム開発** - 3D空間の冒険 | 中級 | 6時間 |
| 4 | **iOS ビルド & App Store 公開** | 中級 | 4時間 |
| 5 | **実践テクニック** - デザインパターン | 上級 | 5時間 |

### 主な機能

- 日本語 / 英語の多言語対応（i18n）
- ユーザー認証（登録・ログイン・プロフィール管理）
- 学習進捗トラッキング（レッスン完了率）
- ゲーミフィケーション（XP獲得、バッジ収集、連続学習ストリーク）
- Markdown ベースのコースコンテンツ（コードハイライト付き）
- レスポンシブデザイン（モバイル対応）

## 技術スタック

### バックエンド

| 技術 | バージョン | 用途 |
|------|-----------|------|
| PHP | ^8.2 | ランタイム |
| Laravel | ^12.0 | Web フレームワーク |
| Inertia.js | ^2.0 | サーバーサイドルーティング + SPA |
| Laravel Sanctum | ^4.0 | 認証 |
| Laravel Breeze | ^2.3 | 認証スキャフォールド |
| Ziggy | ^2.0 | Laravel ルートを JS で利用 |
| MySQL | 8.4 | データベース |

### フロントエンド

| 技術 | バージョン | 用途 |
|------|-----------|------|
| React | ^18.2 | UI ライブラリ |
| TypeScript | ^5.0 | 型安全な JavaScript |
| Tailwind CSS | ^3.2 | ユーティリティファースト CSS |
| Vite | ^7.0 | ビルドツール / 開発サーバー |
| Headless UI | ^2.0 | アクセシブルな UI コンポーネント |

### 開発ツール

| ツール | 用途 |
|--------|------|
| Laravel Sail | Docker 開発環境 |
| Laravel Pint | PHP コードフォーマッター |
| Laravel Pail | リアルタイムログビューア |
| PHPUnit | テストフレームワーク |

## 必要要件

### Docker を使う場合（推奨）

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) がインストール済みであること

### ローカル環境で直接動かす場合

- PHP >= 8.2
- Composer
- Node.js >= 18
- npm
- MySQL 8.x

## セットアップ

### 方法 1: Docker（Laravel Sail）を使う場合（推奨）

#### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd unity-ios-app-training
```

#### 2. Composer 依存パッケージのインストール

Docker 環境内で Composer を実行します（ホストに PHP がない場合でもOK）:

```bash
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php84-composer:latest \
    composer install --ignore-platform-reqs
```

#### 3. 環境ファイルの作成

```bash
cp .env.example .env
```

#### 4. Sail の起動

```bash
./vendor/bin/sail up -d
```

#### 5. アプリケーションキーの生成

```bash
./vendor/bin/sail artisan key:generate
```

#### 6. データベースのマイグレーションとシード

```bash
./vendor/bin/sail artisan migrate --seed
```

これにより以下が作成されます:
- ユーザーテーブル（認証用）
- コース / チャプター / レッスン テーブル
- ゲーミフィケーション関連テーブル（バッジ、レッスン完了、ユーザーXP）
- サンプルデータ（全5コースの教材コンテンツ）
- テスト用ユーザー（`test@example.com` / パスワードは `password`）

#### 7. フロントエンドの依存パッケージインストールとビルド

```bash
./vendor/bin/sail npm install
./vendor/bin/sail npm run build
```

#### 8. アクセス

ブラウザで http://localhost を開きます。

### 方法 2: ローカル環境で直接セットアップする場合

#### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd unity-ios-app-training
```

#### 2. ワンコマンドセットアップ

`composer.json` にセットアップスクリプトが定義されているため、以下の1コマンドで環境構築が完了します:

```bash
composer setup
```

このコマンドは以下を自動実行します:
1. `composer install` — PHP 依存パッケージのインストール
2. `.env` ファイルの作成（存在しない場合）
3. `php artisan key:generate` — アプリケーションキーの生成
4. `php artisan migrate --force` — データベースマイグレーション
5. `npm install` — Node.js 依存パッケージのインストール
6. `npm run build` — フロントエンドのビルド

> **注意:** `composer setup` を実行する前に、`.env` のデータベース接続情報をローカル環境に合わせて編集してください。

#### 3. 環境ファイルの編集

`.env` ファイルのデータベース設定をローカル環境に合わせて変更します:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=unity_quest
DB_USERNAME=root
DB_PASSWORD=
```

#### 4. データベースの作成

```bash
mysql -u root -e "CREATE DATABASE unity_quest"
```

#### 5. マイグレーションとシード

```bash
php artisan migrate --seed
```

#### 6. アクセス

```bash
php artisan serve
```

ブラウザで http://localhost:8000 を開きます。

## 開発

### 開発サーバーの起動

#### Docker（Sail）の場合

```bash
./vendor/bin/sail up -d
./vendor/bin/sail composer dev
```

#### ローカル環境の場合

```bash
composer dev
```

`composer dev` を実行すると、以下の4つのプロセスが同時に起動します:

| プロセス | 説明 | デフォルトポート |
|----------|------|-----------------|
| Laravel 開発サーバー | PHP アプリケーション | 8000 |
| Queue ワーカー | バックグラウンドジョブ処理 | - |
| Pail ログビューア | リアルタイムログ表示 | - |
| Vite 開発サーバー | フロントエンドHMR（ホットリロード） | 5173 |

### テストの実行

```bash
# Docker の場合
./vendor/bin/sail artisan test

# ローカル環境の場合
composer test
# または
php artisan test
```

テストは PHPUnit で実行されます。テスト用の設定は `phpunit.xml` で定義されており、テスト時は SQLite（インメモリ）が使われます。

#### テストスイート

| スイート | ディレクトリ | 内容 |
|----------|-------------|------|
| Unit | `tests/Unit/` | 単体テスト |
| Feature | `tests/Feature/` | 結合テスト（認証、プロフィール等） |

### コードフォーマット

```bash
# Docker の場合
./vendor/bin/sail vendor/bin/pint

# ローカル環境の場合
./vendor/bin/pint
```

[Laravel Pint](https://laravel.com/docs/pint) を使用して PHP コードを PSR-12 / Laravel スタイルに自動整形します。

### フロントエンドのビルド

```bash
# 開発ビルド（HMR 有効）
npm run dev

# 本番ビルド
npm run build
```

## プロジェクト構成

```
unity-ios-app-training/
├── app/
│   ├── Http/Controllers/
│   │   ├── CourseController.php      # コース一覧・詳細
│   │   ├── DashboardController.php   # ダッシュボード
│   │   ├── LessonController.php      # レッスン表示・完了処理
│   │   └── ProfileController.php     # プロフィール管理
│   └── Models/
│       ├── User.php                  # ユーザー（XP, ストリーク, ロケール）
│       ├── Course.php                # コース
│       ├── Chapter.php               # チャプター（コースの章）
│       ├── Lesson.php                # レッスン（Markdown コンテンツ）
│       ├── Badge.php                 # バッジ
│       └── LessonCompletion.php      # レッスン完了記録
├── database/
│   ├── migrations/                   # テーブル定義
│   └── seeders/
│       ├── DatabaseSeeder.php        # メインシーダー
│       └── CourseSeeder.php          # 全コース教材データ
├── resources/js/
│   ├── app.tsx                       # エントリーポイント
│   ├── i18n.ts                       # 多言語翻訳定義（ja/en）
│   ├── Components/
│   │   ├── ProgressBar.tsx           # 進捗バー
│   │   ├── XpBadge.tsx              # XP 表示バッジ
│   │   ├── DifficultyBadge.tsx      # 難易度バッジ
│   │   └── ...                       # 共通 UI コンポーネント
│   ├── Layouts/
│   │   ├── AppLayout.tsx            # メインレイアウト（ナビ付き）
│   │   ├── AuthenticatedLayout.tsx  # 認証済みレイアウト
│   │   └── GuestLayout.tsx          # ゲストレイアウト
│   ├── Pages/
│   │   ├── Welcome.tsx              # トップページ
│   │   ├── Dashboard.tsx            # ダッシュボード（学習進捗）
│   │   ├── Courses/
│   │   │   ├── Index.tsx            # コース一覧
│   │   │   └── Show.tsx             # コース詳細
│   │   ├── Lessons/
│   │   │   └── Show.tsx             # レッスン閲覧
│   │   ├── Auth/                    # 認証関連ページ
│   │   └── Profile/                 # プロフィール関連ページ
│   └── types/                        # TypeScript 型定義
├── routes/
│   ├── web.php                       # Web ルート定義
│   └── auth.php                      # 認証ルート定義
├── tests/
│   ├── Feature/                      # 結合テスト
│   └── Unit/                         # 単体テスト
├── compose.yaml                      # Docker Compose（Sail）
├── vite.config.js                    # Vite 設定
├── tailwind.config.js                # Tailwind CSS 設定
├── tsconfig.json                     # TypeScript 設定
└── phpunit.xml                       # PHPUnit 設定
```

## データベース構造

### ER 図（簡易）

```
users
├── id, name, email, password
├── total_xp, current_streak, last_activity_date
└── locale (ja/en)

courses
├── id, slug, title, title_en, description, description_en
├── icon, color, sort_order, estimated_hours
└── difficulty (beginner/intermediate/advanced)

chapters
├── id, course_id (FK), slug, title, title_en
└── sort_order

lessons
├── id, chapter_id (FK), slug, title, title_en
├── content_md, content_md_en (Markdown 教材)
├── sort_order, xp_reward, estimated_minutes
└── unique(chapter_id, slug)

lesson_completions
├── id, user_id (FK), lesson_id (FK)
├── xp_earned
└── unique(user_id, lesson_id)

badges
├── id, slug, name, name_en, description, description_en
├── icon, color, type, criteria (JSON)
└── type: course_complete / chapter_complete / streak / xp_milestone / special

user_badges
├── id, user_id (FK), badge_id (FK)
└── unique(user_id, badge_id)
```

## ルーティング

| HTTP メソッド | URL | 説明 | 認証 |
|-------------|-----|------|------|
| GET | `/` | トップページ | 不要 |
| GET | `/courses` | コース一覧 | 不要 |
| GET | `/courses/{courseSlug}` | コース詳細 | 不要 |
| GET | `/courses/{courseSlug}/{chapterSlug}/{lessonSlug}` | レッスン閲覧 | 不要 |
| GET | `/dashboard` | ダッシュボード | 必要 |
| POST | `/lessons/{lessonId}/complete` | レッスン完了 | 必要 |
| POST | `/locale` | 言語切替 | 必要 |
| GET | `/profile` | プロフィール編集 | 必要 |
| PATCH | `/profile` | プロフィール更新 | 必要 |
| DELETE | `/profile` | アカウント削除 | 必要 |

## 環境変数

主な環境変数（`.env.example` 参照）:

| 変数名 | デフォルト値 | 説明 |
|--------|-------------|------|
| `APP_NAME` | `Unity Quest` | アプリケーション名 |
| `APP_ENV` | `local` | 環境（local / production） |
| `APP_DEBUG` | `true` | デバッグモード |
| `APP_URL` | `http://localhost` | アプリケーション URL |
| `DB_CONNECTION` | `mysql` | データベースドライバ |
| `DB_HOST` | `mysql` | DB ホスト（Sail: `mysql`, ローカル: `127.0.0.1`） |
| `DB_PORT` | `3306` | DB ポート |
| `DB_DATABASE` | `laravel` | データベース名 |
| `DB_USERNAME` | `sail` | DB ユーザー名 |
| `DB_PASSWORD` | `password` | DB パスワード |
| `VITE_APP_NAME` | `${APP_NAME}` | フロントエンドで使用するアプリ名 |

## トラブルシューティング

### Sail が起動しない

```bash
# Docker が起動しているか確認
docker info

# ポートが使用中の場合は .env で変更
APP_PORT=8080
FORWARD_DB_PORT=33060
```

### マイグレーションが失敗する

```bash
# データベース接続を確認
php artisan db:show

# マイグレーションをリセットして再実行
php artisan migrate:fresh --seed
```

### Vite のホットリロードが効かない

```bash
# Vite 開発サーバーが起動しているか確認
npm run dev

# Sail 環境では VITE_PORT が公開されているか確認（compose.yaml）
```

### テスト用アカウント

シーダーにより以下のテストユーザーが作成されます:

| メールアドレス | パスワード |
|--------------|-----------|
| `test@example.com` | `password` |

## ライセンス

MIT License
