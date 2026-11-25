## S1 Creating metrics from log events using filters - Amazon CloudWatch Logs — Creating metrics from log events using filters
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#MonitoringLogData
fetched: 2026-11-26
> You can search and filter the log data coming into CloudWatch Logs by creating one or more metric filters.
> Metric filters define the terms and patterns to look for in log data as it is sent to CloudWatch Logs.
> CloudWatch Logs uses these metric filters to turn log data into numerical CloudWatch metrics that you can graph or set an alarm on.
> Metric filters are supported only for log groups in the Standard log class.
> Filters do not retroactively filter data.
> Filters only publish the metric data points for events that happen after the filter was created.

## S2 Creating metrics from log events using filters - Amazon CloudWatch Logs — Concepts
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#search-filter-concepts
fetched: 2026-11-26
> The value reported to the metric filter during a period when logs are ingested but no matching logs are found.
> If you assign dimensions to a metric created by a metric filter, you can't assign a default value for that metric.
> Because dimensions are part of the unique identifier for a metric, whenever a unique name/value pair is extracted from your logs, you are creating a new variation of that metric.
> The numerical value to publish to the metric each time a matching log is found.

## S3 Filter pattern syntax for metric filters - Amazon CloudWatch Logs — Configuring metric values for a metric filter
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntaxForMetricFilters.html#changing-default-increment-value
fetched: 2026-11-26
> When a metric filter matches a term, it increments the metric's count by a specified numerical value.
> You can set metric values to numbers, named identifiers, or numeric identifiers.
> If you don't specify a default value, CloudWatch won't report data when your metric filter doesn't find a match.
> We recommend that you specify a default value, even if the value is 0.
> If your metric filter doesn't find a match, CloudWatch reports the metric's default value.
> If you assign dimensions to metrics that metric filters generate, you can't specify default values for those metrics.

## S4 Embedding metrics within logs - Amazon CloudWatch — Embedding metrics within logs
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format.html#CloudWatch_Embedded_Metric_Format
fetched: 2026-11-26
> The CloudWatch embedded metric format allows you to generate custom metrics asynchronously in the form of logs written to CloudWatch Logs.
> No setup is required to use the embedded metric format.
> To generate metrics from logs with embedded metric format, you need the logs:PutLogEvents permission but you don't need to also have the cloudwatch:PutMetricData permission.
