## S0 Working with AWS CloudTrail Lake — Working with AWS CloudTrail Lake
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html#cloudtrail-lake
fetched: 2026-11-25
> Note
> AWS CloudTrail Lake will no longer be open to new customers starting May 31, 2026.
> Existing customers can continue to use the service as normal.

## S1 What Is AWS CloudTrail? — What Is AWS CloudTrail?
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html#cloudtrail-user-guide
fetched: 2026-11-25
> AWS CloudTrail is an AWS service that helps you enable operational and risk auditing, governance, and compliance of your AWS account.
> You can create trails for a single AWS account or for multiple AWS accounts by using AWS Organizations.
> You can identify who or what took which action, what resources were acted upon, when the event occurred, and other details to help you analyze and respond to activity in your AWS account.

## S2 Creating a trail for an organization — Creating a trail for an organization
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html#creating-trail-organization
fetched: 2026-11-25
> If you have created an organization in AWS Organizations, you can create a trail that logs all events for all AWS accounts in that organization.
> The management account for the organization can assign a delegated administrator to create new organization trails or manage existing organization trails.
> Organization trails log events for the management account and all member accounts in the organization.

## S3 Validating CloudTrail log file integrity — Validating CloudTrail log file integrity
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html#cloudtrail-log-file-validation-intro
fetched: 2026-11-25
> To determine whether a log file was modified, deleted, or unchanged after CloudTrail delivered it, you can use CloudTrail log file integrity validation.
> When you enable log file integrity validation, CloudTrail creates a hash for every log file that it delivers.
> Every hour, CloudTrail also creates and delivers a file that references the log files for the last hour and contains a hash of each.
> This makes it computationally infeasible to modify, delete or forge CloudTrail log files without detection.
> The CloudTrail log file integrity validation process also lets you know if a log file has been deleted or changed, or assert positively that no log files were delivered to your account during a given period of time.

## S4 Multi-Account Multi-Region Data Aggregation for AWS Config — Multi-Account Multi-Region Data Aggregation for AWS Config
url: https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html#aggregate-data
fetched: 2026-11-25
> Use an aggregator to view the resource configuration and compliance data recorded in AWS Config.
> Aggregators provide a read-only view into the source accounts and Regions that the aggregator is authorized to view by replicating data from the source accounts into the aggregator account.
> Aggregators do not provide mutating access into a source account or region.
> Authorization is not required if you are aggregating source accounts that are part of AWS Organizations.

## S5 Locking objects with Object Lock — Retention modes
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock-retention-modes
fetched: 2026-11-25
> In compliance mode, a protected object version can't be overwritten or deleted by any user, including the root user in your AWS account.
> Compliance mode helps ensure that an object version can't be overwritten or deleted for the duration of the retention period.
> In governance mode, users can't overwrite or delete an object version or alter its lock settings unless they have special permissions.
> With governance mode, you protect objects against being deleted by most users, but you can still grant some users permission to alter the retention settings or delete the objects if necessary.

## S6 Locking objects with Object Lock — Legal holds
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock-legal-holds
fetched: 2026-11-25
> Like a retention period, a legal hold prevents an object version from being overwritten or deleted.
> However, a legal hold doesn't have an associated fixed amount of time and remains in effect until removed.
> Legal holds can be freely placed and removed by any user who has the s3:PutObjectLegalHold permission.
