## S1 Encrypt log data in CloudWatch Logs using AWS Key Management Service — Encrypt log data in CloudWatch Logs using AWS Key Management Service
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
fetched: 2026-11-25
> Log group data is always encrypted in CloudWatch Logs. By default, CloudWatch Logs uses server-side encryption with 256-bit Advanced Encryption Standard Galois/Counter Mode (AES-GCM) to encrypt log data at rest. As an alternative, you can use AWS Key Management Service for this encryption. If you do, the encryption is done using an AWS KMS key.
> Encryption using AWS KMS is enabled at the log group level, by associating a KMS key with a log group, either when you create the log group or after it exists.
> After you associate a KMS key with a log group, all newly ingested data for the log group is encrypted using this key. This data is stored in encrypted format throughout its retention period. CloudWatch Logs decrypts this data whenever it is requested. CloudWatch Logs must have permissions for the KMS key whenever encrypted data is requested.
> CloudWatch Logs supports only symmetric KMS keys. Do not use an asymmetric key to encrypt the data in your log groups.

## S2 Encrypt log data in CloudWatch Logs using AWS Key Management Service — Step 2: Set permissions on the KMS key
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#cmk-permissions-lg
fetched: 2026-11-25
> By default, all AWS KMS keys are private. Only the resource owner can use it to encrypt and decrypt data. However, the resource owner can grant permissions to access the KMS key to other users and resources. With this step, you give the CloudWatch Logs service principal and the caller role permission to use the key. This service principal must be in the same AWS Region where the KMS key is stored.
> As a best practice, we recommend that you restrict the use of the KMS key to only those AWS accounts or log groups you specify.
> The Condition section in this example restricts the key to a single log group ARN.

## S3 Working with log groups and log streams — Change log data retention in CloudWatch Logs
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#SttingLogRetention
fetched: 2026-11-25
> By default, log data is stored in CloudWatch Logs indefinitely. However, you can configure how long to store log data in a log group. Any data older than the current retention setting is deleted. You can change the log retention for each log group at any time.
> An account-level retention policy overrides the retention setting of the log group.
> CloudWatch Logs doesn’t immediately delete log events when they reach their retention setting. It typically takes up to 72 hours after that before log events are deleted, but in rare situations might take longer.
> When log events reach their retention setting they are marked for deletion. After they are marked for deletion, they do not add to your archival storage costs anymore, even if they are not actually deleted until later.

## S4 Understanding data protection policies — What are data protection policies?
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/cloudwatch-logs-data-protection-policies.html#what-are-data-protection-policies
fetched: 2026-11-25
> CloudWatch Logs uses data protection policies to select the sensitive data for which you want to scan, and the actions that you want to take to protect that data. To select the sensitive data of interest, you use data identifiers. CloudWatch Logs data protection then detects the sensitive data by using machine learning and pattern matching. To act upon data identifiers that are found, you can define audit and de-identify operations. These operations let you log the sensitive data that is found (or not found), and to mask the sensitive data when the log events are viewed.
