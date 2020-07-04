import * as PIXI from 'pixi.js';
import GameManager from 'Manager/GameManager';
import TextureManager from 'Manager/TextureManager';

import Scene from 'Scene/Scene';
import LogoScene from 'Scene/LogoScene';

const playerw:number = 64
const playerh:number = 64

// スコアを格納するプロパティ設定
let score = 0;
// 制限時間を設定するプロパティ設定
let limitTime = 3000;
// clickをチェックするプロパティ
let down:boolean = false;
// バックグラウンドのy値
let bg_y:number = -320

let game:boolean = false;
// スコアと制限時間を表示するテキストのスタイル
const textStyle = new PIXI.TextStyle({
  fontSize: 20,
  fill: 0xffffff
});

let ladder:{[key:number]:PIXI.Sprite} = {}
let background:PIXI.Sprite

let game_over:boolean = false;

/**
 * タイトルシーン
 */
export default class GameScene extends Scene  {
  private player:PIXI.Sprite;
  private game_over_sprite:PIXI.Sprite;

  private time:PIXI.Text;
  private score:PIXI.Text;

  private player_1:PIXI.Texture;
  private player_2:PIXI.Texture;

  // ゲームマネジャからrendererを持ってくる
  private renderer = GameManager.instance.game.renderer;

  /**
   * コンストラクタ
   */
  constructor() {
    super();

    for(let i = 0; i<7; i++) {
      ladder[i]= new PIXI.Sprite(new PIXI.Texture(TextureManager.Sheet["ladder"]))
      ladder[i].position.set(160-16, this.renderer.height-(i-1)*64)
    }

    background = new PIXI.Sprite(new PIXI.Texture(TextureManager.Sheet["bg"],new PIXI.Rectangle(0,0,320,640)));
    background.anchor.set(0,0)
    background.position.set(0,-this.renderer.height);
    background.interactive = true;
    background.buttonMode = true;
    background.on("pointerdown", this.downevent).on("pointerup",this.upevent)
           .on("pointerdown",this.up).on("pointerup",this.up)

    

    this.player_1 = new PIXI.Texture(TextureManager.Sheet["player"],new PIXI.Rectangle(playerw,playerh*2,playerw,playerh))
    this.player_2 = new PIXI.Texture(TextureManager.Sheet["player"],new PIXI.Rectangle(playerw*3,playerh*2,playerw,playerh))

    this.player = new PIXI.Sprite(new PIXI.Texture(TextureManager.Sheet["player"],new PIXI.Rectangle(playerw*2,playerh*2,playerw,playerh)));
    
    this.player.position.set(160-32,160)

    this.time = new PIXI.Text('TIME:' + Math.floor(limitTime/100), textStyle);
    this.time.anchor.set(0, 0);
    this.time.position.set(0, 0);

    this.score = new PIXI.Text('SCORE:' + score, textStyle);
    this.score.anchor.set(1, 0);
    this.score.position.set(this.renderer.width, 0);

    this.game_over_sprite = new PIXI.Sprite(new PIXI.Texture(TextureManager.Sheet["gameover"]))
    this.game_over_sprite.anchor.set(.5,.5);
    this.game_over_sprite.position.set(this.renderer.width/2, this.renderer.height/2)
    this.game_over_sprite.alpha = 0;
    this.addChilds()
  }

  public addChilds() {
    this.addChild(background)
    for(let key in ladder) {
      if(ladder.hasOwnProperty(key)) {
        this.addChild(ladder[key])
      }
    }
    this.addChild(this.player);
    this.addChild(this.time);
    this.addChild(this.score);
    this.addChild(this.game_over_sprite);
  }

  public up() {
    if(!game_over) {
      score++;
      background.y+=2;
      background.y = (background.y>0)?-320:background.y

      if(!game_over)this.player.texture = down?this.player_1:this.player_2

      for(let key in ladder) {
        if(ladder.hasOwnProperty(key)) {
          ladder[key].y++;
          ladder[key].y = (ladder[key].y>320)?-64:ladder[key].y
        }
      }
    }  
  }

  public downevent = () => down=true;
  public upevent = () => down=false;
  
  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);
    
    game_over = (limitTime<=0)?true:false;
    this.game_over_sprite.alpha = (game_over)?1:0;

    if(!game_over)limitTime--;

    this.time.text = 'TIME:' + Math.floor(limitTime/100)
    this.score.text = 'SCORE:' + score
  }
}