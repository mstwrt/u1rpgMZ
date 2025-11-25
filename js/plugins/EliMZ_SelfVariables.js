//==========================================================================
// EliMZ_SelfVariables.js
//==========================================================================

/*:
@target MZ

@plugindesc ♦2.1.2♦ Self Variables fully integrated with events!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-self-variables-for-rpg-maker-mz/rate?source=game

@help
★★★★★ Rate the plugin! Please, is very important to me ^^
● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

==============================================================================
Requirements
==============================================================================

Need Eli Book.
Order After Eli Book.

============================================================================
Features
============================================================================

● Add self variables to events.
● These self variables are persistent across the map.
● Can use plugin command to change the self variable of other events/maps.
● Integration with the default event commands!
● Work on the conditions tab of an event page.

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1kA0AWVaNkewPCqbqra2OC6pgMDyoJBSZMDj67BsBHKU/edit?usp=sharing

============================================================================

@param eventIdVar
@text Target Event Id Variable
@type variable
@desc See the help file, on section: ♦ Default event command ♦
@default 0

@param mapIdVar
@text Target Map Id Variable
@type variable
@desc See the help file, on section: ♦ Default event command ♦
@default 0

@command set
@text Control Self Variables
@desc Change the value of self variables from other events or maps.

    @arg mapId
    @text Map Id
    @type text
    @desc Choose a map Id. Leave at 0 to refer to the current map.
    @default 0

    @arg eventId
    @text Event Id
    @type text
    @desc Choose the event Id.
    @default 1

    @arg sVar
    @text Self Var id
    @type variable
    @desc Choose the var id here.
    @default 1

    @arg operationType
    @text Operation Type
    @type select
    @option Set
    @option Add
    @option Sub
    @option Mul
    @option Div
    @option Mod
    @desc Choose the operation type.
    @default Set

    @arg value
    @text Value
    @type text
    @desc You can set the value here. Can use formulas.
    @default 0

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_SelfVariables = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
Eli.SelfVariables = {

    Parameters: class {
        constructor(parameters){
            this.mapIdVar = Number(parameters.maIdVar)
            this.eventIdVar = Number(parameters.eventIdVar)
        }
    },
    
    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = PluginManager.parameters(Eli.PluginManager.getPluginName())
        this.parameters = new this.Parameters(parameters)
    },

    initPluginCommands(){
        const commands = ["set"]
        Eli.PluginManager.registerCommands(this, commands)
    },

    getParam(){
        return this.parameters
    },

    set(args){
        const mapId = Number(args.mapId) || $gameMap.mapId()
        const eventId = Number(args.eventId) || Eli.PluginManager.currentEventId
        const varId = Number(args.sVar)
        const key = [mapId, eventId, varId]
        const newValue = Number((Eli.Utils.processEscapeVarOrFormula(args.value)))
        const currentValue = $gameVariables.selfValue(key)
        const value = this.calculateValue(args.operationType, currentValue, newValue)
        
        $gameVariables.setSelfValue(key, value)
    },
    
    calculateValue(operationType, currentValue, newValue){
        switch(operationType){
            case "Set": return newValue
            case "Add": return currentValue + newValue
            case "Sub": return currentValue - newValue
            case "Mul": return currentValue * newValue
            case "Div": return currentValue / newValue
            case "Mod": return currentValue % newValue
        }
    },

}

{

const Alias = {}
const Plugin = Eli.SelfVariables

Plugin.initialize()

/* -------------------------------- VARIABLES ------------------------------- */
Alias.Game_Variables_clear = Game_Variables.prototype.clear
Game_Variables.prototype.clear = function() {
    Alias.Game_Variables_clear.call(this)
    this.clearSelfData()
}

Game_Variables.prototype.clearSelfData = function() {
    this._selfData = {}
}

Game_Variables.prototype.isSelf = function(variableId){
    const systemVars = $dataSystem.variables
    return !!(systemVars[variableId] && systemVars[variableId].includes("SV:"))
}

Game_Variables.prototype.selfValue = function(key){
    key[0] = key[0] || $gameMap.mapId()
    return this._selfData[key] || 0
}

Game_Variables.prototype.setSelfValue = function(key, value) {
    if(value){
        this._selfData[key] = Math.floor(value) || value
    }else{
        delete this._selfData[key]
    }

    this.onChange()
}

