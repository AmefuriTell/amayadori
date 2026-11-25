## S1 Creating backup copies across AWS Regions — Scheduling cross-Region backup
url: https://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html#scheduled-crb
fetched: 2026-11-26
> You can use a scheduled backup plan to copy backups across AWS Regions.
> In the Backup rule configuration section, add a backup rule that defines a backup schedule, backup window, and lifecycle rules.
> For Backup frequency, choose how often you want to take backups.
> For Copy to destination, Choose the destination AWS Region for your backup copy.
> Your backup will be copied to this Region.

## S2 Creating backup copies across AWS Regions — Performing on-demand cross-Region backup
url: https://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html#on-demand-crb
fetched: 2026-11-26
> Transition to cold storage
> Choose when to transition the backup copy to cold storage.
> Backups transitioned to cold storage must be stored there for a minimum of 90 days.
> Retention period
> Choose specifies the number of days after creation that the copy is deleted.
> This value must be greater than 90 days beyond the Transition to cold storage value.

## S3 Select AWS services to backup — Backup plan resource assignment
url: https://docs.aws.amazon.com/aws-backup/latest/devguide/assigning-resources.html#backup-resource-assignment
fetched: 2026-11-26
> Through the AWS Backup console or through AWS CLI, the resource assignment in your backup plan specifies which resources AWS Backup will include.
> You can assign resources in the following ways:
> Explicitly assign resource types to the backup plan
> Include all resources (AWS Backup will then scan for all supported resource types)
> Use tags to include or exclude resources
> If you only use tags for resource assignment, then the service opt-in settings will still apply.
> You can further refine the resource assignment using conditions and tags.

## S4 AWS Backup Vault Lock — Vault lock modes
url: https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html#backup-vault-lock-modes
fetched: 2026-11-26
> When you create a vault lock, you have a choice of two modes: Governance mode or Compliance mode.
> Governance mode is intended to allow a vault to be managed only by users with sufficient IAM privileges.
> Compliance mode is intended for backup vaults in which the vault (and by extension, its contents) is expected to never be deleted or altered until the data retention period is complete.
> Once a vault in compliance mode is locked, it is immutable, meaning the lock cannot be removed (the vault itself can be deleted if it is empty and does not contain any recovery points).
> A vault locked in Governance mode can be managed or deleted by users who have the appropriate IAM permissions.
> A vault lock in Compliance mode cannot be altered or deleted by any user or by AWS.
> A vault lock in compliance mode has a grace time period you set before it locks and the contents and vault lock become immutable.

## S5 Replicating objects within and across Regions — When to use Cross-Region Replication
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#crr-scenario
fetched: 2026-11-26
> S3 Cross-Region Replication (CRR) is used to copy objects across Amazon S3 buckets in different AWS Regions.
> CRR can help you do the following:
> Meet compliance requirements – Although Amazon S3 stores your data across multiple geographically distant Availability Zones by default, compliance requirements might dictate that you store data at even greater distances.

## S6 Replicating existing objects with Batch Replication — Replicating existing objects with Batch Replication
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#s3-batch-replication-batch
fetched: 2026-11-26
> S3 Batch Replication differs from live replication, which continuously and automatically replicates new objects across Amazon S3 buckets.
> Instead, S3 Batch Replication occurs on demand on existing objects.
> You can use S3 Batch Replication to replicate the following types of objects:
> Objects that existed before a replication configuration was in place
> Objects that have previously been replicated
> Objects that have failed replication
> You can replicate these objects on demand by using a Batch Operations job.

## S7 Meeting compliance requirements with S3 Replication Time Control — Meeting compliance requirements with S3 Replication Time Control
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-time-control.html#replication-time-control
fetched: 2026-11-26
> S3 Replication Time Control (S3 RTC) helps you meet compliance or business requirements for data replication and provides visibility into Amazon S3 replication times.
> S3 RTC replicates most objects that you upload to Amazon S3 in seconds, and 99.9 percent of those objects within 15 minutes.
