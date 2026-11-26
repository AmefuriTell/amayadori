## S1 Analyzing log data with CloudWatch Logs Insights — Analyzing log data with CloudWatch Logs Insights
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
fetched: 2026-11-26
> With CloudWatch Logs Insights, you can interactively search and analyze your log data in Amazon CloudWatch Logs. You can perform queries to help you more efficiently and effectively respond to operational issues.
> In addition to querying using log groups, you can query using facets, data source, and data type. If an issue occurs, you can use CloudWatch Logs Insights to identify potential causes and validate deployed fixes.
> Automatic discovery of log fields in logs from AWS services such as Amazon Route 53, AWS Lambda, AWS CloudTrail, and Amazon VPC, and any application or custom log that emits log events as JSON.
> Creating field indexes to reduce costs and speed results, especially for queries of large number of log groups or log events.

## S2 Analyzing log data with CloudWatch Logs Insights — Analyzing log data with CloudWatch Logs Insights (quotas, charges, multiple log groups)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
fetched: 2026-11-26
> You are limited to 100 concurrent CloudWatch Logs Insights QL per account, including queries added to dashboards.
> Queries using any of the supported query languages time out after 60 minutes, if they have not completed. Query results are available for 7 days.
> CloudWatch Logs Insights queries incur charges based on the amount of uncompressed log data scanned, regardless of query language.
> If you are signed in to an account set up as a monitoring account in CloudWatch cross-account observability, you can run CloudWatch Logs Insights queries on log groups in source accounts linked to this monitoring account.
> You can run a query that queries multiple log groups located in different accounts.
> CloudWatch Logs Insights can't access log events with timestamps that pre-date the creation time of the log group.

## S3 CloudWatch Logs Insights language query syntax — CloudWatch Logs Insights language query syntax (ベストプラクティス)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html#CWL_QuerySyntax
fetched: 2026-11-26
> Select only the necessary log groups for each query.
> Always specify the narrowest possible time range for your queries.
> When you add a CloudWatch Logs Insights widget to a dashboard, ensure that the dashboard is not refreshing at a high frequency, because each refresh starts a new query.
> To create queries that contain multiple commands, separate the commands with the pipe character (|).
> To create queries that contain comments, set off the comments with the hash character (#).
> CloudWatch Logs Insights automatically discovers fields for different log types and generates fields that start with the @ character.

## S4 CloudWatch Logs Insights language query syntax — CloudWatch Logs Insights language query syntax (command table)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html#CWL_QuerySyntax
fetched: 2026-11-26
> fields Displays specific fields in query results and supports functions and operations you can use to modify field values and create new fields to use in your query.
> filter Filters the query to return only the log events that match one or more conditions.
> parse Extracts data from a log field to create an extracted field that you can process in your query. parse supports both glob mode using wildcards, and regular expressions.
> sort Displays the returned log events in ascending (asc) or descending (desc) order.
> stats Calculate aggregate statistics using values in the log fields.
> limit Specifies a maximum number of log events that you want your query to return. Useful with sort to return "top 20" or "most recent 20" results. Use limit any to stop scanning early once enough results are found.

## S5 Save and re-run CloudWatch Logs Insights queries — Save and re-run CloudWatch Logs Insights queries
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_Insights-Saving-Queries.html#CWL_Insights-Saving-Queries
fetched: 2026-11-26
> After you create a query, you can save it, and run it again later. Queries are saved in a folder structure, so you can organize them. You can save as many as 1000 queries per region and per account.
> Queries are saved on a Region-specific level, not a user-specific level. If you create and save a query, other users with access to CloudWatch Logs in the same Region can see all saved queries and their folder structures in the Region.
> To save a query, you must be logged into a role that has the permission logs:PutQueryDefinition. To see a list of your saved queries, you must be logged into a role that has the permissionlogs:DescribeQueryDefinitions.
> Queries with parameters can be run by using the query name with a $ prefix and passing the parameter names as key-value pairs.

## S6 Use partition projection with Amazon Athena — Use partition projection with Amazon Athena
url: https://docs.aws.amazon.com/athena/latest/ug/partition-projection.html#partition-projection
fetched: 2026-11-26
> You can use partition projection in Athena to speed up query processing of highly partitioned tables and automate partition management.
> Because in-memory operations are often faster than remote operations, partition projection can reduce the runtime of queries against highly partitioned tables.

## S7 Use partition projection with Amazon Athena — Understand partition pruning vs. partition projection
url: https://docs.aws.amazon.com/athena/latest/ug/partition-projection.html#partition-projection-pruning-vs-projection
fetched: 2026-11-26
> Normally, when processing queries, Athena makes a GetPartitions call to the AWS Glue Data Catalog before performing partition pruning.
> Partition projection allows Athena to avoid calling GetPartitions because the partition projection configuration gives Athena all of the necessary information to build the partitions itself.

## S8 Use partition projection with Amazon Athena — Considerations and limitations
url: https://docs.aws.amazon.com/athena/latest/ug/partition-projection.html#partition-projection-considerations-and-limitations
fetched: 2026-11-26
> When you enable partition projection on a table, Athena ignores any partition metadata in the AWS Glue Data Catalog or external Hive metastore for that table.
> Partition projection is usable only when the table is queried through Athena.
> If more than half of your projected partitions are empty, it is recommended that you use traditional partitions.

## S9 Query Amazon VPC flow logs — Query Amazon VPC flow logs
url: https://docs.aws.amazon.com/athena/latest/ug/vpc-flow-logs.html#vpc-flow-logs
fetched: 2026-11-26
> Amazon Virtual Private Cloud flow logs capture information about the IP traffic going to and from network interfaces in a VPC. Use the logs to investigate network traffic patterns and identify threats and risks across your VPC network.
> Before you begin querying the logs in Athena, enable VPC flow logs, and configure them to be saved to your Amazon S3 bucket. After you create the logs, let them run for a few minutes to collect some data. The logs are created in a GZIP compression format that Athena lets you query directly.

## S10 Query Amazon VPC flow logs — Considerations and limitations
url: https://docs.aws.amazon.com/athena/latest/ug/vpc-flow-logs.html#vpc-flow-logs-common-considerations
fetched: 2026-11-26
> Use the names in the flow log records for the column names in Athena.
> Replace the hyphens in the Amazon VPC log field names with underscores in the Athena column names.
> Escape the flow log record names that are reserved keywords in Athena by enclosing them with backticks.
> VPC flow logs are AWS account specific. When you publish your log files to Amazon S3, the path that Amazon VPC creates in Amazon S3 includes the ID of the AWS account that was used to create the flow log.