Game_Variables.prototype.isTargetEventVariable = function(id){
    return id === Plugin.getParam().eventIdVar
}

/* ------------------------------- GAME EVENT ------------------------------- */
Alias.Game_Event_meetsConditions = Game_Event.prototype.meetsConditions
Game_Event.prototype.meetsConditions = function(page) {
    const alias = Alias.Game_Event_meetsConditions.call(this, page)

    if(this.meetsSelfVariableConditions(page)){
        return true
    }

    return alias
}

Game_Event.prototype.meetsSelfVariableConditions = function(page){
    const c = page.conditions

    if(c.variableValid && $gameVariables.isSelf(c.variableId)){        
        const key = [this._mapId, this._eventId, c.variableId]

        if($gameVariables.selfValue(key) >= c.variableValue){
            return true
        }
    }

    return false
}

/* ---------------------------- GAME INTERPRETER ---------------------------- */
// Conditional Branch
Alias.Game_Interpreter_command111 = Game_Interpreter.prototype.command111
Game_Interpreter.prototype.command111 = function(params){
    if(this.command111_hasSelfVariable(params)){
        return this.command111_SelfVariable(params)
    }else{
        return Alias.Game_Interpreter_command111.call(this, params)
    }
}

Game_Interpreter.prototype.command111_hasSelfVariable = function(params) {
    if(params[0] === 1){
        const firstCheckIsSelf = $gameVariables.isSelf(params[1])
        const secondCheckIsSelf = params[2] === 1 && $gameVariables.isSelf(params[3])
        
        return firstCheckIsSelf || secondCheckIsSelf
    }else{
        return false
    }
}

Game_Interpreter.prototype.command111_SelfVariable = function(params) {
    const mapId = this.getTargetMapIdSelfVariable()
    const eventId = this.getTargetEventIdSelfVariable()
    let value1, value2

    if($gameVariables.isSelf(params[1])){
        const key = [mapId, eventId, params[1]]
        value1 = $gameVariables.selfValue(key)
    }else{
        value1 = $gameVariables.value(params[1])
    }

    if(params[2] === 0){
        value2 = params[3]
    }else if($gameVariables.isSelf(params[3])){
        const key = [mapId, eventId, params[3]]
        value2 = $gameVariables.selfValue(key)
    }else{
        value2 = $gameVariables.value(params[3])
    }

    const result = {
        0: value1 === value2,
        1: value1 >= value2,
        2: value1 <= value2,
        3: value1 > value2,
        4: value1 < value2,
        5: value1 !== value2,
    }[params[4]]

    this._branch[this._indent] = result

    if (this._branch[this._indent] === false) {
        this.skipBranch()
    }

    return true
}

// Control variable
Alias.Game_Interpreter_command122 = Game_Interpreter.prototype.command122
Game_Interpreter.prototype.command122 = function(params) {
    if(this.command122_hasSelfVariable(params)){
        return this.command122_SelfVariable(params)
    }else{
        return Alias.Game_Interpreter_command122.call(this, params)
    }
}

Game_Interpreter.prototype.command122_hasSelfVariable = function(params) {
    return $gameVariables.isSelf(params[0]) || (params[3] === 1 && $gameVariables.isSelf(params[4]))
}

Game_Interpreter.prototype.command122_SelfVariable = function(params){
    const [startId, endId, operationType, operand] = params
    const targetMapId = this.getTargetMapIdSelfVariable()
    const targetEventId = this.getTargetEventIdSelfVariable()
    let value = 0
    let randomMax = 1

    switch (operand) {
        case 0: // Constant
            value = params[4]
            break
        case 1: // Variable
            if($gameVariables.isSelf(params[4])){
                const key = [targetMapId, targetEventId, params[4]]
                value = $gameVariables.selfValue(key)
            }else{
                value = $gameVariables.value(params[4])
            }
            break
        case 2: // Random
            value = params[4]
            randomMax = params[5] - params[4] + 1
            randomMax = Math.max(randomMax, 1)
            break
        case 3: // Game Data
            value = this.gameDataOperand(params[4], params[5], params[6])
            break
        case 4: // Script
            value = eval(params[4])
            break
    }

    for(let varId = startId; varId <= endId; varId++){
        const realValue = isNaN(value) ? value : value + Math.randomInt(randomMax)

        if($gameVariables.isSelf(varId)){
            this.operateSelfVariable(varId, operationType, realValue, targetMapId, targetEventId)
        }else{
            this.operateVariable(varId, operationType, realValue)
        }

    }

    return true
}

