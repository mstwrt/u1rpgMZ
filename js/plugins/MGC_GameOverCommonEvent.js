//=============================================================================
 /*:
 * @target MZ
 * @plugindesc Game Over Common Event [Version 1.0]
 * @author ManuGamingCreations
 * @url https://manugamingcreations.itch.io
 *
 * @help
 * Plays a common event instead going to the game over screen.
 * 
 * 
 * 
 * @param commonEvent
 * @text Common Event ID
 * @desc Run this Common Event instead of Game Over screen.
 * @type common_event
 * @default 1
 * 
 */

 (() => {
    'use strict';

    // Script
    const scriptSrc = document.currentScript.src;
    const scriptFilename = scriptSrc.substring(scriptSrc.lastIndexOf('/')+1);
    const scriptFilenameSpaceFix = scriptFilename.replace(/%20/g, " ");
    const script = scriptFilenameSpaceFix.substring(0, scriptFilenameSpaceFix.lastIndexOf('.js'));

    // Parameters
    const parameters = PluginManager.parameters(script);
    const commonEventID = parseInt(parameters['commonEvent']);

    // Game Over - SceneManager behaviour
    SceneManager.goto = function(sceneClass) {
        let nextSceneClass = sceneClass;
        let isNextSceneGameOver = nextSceneClass == Scene_Gameover;
        let isCurrentSceneBattle = this._scene instanceof Scene_Battle;

        
        if (nextSceneClass) {
            if(isNextSceneGameOver)
            {
                if(isCurrentSceneBattle)
                {
                    SceneManager.pop();     
                }
                $gameTemp.reserveCommonEvent(commonEventID);
                console.log('reserve Common Event');
            }
            else
            {
                this._nextScene = new nextSceneClass();
                if (this._scene) {
                    this._scene.stop();
                }
            }
        }
    };

    // Game Over - Scene Base checkGameOver behaviour
    Scene_Base.prototype.checkGameover = function(){};
    
})()