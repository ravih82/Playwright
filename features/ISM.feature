Feature: MetricStream Issue Management workflow

Scenario: Issue Initiation

Given Login to as Issue initiator
When open the Issue creation form
Then Fill the Issue details and action details
When Submit the Issue form.

Scenario: Initial approval of the Issue

Given Login as Initial approver
When Access the Issue form at initial approver stage from my task list
Then Review the Issue details and approve it.

Scenario: Manage Issue

Given Login as Issue owner at manage stage
When Access the Manage Issue task from my task list
Then submit for approval.


Scenario: Action plan approval

Given Login as Action plan approver
When Access the Issue form at Action plan approver stage from my task list
Then Review the Issue details, Initiate the actions.

Scenario: Action workflow
Given Login as Action owner
When Access the action task from my task list
Then Review the action details, fill the action details and complete the action.

Scenario: Sending Issue to final approval in monitor stage

Given Login as Issue owner at monitor stage
When Access the Issue form
Then submit the Issue form to final approval.

Scenario:  Approval of Issue closure at final approver stage

Given Login as Final approver
When Access the Issue form at final approver stage
Then close the Issue form.




