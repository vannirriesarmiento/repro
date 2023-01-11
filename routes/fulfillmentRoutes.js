const { WebhookClient } = require('dialogflow-fulfillment');
const { Payload } = require('dialogflow-fulfillment');

const functions = require('firebase-functions');
const config = require('../config/keys');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert({
        "type": config.googleType,
        "project_id": config.googleProjectID,
        "private_key_id": config.firebasePrivateKeyID,
        "private_key": config.firebasePrivateKey,
        "client_email": config.firebaseClientEmail,
        "client_id": config.firebaseClientID,
        "auth_uri": config.firebaseAuthURI,
        "token_uri": config.firebaseTokenURI,
        "auth_provider_x509_cert_url": config.firebaseAuthProvider,
        "client_x509_cert_url": config.firebaseClientCertURL
    }),
    databaseURL: "https://repro-ljcq-default-rtdb.asia-southeast1.firebasedatabase.app"
});
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

module.exports = app => {

    let edit = false;
    let userinfo = {};
    let patientsymptoms = [];
    let patientlabtest = [];
    let unsure_endemics_verdict = "";

    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });
        const tempsessionID = req.body.session.split("/").reverse()[0];
        // var sessionID = tempsessionID.toString().replace("repro-bot-session", "");
        var sessionID = 'e3acc2b5-4694-4d8e-9c27-3532a81ebf6a';
        let counter = 1;

        function randomgenerator(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        //chatonly

        function gotoconsultation(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('consultation');
        }

        function cofallback_gotoconsultation(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('consultation');
        }

        function sexhurt(agent) {
            var gender = agent.parameters.gender;

            if (gender == "female") {

            } else {

            }
        }
        //consultation

        function consultationchoice() {
            const random = randomgenerator(1, 3);
            if (random == 1) {
                agent.add("Before we start I will have to ask for your personal data for assessment. Afterwards, recommendations for the most accurate laboratory procedure/s that you can take will be laid out for you. Therefore, please use actual information for the best results. Are you okay with that?");
            } else if (random == 3) {
                agent.add("Before we start, here's a short overview: I'll gather your personal data  prior consultation for analysis. Then, I will recommend the most apt testing & screening procedure/s for you. Hence, refrain from using fake information for accurate results. Is that okay?"); //Shall we continue?
            } else if (random == 2) {
                agent.add("From this on forward, I need to collect your details before the consultation of symptoms. Later on, a suggestion of lab tests will be available. So, please make use of genuine information for quality results. Do you agree to it?"); //Do you want to proceed?
            }
            const payload = {
                "quick_replies": [
                    {
                        "text": "I consent",
                        "payload": "consentyes"
                    },
                    {
                        "text": "I decline",
                        "payload": "consentno"
                    }
                ]
            };
            agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));
        }

        function consultation(agent) {

            const random = randomgenerator(1, 3);
            if (random == 1) {
                agent.add("Welcome to Consultation!");
            } else if (random == 3) {
                agent.add("We are now in Consultation!");
            } else if (random == 2) {
                agent.add("You're now entering Consultation.");
            }

            return admin.firestore().collection('ICR').doc(sessionID).get().then((doc) => {
                const data = doc.data();
                userinfo = data;
                return data;
            }).then(data => {
                if (data) {
                    agent.add("Redirecting...");
                    agent.setFollowupEvent('address');
                } else {
                    consultationchoice();
                }
            }).catch(err => {
                agent.add("Sorry, there has technical difficulties. Please refresh page to restart.");
            });
        }

        function loadDB1(agent) {
            const random = randomgenerator(1, 3);
            if (random == 1) {
                agent.add("Welcome to Consultation!");
            } else if (random == 3) {
                agent.add("We are now in Consultation!");
            } else if (random == 2) {
                agent.add("You're now entering Consultation.");
            }

            return admin.firestore().collection('ICR').doc(sessionID).get().then((doc) => {
                const data = doc.data();
                userinfo = data;
                return data;
            }).then(data => {
                if (data) {
                    agent.add("Redirecting...");
                    agent.setFollowupEvent('address');
                } else {
                    consultationchoice();
                }
            }).catch(err => {
                agent.add("Sorry, there has technical difficulties. Please refresh page to restart.");
            });
        }

        function fullname(agent) {
            let fname = agent.parameters.fname;
            let mname = agent.parameters.mname.toLowerCase();
            let lname = agent.parameters.lname;
            let fullname = "";

            if (mname == "none") {
                fullname = fname + " " + lname;
            } else {
                fullname = fname + " " + mname + " " + lname;
            }

            var regexsp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            var regexnumber = /\d/;
            var regexemoji = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;


            if (regexsp.test(fullname) || regexnumber.test(fullname) || regexemoji.test(fullname)) {
                agent.add(`Please refrain from using special characters, emojis, or numbers. Type your first name/s again.`);
            } else {
                const uppercase_fullname = fullname.toUpperCase();
                agent.add(uppercase_fullname);
                agent.add(`Would you like to proceed with this?`);
                agent.context.set({ name: "fullname-yes-followup", lifespan: 11, "parameters": { "fullname": uppercase_fullname } });
                confirmation();
            }
        }

        function confirmation() {
            const payload = {
                "quick_replies": [
                    {
                        "text": "Yes",
                        "payload": ""
                    },
                    {
                        "payload": "",
                        "text": "No"
                    }
                ]
            };
            agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));
        }

        function confirmationforsymp() {
            const payload = {
                "quick_replies": [
                    {
                        "text": "I have more symptoms",
                        "payload": "symptomsyes"
                    },
                    {
                        "payload": "endemics",
                        "text": "Continue consultation"
                    }
                ]
            };
            agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));
        }

        function continueresponse() {
            const random = randomgenerator(1, 6);
            if (random == 6) {
                agent.add("I appreciate you being honest with me. I'll do my best to assist you. Where to next?");
            } else if (random == 6) {
                agent.add("Acknowledged. You're doing great! Where would you like to go next?");
            } else if (random == 5) {
                agent.add("I've jotted all that's been discussed. Please choose our next destination.");
            } else if (random == 4) {
                agent.add("It must've been hard but know that this is normal. What else?");
            } else if (random == 3) {
                agent.add("I know what you mean. I'm with you on this. Any more you'd like to include?");
            } else if (random == 2) {
                agent.add("Thanks for your opening up to me. I'll help you as much as I can. What next?");
            } else if (random == 1) {
                agent.add("I hear you. Do you have more you'd like to add to the list?");
            }
            confirmationforsymp();
        }

        function birthdayage(agent) {
            let birthday = agent.parameters.birthdate.split(`T`)[0];
            var someday = new Date(birthday);
            var t = admin.firestore.Timestamp.fromDate(new Date());
            var today = t.toDate();
            var years = today.getFullYear() - someday.getFullYear();
            someday.setFullYear(today.getFullYear());
            if (today < someday) {
                years--;
            }
            if (years > 120 || years < 6) {
                agent.add(`Date input is not acceptable. Please enter it again completely (month, day, and year).`);
            } else {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add(`If your birthday is on  ` + birthday + `. Then, that makes you ` + years + ` years old. Right?`);
                } else {
                    agent.add(`According to my calculations, you are ` + years + ` years old. If you're born on ` + birthday + `. Correct?`);
                }
                agent.context.set({ name: "fullname-yes-followup", lifespan: 11, "parameters": { "age": years, "birthdate": birthday } });
                confirmation();
            }
        }


        function sex(agent) {
            var gender = agent.parameters.gender;

            if (gender) {
                gender = gender.toLowerCase();
            }
            if (gender == `female`) {
                agent.add(`Are you pregnant?`);
                confirmation();
                agent.setFollowupEvent({ name: 'Pregnancy', parameters: {} });
            } else if (gender == `male`) {
                agent.add(`Please choose below what you classify as.`);
                const payload = {
                    "quick_replies": [
                        {
                            "text": "Male Sex Worker (MSW)",
                            "payload": ""
                        },
                        {
                            "payload": "",
                            "text": "Men who have Sex with Men (MSM)"
                        },
                        {
                            "payload": "",
                            "text": "Client of Sex Worker (CSW)"
                        },
                        {
                            "payload": "",
                            "text": "Not Applicable (N/A)"
                        }
                    ]
                };
                agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));
            }
            else {
                agent.add(`Please conform to the choices provided (male or female).`);
            }
        }

        function RSPSW(agent) {
            const isRSPSW = agent.parameters.isRSPSW;
            var age = agent.parameters.age;

            if (isRSPSW == `Yes`) {
                agent.add(`It appears you're a Registered Sex Pregnant Sex Worker (RSPSW). I will take note of that.`);
                agent.context.set({ name: "fullname-yes-followup", lifespan: 7, "parameters": { "group": "RSPSW" } });
            } else if (isRSPSW == `No`) {
                agent.add(`I see. I will list you down as "Pregnant."`);
                agent.context.set({ name: "fullname-yes-followup", lifespan: 7, "parameters": { "group": "Pregnant" } });
            }
            maritalstatus(age);
        }

        function groups(agent) {
            var group = agent.parameters.group;
            var age = agent.parameters.age;
            var updatedgroup;

            if (group === 'Registered Sex Worker (RSW)') {
                updatedgroup = "RSW";
            } else if (group === 'Freelance Sex Worker (FLSW)') {
                updatedgroup = "FLSW";
            } else if (group === 'Male Sex Worker (MSW)') {
                updatedgroup = "MSW";
            } else if (group === 'Men who have Sex with Men (MSM)') {
                updatedgroup = "MSM";
            } else if (group === 'Not Applicable (N/A)') {
                updatedgroup = "N/A";
            } else if (group === 'Client of Sex Worker (CSW)') {
                updatedgroup = "CSW";
            }
            agent.context.set({ name: "fullname-yes-followup", lifespan: 7, "parameters": { "group": updatedgroup } });
            maritalstatus(age);
        }

        function maritalstatus(age) {
            const random = randomgenerator(1, 4);
            let payload = {};
            if (random == 4) {
                agent.add("Now, could you tell me your marital status next?");
            } else if (random == 3) {
                agent.add("What about your civil status?");
            } else if (random == 2) {
                agent.add("So, what's your current civil status?");
            } else if (random == 1) {
                agent.add("How about your marital status?");
            }
            if (age >= 18) {
                payload = {
                    "quick_replies": [
                        {
                            "text": "Single",
                            "payload": ""
                        },
                        {
                            "payload": "",
                            "text": "Married"
                        },
                        {
                            "payload": "",
                            "text": "Separated"
                        },
                        {
                            "text": "Live-in",
                            "payload": ""
                        },
                        {
                            "payload": "",
                            "text": "Widow"
                        }
                    ]
                };
            } else if (age <= 18) {
                payload = {
                    "quick_replies": [
                        {
                            "text": "Single",
                            "payload": ""
                        },
                        {
                            "text": "Live-in",
                            "payload": ""
                        }
                    ]
                };
            }
            agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));
        }

        function civilstatus(agent) {
            const civilstatus = agent.parameters.civilstatus.toUpperCase();
            const random = randomgenerator(1, 2);
            if (random == 1) {
                agent.add(`How about your phone number?`);
            } else {
                agent.add(`What is your mobile number?`);
            }
        }

        function contactnumber(agent) {
            const contactnumber = agent.parameters['phone-number'];
            var regexnumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

            if (regexnumber.test(contactnumber)) {
                const random = randomgenerator(1, 2);
                if (random == 1) {
                    agent.add(`Gotcha! Thanks for that.`);
                    agent.add(`Lastly, I need your current residential address in the past 6 months.`);
                } else {
                    agent.add(`Cool. We're almost done.`);
                    agent.add(`Please write your current residential address (in the past 6 months).`);
                }
            } else {
                const random = randomgenerator(1, 2);
                if (random == 1) {
                    agent.add("Enter your valid phone number please. if you don't have one, give us any phone number to get in touch with you.");
                } else {
                    agent.add("Please write a valid phone number. If you don't have one, provide any mobile number instead for us to reach you.");
                }
            }
        }

        function address(agent) {
            var fromco = agent.parameters.fromco;

            return admin.firestore().collection('ICR').doc(sessionID).get().then((doc) => {
                const data = doc.data();
                userinfo = data;
                return data;
            }).then(data => {
                if ((data && (!edit)) || (data && fromco)) {
                    const random = randomgenerator(1, 3);

                    if (random == 1) {
                        agent.add("Welcome to Consultation!");
                    } else if (random == 3) {
                        agent.add("We are now in Consultation!");
                    } else if (random == 2) {
                        agent.add("You're now entering Consultation.");
                    }

                    if (random == 3) {
                        agent.add("I already have your information with me, so we can skip the whole profiling from now on. Please check if you need any changes before continuing.");
                    } else if (random == 2) {
                        agent.add("I still have your information with me, so we can skip the whole profiling from now on. Kindly check if you have some modifications before we continue.");
                    } else if (random == 1) {
                        agent.add("I saved your information from before so we can skip the whole profiling from now on. Kindly check if you have some modifications before we proceed.");
                    }
                    payload = {
                        "accordion": {
                            "filename": sessionID,
                            "title": "Individual Client Record",
                            "name": data.fullname,
                            "age": data.age + " YEARS OLD",
                            "sex": data.gender,
                            "civilstatus": data.civilstatus,
                            "birthdate": data.birthdate,
                            "phonenumber": data.phonenumber,
                            "group": data.group,
                            "address": data.address,
                            "button1": "Proceed",
                            "button2": "Edit"
                        }
                    };
                    agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));
                    agent.context.set({ name: "fullname-yes-followup", lifespan: 1, "parameters": { "gender": data.gender, "group": data.group } });
                } else if ((!data) || (edit)) {
                    const random = randomgenerator(1, 4);
                    if (random == 4) {
                        agent.add(`Here's the initial content of your Individual Client Record (ICR). Kindly check if you have some modifications before we continue.`);
                    } else if (random == 3) {
                        agent.add(`Here is your initial Individual Client Record (ICR). Kindly check if you have some changes before we proceed.`);
                    } else if (random == 2) {
                        agent.add(`Your Individual Client Record (ICR) is ready. Kindly check if you have some modifications before we proceed.`);
                    } else if (random == 1) {
                        agent.add(`Your Individual Client Record (ICR) is already available. Kindly check if you have some changes before we carry on.`);
                    }
                    displayICR(agent);
                }
            }).catch(err => {
                agent.add("Sorry, there has technical difficulties. Please refresh page to restart.");
            });
        }

        function loadDB2(agent) {
            var fromco = agent.parameters.fromco;

            return admin.firestore().collection('ICR').doc(sessionID).get().then((doc) => {
                const data = doc.data();
                userinfo = data;
                return data;
            }).then(data => {
                if ((data && (!edit)) || (data && fromco)) {
                    const random = randomgenerator(1, 3);

                    if (random == 1) {
                        agent.add("Welcome to Consultation!");
                    } else if (random == 3) {
                        agent.add("We are now in Consultation!");
                    } else if (random == 2) {
                        agent.add("You're now entering Consultation.");
                    }

                    if (random == 3) {
                        agent.add("I already have your information with me, so we can skip the whole profiling from now on. Please check if you need any changes before continuing.");
                    } else if (random == 2) {
                        agent.add("I still have your information with me, so we can skip the whole profiling from now on. Kindly check if you have some modifications before we continue.");
                    } else if (random == 1) {
                        agent.add("I saved your information from before so we can skip the whole profiling from now on. Kindly check if you have some modifications before we proceed.");
                    }
                    payload = {
                        "accordion": {
                            "filename": sessionID,
                            "title": "Individual Client Record",
                            "name": data.fullname,
                            "age": data.age + " YEARS OLD",
                            "sex": data.gender,
                            "civilstatus": data.civilstatus,
                            "birthdate": data.birthdate,
                            "phonenumber": data.phonenumber,
                            "group": data.group,
                            "address": data.address,
                            "button1": "Proceed",
                            "button2": "Edit"
                        }
                    };
                    agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));
                    agent.context.set({ name: "fullname-yes-followup", lifespan: 1, "parameters": { "gender": data.gender, "group": data.group } });
                } else if ((!data) || (edit)) {
                    const random = randomgenerator(1, 4);
                    if (random == 4) {
                        agent.add(`Here's the initial content of your Individual Client Record (ICR). Kindly check if you have some modifications before we continue.`);
                    } else if (random == 3) {
                        agent.add(`Here is your initial Individual Client Record (ICR). Kindly check if you have some changes before we proceed.`);
                    } else if (random == 2) {
                        agent.add(`Your Individual Client Record (ICR) is ready. Kindly check if you have some modifications before we proceed.`);
                    } else if (random == 1) {
                        agent.add(`Your Individual Client Record (ICR) is already available. Kindly check if you have some changes before we carry on.`);
                    }
                    displayICR(agent);
                }
            }).catch(err => {
                agent.add("Sorry, there has technical difficulties. Please refresh page to restart.");
            });
        }

        function displayICR(agent) {
            const payload1 = {
                "accordion": {
                    "filename": sessionID,
                    "title": "Individual Client Record",
                    "name": agent.parameters.fullname,
                    "age": agent.parameters.age + " YEARS OLD",
                    "sex": agent.parameters.gender.toUpperCase(),
                    "civilstatus": agent.parameters.civilstatus.toUpperCase(),
                    "birthdate": agent.parameters.birthdate,
                    "phonenumber": agent.parameters['phone-number'],
                    "group": agent.parameters.group,
                    "address": agent.parameters.address.toUpperCase(),
                    "button1": "Proceed",
                    "button2": "Edit"
                }
            };
            agent.add(new Payload(agent.UNSPECIFIED, payload1, { rawPayload: true, sendAsMessage: true }));
        }

        function saveDB(agent) {
            var datetoday = admin.firestore.Timestamp.now();
            var datesent = datetoday.toDate().toISOString().slice(0, 10);

            userinfo = {
                "fullname": agent.parameters.fullname,
                "age": agent.parameters.age,
                "gender": agent.parameters.gender.toUpperCase(),
                "birthdate": agent.parameters.birthdate.split(`T`)[0],
                "civilstatus": agent.parameters.civilstatus.toUpperCase(),
                "group": agent.parameters.group.toUpperCase(),
                "phonenumber": agent.parameters['phone-number'],
                "address": agent.parameters.address.toUpperCase(),
                "datesent": datesent
            };
            db.collection('ICR').doc(sessionID).set(userinfo, { merge: true });
        }

        function pushsaveDB(text1, text2, text3) {
            counter = 0;
            if (text2) {
                text1.push(text2);
                if (text3 == "symptoms") {
                    db.collection('ICR').doc(sessionID).set({ "symptoms": text1 }, { merge: true });
                } else {
                    db.collection('ICR').doc(sessionID).set({ "testingscreening": text1 }, { merge: true });
                }
            }
        }

        function saveDBirritationtypechecker(irritationtype) {
            var labtest;

            if (irritationtype == "herpes" || irritationtype == "warts") {
                if (patientlabtest.some(e => e.labtest == "Professional Visual Inspection")) {
                } else {
                    labtest = { "labtest": "Professional Visual Inspection" };
                }
            } else if (irritationtype == "syphilis") {
                if (patientlabtest.some(e => e.labtest == "VDRL/RPR")) {
                } else {
                    labtest = { "labtest": "VDRL/RPR" };
                }
            }
            return labtest;
        }

        function saveDBsymptomschecker(text1, text2) {
            if (patientsymptoms.some(e => e.symptoms == text2)) {
                var index = patientsymptoms.map(function (e) { return e.symptoms; }).indexOf(text2);
                var temparray = patientsymptoms[index];

                if (temparray.affectedarea.includes(text1)) {
                    const random = randomgenerator(1, 2);
                    if (random == 2) {
                        agent.add("This information appears to have been saved already. Any more you'd like to include?");
                    } else if (random == 1) {
                        agent.add("It appears that this detail is already saved. Where would you like to go next?");
                    }
                    confirmationforsymp();
                } else {
                    var area = temparray.affectedarea + ", " + text1;
                    var symptoms = { "symptoms": text2, "affectedarea": area };

                    patientsymptoms.splice(index, 1);

                    pushsaveDB(patientsymptoms, symptoms, "symptoms");

                    continueresponse();
                }
            } else {
                symptoms = { "symptoms": text2, "affectedarea": text1 };
                pushsaveDB(patientsymptoms, symptoms, "symptoms");
                continueresponse();
            }
        }

        function symptoms(agent) {
            var response = agent.parameters.response.toLowerCase();

            return admin.firestore().collection('ICR').doc(sessionID).get().then((doc) => {
                const data = doc.data();
                return data;
            }).then(data => {
                if (response == "proceed") {
                    if ((!data) || (data && edit)) {
                        saveDB(agent);
                    }
                    if (data) {
                        let symp = data.symptoms;

                        if (symp && symp.length > 0) {
                            agent.add("It seems like I've listed some of your symptoms from before. Where would you like to go next?");
                            confirmationforsymp();
                        } else {
                            const random = randomgenerator(1, 3);
                            if (random == 1) {
                                agent.add("Thank you for confirming. Do you have signs and/or symptoms now?");
                            } else if (random == 2) {
                                agent.add("Thank you for your confirmation. Do you have any signs or symptoms right now?");
                            } else if (random == 3) {
                                agent.add("Thank you for responding. Do you have any indications and/or symptoms right now?");
                            }
                            confirmation();
                        }
                    } else {
                        const random = randomgenerator(1, 3);
                        if (random == 1) {
                            agent.add("Thank you for confirming. Do you have signs and/or symptoms now?");
                        } else if (random == 2) {
                            agent.add("Thank you for your confirmation. Do you have any signs or symptoms right now?");
                        } else if (random == 3) {
                            agent.add("Thank you for responding. Do you have any indications and/or symptoms right now?");
                        }
                        confirmation();
                    }
                } else if (response == "edit") {
                    agent.add("Redirecting...");
                    agent.setFollowupEvent('edit');
                    edit = true;
                }
            }).catch(err => {
                agent.add("Sorry, there has technical difficulties. Please refresh page to restart.");
            });
        }

        function problemarea(gender, agent) {
            let payload = {};

            const random = randomgenerator(1, 3);
            if (random == 1) {
                agent.add("Gentle reminder, I can only handle 1 symptom at a time so let's do this step by step.");
            } else if (random == 2) {
                agent.add("As a gentle reminder, I can only handle one symptom at a time, so let's take it one by one.");
            } else if (random == 3) {
                agent.add("Please keep in mind that I can only handle one symptom at a time, so let's take it one step at a time.");
            }
            if (gender == `male` || gender == "MALE") {
                if (counter == 1) {
                    const random = randomgenerator(1, 2);
                    if (random == 2) {
                        agent.add("Where exactly is the problem area?");
                    }
                    if (random == 1) {
                        agent.add("Choose the location of the problem area.");
                    }
                } else {
                    const random = randomgenerator(1, 2);
                    if (random == 2) {
                        agent.add("I've already noted what's discussed. Tell me, where is the problem area now?");
                    }
                    if (random == 1) {
                        agent.add("The previous discussion was already saved. So, where is the problem area now?");
                    }
                }
                payload = {
                    "quick_replies": [
                        {
                            "text": "Penis/Pelvis",
                            "payload": ""
                        },
                        {
                            "payload": "",
                            "text": "Mouth/Throat"
                        },
                        {
                            "text": "Anus",
                            "payload": ""
                        },
                        {
                            "payload": "",
                            "text": "Others"
                        }
                    ]
                };
            } else if (gender == `female`) {
                if (counter == 1) {
                    agent.add("Where exactly is the problem area?");
                } else {
                    agent.add("Alright, I've already noted what's discussed. Let us start from the top!");
                    agent.add("Where is the problem area now?");
                }
                payload = {
                    "quick_replies": [
                        {
                            "payload": "",
                            "text": "Vagina/Pelvis"
                        },
                        {
                            "payload": "",
                            "text": "Mouth/Throat"
                        },
                        {
                            "text": "Anus",
                            "payload": ""
                        },
                        {
                            "payload": "",
                            "text": "Others"
                        }
                    ]
                };
            } else {
                agent.end("There has been some problem. Let me get back to you later.");
            }
            agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));
        }

        function symptomsYES(agent) {
            var gender = agent.parameters.gender;

            return admin.firestore().collection('ICR').doc(sessionID).get().then((doc) => {
                const data = doc.data();
                return data;
            }).then(data => {
                if (data) {
                    gender = data.gender;
                }
                gender = gender.toLowerCase();
                problemarea(gender, agent);
            }).catch(err => {
                agent.add("Sorry, there has technical difficulties. Please refresh page to restart.");
            });
        }

        //vdischarge

        function vaginaldischargecolor(agent) {
            var fdischargecolor = agent.parameters.fdischargecolor.toLowerCase();
            var group = agent.parameters.group;

            if (fdischargecolor == "red" || fdischargecolor == "pink" || fdischargecolor == "yellow-green" || fdischargecolor == "grey") {
                if (fdischargecolor == "red" || fdischargecolor == "pink") {
                    if (group == "Pregnant" || group == "RSPSW") {


                        agent.add("Redirecting...");
                        agent.setFollowupEvent('pinkred');
                    } else {
                        const random = randomgenerator(1, 3);
                        if (random == 3) {
                            agent.add("Are you sure you're not on your period?");
                        } else if (random == 2) {
                            agent.add("Are you sure you're not referring your period?");
                        } else if (random == 1) {
                            agent.add("Are you certain this is not your period?");
                        }
                        confirmation();
                    }
                } else {
                    var labtest, symptoms;


                    if (patientlabtest.some(e => e.labtest == "Vaginal smear") || patientlabtest.some(e => e.labtest == "Vaginal smear unsure")) {
                    } else {
                        labtest = { "labtest": "Vaginal smear" };
                        pushsaveDB(patientlabtest, labtest, "testingscreening");
                    }

                    if (patientsymptoms.some(e => e.symptoms == "abnormal vaginal discharge")) {
                        const random = randomgenerator(1, 2);
                        if (random == 2) {
                            agent.add("This information appears to have been saved already. Any more you'd like to include?");
                        } else if (random == 1) {
                            agent.add("It appears that this detail is already saved. Where would you like to go next?");
                        }
                        confirmationforsymp();
                    } else {
                        symptoms = { "symptoms": "abnormal vaginal discharge", "color": fdischargecolor };
                        pushsaveDB(patientsymptoms, symptoms, "symptoms");
                        continueresponse();
                    }
                }
            } else {
                agent.add("Now, can you tell me what's the texture or consistency?");
                dischargetextureconsistency();
            }
        }

        function vaginaldischargetextureconsistency(agent) {
            var ftextureconsistency = agent.parameters.ftextureconsistency;
            var fdischargecolor = agent.parameters.fdischargecolor;

            if (ftextureconsistency == "egg whites") {
                continueresponse();
            } else {
                var labtest, symptoms;


                if (patientlabtest.some(e => e.labtest == "Vaginal smear") || patientlabtest.some(e => e.labtest == "Vaginal smear unsure")) {
                } else {
                    labtest = { "labtest": "Vaginal smear" };
                    pushsaveDB(patientlabtest, labtest, "testingscreening");
                }

                if (patientsymptoms.some(e => e.symptoms == "abnormal vaginal discharge")) {
                    const random = randomgenerator(1, 2);
                    if (random == 2) {
                        agent.add("This information appears to have been saved already. Any more you'd like to include?");
                    } else if (random == 1) {
                        agent.add("It appears that this detail is already saved. Where would you like to go next?");
                    }
                    confirmationforsymp();
                } else {
                    symptoms = { "symptoms": "abnormal vaginal discharge", "color": fdischargecolor, "consistency": ftextureconsistency };
                    pushsaveDB(patientsymptoms, symptoms, "symptoms");
                    continueresponse();
                }
            }
        }

        function vaginaldischargeperiod_moresymp(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('symptomsyes');
        }

        function vaginaldischargeperiod_go2co(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('spottingvsperiod');
        }

        function vaginaldischargeperiodYES(agent) {
            var fdischargecolor = agent.parameters.fdischargecolor;
            var group = agent.parameters.group;

            var labtest, symptoms;

            if (patientlabtest.some(e => e.labtest == "Vaginal smear") || patientlabtest.some(e => e.labtest == "Vaginal smear unsure")) {
            } else {
                labtest = { "labtest": "Vaginal smear" };
                pushsaveDB(patientlabtest, labtest, "testingscreening");
            }

            if (patientsymptoms.some(e => e.symptoms == "abnormal vaginal discharge")) {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add("This information appears to have been saved already. Any more you'd like to include?");
                } else if (random == 1) {
                    agent.add("It appears that this detail is already saved. Where would you like to go next?");
                }
                confirmationforsymp();
            } else {
                symptoms = { "symptoms": "abnormal vaginal discharge", "color": fdischargecolor };
                pushsaveDB(patientsymptoms, symptoms, "symptoms");
                continueresponse();
            }
        }

        function linkbtn(text, link) {
            const payload = {
                "richContent": {
                    "text": text,
                    "link": link,
                    "type": "button"
                }
            };
            agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));
        }

        function dischargecolor(agent) {
            const payload = {
                "cards": [
                    {
                        "text": "Clear",
                        "image": "https://raw.githubusercontent.com/aminguilan/REPRO/main/CLEAR.jpg"
                    },
                    {
                        "text": "White",
                        "image": "https://github.com/aminguilan/REPRO/blob/main/WHITE.png?raw=true"
                    },
                    {
                        "text": "Yellow-Green",
                        "image": "https://github.com/aminguilan/REPRO/blob/main/YELLOW-GREEN.png?raw=true"
                    },
                    {
                        "text": "Pink",
                        "image": "https://github.com/aminguilan/REPRO/blob/main/PINK.png?raw=true"
                    },
                    {
                        "text": "Red",
                        "image": "https://github.com/aminguilan/REPRO/blob/main/RED.png?raw=true"
                    },
                    {
                        "text": "Grey",
                        "image": "https://github.com/aminguilan/REPRO/blob/main/GRAY.png?raw=true"
                    }
                ]
            };
            agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));
        }

        function dischargetextureconsistency() {
            const payload = {
                "cards": [
                    {
                        "text": "Cottage Cheese",
                        "image": "https://github.com/aminguilan/REPRO/blob/main/1.png?raw=true"
                    },
                    {
                        "text": "Egg Whites",
                        "image": "https://github.com/aminguilan/REPRO/blob/main/4.png?raw=true"
                    },
                    {
                        "text": "Foamy",
                        "image": "https://github.com/aminguilan/REPRO/blob/main/2.png?raw=true"
                    },
                    {
                        "text": "Chunky",
                        "image": "https://github.com/aminguilan/REPRO/blob/main/3.png?raw=true"
                    }
                ]
            };
            agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));
        }

        //vpain

        function vaginalpain(agent) {
            var fpain = agent.parameters.fpain;

            if (!fpain) {
                agent.add("Redirecting...");
                agent.setFollowupEvent('vpain_undetected');
            } else if (fpain == "urinating") {
                agent.add("Redirecting...");
                agent.setFollowupEvent('furinating');
            } else if (fpain == "bleeding") {
                agent.add("Redirecting...");
                agent.setFollowupEvent('fbleeding');
            } else if (fpain == "swelling") {
                agent.add("Redirecting...");
                agent.setFollowupEvent('fswelling');
            } else if (fpain == "itchyness") {
                agent.add("Redirecting...");
                agent.setFollowupEvent('fitchyness');
            } else if (fpain == "irritation") {
                agent.add("Redirecting...");
                agent.setFollowupEvent('firritation');
            }
        }

        function furination(agent) {
            var labtest, symptoms;

            if (patientlabtest.some(e => e.labtest == "Vaginal smear unsure")) {
            } else {
                labtest = { "labtest": "Vaginal smear unsure" };
                pushsaveDB(patientlabtest, labtest, "testingscreening");
            }

            if (patientsymptoms.some(e => e.symptoms == "dysuria")) {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add("This information appears to have been saved already. Any more you'd like to include?");
                } else if (random == 1) {
                    agent.add("It appears that this detail is already saved. Where would you like to go next?");
                }
                confirmationforsymp();
            } else {
                symptoms = { "symptoms": "dysuria" };
                pushsaveDB(patientsymptoms, symptoms, "symptoms");
                continueresponse();
            }
        }

        function fswelling(agent) {
            var labtest, symptoms;

            if (patientlabtest.some(e => e.labtest == "Vaginal smear") || patientlabtest.some(e => e.labtest == "Vaginal smear unsure")) {
            } else {
                labtest = { "labtest": "Vaginal smear" };
                pushsaveDB(patientlabtest, labtest, "testingscreening");
            }

            saveDBsymptomschecker("Vagina/Pelvis", "inflammation");
        }

        function firritationonothersYES(agent) {
            var firritationtype = agent.parameters.firritationtype;
            let labtest = saveDBirritationtypechecker(firritationtype);

            pushsaveDB(patientlabtest, labtest, "testingscreening");

            agent.add("Redirecting...");
            agent.setFollowupEvent('othersirritationtype');
        }

        function firritationonothersNO(agent) {
            var firritationtype = agent.parameters.firritationtype;
            let labtest = saveDBirritationtypechecker(firritationtype);

            pushsaveDB(patientlabtest, labtest, "testingscreening");

            if (patientsymptoms.some(e => e.symptoms == "irritation") && patientsymptoms.some(e => e.affectedarea == "Vagina/Pelvis")) {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add("This information appears to have been saved already. Any more you'd like to include?");
                } else if (random == 1) {
                    agent.add("It appears that this detail is already saved. Where would you like to go next?");
                }
                confirmationforsymp();
            } else {
                saveDBsymptomschecker("Vagina/Pelvis", "irritation");
            }
        }

        function fbleedingirritationYES(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('firritation');
        }

        function fbleedingperiodYES(agent) {
            let labtest = "";

            if (patientlabtest.some(e => e.labtest == "Vaginal smear") || patientlabtest.some(e => e.labtest == "Vaginal smear unsure")) {
            } else {
                labtest = { "labtest": "Vaginal smear" };
            }

            pushsaveDB(patientlabtest, labtest, "testingscreening");

            saveDBsymptomschecker("Vagina/Pelvis", "bleeding");
        }

        function fitchynessirritationYES(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('firritation');
        }

        function fitchynessirritationNO(agent) {
            var labtest, symptoms;

            if (patientlabtest.some(e => e.labtest == "Vaginal smear") || patientlabtest.some(e => e.labtest == "Vaginal smear unsure")) {
            } else {
                labtest = { "labtest": "Vaginal smear" };
                pushsaveDB(patientlabtest, labtest, "testingscreening");
            }

            if (patientsymptoms.some(e => e.symptoms == "itching")) {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add("This information appears to have been saved already. Any more you'd like to include?");
                } else if (random == 1) {
                    agent.add("It appears that this detail is already saved. Where would you like to go next?");
                }
                confirmationforsymp();
            } else {
                symptoms = { "symptoms": "itching", "affectedarea": "Vagina/Pelvis" };
                pushsaveDB(patientsymptoms, symptoms, "symptoms");
                continueresponse();
            }
        }

        function vaginalpainundetectedbleedingYES(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('fbleeding');
        }

        function vaginalpainundetectedperiod_moresymp(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('symptomsyes');
        }

        function vaginalpainundetectedperiod_go2co(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('dysmeremedy');
        }

        function vaginalpainundetectedperiod_contcon(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('endemics');
        }

        function vaginalpainundetectedirritationYES(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('firritation');
        }

        function vaginalpainundetectedswellingYES(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('fswelling');
        }

        function vaginalpainundetectedurinateYES(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('furinating');
        }

        function vaginalpainundetectedurinateNO(agent) {
            var labtest, symptoms;

            if (patientlabtest.some(e => e.labtest == "Vaginal smear unsure")) {
            } else {
                labtest = { "labtest": "Vaginal smear unsure" };
                pushsaveDB(patientlabtest, labtest, "testingscreening");
            }

            if (patientsymptoms.some(e => e.symptoms == "pain") && patientsymptoms.some(e => e.affectedarea == "Vagina/Pelvis")) {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add("This information appears to have been saved already. Any more you'd like to include?");
                } else if (random == 1) {
                    agent.add("It appears that this detail is already saved. Where would you like to go next?");
                }
                confirmationforsymp();
            } else {
                symptoms = { "symptoms": "pain", "affectedarea": "Vagina/Pelvis" };
                pushsaveDB(patientsymptoms, symptoms, "symptoms");
                continueresponse();
            }
        }

        //vodor

        function vaginalodor(agent) {
            var labtest, symptoms;

            if (patientlabtest.some(e => e.labtest == "Vaginal smear") || patientlabtest.some(e => e.labtest == "Vaginal smear unsure")) {
            } else {
                labtest = { "labtest": "Vaginal smear" };
                pushsaveDB(patientlabtest, labtest, "testingscreening");
            }

            if (patientsymptoms.some(e => e.symptoms == "abnormal vaginal odor")) {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add("This information appears to have been saved already. Any more you'd like to include?");
                } else if (random == 1) {
                    agent.add("It appears that this detail is already saved. Where would you like to go next?");
                }
                confirmationforsymp();
            } else {
                symptoms = { "symptoms": "abnormal vaginal odor" };
                pushsaveDB(patientsymptoms, symptoms, "symptoms");
                continueresponse();
            }
        }

        //oral

        function oralirritationonothersYES(agent) {
            var oralirritation = agent.parameters.oralirritation;
            let labtest = saveDBirritationtypechecker(oralirritation);

            pushsaveDB(patientlabtest, labtest, "testingscreening");

            agent.add("Redirecting...");
            agent.setFollowupEvent('othersirritationtype');
        }

        function oralirritationonothersNO(agent) {
            var oralirritation = agent.parameters.oralirritation;
            let labtest = saveDBirritationtypechecker(oralirritation);

            pushsaveDB(patientlabtest, labtest, "testingscreening");

            if (patientsymptoms.some(e => e.symptoms == "irritation") && patientsymptoms.some(e => e.affectedarea.includes("Mouth/Throat"))) {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add("This information appears to have been saved already. Any more you'd like to include?");
                } else if (random == 1) {
                    agent.add("It appears that this detail is already saved. Where would you like to go next?");
                }
                confirmationforsymp();
            } else {
                saveDBsymptomschecker("Mouth/Throat", "irritation");
            }
        }

        //anal

        function analpain(agent) {
            var analpain = agent.parameters.analpain;

            if (!analpain) {
                agent.add("Redirecting...");
                agent.setFollowupEvent('analpain_undetected');
            } else if (analpain == "irritation") {
                agent.add("Redirecting...");
                agent.setFollowupEvent('analirritation');
            } else if (analpain == "proctitis") {
                agent.add("Redirecting...");
                agent.setFollowupEvent('analinflammation');
            } else if (analpain == "defacation") {
                agent.add("Redirecting...");
                agent.setFollowupEvent('analdefacation');
            } else if (analpain == "bleeding") {
                agent.add("Redirecting...");
                agent.setFollowupEvent('analbleeding');
            } else if (analpain == "itchyness") {
                agent.add("Redirecting...");
                agent.setFollowupEvent('analitchyness');
            }
        }

        function anuspainundetectedbleedingYES(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('analbleeding');
        }

        function anuspainundetectedirritationYES(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('analirritation');
        }

        function anuspainundetectedswellingYES(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('analinflammation');
        }

        function anuspainundetecteddefacateYES(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('analdefacation');
        }

        function anuspainundetecteddefacateNO(agent) {
            unsure_endemics_verdict = agent.parameters.unsure_endemics_verdict;

            const random = randomgenerator(1, 3);
            if (random == 1) {
                agent.add("What you're experiencing might not be apart of our scope and therefore omitted from the evaluation process. However, I'll do everything I can to assist you in getting SRH services. Where to next?");
            } else if (random == 2) {
                agent.add("Your experiences might not fall inside our extent, thus overlooked in the evaluation procedure. Nonetheless, I'll help you attain SRH services as much as I can. Where would you like to go next?");
            } else {
                agent.add("Your experiences may not coincide with our range and thus unlisted in the review process. Nevertheless, I'll do everything I can to assist you in getting SRH services. Please choose the next destination.");
            }
            confirmationforsymp();
        }

        function analinflammationirritationNO(agent) {
            var labtest, symptoms;

            if (patientlabtest.some(e => e.labtest == "Anal smear")) {
            } else {
                labtest = { "labtest": "Anal smear" };
                pushsaveDB(patientlabtest, labtest, "testingscreening");
            }

            saveDBsymptomschecker("Anus", "inflammation");
        }

        function analinflammationirritationYES(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('analirritation');
        }

        function analitchynessirritationYES(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('analirritation');
        }

        function analitchynessirritationNO(agent) {
            var labtest, symptoms;

            if (patientlabtest.some(e => e.labtest == "Anal smear")) {
            } else {
                labtest = { "labtest": "Anal smear" };
                pushsaveDB(patientlabtest, labtest, "testingscreening");
            }

            if (patientsymptoms.some(e => e.symptoms == "itching") && patientsymptoms.some(e => e.affectedarea == "Anus")) {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add("This information appears to have been saved already. Any more you'd like to include?");
                } else if (random == 1) {
                    agent.add("It appears that this detail is already saved. Where would you like to go next?");
                }
                confirmationforsymp();
            } else {
                symptoms = { "symptoms": "itching", "affectedarea": "Anus" };
                pushsaveDB(patientsymptoms, symptoms, "symptoms");
                continueresponse();
            }
        }

        function analirritationonothersYES(agent) {
            var analirritation = agent.parameters.analirritation;
            let labtest = saveDBirritationtypechecker(analirritation);

            pushsaveDB(patientlabtest, labtest, "testingscreening");

            agent.add("Redirecting...");
            agent.setFollowupEvent('othersirritationtype');
        }

        function analirritationonothersNO(agent) {
            var analirritation = agent.parameters.analirritation;
            let labtest = saveDBirritationtypechecker(analirritation);

            pushsaveDB(patientlabtest, labtest, "testingscreening");

            if (patientsymptoms.some(e => e.symptoms == "irritation") && patientsymptoms.some(e => e.affectedarea.includes("Anus"))) {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add("This information appears to have been saved already. Any more you'd like to include?");
                } else if (random == 1) {
                    agent.add("It appears that this detail is already saved. Where would you like to go next?");
                }
                confirmationforsymp();
            } else {
                saveDBsymptomschecker("Anus", "irritation");
            }
        }

        function analbleedingirritationYES(agent) {
            var analirritation = agent.parameters.analirritation;
            let labtest = saveDBirritationtypechecker(analirritation);

            pushsaveDB(patientlabtest, labtest, "testingscreening");

            agent.add("Redirecting...");
            agent.setFollowupEvent('othersirritationtype');
        }

        function analbleedingirritationNO(agent) {
            var labtest, symptoms;

            if (patientlabtest.some(e => e.labtest == "Anal smear")) {
            } else {
                labtest = { "labtest": "Anal smear" };
                pushsaveDB(patientlabtest, labtest, "testingscreening");
            }

            saveDBsymptomschecker("Anus", "bleeding");
        }

        function analdefacation(agent) {
            var labtest, symptoms;

            if (patientlabtest.some(e => e.labtest == "Anal smear")) {
            } else {
                labtest = { "labtest": "Anal smear" };
                pushsaveDB(patientlabtest, labtest, "testingscreening");
            }

            if (patientsymptoms.some(e => e.symptoms == "dyschezia")) {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add("This information appears to have been saved already. Any more you'd like to include?");
                } else if (random == 1) {
                    agent.add("It appears that this detail is already saved. Where would you like to go next?");
                }
                confirmationforsymp();
            } else {
                symptoms = { "symptoms": "dyschezia" };
                pushsaveDB(patientsymptoms, symptoms, "symptoms");
                continueresponse();
            }
        }

        function analdischarge(agent) {
            var labtest, symptoms;

            if (patientlabtest.some(e => e.labtest == "Anal smear")) {
            } else {
                labtest = { "labtest": "Anal smear" };
                pushsaveDB(patientlabtest, labtest, "testingscreening");
            }

            if (patientsymptoms.some(e => e.symptoms == "rectal discharge")) {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add("This information appears to have been saved already. Any more you'd like to include?");
                } else if (random == 1) {
                    agent.add("It appears that this detail is already saved. Where would you like to go next?");
                }
                confirmationforsymp();
            } else {
                symptoms = { "symptoms": "rectal discharge" };
                pushsaveDB(patientsymptoms, symptoms, "symptoms");
                continueresponse();
            }
        }

        //modor

        function penileodor(agent) {
            var labtest, symptoms;

            if (patientlabtest.some(e => e.labtest == "Penile smear")) {
            } else {
                labtest = { "labtest": "Penile smear" };
                pushsaveDB(patientlabtest, labtest, "testingscreening");
            }

            if (patientsymptoms.some(e => e.symptoms == "abnormal penile odor")) {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add("This information appears to have been saved already. Any more you'd like to include?");
                } else if (random == 1) {
                    agent.add("It appears that this detail is already saved. Where would you like to go next?");
                }
                confirmationforsymp();
            } else {
                symptoms = { "symptoms": "abnormal penile odor" };
                pushsaveDB(patientsymptoms, symptoms, "symptoms");
                continueresponse();
            }
        }

        //pswelling

        function maleswellingcircumcise(agent) {
            let iscircumcised = agent.parameters.iscircumcised;
            var labtest, symptoms;

            if (iscircumcised == "Yes") {
                if (patientlabtest.some(e => e.labtest == "Penile smear")) {
                } else {
                    labtest = { "labtest": "Penile smear" };
                }
            } else {
                if (patientlabtest.some(e => e.labtest == "Professional Visual Inspection")) {
                } else {
                    labtest = { "labtest": "Professional Visual Inspection" };
                }
            }

            pushsaveDB(patientlabtest, labtest, "testingscreening");

            saveDBsymptomschecker("Penis/Pelvis", "inflammation");
        }

        //pdischarge

        function peniledischarge(agent) {
            var labtest, symptoms;

            if (patientlabtest.some(e => e.labtest == "Penile smear")) {
            } else {
                labtest = { "labtest": "Penile smear" };
                pushsaveDB(patientlabtest, labtest, "testingscreening");
            }

            if (patientsymptoms.some(e => e.symptoms == "urethral discharge")) {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add("This information appears to have been saved already. Any more you'd like to include?");
                } else if (random == 1) {
                    agent.add("It appears that this detail is already saved. Where would you like to go next?");
                }
                confirmationforsymp();
            } else {
                symptoms = { "symptoms": "urethral discharge" };
                pushsaveDB(patientsymptoms, symptoms, "symptoms");
                continueresponse();
            }
        }

        //ppain

        function penilepain(agent) {
            var mpain = agent.parameters.mpain;

            if (!mpain) {
                agent.add("Redirecting...");
                agent.setFollowupEvent('mpain_undetected');
            } else if (mpain == "urinating") {
                agent.add("Redirecting...");
                agent.setFollowupEvent('murinating');
            } else if (mpain == "bleeding") {
                agent.add("Redirecting...");
                agent.setFollowupEvent('mbleeding');
            } else if (mpain == "swelling") {
                agent.add("Redirecting...");
                agent.setFollowupEvent('mswelling');
            } else if (mpain == "itchyness") {
                agent.add("Redirecting...");
                agent.setFollowupEvent('mitchyness');
            } else if (mpain == "irritation") {
                agent.add("Redirecting...");
                agent.setFollowupEvent('mirritation');
            }
        }

        function maleurination(agent) {
            var labtest, symptoms;

            if (patientlabtest.some(e => e.labtest == "Penile smear unsure")) {
            } else {
                labtest = { "labtest": "Penile smear unsure" };
                pushsaveDB(patientlabtest, labtest, "testingscreening");
            }

            if (patientsymptoms.some(e => e.symptoms == "dysuria")) {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add("This information appears to have been saved already. Any more you'd like to include?");
                } else if (random == 1) {
                    agent.add("It appears that this detail is already saved. Where would you like to go next?");
                }
                confirmationforsymp();
            } else {
                symptoms = { "symptoms": "dysuria" };
                pushsaveDB(patientsymptoms, symptoms, "symptoms");
                continueresponse();
            }
        }

        function malebleedingirritationYES(agent) {
            var analirritation = agent.parameters.analirritation;
            let labtest = saveDBirritationtypechecker(analirritation);

            pushsaveDB(patientlabtest, labtest, "testingscreening");

            agent.add("Redirecting...");
            agent.setFollowupEvent('mirritation');
        }

        function malebleedingirritationNO(agent) {
            var labtest, symptoms;

            if (patientlabtest.some(e => e.labtest == "Penile smear")) {
            } else {
                labtest = { "labtest": "Penile smear" };
                pushsaveDB(patientlabtest, labtest, "testingscreening");
            }

            saveDBsymptomschecker("Penis/Pelvis", "bleeding");
        }

        function maleitchynessirritationYES(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('mirritation');
        }

        function maleitchynessirritationNO(agent) {
            var labtest, symptoms;

            if (patientlabtest.some(e => e.labtest == "Penile smear")) {
            } else {
                labtest = { "labtest": "Penile smear" };
                pushsaveDB(patientlabtest, labtest, "testingscreening");
            }

            if (patientsymptoms.some(e => e.symptoms == "itching")) {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add("This information appears to have been saved already. Any more you'd like to include?");
                } else if (random == 1) {
                    agent.add("It appears that this detail is already saved. Where would you like to go next?");
                }
                confirmationforsymp();
            } else {
                symptoms = { "symptoms": "itching", "affectedarea": "Penis/Pelvis" };
                pushsaveDB(patientsymptoms, symptoms, "symptoms");
                continueresponse();
            }
        }

        function maleirritationonothersYES(agent) {
            var mirritation = agent.parameters.mirritation;
            let labtest = saveDBirritationtypechecker(mirritation);

            pushsaveDB(patientlabtest, labtest, "testingscreening");

            agent.add("Redirecting...");
            agent.setFollowupEvent('othersirritationtype');
        }

        function maleirritationonothersNO(agent) {
            var mirritation = agent.parameters.mirritation;
            let labtest = saveDBirritationtypechecker(mirritation);

            pushsaveDB(patientlabtest, labtest, "testingscreening");

            if (patientsymptoms.some(e => e.symptoms == "irritation") && patientsymptoms.some(e => e.affectedarea.includes("Penis/Pelvis"))) {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add("This information appears to have been saved already. Any more you'd like to include?");
                } else if (random == 1) {
                    agent.add("It appears that this detail is already saved. Where would you like to go next?");
                }
                confirmationforsymp();
            } else {
                saveDBsymptomschecker("Penis/Pelvis", "irritation");
            }
        }

        function penilepainundetectedurinateYES(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('murinating');
        }

        function penilepainundetectedswellingYES(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('mswelling');
        }

        function penilepainundetectedirritationsYES(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('mirritation');
        }

        function penilepainundetectedbleedingYES(agent) {
            agent.add("Redirecting...");
            agent.setFollowupEvent('mbleeding');
        }

        function penilepainundetectedurinateNO(agent) {
            var labtest, symptoms;

            if (patientlabtest.some(e => e.labtest == "Penile smear unsure")) {
            } else {
                labtest = { "labtest": "Penile smear unsure" };
                pushsaveDB(patientlabtest, labtest, "testingscreening");
            }

            if (patientsymptoms.some(e => e.symptoms == "pain") && patientsymptoms.some(e => e.symptoms == "Penis/Pelvis")) {
                const random = randomgenerator(1, 2);
                if (random == 2) {
                    agent.add("This information appears to have been saved already. Any more you'd like to include?");
                } else if (random == 1) {
                    agent.add("It appears that this detail is already saved. Where would you like to go next?");
                }
                confirmationforsymp();
            } else {
                symptoms = { "symptoms": "pain", "affectedarea": "Penis/Pelvis" };
                pushsaveDB(patientsymptoms, symptoms, "symptoms");
                continueresponse();
            }
        }

        //others

        function othersaffectedarea(agent) {
            var problemarea = agent.parameters.othersirrittationarea;
            var fpain = agent.parameters.fpain;
            var mpain = agent.parameters.mpain;
            var analpain = agent.parameters.analpain;
            var oral = agent.parameters.oral;
            var othershasongenital = agent.parameters.hasongenital;
            var othersirritation = agent.parameters.othersirritation;
            var temp = "", othersirrittationarea = "", symptoms = {}, wholebody = "", labtest = "";

            return admin.firestore().collection('ICR').doc(sessionID).get().then((doc) => {
                const data = doc.data();
                return data;
            }).then(data => {
                var gender = data.gender;

                for (var i = 0; i < problemarea.length; i++) {
                    if (problemarea[i] == "genitals") {
                        if (gender == "FEMALE") {
                            problemarea[i] = "Vagina/Pelvis";
                        } else if (gender == "MALE") {
                            problemarea[i] = "Penis/Pelvis";
                        }
                    }
                    temp = problemarea[i];
                    othersirrittationarea = othersirrittationarea + temp;
                    if (problemarea[i + 1]) {
                        othersirrittationarea = othersirrittationarea + ", ";
                    }
                }

                if (othershasongenital == "Yes") {
                    if (othersirrittationarea.includes("whole body")) {
                        wholebody = "yes";
                        symptoms = { "symptoms": "irritation", "affectedarea": othersirrittationarea };
                    } else {
                        if (gender == "FEMALE") {
                            symptoms = { "symptoms": "irritation", "affectedarea": "Vagina/Pelvis, " + othersirrittationarea };
                        } else if (gender == "MALE") {
                            symptoms = { "symptoms": "irritation", "affectedarea": "Penis/Pelvis, " + othersirrittationarea };
                        }
                    }
                } else if (othershasongenital == "No") {
                    symptoms = { "symptoms": "irritation", "affectedarea": othersirrittationarea };
                } else {
                    if (fpain == "irritation") {
                        symptoms = { "symptoms": "irritation", "affectedarea": "Vagina/Pelvis, " + othersirrittationarea };
                    } else if (mpain == "irritation") {
                        symptoms = { "symptoms": "irritation", "affectedarea": "Penis/Pelvis, " + othersirrittationarea };
                    } else if (analpain == "irritation") {
                        symptoms = { "symptoms": "irritation", "affectedarea": "Anus, " + othersirrittationarea };
                    } else if (oral == "irritation") {
                        symptoms = { "symptoms": "irritation", "affectedarea": "Mouth/Throat, " + othersirrittationarea };
                    } else {
                        if (othersirrittationarea.includes("whole body")) {
                            wholebody = "yes";
                        }
                        symptoms = { "symptoms": "irritation", "affectedarea": othersirrittationarea };
                    }
                }
            }).then(() => {
                if (!wholebody) {
                    labtest = saveDBirritationtypechecker(othersirritation);
                } else {
                    unsure_endemics_verdict = "out";
                }

                pushsaveDB(patientlabtest, labtest, "testingscreening");
                pushsaveDB(patientsymptoms, symptoms, "symptoms");

                continueresponse();
            }).catch(err => {
                agent.add("Sorry, there has technical difficulties. Please refresh page to restart.");
            });
        }

        //endemics

        function factors2endemics(agent) {
            return admin.firestore().collection('ICR').doc(sessionID).get().then((doc) => {
                const data = doc.data();
                return data;
            }).then(data => {
                if (data.symptoms == undefined || data.symptoms.length == 0) {
                    const random = randomgenerator(1, 2);
                    if (random == 2) {
                        agent.add("That's great! For this section, please answer as truthfully as you can.");
                        agent.add("Comparing to your past observations, would you say there has been a drastic change?");
                    } else {
                        agent.add("Superb! In this part, I'll be asking another series of question. Try your best to keep up.");
                        agent.add("Based on your previous examinations, would you confirm the noticeable change?");
                    }
                } else {
                    const random = randomgenerator(1, 2);
                    if (random == 2) {
                        agent.add("That's great! For this section, please answer as truthfully as you can.");
                        agent.add("Comparing to your past observations, would you say there has been a drastic change?");
                    } else {
                        agent.add("Superb! In this part, I'll be asking another series of question. Try your best to keep up.");
                        agent.add("Based on your previous examinations, would you confirm the noticeable change?");
                    }
                    confirmation();
                }
            }).catch(err => {
                agent.add("Sorry, there has technical difficulties. Please refresh page to restart.");
            });
        }

        function sexuallyactive(agent) {
            var issexuallyactive = agent.parameters.issexuallyactive;

            if (issexuallyactive == "No") {
                agent.add("Redirecting...");
                agent.setFollowupEvent("washaftersex");
            } else {
                agent.context.set({ 'name': 'RiskySexualBehavior-followup-2', lifespan: 0 });

                const random = randomgenerator(1, 2);
                if (random == 1) {
                    agent.add("Did you recently had sex?");
                } else {
                    agent.add("Did you have sex not long ago?");
                }
                confirmation();
            }
        }

        function riskysexbehavior(agent) {
            if (patientsymptoms.some(e => e.symptoms == "pain") || patientsymptoms.some(e => e.symptoms == "dysuria") || patientsymptoms.some(e => e.symptoms == "penile bleeding") || patientsymptoms.some(e => e.symptoms == "vaginal bleeding") || patientsymptoms.some(e => e.symptoms == "itching")) {
                const random = randomgenerator(1, 3);
                if (random == 2) {
                    agent.add("Do constantly wash or pee after sex?");
                } else if (random == 1) {
                    agent.add("Do you always wash or urinate right after sex?");
                } else {
                    agent.add("After sex, do you frequently wash or urinate?");
                }
                confirmation();
            } else {
                agent.add("Redirecting...");
                agent.setFollowupEvent('washaftersex');
            }
        }

        function borroweditem(agent) {
            var hasborroweditem = agent.parameters.hasborroweditem;
            var hasnewproduct = agent.parameters.hasnewproduct;
            var didoverclean = agent.parameters.didoverclean;
            var changedhygieneroutine = agent.parameters.changedhygieneroutine;
            var doesshowerdaily = agent.parameters.doesshowerdaily;
            var doeswashaftersex = agent.parameters.doeswashaftersex;
            var haschanges = agent.parameters.haschanges;
            var howmanydays = agent.parameters.howmanydays;
            var issexuallyactive = agent.parameters.issexuallyactive;
            var hadsex = agent.parameters.hadsex;
            var hasnewpartner = agent.parameters.hasnewpartner;
            var didriskybehavior = agent.parameters.didriskybehavior;
            var group = userinfo.group;
            var count = 0;
            var didsex;

            if (haschanges == "Yes") {
                count++;
                count++;
            }
            if (howmanydays != -1 || howmanydays != 0) {
                count++;
            }
            if (issexuallyactive == "Yes") {
                count++;
                count++;
                didsex = "yes";
            }
            if (hadsex == "Yes") {
                count = count + 3;
                didsex = "yes";
            }
            if (hasnewpartner == "Yes") {
                count = count + 3;
                didsex = "yes";
            }
            if (didriskybehavior == "Yes") {
                count = count + 3;
                didsex = "yes";
            }
            if (doeswashaftersex != "Yes") {
                if (didsex == "yes") {
                    count++;
                    count++;
                } else {
                    count--;
                    count--;
                }
            }
            if (doesshowerdaily != "Yes") {
                count++;
                count++;
            }
            if (changedhygieneroutine == "Yes") {
                count++;
            }
            if (didoverclean == "Yes") {
                if (patientsymptoms.some(e => e.symptoms == "itching") || patientsymptoms.some(e => e.symptoms == "vaginal discharge") || patientsymptoms.some(e => e.symptoms == "odor")) {
                    count++;
                    count++;
                } else {
                    count++;
                }
            }
            if (hasnewproduct == "Yes") {
                if (patientsymptoms.some(e => e.symptoms == "itching") || patientsymptoms.some(e => e.symptoms == "irritation") || patientsymptoms.some(e => e.symptoms == "odor") || patientsymptoms.some(e => e.symptoms == "inflammation") || patientsymptoms.some(e => e.symptoms == "pain")) {
                    count++;
                    count++;
                } else {
                    count++;
                }
            }
            if (hasborroweditem == "Yes") {
                count++;
                count++;
            }
            if (group === "RSW") {
                count++;
                count++;
            } else if (group === "FLSW") {
                count++;
                count++;
            } else if (group === "MSW") {
                count++;
                count++;
            } else if (group === "MSM") {
                count++;
                count++;
            } else if (group === "RSPSW") {
                count++;
                count++;
            } else if (group === "CSW") {
                count++;
                count++;
            }

            let verdict;

            if (unsure_endemics_verdict) {
                if (unsure_endemics_verdict == "out") {
                    if (count >= 5) {
                        verdict = "";
                    } else {
                        verdict = "out";
                    }
                } else if (unsure_endemics_verdict == "out!") {
                    verdict = "out!";
                }
            } else {
                if (count >= 5) {
                    verdict = "";
                } else if (count < 0) {
                    verdict = "out";
                } else {
                    verdict = "good";
                }
            }

            agent.context.set({ name: "verdict", lifespan: 2, "parameters": { "didsex": didsex, "endemics_verdict": verdict } });

            const random = randomgenerator(1, 3);
            if (random == 2) {
                agent.add("Aaand we're done! Sorry for the long wait. Would you like to see the results now?");
            } else if (random == 3) {
                agent.add("Alrighty! Sorry it took so long. Results are ready now. Are you ready?");
            } else if (random == 1) {
                agent.add("Finally, we're done! I apologize for the wait. Do you want to see the findings right away? ");
            }
            confirmation();
        }

        //verdict

        function verdict(agent) {
            var endemics_verdict = agent.parameters.endemics_verdict;
            var didsex = agent.parameters.didsex;

            patientsymptoms = [];
            patientlabtest = [];

            let tests = [];

            return admin.firestore().collection('ICR').doc(sessionID).get().then((doc) => {
                const data = doc.data();
                return data;
            }).then(data => {

                let test = data.testingscreening;
                let gender = data.gender;

                let area = [];
                let payload = {};
                var cost = "0";

                if (test) {
                    if (endemics_verdict == "out" || endemics_verdict == "good") {
                        tests = "Out of Scope";
                        
                        agent.add("Redirecting...");
                        agent.setFollowupEvent('outofscope');
                    } else {
                        let labtest = test.map(data => {
                            let templabtest = data.labtest;

                            if (templabtest.includes("smear")) {
                                templabtest = templabtest.replace("smear", "");
                                templabtest = templabtest.replace(" ", "");

                                if (templabtest.includes("unsure")) {
                                    if (endemics_verdict == "good" && test.length == 1) {
                                        agent.add("Redirecting...");
                                        agent.setFollowupEvent('voluntarylab');
                                    } else {
                                        templabtest = templabtest.replace("unsure", "");
                                        templabtest = templabtest.replace(" ", "");
                                    }
                                }
                                area.push(templabtest);
                            } else {
                                if (templabtest.includes("VDRL/RPR")) {
                                    templabtest = templabtest.replace("VDRL/RPR", "Rapid Plasma Reagin - Venereal Disease Research Laboratory (RPR/VDRL)");
                                }
                                tests.push(templabtest);
                            }
                        });

                        let smear = "";
                        for (var i = 0; i < area.length; i++) {
                            smear = area[i] + smear;
                            if (area[i + 1]) {
                                smear = " - " + smear;
                            }
                        }

                        if (smear) {
                            let gramstain = "Gram Stain: " + smear + " Smear";
                            tests.push(gramstain);
                        }

                        if (smear && gender == "FEMALE") {
                            cost = "160";
                        }

                        if (cost == "0") {
                            cost = "Free";
                        }

                        const random = randomgenerator(1, 3);
                        if (random == 1) {
                            agent.add("Here you go. Please read through thoroughly.");
                        } else if (random == 2) {
                            agent.add("You're all set. A thorough reading is requested.");
                        } else if (random == 3) {
                            agent.add("This is for you. Requesting for you to read everything carefully.");
                        }

                        let description = "";
                        if (endemics_verdict == "out!") {
                            description = "There's been a detected anomaly unlisted above. Only those capable of parsing are included in the Recommendations. This could be due to your symptoms conflicting with or being out of our bounds. I advise you to consult a professional about it.";
                        }

                        payload = {
                            "recommendation": {
                                "test": tests,
                                "cost": cost,
                                "status": "2",
                                "description": description,
                                "image": "https://raw.githubusercontent.com/aminguilan/REPRO/main/10.png"
                            }
                        };
                        agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));
                    }
                } else {
                    if (endemics_verdict == "good") {
                        tests = "No Immediate Action";

                        agent.add("Redirecting...");
                        agent.setFollowupEvent('noaction');
                    } else if (endemics_verdict == "out" || endemics_verdict == "out!") {
                        tests = "Out of Scope";

                        agent.add("Redirecting...");
                        agent.setFollowupEvent('outofscope');
                    } else {
                        tests = "Voluntary Lab Work";

                        agent.add("Redirecting...");
                        agent.setFollowupEvent('voluntarylab');
                    }
                }
            }).then(() => {
                db.collection('ICR').doc(sessionID).update({ "testingscreening": tests });

                if (didsex == "yes") {
                    const random = randomgenerator(1, 3);
                    if (random == 1) {
                        agent.add("Thanks a lot for using me! I humbly request you invite your latest partner to seek SRH services as well. Don't forget to take protection as well. Condoms and lubricants are distributed as handouts at the clinic (RHWC); if you have the time, stop by. Let's help one another reduce the incidence of RTIs!");
                        agent.end("Goodbye~");
                    } else if (random == 2) {
                        agent.add("Many thanks for using me! I respectfully ask that you also let your latest partner seek SRH services. And don't forget to use protection. Condoms and lubrications are given as handouts at the clinic (RHWC), please do visit if you have the time. Let's work together to lower the prevalence of RTIs!");
                        agent.end("So long~");
                    } else if (random == 3) {
                        agent.add("You're awesome! Thanks a lot! I sincerely ask that you invite your most recent partner to access their reproductive health as well. Don't forget to wear safety gear. Condoms and lubricants are provided free of charge at the clinic (RHWC); please stop by if you have the time. Let's work together to lower the occurrence of RTIs!");
                        agent.end("Ciao~");
                    }
                } else {
                    const random = randomgenerator(1, 3);
                    if (random == 1) {
                        agent.add("Thanks a lot for using me! Remember your contraceptives as well. Condoms and lubricants are distributed as handouts at the clinic (RHWC); if you have the time, stop by. Let's help one another reduce the incidence of RTIs!");
                        agent.end("Goodbye~");
                    } else if (random == 2) {
                        agent.add("Many thanks for using me! And don't forget to use protection. Condoms and lubrications are given as handouts at the clinic (RHWC), please do visit if you have the time. Let's work together to lower the prevalence of RTIs!");
                        agent.end("So long~");
                    } else if (random == 3) {
                        agent.add("You're awesome! Thanks a lot! Don't forget to wear your contraceptives. Condoms and lubricants are provided free of charge at the clinic (RHWC); please stop by if you have the time. Let's work together to lower the occurrence of RTIs!");
                        agent.end("Ciao~");
                    }
                }
            }).catch(err => {
                agent.add("Sorry, there has technical difficulties. Please refresh page to restart.");
            });
        }

        let intentMap = new Map();
        //chatonly
        intentMap.set('Go to Consultation', gotoconsultation);
        intentMap.set('Chat Only - fallback - Go to Consultation', cofallback_gotoconsultation);
        intentMap.set('Does sex hurt?', sexhurt);
        //consultation
        intentMap.set('Consultation', consultation);
        intentMap.set('Birth & Age', birthdayage);
        intentMap.set('Fullname', fullname);
        intentMap.set('Sex', sex);
        intentMap.set('RSPSW', RSPSW);
        intentMap.set('Groups', groups);
        intentMap.set('Marital Status', civilstatus);
        intentMap.set('Contact Number', contactnumber);
        intentMap.set('Address', address);
        intentMap.set('LoadDB 1', loadDB1);
        intentMap.set('LoadDB 2', loadDB2);
        intentMap.set('Symptoms', symptoms);
        intentMap.set('Symptoms - yes', symptomsYES);
        //vdischarge
        intentMap.set('Vaginal Discharge Color', vaginaldischargecolor);
        intentMap.set('Vaginal Discharge Period - I have more symptoms', vaginaldischargeperiod_moresymp);
        intentMap.set('Vaginal Discharge Period - Go to Chat Only', vaginaldischargeperiod_go2co);
        intentMap.set('Vaginal Discharge Period - yes', vaginaldischargeperiodYES);
        intentMap.set('Vaginal Discharge Texture & Consistency', vaginaldischargetextureconsistency);
        //vpain
        intentMap.set('Vaginal Pain', vaginalpain);
        intentMap.set('Vaginal Pain', vaginalpain);
        intentMap.set('Female Urination', furination);
        intentMap.set('Female Swelling', fswelling);
        intentMap.set('Female Irritation on Others - yes', firritationonothersYES);
        intentMap.set('Female Irritation on Others - no', firritationonothersNO);
        intentMap.set('Female Itchyness Irritation - no', fitchynessirritationNO);
        intentMap.set('Female Itchyness Irritation - yes', fitchynessirritationYES);
        intentMap.set('Female Bleeding Irritation - yes', fbleedingirritationYES);
        intentMap.set('Female Bleeding Period - yes', fbleedingperiodYES);
        intentMap.set('Vaginal Pain Undetected Bleeding - yes', vaginalpainundetectedbleedingYES);
        intentMap.set('Vaginal Pain Undetected Period - I have more symptoms', vaginalpainundetectedperiod_moresymp);
        intentMap.set('Vaginal Pain Undetected Period - Go to Chat Only', vaginalpainundetectedperiod_go2co);
        intentMap.set('Vaginal Pain Undetected Period - Continue consultation', vaginalpainundetectedperiod_contcon);
        intentMap.set('Vaginal Pain Undetected Irritation - yes', vaginalpainundetectedirritationYES);
        intentMap.set('Vaginal Pain Undetected Swelling - yes', vaginalpainundetectedswellingYES);
        intentMap.set('Vaginal Pain Undetected Urinate - no', vaginalpainundetectedurinateNO);
        intentMap.set('Vaginal Pain Undetected Urinate - yes', vaginalpainundetectedurinateYES);
        //vodor
        intentMap.set('Vaginal Odor', vaginalodor);
        //oral
        intentMap.set('Mouth/Throat Irritation on Others - yes', oralirritationonothersYES);
        intentMap.set('Mouth/Throat Irritation on Others - no', oralirritationonothersNO);
        //anal
        intentMap.set('Anus Pain', analpain);
        intentMap.set('Anus Pain Undetected Bleeding - yes', anuspainundetectedbleedingYES);
        intentMap.set('Anus Pain Undetected Irritation - yes', anuspainundetectedirritationYES);
        intentMap.set('Anus Pain Undetected Swelling - yes', anuspainundetectedswellingYES);
        intentMap.set('Anus Pain Undetected Defacate - yes', anuspainundetecteddefacateYES);
        intentMap.set('Anus Pain Undetected Defacate - no', anuspainundetecteddefacateNO);
        intentMap.set('Anus Inflammation Irritation - yes', analinflammationirritationYES);
        intentMap.set('Anus Inflammation Irritation - no', analinflammationirritationNO);
        intentMap.set('Anus Itchyness Irritation - yes', analitchynessirritationYES);
        intentMap.set('Anus Itchyness Irritation - no', analitchynessirritationNO);
        intentMap.set('Anus Irritation on Others - yes', analirritationonothersYES);
        intentMap.set('Anus Irritation on Others - no', analirritationonothersNO);
        intentMap.set('Anus Bleeding Irritation - yes', analbleedingirritationYES);
        intentMap.set('Anus Bleeding Irritation - no', analbleedingirritationNO);
        intentMap.set('Anus Defecation', analdefacation);
        intentMap.set('Anus Discharge', analdischarge);
        //ppain
        intentMap.set('Penile Odor', penileodor);
        intentMap.set('Penile Pain', penilepain);
        intentMap.set('Penile Pain', penilepain);
        intentMap.set('Male Urination', maleurination);
        intentMap.set('Male Bleeding Irritation - yes', malebleedingirritationYES);
        intentMap.set('Male Bleeding Irritation - no', malebleedingirritationNO);
        intentMap.set('Male Itchyness Irritation - yes', maleitchynessirritationYES);
        intentMap.set('Male Itchyness Irritation - no', maleitchynessirritationNO);
        intentMap.set('Male Irritation on Others - yes', maleirritationonothersYES);
        intentMap.set('Male Irritation on Others - no', maleirritationonothersNO);
        intentMap.set('Male Swelling Circumcise', maleswellingcircumcise);
        intentMap.set('Penile Pain Undetected Bleeding - yes', penilepainundetectedbleedingYES);
        intentMap.set('Penile Pain Undetected Irritation - yes', penilepainundetectedirritationsYES);
        intentMap.set('Penile Pain Undetected Swelling - yes', penilepainundetectedswellingYES);
        intentMap.set('Penile Pain Undetected Urinate - yes', penilepainundetectedurinateYES);
        intentMap.set('Penile Pain Undetected Urinate - no', penilepainundetectedurinateNO);
        //pdischarge
        intentMap.set('Penile Discharge', peniledischarge);
        //others
        intentMap.set('Affected Area', othersaffectedarea);
        //endemics
        intentMap.set('Factors to Endemics', factors2endemics);
        intentMap.set('Sexually Active', sexuallyactive);
        intentMap.set('Risky Sexual Behavior', riskysexbehavior);
        intentMap.set('Borrowed Item', borroweditem);
        //verdict
        intentMap.set('Recommendation', verdict);
        agent.handleRequest(intentMap);
    });
}