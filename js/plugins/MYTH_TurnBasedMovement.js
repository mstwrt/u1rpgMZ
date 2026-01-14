//=============================================================================
// MYTH_TurnBasedMovement.js
//=============================================================================

/*:
 *
 * @author Isiah Brighton
 * @plugindesc v2.0.1 Turns all map movement into a turn-based system, and
 * adds Stamina as a resource for the player's movement.
 * @target MZ
 * 
 * @command setMoveFree
 * @text Set Move Free
 * @desc Sets whether all movement is "free," thus determining if turn-based movement is disabled.
 * 
 *   @arg enabled
 *   @type boolean
 *   @default false
 *   @desc If passing 'true,' will disable turn-based movement and allow free movement
 * for everything. False will re-enable it. Useful for cutscenes.
 * 
 * @command setStamina
 * @text Set Stamina Enabled
 * @desc Enables or disables Stamina.
 * 
 *   @arg enabled
 *   @type boolean
 *   @default true
 *   @desc Determines if Stamina is enabled or disabled.
 * 
 * @command hideStaminaBar
 * @text Hide Stamina Bar
 * @desc Hides the Stamina Bar from the Map screen.
 * 
 * @command showStaminaBar
 * @text Show Stamina Bar
 * @desc Shows the Stamina Bar on the Map screen.
 * 
 * @param section0
 * @text Movement Settings
 * 
 *  @param updateOffscreenEvents
 *  @parent section0
 *  @text Update Offscreen Events?
 *  @type boolean
 *  @default true
 *  @desc This causes events to move even when offscreen. Impacts performance on larger maps but keeps events synchronized.
 * 
 * @param section1
 * @text Stamina Settings
 * 
 * @param useStamina
 * @parent section1
 * @text Use Stamina?
 * @type boolean
 * @default false
 * @desc If set to false, ignore every parameter in this section.
 * 
 * @param initialStamina
 * @parent section1
 * @text Starting Max Stamina
 * @type number
 * @min 1
 * @default 100
 * @desc The amount of stamina for the player to initialize with.
 * 
 * @param overhealStamina
 * @parent section1
 * @text Overheal Stamina?
 * @type boolean
 * @default true
 * @desc If set to true, items that heal stamina will increase max stamina by half if consumed when already at max.
 * 
 * @param section2
 * @text Stamina Gain/Loss
 * @parent section1
 * 
 *   @param defaultStamLoss
 *   @type number
 *   @decimals 2
 *   @default -1
 *   @min -999
 *   @parent section2
 *   @text Default Amount
 *   @desc The amount of Stamina gained/lost per step by default.
 *   
 *   @param terrainTags
 *   @text Terrain Tags
 *   @parent section2
 *   @type struct<TerrainTag>[]
 *   @default []
 *   @desc You can give specific Terrain Tags an amount of Stamina to gain/lose when stepping over them, overriding the default.
 *   
 *   @param regions
 *   @text Regions
 *   @parent section2
 *   @type struct<Region>[]
 *   @default []
 *   @desc Regions override Terrain Tags when determining the amount of Stamina gained/lost.
 * 
 *   @param staminaOnFoot
 *   @parent section2
 *   @text Gain/Lose on Foot?
 *   @type boolean
 *   @default true
 *   @desc If true, you will gain/lose stamina when moving without a vehicle.
 * 
 *   @param staminaInVehicles
 *   @parent section2
 *   @text Gain/Lose in Vehicles?
 *   @type boolean
 *   @default false
 *   @desc If true, you will gain/lose stamina when moving while using a vehicle
 * 
 * @param section3
 * @parent section1
 * @text Stamina Effects
 * 
 *   @param commonEvent
 *   @text Common Event at 0 Stamina
 *   @parent section3
 *   @type common_event
 *   @default 0
 *   @desc What common event, if any, to execute when the player reaches 0 stamina.
 *   
 *   @param disableMovement
 *   @text Disable Movement at 0 Stamina?
 *   @type boolean
 *   @default false
 *   @parent section3
 *   @desc If set to true, the player will skip their turns when trying to move with 0 stamina.
 * 
 *   @param changeHealth
 *   @text Health Gained/Lost
 *   @parent section3
 *   @type boolean
 *   @default true
 *   @desc Whether or not spending Stamina affects the party's HP.
 * 
 * 
 *   @param stepsToHeal
 *   @parent changeHealth
 *   @text Steps Taken to Heal
 *   @type number
 *   @min 1
 *   @default 1
 *   @desc Determine how many steps the player must take while consuming stamina to heal.
 *   @default 2
 * 
 *   @param healingFormula
 *   @parent stepsToHeal
 *   @text Health Gained
 *   @desc The formula for health gained per step taken when consuming Stamina.
 *   @default Math.max(Math.floor(actor.mhp * 0.01), 1)
 * 
 *   @param stepsToDamage
 *   @parent changeHealth
 *   @text Steps Taken to Damage
 *   @type number
 *   @min 1
 *   @default 1
 *   @desc Determines how many steps the player must take while at 0 stamina to take damage.
 * 
 *   @param damageFormula
 *   @parent stepsToDamage
 *   @text Health Lost per Step
 *   @desc The formula for health lost per step taken when at 0 Stamina.
 *   @default 1
 * 
 *   @param allowDeath
 *   @parent changeHealth
 *   @text Allow Death?
 *   @type boolean
 *   @default true
 *   @desc If set to true, actors can die from damage taken by taking steps with 0 Stamina.
 * 
 * @param staminaBar
 * @text Stamina Bar (Map)
 * @parent section1
 * @type struct<StaminaBar>
 * @default {"frameImage":"stambarframe","barPosition":"{\"x\":\"8\",\"y\":\"8\"}","barImage":"stambar","barOffset":"{\"x\":\"4\",\"y\":\"4\"}","drawText":"true","textPosition":"{\"x\":\"500\",\"y\":\"3\"}","fontSettings":"{\"face\":\"GameFont\",\"size\":\"26\"}"}
 * @desc The stamina bar appearance on the map.
 * 
 * @param staminaBarMenu
 * @text Stamina Bar (Menu)
 * @parent section1
 * @type struct<StaminaBar>
 * @default {"frameImage":"stambarframemenu","barPosition":"{\"x\":\"18\",\"y\":\"18\"}","barImage":"stambarmenu","barOffset":"{\"x\":\"0\",\"y\":\"0\"}","drawText":"true","textPosition":"{\"x\":\"120\",\"y\":\"6\"}","fontSettings":"{\"face\":\"GameFont\",\"size\":\"26\"}"}
 * @desc The stamina bar appearance inside menus.
 * 
 * @help
 *
 * =============================================================================
 *                                   Overview
 * =============================================================================
 * This plugin will make map movement turn-based similar to that of the Mystery 
 * Dungeon or Etrian Odyssey games. All events will wait for the player to move 
 * before moving themselves.
 * 
 *  If events are set to different speeds from the player they will move at
 *  different rates. For example, an event set to x2 Slower will move one time
 *  for every 2 moves the player makes, while an event set to x2 Faster will
 *  move two times for every 1 move the player makes, assuming the player's
 *  speed is set to Normal.
 * 
 * Events must have their movement Frequency set to 5: Highest, or else their
 * turns will be skipped if the player moves fast enough. For the same reason,
 * this plugin does not support player dashing. You will need another plugin 
 * to disable dashing.
 * 
 * Galv's Disable Dash plugin is free: 
 *     https://galvs-scripts.com/2016/05/24/mv-disable-dash/
 * 
 * When setting a Move Route for an event without the <TBM Free Move> tag,
 * ensure that 'Skip If Cannot Move' is unchecked.
 * 
 * Additionally, this plugin has a "stamina" feature, which allows the
 * party to heal while walking as long as they have stamina, and take damage
 * every step if they don't.
 *
 * 
 * =============================================================================
 *                                Event Notetags
 * =============================================================================
 *
 * Inside an event's Note section, put: 
 *     <TBM Free Move>
 * This will allow the event to move freely without being affected by the turn-
 * based movement.
 * 
 * Events which never move do not need this notetag.
 * 
 * 
 * =============================================================================
 *                              Event Page Comments
 * =============================================================================
 * 
 * In addition to an event's Note section, you can also leave comments inside
 * an event's pages. The event will only have free move if its current active
 * page has the comment.
 *
 * The comment to leave is still:
 *     <TBM Free Move>
 *     
 * If you are using any event spawning plugin, use this system instead of
 * event notes for spawned events.
 * 
 * =============================================================================
 *                                 Script Calls
 * =============================================================================
 * 
 *     Myth.TBM.setMoveFree(true/false)
 * If passing 'true,' will disable turn-based movement and allow free movement
 * for everything. False will re-enable it. Useful for cutscenes.
 * 
 * 
 *     Myth.TBM.skipTurn($gamePlayer)
 * This will cause the player to pass their turn.
 * 
 *     Myth.TBM.skipTurn(this)
 * When set within a movement route set to move an event, this will cause the
 * event to pass their turn.
 * 
 * =============================================================================
 *                       Update Offscreen Events Parameter
 * =============================================================================
 * 
 * RPG Maker prevents events that are too far from the player from updating,
 * as a performance saving measure. On large maps with lots of events this
 * makes a big difference, so if your project makes use of these you may want
 * to keep the Update Offscreen Events parameter off.
 * 
 * However, this can cause events to become desynched in a turn-based system.
 * If Update Offscreen Events is turned off, events will only take their
 * turn if they're close enough to the screen.
 * 
 * 
 * =============================================================================
 *                                 Stamina
 * =============================================================================
 * 
 * TurnBasedMovement includes a Stamina system, in which the player taking
 * steps in the overworld reduces their Stamina, potentially affecting their
 * health and executing a common event when their Stamina reaches 0.
 * 
 * 
 * =============================================================================
 *                        Health Gained/Lost Damage Formulas
 * =============================================================================
 * 
 * If the player is set to heal/take damage when spending Stamina, the entire
 * party will heal/take damage.
 * 
 * The damage formulas just like a skill's damage formula, except that both a 
 * and b are the target. In addition, you have access to two more variables:
 * 
 * staminaSpent - the amount of stamina gained/lost on this step
 * maxStamina - the current Max Stamina
 * 
 * Note that when the player's Stamina is 0, staminaSpent still retains its
 * value. This means that your damage formula at 0 Stamina can reflect how
 * much Stamina the player *would* have lost if they'd had any.
 * 
 * =============================================================================
 *                               Skill/Item Notetags
 * =============================================================================
 * 
 *     <TBM Stamina: X>
 * When this skill/item is used, the player will gain X stamina.
 * 
 * You can use a formula inside this notetag, like so:
 *     <TBM Stamina: maxStamina * 0.3 + $gameParty.leader().level>
 * 
 * The above example, the item would regain 30% of the player's current maximum
 * stamina, and then an additional amount of stamina equal to the party 
 * leader's current level.
 * 
 * Variables to use in the formula:
 * 
 *     maxStamina - the current Max Stamina
 *     stamina - the player's current Stamina.
 * 
 * 
 * This will cause a skill/item to increase the player's maximum stamina by
 * half the value of the <Increase Stamina> formula if at time of use the
 * player's stamina is full.
 * 
 * Example:
 *     <TBM Stamina: 50>
 * 
 * The above notetags would cause the player to restore up to 50 stamina,
 * but if they were already at their Max Stamina they would instead increase
 * their Max Stamina by 25.
 * 
 * Alternatively, you can increase Max Stamina directly with the following
 * notetag:
 * 
 *     <TBM Max Stamina: X>
 * 
 * This also accepts a formula. Note that whenever Max Stamina increases, the
 * player's current stamina also recovers that same amount.
 * 
 * Finally, you can return the player to their original Max Stamina using
 * the following notetag:
 * 
 *     <TBM Reset Max Stamina>
 * 
 * =============================================================================
 *                            Terrain Tags and Regions
 * =============================================================================
 * 
 * You can set specific Terrain Tags and Regions to take different amounts
 * of stamina to step on.
 * 
 * Terrain Tags override the default stamina cost of a tile, and Regions
 * override Terrain Tags.
 * 
 * =============================================================================
 *                               Plugin Commands
 * =============================================================================
 * 
 *     SetMoveFree true
 *     SetMoveFree false
 * 
 * Disables/enables turn-based movement. "true" will allow free movement, which
 * is useful for cutscenes. "false" will return to turn-based movement.
 * 
 *     SetStamina true
 *     SetStamina false
 * 
 * Enables/disables Stamina. 
 * 
 *     HideStaminaBar
 * 
 * Hides the stamina bar on the map.
 * 
 *     ShowStaminaBar
 * 
 * Shows the stamina bar on the map.
 * 
 * =============================================================================
 *                            Stamina Script Calls
 * =============================================================================
 *
 *    Myth.TBM.setStamina(true/false)
 * 
 * Enables/disables Stamina.
 * 
 *    Myth.TBM.hideStaminaBar();
 *    Myth.TBM.showStaminaBar();
 *    
 * Hides/shows the stamina bar on the map.
 * 
 * $gamePlayer.increaseMaxStamina(amount)
 * 
 *    Increases the player's Max Stamina by the specified amount.
 *    
 * $gamePlayer.resetMaxStamina()
 * 
 *    Sets the player's Max Stamina back to the default amount specified
 *    through plugin parameters.
 *    
 * $gamePlayer.recoverStamina(amount)
 * 
 *    Increases the player's current Stamina. Negative value to decrease it.
 *    
 *    
 * =============================================================================
 *   Version History
 * =============================================================================
 *
 * v2.0.1 - Fixed bug that prevented events from moving again if their Event
 *          Page had multiple Movement Routes.
 *          Improved performance.
 * 
 * v2.0.0 - Added Stamina system
 *        - Fixed bug preventing event-page-specific tag from working properly
 *        - Events running into walls (or each other) no longer softlocks game
 *        - Added Update Offscreen Events parameter
 *        - Fixed bug where only the first double-speed event would move 2 tiles
 *        - Dashing no longer breaks turn-based movement. 
 *        - System now properly recognizes whether an event has an active
 *          movement route or not.
 * 
 * v1.1.0 - Changed plugin name
 *        - Added per-event page TBM settings.
 *        - Fixed crash when using spawned events.
 * 
 * v1.0.2 - Fixed bug where you can clip through walls after skipping turns.
 * 
 * v1.0.1 - Added compatibility with the following Movement Commands:
 *        -Jump...
 *        -All Turn commands
 * 
 * v1.0.0 - Finished plugin
 * 
 * =============================================================================
 *   Contact Information
 * =============================================================================
 *
 * This tool was developed by folks at MythAtelier LLC. We make Games that Care.
 *
 * Need more tools for your project? Be sure to check out our other plugins here:
 * https://itch.io/c/1695699/tools-plugins
 *
 * Have any questions? Run into any bugs? Want to chat? Best place to reach us:
 * https://discord.gg/wRk4XHF5tZ
 *
 * If you like this plugin and want to support us, please give our Patreon a look:
 * https://www.patreon.com/mythatelier
 *
 *
 */

