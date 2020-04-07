// /* eslint-disable no-unused-vars */
// /* eslint-disable no-console */
// const wdio = require('webdriverio');
// const {
//     // ENABLE_VIDEO,
//     // ENABLE_VNC,
//     // CI,
//     // CI_COMMIT_REF_NAME,
//     // CI_COMMIT_SHA,
//     HEARTBEAT,
//     AWS_ACCESS_KEY_ID, // Stored in an ENV var
//     AWS_SECRET_ACCESS_KEY,
//     AWS_REGION = 'us-west-2'
// } = process.env;
// const AWS_DATAFARM_ARN = 'arn:aws:devicefarm:us-west-2:072497722989:testgrid-project:c6592ed1-5504-4bb1-b932-9f08813e2640';
// const AWS = require('aws-sdk');
// export default {
//     heartbeatInterval: parseInt(HEARTBEAT, 10) || 30 * 1000,
//     heartbeats: {},
//     isMultiBrowser: true,
//     browsers: {},
//     async getTestGridInfo (awsParams) {
//         try {
//             const testGrid = {
//                 hostname: `testgrid-devicefarm.${awsParams.region}.amazonaws.com`,
//                 port:     443,
//                 protocol: 'https',
//                 path:     ''
//             };
//             const deviceFarm = new AWS.DeviceFarm(awsParams);
//             const params = {
//                 expiresInSeconds: awsParams.expiresInSeconds,
//                 projectArn: awsParams.projectArn
//             };
//             const data = await deviceFarm.createTestGridUrl(params).promise();
//             console.log('##################################');
//             console.log(data);
//             console.log('##################################');
//             testGrid.path = data.url.match(`${testGrid.hostname}(.*)`)[1]; // Extract path from URL
//             return testGrid;
//         } 
//         catch (error) {
//             console.log('ERROR: {error}');
//             // eslint-disable-next-line consistent-return
//             return;
//         }
//     },
//     // Required - must be implemented
//     // Browser control
//     async openBrowser (id, pageUrl, target) {
//         const awsParams = {
//             region:           AWS_REGION,
//             accessKeyId:      AWS_ACCESS_KEY_ID,
//             secretAccessKey:  AWS_SECRET_ACCESS_KEY,
//             projectArn:       AWS_DATAFARM_ARN,
//             expiresInSeconds: 300 // 5 Minutes
//         };
//         const testGrid = await this.getTestGridInfo(awsParams);
//         throw new Error(JSON.stringify(testGrid));
//         // if (!target) throw new Error('Browser name must be specified!');
//         // const [browserString, platformName, deviceName] = target.split(':');
//         // const [browserName, browserVersion] = browserString.split('@');
//         // const enableVideo = ENABLE_VIDEO === 'true';
//         // const enableVNC = ENABLE_VNC === 'true';
//         // const capabilities = {
//         //     browserName,
//         //     browserVersion,
//         //     platformName,
//         //     'appium:deviceName': deviceName,
//         //     'selenoid:options':  {
//         //         enableVideo,
//         //         enableVNC
//         //     }
//         // };
//         // // Set video name for CI
//         // if (CI && enableVideo)
//         //     capabilities.videoName = `test-${new Date().toISOString()}-${CI_COMMIT_REF_NAME}-${CI_COMMIT_SHA.slice(0, 8)}.mp4`;
//         // console.log(testGrid);
//         // const browser = await wdio.remote({
//         //     capabilities,
//         //     logLevel: CI ? 'silent' : 'error',
//         //     port: testGrid.port,
//         //     hostname: testGrid.hostname,
//         //     protocol: testGrid.protocol,
//         //     path: testGrid.path
//         // });
//         // browser.navigateTo(pageUrl);
//         // this.browsers[id] = browser;
//         // this.heartbeats[id] = setInterval(() => {
//         //     if (!this.heartbeats[id]) return;
//         //     browser.getTitle().catch(() => {}); // suppress error
//         // }, this.heartbeatInterval);
//     },
//     async closeBrowser (id) {
//         await this.browsers[id].deleteSession();
//         delete this.browsers[id];
//         clearInterval(this.heartbeats[id]);
//         delete this.heartbeats[id];
//     },
//     // Optional - implement methods you need, remove other methods
//     // Initialization
//     async init () {
//         return;
//     },
//     async dispose () {
//         return;
//     },
//     // Browser names handling
//     async getBrowserList () {
//         return ['chrome'];
//     },
//     async isValidBrowserName (/* browserName */) {
//         return true;
//     },
//     // Extra methods
//     async resizeWindow (/* id, width, height, currentWidth, currentHeight */) {
//         this.reportWarning('The window resize functionality is not supported by the "devicefarm" browser provider.');
//     },
//     async takeScreenshot (/* id, screenshotPath, pageWidth, pageHeight */) {
//         this.reportWarning('The screenshot functionality is not supported by the "devicefarm" browser provider.');
//     }
// };
"use strict";