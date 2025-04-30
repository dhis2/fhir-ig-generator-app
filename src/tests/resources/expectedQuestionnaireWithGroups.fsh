Instance: OutcomeQuestionnaire
InstanceOf: Questionnaire
Title: "Outcome Questionnaire"
Usage: #definition
* status = #draft
* experimental = false

* contained[+] = TBCSTreatmentOutcomeVS
* contained[+] = TBCSDenotificationReasonsVS

* item[+].linkId = "outcomeGroup"
* item[=].text = "Outcome"
* item[=].type = #group
* item[=]
  * item[+].linkId = "tbCsTreatmentOutcome"
  * item[=].text = "Treatment outcome"
  * item[=].type = #choice
  * item[=].repeats = false
  * item[=].required = true
  * item[=].answerValueSet = "#TBCSTreatmentOutcomeVS"

  * item[+].linkId = "tbCsOutcomeCaseDenotification"
  * item[=].text = "Denotify the case"
  * item[=].type = #boolean
  * item[=].repeats = false
  * item[=].required = false

  * item[+].linkId = "tbCsOutcomeReasonForCaseDenotification"
  * item[=].text = "Reason for denotification"
  * item[=].type = #choice
  * item[=].repeats = false
  * item[=].required = true
  * item[=].answerValueSet = "#TBCSDenotificationReasonsVS"

  * item[+].linkId = "tbCsOutcomeNotTbCaseExplanation"
  * item[=].text = "Provide evidence for denotifying the case"
  * item[=].type = #string
  * item[=].repeats = false
  * item[=].required = false

  * item[+].linkId = "tbCsOutcomeDuplicateSRecordNumber"
  * item[=].text = "Provide duplicate's record number"
  * item[=].type = #string
  * item[=].repeats = false
  * item[=].required = false

* item[+].linkId = "outcomeStatusGroup"
* item[=].text = "Outcome status"
* item[=].type = #group
* item[=]
  * item[+].linkId = "tbCsTreatmentOutcomeDelayWeeks"
  * item[=].text = "Treatment outcome delay (weeks)"
  * item[=].type = #decimal
  * item[=].repeats = false
  * item[=].required = false