/*~struct~TerrainTag:
 *
 * @param id
 * @text Terrain Tag
 * @type number
 * @default 0
 * @max 7
 * @desc The Terrain Tag ID that the player will gain/lose Stamina for walking over.
 * 
 * @param amount
 * @text Amount
 * @type number
 * @decimals 2
 * @min -999
 * @default -1
 * @desc The amount of stamina gained/lost when walking over this tile.
 *
 * 
 */
/*~struct~Region:
 *
 * @param id
 * @text Region ID
 * @type number
 * @default 0
 * @desc The Region ID that the player will gain/lose Stamina for walking over. Overrides terrain tags.
 * 
 * @param amount
 * @text Amount
 * @type number
 * @decimals 2
 * @min -999
 * @default -1
 * @desc The amount of stamina gained/lost when walking over this tile.
 * 
 */

/*~struct~Coordinate:
 * @param x
 * @text X Coordinate
 * @type number
 * @min -10000
 * @default 0
 *
 * @param y
 * @text Y Coordinate
 * @type number
 * @min -10000
 * @default 0
 *
 */

/*~struct~StaminaBar:
 *
 * @param frameImage
 * @text Frame Image
 * @type file
 * @dir img/system
 * @desc The image used for the frame of the Stamina Bar.
 * 
 * @param barPosition
 * @parent frameImage
 * @text Bar Position
 * @type struct<Coordinate>
 * @desc The position for the Stamina Bar to appear.
 * 
 * @param barImage
 * @text Bar Image
 * @type file
 * @dir img/system
 * @desc The image used for the filled part of the Stamina Bar.
 * 
 * @param barOffset
 * @text Bar Offset
 * @parent barImage
 * @type struct<Coordinate>
 * @desc The position of the bar, relative to the top-left corner of the frame of the bar.
 * 
 * @param drawText
 * @text Draw Text?
 * @type boolean
 * @default true
 * @desc Whether or not the Stamina's values will be represented by text in addition to the bar.
 * 
 * @param textPosition
 * @parent drawText
 * @text Text Position
 * @type struct<Coordinate>
 * @desc The position of the text to display current Stamina values.
 * 
 * @param fontSettings
 * @parent drawText
 * @text Font Settings
 * @type struct<FontSettings>
 * @desc The font settings for the text.
 */

