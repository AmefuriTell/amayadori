## S1 Encrypt log data in CloudWatch Logs using AWS KMS — Encrypt log data in CloudWatch Logs using AWS Key Management Service
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
fetched: 2026-11-26
> Log group data is always encrypted in CloudWatch Logs.
> By default, CloudWatch Logs uses server-side encryption with 256-bit Advanced Encryption Standard Galois/Counter Mode (AES-GCM) to encrypt log data at rest.
> As an alternative, you can use AWS Key Management Service for this encryption.
> If you do, the encryption is done using an AWS KMS key.
> Encryption using AWS KMS is enabled at the log group level, by associating a KMS key with a log group, either when you create the log group or after it exists.

## S2 Encrypt log data in CloudWatch Logs using AWS KMS — Encrypt log data in CloudWatch Logs using AWS Key Management Service
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
fetched: 2026-11-26
> CloudWatch Logs supports only symmetric KMS keys.
> Do not use an asymmetric key to encrypt the data in your log groups.

## S3 Encrypt log data in CloudWatch Logs using AWS KMS — Encrypt log data in CloudWatch Logs using AWS Key Management Service
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
fetched: 2026-11-26
> After you associate a KMS key with a log group, all newly ingested data for the log group is encrypted using this key.
> This data is stored in encrypted format throughout its retention period.
> CloudWatch Logs decrypts this data whenever it is requested.
> CloudWatch Logs must have permissions for the KMS key whenever encrypted data is requested.
> If you later disassociate a KMS key from a log group, CloudWatch Logs encrypts newly ingested data using the CloudWatch Logs default encryption method.
> All previously ingested data that was encrypted with the KMS key remains encrypted with the KMS key.

## S4 Encrypt log data in CloudWatch Logs using AWS KMS — Limits
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encryption-limits
fetched: 2026-11-26
> To perform the following steps, you must have the following permissions: kms:CreateKey, kms:GetKeyPolicy, and kms:PutKeyPolicy.
> After you associate or disassociate a key from a log group, it can take up to five minutes for the operation to take effect.
> If you revoke CloudWatch Logs access to an associated key or delete an associated KMS key, your encrypted data in CloudWatch Logs can no longer be retrieved.
> You can't associate a KMS key with an existing log group using the CloudWatch console.

## S5 Encrypt log data in CloudWatch Logs using AWS KMS — Step 2: Set permissions on the KMS key
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#cmk-permissions-lg
fetched: 2026-11-26
> By default, all AWS KMS keys are private.
> Only the resource owner can use it to encrypt and decrypt data.
> However, the resource owner can grant permissions to access the KMS key to other users and resources.
> With this step, you give the CloudWatch Logs service principal and the caller role permission to use the key.
> This service principal must be in the same AWS Region where the KMS key is stored.
> As a best practice, we recommend that you restrict the use of the KMS key to only those AWS accounts or log groups you specify.

## S6 Encrypt log data in CloudWatch Logs using AWS KMS — Permissions for associating a KMS key with a log group
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#cmk-permissions-association
fetched: 2026-11-26
> The IAM principal that calls CreateLogGroup with a kmsKeyId parameter, or calls AssociateKmsKey, must have kms:DescribeKey permission on the specified KMS key.
> If the caller does not have this permission, the API call will fail with an AccessDeniedException.

## S7 Encrypt log data in CloudWatch Logs using AWS KMS — Permissions for reading and writing encrypted log data
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#cmk-permissions-readwrite
fetched: 2026-11-26
> If the IAM principal also needs to read or write encrypted log data (for example, calling PutLogEvents, GetLogEvents, FilterLogEvents, or StartQuery on a log group encrypted with a customer managed KMS key), the principal needs additional AWS KMS permissions.

