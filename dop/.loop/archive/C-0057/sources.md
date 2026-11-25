## S1 Alarm evaluation — Alarm evaluation settings
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-evaluation.html#alarm-evaluation-settings
fetched: 2026-11-26
> When you configure Evaluation Periods and Datapoints to Alarm as different values, you're setting an "M out of N" alarm. Datapoints to Alarm is ("M") and Evaluation Periods is ("N").The evaluation interval is the number of evaluation periods multiplied by the period length. For example, if you configure 4 out of 5 data points with a period of 1 minute, the evaluation interval is 5 minutes. If you configure 3 out of 3 data points with a period of 10 minutes, the evaluation interval is 30 minutes.

## S2 Configuring how CloudWatch alarms treat missing data — Configuring how CloudWatch alarms treat missing data
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarms-and-missing-data.html#alarms-and-missing-data
fetched: 2026-11-26
> For each alarm, you can specify CloudWatch to treat missing data points as any of the following:
> notBreaching – Missing data points are treated as "good" and within the threshold
> breaching – Missing data points are treated as "bad" and breaching the threshold
> ignore – The current alarm state is maintained
> missing – If all data points in the alarm evaluation range are missing, the alarm transitions to INSUFFICIENT_DATA.
> The best choice depends on the type of metric and the purpose of the alarm. For example, if you are creating an application rollback alarm using a metric that continually reports data, you might want to treat missing data points as breaching, because it might indicate that something is wrong. But for a metric that generates data points only when an error occurs, such as ThrottledRequests in Amazon DynamoDB, you would want to treat missing data as notBreaching. The default behavior is missing.
> Important
> Alarms configured on Amazon EC2 metrics can temporarily enter the INSUFFICIENT_DATA state if there are missing metric data points. This is rare, but can happen when the metric reporting is interrupted, even when the Amazon EC2 instance is healthy. For alarms on Amazon EC2 metrics that are configured to take stop, terminate, reboot, or recover actions, we recommend that you configure those alarms to treat missing data as missing, and to have these alarms trigger only when in the ALARM state.

## S3 Composite alarms — Composite alarms (actions, rule functions)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-combining.html#alarm-combining
fetched: 2026-11-26
> Composite alarms can take only the following actions:
> Notify Amazon SNS topics
> Invoke Lambda functions
> Create OpsItems in Systems Manager Ops Center
> Create incidents in Systems Manager Incident Manager
> Note
> All the underlying alarms in your composite alarm must be in the same account and the same Region as your composite alarm. However, if you set up a composite alarm in a CloudWatch cross-account observability monitoring account, the underlying alarms can watch metrics in different source accounts and in the monitoring account itself. For more information, see CloudWatch cross-account observability.
> A single composite alarm can monitor 100 underlying alarms, and 150 composite alarms can monitor a single underlying alarm.
> Rule expressions
> All composite alarms contain rule expressions. Rule expressions tell composite alarms which other alarms to monitor and determine their states from. Rule expressions can refer to metric alarms and composite alarms. When you reference an alarm in a rule expression, you designate a function to the alarm that determines which of the following three states the alarm will be in:
> ALARM ("alarm-name or alarm-ARN") is TRUE if the alarm is in ALARM state.
> OK ("alarm-name or alarm-ARN") is TRUE if the alarm is in OK state.
> INSUFFICIENT_DATA ("alarm-name or alarm-ARN") is TRUE if the named alarm is in INSUFFICIENT_DATA state.
> Note
> TRUE always evaluates to TRUE, and FALSE always evaluates to FALSE.

## S4 Composite alarms — Composite alarms (AND, OR, NOT, AT_LEAST syntax)
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-combining.html#alarm-combining
fetched: 2026-11-26
> The syntax of the expression you use to combine several alarms into one composite alarm uses boolean logic and functions. The following table describes the operators and functions available in rule expressions:
> AND
> Logical AND operator. Returns TRUE when all specified conditions are TRUE.
> OR
> Logical OR operator. Returns TRUE when at least one of the specified conditions is TRUE.
> NOT
> Logical NOT operator. Returns TRUE when the specified condition is FALSE.
> AT_LEAST
> Function that returns TRUE when a minimum number or percentage of specified alarms are in the required state. Format: AT_LEAST(M, STATE_CONDITION, (alarm1, alarm2, ...alarmN)) where M can be an absolute number or percentage (for example, 50%), and STATE_CONDITION can be ALARM, OK, INSUFFICIENT_DATA, NOT ALARM, NOT OK, or NOT INSUFFICIENT_DATA.
> You can use parentheses to group conditions and control the order of evaluation in complex expressions.
