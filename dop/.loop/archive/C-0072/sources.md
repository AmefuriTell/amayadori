## S1 Rotate AWS Secrets Manager secrets — Rotate AWS Secrets Manager secrets
url: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html#rotating-secrets
fetched: 2026-11-26
> Rotation is the process of periodically updating a secret.
> When you rotate a secret, you update the credentials in both the secret and the database or service.
> In Secrets Manager, you can set up automatic rotation for your secrets.
> Managed rotation – For most managed secrets, you use managed rotation, where the service configures and manages rotation for you.
> Managed rotation doesn't use a Lambda function.
> Rotation by Lambda function – For other types of secrets, Secrets Manager rotation uses a Lambda function to update the secret and the database or service.

## S2 Managed rotation for AWS Secrets Manager secrets — Managed rotation for AWS Secrets Manager secrets
url: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_managed.html#rotate-secrets_managed
fetched: 2026-11-26
> Some services offer managed rotation, where the service configures and manages rotation for you.
> With managed rotation, you don't use an AWS Lambda function to update the secret and the credentials in the database.
> Amazon Aurora offers managed rotation for master user credentials.
> Amazon RDS offers managed rotation for master user credentials.
> Rotation for managed secrets typically completes within one minute.
> During rotation, new connections that retrieve the secret may get the previous version of the credentials.
> In applications, we strongly recommend that you follow the best practice of using a database user created with the minimal privileges required for your application, rather than using the master user.
> For application users, for highest availability, you can use the Alternating users rotation strategy.
> For all other types of secrets, see Rotation by Lambda function.
> Secrets Manager stores your schedule as a rate() or cron() expression.
> The rotation window automatically starts at midnight unless you specify a Start time.
> You can rotate a secret as often as every four hours.

## S3 Set up automatic rotation for Amazon RDS, Amazon Aurora, Amazon Redshift, or Amazon DocumentDB secrets — Set up automatic rotation for Amazon RDS, Amazon Aurora, Amazon Redshift, or Amazon DocumentDB secrets
url: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_turn-on-for-db.html#rotate-secrets_turn-on-for-db
fetched: 2026-11-26
> This tutorial describes how to set up Rotation by Lambda function for database secrets.
> The console also sets permissions for the Lambda function execution role.
> The last step is to make sure that the Lambda rotation function can access both Secrets Manager and your database through the network.
> To turn on automatic rotation, you must have permission to create an IAM execution role for the Lambda rotation function and attach a permission policy to it.
> You need both iam:CreateRole and iam:AttachRolePolicy permissions.
> Granting these permissions allows an identity to grant themselves any permissions.
> If you choose the alternating users strategy, you must Create secrets and store database superuser credentials in it.
> You need a secret with superuser credentials because rotation clones the first user, and most users do not have that permission.
> Note that Amazon RDS Proxy does not support the alternating users strategy.
> The rotation functions listed under Recommended VPC configurations have the same VPC and security group as the database, which helps the function access the database.
> If rotation fails, for example because Steps 3 and 4 are not yet completed, Secrets Manager retries the rotation process multiple times.
> In the resource policy for your rotation function, we recommend that you include the context key aws:SourceAccount to help prevent Lambda from being used as a confused deputy.
> We recommend that you include only the context key aws:SourceAccount so that you can use the rotation function for multiple secrets.

## S4 Rotation schedules — Rotation schedules, Rotation windows, Cron expression requirements
url: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_schedule.html#rotate-secrets_schedule
fetched: 2026-11-26
> Secrets Manager rotates your secret on a schedule during a rotation window that you set.
> Secrets Manager rotates your secret at any time during the rotation window.
> You can rotate a secret as often as every four hours within a rotation window as small as one hour.
> Secrets Manager rotation schedules use UTC time zone.
> A Secrets Manager rotation window is similar to a maintenance window.
> Secrets Manager rotation windows always start on the hour.
> For a rotation schedule that uses a rate() expression in days, the rotation window starts at midnight.
> By default, the rotation window closes after one hour for a rotation schedule in hours, and at the end of the day for a rotation schedule in days.
> The rotation window must not extend into the next rotation window.
> The maximum rotation period is 999 days.
> A cron expression for Secrets Manager must have 0 in the minutes field because Secrets Manager rotation windows start on the hour.
> It must have * in the year field, because Secrets Manager does not support rotation schedules that are more than a year apart.

## S5 Set up single user rotation for AWS Secrets Manager — Set up single user rotation for AWS Secrets Manager
url: https://docs.aws.amazon.com/secretsmanager/latest/userguide/tutorials_rotation-single.html#tutorials_rotation-single
fetched: 2026-11-26
> Single user rotation is a rotation strategy where Secrets Manager updates a user's credentials in both the secret and the database.
> Secrets Manager rotation uses an AWS Lambda function to update the secret and the database.
> In a production setting, it is a best practice to use different roles for each of the steps.
> Secrets Manager rotates the secret, which means the password is programmatically generated – no human has seen this new password.
> Having the rotation begin immediately can also help you determine if rotation is set up correctly.
> Secrets Manager uses CloudFormation to create resources such as the Lambda rotation function and an execution role that runs the Lambda function.

## S6 Manage access keys for IAM users — Manage access keys for IAM users
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#id_credentials_access-keys
fetched: 2026-11-26
> As a best practice, use temporary security credentials (such as IAM roles) instead of creating long-term credentials like access keys.
> Before creating access keys, review the alternatives to long-term access keys.
> Access keys are long-term credentials for an IAM user or the AWS account root user.
> You can have a maximum of two access keys per user.
> Do NOT put access keys or credential information in your application files.
> Use AWS CloudTrail to monitor access key usage and detect any unauthorized access attempts.
> Regularly review, update, and delete access keys as needed.