/*~struct~FontSettings:
 *
 * @param face
 * @text Font Face
 * @default GameFont
 * @desc The font face. Use "GameFont" for the project's default font.
 *
 * @param size
 * @text Font Size
 * @default 18
 * @desc The font size.
 *
 */

var Imported = Imported || {};

var Myth = Myth || {};
Myth.TBM = Myth.TBM || {};
Myth.TBM.version = 1.2;

Myth.Parameters = PluginManager.parameters('MYTH_TurnBasedMovement');

//=============================================================================
// Myth.Util
//=============================================================================
// #region Myth.Util

Myth.Util = Myth.Util || {};
Myth.Util.usingMZ = (Utils.RPGMAKER_NAME == "MZ");

Myth.Util.getFontFace = function (faceName)
{
	if (faceName.toLowerCase() == 'gamefont')
	{
		if (Myth.Util.usingMZ)
			faceName = $gameSystem.numberFontFace();
		else
			faceName = Window_Base.prototype.standardFontFace();
	}

	return faceName;
}

Myth.Util.castMembersToNumber = function (object)
{
	for (var property in object)
	{
		var value = object[property];
		if (!isNaN(Number(value)))
			object[property] = Number(value);
		else if (typeof value == 'string')
		{
			try
			{
				object[property] = JSON.parse(value)
				Myth.Util.castMembersToNumber(object[property]);
			}
			catch (e) { };

		}
		else
		{
			try
			{
				Myth.Util.castMembersToNumber(object[property]);
			}
			catch (e) { };
		}
	}
}

// #endregion
//Myth.TBM.useStamina = eval(parameters['Use Stamina?']);

Myth.TBM.updateOffscreenEvents = JSON.parse(Myth.Parameters.updateOffscreenEvents);

