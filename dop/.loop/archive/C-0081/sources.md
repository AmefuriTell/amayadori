# 資料 C-0081（6.3 Analyzing logs, metrics, and security findings）

## S1 What is Amazon GuardDuty? — What is Amazon GuardDuty?
url: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#what-is-guardduty
fetched: 2026-11-26
> Amazon GuardDuty is a threat detection service that continuously monitors, analyzes, and processes AWS data sources and logs in your AWS environment.
> GuardDuty uses threat intelligence feeds, such as lists of malicious IP addresses and domains, file hashes, and machine learning (ML) models to identify suspicious and potentially malicious activity in your AWS environment.

## S2 What is Amazon GuardDuty? — Features of GuardDuty (Foundational threat detection)
url: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#features-of-guardduty
fetched: 2026-11-26
> When you enable GuardDuty in an AWS account, GuardDuty automatically starts ingesting the foundational data sources associated with that account.
> These data sources include AWS CloudTrail management events, VPC flow logs (from Amazon EC2 instances), and DNS logs.
> You don't need to enable anything else for GuardDuty to start analyzing and processing these data sources to generate associated security findings.

## S3 What is Amazon GuardDuty? — Features of GuardDuty (Generates security findings for detected threats)
url: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#features-of-guardduty
fetched: 2026-11-26
> When GuardDuty detects potential security threats associated with your AWS resources, it starts generating security findings that provide information about the potentially compromised resource.

## S4 Processing GuardDuty findings with Amazon EventBridge — Processing GuardDuty findings with Amazon EventBridge
url: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html#guardduty_findings_eventbridge
fetched: 2026-11-26
> GuardDuty automatically publishes (sends) findings as events to Amazon EventBridge (formerly Amazon CloudWatch Events), a serverless event bus service.
> Every GuardDuty finding is assigned a finding ID, and GuardDuty creates an EventBridge event for every finding with a unique finding ID.
> GuardDuty stores findings for 90 days.
> With EventBridge, you can send findings data to your preferred storage platform and store the data for as long as you like.

## S5 Processing GuardDuty findings with Amazon EventBridge — Understanding EventBridge notification frequency in GuardDuty
url: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html#eventbridge-freq-notifications-gdu
fetched: 2026-11-26
> GuardDuty aggregates all subsequent occurrences of a particular finding type that take place within the 6-hour intervals into one single event.
> Only an administrator account can update the EventBridge notification frequency for subsequent finding occurrences.
> A member account can't update this frequency for their own account.

## S6 Security Hub CSPM — Introduction to AWS Security Hub CSPM
url: https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html#what-is-securityhub
fetched: 2026-11-26
> AWS Security Hub Cloud Security Posture Management (AWS Security Hub CSPM) provides you with a comprehensive view of your security state in AWS and helps you assess your AWS environment against security industry standards and best practices.
> AWS Security Hub CSPM collects security data across AWS accounts, AWS services, and supported third-party products and helps you analyze your security trends and identify the highest priority security issues.
> In addition to generating control findings, Security Hub CSPM also receives findings from other AWS services—such as Amazon GuardDuty, Amazon Inspector, and Amazon Macie— and supported third-party products.

## S7 Security Hub CSPM — Benefits of Security Hub CSPM (Reduced effort to collect and prioritize findings)
url: https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html#securityhub-benefits
fetched: 2026-11-26
> Security Hub CSPM processes finding data using the AWS Security Finding Format (ASFF), a standard finding format.
> This eliminates the need to manage findings from myriad sources in multiple formats.
> Security Hub CSPM also correlates findings across providers to help you prioritize the most important ones.

## S8 Validating CloudTrail log file integrity — Validating CloudTrail log file integrity
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html#cloudtrail-log-file-validation-intro
fetched: 2026-11-26
> To determine whether a log file was modified, deleted, or unchanged after CloudTrail delivered it, you can use CloudTrail log file integrity validation.
> The CloudTrail log file integrity validation process also lets you know if a log file has been deleted or changed, or assert positively that no log files were delivered to your account during a given period of time.

## S9 Validating CloudTrail log file integrity — How it works
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html#cloudtrail-log-file-validation-intro-how-it-works
fetched: 2026-11-26
> When you enable log file integrity validation, CloudTrail creates a hash for every log file that it delivers.
> Every hour, CloudTrail also creates and delivers a file that references the log files for the last hour and contains a hash of each.
> CloudTrail signs each digest file using the private key of a public and private key pair.

## S10 Validating CloudTrail log file integrity — Enabling validation and validating files
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html#cloudtrail-log-file-validation-intro-enabling-and-using
fetched: 2026-11-26
> Enabling log file integrity validation allows CloudTrail to deliver digest log files to your Amazon S3 bucket, but does not validate the integrity of the files.
> To validate the integrity of CloudTrail log files, you can use the AWS CLI or create your own solution.

## S11 Query AWS CloudTrail logs — Query AWS CloudTrail logs
url: https://docs.aws.amazon.com/athena/latest/ug/cloudtrail-logs.html#cloudtrail-logs
fetched: 2026-11-26
> AWS CloudTrail is a service that records AWS API calls and events for Amazon Web Services accounts.
> CloudTrail logs include details about any API calls made to your AWS services, including the console.
> CloudTrail generates encrypted log files and stores them in Amazon S3.
> You can use Athena to query these log files directly from Amazon S3, specifying the LOCATION of log files.
> For example, you can use queries to identify trends and further isolate activity by attributes, such as source IP address or user.