Game_Interpreter.prototype.operateSelfVariable = function(variableId, operationType, value, targetMapId, targetEventId) {
    if($gameVariables.isTargetEventVariable(variableId)){
        targetEventId = this._eventId
    }

    const key = [targetMapId, targetEventId, variableId]

    try{
        const oldValue = $gameVariables.selfValue(key)

        switch (operationType) {
            case 0: // Set
                $gameVariables.setSelfValue(key, value)
                break
            case 1: // Add
                $gameVariables.setSelfValue(key, oldValue + value)
                break
            case 2: // Sub
                $gameVariables.setSelfValue(key, oldValue - value)
                break
            case 3: // Mul
                $gameVariables.setSelfValue(key, oldValue * value)
                break
            case 4: // Div
                $gameVariables.setSelfValue(key, oldValue / value)
                break
            case 5: // Mod
                $gameVariables.setSelfValue(key, oldValue % value)
                break
        }

    }catch(e){
        $gameVariables.setSelfValue(key, 0)
    }
}

// Transfer Player
Alias.Game_Interpreter_command201 = Game_Interpreter.prototype.command201
Game_Interpreter.prototype.command201 = function(params) {
    let copyParams = params.map(param => param)

    if(this.command201_hasVariableDesignated(copyParams)){
        copyParams = this.command201_SelfVariables(copyParams)
    }
    
    return Alias.Game_Interpreter_command201.call(this, copyParams)
}

Game_Interpreter.prototype.command201_hasVariableDesignated = function(params) {
    return params[0] !== 0
}

Game_Interpreter.prototype.command201_SelfVariables = function(params){
    const mapId = this.getTargetMapIdSelfVariable()
    const eventId = this.getTargetEventIdSelfVariable()

    params[0] = 0
    params[1] = this.operateVariableArguments(mapId, eventId, params[1])
    params[2] = this.operateVariableArguments(mapId, eventId, params[2])
    params[3] = this.operateVariableArguments(mapId, eventId, params[3])

    return params
}

Game_Interpreter.prototype.operateVariableArguments = function(mapId, eventId, varId){
    if($gameVariables.isSelf(varId)){
        const key = [mapId, eventId, varId]
        return $gameVariables.selfValue(key)
    }else{
        return $gameVariables.value(varId)
    }
}

// Vehicle Location
Alias.Game_Interpreter_command202 = Game_Interpreter.prototype.command202
Game_Interpreter.prototype.command202 = function(params) {
    let copyParams = params.map(param => param)

    if(this.command202_hasVariableDesignated(copyParams)){
        copyParams = this.command202_SelfVariables(copyParams)
    }

    return Alias.Game_Interpreter_command202.call(this, copyParams)
}

Game_Interpreter.prototype.command202_hasVariableDesignated = function(params) {
    return  params[1] !== 0
}

Game_Interpreter.prototype.command202_SelfVariables = function(params){
    const mapId = this.getTargetMapIdSelfVariable()
    const eventId = this.getTargetEventIdSelfVariable()

    params[1] = 0
    params[2] = this.operateVariableArguments(mapId, eventId, params[2])
    params[3] = this.operateVariableArguments(mapId, eventId, params[3])
    params[4] = this.operateVariableArguments(mapId, eventId, params[4])

    return params
}

// Set Event Location
Alias.Game_Interpreter_command203 = Game_Interpreter.prototype.command203
Game_Interpreter.prototype.command203 = function(params) {
    let copyParams = params.map(param => param)

    if(this.command203_hasVariableDesignated(copyParams)){
        copyParams = this.command203_SelfVariable(copyParams)
    }

    return Alias.Game_Interpreter_command203.call(this, copyParams)
}

Game_Interpreter.prototype.command203_hasVariableDesignated = function(params){
    return params[1] === 1
}

Game_Interpreter.prototype.command203_SelfVariable = function(params){
    const mapId = this.getTargetMapIdSelfVariable()
    const eventId = this.getTargetEventIdSelfVariable()

    params[1] = 0
    params[2] = this.operateVariableArguments(mapId, eventId, params[2])
    params[3] = this.operateVariableArguments(mapId, eventId, params[3])

    return params
}