Myth.TBM.useStamina = JSON.parse(Myth.Parameters.useStamina);
Myth.TBM.initialStamina = Number(Myth.Parameters.initialStamina);
Myth.TBM.flassEffect = {
	red: 255,
	green: 0,
	blue: 0,
	intensity: 70,
	duration: 20
}

Myth.TBM.disableMovementWithoutStamina = JSON.parse(Myth.Parameters.disableMovement);
Myth.TBM.staminaOnFoot = JSON.parse(Myth.Parameters.staminaOnFoot);
Myth.TBM.staminaInVehicles = JSON.parse(Myth.Parameters.staminaInVehicles);

Myth.TBM.staminaCommonEvent = Number(Myth.Parameters.commonEvent);

Myth.TBM.changeHealth = JSON.parse(Myth.Parameters.changeHealth);
Myth.TBM.staminaDamageFormula = Myth.Parameters.damageFormula;
Myth.TBM.staminaHealingFormula = Myth.Parameters.healingFormula
Myth.TBM.staminaAllowDeath = JSON.parse(Myth.Parameters.allowDeath);
Myth.TBM.stepsToHeal = Number(Myth.Parameters.stepsToHeal);
Myth.TBM.stepsToDamage = Number(Myth.Parameters.stepsToDamage);

Myth.TBM.overhealStamina = JSON.parse(Myth.Parameters.overhealStamina);


Myth.TBM.moveFree = false;

Myth.TBM.staminaBar = JSON.parse(Myth.Parameters.staminaBar);
Myth.Util.castMembersToNumber(Myth.TBM.staminaBar);
Myth.TBM.staminaBarMenu = JSON.parse(Myth.Parameters.staminaBarMenu);
Myth.Util.castMembersToNumber(Myth.TBM.staminaBarMenu);


Myth.TBM.defaultStamLoss = Number(Myth.Parameters.defaultStamLoss);

Myth.TBM.terrainInfo = JSON.parse(Myth.Parameters.terrainTags);
Myth.TBM.regionInfo = JSON.parse(Myth.Parameters.regions);

Myth.Util.castMembersToNumber(Myth.TBM.terrainInfo);
Myth.Util.castMembersToNumber(Myth.TBM.regionInfo);


Myth.TBM.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function ()
{
	Myth.TBM.Game_System_initialize.call(this);
	this.initTBMSettings();
}

Game_System.prototype.initTBMSettings = function ()
{
	this._moveFree = false;
	this._useStamina = Myth.TBM.useStamina;
	this._hideStaminaBar = !this._useStamina;
}

if (Myth.Util.usingMZ)
{
	PluginManager.registerCommand("MYTH_TurnBasedMovement", 'setMoveFree', args =>
	{
		var free = JSON.parse(args.enabled);
		Myth.TBM.setMoveFree(free);
	});

	PluginManager.registerCommand("MYTH_TurnBasedMovement", 'setStamina', args =>
	{
		var enabled = JSON.parse(args.enabled);
		Myth.TBM.setStamina(enabled);
	});

	PluginManager.registerCommand("MYTH_TurnBasedMovement", 'hideStaminaBar', args =>
	{
		Myth.TBM.hideStaminaBar();
	});

	PluginManager.registerCommand("MYTH_TurnBasedMovement", 'showStaminaBar', args =>
	{
		Myth.TBM.showStaminaBar();
	});
}
else
{
	Myth.TBM.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args)
	{
		Myth.TBM.Game_Interpreter_pluginCommand.call(this, command, args);

		command = command.toLowerCase();
		if (command == "setmovefree")
		{
			var free = args[0].toLowerCase() == "false" ? false : true;
			Myth.TBM.setMoveFree(free);
		}
		else if (command == 'setstamina')
		{
			var enabled = args[0].toLowerCase() == "false" ? false : true;
			Myth.TBM.setStamina(enabled);
		}
		else if (command == 'hidestaminabar')
		{
			Myth.TBM.hideStaminaBar();
		}
		else if (command == 'showstaminabar')
		{
			Myth.TBM.showStaminaBar();
		}
	}
}



Myth.TBM.setMoveFree = function (moveFree)
{
	$gameSystem._moveFree = moveFree;
	var events = $gameMap.events();
	if (moveFree)
	{
		for (var i = 0; i < events.length; i++)
		{
			var event = events[i];
			event._TBMtime = 0;
		}
		$gamePlayer._TBMtime = 0;
	}
	Myth.TBM.needsCheck = true;

}

Myth.TBM.setStamina = function (useStamina)
{
	$gameSystem._useStamina = useStamina;
}

Myth.TBM.hideStaminaBar = function()
{
	$gameSystem._hideStaminaBar = true;
	this.refreshStaminaBar();
}

Myth.TBM.showStaminaBar = function()
{
	$gameSystem._hideStaminaBar = false;
	this.refreshStaminaBar();
}

//This iterates through each event and finds out
//if the event can move.
//If no one can move, it "moves to the next turn" by decreasing 
//each event's time variable.
Myth.TBM.CheckAllMoved = function()
{
	var events = $gameMap.events();
	var size = events.length;
	var allMoved = true;
	var smallestMover = Number.MAX_SAFE_INTEGER;
	for (var i = 0; (i < size); i++)
	{
		var thisEvent = events[i];
		if (thisEvent == null) continue;
		if (!thisEvent.hasMovement()) continue;
		if (thisEvent.canFreeMoveTBM()) continue;
		var thisTime = thisEvent._TBMtime;
		smallestMover = Math.min(smallestMover, thisTime);
		if ((thisEvent.canMoveTBM()) && (thisEvent.isNearTheScreen()))
		{
			allMoved = false;
			thisEvent.isNearTheScreen()
			break;
			
		}
	
	}
	var pTime = $gamePlayer._TBMtime;
	smallestMover = Math.min(smallestMover, pTime);
	if (pTime < 1)
		allMoved = false;
	
	if (allMoved)
	{
		for (var i = 0; (i < size); i++)
		{
			var thisEvent = events[i];
			if (thisEvent == null) continue;
			if (!thisEvent.hasMovement()) continue;
			if (thisEvent.canFreeMoveTBM()) continue;
			var thisTime = thisEvent._TBMtime;
			if ((thisTime > 0))// && thisEvent.isNearTheScreen())
			{
				thisTime -= smallestMover;

			}
			thisEvent._TBMtime = thisTime;
		}
		pTime -= smallestMover;

		$gamePlayer._TBMtime = pTime;
			
	}

	return allMoved;
};


