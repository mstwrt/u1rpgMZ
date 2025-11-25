//==========================================================================
// EliMZ_StaticExp.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book
@orderAfter EliMZ_EnemyClass

@plugindesc ♦1.2.0♦ Sets an static exp value to level up.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-static-exp-for-rpg-maker-mz/rate?source=game

@help
★★★★★ Rate the plugin! Please, is very important to me ^^
● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
Features
============================================================================

• Set a static exp value that the actors will need to have to level up.
• Set different static exp value based on class id.

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/100YZ_SNI0g6r8ueBmW3hoSIk1LKWIJ7t1jyb3YNGvl0/edit?usp=sharing

============================================================================

@param default
@text Static value
@type text
@desc Choose the default static exp value to level up.
@default 100

@param classExp
@text Class Static Exp
@type text[]
@desc Choose the static exp value for each class.
[ClassId, value]
@default []

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_StaticExp = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
Eli.StaticExp = {

    Parameters: class {
        constructor(parameters){
            this.default = Number(parameters.default)
            this.classExp = this.parseClassExp(JSON.parse(parameters.classExp))
        }

        parseClassExp(parameters){
            const obj = {}

            for(const param of parameters){
                const [classId, exp] = param.split(",")
                obj[classId.trim()] = Number(exp)
            }

            return obj
        }
    },

    initialize(){
        this.initParameters()
    },

    initParameters(){
        this.parameters = new this.Parameters(PluginManager.parameters("EliMZ_StaticExp"))
    },
    
    getParam(){
        return this.parameters
    },

}

{

const Plugin = Eli.StaticExp
const Alias = {}

Plugin.initialize()

/* ------------------------------- SCENE BOOT ------------------------------- */
Alias.Scene_Boot_processDataClasses = Scene_Boot.prototype.processDataClasses
Scene_Boot.prototype.processDataClasses = function(data){
    Alias.Scene_Boot_processDataClasses.call(this, data)
    Plugin.getParam().classExp[data.id] = Number(data.meta.ClassExp) || Plugin.getParam().classExp[data.id] || Plugin.getParam().default
}

/* ------------------------------- GAME ACTOR ------------------------------- */
Game_Actor.prototype.expForLevel = function(level) {
    const exp = Plugin.getParam().classExp[this._classId]
    const nextLevel = exp * (level-1)

    return nextLevel
}

/* ------------------------------- GAME ENEMY ------------------------------- */
if(Imported.Eli_EnemyClass){

    Alias.Game_Enemy_expForLevel = Game_Enemy.prototype.expForLevel
    Game_Enemy.prototype.expForLevel = function(level) {
        if(this._classId > 0){
            const exp = Plugin.getParam().classExp[this._classId]
            const nextLevel = exp * (level-1)

            return nextLevel
        }else{
            return Alias.Game_Enemy_expForLevel.call(this, level)
        }

    }
    
}

}