// Get Location Info
Alias.Game_Interpreter_command285 = Game_Interpreter.prototype.command285
Game_Interpreter.prototype.command285 = function(params) {
    if(this.command285_hasSelfVariable(params)){
        return this.command285_SelfVariable(params)
    }else{
        return Alias.Game_Interpreter_command285.call(this, params)
    }
}

Game_Interpreter.prototype.command285_hasSelfVariable = function(params){
    return  $gameVariables.isSelf(params[0]) || 
            params[2] === 1 && ($gameVariables.isSelf(params[3]) || $gameVariables.isSelf(params[4]))
}

Game_Interpreter.prototype.command285_SelfVariable = function(params){
    const mapId = this.getTargetMapIdSelfVariable()
    const eventId = this.getTargetEventIdSelfVariable()
    let x, y, value
    
    if(params[2] === 0){ // Direct designation
        x = params[3]
        y = params[4]

    }else if(params[2] === 1){ // Designation with variables
        x = this.operateVariableArguments([mapId, eventId, params[3]])
        y = this.operateVariableArguments([mapId, eventId, params[4]])

    }else{ // Designation by a character
        const character = this.character(params[3])
        x = character.x;
        y = character.y;
    }

    switch (params[1]) {
        case 0: // Terrain Tag
            value = $gameMap.terrainTag(x, y)
            break
        case 1: // Event ID
            value = $gameMap.eventIdXy(x, y)
            break
        case 2: // Tile ID (Layer 1)
        case 3: // Tile ID (Layer 2)
        case 4: // Tile ID (Layer 3)
        case 5: // Tile ID (Layer 4)
            value = $gameMap.tileId(x, y, params[1] - 2)
            break
        default: // Region ID
            value = $gameMap.regionId(x, y)
            break
    }

    if($gameVariables.isSelf(params[0])){
        $gameVariables.setSelfValue([mapId, eventId, params[0]], value)
    }else{
        $gameVariables.setValue(params[0], value)
    }
    
    return true
}

// Battle Processing
Alias.Game_Interpreter_command301 = Game_Interpreter.prototype.command301
Game_Interpreter.prototype.command301 = function(params) {
    let copyParams = params.map(param => param)

    if(this.command301_hasVariableDesignated(copyParams)){
        copyParams = this.command301_SelfVariable(copyParams)
    }

    return Alias.Game_Interpreter_command301.call(this, copyParams)
}

Game_Interpreter.prototype.command301_hasVariableDesignated = function(params){
    return params[0] === 1
}

Game_Interpreter.prototype.command301_SelfVariable = function(params){
    const mapId = this.getTargetMapIdSelfVariable()
    const eventId = this.getTargetEventIdSelfVariable()
    params[0] = 0
    params[1] = this.operateVariableArguments(mapId, eventId, params[1])

    return params
}

// For Show Picture and Move Picture
Alias.Game_Interpreter_picturePoint = Game_Interpreter.prototype.picturePoint
Game_Interpreter.prototype.picturePoint = function(params) {
    let copyParams = params.map(param => param)

    if(this.picturePoint_hasVariableDesignated(copyParams)){
        copyParams = this.picturePoint_SelfVariable(copyParams)
    }

    return Alias.Game_Interpreter_picturePoint.call(this, params)
}

Game_Interpreter.prototype.picturePoint_hasVariableDesignated = function(params){
    return params[3] !== 0
}

Game_Interpreter.prototype.picturePoint_SelfVariable = function(params){
    const mapId = this.getTargetMapIdSelfVariable()
    const eventId = this.getTargetEventIdSelfVariable()

    params[3] = 0
    params[4] = this.operateVariableArguments(mapId, eventId, params[4])
    params[5] = this.operateVariableArguments(mapId, eventId, params[5])

    return params
}

// To work with: Party Commands, and actor commands
Alias.Game_Interpreter_operateValue = Game_Interpreter.prototype.operateValue
Game_Interpreter.prototype.operateValue = function(operation, operandType, operand) {
    if(this.isSelfVariableOperandType(operandType, operand)){
        const [newType, newOperand] = this.changeOperandsForSelfVariable(operandType, operand)
        operandType = newType
        operand = newOperand
    }

    return Alias.Game_Interpreter_operateValue.call(this, operation, operandType, operand)
}