//This function skips the turn of the event that calls it.
//Use Myth.TBM.skipTurn(this) from inside an event.
Myth.TBM.skipTurn = function(character)
{
	var isPlayer = false;
	if (character instanceof Game_Player)
		isPlayer = true;

	character._TBMtime += Myth.TBM.GetTimeLossFromMovementSpeed(character.moveSpeed());
	character._skipping = true;

/*	if (isPlayer && Myth.TBM.useStamina)
		Myth.TBM.StaminAffectHealth(stamDec);*/
	if (isPlayer && $gameSystem._useStamina)
	{
		character.decreaseStamina();
	}
		
	
	Myth.TBM.needsCheck = true;
};


 Myth.TBM.GetTimeLossFromMovementSpeed = function(movementSpeed)
 {
	var timeLoss = 1;
	switch (movementSpeed)
	{
		case 6:
		timeLoss = 1; break;
		case 5:
		timeLoss = 2; break;
		case 4:
		timeLoss = 4; break;
		case 3:
		timeLoss = 8; break;
		case 2:
		timeLoss = 16; break;
		case 1:
		timeLoss = 32; break;
	}
	return (timeLoss);
}; 

Myth.TBM.getStaminaLoss = function (character)
{
	if (character.constructor != Game_Player) return 0;
	if (!$gameSystem._useStamina) return 0;

	var amount = Myth.TBM.defaultStamLoss;

	var terrainTag = $gameMap.terrainTag(character.x, character.y);
	var terrain = Myth.TBM.terrainInfo.find((t) => t.id == terrainTag);
	if (terrain)
	{
		amount = terrain.amount;
	}

	var regionId = $gameMap.regionId(character.x, character.y);
	var region = Myth.TBM.regionInfo.find((r) => r.id == regionId);
	if (region)
	{
		amount = region.amount;
	}

	return amount;
}

//Main function.
//All movements call this, it handles the logic of putting the other functions
//together.
Myth.TBM.Main = function(character)
{
	if (character.constructor == Game_Follower) return;

	var isPlayer = false;
	if (character instanceof Game_Player)
		isPlayer = true;
	
	if (character.isMovementSucceeded() || !isPlayer)
	{

		
		var time = character._TBMtime;
		var timePass = Myth.TBM.GetTimeLossFromMovementSpeed(character.moveSpeed());
		time += timePass;
		character._TBMtime = time;


		if (isPlayer && $gameSystem._useStamina)
		{
			character.decreaseStamina();
		}
			
	}
};

//When you move while you have remaining stamina, you recover health
//if you have 0 stamina, you instead take damage
//The formulas are managed here, and can be changed if necessary
Myth.TBM.StaminAffectHealth = function(stamDec)
{
	if (!this.changeHealth) return;
	if (stamDec == 0) return;

	$gamePlayer._stepsToHeal--;
	
	$gamePlayer._stepsToDamage--;

	var stam = $gamePlayer._TBMstamina;
	if (stam >= 0 && $gamePlayer._stepsToHeal <= 0)
	{
		$gamePlayer.resetStaminaSteps();

		$gameParty.members().forEach(function (actor)
		{
			//Recover health formula
			var d = Myth.TBM.evalHealingFormula(actor, stamDec);
			var KO = false;
			Game_Interpreter.prototype.changeHp.call(this, actor, d, KO);
		});
	}
	else if (stam <= 0 && $gamePlayer._stepsToDamage <= 0)
	{
		$gamePlayer.resetStaminaSteps();
		
		var takesDamage = false;
		$gameParty.members().forEach(function(actor)
		{
			//take damage formula
			var d = Myth.TBM.evalDamageFormula(actor, stamDec);
			if (d < 0)
				takesDamage = true;

			var KO = Myth.TBM.staminaAllowDeath;
			Game_Interpreter.prototype.changeHp.call(this, actor, d, KO);
		});
		
		var flash = Myth.TBM.flassEffect;
		if (flash.duration > 0 && takesDamage)
		{
			var array = [flash.red, flash.green, flash.blue, flash.intensity];
			$gameScreen.startFlash(array, flash.duration);
		}
	}
	if (stam <= 0)
	{
		$gamePlayer._TBMstamina = 0;
	}
};

Myth.TBM.evalDamageFormula = function (target, staminaSpent)
{
	try
	{
		var a = target;
		var actor = target;
		var b = target;
		var v = $gameVariables._data;
		var maxStamina = $gamePlayer._TBMstaminaMax;
		var sign = -1;
		var value = eval(Myth.TBM.staminaDamageFormula) * sign;
		if (isNaN(value)) value = 0;
		return value;
	} catch (e)
	{
		return 0;
	}
};

Myth.TBM.evalHealingFormula = function (target, staminaSpent)
{
	try
	{
		var a = target;
		var actor = target;
		var b = target;
		var v = $gameVariables._data;
		var maxStamina = $gamePlayer._TBMstaminaMax;

		var value = eval(Myth.TBM.staminaHealingFormula);
		if (isNaN(value)) value = 0;
		return value;
	} catch (e)
	{
		return 0;
	}
};

Myth.TBM.refreshStaminaBar = function ()
{
	var scene = SceneManager._scene;
	if (scene.constructor == Scene_Map)
	{
		scene.refreshStaminaBar();
	}
}

Game_CharacterBase.prototype.canMoveTBM = function ()
{
	var time = this._TBMtime || 0;
	return time < 1 || this.canFreeMoveTBM();
}

Game_CharacterBase.prototype.canFreeMoveTBM = function ()
{
	var moveFree = $gameSystem._moveFree;

	if (!moveFree && this.constructor == Game_Event)
	{
		if (this.moveFree)
			return true;

		var dataEvent = $dataMap.events[this.eventId()]
		if (dataEvent)
			moveFree = dataEvent.meta["TBM Free Move"];
	}

	return moveFree;
}

Myth.TBM.Game_CharacterBase_moveStraight = Game_CharacterBase.prototype.moveStraight;
Game_CharacterBase.prototype.moveStraight = function(direction) 
{
	var time = this._TBMtime || 0;

	var instanceType = 'event';
	if (this instanceof Game_Player)
		instanceType = 'player';
	else if (this instanceof Game_Follower)
		instanceType = 'follower';
		
	if (this.canMoveTBM())
	{
		if (instanceType == 'player')
		{
			if (this._TBMstamina <= 0 && Myth.TBM.disableMovementWithoutStamina && !this.canFreeMoveTBM())
			{
				this.setDirection(direction);
				Myth.TBM.skipTurn(this);
				return;
			}
		}
		Myth.TBM.Game_CharacterBase_moveStraight.call(this, direction);	

		if (!this.canFreeMoveTBM())
		{
			Myth.TBM.Main(this);
			Myth.TBM.needsCheck = true;
		}
	}
}

