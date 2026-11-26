## S1 AWS Systems Manager Compliance — AWS Systems Manager Compliance
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-compliance.html#systems-manager-compliance
fetched: 2026-11-26
> You can use Compliance to scan your fleet of managed nodes for patch compliance and configuration inconsistencies. You can collect and aggregate data from multiple AWS accounts and Regions, and then drill down into specific resources that aren’t compliant. By default, Compliance displays current compliance data about patching in Patch Manager and associations in State Manager.

## S2 AWS Systems Manager Compliance — AWS Systems Manager Compliance
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-compliance.html#systems-manager-compliance
fetched: 2026-11-26
> Remediate issues by using Run Command, another tool in AWS Systems Manager, State Manager, or Amazon EventBridge. Port data to Amazon Athena and AWS Quick to generate fleet-wide reports.

## S3 AWS Systems Manager Distributor — AWS Systems Manager Distributor
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/distributor.html#distributor
fetched: 2026-11-26
> Distributor helps you package and publish software to AWS Systems Manager managed nodes. You can package and publish your own software or use Distributor to find and publish AWS-provided agent software packages, such as AmazonCloudWatchAgent, or third-party packages such as Trend Micro. Publishing a package advertises specific versions of the package's document to managed nodes that you identify using node IDs, AWS account IDs, tags, or an AWS Region.

## S4 AWS Systems Manager Distributor — What are the features of Distributor?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/distributor.html#distributor-features
fetched: 2026-11-26
> You can choose to deploy packages one time, on a regular schedule, or whenever the default package version is changed to a different version.

## S5 AWS Systems Manager Run Command — AWS Systems Manager Run Command
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/run-command.html#run-command
fetched: 2026-11-26
> Using Run Command, you can remotely and securely manage the configuration of your managed nodes. A managed node is any Amazon Elastic Compute Cloud (Amazon EC2) instance or non-EC2 machine in your hybrid and multicloud environment that has been configured for Systems Manager. With Run Command, you can automate common administrative tasks and perform one-time configuration changes at scale.

## S6 AWS Systems Manager Run Command — Run commands at scale (rate controls and error controls)
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/send-commands-multiple.html#send-commands-multiple
fetched: 2026-11-26
> To control how commands run across hundreds or thousands of managed nodes, Run Command includes parameters for restricting concurrency. You can limit how many nodes process a request simultaneously and how many errors can occur before the command is canceled.

## S7 AWS Systems Manager Run Command — Using concurrency controls
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/send-commands-multiple.html#send-commands-velocity
fetched: 2026-11-26
> You can control the number of managed nodes that run a command simultaneously by using the max-concurrency parameter (the Concurrency options in the Run a command page).

## S8 AWS Systems Manager Run Command — Using error controls
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/send-commands-multiple.html#send-commands-maxerrors
fetched: 2026-11-26
> You can also control the execution of a command to hundreds or thousands of managed nodes by setting an error limit using the max-errors parameters (the Error threshold field in the Run a command page). The parameter specifies how many errors are allowed before the system stops sending the command to additional managed nodes.
