# **DCM API Floodlight / Advertiser bulk generation tool**

Google Sheets based tool to perform bulk tasks to DCM accounts using DCM API.

## OVERVIEW

This AppScript-based tool lets you use a Google Sheets to perform bulk tasks including - Bulk Create Advertisers - 
Bulk Create Activity groups - Bulk Create Floodlight activities. 
Additional helper tasks for these bulk creations include - Get Advertisers - Get Activity groups.

It uses DCM APIs to pull and push data to DCM.

The same result could be achieved by manually creating each entities through the
DCM UI, but the tool leverages the APIs and Spreadsheet functionalities to
automate the most manual steps.

In order to use this tool you need to have valid access to the **DoubleClick
Campaign Manager APIs** through your Google Account, and you will need to enable
that API in a Google Cloud Project so that you can generate authenticate the
tool (see the corresponding step of Initial Setup section below).

## INITIAL SETUP

*   Create a new [Google Spreadsheet](https://sheets.google.com) and open its
    script editor (from _Tools > Script Editor_)
    -   Copy the code from code.js and utils.js in two corresponding code.gs,
        utilities.gs files in your AppScript project
    -   Enable DCM API _Resources > Advanced Google Services_ and enable the
        _DCM/DFA Reporting and Trafficking API (v2.8)_
    -   Click on _Google API Console link_ at the bottom of _Advanced Google
        Services_ window to open the Google Cloud Platform project, select
        _Library_ from the left hand menu, then search and enable the DCM API in
        the project
*   Close the script editor and spreadsheet tabs both (this is necessary so the
    custom functions appear)
*   Re-open the Go back to the Spreadsheet, click on the _DCM Functions_ menu
    and select _Setup Sheets_ for the initial tabs and header rows setup (wait
    for the script to finish)
*   Remove any tab not needed (aside from the ones created by script)
*   Input the DCM Profile ID in the setup tab (i.e. at cell C5) then select
    _Data_ from the sheet menu and select _Named Ranges...._ to set the title
    _DCMProfileID_ and value _Setup!C5_
*   Input the Floodlight Config ID in the setup tab (i.e. at cell C6) then select
    _Data_ from the sheet menu and select _Named Ranges...._ to set the title
    _DCMFLoodlightConfigID_ and value _Setup!C6_

## USAGE

*   As general rules
    *   Only manually edit columns with green headers.
    *   Columns with blue headers will be auto-populated.
    *   User Profile ID and Floodlgiht Config DI cells are required to be filled in (Setup tab)
    
*   **Get Advertisers** allows you to get list of advertisers from the Floodlight configuration ID. 
    1. DCM Functions > Get Advertisers
    2. Wait for the Script to finish loading
    3. AdvertiserName and AdvertiserID will be auto populated in column A, B after the Script finished running

*   **Insert Advertisers** allows you to bulk create Advertisers by filling in the advertiser name under the Green headed column. 
Advertiser Name is required!
    1. Fill in the Advertiser Name cell
    2. DCM Functions > Insert Advertisers
    3. Wait for the Script to finish loading
    4. Advertiser ID will be auto populated in column B after the Script finished running

*   **Get Floodlight Config** allows you to get the Floodlight configuration details
    1. DCM Functions > Get Floodlight Configuration
    2. Wait for the Script to finish loading
    3. Floodlight configuration will be auto populated in column A, B, C after the Script finished running


*   **Get Activity Group** allows you to get the Floodlight activity group details
    1. DCM Functions > Get Floodlight Activity Groups
    2. Wait for the Script to finish loading
    3. Floodlight activity groups will be auto populated in column A, B, C after the Script finished running

*   **Create Activity groups** allows you to bulk create activity groups and prints the IDs of the newly created activity groups on the sheet.
    1. Fill in column A and B with the Name and Type (COUNTER/SALES) of the activity group/s that you want to create
    2. DCM Functions > Create Activity Groups
    3. ActivityGroup ID will be auto populated in column C after the Script finished running
   
*   **Generate Tags** allows you to bulk create Floodlight activities and prints the IDs of the newly created Floodlight activities on the sheet.
    1. Fill in column A, B, C, E, F. Column D, H are optional. Tag String is auto-generated if left empty.
    2. DCM Functions > Generate Floodlight Tags
    3. Floodlight Tag ID will be auto populated in column G after the Script finished running


    
