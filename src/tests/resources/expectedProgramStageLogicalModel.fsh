Logical: LabMonitoring
Title: "Lab monitoring"
Parent: Base
Description: "Laboratory monitoring"
* executionDate 0..1 date "Report date"
* cd4 0..1 boolean "TB lab CD4"
  * ^code[+] = Dhis2DataElementsCS#cd4001
* creatinine 0..1 boolean "TB lab Creatinine"
  * ^code[+] = Dhis2DataElementsCS#creat002
* glucose 0..1 boolean "Tb lab Glucose"
  * ^code[+] = Dhis2DataElementsCS#gluc003
* hemoglobin 0..1 boolean "TB lab Hemoglobin"
  * ^code[+] = Dhis2DataElementsCS#hemo004
