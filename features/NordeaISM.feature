Feature: Nordea-MetricStream Issue Management workflow

Scenario: Nordea-Issue Initiation

Given Login to as valid user.
When open the Issue form
Then Fill the Issue details and action details.
When Submit the Issue form to initial approval.

Scenario: Approval of the Issue

Given Login as Approver.
When Access the Issue form at Approver stage from my task list.
Then Review the Issue details & approve it.

Scenario: Manage Issue stage

Given Login as Issue_owner at manage stage.
When Access the Manage Issue from my task list.
Then Trigger Actions.

Scenario: Implement Action workflow
Given Login as Implement Action owner
When Access the action task from my task.
Then Review the action details, fill the action details & complete the action.
Scenario: Implement Action Approval
Given Login as Action Approver
When Access the action task from my task list
Then Review the action details,Approve it.

Scenario: Monitor stage

Given Login as Issue owner at monitor stage.
When Access the Monitor Issue form
Then submit the Issue form to final approval..

Scenario:  Closure Approval.

Given Login as Final approver.
When Access the Issue form at final approver stage.
Then close the Issue form.