Game_Interpreter.prototype.isSelfVariableOperandType = function(operandType, operand) {
    return operandType !== 0 && $gameVariables.isSelf(operand)
}

Game_Interpreter.prototype.changeOperandsForSelfVariable = function(operandType, operand){
    const key = [
        this.getTargetMapIdSelfVariable(), 
        this.getTargetEventIdSelfVariable(), 
        operand
    ]

    operandType = 0
    operand = $gameVariables.selfValue(key)

    return [operandType, operand]
}

// Utilities
Game_Interpreter.prototype.getTargetMapIdSelfVariable = function(){
    const key = [this._mapId, this._eventId, Plugin.getParam().mapIdVar]
    return $gameVariables.selfValue(key) || this._mapId
}

Game_Interpreter.prototype.getTargetEventIdSelfVariable = function(){
    const key = [this._mapId, this._eventId, Plugin.getParam().eventIdVar]
    return $gameVariables.selfValue(key) || this._eventId
}

Game_Interpreter.prototype.getSv = function(variableId) {
    return this.selfVariableValue(variableId)
}

Game_Interpreter.prototype.selfVariableValue = function(variableId) {
    if($gameVariables.isSelf(variableId)){
        const key = [this._mapId, this._eventId, variableId]
        return $gameVariables.selfValue(key)
    }else{
        return 0
    }
}

Game_Interpreter.prototype.setSv = function(variableId, value) {
    this.setSelfVariableValue(variableId, value)
}

Game_Interpreter.prototype.setSelfVariableValue = function(variableId, value) {
    if($gameVariables.isSelf(variableId)){
        const key = [this._mapId, this._eventId, variableId]
        $gameVariables.setSelfValue(key, value)
    }
}

/* --------------------------- WINDOW NUMBER INPUT -------------------------- */
Alias.Window_NumberInput_processOk = Window_NumberInput.prototype.processOk
Window_NumberInput.prototype.processOk = function() {
    if(this.isWithSelfVariable()){
        this.changeSelfVariable()
    }

    Alias.Window_NumberInput_processOk.call(this)
}

Window_NumberInput.prototype.isWithSelfVariable = function() {
    return $gameVariables.isSelf($gameMessage.numInputVariableId())
}

Window_NumberInput.prototype.changeSelfVariable = function() {
    const inputValue = this._number
    const key = this.getSelfVariableKey()

    $gameVariables.setSelfValue(key, inputValue)
    this._number = 0
}

Window_NumberInput.prototype.getSelfVariableKey = function() {
    const interpreter = $gameMap._interpreter
    const varId = $gameMessage.numInputVariableId()
    const mapId = interpreter.getTargetMapIdSelfVariable()
    const eventId = interpreter.getTargetEventIdSelfVariable()
    const key = [mapId, eventId, varId]

    if($gameVariables.isTargetEventVariable(varId)){
        key[1] = interpreter._eventId
    }

    return key
}

/* ---------------------------- WINDOW EVENT ITEM --------------------------- */
Alias.Window_EventItem_onOk = Window_EventItem.prototype.onOk
Window_EventItem.prototype.onOk = function() {
    if(this.isWithSelfVariable()){
        this.changeSelfVariable()
    }

    Alias.Window_EventItem_onOk.call(this)
}

Alias.Window_EventItem_onCancel = Window_EventItem.prototype.onCancel
Window_EventItem.prototype.onCancel = function() {
    if(this.isWithSelfVariable()){
        this.changeSelfVariable(0)
    }

    Alias.Window_EventItem_onCancel.call(this)
}

Window_EventItem.prototype.isWithSelfVariable = function() {
    return $gameVariables.isSelf($gameMessage.itemChoiceVariableId())
}

Window_EventItem.prototype.changeSelfVariable = function(value) {
    const item = this.item();
    const itemId = item ? item.id : 0;
    const key = this.getSelfVariableKey()

    $gameVariables.setSelfValue(key, value ?? itemId)
}

Window_EventItem.prototype.getSelfVariableKey = function() {
    const interpreter = $gameMap._interpreter

    return [
        interpreter.getTargetMapIdSelfVariable(),
        interpreter.getTargetEventIdSelfVariable(),
        $gameMessage.itemChoiceVariableId()
    ]
}

}