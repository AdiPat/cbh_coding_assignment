# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### 1] Update database schemas to include custom ID field
**IMPLEMENTATION DETAILS**\
To be able to support a custom ID field for the Agents, the database should include a new field for it. We assume that SQL-based relational databases are used and for this project, Postgres is the choice of database. This would require running ALTER TABLE statements to modify the schema of the table. To verify if the schema has been successfully changed, we query the information schema and confirm that the ID field has been added. This action should typically be performed by a database admin or someone with trusted access to the database. As a precautionary measure, it's better to run the queries (via a script) on a staging environment and once the operation has been performed successfully, the same script can be run on the production database. 

**ACCEPTANCE CRITERIA** 
- Query to information schema should include the custom ID field.
- Existing queries should not be affected. Tests that validate the correctness of code that run database queries should pass.

**TIME / EFFORT ESTIMATE**
- Write SQL script to run ALTER TABLE queries on Agents table. (2 hours, EASY)
- Run and debug script on development environment. (30 minutes, HARD)
- Run script on staging environment. (30 minutes, EASY)
- Execute tests on development and staging environment and debug them if any fails. (8 hours, HARD)
- Execute SQL script on production environment. (30 minutes, EASY)
- Deploy to production environment. (30 minutes, EASY)
- Manual and automated testing on production environment. (2 hours, EASY)
- Monitor logs to verify if everything is working correctly. (1 hour, EASY)

### 2] Add unit tests to verify if the custom ID field is being stored and retrieved correctly 
**IMPLEMENTATION DETAILS**\
After successfully updating the database schemas, it's necessary to ensure that the custom ID field is compatible with the rest of the code. The previous ticket asserted the validity of existing tests, this ticket will assert the validity of new code that will be written to make use of this custom ID field. For this, it's necessary to design tests that will cover various types of operations that this new field brings with itself. The previous ticket handled the issue of backward compatability, this ticket safeguards forward compatability. We will use integration testing for this ticket as it involves database queries.

**ACCEPTANCE CRITERIA**
- All old tests pass. 
- All newly designed test cases pass.
- Developers can write new queries without worrying about the updated schema.

**TIME / EFFORT ESTIMATION**
- Design new test cases that perform select, find, update, delete operations on the Agents table. (6 hours, HARD)
- Write individual integration tests for each case as designed in the previous step. (12 hours, MEDIUM)
- Run the tests, debug and iterate till all cases are covered. (4 hours, EASY)

## 3] Rewrite `getShiftsByFacility()` to include new ID

**IMPLEMENTATION DETAILS**

As this method primarily involves both Shifts and Agents, it communicates with the database tables to retrieve information. As the function requirement is purely data retrieval, we don't need to worry about changes made to the database. It will involve SELECT statements for retrieving the data, and have corresponding code that transforms and processes the data further for reporting purposes. This function will have to be rewritten to include the custom ID field within all it's operations.

**ACCEPTANCE CRITERIA**
- Existing unit tests should pass. 
- New unit tests that test the existence of custom ID field should also pass.
- Existing functionality should not be rewritten - don't fix it if it works.

**TIME/EFFORT ESTIMATES**
- Add custom ID field to the Agent class and modify any mappers that operate on it. (1 hour)
- Update database queries to include the custom ID field. (30 mins, MEDIUM)
- Update code that processes the data to make use of the custom ID field when returning objects. (30 mins, MEDIUM)
- Write new unit tests to verify the existence of the custom ID field. (30 mins, EASY)
- Write new unit tests to verify the type of the field. (30 mins, HARD)

## 4] Rewrite `generateReport()` to include new ID

**IMPLEMENTATION DETAILS**

As this method involves generating a report, it's necessary for all functions called by it to also support the custom ID field. Correspondingly, all classes that involve the reporting feature should now include the custom ID field. 

**ACCEPTANCE CRITERIA**
- Report format should be unchanged.
- Report generation should not be affected.
- Report should include the custom ID for Agents.

**TIME/EFFORT ESTIMATES**
- Update report data handling code to support the custom ID field. (30 mins, EASY)
- Replace the database ID with the custom ID field in all the code that makes use of it. (1 hour, MEDIUM)
- Update tests to now check for a custom ID field instead of a database ID. (2 hours, MEDIUM)

