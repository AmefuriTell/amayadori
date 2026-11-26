## S1 Filter pattern syntax for metric filters, subscription filters, filter log events, and Live Tail — Using filter patterns to match terms in unstructured log events
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html#matching-terms-unstructured-log-events
fetched: 2026-11-26
> Filter patterns only return the log events that contain the terms you define.
> Filter patterns are case sensitive.
> Enclose exact phrases and terms that include non-alphanumeric characters in double quotation marks ("").
> Example: Match multiple terms The following code snippet shows an example of a multiple-term filter pattern that returns all log events where messages contain the words ERROR and ARGUMENTS.
> This filter pattern doesn't return the following log event messages because they don't contain both of the terms specified in the filter pattern.
> Example: Match exact phrases The following code snippet shows an example of a filter pattern that returns log events where messages contain the exact phrase INTERNAL SERVER ERROR.
> Example: Include and exclude terms You can create filter patterns that return log events where messages include some terms and exclude other terms.
> Place a minus symbol ("-") before the terms that you want to exclude.
> This filter pattern doesn't return the following log event messages because they contain the word ARGUMENTS.

## S2 Filter pattern syntax for metric filters, subscription filters, filter log events, and Live Tail — Using filter patterns to match terms in JSON log events (strings and numbers)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html#matching-terms-json-log-events
fetched: 2026-11-26
> Enclose filter patterns in curly braces ("{}").
> Set off property selectors with a dollar sign followed by a period ("$.").
> Property selectors are alphanumeric strings that support hyphen ("-") and underscore ("_") characters.
> If a property selector points to an array or object, the filter pattern won't match the log format.
> Set off equality operators with one of the following symbols: equal ("=") or not equal ("!=").
> Strings that contain types other than alphanumeric characters and the underscore symbol must be placed in double quotation marks.
> The following code snippet contains an example of a filter pattern showing how you can format a filter pattern to match a JSON term with a string.
> { $.eventType = "UpdateTrail" }
> Set off numeric operators with one of the following symbols: greater than (">"), less than ("<"), equal ("="), not equal ("!="), greater than or equal to (">="), or less than or equal to ("<=").
> You can use integers that contain plus ("+") or minus ("-") symbols and follow scientific notation.
> You can only use up to one wildcard selector in a property selector.
> If the JSON property contains a period ("."), then the bracket notation may be used to select that property.
> Example: Filter pattern that matches a JSON property with a period (.) in the key You can create filter patterns to match JSON property names that contain a period (.) by using bracket notation.
> Double quotation marks (") aren't supported inside bracket notation and cause the filter pattern to fail with a syntax error.

## S3 Filter pattern syntax for metric filters, subscription filters, filter log events, and Live Tail — Using filter patterns to match terms in JSON log events (IS, NOT EXISTS, and compound expressions)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html#matching-terms-json-log-events
fetched: 2026-11-26
> The IS variable can match fields that contain the values NULL, TRUE, or FALSE.
> The following filter pattern returns JSON logs where the value of SomeObject is NULL.
> { $.SomeObject IS NULL }
> You can create filter patterns with the NOT EXISTS variable to return JSON logs that don't contain specific fields in the log data.
> The following filter pattern uses NOT EXISTS to return JSON logs that don't contain the field SomeOtherObject.
> { $.SomeOtherObject NOT EXISTS }
> The variables IS NOT and EXISTS currently aren't supported.
> You can use the logical operators AND ("&&") and OR ("||") in filter patterns to create compound expressions that match log events where two or more conditions are true.
> Compound expressions support the use of parentheses ("()") and the following standard order of operations: () > && > ||.
> Quotas You can only use up to one wildcard selector in a property selector, and up to three wildcard selectors in a filter pattern with compound expressions.

## S4 Filter pattern syntax for metric filters, subscription filters, filter log events, and Live Tail — Using filter patterns to match terms in space-delimited log events
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html#matching-term-space-delimited-log-events
fetched: 2026-11-26
> Characters between brackets ("[]") and double quotation marks ("") are considered single fields.
> To create a filter pattern that matches terms in a space-delimited log event, enclose the filter pattern in brackets ("[]"), and specify fields with names that are separated by commas (",").
> The following filter pattern parses seven fields.
> [ip=%127\.0\.0\.[1-9]%, user, username, timestamp, request =*.html*, status_code = 4*, bytes]
> If you don't know the number of fields that you're parsing in a space-delimited log event, you can use ellipsis (...) to reference any unnamed field.
> Elipsis can reference as many fields as needed.
> Use w1 to represent your first term and w2 and so on to represent the order of your subsequent terms.
> Example: Match terms in order The following space-delimited filter pattern returns log events where the first word in the log events is ERROR.
> When you create space-delimited filter patterns that use pattern matching, you must include a blank indicator after you specify the order of your terms.
> Place a not equal symbol ("!=") before the term or terms that you want to exclude.

## S5 Creating metrics from log events using filters — Concepts
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#search-filter-concepts
fetched: 2026-11-26
> Metric filters define the terms and patterns to look for in log data as it is sent to CloudWatch Logs.
> CloudWatch Logs uses these metric filters to turn log data into numerical CloudWatch metrics that you can graph or set an alarm on.
> When you create a metric from a log filter, you can also choose to assign dimensions and a unit to the metric.
> If you specify a unit, be sure to specify the correct one when you create the filter.
> Changing the unit for the filter later will have no effect.
> Each metric filter is made up of the following key elements:
> The value reported to the metric filter during a period when logs are ingested but no matching logs are found.
> If you assign dimensions to a metric created by a metric filter, you can't assign a default value for that metric.
> The numerical value to publish to the metric each time a matching log is found.
> Filters do not retroactively filter data.
> Filters only publish the metric data points for events that happen after the filter was created.
> Metric filters are supported only for log groups in the Standard log class.
> If a log group with a subscription uses log transformation, the filter pattern is applied to the transformed versions of the log events.
> You can use any type of CloudWatch statistic, including percentile statistics, when viewing these metrics or setting alarms.
> Metric filters ensure at least one time delivery of log events to the specified metric, while duplicate deliveries may occasionally occur.

## S6 Search log data using filter patterns — Search log entries using the AWS CLI
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SearchDataFilterPattern.html#search-log-entries-cli
fetched: 2026-11-26
> You can search for log entries that meet a specified criteria using the AWS CLI.
> At a command prompt, run the following filter-log-events command.
> Use --filter-pattern to limit the results to the specified filter pattern and --log-stream-names to limit the results to the specified log streams.
> aws logs filter-log-events --log-group-name my-group [--log-stream-names LIST_OF_STREAMS_TO_SEARCH] [--filter-pattern VALID_METRIC_FILTER_PATTERN]
> When each search runs, it returns up to the first page of data found and a token to retrieve the next page of data or to continue searching.
> If you are using the AWS CLI, you can limit the search to just the log streams you are interested in.
> You can also pivot directly from your logs-extracted metrics to the corresponding logs.