## S8 Encrypt log data in CloudWatch Logs using AWS KMS — AWS KMS keys and encryption context
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms-policy
fetched: 2026-11-26
> To enhance the security of your AWS Key Management Service keys and your encrypted log groups, CloudWatch Logs now puts log group ARNs as part of the encryption context used to encrypt your log data.
> Encryption context is a set of key-value pairs that are used as additional authenticated data.
> The encryption context enables you to use IAM policy conditions to limit access to your AWS KMS key by AWS account and log group.
> We recommend that you use different KMS keys for each of your encrypted log groups.

## S9 Encrypting CloudTrail log files, digest files, and event data stores with AWS KMS keys (SSE-KMS) — Encrypting CloudTrail log files, digest files, and event data stores with AWS KMS keys (SSE-KMS)
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html#encrypting-cloudtrail-log-files-with-aws-kms
fetched: 2026-11-26
> By default, the log files and digest files delivered by CloudTrail to your bucket are encrypted by using server-side encryption with a KMS key (SSE-KMS).
> If you don't enable SSE-KMS encryption, your log files and digest files are encrypted using SSE-S3 encryption.
> To use SSE-KMS with CloudTrail, you create and manage a AWS KMS key.
> You attach a policy to the key that determines which users can use the key for encrypting and decrypting CloudTrail log files and digest files.
> By default, event data stores are encrypted by CloudTrail.
> You have the option to use your own KMS key for encryption when you create or update an event data store.

## S10 Encrypting CloudTrail log files, digest files, and event data stores with AWS KMS keys (SSE-KMS) — Encrypting CloudTrail log files, digest files, and event data stores with AWS KMS keys (SSE-KMS)
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html#encrypting-cloudtrail-log-files-with-aws-kms
fetched: 2026-11-26
> If you're using an existing S3 bucket with an S3 bucket Key, CloudTrail must be allowed permission in the key policy to use the AWS KMS actions GenerateDataKey and DescribeKey.
> If cloudtrail.amazonaws.com is not granted those permissions in the key policy, you cannot create or update a trail.
> The KMS key that you choose must be created in the same AWS Region as the Amazon S3 bucket that receives your log files and digest files.

## S11 Encrypting CloudTrail log files, digest files, and event data stores with AWS KMS keys (SSE-KMS) — Enabling log file encryption
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html#encrypting-cloudtrail-log-files-with-aws-kms-enabling
fetched: 2026-11-26
> Be sure to include decrypt permissions in the policy for all users who need to read log files or digest files.
> If you do not perform this step before adding the key to your trail configuration, users without decrypt permissions cannot read encrypted files until you grant them those permissions.
> Add policy sections to the key that enable CloudTrail to encrypt and users to decrypt log files and digest files.
> Update your trail or event data store to use the KMS key whose policy you modified for CloudTrail.

## S12 Configuring default encryption — Configuring default encryption
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html#default-bucket-encryption
fetched: 2026-11-26
> Amazon S3 buckets have bucket encryption enabled by default, and new objects are automatically encrypted by using server-side encryption with Amazon S3 managed keys (SSE-S3).
> If you need more control over your encryption keys, such as managing key rotation and access policy grants, you can elect to use server-side encryption with AWS Key Management Service (AWS KMS) keys (SSE-KMS), or dual-layer server-side encryption with AWS KMS keys (DSSE-KMS).
> When you set default bucket encryption to SSE-KMS, you can also configure an S3 Bucket Key to reduce your AWS KMS request costs.
> Server-side encryption with customer-provided keys (SSE-C) is not supported for default encryption.

## S13 Configuring default encryption — Configuring default encryption (変更の注意: サーバアクセスログの送り先)
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html#default-bucket-encryption
fetched: 2026-11-26
> If this bucket is used as a destination for server access logging, the destination bucket must use Amazon S3 managed keys (SSE-S3).
> If the destination bucket uses SSE-KMS default encryption, Amazon S3 might deliver log objects that are encrypted with a key that you can't access.
> To resolve this, change the destination bucket's default encryption to SSE-S3.
> Objects uploaded before default encryption was enabled will not be encrypted.
