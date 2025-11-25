/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/customvehicles/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_VehicleInteriors
 * @plugindesc Add unlimited custom vehicles to your game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Alpha R5
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Description: This plugin allows you to create custom vehicles for your
 * game. You can have as many custom vehicles as you want, and they can have
 * various behaviors beyond the default boat/ship/airship. Of course, you can
 * also just use this to make a second boat as well.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ----------------------------Alpha Notes-------------------------------------
 * Planned features to be added:
 * 1) Custom shadows for each vehicle
 *
 * Want additional features not already present/listed above? Make suggestions
 * on the Patreon Post, Itch.io, or in my discord in the #suggestions channel!
 * https://discord.gg/Gbx7JXP
 * --------------------------Vehicle Types-------------------------------------
 * Currently, this plugin supports the following vehicle types:
 *
 * Boat - Similar to the default boat. You can create as many of these as you
 * want, and have different speeds, image, audio, or passabilities for them.
 *
 * Ship - Similar to the default ship. You can create as many of these as you
 * want, and have different speeds, image, audio, or passabilities for them.
 *
 * Airship - Similar to the default airship. You can create as many of these
 * as you want, and have different speeds, image, audio, or altitudes for
 * them.
 *
 * Land - A vehicle that can only pass through land tiles. You can also make 
 * these pass through otherwise unpassable tiles using regions or tile ids.
 * This can be used to allow the vehicle to pass through mountains or other
 * tiles the player otherwise could not pass through, without allowing it to
 * have complete freedom like the airship. You can have as many of these as
 * you want, and have different speeds, image, audio, and passability for each.
 * -------------------------Vehicle Settings-----------------------------------
 * Custom vehicles are created by choosing different setting options. When
 * choosing each vehicle's properties, some properties will make no sense when
 * used together. Please keep this in mind. For example, creating a sea vehicle
 * with no landing offset will lead to problems docking or getting on the
 * vehicle, as the one tile offset is required to land properly for those 
 * vehicle types.
 * ----------------------------Integrations------------------------------------
 * Interior settings for custom vehicles requires [CGMZ] Vehicle Interiors to
 * work.
 *
 * For landing region restrictions, the plugin [CGMZ] Vehicle Landing
 * Restrictions is NOT required, though it will allow you to add some region
 * restrictions for the default 3 vehicles if you are using those.
 *
 * For vehicle encounters, the plugin [CGMZ] Vehicle Encounters is NOT
 * required, though it will allow you to add encounters to the three default
 * vehicles. You must set an enable switch for encounters before you will
 * start encountering enemies in the vehicle.
 * -------------------------Plugin Commands------------------------------------
 * • Change Vehicle Interior
 * Changes the vehicle interior properties of a vehicle. Edit the map id, x,
 * y, or direction. For example, if your player purchases an upgraded interior,
 * you can change the map id to an upgraded interior map.
 *
 * • Change Vehicle Location
 * Changes the vehicle location to the given map/x/y. You can also specify a
 * direction to face.
 *
 * • Change Vehicle Image
 * Change a custom vehicle's image
 *
 * • Change Vehicle BGM
 * Change a custom vehicle's BGM
 * ---------------------------Saved Games--------------------------------------
 * This plugin partially supports saved games.
 * ✓ You should be able to add this  plugin to a saved game
 * ✓ You can remove this plugin with no issue to save data
 *
 * ✗ Modifying vehicle data may not reflect accurately in saved games
 * -----------------------------Filename---------------------------------------
 * This plugin's JS filename MUST remain CGMZ_CustomVehicles.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version converts a lot of plugin parameters and plugin
 * command arguments to use the new RMMZ 1.9.0 map or location types, which
 * allow you to select a map from the map list ui or even select the exact
 * tile on the map similar to a transfer player event command, which should
 * make this plugin much easier to use.
 *
 * While going through the parameters, I also converted the directional ones
 * to use a selectable list that gets converted to the correct directional
 * number instead of making you type the number for the direction in manually.
 * The Map Link Fade Type parameter got similar treatment.
 *
 * This update also added the option to have no gamepad button for map link
 * transfers. You can also now have a switch turn ON or OFF automatically as
 * the player gets on or off a vehicle, for use in your eventing.
 *
 * Version Alpha R5
 * - Added switch toggle on/off with vehicle get on/off
 * - Added option to not have a map link gamepad button
 * - Many location parameters converted to new location parameter type
 * - Many direction parameters converted to select type
 * - Fade type parameter converted to select type
 *
 * @command Change Vehicle Interior
 * @desc Changes the vehicle interior settings for a custom vehicle
 *
 * @arg Vehicle
 * @desc The vehicle id to change
 *
 * @arg Location
 * @type location
 * @desc The new map ID to use
 *
 * @arg Direction
 * @type select
 * @option Retain
 * @value 0
 * @option Down
 * @value 2
 * @option Left
 * @value 4
 * @option Right
 * @value 6
 * @option Up
 * @value 8
 * @default 2
 * @desc The new direction value to use
 *
 * @command Change Vehicle Location
 * @desc Changes the vehicle location for a custom vehicle
 *
 * @arg Vehicle
 * @desc The vehicle id to change
 *
 * @arg Location
 * @type location
 * @desc The new map ID to use
 *
 * @arg Direction
 * @type select
 * @option Retain
 * @value 0
 * @option Down
 * @value 2
 * @option Left
 * @value 4
 * @option Right
 * @value 6
 * @option Up
 * @value 8
 * @default 2
 * @desc The new direction value to use
 *
 * @command Change Vehicle Image
 * @desc Changes the vehicle image for a custom vehicle
 *
 * @arg Vehicle
 * @desc The vehicle id to change
 *
 * @arg Image
 * @type file
 * @default img/characters/
 * @desc The new image to use
 *
 * @arg Index
 * @type number
 * @default 0
 * @min 0
 * @desc The index of the image on the spritesheet. 0-7
 *
 * @command Change Vehicle BGM
 * @desc Changes the vehicle bgm for a custom vehicle
 *
 * @arg Vehicle
 * @desc The vehicle id to change
 *
 * @arg BGM
 * @type struct<Audio>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc The new bgm to use
 *
 * @param Vehicles
 * @type struct<Vehicle>[]
 * @desc Set up custom vehicles here
 * @default []
 *
 * @param Link Key
 * @desc Key that, when pressed, will attempt to go to a linked map
 * @default m
 *
 * @param Link Gamepad
 * @parent Controls
 * @desc Gamepad button that when pressed will attempt to go to a linked map
 * @type select
 * @option None
 * @value -1
 * @option A
 * @value 0
 * @option B
 * @value 1
 * @option X
 * @value 2
 * @option Y
 * @value 3
 * @option LB
 * @value 4
 * @option RB
 * @value 5
 * @option LT
 * @value 6
 * @option RT
 * @value 7
 * @option Back / Select
 * @value 8
 * @option Start
 * @value 9
 * @option Left Stick
 * @value 10
 * @option Right Stick
 * @value 11
 * @option Dpad Up
 * @value 12
 * @option Dpad Down
 * @value 13
 * @option Dpad Left
 * @value 14
 * @option Dpad Right
 * @value 15
 * @default 7
