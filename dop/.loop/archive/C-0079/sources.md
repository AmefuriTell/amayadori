## S1 Working with CloudTrail Insights — Working with CloudTrail Insights
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-insights-events-with-cloudtrail.html#logging-insights-events-with-cloudtrail
fetched: 2026-11-26
> AWS CloudTrail Insights help AWS users identify and respond to unusual activity associated with API call rates and API error rates by continuously analyzing CloudTrail management and data events.
> CloudTrail Insights analyzes your past management and data events to establish your normal patterns of API call rates and API error rates, also called the baseline.
> CloudTrail then generates Insights events when the current API call rates or error rates deviate from the baseline.
> To log Insights events on the API call rate for management events, the trail or event data store must enable Insights and log write management events.
> Insights events on data events are only supported on trails and not on event data stores.
> A CloudTrail Insights event is generated in the same Region as its supporting management or data event is generated.

## S2 Delivery of Insights events — Delivery of Insights events
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/insights-events-understanding.html#insights-events-understanding
fetched: 2026-11-26
> Unlike other types of events that CloudTrail captures, Insights events are logged only when CloudTrail detects changes in your account's API usage that differ significantly from the account's typical usage patterns.
> If you've enabled Insights events on a trail and CloudTrail detects unusual activity, CloudTrail delivers Insights events to the /CloudTrail-Insight folder in the chosen destination S3 bucket for your trail.
> After you enable CloudTrail Insights for the first time on a trail, CloudTrail may take up to 36 hours to begin delivering Insights events, provided that unusual activity is detected during that time.

## S3 Using CloudWatch anomaly detection — Using CloudWatch anomaly detection
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html#CloudWatch_Anomaly_Detection
fetched: 2026-11-26
> When you enable anomaly detection for a metric, CloudWatch applies statistical and machine learning algorithms.
> The algorithms generate an anomaly detection model.
> The model generates a range of expected values that represent normal metric behavior.
> Create anomaly detection alarms based on a metric's expected value.
> These types of alarms don't have a static threshold for determining alarm state.
> Instead, they compare the metric's value to the expected value based on the anomaly detection model.
> You can choose whether the alarm is triggered when the metric value is above the band of expected values, below the band, or both.

## S4 Create a CloudWatch alarm based on anomaly detection — Create a CloudWatch alarm based on anomaly detection
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Create_Anomaly_Detection_Alarm.html#Create_Anomaly_Detection_Alarm
fetched: 2026-11-26
> You can create an alarm based on CloudWatch anomaly detection, which analyzes past metric data and creates a model of expected values.
> You set a value for the anomaly detection threshold, and CloudWatch uses this threshold with the model to determine the "normal" range of values for the metric.
> You can choose whether the alarm is triggered when the metric value is above the band of expected values, below the band, or either above or below the band.
> You also can create anomaly detection alarms on single metrics and the outputs of metric math expressions.

## S5 Processing GuardDuty findings with Amazon EventBridge — Processing GuardDuty findings with Amazon EventBridge
url: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html#guardduty_findings_eventbridge
fetched: 2026-11-26
> GuardDuty automatically publishes (sends) findings as events to Amazon EventBridge (formerly Amazon CloudWatch Events), a serverless event bus service.
> EventBridge receives events for both newly generated findings and aggregated findings, where subsequent occurrences of an existing finding are combined with the original.
> Every GuardDuty finding is assigned a finding ID, and GuardDuty creates an EventBridge event for every finding with a unique finding ID.
> In order to receive notifications about GuardDuty findings based on events, you must create an EventBridge rule and a target for GuardDuty.
> This rule enables EventBridge to send notifications for findings that GuardDuty generates to the target that is specified in the rule.

## S6 Understanding EventBridge notification frequency in GuardDuty — Understanding EventBridge notification frequency in GuardDuty
url: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html#eventbridge-freq-notifications-gdu
fetched: 2026-11-26
> GuardDuty sends these notifications in near real-time when it generates a finding with a unique finding ID.
> The notification frequency for newly generated findings is in near real-time.
> By default, you can not modify this frequency.
> GuardDuty aggregates all subsequent occurrences of a particular finding type that take place within the 6-hour intervals into one single event.
> Only an administrator account can update the EventBridge notification frequency for subsequent finding occurrences.
> As an administrator account, you can customize the default frequency of notifications about the subsequent finding occurrences.
> Possible values are 15 minutes, 1 hour, or the default 6 hours.

## S7 Set up an Amazon SNS topic and endpoint — Set up an Amazon SNS topic and endpoint (Email, Slack, and Amazon Chime)
url: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html#guardduty-eventbridge-set-up-sns-and-endpoint
fetched: 2026-11-26
> Amazon Simple Notification Service (Amazon SNS) is a fully managed service that provides message delivery from publishers to subscribers.
> You can add an Amazon SNS topic to your preferred EventBridge event rule during or after the creation of the rule.
