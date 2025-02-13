Instance: OutcomeQuestionnaire
InstanceOf: Questionnaire
Title: "Outcome Questionnaire"
Description: ""
Usage: #definition
* status = #draft
* experimental = false

* contained[+] = TBCSTreatmentOutcomeVS
* contained[+] = TBCSDenotificationReasonsVS

* item[+].linkId = "tbCsTreatmentOutcome"
* item[=].text = "Treatment outcome"
* item[=].type = #choice
* item[=].repeats = false
* item[=].required = false
* item[=].answerValueSet = "#TBCSTreatmentOutcomeVS"

* item[+].linkId = "tbCsOutcomeReasonForCaseDenotification"
* item[=].text = "Reason for denotification"
* item[=].type = #choice
* item[=].repeats = false
* item[=].required = false
* item[=].answerValueSet = "#TBCSDenotificationReasonsVS"

* item[+].linkId = "tbCsOutcomeDuplicateSRecordNumber"
* item[=].text = "Provide duplicate's record number"
* item[=].type = #string
* item[=].repeats = false
* item[=].required = false

* item[+].linkId = "tbCsTreatmentOutcomeDelayWeeks"
* item[=].text = "Treatment outcome delay (weeks)"
* item[=].type = #decimal
* item[=].repeats = false
* item[=].required = false

* item[+].linkId = "tbCsOutcomeNotTbCaseExplanation"
* item[=].text = "Provide evidence for denotifying the case"
* item[=].type = #string
* item[=].repeats = false
* item[=].required = false

* item[+].linkId = "tbCsOutcomeCaseDenotification"
* item[=].text = "Denotify the case"
* item[=].type = #boolean
* item[=].repeats = false
* item[=].required = false