Myth.TBM.Game_CharacterBase_jump = Game_CharacterBase.prototype.jump;
Game_CharacterBase.prototype.jump = function (xPlus, yPlus)
{
	var time = this._TBMtime || 0;

	var instanceType = 'event';
	if (this instanceof Game_Player)
		instanceType = 'player';
	else if (this instanceof Game_Follower)
		instanceType = 'follower';

	if (this.canMoveTBM())
	{
		Myth.TBM.Game_CharacterBase_jump.call(this, xPlus, yPlus);
			
		if (!this.canFreeMoveTBM())
		{
			Myth.TBM.Main(this);
			Myth.TBM.needsCheck = true;
		}
	}
}

Myth.TBM.Game_CharacterBase_isNearTheScreen = Game_CharacterBase.prototype.isNearTheScreen;
Game_CharacterBase.prototype.isNearTheScreen = function ()
{
	if (Myth.TBM.updateOffscreenEvents)
		return true;
	return Myth.TBM.Game_CharacterBase_isNearTheScreen.call(this);
};

	
Myth.TBM.Game_CharacterBase_setMovementSuccess = Game_CharacterBase.prototype.setMovementSuccess;
Game_CharacterBase.prototype.setMovementSuccess = function(success) 
{
	var time = this._TBMtime;
	if (time >= 1 )
	{
		if (this._skipping)
		{
			this._skipping = false;
		}
		else
			success = false;
	}
	Myth.TBM.Game_CharacterBase_setMovementSuccess.call(this, success);
}

Myth.TBM.Game_CharacterBase_isMovementSucceeded = Game_CharacterBase.prototype.isMovementSucceeded;
Game_CharacterBase.prototype.isMovementSucceeded = function (x, y)
{
	if (this._skipping)
	{
		this._skipping = false;
	}

	var isSucceeded = Myth.TBM.Game_CharacterBase_isMovementSucceeded.call(this, x, y);
	return isSucceeded;

}

Myth.TBM.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function ()
{
	Myth.TBM.Game_CharacterBase_initMembers.call(this);
	this._TBMtime = 0;
	this._TBMstamina = 0;
	this._skipping = false;
}

Game_CharacterBase.prototype.hasMovement = function ()
{
	if (this._TBMtime > 0) return true;

	if (this._moveRoute == null) return false;

	var command = this._moveRoute.list[this._moveRouteIndex];
	if (command && command.code != 0)
	{
		if (this._moveType > 0) return true;
		if (this.isMoveRouteForcing()) return true;
	}
	return false;

	

	return false;
}

Myth.TBM.Game_Character_updateRoutineMove = Game_Character.prototype.updateRoutineMove;
Game_Character.prototype.updateRoutineMove = function ()
{
	if (this._TBMtime >= 1) return;

	Myth.TBM.Game_Character_updateRoutineMove.call(this);
};

Myth.TBM.Game_Player_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function ()
{
	Myth.TBM.Game_Player_initMembers.call(this);
	this._TBMstaminaMax = Myth.TBM.initialStamina;
	this._TBMstamina = this._TBMstaminaMax;
	this._stepsToHeal = Myth.TBM.stepsToHeal;
	this._stepsToDamage = Myth.TBM.stepsToDamage;
};

Game_Player.prototype.resetStaminaSteps = function ()
{
	this._stepsToHeal = Myth.TBM.stepsToHeal;
	this._stepsToDamage = Myth.TBM.stepsToDamage;
}

Game_Player.prototype.increaseMaxStamina = function (amount)
{
	this._TBMstaminaMax += amount;
	if (amount > 0)
		this._TBMstamina += amount;
	else if (this._TBMstamina > this._TBMstaminaMax)
		this._TBMstamina = this._TBMstaminaMax;

	Myth.TBM.refreshStaminaBar();
}

Game_Player.prototype.resetMaxStamina = function ()
{
	this._TBMstaminaMax = Myth.TBM.initialStamina;
	if (this._TBMstamina > this._TBMstaminaMax)
		this._TBMstamina = this._TBMstaminaMax;

	Myth.TBM.refreshStaminaBar();
}

Game_Player.prototype.recoverStamina = function (amount)
{
	this._TBMstamina += amount;
	if (this._TBMstamina > this._TBMstaminaMax)
		this._TBMstamina = this._TBMstaminaMax;

	Myth.TBM.refreshStaminaBar();
}

Game_Player.prototype.decreaseStamina = function()
{
	var vehicle = this.vehicle();
	if (vehicle == null && !Myth.TBM.staminaOnFoot) return;
	if (vehicle != null && !Myth.TBM.staminaInVehicles) return;

	var stam = this._TBMstamina;
	var stamDec = Myth.TBM.getStaminaLoss(this);
	stam += stamDec;
	if (stam > this._TBMstaminaMax)
		stam = this._TBMstaminaMax;

	if (stam <= 0 && this._TBMstamina > 0 && Myth.TBM.staminaCommonEvent != 0)
	{
		$gameTemp.reserveCommonEvent(Myth.TBM.staminaCommonEvent);
	}

	this._TBMstamina = stam;

	Myth.TBM.refreshStaminaBar();

	

	Myth.TBM.StaminAffectHealth(stamDec);
}

Game_Player.prototype.recoverStaminaFormula = function (formula)
{
	try
	{
		var user = this;
		var maxStamina = this._TBMstaminaMax;
		var stamina = this._TBMstamina;
		var target = user;
		var a = target;
		var actor = target;
		var b = target;
		var v = $gameVariables._data;

		var amount = eval(formula);
		return amount;

	}
	catch (e) { return 0; };

}

Game_Player.prototype.gainStaminaOrHalfMax = function (formula)
{
	var amount = this.recoverStaminaFormula(formula);
	if (this._TBMstamina < this._TBMstaminaMax)
		this.recoverStamina(amount);
	else
	{
		this.increaseMaxStamina(Math.floor(amount / 2));
	}
}


Myth.TBM.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function ()
{
	Myth.TBM.Game_Event_setupPage.call(this);
	var page = this.page(); if (!page) return;
	var list = this.list();
	if (!list) return;

	this.moveFree = false;
	for (var i = 0; i < list.length; i++)
	{
		var item = list[i];
		if (item.code == 108 || item.code == 408)
		{
			var param = item.parameters[0];
			if (param.match(/<?tbm free ?move>?/i))
			{
				this.moveFree = true;
			}
		}
	}
}

