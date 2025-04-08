Logical: TBProgram
Title: "TB program"
Parent: Base
* enrollmentDate 1..1 date "Start of treatment date"
* incidentDate 0..1 date "Start of treatment date"
* firstName 1..1 string "This is the person's first name"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#firstName123
* lastName 1..1 string "Last name"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#lastName456
* gender 1..1 code "Gender"
* gender from GenderVS (required)
  * ^code[+] = Dhis2TrackedEntityAttributesCS#gender789
* tbIdentifier 0..1 string "TB identifier"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#tbIdentifier012
* age 0..1 Age "Age"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#age345
* address 0..1 string "Country"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#address678
* city 0..1 string "City"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#city901
* state 0..1 string "State"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#state234
* zipCode 0..1 decimal "Zip code"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#zipCode567
* email 0..1 string "Email address"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#email890
* phoneNumber 0..1 string "Phone number"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#phoneNumber123
* residenceLocation 0..1 string "Residence location"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#residenceLocation456
* motherMaidenName 0..1 string "Mother maiden name"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#motherMaidenName789
* nationalIdentifier 0..1 string "National identifier"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#nationalIdentifier012
* occupation 0..1 string "Occupation"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#occupation345
* company 0..1 string "Company"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#company678
* tbNumber 0..1 string "TB number"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#tbNumber901
* vehicle 0..1 string "Vehicle"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#vehicle234
* bloodType 0..1 string "Blood type"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#bloodType567
* weightInKg 0..1 decimal "Weight in kg"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#weightInKg890
* heightInCm 0..1 decimal "Height in cm"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#heightInCm123
* latitude 0..1 string "Latitude"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#latitude456
* longitude 0..1 string "Longitude"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#longitude789
* uniqueIdentifier 0..1 string "Unique identiifer"
  * ^code[+] = Dhis2TrackedEntityAttributesCS#uniqueIdentifier012
* labMonitoring 0..* LabMonitoring "Laboratory monitoring"
* tbVisit 0..1 TBVisit "Routine TB visit"
* sputumSmearMicroscopyTest 0..* SputumSmearMicroscopyTest "Sputum smear microscopy test"