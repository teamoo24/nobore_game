import * as PIXI from 'pixi.js';
import Resource from 'Resource';

export default class TextureManager {
	public static Sheet:{[key:string]:PIXI.BaseTexture} = {}
	
	public static initSheet():boolean {
		TextureManager.Sheet["bg"] = PIXI.BaseTexture.from(Resource.Static.sheet[0])
		TextureManager.Sheet["player"] = PIXI.BaseTexture.from(Resource.Static.sheet[1])
		TextureManager.Sheet["ladder"] = PIXI.BaseTexture.from(Resource.Static.sheet[2])
		return true;
	}
}