Myth.TBM.Game_Action_applyGlobal = Game_Action.prototype.applyGlobal;
Game_Action.prototype.applyGlobal = function ()
{
	var item = this.item();
	if (item._staminaRecoveryFormula)
	{
		this.applyStaminaRecovery(item);
	}
	if (item._maxStaminaIncreaseFormula)
	{
		this.applyMaxStaminaIncrease(item._maxStaminaIncreaseFormula);
	}
	if (item._resetMaxStamina)
	{
		$gamePlayer.resetMaxStamina();
	}
	Myth.TBM.Game_Action_applyGlobal.call(this);
}

Game_Action.prototype.applyStaminaRecovery = function (item)
{
	var formula = item._staminaRecoveryFormula;
	var increaseMax = Myth.TBM.overhealStamina;
	if (increaseMax)
		$gamePlayer.gainStaminaOrHalfMax(formula);
	else
	{
		var amount = $gamePlayer.recoverStaminaFormula(formula);
		$gamePlayer.recoverStamina(amount);
	}
}

Game_Action.prototype.applyMaxStaminaIncrease = function (formula)
{
	var amount = $gamePlayer.recoverStaminaFormula(formula);
	$gamePlayer.increaseMaxStamina(amount);
}

Myth.TBM.Game_Action_hasItemAnyValidEffects = Game_Action.prototype.hasItemAnyValidEffects;
Game_Action.prototype.hasItemAnyValidEffects = function (target)
{
	var item = this.item();
	if (target.isActor())
	{
		if (item._staminaRecoveryFormula)
		{
			if (Myth.TBM.overhealStamina || $gamePlayer._TBMstamina < $gamePlayer._TBMstaminaMax)
				return true;
		}
		else if (item._maxStaminaIncreaseFormula)
			return true;
		else if (item._resetMaxStamina)
			return true;
	}
	

	return Myth.TBM.Game_Action_hasItemAnyValidEffects.call(this, target);
}


Myth.TBM.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function ()
{
	Myth.TBM.Scene_Map_createAllWindows.call(this);
	this.createStaminaBar();
}

Scene_Map.prototype.createStaminaBar = function ()
{
	if (!$gameSystem._useStamina) return;

	var bitmap = ImageManager.loadSystem(Myth.TBM.staminaBar.frameImage);
	this._staminaBarFrame = new Sprite(bitmap);
	var bitmap2 = ImageManager.loadSystem(Myth.TBM.staminaBar.barImage);
	this._staminaBar = new Sprite(bitmap2);
	

	var coords = Myth.TBM.staminaBar.barPosition;
	this._staminaBarFrame.x = coords.x;
	this._staminaBarFrame.y = coords.y;
	this._staminaBar.x = coords.x + Myth.TBM.staminaBar.barOffset.x;
	this._staminaBar.y = coords.y + Myth.TBM.staminaBar.barOffset.y;

	this._staminaText = new Sprite();
	this._staminaText.x = Myth.TBM.staminaBar.textPosition.x;
	this._staminaText.y = Myth.TBM.staminaBar.textPosition.y;

	var dataBar = Myth.TBM.staminaBar;
	var _temporaryBitmap = new Bitmap(400, 60);
	var text = $gamePlayer._TBMstaminaMax + "/" + $gamePlayer._TBMstaminaMax;
	_temporaryBitmap.fontFace = Myth.Util.getFontFace(dataBar.fontSettings.face);
	_temporaryBitmap.fontSize = dataBar.fontSettings.size;
	var width = _temporaryBitmap.measureTextWidth(text);
	this._staminaText.bitmap = new Bitmap(width, Math.max(60, dataBar.fontSettings.size + 4));

	this.addChild(this._staminaBarFrame);
	this.addChild(this._staminaBar);
	this.addChild(this._staminaText);

	this.refreshStaminaBar();
}

Myth.TBM.Scene_Map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function()
{
	if (this._staminaBar)
	{
		this._staminaBarFrame.visible = false;
		this._staminaBar.visible = false;
		this._staminaText.visible = false;
	}
	
	Myth.TBM.Scene_Map_terminate.call(this);
}

Myth.TBM.Scene_Map_updateMain = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function()
{
	Myth.TBM.Scene_Map_updateMain.call(this);
	if (Myth.TBM.needsCheck)
	{
		Myth.TBM.CheckAllMoved();
		Myth.TBM.needsCheck = false;
	}
}

Scene_Base.prototype.refreshStaminaBar = function ()
{
	if (!this._staminaBar.bitmap.isReady() || !this._staminaBarFrame.bitmap.isReady())
	{
		setTimeout(() =>
		{
			this.refreshStaminaBar();
		}, 50);
		return;
	}
	var amount = $gamePlayer._TBMstamina;
	if (amount < 0) amount = 0;

	var rate = amount / $gamePlayer._TBMstaminaMax;
	var width = this._staminaBar.bitmap.width * rate;
	this._staminaBar.setFrame(0, 0, width, this._staminaBar.bitmap.height);

	var dataBar = Myth.TBM.staminaBar;

	if (dataBar.drawText)
	{
		var displayStam = rate > 0.5 ? Math.floor(amount) : Math.ceil(amount);
		var text = displayStam + "/" + $gamePlayer._TBMstaminaMax


		this._staminaText.bitmap.clear();
		this._staminaText.bitmap.fontFace = Myth.Util.getFontFace(dataBar.fontSettings.face);
		this._staminaText.bitmap.fontSize = dataBar.fontSettings.size;

		this._staminaText.bitmap.drawText(text, 0, 0, this._staminaText.bitmap.width, 60, 'right');
	}
	

	if ($gameSystem._hideStaminaBar)
	{
		this._staminaBarFrame.visible = false;
		this._staminaBar.visible = false;
		this._staminaText.visible = false;
	}
	else
	{
		this._staminaBarFrame.visible = true;
		this._staminaBar.visible = true;
		this._staminaText.visible = true;
	}
}

Myth.TBM.Scene_Menu_create = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function()
{
	Myth.TBM.Scene_Menu_create.call(this);
	this.createStaminaWindow();

}

