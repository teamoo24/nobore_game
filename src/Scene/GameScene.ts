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
let limitTime = 30;
// clickをチェックするプロパティ
let down:boolean = false;

let updateing:boolean =false;
/**
 * タイトルシーン
 */
export default class GameScene extends Scene  {
  private bg:PIXI.Sprite;
  private player:PIXI.Sprite;

  private player_1:PIXI.Texture;
  private player_2:PIXI.Texture;

  /**
   * コンストラクタ
   */
  constructor() {
    super();


    this.bg = new PIXI.Sprite(new PIXI.Texture(TextureManager.Sheet["bg"],new PIXI.Rectangle(0,0,320,640)));
    this.bg.anchor.set(0,0)
    this.bg.position.set(0,-320);
    this.bg.interactive = true;
    this.bg.buttonMode = true;
    this.bg.on("pointerdown", this.downevent).on("touchstart", this.downevent)
           .on("pointerup",this.upevent).on("touchend",this.upevent)
    this.addChild(this.bg)

    for(let i = 0; i<6; i++) {
      const ladder= new PIXI.Sprite(new PIXI.Texture(TextureManager.Sheet["ladder"]))
      ladder.position.set(160-16, 320-i*64)
      this.addChild(ladder)
    } 
    this.player_1 = new PIXI.Texture(TextureManager.Sheet["player"],new PIXI.Rectangle(playerw,playerh*2,playerw,playerh))
    this.player_2 = new PIXI.Texture(TextureManager.Sheet["player"],new PIXI.Rectangle(playerw*3,playerh*2,playerw,playerh))

    this.player = new PIXI.Sprite(new PIXI.Texture(TextureManager.Sheet["player"],new PIXI.Rectangle(playerw*2,playerh*2,playerw,playerh)));
    
    this.player.position.set(160-32,160)
    this.addChild(this.player)
  }

  public downevent = () => down=true;
  public upevent = () => down=false;
  

  public click_check():void {
    this.player.texture = down?this.player_1:this.player_2
  }
  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);
    this.click_check();
  }

}