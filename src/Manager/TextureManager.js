import * as PIXI from 'pixi.js';
import Resource from 'Resource';
let TextureManager = /** @class */ (() => {
    class TextureManager {
        static initSheet() {
            TextureManager.Sheet["bg"] = PIXI.BaseTexture.from(Resource.Static.sheet[0]);
            TextureManager.Sheet["player"] = PIXI.BaseTexture.from(Resource.Static.sheet[1]);
            TextureManager.Sheet["ladder"] = PIXI.BaseTexture.from(Resource.Static.sheet[2]);
            return true;
        }
    }
    TextureManager.Sheet = {};
    return TextureManager;
})();
export default TextureManager;
