<?php

namespace Database\Seeders;

use App\Models\Badge;
use App\Models\Chapter;
use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $this->createCourses();
        $this->createBadges();
    }

    private function createCourses(): void
    {
        // Course 1: Unity入門
        $course1 = Course::create([
            'slug' => 'unity-basics',
            'title' => 'Unity入門 - 開発環境とエディタの基本',
            'title_en' => 'Unity Basics - Dev Environment & Editor',
            'description' => 'Unityのインストールからエディタの使い方まで、開発の第一歩を踏み出しましょう。Web開発者の視点から、UnityとLaravel/Reactの類似点も解説します。',
            'description_en' => 'From installing Unity to learning the editor, take your first steps. We explain similarities between Unity and Laravel/React from a web developer perspective.',
            'icon' => '🎯',
            'color' => '#6366f1',
            'sort_order' => 1,
            'estimated_hours' => 3,
            'difficulty' => 'beginner',
        ]);

        $ch1_1 = Chapter::create([
            'course_id' => $course1->id,
            'slug' => 'getting-started',
            'title' => 'はじめに',
            'title_en' => 'Getting Started',
            'sort_order' => 1,
        ]);

        Lesson::create([
            'chapter_id' => $ch1_1->id,
            'slug' => 'what-is-unity',
            'title' => 'Unityとは？Web開発者が知るべき全体像',
            'title_en' => 'What is Unity? Overview for Web Developers',
            'sort_order' => 1,
            'xp_reward' => 10,
            'estimated_minutes' => 10,
            'content_md' => '## Unityとは？

Unityは世界で最も広く使われているゲームエンジンの一つです。2Dゲーム、3Dゲーム、AR/VRアプリケーションなど、幅広いインタラクティブコンテンツを開発できます。

### Web開発との比較

あなたが普段使っているLaravelやReactと比較してみましょう：

| Web開発 | Unity |
|---------|-------|
| VS Code / PhpStorm | Unity Editor |
| npm / Composer | Unity Package Manager |
| React Component | Unity GameObject + Component |
| CSS / Tailwind | Material / Shader |
| REST API | Unity Networking |
| MySQL | PlayerPrefs / ScriptableObject |

> 💡 Reactのコンポーネント指向の考え方は、Unityの「GameObject + Component」パターンと非常によく似ています。

### なぜWeb開発者がUnityを学ぶのか

1. **スキルの転用性**: プログラミングの基本概念（変数、関数、クラス、イベント処理）はすべて共通
2. **C#はTypeScriptと似ている**: 型安全な言語という点で、TypeScriptの経験が活きる
3. **コンポーネント思考**: React のコンポーネントベース設計と Unity のコンポーネントシステムは類似

### このコースで学ぶこと

- Unityエディタの基本操作
- C#プログラミングの基礎（TypeScript経験者向け）
- 2Dゲーム制作（ブロック崩し、プラットフォーマー）
- 3Dゲーム制作
- iOS向けビルドとApp Store公開

> 🔄 **Web開発との対比**: Laravelで `php artisan serve` するように、Unityでは「Play」ボタンを押すだけでゲームをテストできます。',
            'content_md_en' => '## What is Unity?

Unity is one of the most widely used game engines in the world. You can develop a wide range of interactive content including 2D games, 3D games, and AR/VR applications.

### Comparison with Web Development

Let us compare with the Laravel and React you use daily:

| Web Dev | Unity |
|---------|-------|
| VS Code / PhpStorm | Unity Editor |
| npm / Composer | Unity Package Manager |
| React Component | Unity GameObject + Component |
| CSS / Tailwind | Material / Shader |
| REST API | Unity Networking |
| MySQL | PlayerPrefs / ScriptableObject |

> 💡 React component-oriented thinking is very similar to Unity "GameObject + Component" pattern.

### What You Will Learn

- Unity Editor basics
- C# programming fundamentals (for TypeScript developers)
- 2D game creation
- 3D game creation
- iOS builds and App Store publishing',
        ]);

        Lesson::create([
            'chapter_id' => $ch1_1->id,
            'slug' => 'install-unity',
            'title' => 'Unity Hubのインストールとプロジェクト作成',
            'title_en' => 'Installing Unity Hub and Creating a Project',
            'sort_order' => 2,
            'xp_reward' => 15,
            'estimated_minutes' => 20,
            'content_md' => '## Unity Hubのインストール

### 1. Unity Hubをダウンロード

Unity Hubは、Unityのバージョン管理やプロジェクト管理を行うツールです。

> 🔄 **Web開発との対比**: Unity Hubは `nvm`（Node Version Manager）に似ています。複数のUnityバージョンを管理できます。

### 2. インストール手順

1. Unity公式サイトからUnity Hubをダウンロード
2. インストーラを実行
3. Unity IDを作成（またはログイン）
4. Personal（無料）ライセンスを有効化

### 3. Unityエディタのインストール

Unity Hubから使用するUnityバージョンをインストールします：

1. Unity Hub → 「Installs」タブ
2. 「Install Editor」をクリック
3. **Unity 2022.3 LTS** を選択（推奨）
4. モジュールで **iOS Build Support** にチェック

> ⚠️ iOS向けビルドには **Xcode**（macOS）が必要です。Windows環境の場合は、まず基本を学び、iOS向けビルドはmac環境で行いましょう。

### 4. 新規プロジェクトの作成

```
1. Unity Hub → 「Projects」タブ
2. 「New Project」をクリック
3. テンプレート: 「2D Core」を選択
4. プロジェクト名: MyFirstUnityGame
5. 「Create project」をクリック
```

> 🔄 **Web開発との対比**: これは `composer create-project laravel/laravel my-app` や `npx create-react-app my-app` に相当する操作です。

### 5. プロジェクト構造の理解

作成されたプロジェクトには以下のフォルダがあります：

- **Assets/**: ゲームの素材（スクリプト、画像、音声など）→ Laravelの `resources/` に相当
- **Packages/**: 依存パッケージ → `composer.json` / `package.json` に相当
- **ProjectSettings/**: プロジェクト設定 → `.env` や `config/` に相当

> 💡 `Assets/` フォルダが最も重要です。ここにすべてのゲーム素材とスクリプトを配置します。',
        ]);

        Lesson::create([
            'chapter_id' => $ch1_1->id,
            'slug' => 'unity-editor-overview',
            'title' => 'Unityエディタの画面構成を理解する',
            'title_en' => 'Understanding the Unity Editor Layout',
            'sort_order' => 3,
            'xp_reward' => 15,
            'estimated_minutes' => 15,
            'content_md' => '## Unityエディタの画面構成

Unityエディタは、いくつかの主要なパネルで構成されています。

### 主要パネル

#### 1. Scene View（シーンビュー）
ゲームの世界を編集するための3D/2Dビューです。

> 🔄 **Web開発との対比**: ブラウザの DevTools の Elements パネルのビジュアル版のようなものです。

#### 2. Game View（ゲームビュー）
実際のプレイヤーが見る画面のプレビューです。

> 🔄 **Web開発との対比**: ブラウザのプレビュー画面に相当します。

#### 3. Hierarchy（ヒエラルキー）
シーン内のすべてのGameObjectをツリー構造で表示します。

> 🔄 **Web開発との対比**: React DevTools の Component Tree と同じ概念です。

#### 4. Inspector（インスペクター）
選択したGameObjectのプロパティを表示・編集できます。

> 🔄 **Web開発との対比**: React DevTools で選択したコンポーネントの Props/State を見るのと同じです。

#### 5. Project（プロジェクト）
プロジェクト内のすべてのファイル（アセット）を管理します。

> 🔄 **Web開発との対比**: VS Code のファイルエクスプローラと同じです。

#### 6. Console（コンソール）
ログ、警告、エラーを表示します。

> 🔄 **Web開発との対比**: ブラウザの Console タブと全く同じ役割です。`Debug.Log()` は `console.log()` に相当します。

### ショートカットキー

| 操作 | ショートカット |
|------|--------------|
| Play/Stop | Ctrl+P (Cmd+P) |
| Pause | Ctrl+Shift+P |
| 移動ツール | W |
| 回転ツール | E |
| スケールツール | R |
| 矩形ツール | T |

> 💡 `Ctrl+P` でゲームを即座にテスト実行できます。Laravel の `php artisan serve` よりも手軽です！',
        ]);

        // Chapter: C# basics
        $ch1_2 = Chapter::create([
            'course_id' => $course1->id,
            'slug' => 'csharp-for-web-devs',
            'title' => 'Web開発者のためのC#入門',
            'title_en' => 'C# for Web Developers',
            'sort_order' => 2,
        ]);

        Lesson::create([
            'chapter_id' => $ch1_2->id,
            'slug' => 'csharp-vs-typescript',
            'title' => 'C# vs TypeScript - 構文の比較',
            'title_en' => 'C# vs TypeScript - Syntax Comparison',
            'sort_order' => 1,
            'xp_reward' => 20,
            'estimated_minutes' => 25,
            'content_md' => '## C# vs TypeScript

TypeScriptの経験があれば、C#は非常に学びやすい言語です。両方とも静的型付けで、クラスベースのオブジェクト指向をサポートしています。

### 変数宣言

```csharp
// C#
int score = 100;
string playerName = "Hero";
float speed = 5.5f;
bool isAlive = true;
var items = new List<string>(); // 型推論
```

```typescript
// TypeScript（比較用）
let score: number = 100;
let playerName: string = "Hero";
let speed: number = 5.5;
let isAlive: boolean = true;
const items: string[] = []; // 配列
```

> 💡 C# では `float` の値には `f` サフィックスが必要です（例: `5.5f`）

### 関数（メソッド）

```csharp
// C#
public int CalculateDamage(int baseDamage, float multiplier)
{
    return (int)(baseDamage * multiplier);
}

// アクセス修飾子が必須（public, private, protected）
private void Start()
{
    Debug.Log("Game Started!");
}
```

```typescript
// TypeScript（比較用）
function calculateDamage(baseDamage: number, multiplier: number): number {
    return Math.floor(baseDamage * multiplier);
}
```

### クラス

```csharp
// C# - Unity でのスクリプト
using UnityEngine;

public class Player : MonoBehaviour
{
    public float moveSpeed = 5f;
    private int health = 100;

    void Start()
    {
        // 初期化処理（React の useEffect(() => {}, []) に相当）
        Debug.Log("Player initialized");
    }

    void Update()
    {
        // 毎フレーム実行（requestAnimationFrame に相当）
        float horizontal = Input.GetAxis("Horizontal");
        transform.Translate(Vector2.right * horizontal * moveSpeed * Time.deltaTime);
    }
}
```

> 🔄 **Web開発との対比**:
> - `Start()` = React の `useEffect(() => {}, [])` or `componentDidMount()`
> - `Update()` = `requestAnimationFrame` のコールバック
> - `MonoBehaviour` = React の基本Component（ライフサイクルメソッドを提供）

### 配列とコレクション

```csharp
// C#
int[] scores = { 100, 200, 300 };
List<string> inventory = new List<string> { "Sword", "Shield" };
Dictionary<string, int> stats = new Dictionary<string, int>
{
    { "HP", 100 },
    { "MP", 50 }
};

// LINQ（C# の配列操作 = JavaScript の Array methods）
var highScores = scores.Where(s => s > 150).OrderByDescending(s => s).ToList();
```

```typescript
// TypeScript（比較用）
const scores: number[] = [100, 200, 300];
const inventory: string[] = ["Sword", "Shield"];
const stats: Record<string, number> = { HP: 100, MP: 50 };

const highScores = scores.filter(s => s > 150).sort((a, b) => b - a);
```

> 💡 C# の LINQ は JavaScript の `map`, `filter`, `reduce` と同じ発想です！',
        ]);

        Lesson::create([
            'chapter_id' => $ch1_2->id,
            'slug' => 'monobehaviour-lifecycle',
            'title' => 'MonoBehaviourのライフサイクル',
            'title_en' => 'MonoBehaviour Lifecycle',
            'sort_order' => 2,
            'xp_reward' => 20,
            'estimated_minutes' => 20,
            'content_md' => '## MonoBehaviourのライフサイクル

Unityスクリプトの基本クラス `MonoBehaviour` は、Reactコンポーネントのライフサイクルメソッドに似た仕組みを持っています。

### ライフサイクルメソッドの対応表

| Unity (C#) | React | 説明 |
|-------------|-------|------|
| `Awake()` | constructor | 最初に一度だけ呼ばれる |
| `Start()` | `useEffect(() => {}, [])` | 初回フレームの前に一度だけ |
| `Update()` | `requestAnimationFrame` | 毎フレーム呼ばれる |
| `FixedUpdate()` | - | 物理演算用、固定間隔で呼ばれる |
| `OnDestroy()` | `useEffect` の cleanup | オブジェクト破棄時 |
| `OnEnable()` / `OnDisable()` | mount/unmount | 有効化/無効化時 |

### 実装例

```csharp
using UnityEngine;

public class Enemy : MonoBehaviour
{
    private float spawnTime;
    private int health = 100;

    // コンストラクタの代わり - 最初に呼ばれる
    void Awake()
    {
        Debug.Log("Enemy: Awake - インスタンス生成");
    }

    // 初期化 - Start は Awake の後、最初の Update の前
    void Start()
    {
        spawnTime = Time.time;
        Debug.Log($"Enemy spawned at {spawnTime}");
    }

    // 毎フレーム呼ばれる（60fps なら毎秒60回）
    void Update()
    {
        // プレイヤーに向かって移動するなどの処理
        transform.Translate(Vector2.left * 2f * Time.deltaTime);
    }

    // 物理演算の更新（固定間隔）
    void FixedUpdate()
    {
        // Rigidbody を使った物理的な移動はここで
    }

    // オブジェクトが破棄されるとき
    void OnDestroy()
    {
        Debug.Log("Enemy destroyed - cleanup");
        // イベントのunsubscribeなど
    }
}
```

> 🔄 **Reactとの比較**:
> ```typescript
> // React equivalent
> function Enemy() {
>   const [health, setHealth] = useState(100);
>
>   useEffect(() => {
>     // Start() に相当
>     console.log("Enemy mounted");
>     const interval = setInterval(() => {
>       // Update() に相当（ただし固定間隔）
>     }, 16);
>     return () => {
>       // OnDestroy() に相当
>       clearInterval(interval);
>     };
>   }, []);
> }
> ```

### 実行順序

```
Awake() → OnEnable() → Start() → FixedUpdate() → Update() → LateUpdate() → OnDisable() → OnDestroy()
```

> 💡 `Update()` はフレームレートに依存するため、移動計算では必ず `Time.deltaTime` を掛けましょう。これにより、どのFPSでも一定の速度で動きます。',
        ]);

        // Course 2: 2D Game Development
        $course2 = Course::create([
            'slug' => '2d-game-dev',
            'title' => '2Dゲーム開発 - ブロック崩しを作ろう',
            'title_en' => '2D Game Dev - Build a Breakout Game',
            'description' => '実際に遊べるブロック崩しゲームを作りながら、Unityの2D開発の基礎を身につけます。スプライト、物理演算、UI、サウンドまで実践的に学びます。',
            'description_en' => 'Learn Unity 2D fundamentals by building a playable Breakout game. Covers sprites, physics, UI, and sound.',
            'icon' => '🧱',
            'color' => '#f59e0b',
            'sort_order' => 2,
            'estimated_hours' => 6,
            'difficulty' => 'beginner',
        ]);

        $ch2_1 = Chapter::create([
            'course_id' => $course2->id,
            'slug' => 'sprites-and-objects',
            'title' => 'スプライトとGameObject',
            'title_en' => 'Sprites and GameObjects',
            'sort_order' => 1,
        ]);

        Lesson::create([
            'chapter_id' => $ch2_1->id,
            'slug' => 'gameobject-components',
            'title' => 'GameObjectとComponent - Unityの基本単位',
            'title_en' => 'GameObjects and Components - Unity Building Blocks',
            'sort_order' => 1,
            'xp_reward' => 15,
            'estimated_minutes' => 20,
            'content_md' => '## GameObjectとComponent

Unityのゲーム世界は **GameObject** と **Component** で構成されています。

### ReactコンポーネントとUnityのComponent

Reactでは、UIを小さなコンポーネントに分割して構築しますよね：

```typescript
// React - コンポーネントの組み合わせ
<Player>
  <Sprite image="hero.png" />
  <HealthBar hp={100} />
  <Movement speed={5} />
</Player>
```

Unityも同じ発想です：

```
GameObject "Player"
├── Transform (位置・回転・スケール) ※必須
├── SpriteRenderer (見た目の表示)
├── Rigidbody2D (物理演算)
├── BoxCollider2D (当たり判定)
└── PlayerController.cs (自作スクリプト)
```

> 💡 GameObjectは「空の箱」で、Componentを追加することで機能を持ちます。React の `<div>` に Props や子コンポーネントを追加するのと同じです。

### スプライトの作成

ブロック崩しに必要な基本要素を作りましょう：

1. **パドル**: プレイヤーが操作する板
2. **ボール**: 跳ね返るボール
3. **ブロック**: 壊すターゲット

### Hierarchy での構成

```
Scene "BreakoutGame"
├── Main Camera
├── Background
├── Paddle (パドル)
│   ├── SpriteRenderer
│   ├── BoxCollider2D
│   └── PaddleController.cs
├── Ball (ボール)
│   ├── SpriteRenderer
│   ├── CircleCollider2D
│   ├── Rigidbody2D
│   └── BallController.cs
└── Blocks (空のGameObject - コンテナ)
    ├── Block_01
    ├── Block_02
    └── ...
```

> 🔄 **Web開発との対比**: この Hierarchy は React のコンポーネントツリーそのものです。空の GameObject（Blocks）は `<div className="container">` のようなグルーピング要素です。',
        ]);

        Lesson::create([
            'chapter_id' => $ch2_1->id,
            'slug' => 'paddle-movement',
            'title' => 'パドルの移動を実装する',
            'title_en' => 'Implementing Paddle Movement',
            'sort_order' => 2,
            'xp_reward' => 20,
            'estimated_minutes' => 25,
            'content_md' => '## パドルの移動

プレイヤーが操作するパドルを作りましょう。

### PaddleController スクリプト

```csharp
using UnityEngine;

public class PaddleController : MonoBehaviour
{
    [SerializeField] private float moveSpeed = 10f;
    [SerializeField] private float boundaryX = 7f;

    // Update は毎フレーム呼ばれる
    void Update()
    {
        // 入力の取得（左右キー or A/Dキー）
        float input = Input.GetAxis("Horizontal");

        // 移動
        Vector3 newPosition = transform.position;
        newPosition.x += input * moveSpeed * Time.deltaTime;

        // 境界制限（画面外に出ないように）
        newPosition.x = Mathf.Clamp(newPosition.x, -boundaryX, boundaryX);

        transform.position = newPosition;
    }
}
```

### コードの解説

#### `[SerializeField]` 属性

```csharp
[SerializeField] private float moveSpeed = 10f;
```

> 🔄 **Web開発との対比**: React の Props のようなものです。Unity Editor の Inspector パネルで値を変更できます。コードを書き換えずに調整可能！

#### `Input.GetAxis("Horizontal")`

```csharp
float input = Input.GetAxis("Horizontal"); // -1.0 〜 1.0
```

Webでのキーボードイベントハンドリングに相当：

```typescript
// Web での同様の処理
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") input = -1;
    if (e.key === "ArrowRight") input = 1;
});
```

#### `Time.deltaTime`

前のフレームからの経過時間（秒）です。

```csharp
// Time.deltaTime を掛けることで、FPSに依存しない一定速度の移動になる
newPosition.x += input * moveSpeed * Time.deltaTime;
```

> 💡 60FPSなら約0.016秒、30FPSなら約0.033秒。掛けることで、どのフレームレートでも同じ速度で動きます。

### セットアップ手順

1. 空の GameObject を作成 → 名前を "Paddle" に
2. **SpriteRenderer** を追加 → 白い四角いスプライトを設定
3. **BoxCollider2D** を追加
4. **PaddleController.cs** スクリプトを追加
5. Transform の Scale を `(2, 0.3, 1)` に設定

> 💡 Inspector で `moveSpeed` の値をスライダーで調整しながら、Play ボタンでリアルタイムにテストできます！',
        ]);

        Lesson::create([
            'chapter_id' => $ch2_1->id,
            'slug' => 'ball-physics',
            'title' => 'ボールの物理演算と跳ね返り',
            'title_en' => 'Ball Physics and Bouncing',
            'sort_order' => 3,
            'xp_reward' => 20,
            'estimated_minutes' => 25,
            'content_md' => '## ボールの物理演算

Unity の物理エンジンを使って、ボールの跳ね返りを実装します。

### Physics Material 2D の作成

まず、ボールが完全に跳ね返るための物理マテリアルを作成します：

1. Project パネルで右クリック → Create → 2D → Physics Material 2D
2. 名前を "BounceMaterial" に
3. **Bounciness**: 1（完全弾性）
4. **Friction**: 0（摩擦なし）

### BallController スクリプト

```csharp
using UnityEngine;

public class BallController : MonoBehaviour
{
    [SerializeField] private float initialSpeed = 8f;
    private Rigidbody2D rb;
    private bool isLaunched = false;
    private Transform paddle;

    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        paddle = GameObject.FindWithTag("Player").transform;

        // ボールの重力を無効化（宇宙空間的な動き）
        rb.gravityScale = 0;
    }

    void Update()
    {
        if (!isLaunched)
        {
            // パドルの上に追従
            Vector3 paddlePos = paddle.position;
            transform.position = new Vector3(paddlePos.x, paddlePos.y + 0.5f, 0);

            // スペースキーで発射
            if (Input.GetKeyDown(KeyCode.Space))
            {
                Launch();
            }
        }
    }

    private void Launch()
    {
        isLaunched = true;
        // 斜め上方向に発射
        Vector2 direction = new Vector2(0.5f, 1f).normalized;
        rb.linearVelocity = direction * initialSpeed;
    }

    // ボールの速度が変わらないようにする
    void FixedUpdate()
    {
        if (isLaunched && rb.linearVelocity.magnitude != initialSpeed)
        {
            rb.linearVelocity = rb.linearVelocity.normalized * initialSpeed;
        }
    }
}
```

### コードの解説

#### `GetComponent<T>()`

```csharp
rb = GetComponent<Rigidbody2D>();
```

> 🔄 **Web開発との対比**: `document.querySelector()` や React の `useRef()` に似ています。同じ GameObject に付いているコンポーネントへの参照を取得します。

#### `Rigidbody2D`

物理演算を行うコンポーネントです。

```csharp
rb.linearVelocity = direction * initialSpeed; // 速度を設定
rb.gravityScale = 0; // 重力なし
```

> 🔄 **Web開発との対比**: CSSアニメーションの `transform` で位置を直接操作するのではなく、物理エンジンに「速度」を指定して動かす、という発想です。

#### `Vector2.normalized`

```csharp
Vector2 direction = new Vector2(0.5f, 1f).normalized;
// → (0.447, 0.894) - 方向は同じで長さが1のベクトル
```

> 💡 ベクトルの正規化は、方向は保ちつつ大きさを1にする操作です。これに速度を掛けることで、どの方向でも同じ速さで移動できます。',
        ]);

        $ch2_2 = Chapter::create([
            'course_id' => $course2->id,
            'slug' => 'game-logic',
            'title' => 'ゲームロジックの実装',
            'title_en' => 'Implementing Game Logic',
            'sort_order' => 2,
        ]);

        Lesson::create([
            'chapter_id' => $ch2_2->id,
            'slug' => 'block-destruction',
            'title' => 'ブロックの破壊と当たり判定',
            'title_en' => 'Block Destruction and Collision Detection',
            'sort_order' => 1,
            'xp_reward' => 20,
            'estimated_minutes' => 20,
            'content_md' => '## ブロックの破壊

ボールがブロックに当たったときの処理を実装します。

### Block スクリプト

```csharp
using UnityEngine;

public class Block : MonoBehaviour
{
    [SerializeField] private int hitPoints = 1;
    [SerializeField] private int scoreValue = 10;

    // 2D物理の衝突検出コールバック
    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Ball"))
        {
            hitPoints--;

            if (hitPoints <= 0)
            {
                // スコア加算
                GameManager.Instance.AddScore(scoreValue);
                // ブロック破壊
                Destroy(gameObject);
            }
            else
            {
                // ダメージ表現（色を変えるなど）
                GetComponent<SpriteRenderer>().color = Color.gray;
            }
        }
    }
}
```

### 衝突検出の仕組み

> 🔄 **Web開発との対比**: DOM のイベントリスナーに相当します。

```csharp
// Unity - 衝突イベント
void OnCollisionEnter2D(Collision2D collision) { }  // 衝突開始
void OnCollisionStay2D(Collision2D collision) { }   // 衝突中
void OnCollisionExit2D(Collision2D collision) { }   // 衝突終了
```

```typescript
// Web - DOMイベント（概念的に対応）
element.addEventListener("mouseenter", handler);  // Enter
element.addEventListener("mouseover", handler);   // Stay
element.addEventListener("mouseleave", handler);  // Exit
```

### GameManager（シングルトンパターン）

```csharp
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public static GameManager Instance { get; private set; }

    private int score = 0;
    private int remainingBlocks;

    void Awake()
    {
        // シングルトンパターン
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
        }
    }

    void Start()
    {
        remainingBlocks = FindObjectsByType<Block>(FindObjectsSortMode.None).Length;
    }

    public void AddScore(int points)
    {
        score += points;
        remainingBlocks--;

        if (remainingBlocks <= 0)
        {
            // ゲームクリア！
            Debug.Log($"Game Clear! Score: {score}");
        }
    }
}
```

> 🔄 **Web開発との対比**: `GameManager` は Laravel の Service Container（シングルトン登録）や React の Context Provider に似た役割です。ゲーム全体の状態を一元管理します。

> 💡 `Destroy(gameObject)` でオブジェクトを完全に削除できます。React で言えば条件付きレンダリングで `{showBlock && <Block />}` のように表示を消すことに似ていますが、Unity ではメモリからも解放されます。',
        ]);

        Lesson::create([
            'chapter_id' => $ch2_2->id,
            'slug' => 'ui-score-lives',
            'title' => 'UIの実装 - スコアとライフ表示',
            'title_en' => 'UI Implementation - Score and Lives',
            'sort_order' => 2,
            'xp_reward' => 15,
            'estimated_minutes' => 20,
            'content_md' => '## UIの実装

ゲームのスコアとライフを画面上に表示しましょう。

### Unity の UI システム

Unity には UI を構築するための仕組みがあります：

- **Canvas**: UI要素のルートコンテナ（React の `<div id="root">` に相当）
- **Text (TextMeshPro)**: テキスト表示
- **Image**: 画像表示
- **Button**: ボタン

### UIの構造

```
Canvas
├── ScoreText (TextMeshPro)
├── LivesContainer
│   ├── Heart_1 (Image)
│   ├── Heart_2 (Image)
│   └── Heart_3 (Image)
└── GameOverPanel (Panel - 非表示)
    ├── GameOverText
    └── RetryButton
```

> 🔄 **Web開発との対比**: この構造は React の JSX と全く同じ考え方です：
> ```tsx
> <div className="canvas">
>   <span className="score">Score: 0</span>
>   <div className="lives">
>     <Heart /><Heart /><Heart />
>   </div>
>   {isGameOver && <GameOverModal onRetry={handleRetry} />}
> </div>
> ```

### UIManager スクリプト

```csharp
using UnityEngine;
using TMPro;

public class UIManager : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI scoreText;
    [SerializeField] private TextMeshProUGUI livesText;
    [SerializeField] private GameObject gameOverPanel;

    void Start()
    {
        gameOverPanel.SetActive(false);
        UpdateScore(0);
        UpdateLives(3);
    }

    public void UpdateScore(int score)
    {
        scoreText.text = $"Score: {score}";
    }

    public void UpdateLives(int lives)
    {
        livesText.text = $"Lives: {lives}";
    }

    public void ShowGameOver()
    {
        gameOverPanel.SetActive(true);
    }
}
```

> 🔄 **Web開発との対比**: `SetActive(false/true)` は React の条件付きレンダリング（`{show && <Component />}`）や CSS の `display: none` に相当します。

> 💡 Unity では `[SerializeField]` を付けることで、Inspector からUI要素をドラッグ&ドロップで接続できます。React の Props バインディングのビジュアル版です！',
        ]);

        // Course 3: 3D Game Development
        $course3 = Course::create([
            'slug' => '3d-game-dev',
            'title' => '3Dゲーム開発 - アクションゲームを作ろう',
            'title_en' => '3D Game Dev - Build an Action Game',
            'description' => '3D空間でのキャラクター操作、カメラ制御、ライティングなど、3Dゲーム開発の核心を学びます。簡単なアクションゲームを完成させましょう。',
            'description_en' => 'Learn 3D game development essentials: character control, camera, lighting. Build a simple action game.',
            'icon' => '🎮',
            'color' => '#10b981',
            'sort_order' => 3,
            'estimated_hours' => 8,
            'difficulty' => 'intermediate',
        ]);

        $ch3_1 = Chapter::create([
            'course_id' => $course3->id,
            'slug' => '3d-fundamentals',
            'title' => '3D空間の基礎',
            'title_en' => '3D Space Fundamentals',
            'sort_order' => 1,
        ]);

        Lesson::create([
            'chapter_id' => $ch3_1->id,
            'slug' => '3d-coordinate-system',
            'title' => '3D座標系とTransform',
            'title_en' => '3D Coordinate System and Transform',
            'sort_order' => 1,
            'xp_reward' => 15,
            'estimated_minutes' => 20,
            'content_md' => '## 3D座標系

2Dゲームではx（横）とy（縦）の2軸でしたが、3Dでは**z軸（奥行き）**が加わります。

### 座標系の理解

```
      y (上)
      |
      |
      +------ x (右)
     /
    z (手前)
```

- **X軸**: 左右（負が左、正が右）
- **Y軸**: 上下（負が下、正が上）
- **Z軸**: 前後（負が奥、正が手前）

### Transform コンポーネント

すべての GameObject は `Transform` を持ちます：

```csharp
// 位置（Position）
transform.position = new Vector3(0, 1, 0); // x=0, y=1, z=0

// 回転（Rotation）
transform.rotation = Quaternion.Euler(0, 90, 0); // Y軸に90度回転

// スケール（Scale）
transform.localScale = new Vector3(2, 2, 2); // 2倍サイズ
```

> 🔄 **Web開発との対比**: CSSの `transform` プロパティと概念は同じです：
> ```css
> .element {
>   transform: translate3d(0, 1px, 0) rotateY(90deg) scale(2);
> }
> ```

### 3Dでの移動

```csharp
public class PlayerMovement3D : MonoBehaviour
{
    [SerializeField] private float moveSpeed = 5f;
    [SerializeField] private float rotationSpeed = 720f;

    void Update()
    {
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");

        // 移動方向の計算
        Vector3 direction = new Vector3(horizontal, 0, vertical).normalized;

        if (direction.magnitude > 0.1f)
        {
            // キャラクターの向きを移動方向に合わせる
            Quaternion targetRotation = Quaternion.LookRotation(direction);
            transform.rotation = Quaternion.RotateTowards(
                transform.rotation, targetRotation, rotationSpeed * Time.deltaTime
            );

            // 移動
            transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
        }
    }
}
```

> 💡 3Dゲームでは `Vector3` を使います。2Dでの `Vector2.right` は3Dでは `Vector3.forward` になります。',
        ]);

        Lesson::create([
            'chapter_id' => $ch3_1->id,
            'slug' => 'camera-and-lighting',
            'title' => 'カメラとライティング',
            'title_en' => 'Camera and Lighting',
            'sort_order' => 2,
            'xp_reward' => 15,
            'estimated_minutes' => 20,
            'content_md' => '## カメラとライティング

3Dゲームでは、カメラとライティングがビジュアルの要です。

### カメラの種類

1. **Perspective Camera（透視投影）**: 遠くのものが小さく見える（現実と同じ）
2. **Orthographic Camera（正投影）**: 距離による大きさの変化がない（2D的）

### Third Person Camera（三人称カメラ）

```csharp
using UnityEngine;

public class ThirdPersonCamera : MonoBehaviour
{
    [SerializeField] private Transform target; // 追従対象
    [SerializeField] private Vector3 offset = new Vector3(0, 5, -7);
    [SerializeField] private float smoothSpeed = 5f;

    void LateUpdate()
    {
        // 目標位置の計算
        Vector3 desiredPosition = target.position + offset;

        // スムーズに追従
        transform.position = Vector3.Lerp(
            transform.position, desiredPosition, smoothSpeed * Time.deltaTime
        );

        // プレイヤーを向く
        transform.LookAt(target);
    }
}
```

> 💡 カメラの更新は `LateUpdate()` で行います。これは `Update()` の後に呼ばれるため、キャラクター移動後の位置を正確に追従できます。

### ライティングの基本

Unity のライトタイプ：

| ライトタイプ | 用途 | Web での対比 |
|-------------|------|-------------|
| Directional Light | 太陽光 | CSS `background: linear-gradient()` |
| Point Light | 電球のような光 | CSS `radial-gradient()` |
| Spot Light | スポットライト | CSS `box-shadow` (指向性) |
| Area Light | 面光源 | - |

```csharp
// ライトの動的制御
Light myLight = GetComponent<Light>();
myLight.intensity = 2.0f;    // 明るさ
myLight.color = Color.yellow; // 色
myLight.range = 10f;          // 範囲
```

> 🔄 **Web開発との対比**: ライティングは CSS の影 (`box-shadow`) やフィルター (`filter: brightness()`) の3D版と考えることができます。ただし、3D空間でリアルタイムに光の反射や影を計算する点が大きく異なります。',
        ]);

        // Course 4: iOS Deployment
        $course4 = Course::create([
            'slug' => 'ios-deployment',
            'title' => 'iOS向けビルドとApp Store公開',
            'title_en' => 'iOS Build & App Store Publishing',
            'description' => 'UnityゲームをiOS向けにビルドし、実機テストからApp Store公開までの全プロセスを解説します。証明書、プロビジョニングプロファイル、審査対応まで網羅。',
            'description_en' => 'Build Unity games for iOS. From device testing to App Store publishing, including certificates, provisioning, and review.',
            'icon' => '📱',
            'color' => '#ef4444',
            'sort_order' => 4,
            'estimated_hours' => 5,
            'difficulty' => 'intermediate',
        ]);

        $ch4_1 = Chapter::create([
            'course_id' => $course4->id,
            'slug' => 'ios-build-setup',
            'title' => 'iOSビルドの準備',
            'title_en' => 'iOS Build Setup',
            'sort_order' => 1,
        ]);

        Lesson::create([
            'chapter_id' => $ch4_1->id,
            'slug' => 'xcode-setup',
            'title' => 'Xcode と Apple Developer Account のセットアップ',
            'title_en' => 'Xcode and Apple Developer Account Setup',
            'sort_order' => 1,
            'xp_reward' => 15,
            'estimated_minutes' => 20,
            'content_md' => '## iOS開発の準備

UnityゲームをiOSで動かすための環境を整えましょう。

### 必要なもの

1. **Mac** (macOS が必須)
2. **Xcode** (App Store からインストール)
3. **Apple Developer Account** (年間 $99 / ¥12,980)
4. **iOS デバイス** (実機テスト用)

> 🔄 **Web開発との対比**: Web開発なら `npm run build` → デプロイで済みますが、iOSアプリは Apple の「証明書」や「プロビジョニングプロファイル」が必要です。これは、Web の SSL 証明書のような仕組みです。

### Unity側の設定

1. **File → Build Settings** を開く
2. **Platform** で **iOS** を選択
3. **Switch Platform** をクリック
4. **Player Settings** で以下を設定：

```
Company Name: あなたの会社名/個人名
Product Name: ゲーム名
Bundle Identifier: com.yourcompany.yourgame
Version: 1.0.0
Target minimum iOS Version: 15.0
```

> 🔄 **Web開発との対比**: `Bundle Identifier` は、Web の ドメイン名を逆にしたものです。`yourcompany.com` → `com.yourcompany.yourgame`

### Xcodeプロジェクトの生成

```
1. Unity: File → Build Settings → Build
2. 出力先フォルダを選択
3. Unity が Xcode プロジェクトを生成
4. 生成された .xcodeproj を Xcode で開く
```

### 証明書とプロビジョニング

| 用語 | 説明 | Web での対比 |
|------|------|-------------|
| Development Certificate | 開発用証明書 | localhost の自己署名証明書 |
| Distribution Certificate | 配布用証明書 | 本番 SSL 証明書 |
| Provisioning Profile | デバイス・アプリの紐付け | サーバーの deploy key |
| App ID | アプリの一意識別子 | ドメイン名 |

> 💡 Xcode の「Automatically manage signing」にチェックを入れれば、証明書とプロビジョニングの管理を自動化できます。最初はこれを使うのが最も簡単です。',
        ]);

        Lesson::create([
            'chapter_id' => $ch4_1->id,
            'slug' => 'ios-optimization',
            'title' => 'iOS向けパフォーマンス最適化',
            'title_en' => 'iOS Performance Optimization',
            'sort_order' => 2,
            'xp_reward' => 20,
            'estimated_minutes' => 25,
            'content_md' => '## iOS向け最適化

モバイルデバイスはPCと比べてリソースが限られています。パフォーマンスを最適化しましょう。

### メモリ管理

```csharp
// ❌ Bad: テクスチャを大きいまま使う
// 4096x4096 のテクスチャは約64MBのメモリを消費

// ✅ Good: テクスチャサイズを適切に設定
// iOS向け: 2048x2048 以下を推奨
// UI要素: 512x512 以下で十分
```

> 🔄 **Web開発との対比**: Web での画像最適化（WebP変換、適切なサイズ指定）と同じ考え方です。

### フレームレート

```csharp
void Start()
{
    // iOS では 30fps でも十分な場合が多い
    Application.targetFrameRate = 60; // or 30
}
```

### バッチング（描画コール削減）

```csharp
// 同じマテリアルを使うオブジェクトはバッチ処理される
// → マテリアルの種類を減らすことが重要

// Sprite Atlas の使用
// 複数のスプライトを1枚のテクスチャにまとめる
// = Web での CSS Sprite と同じ考え方！
```

> 🔄 **Web開発との対比**:
> - バッチング = CSSスプライト、SVGスプライトシート
> - Draw Call削減 = HTTPリクエスト数の削減
> - テクスチャ圧縮 = 画像のWebP/AVIF変換
> - Object Pooling = DOM要素の再利用（仮想スクロール）

### Object Pooling

```csharp
// ❌ Bad: 毎回生成・破棄
void SpawnBullet()
{
    GameObject bullet = Instantiate(bulletPrefab);
    Destroy(bullet, 3f);
}

// ✅ Good: オブジェクトプール
public class BulletPool : MonoBehaviour
{
    [SerializeField] private GameObject bulletPrefab;
    private Queue<GameObject> pool = new Queue<GameObject>();

    public GameObject GetBullet()
    {
        if (pool.Count > 0)
        {
            var bullet = pool.Dequeue();
            bullet.SetActive(true);
            return bullet;
        }
        return Instantiate(bulletPrefab);
    }

    public void ReturnBullet(GameObject bullet)
    {
        bullet.SetActive(false);
        pool.Enqueue(bullet);
    }
}
```

> 🔄 **Web開発との対比**: Object Pooling は React の仮想スクロール（react-window）の考え方と同じです。DOM要素を都度作成・破棄するのではなく、再利用します。

### ビルドサイズの削減

| 設定 | 説明 |
|------|------|
| Stripping Level | 未使用コードの削除 (= Tree Shaking) |
| Texture Compression | ASTC推奨 (= WebP圧縮) |
| Audio Compression | Vorbis / ADPCM |
| Managed Stripping Level | High |

> 💡 Unity の **Stripping** は、Web開発の **Tree Shaking** と全く同じ概念です！未使用のコードやアセットを削除してビルドサイズを小さくします。',
        ]);

        $ch4_2 = Chapter::create([
            'course_id' => $course4->id,
            'slug' => 'app-store-submission',
            'title' => 'App Store への提出',
            'title_en' => 'App Store Submission',
            'sort_order' => 2,
        ]);

        Lesson::create([
            'chapter_id' => $ch4_2->id,
            'slug' => 'app-store-connect',
            'title' => 'App Store Connect でのアプリ登録と審査提出',
            'title_en' => 'App Registration and Review Submission on App Store Connect',
            'sort_order' => 1,
            'xp_reward' => 25,
            'estimated_minutes' => 30,
            'content_md' => '## App Store への公開

ゲームを世界に届けましょう！

### App Store Connect での登録

1. **App Store Connect** にログイン
2. 「My Apps」→ 「+」 → 「New App」
3. 必要情報を入力

### 必要な素材

| 素材 | サイズ | 説明 |
|------|--------|------|
| アプリアイコン | 1024x1024 | 角丸なしの正方形 |
| スクリーンショット (6.7") | 1290x2796 | iPhone 15 Pro Max 用 |
| スクリーンショット (6.5") | 1284x2778 | iPhone 14 Plus 用 |
| スクリーンショット (5.5") | 1242x2208 | iPhone 8 Plus 用 |
| プレビュー動画 | 任意 | 30秒以内推奨 |

> 🔄 **Web開発との対比**: OGP画像やファビコンの設定と同じ作業です。ただし、App Store はサイズの規格が厳密です。

### Archive と Upload

```
Xcode での手順:
1. Product → Archive
2. Archives リストから最新を選択
3. Distribute App → App Store Connect
4. Upload
```

> 🔄 **Web開発との対比**: これは `git push` → CI/CD でデプロイ、のような流れです。ただし、デプロイ先が App Store であり、審査があります。

### 審査チェックリスト

App Store 審査に通るために確認すべきポイント：

1. **プライバシーポリシー**: URL が必要
2. **クラッシュしない**: 基本操作でクラッシュしないこと
3. **適切なコンテンツ**: 年齢レーティングに合った内容
4. **メタデータ**: 正確な説明文とスクリーンショット
5. **パフォーマンス**: 著しく遅くないこと
6. **オフライン動作**: ネットワーク不要なら記載

### 審査で よくあるリジェクト理由

| 理由 | 対策 |
|------|------|
| クラッシュ | TestFlight で十分テスト |
| 不十分な機能 | MVP でも一定の完成度を確保 |
| プレースホルダコンテンツ | ダミーテキスト・画像を残さない |
| バグが多い | QA テストを十分に行う |
| 説明と実際の違い | スクリーンショットを最新に |

> 💡 初回審査は 24〜48時間 かかることが多いです。リジェクトされても修正して再提出できるので、恐れずに提出しましょう！

### TestFlight での事前テスト

```
1. Xcode → Archive → Upload to App Store Connect
2. App Store Connect → TestFlight
3. テスターを追加（メール招待）
4. テスターにビルドを配信
```

> 🔄 **Web開発との対比**: TestFlight は、Web の ステージング環境 + ベータテスト配信ツール のようなものです。本番公開前に限定ユーザーにテストしてもらえます。

---

おめでとうございます！🎉 これで Unity を使った iOS ゲーム開発の一連の流れを学びました。

次のステップとして：
- 自分のオリジナルゲームを企画してみる
- 実際に App Store に公開してみる
- Unity Asset Store で素材を探してみる
- Shader や VFX で視覚効果を強化する',
        ]);

        // Course 5: Advanced Topics
        $course5 = Course::create([
            'slug' => 'advanced-unity',
            'title' => '応用編 - 設計パターンとベストプラクティス',
            'title_en' => 'Advanced - Design Patterns & Best Practices',
            'description' => 'ゲーム開発で使われる設計パターン、アセット管理、テスト手法など、プロレベルの開発に必要な知識を学びます。Web開発の設計パターンとの対比も解説。',
            'description_en' => 'Learn design patterns, asset management, testing, and professional-level development practices for games.',
            'icon' => '🏗️',
            'color' => '#8b5cf6',
            'sort_order' => 5,
            'estimated_hours' => 7,
            'difficulty' => 'advanced',
        ]);

        $ch5_1 = Chapter::create([
            'course_id' => $course5->id,
            'slug' => 'design-patterns',
            'title' => 'ゲーム開発の設計パターン',
            'title_en' => 'Game Development Design Patterns',
            'sort_order' => 1,
        ]);

        Lesson::create([
            'chapter_id' => $ch5_1->id,
            'slug' => 'observer-pattern',
            'title' => 'Observerパターン - イベント駆動設計',
            'title_en' => 'Observer Pattern - Event-Driven Design',
            'sort_order' => 1,
            'xp_reward' => 25,
            'estimated_minutes' => 25,
            'content_md' => '## Observerパターン

ゲーム開発で最も重要な設計パターンの一つです。

### Web開発での馴染み

あなたはすでにObserverパターンを使っています：

```typescript
// React - イベントハンドリング
<button onClick={handleClick}>Click me</button>

// Laravel - Event / Listener
Event::listen(OrderShipped::class, SendShipmentNotification::class);

// JavaScript - EventEmitter
emitter.on("playerDied", handlePlayerDeath);
```

### Unity での実装

```csharp
using UnityEngine;
using UnityEngine.Events;

// カスタムイベントの定義
[System.Serializable]
public class ScoreChangedEvent : UnityEvent<int> { }

public class ScoreManager : MonoBehaviour
{
    public static ScoreManager Instance { get; private set; }

    // イベントの宣言
    public ScoreChangedEvent OnScoreChanged = new ScoreChangedEvent();

    private int score = 0;

    void Awake()
    {
        Instance = this;
    }

    public void AddScore(int points)
    {
        score += points;
        // イベントを発火 - 全リスナーに通知
        OnScoreChanged.Invoke(score);
    }
}
```

```csharp
// リスナー側 - UIの更新
public class ScoreUI : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI scoreText;

    void Start()
    {
        // イベントを購読
        ScoreManager.Instance.OnScoreChanged.AddListener(UpdateScoreDisplay);
    }

    void OnDestroy()
    {
        // 購読解除（メモリリーク防止）
        ScoreManager.Instance.OnScoreChanged.RemoveListener(UpdateScoreDisplay);
    }

    private void UpdateScoreDisplay(int newScore)
    {
        scoreText.text = $"Score: {newScore}";
    }
}
```

> 🔄 **Web開発との対比**:

| Unity | Web |
|-------|-----|
| `UnityEvent` | `EventEmitter` / Custom Event |
| `AddListener()` | `addEventListener()` / `on()` |
| `RemoveListener()` | `removeEventListener()` / `off()` |
| `Invoke()` | `dispatchEvent()` / `emit()` |

### C# の delegate と event

```csharp
// より C# らしい書き方
public class GameEvents : MonoBehaviour
{
    // delegate で型定義
    public delegate void PlayerDiedHandler(int livesRemaining);
    // event で外部からの直接呼び出しを防ぐ
    public static event PlayerDiedHandler OnPlayerDied;

    public static void PlayerDied(int lives)
    {
        OnPlayerDied?.Invoke(lives);
    }
}

// 使用側
void OnEnable()
{
    GameEvents.OnPlayerDied += HandlePlayerDied;
}

void OnDisable()
{
    GameEvents.OnPlayerDied -= HandlePlayerDied;
}
```

> 💡 `OnEnable` で購読、`OnDisable` で解除するのが Unity のベストプラクティスです。React の `useEffect` で subscribe して cleanup で unsubscribe するのと同じ考え方です！',
        ]);

        Lesson::create([
            'chapter_id' => $ch5_1->id,
            'slug' => 'state-machine',
            'title' => 'ステートマシン - ゲームの状態管理',
            'title_en' => 'State Machine - Game State Management',
            'sort_order' => 2,
            'xp_reward' => 25,
            'estimated_minutes' => 25,
            'content_md' => '## ステートマシン

ゲームの状態管理は、Web開発の状態管理と共通する課題です。

### Web開発との対比

```typescript
// React - useReducer による状態管理
type GameState = "menu" | "playing" | "paused" | "gameOver";

function gameReducer(state: GameState, action: Action): GameState {
    switch (state) {
        case "menu":
            if (action.type === "START") return "playing";
            break;
        case "playing":
            if (action.type === "PAUSE") return "paused";
            if (action.type === "GAME_OVER") return "gameOver";
            break;
    }
    return state;
}
```

### Unity での状態管理

```csharp
public enum GameState
{
    Menu,
    Playing,
    Paused,
    GameOver
}

public class GameStateMachine : MonoBehaviour
{
    public static GameStateMachine Instance { get; private set; }

    public GameState CurrentState { get; private set; } = GameState.Menu;

    // 状態変更イベント
    public event System.Action<GameState> OnStateChanged;

    void Awake() => Instance = this;

    public void ChangeState(GameState newState)
    {
        if (CurrentState == newState) return;

        // 現在の状態を抜ける
        ExitState(CurrentState);

        // 新しい状態に入る
        CurrentState = newState;
        EnterState(newState);

        OnStateChanged?.Invoke(newState);
    }

    private void EnterState(GameState state)
    {
        switch (state)
        {
            case GameState.Menu:
                Time.timeScale = 1;
                // メニューUIを表示
                break;
            case GameState.Playing:
                Time.timeScale = 1;
                // ゲーム開始
                break;
            case GameState.Paused:
                Time.timeScale = 0; // 時間停止！
                // ポーズメニュー表示
                break;
            case GameState.GameOver:
                Time.timeScale = 0;
                // ゲームオーバー画面
                break;
        }
    }

    private void ExitState(GameState state)
    {
        // 各状態を抜けるときの処理
    }
}
```

> 🔄 **Web開発との対比**:
> - `GameState` enum = TypeScript の Union Type or enum
> - `ChangeState()` = Redux の `dispatch()` / React の `setState()`
> - `Time.timeScale = 0` = ゲーム全体のポーズ（Webにはない概念！）

### Animator Controller（ビジュアルステートマシン）

Unity には **Animator Controller** という、ステートマシンをGUIで構築できるツールがあります。

```
[Idle] ---(speed > 0.1)---> [Running]
[Running] ---(speed < 0.1)---> [Idle]
[Running] ---(jump)---> [Jumping]
[Jumping] ---(grounded)---> [Idle]
```

> 💡 Animator Controller はノードベースのビジュアルエディタです。コードを書かずに複雑な状態遷移を設計できます。Web開発で言えば、XState のビジュアライザーに近い存在です。',
        ]);
    }

    private function createBadges(): void
    {
        Badge::create([
            'slug' => 'first-lesson',
            'name' => '初めの一歩',
            'name_en' => 'First Step',
            'description' => '最初のレッスンを完了しました',
            'description_en' => 'Completed your first lesson',
            'icon' => '👣',
            'color' => '#6366f1',
            'type' => 'xp_milestone',
            'criteria' => ['xp' => 10],
        ]);

        Badge::create([
            'slug' => 'xp-100',
            'name' => 'ルーキー',
            'name_en' => 'Rookie',
            'description' => '100 XP を獲得しました',
            'description_en' => 'Earned 100 XP',
            'icon' => '🌟',
            'color' => '#f59e0b',
            'type' => 'xp_milestone',
            'criteria' => ['xp' => 100],
        ]);

        Badge::create([
            'slug' => 'xp-500',
            'name' => 'エキスパート',
            'name_en' => 'Expert',
            'description' => '500 XP を獲得しました',
            'description_en' => 'Earned 500 XP',
            'icon' => '💎',
            'color' => '#8b5cf6',
            'type' => 'xp_milestone',
            'criteria' => ['xp' => 500],
        ]);

        Badge::create([
            'slug' => 'streak-3',
            'name' => '3日連続',
            'name_en' => '3-Day Streak',
            'description' => '3日連続で学習しました',
            'description_en' => 'Studied for 3 consecutive days',
            'icon' => '🔥',
            'color' => '#ef4444',
            'type' => 'streak',
            'criteria' => ['days' => 3],
        ]);

        Badge::create([
            'slug' => 'streak-7',
            'name' => '1週間マスター',
            'name_en' => 'Week Master',
            'description' => '7日連続で学習しました',
            'description_en' => 'Studied for 7 consecutive days',
            'icon' => '🏆',
            'color' => '#f59e0b',
            'type' => 'streak',
            'criteria' => ['days' => 7],
        ]);

        // Course completion badges
        $courses = \App\Models\Course::all();
        foreach ($courses as $course) {
            Badge::create([
                'slug' => "complete-{$course->slug}",
                'name' => "{$course->title} 制覇",
                'name_en' => "{$course->title_en} Complete",
                'description' => "{$course->title} のすべてのレッスンを完了しました",
                'description_en' => "Completed all lessons in {$course->title_en}",
                'icon' => '🎓',
                'color' => $course->color,
                'type' => 'course_complete',
                'criteria' => ['course_id' => $course->id],
            ]);
        }
    }
}
