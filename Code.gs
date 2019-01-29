/**
 * Setup custom menu for the sheet
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('DCM Functions')

      .addItem('Setup Sheets', 'setupTabs')
      .addSeparator()
      .addItem('Get Activity Groups', 'getActivityGroups')
      .addItem('Get Floodlight Configuration', 'getFloodlightConfig')
      .addSeparator()
      .addItem('Create Activity Groups', 'bulkCreateActivityGroups')
      .addSeparator()
      .addItem('Generate Floodlight Tags', 'bulkGenerateFloodlightTags')
      .addSeparator()
      .addItem('Get Advertisers', 'bulkGetAdvertisers')
      .addItem('Insert Advertisers', 'bulkInsertAdvertisers')
      .addToUi();
}


/**
 * Use DCM API to get a list of all Activity Group Name / IDs from the specified floodlight configuration, print it out on the sheet
 */
function getActivityGroups() {
  const profile_id = _fetchProfileId();
  const config_id = _fetchFloodlightConfigId();
  var activityList = DoubleClickCampaigns.FloodlightActivityGroups.list(profile_id, {
                                            'floodlightConfigurationId' : config_id,
                                           }).floodlightActivityGroups;

  var sheet = _setupGetActivityGroupsSheet();

  for (var i = 0; i < activityList.length; ++i) {
    var currentObject = activityList[i];
    var rowNum = i+2;
    
    sheet.getRange("A" + rowNum).setNumberFormat('@')
         .setValue(currentObject.name).setBackground(AUTO_POP_CELL_COLOR);
    sheet.getRange("B" + rowNum).setNumberFormat('@')
         .setValue(currentObject.id).setBackground(AUTO_POP_CELL_COLOR);
    sheet.getRange("C" + rowNum).setNumberFormat('@')
         .setValue(currentObject.type).setBackground(AUTO_POP_CELL_COLOR);

  }
}


/**
 * Use DCM API to get a list of all Activity Group Name / IDs from the specified floodlight configuration, print it out on the sheet
 */
function getFloodlightConfig() {
  const profile_id = _fetchProfileId();
  const config_id = _fetchFloodlightConfigId();
  var activityList = DoubleClickCampaigns.FloodlightConfigurations.list(profile_id, {
                                            'ids' : config_id,
                                           }).floodlightConfigurations;
  
   var placementsList = DoubleClickCampaigns.Placements
                                           .list(profile_id, {
                                            'campaignIds' : 21457442,
                                             'archived' : false
                                           }).placements;
  
  var activityList2 = activityList[0].userDefinedVariableConfigurations;                                         
                                          

  var sheet = _setupGetFloodlightConfigSheet();

  for (var i = 0; i < activityList2.length; ++i) {
    var currentObject = activityList2[i];
    var rowNum = i+2;
    
    sheet.getRange("A" + rowNum).setNumberFormat('@')
         .setValue(currentObject.variableType).setBackground(AUTO_POP_CELL_COLOR);
    sheet.getRange("B" + rowNum).setNumberFormat('@')
         .setValue(currentObject.reportName).setBackground(AUTO_POP_CELL_COLOR);
    sheet.getRange("C" + rowNum).setNumberFormat('@')
         .setValue(currentObject.dataType).setBackground(AUTO_POP_CELL_COLOR);
  }
}

/**
 * Use DCM API to Create Activity Groups in the specified floodlight configuration, print ID out on the sheet
 */
function bulkCreateActivityGroups() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CREATE_ACTIVITY_GROUPS);

  // This represents ALL the data
  var range = sheet.getDataRange();
  var values = range.getValues();

  const profile_id = _fetchProfileId();
  const config_id = _fetchFloodlightConfigId();

  // build request body resources
  for (var i = 1; i < values.length; ++i) {
    var currentRow = i + 1;
    var currentPlacement = values[i];
    var activity_name = currentPlacement[0]; 
    var activity_type = currentPlacement[1]; 
    var resource = {
        "name": activity_name,
        "type" : activity_type,
        "floodlightConfigurationId": config_id
      };

    
    var newActivity = DoubleClickCampaigns.FloodlightActivityGroups
                                          .insert(resource, profile_id);
    
    sheet.getRange("C" + currentRow)
         .setValue(newActivity.id).setBackground(AUTO_POP_CELL_COLOR);
    
      }  
  }