*/
/*~struct~Vehicle:
 * @param id
 * @desc The id used to refer to the vehicle, should be unique and not blank
 *
 * @param Image Settings
 * @type struct<Img>
 * @default {"Image File":"","Image Index":"-1"}
 * @desc Image settings for the custom vehicle
 *
 * @param Audio Settings
 * @type struct<Audio>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc Audio settings for the custom vehicle
 *
 * @param Initial Settings
 * @type struct<Initial>
 * @desc Initial settings for the custom vehicle
 *
 * @param Passability Settings
 * @type struct<Passing>
 * @desc Passability settings for the custom vehicle
 *
 * @param Event Settings
 * @type struct<Event>
 * @desc Event settings for the custom vehicle
 *
 * @param Movement Settings
 * @type struct<Movement>
 * @desc Movement settings for the custom vehicle
 *
 * @param Landing Settings
 * @type struct<Landing>
 * @desc Landing settings for the custom vehicle
 *
 * @param Interior Settings
 * @type struct<Interior>
 * @default {"Map ID":"0","X":"0","Y":"0","Direction":"0"}
 * @desc Interior settings for the custom vehicle (Requires CGMZ Vehicle Interiors)
 *
 * @param Encounter Settings
 * @type struct<Encounter>
 * @default {"Encounters":"[]","Enable Switch":"0","Steps":"0","Battleback 1":"","Battleback 2":""}
 * @desc Encounter settings for the custom vehicle
 *
 * @param Map Links
 * @type struct<Link>[]
 * @default []
 * @desc Links between maps for the vehicle to go above or below the map
*/
/*~struct~Img:
 * @param Image File
 * @type file
 * @dir img/characters/
 * @desc The image file to use for the vehicle
 *
 * @param Image Index
 * @type number
 * @min -1
 * @default -1
 * @desc Image index on the image file (if multiple different images on one file)
*/
/*~struct~Audio:
 * @param Name
 * @type file
 * @dir audio/bgm/
 * @desc The bgm file to use for the vehicle
 *
 * @param Volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc The volume of the custom vehicle bgm
 *
 * @param Pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc The pitch of the custom vehicle bgm
 *
 * @param Pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The pan of the custom vehicle bgm
*/
/*~struct~Initial:
 * @param Location
 * @type location
 * @desc The starting position of the vehicle
 *
 * @param Direction
 * @type select
 * @option Retain
 * @value 0
 * @option Down
 * @value 2
 * @option Left
 * @value 4
 * @option Right
 * @value 6
 * @option Up
 * @value 8
 * @default 4
 * @desc Starting direction on the map the vehicle begins on
*/
/*~struct~Passing:
 * @param Shallow Water
 * @type boolean
 * @default false
 * @desc If the vehicle can pass shallow water (mimic boat)
 *
 * @param Deep Water
 * @type boolean
 * @default false
 * @desc If the vehicle can pass deep water (mimic ship)
 *
 * @param All Tiles
 * @type boolean
 * @default false
 * @desc If the vehicle can pass any tile (mimic airship)
 *
 * @param Normal Tiles
 * @type boolean
 * @default false
 * @desc If the vehicle can pass normal tiles (mimic player passability)
 *
 * @param Passable Regions
 * @type number[]
 * @default []
 * @desc Region IDs through which the vehicle can always pass
 *
 * @param Passable Terrains
 * @type number[]
 * @default []
 * @desc Terrain tags through which the vehicle can always pass
 *
 * @param Through
 * @type boolean
 * @default false
 * @desc Is the player considered "through" when on the vehicle?
*/
/*~struct~Movement:
 * @param Speed
 * @type number
 * @default 4
 * @desc The vehicle's movement speed (1-6)
 *
 * @param Altitude
 * @type number
 * @default 0
 * @desc The vehicle's desired altitude (before it can begin moving)
*/
/*~struct~Event:
 * @param Ignore Events
 * @type boolean
 * @default false
 * @desc Ignore events when in this vehicle?
 * 
 * @param Switch
 * @type switch
 * @default 0
 * @desc A switch that will be turned ON when getting on the vehicle and OFF when getting off the vehicle.
*/
/*~struct~Landing:
 * @param Plain Tiles
 * @type boolean
 * @default false
 * @desc Mimics the airship landing conditions if true
 *
 * @param Passable Tiles
 * @type boolean
 * @default false
 * @desc Can land at any tile the player can walk on (boat/ship landing style)
 *
 * @param Offset
 * @type boolean
 * @default false
 * @desc If true, it will check for landing conditions 1 tile in front of the vehicle (boat/ship landing style)
 *
 * @param Direction
 * @type select
 * @option Retain
 * @value 0
 * @option Down
 * @value 2
 * @option Left
 * @value 4
 * @option Right
 * @value 6
 * @option Up
 * @value 8
 * @default 4
 * @desc Direction the vehicle faces when landed
 *
 * @param Region Restrictions
 * @type number[]
 * @default []
 * @desc Region IDs that disable the ability to land the vehicle
*/
/*~struct~Interior:
 * @param Location
 * @type location
 * @desc The location of the interior, if any.
 *
 * @param Direction
 * @type select
 * @option Retain
 * @value 0
 * @option Down
 * @value 2
 * @option Left
 * @value 4
 * @option Right
 * @value 6
 * @option Up
 * @value 8
 * @default 0
 * @desc Direction of the player after transfer
*/
/*~struct~Encounter:
 * @param Encounters
 * @type troop[]
 * @default []
 * @desc The possible Troop IDs to encounter
 *
 * @param Enable Switch
 * @type switch
 * @default 0
 * @desc The game switch which controls if encounters are enabled/disabled for this vehicle
 *
 * @param Steps
 * @type number
 * @default 0
 * @min 0
 * @desc The average steps required to get an encounter
 *
 * @param Battleback 1
 * @type file
 * @dir img/battlebacks1/
 * @desc The battleback 1 image to use for encounters in this vehicle
 *
 * @param Battleback 2
 * @type file
 * @dir img/battlebacks2/
 * @desc The battleback 2 image to use for encounters in this vehicle
*/
/*~struct~Link:
 * @param To Map ID
 * @type map
 * @default 0
 * @desc The map ID to transfer to
 *
 * @param From Map ID
 * @type map
 * @default 0
 * @desc The map ID the player must be on to initiate transfer
 *
 * @param Animation
 * @type animation
 * @default 0
 * @desc The animation to play during transfer between map
 *
 * @param Wait
 * @type number
 * @default 0
 * @desc The amount of frames to wait for any animation to play before doing the transfer
 *
 * @param Region Blockers
 * @type number[]
 * @default []
 * @desc Region IDs which, if the vehicle is in, will prevent transfer between maps
 *
 * @param Region Required
 * @type number[]
 * @default []
 * @desc Region IDs which the player must be in to start a map transfer
 *
 * @param Fade
 * @type select
 * @option Black
 * @value 0
 * @option White
 * @value 1
 * @option None
 * @value 2
 * @default 0
 * @desc The fade type for the transfer between maps.
*/
Imported.CGMZ_CustomVehicles = true;
CGMZ.Versions["Custom Vehicles"] = "Alpha R5";
CGMZ.CustomVehicles = {};
CGMZ.CustomVehicles.parameters = PluginManager.parameters('CGMZ_CustomVehicles');
CGMZ.CustomVehicles.LinkKey = CGMZ.CustomVehicles.parameters["Link Key"];
CGMZ.CustomVehicles.LinkGamepad = CGMZ.CustomVehicles.parameters["Link Gamepad"];
CGMZ.CustomVehicles.VehiclesJSON = CGMZ_Utils.parseJSON(CGMZ.CustomVehicles.parameters["Vehicles"], [], "CGMZ Custom Vehicles", "Your custom vehicles did not have valid JSON, you will need to fix your Vehicles parameter before this plugin will work.");
CGMZ.CustomVehicles.VehicleTypes = [];
CGMZ.CustomVehicles.Vehicles = {};
//=============================================================================
// CGMZ_CustomVehicleSettings
//-----------------------------------------------------------------------------
// Manage custom vehicle settings, not saved
//=============================================================================
function CGMZ_CustomVehicleSettings() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize custom settings
//-----------------------------------------------------------------------------
CGMZ_CustomVehicleSettings.prototype.initialize = function(settings) {
	this._id = settings.id;
	this.bgm = CGMZ_Utils.parseSoundEffectJSON(settings["Audio Settings"], "CGMZ Custom Vehicles");
	const imageDefault = {"Image File":"","Image Index":-1};
	const imageSettings = CGMZ_Utils.parseJSON(settings["Image Settings"], imageDefault, "CGMZ Custom Vehicles", `Your custom vehicle with id ${this._id} did not have valid image parameters.`);
	this.initImageSettings(imageSettings);
	const initialDefault = {"Map Id":0,"X":0,"Y":0,"Direction":0};
	const initialSettings = CGMZ_Utils.parseJSON(settings["Initial Settings"], initialDefault, "CGMZ Custom Vehicles", `Your custom vehicle with id ${this._id} did not have valid initial parameters.`);
	this.initInitialSettings(initialSettings);
	const landingDefault = {"Plain Tiles":"false","Passable Tiles":"false","Offset":"false","Direction":4,"Region Restrictions":"[]"};
	const landingSettings = CGMZ_Utils.parseJSON(settings["Landing Settings"], landingDefault, "CGMZ Custom Vehicles", `Your custom vehicle with id ${this._id} did not have valid landing parameters.`);
	this.initLandingSettings(landingSettings);
	const movementDefault = {"Speed":4,"Altitude":0};
	const movementSettings = CGMZ_Utils.parseJSON(settings["Movement Settings"], movementDefault, "CGMZ Custom Vehicles", `Your custom vehicle with id ${this._id} did not have valid movement parameters.`);
	this.initMovementSettings(movementSettings);
	const eventDefault = {"Ignore Events":false,"Switch":0};
	const eventSettings = CGMZ_Utils.parseJSON(settings["Event Settings"], eventDefault, "CGMZ Custom Vehicles", `Your custom vehicle with id ${this._id} did not have valid event parameters.`);
	this.initEventSettings(eventSettings);
	const passabilityDefault = {"Shallow Water":"false","Deep Water":"false","All Tiles":"false","Normal Tiles":"false","Passable Regions":"[]","Passable Terrains":"[]","Through":"false"};
	const passabilitySettings = CGMZ_Utils.parseJSON(settings["Passability Settings"], passabilityDefault, "CGMZ Custom Vehicles", `Your custom vehicle with id ${this._id} did not have valid passability parameters.`);
	this.initPassabilitySettings(passabilitySettings);
	const interiorDefault = {"Map ID":0,"X":0,"Y":0,"Direction":0};
	const interiorSettings = CGMZ_Utils.parseJSON(settings["Interior Settings"], interiorDefault, "CGMZ Custom Vehicles", `Your custom vehicle with id ${this._id} did not have valid interior parameters.`);
	this.initInteriorSettings(interiorSettings);
	const encounterDefault = {"Encounters":"[]","Enable Switch":"0","Steps":"0","Battleback 1":"","Battleback 2":""};
	const encounterSettings = CGMZ_Utils.parseJSON(settings["Encounter Settings"], encounterDefault, "CGMZ Custom Vehicles", `Your custom vehicle with id ${this._id} did not have valid encounter parameters.`);
	this.initEncounterSettings(encounterSettings);
	const linkSettings = CGMZ_Utils.parseJSON(settings["Map Links"], [], "CGMZ Custom Vehicles", `Your custom vehicle with id '${this._id}' did not have a valid Map Links parameter`);
	this.initMapLinks(linkSettings);
};
//-----------------------------------------------------------------------------
// Initialize image settings
//-----------------------------------------------------------------------------
CGMZ_CustomVehicleSettings.prototype.initImageSettings = function(settings) {
	this.characterName = settings["Image File"];
	this.characterIndex = Number(settings["Image Index"]);
};
//-----------------------------------------------------------------------------
// Initialize initial settings
//-----------------------------------------------------------------------------
CGMZ_CustomVehicleSettings.prototype.initInitialSettings = function(settings) {
	const loc = CGMZ_Utils.parseMapParam(settings.Location, "[CGMZ] Custom Vehicles");
	this.startMapId = loc.mapId;
	this.startX = loc.x;
	this.startY = loc.y;
	this.startDir = Number(settings.Direction);
};
//-----------------------------------------------------------------------------
// Initialize landing settings
//-----------------------------------------------------------------------------
CGMZ_CustomVehicleSettings.prototype.initLandingSettings = function(settings) {
	this.plainsLandingOnly = (settings["Plain Tiles"] === 'true');
	this.passableLandingOnly = (settings["Passable Tiles"] === 'true');
	this.offsetLanding = (settings.Offset === 'true');
	this.landingDirection = Number(settings.Direction);
	this.landingRegionRestrictions = CGMZ_Utils.parseJSON(settings["Region Restrictions"], [], "CGMZ Custom Vehicles", "Your vehicle with id " + this._id + " did not have valid JSON in the Region Restrictions landing parameter. Skipping.").map(id => Number(id));
};
//-----------------------------------------------------------------------------
// Initialize movement settings
//-----------------------------------------------------------------------------
CGMZ_CustomVehicleSettings.prototype.initMovementSettings = function(settings) {
	this.speed = Number(settings.Speed);
	this.altitude = Number(settings.Altitude);
};
//-----------------------------------------------------------------------------
// Initialize movement settings
//-----------------------------------------------------------------------------
CGMZ_CustomVehicleSettings.prototype.initEventSettings = function(settings) {
	this.ignoreEvents = (settings["Ignore Events"] === 'true');
	this.switchId = Number(settings["Switch"]);
};
//-----------------------------------------------------------------------------
// Initialize passability settings
//-----------------------------------------------------------------------------
CGMZ_CustomVehicleSettings.prototype.initPassabilitySettings = function(settings) {
	this.shallowWaterPassability = (settings["Shallow Water"] === 'true');
	this.deepWaterPassability = (settings["Deep Water"] === 'true');
	this.allTilePassability = (settings["All Tiles"] === 'true');
	this.normalPassability = (settings["Normal Tiles"] === 'true');
	this.through = (settings["Through"] === 'true');
	this.passableRegions = CGMZ_Utils.parseJSON(settings["Passable Regions"], [], "CGMZ Custom Vehicles", "Your vehicle with id " + this._id + " did not have valid JSON in the Passable Regions passability parameter. Skipping.").map(id => Number(id));
	this.passableTerrains = CGMZ_Utils.parseJSON(settings["Passable Terrains"], [], "CGMZ Custom Vehicles", "Your vehicle with id " + this._id + " did not have valid JSON in the Passable Terrains passability parameter. Skipping.").map(tag => Number(tag));
};
//-----------------------------------------------------------------------------
// Initialize interior settings
//-----------------------------------------------------------------------------
CGMZ_CustomVehicleSettings.prototype.initInteriorSettings = function(settings) {
	const loc = CGMZ_Utils.parseMapParam(settings.Location, "[CGMZ] Custom Vehicles");
	this.interior = {mapId: loc.mapId, x: loc.x, y: loc.y, dir: Number(settings.Direction)};
};
//-----------------------------------------------------------------------------
// Initialize encounter settings
//-----------------------------------------------------------------------------
CGMZ_CustomVehicleSettings.prototype.initEncounterSettings = function(settings) {
	this.encounterList = CGMZ_Utils.parseJSON(settings.Encounters, [], "CGMZ Custom Vehicles", "Your vehicle with id " + this._id + " did not have valid JSON in the Encounters encounter parameter. Skipping.").map(id => Number(id));
	this.encounterOpts = {steps: Number(settings.Steps), enableSwitch: Number(settings["Enable Switch"]), battleback1: settings["Battleback 1"], battleback2: settings["Battleback 2"]};
};
//-----------------------------------------------------------------------------
// Initialize map links
//-----------------------------------------------------------------------------
CGMZ_CustomVehicleSettings.prototype.initMapLinks = function(linksJSONArray) {
	this.mapLinks = [];
	for(const linkJSON of linksJSONArray) {
		const ml = CGMZ_Utils.parseJSON(linkJSON, null, "CGMZ Custom Vehicles", `Your vehicle with id '${this._id}' had an invalid map link parameter which could not be read.`);
		if(!ml) continue;
		const settings = this.createMapLinkObject(ml);
		this.mapLinks.push(settings);
	}
};
//-----------------------------------------------------------------------------
// Initialize map links
//-----------------------------------------------------------------------------
CGMZ_CustomVehicleSettings.prototype.createMapLinkObject = function(ml) {
	const mapLink = {
		fromMapId: Number(ml["From Map ID"]),
		toMapId: Number(ml["To Map ID"]),
		animation: Number(ml.Animation),
		wait: Number(ml.Wait),
		fade: Number(ml.Fade),
		blocks: CGMZ_Utils.parseJSON(ml["Region Blockers"], [], "CGMZ Custom Vehicles", `Your vehicle with id '${this._id}' had an invalid map link region block parameter which could not be read.`).map(x => Number(x)),
		required: CGMZ_Utils.parseJSON(ml["Region Required"], [], "CGMZ Custom Vehicles", `Your vehicle with id '${this._id}' had an invalid map link region required parameter which could not be read.`).map(x => Number(x))
	};
	return mapLink;
};
//-----------------------------------------------------------------------------
// Create the custom vehicle objects
//-----------------------------------------------------------------------------
for(const vehicleJSON of CGMZ.CustomVehicles.VehiclesJSON) {
	const settings = CGMZ_Utils.parseJSON(vehicleJSON, null, "CGMZ Custom Vehicles", "One of your custom vehicles has improper JSON settings: " + vehicleJSON);
	if(!settings) continue;
	CGMZ.CustomVehicles.VehicleTypes.push(settings.id);
	CGMZ.CustomVehicles.Vehicles[settings.id] = new CGMZ_CustomVehicleSettings(settings);
}
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Adds plugin commands and initializes vehicle setting objects
//=============================================================================
//-----------------------------------------------------------------------------
// Set up vehicle setting data
//-----------------------------------------------------------------------------
const CGMZ_CustomVehicles_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	CGMZ_CustomVehicles_CGMZTemp_createPluginData.call(this);
	this._customVehicleSettings = {};
	for(const vehicleJSON of CGMZ.CustomVehicles.VehiclesJSON) {
		const settings = CGMZ_Utils.parseJSON(vehicleJSON, null, "CGMZ Custom Vehicles", "One of your custom vehicles has improper JSON settings: " + vehicleJSON);
		if(!settings) continue;
		this._customVehicleSettings[settings.id] = new CGMZ_CustomVehicleSettings(settings);
		if(Imported.CGMZ_VehicleInteriors) {
			const interior = this._customVehicleSettings[settings.id].interior;
			$cgmz.addCustomVehicleInterior(settings.id, interior.mapId, interior.x, interior.y, interior.dir);
		}
	}
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_CustomVehicles_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_CustomVehicles_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_CustomVehicles", "Change Vehicle Interior", this.pluginCommandCustomVehiclesChangeInterior);
	PluginManager.registerCommand("CGMZ_CustomVehicles", "Change Vehicle Location", this.pluginCommandCustomVehiclesChangeLocation);
	PluginManager.registerCommand("CGMZ_CustomVehicles", "Change Vehicle Image", this.pluginCommandCustomVehiclesChangeImage);
	PluginManager.registerCommand("CGMZ_CustomVehicles", "Change Vehicle BGM", this.pluginCommandCustomVehiclesChangeBGM);
};
//-----------------------------------------------------------------------------
// Plugin Command - Change Vehicle Interior
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCustomVehiclesChangeInterior = function(args) {
	const vehicle = args.Vehicle;
	const loc = CGMZ_Utils.parseMapParam(args.Location, "[CGMZ] Custom Vehicles");
	const dir = Number(args.Direction);
	if(vehicle) $cgmz.changeVehicleInterior(vehicle, loc.mapId, loc.x, loc.y, dir);
};
//-----------------------------------------------------------------------------
// Plugin Command - Change Vehicle Location
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCustomVehiclesChangeLocation = function(args) {
	const loc = CGMZ_Utils.parseMapParam(args.Location, "[CGMZ] Custom Vehicles");
	const dir = Number(args.Direction);
	const vehicle = $gameMap.vehicle(args.Vehicle);
	if(vehicle) {
		vehicle.setLocation(loc.mapId, loc.x, loc.y);
		vehicle.setDirection(dir);
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Change Vehicle Image
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCustomVehiclesChangeImage = function(args) {
	const vehicle = $gameMap.vehicle(args.Vehicle);
	if(vehicle) {
		const img = CGMZ_Utils.getImageData(args.Image, "img");
		const index = Number(args.Index);
		vehicle.setImage(img.filename, index);
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Change Vehicle BGM
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCustomVehiclesChangeBGM = function(args) {
	const vehicle = $gameMap.vehicle(args.Vehicle);
	if(vehicle) {
		const bgm = CGMZ_Utils.parseSoundEffectJSON(args.BGM, '[CGMZ] Custom Vehicles');
		vehicle.setBgm(bgm);
	}
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// Add custom vehicle interior on startup
//=============================================================================
//-----------------------------------------------------------------------------
// Try to add a custom Vehicle Interior, only succeeds if the vehicle interior
// does not already exist. Requires [CGMZ] Vehicle Interiors
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.addCustomVehicleInterior = function(vehicle, mapId, x, y, dir) {
	if(!Imported.CGMZ_VehicleInteriors) return;
	if(!this._vehicleInteriors[vehicle]) {
		this._vehicleInteriors[vehicle] = {};
		this._vehicleInteriors[vehicle].mapId = mapId;
		this._vehicleInteriors[vehicle].x = x;
		this._vehicleInteriors[vehicle].y = y;
		this._vehicleInteriors[vehicle].dir = dir;
	}
};
//-----------------------------------------------------------------------------
// Load new vehicle interiors with saved game
//-----------------------------------------------------------------------------
const alias_CGMZ_CustomVehicles_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_CustomVehicles_onAfterLoad.call(this);
	if(Imported.CGMZ_VehicleInteriors) {
		for(const key of Object.keys($cgmzTemp._customVehicleSettings)) {
			const interior = $cgmzTemp._customVehicleSettings[key].interior;
			this.addCustomVehicleInterior(key, interior.mapId, interior.x, interior.y, interior.dir);
		}
	}
};
//=============================================================================
// Game_Map
//-----------------------------------------------------------------------------
// Add new vehicles, handling for new vehicles
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also create custom vehicles
//-----------------------------------------------------------------------------
const CGMZ_CustomVehicles_GameMap_createVehicles = Game_Map.prototype.createVehicles;
Game_Map.prototype.createVehicles = function() {
    CGMZ_CustomVehicles_GameMap_createVehicles.call(this);
	for(const type of CGMZ.CustomVehicles.VehicleTypes) {
		this._vehicles.push(new CGMZ_CustomVehicle(type));
	}
};
//-----------------------------------------------------------------------------
// Alias. Also find custom vehicle
//-----------------------------------------------------------------------------
const CGMZ_CustomVehicles_GameMap_vehicle = Game_Map.prototype.vehicle;
Game_Map.prototype.vehicle = function(type) {
    return CGMZ_CustomVehicles_GameMap_vehicle.call(this, type) || this.CGMZ_vehicle(type);
};
//-----------------------------------------------------------------------------
// Get a custom vehicle of the given type
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_vehicle = function(type) {
    return this._vehicles.find(vehicle => vehicle._type === type);
};
//-----------------------------------------------------------------------------
// Check if any custom vehicles are at the given x/y coordinates
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_anyCustomVehicles = function(x, y) {
	for(let i = 3; i < this._vehicles.length; i++) {
		if(this._vehicles[i].pos(x, y)) return true;
	}
    return false;
};
//-----------------------------------------------------------------------------
// Check if any offset landing custom vehicles are at the given x/y coordinates
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_anyOffsetCustomVehicles = function(x, y) {
	for(let i = 3; i < this._vehicles.length; i++) {
		if(this._vehicles[i].pos(x, y) && this._vehicles[i]._offsetLanding) return true;
	}
    return false;
};
//-----------------------------------------------------------------------------
// Get the custom vehicle at the given x/y coordinates
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_customVehicleAt = function(x, y) {
	for(let i = 3; i < this._vehicles.length; i++) {
		if(this._vehicles[i].pos(x, y)) return this._vehicles[i];
	}
    return null;
};
//-----------------------------------------------------------------------------
// Get the custom vehicle at the given x/y coordinates
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_offsetCustomVehicleAt = function(x, y) {
	for(let i = 3; i < this._vehicles.length; i++) {
		if(this._vehicles[i].pos(x, y) && this._vehicles[i]._offsetLanding) return this._vehicles[i];
	}
    return null;
};
//=============================================================================
// CGMZ_CustomVehicle
//-----------------------------------------------------------------------------
// Custom vehicle class
//=============================================================================
function CGMZ_CustomVehicle() {
    this.initialize(...arguments);
}
CGMZ_CustomVehicle.prototype = Object.create(Game_Vehicle.prototype);
CGMZ_CustomVehicle.prototype.constructor = CGMZ_CustomVehicle;
//-----------------------------------------------------------------------------
// Initialize the custom vehicle
//-----------------------------------------------------------------------------
CGMZ_CustomVehicle.prototype.initialize = function(type) {
	Game_Vehicle.prototype.initialize.call(this, type);
	this.initializeCGMZMembers();
};
//-----------------------------------------------------------------------------
// Initialize the custom vehicle private CGMZ members
//-----------------------------------------------------------------------------
CGMZ_CustomVehicle.prototype.initializeCGMZMembers = function() {
	const vehicle = this.vehicle();
	this._shallowWaterPassability = vehicle.shallowWaterPassability;
	this._deepWaterPassability = vehicle.deepWaterPassability;
	this._allTilesPassability = vehicle.allTilePassability;
	this._makePlayerThrough = vehicle.through;
	this._normalPassability = vehicle.normalPassability;
	this._startDir = vehicle.startDir;
	this._plainsLandingOnly = vehicle.plainsLandingOnly;
	this._passableLandingOnly = vehicle.passableLandingOnly;
	this._offsetLanding = vehicle.offsetLanding;
	this._landingDirection = vehicle.landingDirection;
	this._maxAltitude = vehicle.altitude;
	this._passableRegions = vehicle.passableRegions;
	this._passableTerrains = vehicle.passableTerrains;
	this._mapLinks = vehicle.mapLinks;
};
//-----------------------------------------------------------------------------
// Resets the vehicle's direction
//-----------------------------------------------------------------------------
CGMZ_CustomVehicle.prototype.resetDirection = function() {
    this.setDirection(this._startDir);
};
//-----------------------------------------------------------------------------
// Get the custom vehicle data object
//-----------------------------------------------------------------------------
CGMZ_CustomVehicle.prototype.vehicle = function() {
	return CGMZ.CustomVehicles.Vehicles[this._type];
};
//-----------------------------------------------------------------------------
// Initialize the vehicle move speed
//-----------------------------------------------------------------------------
CGMZ_CustomVehicle.prototype.initMoveSpeed = function() {
	const vehicle = this.vehicle();
	this.setMoveSpeed(vehicle.speed);
};
//-----------------------------------------------------------------------------
// Get on the vehicle
//-----------------------------------------------------------------------------
CGMZ_CustomVehicle.prototype.getOn = function() {
    Game_Vehicle.prototype.getOn.call(this);
	if(this.vehicle().switchId) $gameSwitches.setValue(this.vehicle().switchId, true);
	if(this._makePlayerThrough) $gamePlayer.setThrough(true);
};
//-----------------------------------------------------------------------------
// Get off the vehicle
//-----------------------------------------------------------------------------
CGMZ_CustomVehicle.prototype.getOff = function() {
	const dir = this._direction;
	Game_Vehicle.prototype.getOff.call(this);
    this.setDirection(this._landingDirection || dir);
	if(this.vehicle().switchId) $gameSwitches.setValue(this.vehicle().switchId, false);
};
//-----------------------------------------------------------------------------
// Check if map is passable
//-----------------------------------------------------------------------------
CGMZ_CustomVehicle.prototype.isMapPassable = function(x, y, d) {
    const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
	const regionId = $gameMap.regionId(x2, y2);
	const terrainTagDest = $gameMap.terrainTag(x2, y2);
	const onPassableTerrainTag = this._passableTerrains.includes($gameMap.terrainTag(x, y));
	if(this._passableRegions.includes(regionId)) return true;
	if(this._passableTerrains.includes(terrainTagDest)) return true;
    if(this._shallowWaterPassability) {
        return $gameMap.isBoatPassable(x2, y2);
    } else if(this._deepWaterPassability) {
        return $gameMap.isShipPassable(x2, y2);
    } else if(this._allTilesPassability) {
        return true;
	} else if(this._normalPassability) {
		if(onPassableTerrainTag) return $gameMap.isPassable(x2, y2);
		return Game_Character.prototype.isMapPassable.call(this, x, y, d);
    } else {
        return false;
    }
};
//-----------------------------------------------------------------------------
// Check if map is passable
//-----------------------------------------------------------------------------
CGMZ_CustomVehicle.prototype.isLandOk = function(x, y, d) {
	if($gamePlayer.CGMZ_isMapLinkTransfer()) return false;
	if(this._offsetLanding) {
		const x2 = $gameMap.roundXWithDirection(x, d);
		const y2 = $gameMap.roundYWithDirection(y, d);
		if(!$gameMap.isValid(x2, y2)) return false;
		if(!$gameMap.isPassable(x2, y2, this.reverseDir(d))) return false;
		if(this.isCollidedWithCharacters(x2, y2)) return false;
	} else {
		if(this._plainsLandingOnly && !$gameMap.isAirshipLandOk(x, y)) return false;
		if($gameMap.eventsXy(x, y).length > 0) return false;
	}
	if(!this.CGMZ_VehicleLandingRestrictions_canLand(x, y, d)) return false;
	return true;
};
//-----------------------------------------------------------------------------
// Check if the vehicle can move
//-----------------------------------------------------------------------------
CGMZ_CustomVehicle.prototype.canMove = function() {
    return this.isHighest();
};
//-----------------------------------------------------------------------------
// Get the maximum altitude of the vehicle
//-----------------------------------------------------------------------------
CGMZ_CustomVehicle.prototype.maxAltitude = function() {
	return this._maxAltitude;
};
//-----------------------------------------------------------------------------
// Check if the vehicle is set to ignore events
//-----------------------------------------------------------------------------
CGMZ_CustomVehicle.prototype.ignoreEvents = function() {
	return this.vehicle().ignoreEvents;
};
//-----------------------------------------------------------------------------
// Update custom vehicle settings
//-----------------------------------------------------------------------------
CGMZ_CustomVehicle.prototype.update = function() {
	Game_Vehicle.prototype.update.call(this);
	if(this._maxAltitude > 0) {
		this.updateAirship();
	}
};
//-----------------------------------------------------------------------------
// Check if the vehicle has any map links
//-----------------------------------------------------------------------------
CGMZ_CustomVehicle.prototype.hasMapLinks = function() {
	return this._mapLinks.length > 0;
};
//-----------------------------------------------------------------------------
// Attempt to find an eligible map link transfer. Returns first one if multiple
//-----------------------------------------------------------------------------
CGMZ_CustomVehicle.prototype.getMapLinkTransfer = function() {
	const regionId = $gameMap.regionId($gamePlayer.x, $gamePlayer.y);
	for(const ml of this._mapLinks) {
		if(ml.fromMapId !== $gameMap.mapId()) continue;
		if(ml.blocks.length > 0 && ml.blocks.includes(regionId)) continue;
		if(ml.required.length > 0 && !ml.required.includes(regionId)) continue;
		return ml;
	}
	return null;
};
//-----------------------------------------------------------------------------
// Check if the vehicle has an interior
// Requires CGMZ Vehicle Interiors
//-----------------------------------------------------------------------------
CGMZ_CustomVehicle.prototype.hasInterior = function() {
	if(!Imported.CGMZ_VehicleInteriors) return false;
	const interior = $cgmz.getVehicleInterior(this._type);
    return !!interior && interior.mapId > 0;
};
//-----------------------------------------------------------------------------
// Check the region the player is in for a no-land region
// Does not require CGMZ Vehicle Landing Restrictions
//-----------------------------------------------------------------------------
CGMZ_CustomVehicle.prototype.CGMZ_VehicleLandingRestrictions_canLand = function(x, y, d) {
    const currentRegionId = $gameMap.regionId(x, y);
	const vehicleRegionRestrictions = this.vehicle().landingRegionRestrictions;
	return !vehicleRegionRestrictions.includes(currentRegionId);
};
//=============================================================================
// Game_Player
//-----------------------------------------------------------------------------
// Handle custom vehicles too
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Check if player is in a vehicle including custom vehicles
//-----------------------------------------------------------------------------
const alias_CGMZ_CustomVehicles_GamePlayer_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
	alias_CGMZ_CustomVehicles_GamePlayer_initMembers.call(this);
	this._CGMZ_mapLinkTransferTime = 0;
	this._CGMZ_isMapLinkTransfer = false;
	this._CGMZ_mapLinkTransferInfo = null;
};
//-----------------------------------------------------------------------------
// Alias. Update custom vehicle too
//-----------------------------------------------------------------------------
const alias_CGMZ_CustomVehicles_GamePlayer_updateVehicle = Game_Player.prototype.updateVehicle;
Game_Player.prototype.updateVehicle = function() {
	alias_CGMZ_CustomVehicles_GamePlayer_updateVehicle.call(this);
	if(this.CGMZ_isInCustomVehicle()) {
		this.CGMZ_updateCustomVehicle();
	}
};
//-----------------------------------------------------------------------------
// Update custom vehicle
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_updateCustomVehicle = function() {
	if(this._CGMZ_isMapLinkTransfer) {
		this._CGMZ_mapLinkTransferTime--;
		if(this._CGMZ_mapLinkTransferTime <= 0) {
			this._CGMZ_isMapLinkTransfer = false;
			this.reserveTransfer(this._CGMZ_mapLinkTransferInfo.mapId, this.x, this.y, this.direction(), this._CGMZ_mapLinkTransferInfo.fade)
			this._CGMZ_mapLinkTransferInfo = null;
		}
	} else {
		this.CGMZ_updateCustomVehicleMapLinkTransfer();
	}
};
//-----------------------------------------------------------------------------
// Update custom vehicle map link transfer
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_updateCustomVehicleMapLinkTransfer = function() {
	if(this.CGMZ_canMapLinkTransfer()) {
		const transfer = this.vehicle().getMapLinkTransfer();
		if(transfer) {
			this._CGMZ_isMapLinkTransfer = true;
			this._CGMZ_mapLinkTransferTime = transfer.wait;
			$gameTemp.requestAnimation([this], transfer.animation, false);
			this._CGMZ_mapLinkTransferInfo = {mapId: transfer.toMapId, x: this.x, y: this.y, d: this.direction(), fade: transfer.fade};
		}
	}
};
//-----------------------------------------------------------------------------
// Check if should try to map link transfer
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_canMapLinkTransfer = function() {
	if(this.CGMZ_isMapLinkTransfer()) return false;
	if(this._vehicleGettingOn || this._vehicleGettingOff) return false;
	if(!this.vehicle().hasMapLinks()) return false;
	return this.CGMZ_mapLinkTransferHasButtonInput();
};
//-----------------------------------------------------------------------------
// Check if should try to map link transfer
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_canMapLinkTransfer = function() {
	if(CGMZ.CustomVehicles.LinkGamepad >= 0) {
		const gamepad = $cgmzTemp.getLastGamepad();
		if(gamepad?.buttons) return ($cgmzTemp.isKeyPressed(CGMZ.CustomVehicles.LinkKey) || gamepad.buttons[CGMZ.CustomVehicles.LinkGamepad]?.pressed);
	}
	return $cgmzTemp.isKeyPressed(CGMZ.CustomVehicles.LinkKey);
};
//-----------------------------------------------------------------------------
// Check if currently map link transferring
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_isMapLinkTransfer = function() {
	return this._CGMZ_isMapLinkTransfer;
};
//-----------------------------------------------------------------------------
// Alias. Check if player is in a vehicle including custom vehicles
//-----------------------------------------------------------------------------
const alias_CGMZ_CustomVehicles_GamePlayer_isInVehicle = Game_Player.prototype.isInVehicle;
Game_Player.prototype.isInVehicle = function() {
    return alias_CGMZ_CustomVehicles_GamePlayer_isInVehicle.call(this) || this.CGMZ_isInCustomVehicle();
};
//-----------------------------------------------------------------------------
// Check if player is in a custom vehicle
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_isInCustomVehicle = function() {
    return CGMZ.CustomVehicles.VehicleTypes.includes(this._vehicleType);
};
//-----------------------------------------------------------------------------
// Check if player is in a custom vehicle that lands with 1 tile offset
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_isInOffsetLandCustomVehicle = function() {
	const vehicle = this.vehicle();
    return vehicle && vehicle._offsetLanding;
};
//-----------------------------------------------------------------------------
// Check if player can get on custom vehicles
//-----------------------------------------------------------------------------
const alias_CGMZ_CustomVehicles_GamePlayer_triggerTouchActionD1 = Game_Player.prototype.triggerTouchActionD1;
Game_Player.prototype.triggerTouchActionD1 = function(x1, y1) {
    if($gameMap.CGMZ_anyCustomVehicles(x1, y1)) {
        if (TouchInput.isTriggered() && this.getOnOffVehicle()) {
            return true;
        }
    }
    return alias_CGMZ_CustomVehicles_GamePlayer_triggerTouchActionD1.call(this, x1, y1);
};
//-----------------------------------------------------------------------------
// Check if player can get on custom vehicles
//-----------------------------------------------------------------------------
const alias_CGMZ_CustomVehicles_GamePlayer_triggerTouchActionD2 = Game_Player.prototype.triggerTouchActionD2;
Game_Player.prototype.triggerTouchActionD2 = function(x2, y2) {
	if($gameMap.CGMZ_anyOffsetCustomVehicles(x2, y2)) {
		if(TouchInput.isTriggered() && this.getOnVehicle()) {
			return true;
		}
	}
	if(this.CGMZ_isInOffsetLandCustomVehicle()) {
		if(TouchInput.isTriggered() && this.getOffVehicle()) {
			return true;
		}
	}
	return alias_CGMZ_CustomVehicles_GamePlayer_triggerTouchActionD2.call(this, x2, y2);
};
//-----------------------------------------------------------------------------
// Try to get on custom vehicles if no normal vehicle available
//-----------------------------------------------------------------------------
const alias_CGMZ_CustomVehicles_GamePlayer_getOnVehicle = Game_Player.prototype.getOnVehicle;
Game_Player.prototype.getOnVehicle = function() {
	const direction = this.direction();
	const x1 = this.x;
	const y1 = this.y;
	const x2 = $gameMap.roundXWithDirection(x1, direction);
	const y2 = $gameMap.roundYWithDirection(y1, direction);
	let vehicle = $gameMap.CGMZ_customVehicleAt(x1, y1);
	if(vehicle) {
		this._vehicleType = vehicle._type;
	} else {
		vehicle = $gameMap.CGMZ_offsetCustomVehicleAt(x2, y2);
		if(vehicle) {
			this._vehicleType = vehicle._type;
		}
	}
	if(this.isInVehicle()) {
		this._vehicleGettingOn = true;
		if(vehicle && vehicle._offsetLanding) {
			this.forceMoveForward();
		}
		this.gatherFollowers();
		return true;
	}
	return alias_CGMZ_CustomVehicles_GamePlayer_getOnVehicle.call(this);
};
//-----------------------------------------------------------------------------
// Try to get off custom vehicles if no normal vehicle available
//-----------------------------------------------------------------------------
const alias_CGMZ_CustomVehicles_GamePlayer_getOffVehicle = Game_Player.prototype.getOffVehicle;
Game_Player.prototype.getOffVehicle = function() {
	if(this.CGMZ_isInCustomVehicle()) {
		if(this.vehicle().isLandOk(this.x, this.y, this.direction())) {
			this._followers.synchronize(this.x, this.y, this.direction());
			this.vehicle().getOff();
			if(this.vehicle()._offsetLanding) {
				this.forceMoveForward();
				this.setTransparent(false);
			}
			this._vehicleGettingOff = true;
			this.setMoveSpeed(4);
			this.setThrough(false);
			this.makeEncounterCount();
			this.gatherFollowers();
			return true;
		}
	}
	return alias_CGMZ_CustomVehicles_GamePlayer_getOffVehicle.call(this);
};
//-----------------------------------------------------------------------------
// Alias. Make encounter count (avg steps differ based on vehicle)
//-----------------------------------------------------------------------------
const alias_CGMZ_CustomVehicles_makeEncounterCount = Game_Player.prototype.makeEncounterCount;
Game_Player.prototype.makeEncounterCount = function() {
    if(this.CGMZ_isInCustomVehicle()) {
		const steps = this.vehicle().vehicle().encounterOpts.steps;
		if(steps > 0) {
			this._encounterCount = Math.randomInt(steps) + Math.randomInt(steps) + 1;
		} else {
			alias_CGMZ_CustomVehicles_makeEncounterCount.call(this);
		}
	} else {
		alias_CGMZ_CustomVehicles_makeEncounterCount.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Check if vehicle encounter switch is on if in custom vehicle
//-----------------------------------------------------------------------------
const alias_CGMZ_CustomVehicles_canEncounter = Game_Player.prototype.canEncounter;
Game_Player.prototype.canEncounter = function() {
	if(!this.CGMZ_isInCustomVehicle()) return alias_CGMZ_CustomVehicles_canEncounter.call(this);
	const encounterOpts = this.vehicle().vehicle().encounterOpts;
	return $gameSwitches.value(encounterOpts.enableSwitch);
};
//-----------------------------------------------------------------------------
// Alias. Different encounter lists for custom vehicles
//-----------------------------------------------------------------------------
const alias_CGMZ_CustomVehicles_makeEncounterTroopId = Game_Player.prototype.makeEncounterTroopId;
Game_Player.prototype.makeEncounterTroopId = function() {
	if(this.CGMZ_isInCustomVehicle()) {
		const encounterList = this.vehicle().vehicle().encounterList;
		const encounterId = Math.randomInt(encounterList.length);
		return encounterList[encounterId];
	} else {
		return alias_CGMZ_CustomVehicles_makeEncounterTroopId.call(this);
	}
};
//-----------------------------------------------------------------------------
// Prevent player from moving during map link transfer
//-----------------------------------------------------------------------------
const alias_CGMZ_CustomVehicles_GamePlayer_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
	const oldReturn = alias_CGMZ_CustomVehicles_GamePlayer_canMove.call(this);
	if(this._CGMZ_isMapLinkTransfer) return false;
	return oldReturn;
};
//-----------------------------------------------------------------------------
// Prevent player from activating events if in custom vehicle
//-----------------------------------------------------------------------------
const alias_CGMZ_CustomVehicles_GamePlayer_canStartLocalEvents = Game_Player.prototype.canStartLocalEvents;
Game_Player.prototype.canStartLocalEvents = function() {
	if(this.CGMZ_isInCustomVehicle() && this.vehicle().ignoreEvents()) return false;
    return alias_CGMZ_CustomVehicles_GamePlayer_canStartLocalEvents.call(this);
};
//-----------------------------------------------------------------------------
// Check for vehicle interior input, execute transfer if input detected
//-----------------------------------------------------------------------------
if(Imported.CGMZ_VehicleInteriors) {
const alias_CGMZ_CustomVehicles_GamePlayer_CGMZ_getVehicleInteriorRecallType = Game_Player.prototype.CGMZ_getVehicleInteriorRecallType;
Game_Player.prototype.CGMZ_getVehicleInteriorRecallType = function() {
	const orig = alias_CGMZ_CustomVehicles_GamePlayer_CGMZ_getVehicleInteriorRecallType.call(this);
	if(orig !== 'walk') return orig;
	if(!this.CGMZ_isInCustomVehicle()) return orig;
	return this._vehicleType;
};
}
//=============================================================================
// Spriteset_Map
//-----------------------------------------------------------------------------
// Update the shadow for custom vehicles
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also create custom vehicle shadow sprites
//-----------------------------------------------------------------------------
const CGMZ_CustomVehicles_SpritesetMap_createShadow = Spriteset_Map.prototype.createShadow;
Spriteset_Map.prototype.createShadow = function() {
    CGMZ_CustomVehicles_SpritesetMap_createShadow.apply(this, arguments);
};
//-----------------------------------------------------------------------------
// Alias. Update shadow for custom vehicles if not in airship
//-----------------------------------------------------------------------------
const CGMZ_CustomVehicles_SpritesetMap_updateShadow = Spriteset_Map.prototype.updateShadow;
Spriteset_Map.prototype.updateShadow = function() {
	if($gamePlayer.CGMZ_isInCustomVehicle()) {
		this.CGMZ_updateCustomVehicleShadow();
	} else {
		CGMZ_CustomVehicles_SpritesetMap_updateShadow.apply(this, arguments);
	}
};
//-----------------------------------------------------------------------------
// Update the shadow sprite if player is in custom vehicle
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.CGMZ_updateCustomVehicleShadow = function() {
	const vehicle = $gamePlayer.vehicle();
    this._shadowSprite.x = vehicle.shadowX();
    this._shadowSprite.y = vehicle.shadowY();
    this._shadowSprite.opacity = vehicle.shadowOpacity();
};
//=============================================================================
// Sprite_Battleback
//-----------------------------------------------------------------------------
// Show battlebacks for vehicle encounters
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Show different battleback1 depending on vehicle
//-----------------------------------------------------------------------------
const alias_CGMZ_CustomVehicles_battleback1Name = Sprite_Battleback.prototype.battleback1Name
Sprite_Battleback.prototype.battleback1Name = function() {
    if($gamePlayer.CGMZ_isInCustomVehicle()) {
		return $gamePlayer.vehicle().vehicle().encounterOpts.battleback1;
	} else {
		return alias_CGMZ_CustomVehicles_battleback1Name.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Show different battleback2 depending on vehicle
//-----------------------------------------------------------------------------
const alias_CGMZ_CustomVehicles_battleback2Name = Sprite_Battleback.prototype.battleback2Name
Sprite_Battleback.prototype.battleback2Name = function() {
    if($gamePlayer.CGMZ_isInCustomVehicle()) {
		return $gamePlayer.vehicle().vehicle().encounterOpts.battleback2;
	} else {
		return alias_CGMZ_CustomVehicles_battleback2Name.call(this);
	}
};