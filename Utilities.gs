// Global variables/configurations
var DCMProfileID = 'DCMProfileID';
var DCMFloodlightConfigID = 'DCMFloodlightConfigID';
var AUTO_POP_HEADER_COLOR = '#a4c2f4';
var USER_INPUT_HEADER_COLOR = '#b6d7a8';
var AUTO_POP_CELL_COLOR = 'lightgray';


// Sheet names
var SETUP_SHEET = "Setup";
var GET_ACTIVITY_GROUPS = "GetActivityGroups"
var GET_FLOODLIGHT_CONFIG = "GetFloodlightConfig"
var CREATE_ACTIVITY_GROUPS = "CreateActivityGroups";
var GENERATE_TAGS = "GenerateTags";
var GET_ADVERTISERS = "GetAdvertisers";
var INSERT_ADVERTISERS = "InsertAdvertisers";

/**
 * fetch the DCM User profileid set in Setup tab
 * @return {string} DCM User profile ID.
 */
function _fetchProfileId() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var range = ss.getRangeByName(DCMProfileID);
  if (!range) {
    SpreadsheetApp.getUi().alert('User Profile ID cannot be null');
  }
  return range.getValue();
}

/**
 * fetch the DCM AdvertiserId set in Setup tab
 * @return {string} DCM Advertiser ID.
 */
function _fetchFloodlightConfigId() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var range = ss.getRangeByName(DCMFloodlightConfigID);
  if (!range) {
    SpreadsheetApp.getUi().alert('Floodlight Config ID cannot be null');
  }
  return range.getValue();
}

/**
 * fetch the UVars
 * @return {string} DCM Advertiser ID.
 */
function _fetchUvars() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var range = ss.getRangeByName(Uvars);
  return range.getValue();
}


/**
 * Find and clear, or create a new sheet named after the input argument.
 * @param {string} sheetName The name of the sheet which should be initialized.
 * @param {boolean} lock To lock the sheet after initialization or not
 * @return {object} A handle to a sheet.
 */
function initializeSheet_(sheetName, lock) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (sheet == null) {
    sheet = ss.insertSheet(sheetName);
  } else {
    sheet.clear();
  }
  if (lock) {
    sheet.protect().setWarningOnly(true);
  }
  return sheet;
}

/**
 * Initialize all tabs and their header rows
 */
function setupTabs() {
  _setupSetupSheet();
  _setupGetActivityGroupsSheet();
  _setupGetFloodlightConfigSheet();
  _setupCreateActivityGroupsSheet();
  _setupGenerateTagsSheet();
  _setupGetAdvertisersSheet();
  _setupInsertAdvertisersSheet();
}

/**
 * Initialize the Setup sheet and its header row
 * @return {object} A handle to the sheet.
*/
function _setupSetupSheet() {
  var sheet = initializeSheet_(SETUP_SHEET, false);

  sheet.getRange('B5').setValue("User Profile ID")
                      .setBackground(USER_INPUT_HEADER_COLOR);
  sheet.getRange('C5').setBackground(USER_INPUT_HEADER_COLOR);

  sheet.getRange('B6').setValue("Floodlight Config ID")
                      .setBackground(USER_INPUT_HEADER_COLOR);
  sheet.getRange('C6').setBackground(USER_INPUT_HEADER_COLOR);

  sheet.getRange("B5:C5").setFontWeight("bold").setWrap(true);
  sheet.getRange("B6:C6").setFontWeight("bold").setWrap(true);

  return sheet;

}

/**
 * Initialize the GetActivityGroups sheet and its header row
 * @return {object} A handle to the sheet.
 */
function _setupGetActivityGroupsSheet() {
  var sheet = initializeSheet_(GET_ACTIVITY_GROUPS, true);

  sheet.getRange('A1').setValue("ActivityGroup Name").setBackground(AUTO_POP_HEADER_COLOR);
  sheet.getRange('B1').setValue("ActivityGroup ID").setBackground(AUTO_POP_HEADER_COLOR);
  sheet.getRange('C1').setValue("Activity Type").setBackground(AUTO_POP_HEADER_COLOR);


  sheet.getRange("A1:C1").setFontWeight("bold").setWrap(true);
  return sheet;
}

/**
 * Initialize the GetFloodlightConfig sheet and its header row
 * @return {object} A handle to the sheet.
 */
