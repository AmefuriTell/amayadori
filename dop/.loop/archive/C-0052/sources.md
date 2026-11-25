## S1 Metrics concepts — Resolution
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Resolution_definition
fetched: 2026-11-26
> When you publish a high-resolution metric, CloudWatch stores it with a resolution of 1 second, and you can read and retrieve it with a period of 1 second, 5 seconds, 10 seconds, 30 seconds, or any multiple of 60 seconds. If you set an alarm on a high-resolution metric, you can specify a high-resolution alarm with a period of 10 seconds or 30 seconds, or you can set a regular alarm with a period of any multiple of 60 seconds. There is a higher charge for high-resolution alarms with a period of 10 or 30 seconds.

## S2 Metrics concepts — Dimension combinations
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#dimension-combinations
fetched: 2026-11-26
> CloudWatch treats each unique combination of dimensions as a separate metric, even if the metrics have the same metric name. You can only retrieve statistics using combinations of dimensions that you specifically published. When you retrieve statistics, specify the same values for the namespace, metric name, and dimension parameters that were used when the metrics were created.

## S3 Metrics concepts — Percentiles
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Percentiles
fetched: 2026-11-26
> Some CloudWatch metrics support percentiles as a statistic. For these metrics, you can monitor your system and applications using percentiles as you would when using the other CloudWatch statistics (Average, Minimum, Maximum, and Sum). For example, when you create an alarm, you can use percentiles as the statistical function. Percentile statistics are available for custom metrics as long as you publish the raw, unsummarized data points for your custom metric. Percentile statistics are not available for metrics when any of the metric values are negative numbers.

## S4 Create a CloudWatch alarm based on a metric math expression — Create-alarm-on-metric-math-expression
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Create-alarm-on-metric-math-expression.html#Create-alarm-on-metric-math-expression
fetched: 2026-11-26
> Metric alarms are designed to evaluate time series that you define from either a single metric, or a metric math expression that combines or transforms one or more metrics into a time series that deliver insights more closely aligned to your unique needs. To create an alarm based on a metric math expression, choose one or more CloudWatch metrics to use in the expression. Then, specify the expression, threshold, and evaluation periods. You can't create an alarm based on the SEARCH expression. The expression that you choose for the alarm must produce a single time series and show only one line on the graph.

## S5 Stop, terminate, reboot, or recover an EC2 instance — UsingAlarmActions
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html#UsingAlarmActions
fetched: 2026-11-26
> You can add the stop, terminate, or reboot, actions to any alarm that is set on an Amazon EC2 per-instance metric, including basic and detailed monitoring metrics provided by Amazon CloudWatch (in the AWS/EC2 namespace), in addition to any custom metrics that include the "InstanceId=" dimension, as long as the InstanceId value refers to a valid running Amazon EC2 instance. You can also add the recover action to alarms that is set on any Amazon EC2 per-instance metric except for StatusCheckFailed_Instance. The main difference between using the stop and the terminate alarm actions is that you can easily restart a stopped instance if you need to run it again later.

## S6 Stop, terminate, reboot, or recover an EC2 instance — Adding recover actions to Amazon CloudWatch alarms
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html#AddingRecoverActions
fetched: 2026-11-26
> The recover action can be used only with StatusCheckFailed_System, not with StatusCheckFailed_Instance. The recover action is supported only on some instance types.
