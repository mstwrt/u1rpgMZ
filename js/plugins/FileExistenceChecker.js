/*:
 * @target MZ
 * @plugindesc v1.0.0 Check if files exist in your game directory - works on Windows, Mac, Android and browsers!
 * @author ApocVerse
 * @url https://apocverse.itch.io/
 * 
 * @command checkFile
 * @text Check File Exists
 * @desc Check if a specific file exists in the game directory
 * 
 * @arg filename
 * @type text
 * @text File Name
 * @desc Name of the file to check (including extension)
 * 
 * @arg switchId
 * @type switch
 * @text Result Switch
 * @desc Switch that will be turned ON if file exists, OFF if it doesn't
 * 
 * @command checkMultipleFiles
 * @text Check Multiple Files
 * @desc Check if multiple files exist in the game directory
 * 
 * @arg filenames
 * @type text
 * @text File Names
 * @desc Comma-separated list of files to check (including extensions)
 * 
 * @arg allExistSwitchId
 * @type switch
 * @text All Files Exist Switch
 * @desc Switch that will be turned ON if ALL files exist
 * 
 * @arg anyExistSwitchId
 * @type switch
 * @text Any File Exists Switch
 * @desc Switch that will be turned ON if ANY file exists
 * 
 * @help
 * FileExistenceChecker.js
 * Version 1.0.0
 * 
 * This plugin allows you to check if files exist in your game's directory.
 * It works across all platforms (Windows, Mac, Android, and Browser).
 * 
 * Features:
 * - Check if a single file exists
 * - Check multiple files at once
 * - Works on all platforms
 * - Simple to use with plugin commands
 * - No coding required
 * 
 * How to use:
 * 1. Single File Check:
 *    - Add a "Plugin Command" in your event
 *    - Select "FileExistenceChecker"
 *    - Choose "Check File Exists"
 *    - Enter the filename (e.g., "data/custom.json")
 *    - Select a switch to store the result
 *    - The switch will turn ON if the file exists, OFF if it doesn't
 * 
 * 2. Multiple Files Check:
 *    - Add a "Plugin Command" in your event
 *    - Select "FileExistenceChecker"
 *    - Choose "Check Multiple Files"
 *    - Enter filenames separated by commas (e.g., "file1.txt, file2.png")
 *    - Select two switches:
 *      - First switch: ON if ALL files exist
 *      - Second switch: ON if ANY file exists
 * 
 * File Path Tips:
 * - Use relative paths from your game folder
 * - Example paths:
 *   - "file.txt" (in game root)
 *   - "data/file.json" (in data folder)
 *   - "img/pictures/photo.png" (in pictures folder)
 * 
 * Notes:
 * - Case sensitive on Android/Mobile
 * - Files must be included in deployment for mobile/web
 * - Supports any file type
 * - Maximum of 50 files for multiple check
 * 
 * Terms of Use:
 * - Free for commercial and non-commercial use
 * - Credit is appreciated but not required
 * - No warranty or support guaranteed
 * 
 * For updates and support:
 * https://apocverse.itch.io/
 */

(() => {
    const pluginName = "FileExistenceChecker";
    console.log('Initializing ' + pluginName);

    // Helper function to check file existence
    const checkFileExists = async (filename) => {
        console.log("Checking file: " + filename);
        
        if (Utils.isNwjs()) {
            console.log("Using NW.js mode");
            const fs = require('fs');
            const path = require('path');
            const basePath = path.dirname(process.mainModule.filename);
            const projectPath = path.join(basePath, filename);
            
            return new Promise(resolve => {
                fs.access(projectPath, fs.constants.F_OK, (err) => {
                    const exists = !err;
                    console.log("File exists: " + exists);
                    resolve(exists);
                });
            });
        } else {
            console.log("Using browser/mobile mode");
            return new Promise(resolve => {
                const xhr = new XMLHttpRequest();
                xhr.open('HEAD', filename, true);
                xhr.onload = () => {
                    const exists = xhr.status !== 404;
                    console.log("File exists: " + exists);
                    resolve(exists);
                };
                xhr.onerror = () => {
                    console.log("File check failed");
                    resolve(false);
                };
                xhr.send();
            });
        }
    };

    // Command registration
    PluginManager.registerCommand(pluginName, "checkFile", function(args) {
        console.log('checkFile command called with args:', args);
        
        // Ensure we have valid arguments
        if (!args.filename || !args.switchId) {
            console.error('Missing required arguments for checkFile command');
            return;
        }

        // Convert switch ID to number and validate
        const switchId = Number(args.switchId);
        if (isNaN(switchId)) {
            console.error('Invalid switch ID:', args.switchId);
            return;
        }

        console.log(`Checking file ${args.filename} for switch ${switchId}`);
        
        // Execute the file check and wait for it to complete
        checkFileExists(args.filename).then(exists => {
            console.log(`Setting switch ${switchId} to ${exists}`);
            $gameSwitches.setValue(switchId, exists);
            // Force refresh of game switches
            $gameMap.requestRefresh();
        }).catch(error => {
            console.error('Error during file check:', error);
            $gameSwitches.setValue(switchId, false);
        });
    });

    PluginManager.registerCommand(pluginName, "checkMultipleFiles", function(args) {
        console.log('checkMultipleFiles command called with args:', args);
        
        if (!args.filenames || !args.allExistSwitchId || !args.anyExistSwitchId) {
            console.error('Missing required arguments for checkMultipleFiles command');
            return;
        }

        const filenames = args.filenames.split(',').map(f => f.trim());
        console.log('Checking files:', filenames);
        
        Promise.all(filenames.map(checkFileExists)).then(results => {
            const allExist = results.every(result => result);
            const anyExist = results.some(result => result);
            
            console.log(`Setting switches - All exist (${args.allExistSwitchId}): ${allExist}, Any exist (${args.anyExistSwitchId}): ${anyExist}`);
            
            $gameSwitches.setValue(Number(args.allExistSwitchId), allExist);
            $gameSwitches.setValue(Number(args.anyExistSwitchId), anyExist);
            // Force refresh of game switches
            $gameMap.requestRefresh();
        }).catch(error => {
            console.error('Error during multiple file check:', error);
            $gameSwitches.setValue(Number(args.allExistSwitchId), false);
            $gameSwitches.setValue(Number(args.anyExistSwitchId), false);
        });
    });
})();