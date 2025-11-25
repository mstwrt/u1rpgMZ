/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/eventmovement/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Add more movement options for events
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Beta R4
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Description: This plugin adds new movement types for events to use for
 * auto movement. Things such as copy player movements, opposite player moves,
 * and more. Events will only move whenever the player moves, which can be
 * useful for monsters on the map screen. It can also stun events for a certain
 * amount of steps, and provide a region ID through which events cannot move
 * (but the player still can).
 * ----------------------------------------------------------------------------
 * Documentation:
 * --------------------------Event Comments------------------------------------
 * To use extra move types, create a Comment event command and set the first
 * line in the comment to be:
 * CGMZ Event Movement
 *
 * Other lines can be in any order. Other lines include setup for move type and
 * speed.
 * To set up move type, use the following format:
 * Type: moveType
 *
 * Valid moveTypes include:
 * Random - same as default random move type
 * Approach - same as default approach move type
 * Custom - same as default custom move type
 * SmartApproach - will only ever try to approach
 * Random2 - will always move randomly
 * Avoid - will try to avoid the player
 * SmartAvoid - will only ever try to avoid the player
 * Mimic - will mimic the player's movements
 * Opposite - will perform the opposite of the player's movements
 * Stalk - will attempt to stay within a given distance of the player
 *         note: when using stalk, you also need to provide an additional
 *         distance. This may look like: Type: Stalk 5
 * 
 * To set up speed, use the following format:
 * Speed: speedType
 * 
 * Valid speedTypes include:
 * VVSlow - will move once every 8 steps the player takes
 * VSlow - will move once every 4 steps the player takes
 * Slow - will move once every 2 steps the player takes
 * Normal - will move every step the player takes
 * Fast - will move twice every step the player takes
 * VFast - will move 4 times every step the player takes
 * VVFast - will move 8 times every step the player takes
 * 
 * To set up event pause automove during message window, use the following:
 * Pause
 *
 * A sample comment may look something like this:
 * CGMZ Event Movement
 * Type: Mimic
 * Speed: Fast
 *
 * A sample comment for an event that pauses automove during messages:
 * CGMZ Event Movement
 * Pause
 *
 * A sample comment for an event that has step animation randomness:
 * CGMZ Event Movement
 * animationrng 20
 * --------------------------Plugin Commands-----------------------------------
 * This plugin supports the following plugin commands:
 * • Stun Event
 * This will stun an event for a provided amount of steps.
 * 
 * • Unstun Event
 * This will unstun an event if it is stunned
 * 
 * • Get Event Stun Status
 * This will set a switch to ON if the event is stunned, else the switch will
 * be set to OFF.
 * ---------------------------Saved Games--------------------------------------
 * This plugin fully supports saved games.
 * 
 * This means the following should cause no issues even in saved games:
 * ✓ Add this plugin to your game
 * ✓ Modify this plugin's parameters
 * ✓ Remove this plugin from your game
 * -----------------------------Filename---------------------------------------
 * The filename of this plugin's JavaScript file MUST be CGMZ_EventMovement.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * ---------------------------Latest Version-----------------------------------
 * Hi all, this latest version redid the movement code for events that were
 * based on player steps. How it used to work was that it would try to move
 * once or twice (for fast speed) when the player step count increased. This
 * did not take into account player move speed so if the player was faster than
 * the event the player could move twice for a normal event's movement speed if
 * it was too slow. This could lead to inconsistent movements by events, mostly
 * in cases where the speed difference between event and player were large.
 *
 * Now, the event's movement adds steps to take whenever the player moves. This
 * takes into account the delta movement between them, so if the player is very
 * fast and moves twice before the event is done moving, the event will still
 * move twice if it is set to "normal" speed where it should move once for every
 * step the player takes. If your player continues dashing, the moves the
 * events make will eventually catch up to the player's step count and the event
 * will always move a consistent amount of tiles based on how many steps the
 * player has taken.
 *
 * This update also causes event movement to take jumps into account, although
 * you can turn this off in the parameters. When the player jumps, that amount
 * of steps can be added to the step count which is what event movement is based
 * off of.
 *
 * Now that movement is more consistent, I added some more move speeds. You can
 * now have VVSlow, which moves once every 8 steps the player takes, VFast 
 * which moves 4 times every step the player takes, and VVFast which moves 8
 * times every step the player takes.
 *
 * Version Beta R4
 * - Added more move speed types
 * - Added option to count player jumps as steps
 * - Enemy movement made more consistent with player movement
 *
 * @command stunEvent
 * @text Stun Event
 * @desc Stuns an event from moving for a few steps
 *
 * @arg eventId
 * @type number
 * @text Event ID
 * @desc The ID of the event to stun. Use 0 to refer to "this event"
 * @default 0
 *
 * @arg stunSteps
 * @type number
 * @text Steps
 * @desc The number of steps the player must take before the event is no longer stunned
 * @default 0
 *
 * @command Unstun Event
 * @desc Removes a stun from an event
 *
 * @arg eventId
 * @type number
 * @text Event ID
 * @desc The ID of the event to unstun. Use 0 to refer to "this event"
 * @default 0
 *
 * @command Get Event Stun Status
 * @desc Sets a switch to on/off if an event is stunned or not
 *
 * @arg eventId
 * @type number
 * @text Event ID
 * @desc The ID of the event to check. Use 0 to refer to "this event"
 * @default 0
 *
 * @arg switchId
 * @text Switch ID
 * @type switch
 * @desc The Switch to turn on/off based on result
 * @default 0
 *
 * @param Prevent Event Movement Region
 * @type number
 * @min 0
 * @max 255
 * @desc Region ID which blocks event movement. Set to 0 to not use this feature.
 * @default 0
 *
 * @param Stop Automove For Message
 * @type boolean
 * @desc When true, events will pause autonomous movement if there is a message window displaying
 * @default false
 *
 * @param Animation RNG Step Only
 * @type boolean
 * @desc When true, only apply the animation RNG if the event is stepping in place and not moving
 * @default true
 *
 * @param Count Jump As Steps
 * @type boolean
 * @desc When true, if the player jumps it will increase their step count by the distance they jumped
 * @default true
