'use strict'

const dialogflow = require('@google-cloud/dialogflow');
const config = require('../config/keys');
const structjson = require('structjson');

const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;
const languageCode = 'en-US';

const credentials = { client_email: config.googleClientEmail, private_key: config.googlePrivateKey }
const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });

module.exports = {
    textQuery: async function (text, userID, parameters = {}) {
        let sessionPath = sessionClient.projectAgentSessionPath(projectID, sessionID + userID);
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: languageCode,
                }
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        }
        try {
            let responses = await sessionClient.detectIntent(request);
            responses = await self.handleAction(responses);
            return responses;
        } catch (error) {
            console.error(error);
        }
    },
    eventQuery: async function (event, userID, parameters = {}) {
        let sessionPath = sessionClient.projectAgentSessionPath(projectID, sessionID + userID);
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    languageCode: languageCode,
                }
            }
        }
        try {
            let responses = await sessionClient.detectIntent(request);
            responses = self.handleAction(responses);
            return responses;
        } catch (error) {
            console.error(error);
        }
    },
    handleAction: function (responses) {
        let self = module.exports;
        return responses;
    }
}