/**
 * Use DCM API to Floodlight Tags in the specified floodlight configuration, print ID out on the sheet
 */
function bulkGenerateFloodlightTags() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(GENERATE_TAGS);

  // This represents ALL the data
  var range = sheet.getDataRange();
  var values = range.getValues();

  const profile_id = _fetchProfileId();
  const config_id = _fetchFloodlightConfigId();

  // build request body resources
  for (var i = 1; i < values.length; ++i) {
    var currentRow = i + 1;
    var currentPlacement = values[i];
    var activity_name = currentPlacement[0]; 
    var counting_method = currentPlacement[1];
    var group_id = currentPlacement[2];
    var tag_string = currentPlacement[3]
    var tag_type = currentPlacement[4];
    var expected_url = currentPlacement[5];  
    var uvars = currentPlacement[7];
    var resource = {
        "name": activity_name,
        "countingMethod" : counting_method,
        "floodlightActivityGroupId": group_id,
        "tagString": tag_string,
        "floodlightTagType" : tag_type,
        "expectedUrl" : expected_url,
        "floodlightConfigurationId" : config_id,
        "userDefinedVariableTypes": uvars
      };

    
    var newFloodlight = DoubleClickCampaigns.FloodlightActivities
                                            .insert(resource, profile_id);
    
    sheet.getRange("G" + currentRow)
         .setValue(newFloodlight.id).setBackground(AUTO_POP_CELL_COLOR);
    
      }  
  }

  



/**
 * Code for the u variables menu


function showDialog() {  
  var html = HtmlService.createTemplateFromFile('Page').evaluate();
  SpreadsheetApp.getUi()
  .showSidebar(html);
}

var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName('GetFloodlightConfig');
var range1 = sheet.getRange("A2:A20", "B2:B20");
var range2 = sheet.getRange("B2:B20");
var range3 = range1 + range2;

var valid = function(){
  try{
    return range1.getValues();
    return range2.getValues();
  }catch(e){
    return null
  }
}
function fillCell(e){
  var s = [];
  for(var i in e){
    if(i.substr(0, 2) == 'ch') s.push(e[i]);
  }
  if(s.length) SpreadsheetApp.getActiveRange().setValue(s.join(','));
}



 */

/**
 * Use DCM API to get a list of all Advertiser Name / IDs from the specified Profile ID, print it out on the sheet
 */
function bulkGetAdvertisers() {
  const profile_id = _fetchProfileId();
  var advertiserList = DoubleClickCampaigns.Advertisers.list(profile_id).advertisers;
                                      
                                          

  var sheet = _setupGetAdvertisersSheet();

  for (var i = 0; i < advertiserList.length; ++i) {
    var currentObject = advertiserList[i];
    var rowNum = i+2;
    
    sheet.getRange("A" + rowNum).setNumberFormat('@')
         .setValue(currentObject.name).setBackground(AUTO_POP_CELL_COLOR);
    sheet.getRange("B" + rowNum).setNumberFormat('@')
         .setValue(currentObject.id).setBackground(AUTO_POP_CELL_COLOR);

  }
}




/**
 * Use DCM API to Create Activity Groups in the specified floodlight configuration, print ID out on the sheet
 */
function bulkInsertAdvertisers() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(INSERT_ADVERTISERS);

  // This represents ALL the data
  var range = sheet.getDataRange();
  var values = range.getValues();

  const profile_id = _fetchProfileId();

  // build request body resources
  for (var i = 1; i < values.length; ++i) {
    var currentRow = i + 1;
    var currentPlacement = values[i];
    var advertiser_name = currentPlacement[0]; 
    var resource = {
        "name": advertiser_name
      };

    
    var newAdvertiser = DoubleClickCampaigns.Advertisers
                                          .insert(resource, profile_id);
    
    sheet.getRange("B" + currentRow)
         .setValue(newAdvertiser.id).setBackground(AUTO_POP_CELL_COLOR);
    
      }  
  }