*/
Imported.CGMZ_EventMovement = true;
CGMZ.Versions["Event Movement"] = "Beta R4";
CGMZ.EventMovement = {};
CGMZ.EventMovement.parameters = PluginManager.parameters('CGMZ_EventMovement');
CGMZ.EventMovement.PreventMoveRegion = Number(CGMZ.EventMovement.parameters["Prevent Event Movement Region"]);
CGMZ.EventMovement.StopAutomoveMessage = (CGMZ.EventMovement.parameters["Stop Automove For Message"] === 'true');
CGMZ.EventMovement.AnimationRNGStepOnly = (CGMZ.EventMovement.parameters["Animation RNG Step Only"] === 'true');
CGMZ.EventMovement.CountJumpAsSteps = (CGMZ.EventMovement.parameters["Count Jump As Steps"] === 'true');
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Registration and processing for new plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_EventMovement_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_EventMovement_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_EventMovement", "stunEvent", this.pluginCommandEventMovementStunEvent);
	PluginManager.registerCommand("CGMZ_EventMovement", "Unstun Event", this.pluginCommandEventMovementUnstunEvent);
	PluginManager.registerCommand("CGMZ_EventMovement", "Get Event Stun Status", this.pluginCommandEventMovementGetEventStunStatus);
};
//-----------------------------------------------------------------------------
// Plugin Command - Stun Event
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEventMovementStunEvent = function(args) {
	const character = this.character(Number(args.eventId));
	if(character) character.CGMZ_EventMovement_stunEvent(Number(args.stunSteps));
};
//-----------------------------------------------------------------------------
// Plugin Command - Unstun Event
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEventMovementUnstunEvent = function(args) {
	const character = this.character(Number(args.eventId));
	if(character) character.CGMZ_EventMovement_unstunEvent();
};
//-----------------------------------------------------------------------------
// Plugin Command - Get Event Stun Status
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEventMovementGetEventStunStatus = function(args) {
	const character = this.character(Number(args.eventId));
	if(character) $gameSwitches.setValue(Number(args.switchId), character.CGMZ_EventMovement_isEventStunned());
};
//=============================================================================
// Game_Event
//-----------------------------------------------------------------------------
// Check for additional movement types
//=============================================================================
//-----------------------------------------------------------------------------
// Initialize members
//-----------------------------------------------------------------------------
const alias_CGMZ_EventMovement_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
    alias_CGMZ_EventMovement_initMembers.call(this);
    this._CGMZEM_stepRNG = 0;
	this._CGMZEM_lastStepAnimCount = 0;
};
//-----------------------------------------------------------------------------
// Check for custom move types
//-----------------------------------------------------------------------------
const alias_CGMZ_EventMovement_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	alias_CGMZ_EventMovement_setupPageSettings.call(this);
	this._cgmz_eventMovement_hasCustomMovement = false;
	const page = this.page();
	this._CGMZEM_stepRNG = 0;
	let hasCustomMovement = false;
	let rawMoveData = [];
	for(const command of page.list) {
		if(hasCustomMovement) {
			if(command.code !== 408) {
				const moveData = this.CGMZ_EventMovement_parseMovementData(rawMoveData);
				this.CGMZ_EventMovement_setMovementType(moveData);
				break;
			}
			rawMoveData.push(command.parameters[0].trim().toLowerCase().split(" "));
		} else {
			hasCustomMovement = (command.code === 108 && command.parameters[0].trim().toLowerCase() === "cgmz event movement");
		}
	}
};
//-----------------------------------------------------------------------------
// Parse custom move data and return a movement object
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_parseMovementData = function(rawMoveData) {
	// Expected Format of rawMoveData: [[dataType, value], ...]
	const defaultMoveData = {type: "random", speed: "normal"};
	const moveData = {};
	for(const data of rawMoveData) {
		switch(data[0]) {
			case "type:":
				moveData.type = data[1];
				if(data.length === 3) moveData.stalkDistance = Number(data[2]);
				continue;
			case "speed:": moveData.speed = data[1]; continue;
			case "pause": moveData.pause = true; continue;
			case "animationrng": moveData.animrng = Number(data[1]); continue;
		}
	}
	return moveData;
};
//-----------------------------------------------------------------------------
// Set cgmz move data
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_setMovementType = function(moveData) {
	this._cgmz_eventMovement_hasCustomMovement = (moveData.hasOwnProperty('type') || moveData.hasOwnProperty('speed'));
	if(this._cgmz_eventMovement_hasCustomMovement) {
		if(!moveData.type) moveData.type = "random";
		if(!moveData.speed) moveData.speed = "normal";
		this._cgmz_eventMovement_playerStepCount = $gameParty.steps();
		this._cgmz_eventMovement_lastIncreasedPlayerStepCount = $gameParty.steps();
		this._cgmz_eventMovement_isStunned = false;
		this._cgmz_eventMovement_stunSteps = 0;
		this._cgmz_eventMovement_stepsToTake = 0;
	}
	this._cgmz_eventMovement_customMovement = moveData;
	this._CGMZEM_stepRNG = (moveData.animrng) ? moveData.animrng : 0;
};
//-----------------------------------------------------------------------------
// Perform CGMZ movement if has custom movement
//-----------------------------------------------------------------------------
const alias_CGMZ_EventMovement_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
	if(this.CGMZ_shouldPauseAutoMovement()) return;
	if(!this._cgmz_eventMovement_hasCustomMovement) {
		alias_CGMZ_EventMovement_updateSelfMovement.call(this);
	} else {
		this.CGMZ_EventMovement_updateStun();
		this.CGMZ_EventMovement_handleCustomMovement();
	}
};
//-----------------------------------------------------------------------------
// Check if the event should pause its auto movement
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_shouldPauseAutoMovement = function() {
	if(!$gameMessage.isBusy()) return false;
	if(CGMZ.EventMovement.StopAutomoveMessage) return true;
	if(this._cgmz_eventMovement_customMovement?.pause) return true;
	return false;
};
//-----------------------------------------------------------------------------
// Update event stun state
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_updateStun = function() {
	this._cgmz_eventMovement_isStunned = (this._cgmz_eventMovement_stunSteps >= $gameParty.steps());
};
//-----------------------------------------------------------------------------
// Stun event for n steps
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_stunEvent = function(n) {
	this._cgmz_eventMovement_stunSteps = $gameParty.steps() + n;
	this._cgmz_eventMovement_isStunned = true;
};
//-----------------------------------------------------------------------------
// Unstun event
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_unstunEvent = function() {
	this._cgmz_eventMovement_stunSteps = 0;
	this._cgmz_eventMovement_isStunned = false;
};
//-----------------------------------------------------------------------------
// Get stun status of event
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_isEventStunned = function() {
	return this._cgmz_eventMovement_isStunned;
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ movement
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_handleCustomMovement = function() {
	if(this.CGMZ_shouldIncreaseStepsToTake()) {
		this.CGMZ_increaseStepsToTake();
		this._cgmz_eventMovement_lastIncreasedPlayerStepCount = $gameParty.steps();
	}
	if(this.CGMZ_EventMovement_shouldMove()) {
		this._cgmz_eventMovement_playerStepCount = $gameParty.steps();
		switch(this._cgmz_eventMovement_customMovement.type) {
			case "random": this.CGMZ_EventMovement_moveTypeRandom(); break;
			case "approach": this.CGMZ_EventMovement_moveTypeApproach(); break;
			case "custom": this.CGMZ_EventMovement_moveTypeCustom(); break;
			case "smartapproach": this.CGMZ_EventMovement_moveTypeSmartApproach(); break;
			case "avoid": this.CGMZ_EventMovement_moveTypeAvoid(); break;
			case "smartavoid": this.CGMZ_EventMovement_moveTypeSmartAvoid(); break;
			case "mimic": this.CGMZ_EventMovement_moveTypeMimic(); break;
			case "opposite": this.CGMZ_EventMovement_moveTypeOpposite(); break;
			case "random2": this.CGMZ_EventMovement_moveTypeRandom2(); break;
			case "stalk": this.CGMZ_EventMovement_moveTypeStalk(); break;
		}
		if(this._cgmz_eventMovement_stepsToTake > 0) this._cgmz_eventMovement_stepsToTake--;
	}
};
//-----------------------------------------------------------------------------
// Determine if the event should move by on steps
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_shouldMove = function() {
	if(this.CGMZ_EventMovement_isEventStunned()) {
		this._cgmz_eventMovement_stepsToTake = 0;
		return false;
	}
	return this._cgmz_eventMovement_stepsToTake > 0;
};
//-----------------------------------------------------------------------------
// Determine if the event should increase its amount of steps to take
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_shouldIncreaseStepsToTake = function() {
	const playerSteps = $gameParty.steps();
	switch(this._cgmz_eventMovement_customMovement.speed) {
		case "vvslow": return (playerSteps >= this._cgmz_eventMovement_lastIncreasedPlayerStepCount + 8);
		case "vslow": return (playerSteps >= this._cgmz_eventMovement_lastIncreasedPlayerStepCount + 4);
		case "slow": return (playerSteps >= this._cgmz_eventMovement_lastIncreasedPlayerStepCount + 2);
		case "normal":
		case "fast":
		case "vfast":
		case "vvfast": return (playerSteps >= this._cgmz_eventMovement_lastIncreasedPlayerStepCount + 1);
	}
	return this._cgmz_eventMovement_stepsToTake <= 0;
};
//-----------------------------------------------------------------------------
// Actually increase the steps to take
// This takes into account speed differences and ensures that the speed the
// event is at takes the correct amount of steps given the player's step count
// since it last increased its steps to take
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_increaseStepsToTake = function() {
	let increase = 1;
	const playerSteps = $gameParty.steps();
	const deltaStep = playerSteps - this._cgmz_eventMovement_lastIncreasedPlayerStepCount;
	switch(this._cgmz_eventMovement_customMovement.speed) {
		case "vvslow":
			if(deltaStep > 8) {
				increase = Math.floor(deltaStep / 8);
			}
			break;
		case "vslow":
			if(deltaStep > 4) {
				increase = Math.floor(deltaStep / 4);
			}
			break;
		case "slow": 
			if(deltaStep > 2) {
				increase = Math.floor(deltaStep / 2);
			}
			break;
		case "normal":
			if(deltaStep > 1) {
				increase = deltaStep;
			}
			break;
		case "fast":
			increase = 2;
			if(deltaStep > 1) {
				increase = deltaStep * 2;
			}
			break;
		case "vfast":
			increase = 4;
			if(deltaStep > 1) {
				increase = deltaStep * 4;
			}
			break;
		case "vvfast":
			increase = 8;
			if(deltaStep > 1) {
				increase = deltaStep * 8;
			}
			break;
	}
	this._cgmz_eventMovement_stepsToTake += increase;
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Random Move Type
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeRandom = function() {
	this.moveTypeRandom();
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Approach Move Type
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeApproach = function() {
	this.moveTypeTowardPlayer();
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Custom Move Type
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeCustom = function() {
	this.moveTypeCustom();
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Smart Approach Move Type - never does not approach
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeSmartApproach = function() {
	this.moveTowardPlayer();
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Avoid Move Type
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeAvoid = function() {
	if (this.isNearThePlayer()) {
		switch (Math.randomInt(6)) {
			case 0:
			case 1:
			case 2:
			case 3: this.moveAwayFromPlayer(); break;
			case 4: this.moveRandom(); break;
			case 5: this.moveForward(); break;
		}
	} else {
		this.moveRandom();
	}
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Smart Avoid Move Type - never does not move away
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeSmartAvoid = function() {
	this.moveAwayFromPlayer();
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Mimic Move Type
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeMimic = function() {
	this.setDirection($gamePlayer.direction());
	this.moveForward();
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Opposite Move Type
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeOpposite = function() {
	this.setDirection(10 - $gamePlayer.direction());
	this.moveForward();
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Random 2 Move Type (only random movements)
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeRandom2 = function() {
	this.moveRandom();
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Stalk Move Type
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeStalk = function() {
	const distance = this.CGMZ_getDistanceFromPlayerSimple();
	const targetDistance = this._cgmz_eventMovement_customMovement.stalkDistance;
	if(distance > targetDistance) {
		this.moveTowardPlayer();
	} else if(distance === targetDistance) {
		this.moveRandom();
	} else {
		this.moveAwayFromPlayer();
	}
};
//-----------------------------------------------------------------------------
// Turn off moving through a region for events
//-----------------------------------------------------------------------------
const alias_CGMZ_EventMovement_canPass = Game_Event.prototype.canPass;
Game_Event.prototype.canPass = function(x, y, d) {
	const defaultValue = alias_CGMZ_EventMovement_canPass.call(this, x, y, d);
	if(CGMZ.EventMovement.PreventMoveRegion > 0 && !this.isThrough()) {
		const xd = $gameMap.roundXWithDirection(x, d);
		const yd = $gameMap.roundYWithDirection(y, d);
		const regionId = $gameMap.regionId(xd, yd);
		if(regionId === CGMZ.EventMovement.PreventMoveRegion) {
			return false;
		}
	}
	return defaultValue;
};
//-----------------------------------------------------------------------------
// Add animation randomness
//-----------------------------------------------------------------------------
const alias_CGMZ_EventMovement_updateAnimation = Game_Event.prototype.updateAnimation;
Game_Event.prototype.updateAnimation = function() {
    alias_CGMZ_EventMovement_updateAnimation.call(this);
	if(this._CGMZEM_stepRNG && this._animationCount === 0 && this._CGMZEM_lastStepAnimCount > 0) {
		if(CGMZ.EventMovement.AnimationRNGStepOnly && !this.isMoving()) {
			this._animationCount -= Math.randomInt(this._CGMZEM_stepRNG);
		} else if(!CGMZ.EventMovement.AnimationRNGStepOnly) {
			this._animationCount -= Math.randomInt(this._CGMZEM_stepRNG);
		}
	}
	this._CGMZEM_lastStepAnimCount = this._animationCount;
};
//=============================================================================
// Game_Player
//-----------------------------------------------------------------------------
// Increase steps on jump too, if set up to do so
//=============================================================================
const alias_CGMZ_EventMovement_GamePlayer_jump = Game_Player.prototype.jump;
Game_Player.prototype.jump = function(xPlus, yPlus) {
    alias_CGMZ_EventMovement_GamePlayer_jump.call(this, xPlus, yPlus);
    if(CGMZ.EventMovement.CountJumpAsSteps) {
		const total = Math.abs(xPlus) + Math.abs(yPlus);
		for(let i = 0; i < total; i++) {
			$gameParty.increaseSteps();
		}
	}
};