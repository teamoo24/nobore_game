import * as PIXI from 'pixi.js';
import sound from 'pixi-sound';
import Resource from 'Resource';

export default class SoundManager {

	public static bgmvolume:number;

	public static bgm:{[key:string]:sound.Sound} = {}

	public static init_sound():boolean {

		SoundManager.bgmvolume = 1;

		//////////////////////////////bgm
		SoundManager.bgm["game_main"] = sound.Sound.from({
			url:Resource.Sound.bgm[0]
		});
		SoundManager.bgm["game_main"].loop = true;


		this.set_volume()
		
		return true;
	}

	public static set_volume():boolean {
		//seサウンドの連想配列のボリュームを設定
		for (let key in SoundManager.bgm) {
			if(SoundManager.bgm.hasOwnProperty(key)) {
				SoundManager.bgm[key].volume = SoundManager.bgmvolume;
			}
		}
		return true
	}
}