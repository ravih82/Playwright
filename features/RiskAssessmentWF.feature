Feature: MetricStream Risk Assessment workflow

Scenario: Creation of Risk Assessment plan

Given Login to application with "ORM_Program_Manager" and "welcome*12"
When open the Risk Assessment Plan form
Then Fill Risk Assessment Plan with title "Risk Assessment Plan-9709",and Assessment title as "Risk Assessment-9709" and other details
When Submit the Risk Assessment plan form.

Scenario: Trigger the Risk Assessment through Task form

Given Login as ORM Program Manager with "ORM_Program_Manager" and "welcome*12"
When open the Risk Assessment Task form
Then Fill Risk Assessment Task form by selecting "Risk Assessment Plan-9709",and other details
When Submit the Risk Assessment Task form.

Scenario: Performing the Risk Assessment

Given Login as Assessor with "ERM_Program_Manager" and "welcome*12"
When Access the Risk Assessment "Risk Assessment-9709" from my task list
Then Perform the Risk Assessment by filling the form and providing necessary details
When Submit the Risk Assessment form for approval.

Scenario: Approving the Risk Assessment

Given Login as approver with "ORM_Risk_Manager" and "welcome*12"
When Access the Risk Assessment approval task "Risk Assessment-9709" from my task list
Then Review the Risk Assessment details and approve it.


