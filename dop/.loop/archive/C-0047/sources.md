## S1 Working with log groups and log streams — Change log data retention in CloudWatch Logs
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#SttingLogRetention
fetched: 2026-11-26
> By default, log data is stored in CloudWatch Logs indefinitely. However, you can configure how long to store log data in a log group. Any data older than the current retention setting is deleted. You can change the log retention for each log group at any time.
> An account-level retention policy overrides the retention setting of the log group.
> CloudWatch Logs doesn’t immediately delete log events when they reach their retention setting.
> It typically takes up to 72 hours after that before log events are deleted, but in rare situations might take longer.
> When log events reach their retention setting they are marked for deletion. After they are marked for deletion, they do not add to your archival storage costs anymore, even if they are not actually deleted until later.

## S2 Working with log groups and log streams — Set log data retention for your account with account-level retention policies
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#account-level-retention-policies
fetched: 2026-11-26
> You can have as many as 20 account-level retention policies in a Region.
> Valid values are 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1096, 1827, 2192, 2557, 2922, 3288, and 3653.
> To retain log events indefinitely, specify NEVER_EXPIRE.
> Account-level retention policies require a minimum retention period of 30 days.
> Specify RETROACTIVE to apply the policy to every log group that matches the prefix, including log groups that existed before you created the policy.
> Specify NEW_ONLY to apply the policy only to log groups that are created after you create the policy.
> Retention policies can apply to overlapping sets of log groups.
> When more than one policy applies to a log group, the policy with the longest retention period is used, and a policy that specifies NEVER_EXPIRE is treated as the longest retention period.
> An account-level retention policy replaces the retention period set on a log group, including when the log group's own retention period is longer.
> For example, suppose a log group is set to retain log events for 10 years.
> If you create a retention policy that sets a 90-day retention period for that log group, CloudWatch Logs deletes the log events in that log group that are older than 90 days.
> A retention policy takes effect 24 hours after you create it.

## S3 Exporting log data to Amazon S3 — Exporting log data to Amazon S3
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/S3Export.html#S3Export
fetched: 2026-11-26
> You can export to an S3 bucket in the same account or a different account.
> We recommend that you don't regularly export to Amazon S3 as a way to continuously archive your logs.
> For that use case, we instead recommend that you use subscriptions.
> You can store the exported files in your S3 bucket and define Amazon S3 lifecycle rules to archive or delete exported files automatically.
> Log data can take up to 12 hours to become available for export.
> Export tasks time out after 24 hours.
> If your export tasks are timing out, reduce the time range when you create the export task.
> You can export to S3 buckets that are encrypted with AES-256 or with SSE-KMS.
> Exporting to buckets encrypted with DSSE-KMS is not supported.

## S4 Log classes — Log classes
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatch_Logs_Log_Classes.html#CloudWatch_Logs_Log_Classes
fetched: 2026-11-26
> CloudWatch Logs Standard log class is a full-featured option for logs that require real-time monitoring or logs that you access frequently.
> The Essentials log class is ideal for ad-hoc querying and after-the-fact forensic analysis on infrequently accessed logs.
> For charges, the Standard and Essentials (formerly Infrequent Access) log classes differ in ingestion costs only.
> Storage charges and CloudWatch Logs Insights charges are the same in each log class.
> After a log group is created, its log class can't be changed.
> Log events in log groups in the Delivery class are kept in CloudWatch Logs for two days.
> This retention period is fixed and cannot be changed.

## S5 Managing the lifecycle of objects — Managing the lifecycle of objects
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html#object-lifecycle-mgmt
fetched: 2026-11-26
> S3 Lifecycle helps you store objects cost effectively throughout their lifecycle by transitioning them to lower-cost storage classes, or, deleting expired objects on your behalf.
> An S3 Lifecycle configuration is a set of rules that define actions that Amazon S3 applies to a group of objects.
> Expiration actions – These actions define when objects expire.
> Amazon S3 deletes expired objects on your behalf.
> When you add a Lifecycle configuration to a bucket, the configuration rules apply to both existing objects and objects that you add later.
> For example, if you add a Lifecycle configuration rule today with an expiration action that causes objects to expire 30 days after creation, Amazon S3 will queue for removal any existing objects that are more than 30 days old.
> You can't use a bucket policy to prevent deletions or transitions by an S3 Lifecycle rule.
> For example, even if your bucket policy denies all actions for all principals, your S3 Lifecycle configuration still functions as normal.
> There are potential costs associated with lifecycle expiration only when you expire objects in a storage class with a minimum storage duration.
> There are no data retrieval charges for lifecycle transitions.
> However, there are per-request ingestion charges when using PUT, COPY, or lifecycle rules to move data into any S3 storage class.

## S6 Transitioning objects using Amazon S3 Lifecycle — Constraints and considerations for transitions
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html#lifecycle-configuration-constraints
fetched: 2026-11-26
> Lifecycle storage class transitions have the following constraints:
> Objects smaller than 128 KB will not transition by default to any storage class.
> Amazon S3 applies a default behavior to S3 Lifecycle configurations that prevents objects smaller than 128 KB from being transitioned to any storage class.
> We don't recommend transitioning objects less than 128 KB because you are charged a transition request for each object.
> This means, for smaller objects, the transition costs can outweigh the storage savings.
