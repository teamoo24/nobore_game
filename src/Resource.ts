/**
 * リソースの URL や命名規則のマスタ
 */
// こちはリリース用
//const for_dripcoke = ""

// こっちはローカル用
const for_dripcoke = ""
const Resource = Object.freeze({
	Static: {
		logo: [
			for_dripcoke+'assets/image/logo/logo.png',
		],
		sheet: [
			for_dripcoke+'assets/image/sprite/bg.png',
			for_dripcoke+'assets/image/sprite/player.png',
			for_dripcoke+'assets/image/sprite/ladder.png',
			for_dripcoke+'assets/image/sprite/end.png',
		]
	},
	Sound: {
		bgm: [
			for_dripcoke+'assets/sound/bgm/game_main.mp3'
		]
	}
})

export default Resource;