function _setupGetFloodlightConfigSheet() {
  var sheet = initializeSheet_(GET_FLOODLIGHT_CONFIG, true);

  sheet.getRange('A1').setValue("Variable").setBackground(AUTO_POP_HEADER_COLOR);
  sheet.getRange('B1').setValue("Friendly Name").setBackground(AUTO_POP_HEADER_COLOR);
  sheet.getRange('C1').setValue("Type").setBackground(AUTO_POP_HEADER_COLOR);


  sheet.getRange("A1:C1").setFontWeight("bold").setWrap(true);
  return sheet;
}


/**
 * Initialize the GetActivityGroups sheet and its header row
 * @return {object} A handle to the sheet.
 */
function _setupCreateActivityGroupsSheet() {
  var sheet = initializeSheet_(CREATE_ACTIVITY_GROUPS, false);

  sheet.getRange('A1').setValue("ActivityGroup Name").setBackground(USER_INPUT_HEADER_COLOR);
  sheet.getRange('B1').setValue("ActivityGroup Type").setBackground(USER_INPUT_HEADER_COLOR);
  sheet.getRange('C1').setValue("ActivityGroup ID").setBackground(AUTO_POP_HEADER_COLOR);


  sheet.getRange("A1:C1").setFontWeight("bold").setWrap(true);
  return sheet;
}




/**
 * Initialize the CreateCampaigns sheet and its header row
 * @return {object} A handle to the sheet.
 */
function _setupGenerateTagsSheet() {
  var sheet = initializeSheet_(GENERATE_TAGS, false);

  sheet.getRange('A1').setValue("Floodlight Tag Name").setBackground(USER_INPUT_HEADER_COLOR);
  sheet.getRange('B1').setValue("Counting Method").setBackground(USER_INPUT_HEADER_COLOR);
  sheet.getRange('C1').setValue("Activity Group ID")
                      .setBackground(USER_INPUT_HEADER_COLOR);
  sheet.getRange('D1').setValue("Tag String")
                      .setBackground(USER_INPUT_HEADER_COLOR);
 
  sheet.getRange('E1').setValue("Tag Type")
                      .setBackground(USER_INPUT_HEADER_COLOR);

  sheet.getRange('F1').setValue("Expected URL")
                      .setBackground(USER_INPUT_HEADER_COLOR);
  sheet.getRange('G1').setValue("Floodlight Tag ID")
                      .setBackground(AUTO_POP_HEADER_COLOR);
  sheet.getRange('H1').setValue("U Variables                  ")
                      .setBackground(USER_INPUT_HEADER_COLOR);
  
  sheet.getRange('L1').setValue("Counting Methods")
                      .setBackground(AUTO_POP_HEADER_COLOR);
  sheet.getRange('L2').setValue("ITEMS_SOLD_COUNTING");
  sheet.getRange('L3').setValue("SESSION_COUNTING");
  sheet.getRange('L4').setValue("STANDARD_COUNTING");
  sheet.getRange('L5').setValue("TRANSACTIONS_COUNTING");
  sheet.getRange('L6').setValue("UNIQUE_COUNTING");

  sheet.getRange('M1').setValue("Tag Types")
                      .setBackground(AUTO_POP_HEADER_COLOR);
  sheet.getRange('M2').setValue("GLOBAL_SITE_TAG");
  sheet.getRange('M3').setValue("IFRAME");
  sheet.getRange('M4').setValue("IMAGE");


  sheet.getRange("A1:G1").setFontWeight("bold").setWrap(true);
  return sheet;
}

/**
 * Initialize the GetAdvertisers sheet and its header row
 * @return {object} A handle to the sheet.
 */
function _setupGetAdvertisersSheet() {
  var sheet = initializeSheet_(GET_ADVERTISERS, false);

  sheet.getRange('A1').setValue("AdvertiserName").setBackground(AUTO_POP_HEADER_COLOR);
  sheet.getRange('B1').setValue("AdvertiserID").setBackground(AUTO_POP_HEADER_COLOR);


  sheet.getRange("A1:B1").setFontWeight("bold").setWrap(true);
  return sheet;
}



/**
 * Initialize the InsertAdvertisers sheet and its header row
 * @return {object} A handle to the sheet.
 */
function _setupInsertAdvertisersSheet() {
  var sheet = initializeSheet_(INSERT_ADVERTISERS, false);

  sheet.getRange('A1').setValue("Advertiser Name").setBackground(USER_INPUT_HEADER_COLOR);
  sheet.getRange('B1').setValue("Advertiser ID").setBackground(AUTO_POP_HEADER_COLOR);


  sheet.getRange("A1:B1").setFontWeight("bold").setWrap(true);
  return sheet;
}



