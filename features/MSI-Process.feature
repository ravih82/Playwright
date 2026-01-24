Feature: Metricstream Application

Scenario: Process creation

Given Login to MSI application with "ORM_Program_Manager" and "welcome*12"
When open the Process form
Then Fill Process with title "Process-cucumberFramework" and other details
When Submit the form