Scene_Menu.prototype.createStaminaWindow = function()
{
	if (!$gameSystem._useStamina) return;

	var x = this._goldWindow.x;
	var y = 0;
	var width = this._goldWindow.width;
	var height = Window_Base.prototype.fittingHeight(1);
	if (Myth.Util.usingMZ)
		height = this.calcWindowHeight(1, true);
	this._staminaWindow = new Window_Stamina(x, y, width, height);
	this._staminaWindow.y = this._goldWindow.y - this._staminaWindow.height;
	this.addWindow(this._staminaWindow);
}


function Window_Stamina()
{
	this.initialize.apply(this, arguments);
}

Window_Stamina.prototype = Object.create(Window_Base.prototype);
Window_Stamina.prototype.constructor = Window_Stamina;

Window_Stamina.prototype.initialize = function(x, y, width, height) {
	if (Myth.Util.usingMZ)
	{
		var rect = new Rectangle(x, y, width, height);
		Window_Base.prototype.initialize.call(this, rect);
	}
	else
	    Window_Base.prototype.initialize.call(this, x, y, width, height);
	this.createStaminaBar();
    //this.refresh();
};

Window_Stamina.prototype.createStaminaBar = function()
{
	var dataBar = Myth.TBM.staminaBarMenu;
		var bitmap = ImageManager.loadSystem(dataBar.frameImage);
	this._staminaBarFrame = new Sprite(bitmap);
	var bitmap2 = ImageManager.loadSystem(dataBar.barImage);
	this._staminaBar = new Sprite(bitmap2);

	var coords = dataBar.barPosition;
	this._staminaBarFrame.x = coords.x;
	this._staminaBarFrame.y = coords.y;
	this._staminaBar.x = coords.x + dataBar.barOffset.x;
	this._staminaBar.y = coords.y + dataBar.barOffset.y;

	this._staminaText = new Sprite();
	this._staminaText.x = dataBar.textPosition.x;
	this._staminaText.y = dataBar.textPosition.y;

	this.addChild(this._staminaBarFrame);
	this.addChild(this._staminaBar);
	this.addChild(this._staminaText);

	this.refreshStaminaBar();
}

Window_Stamina.prototype.refreshStaminaBar = function ()
{
	if (!this._staminaBar.bitmap.isReady() || !this._staminaBarFrame.bitmap.isReady())
	{
		setTimeout(() =>
		{
			this.refreshStaminaBar();
		}, 50);
		return;
	}
	var amount = $gamePlayer._TBMstamina;
	if (amount < 0) amount = 0;

	var rate = amount / $gamePlayer._TBMstaminaMax;
	var width = this._staminaBar.bitmap.width * rate;
	this._staminaBar.setFrame(0, 0, width, this._staminaBar.bitmap.height);

	var dataBar = Myth.TBM.staminaBarMenu;
	if (dataBar.drawText)
	{
		var displayStam = rate > 0.5 ? Math.floor(amount) : Math.ceil(amount);
		var text = displayStam + "/" + $gamePlayer._TBMstaminaMax

		var bitmap = new Bitmap(400, 60);
		bitmap.fontFace = Myth.Util.getFontFace(dataBar.fontSettings.face);
		bitmap.fontSize = dataBar.fontSettings.size;

		var width = bitmap.measureTextWidth(text);
		bitmap = new Bitmap(width, Math.max(60, dataBar.fontSettings.size + 4));
		bitmap.fontFace = Myth.Util.getFontFace(dataBar.fontSettings.face);
		bitmap.fontSize = dataBar.fontSettings.size;

		bitmap.drawText(text, 0, 0, bitmap.width, 60, 'right');
		this._staminaText.bitmap = bitmap;
	}
	

}

Window_Stamina.prototype.refresh = function()
{
	this.refreshStaminaBar();
}



Scene_ItemBase.prototype.createStaminaWindow = function()
{
	if (!$gameSystem._useStamina) return;

	var width = Graphics.boxWidth - this._actorWindow.width;
	var height = Window_Base.prototype.fittingHeight(1);
	if (Myth.Util.usingMZ)
		height = this.calcWindowHeight(1, true);
	this._staminaWindow = new Window_Stamina(0, 0, width, height);
	this._staminaWindow.y = Graphics.boxHeight - this._staminaWindow.height;
	this.addWindow(this._staminaWindow);
	this._staminaWindow.hide();
}

Myth.TBM.Scene_ItemBase_onActorCancel = Scene_ItemBase.prototype.onActorCancel;
Scene_ItemBase.prototype.onActorCancel = function()
{
	Myth.TBM.Scene_ItemBase_onActorCancel.call(this);
	if ($gameSystem._useStamina)
		this._staminaWindow.hide();
}

Myth.TBM.Scene_ItemBase_determineItem = Scene_ItemBase.prototype.determineItem;
Scene_ItemBase.prototype.determineItem = function()
{
	var action = new Game_Action(this.user());
    var item = this.item();
    action.setItemObject(item);
	if (action.isForFriend() && $gameSystem._useStamina)
	{
		if (item._staminaRecoveryFormula || item._maxStaminaIncreaseFormula || item._resetMaxStamina)
			this._staminaWindow.show();
	}
	Myth.TBM.Scene_ItemBase_determineItem.call(this);
	 
}

Myth.TBM.Scene_ItemBase_useItem = Scene_ItemBase.prototype.useItem;
Scene_ItemBase.prototype.useItem = function()
{
	Myth.TBM.Scene_ItemBase_useItem.call(this);
	if ($gameSystem._useStamina)
		this._staminaWindow.refresh();
}

Myth.TBM.Scene_Item_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function()
{
	Myth.TBM.Scene_Item_create.call(this);
	this.createStaminaWindow();
}

Myth.TBM.Scene_Skill_create = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function()
{
	Myth.TBM.Scene_Skill_create.call(this);
	this.createStaminaWindow();
}


Myth.TBM.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function ()
{
	if (!Myth.TBM.DataManager_isDatabaseLoaded.call(this)) return false;
	if (!Myth.loaded_TBM)
	{
		DataManager.processStaminaNotetags($dataSkills);
		DataManager.processStaminaNotetags($dataItems);

		Myth.loaded_TBM = true;
	}

	return true;
}

DataManager.processStaminaNotetags = function (group)
{
	for (n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];

			if (line.match(/<TBM Stamina:? (.+)>/i))
			{
				obj._staminaRecoveryFormula = RegExp.$1;
			}
			else if (line.match(/<TBM Max Stamina: (.+)>/i))
			{
				obj._maxStaminaIncreaseFormula = RegExp.$1;
			}
			else if (line.match(/<TBM Reset Max Stamina>/i))
			{
				obj._resetMaxStamina = true;
			}
		}
	}
}
