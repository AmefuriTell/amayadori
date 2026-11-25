## S1 What Is AWS Control Tower? - AWS Control Tower — Features
url: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#features
fetched: 2026-11-25
> An Account Factory is a configurable account template that helps to standardize the provisioning of new accounts with pre-approved account configurations.
> A control (sometimes called a guardrail) is a high-level rule that provides ongoing governance for your overall AWS environment.

## S2 What Is AWS Control Tower? - AWS Control Tower — How AWS Control Tower interacts with other AWS services
url: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#related-services
fetched: 2026-11-25
> AWS Control Tower automates account deployment and enrollment by means of an Account Factory (or “vending machine”), which is built as an abstraction on top of provisioned products in AWS Service Catalog.
> The Account Factory can create and enroll AWS accounts, and it automates the process of applying controls and policies to those accounts.

## S3 Managing stacks across accounts and Regions with StackSets - AWS CloudFormation — Create CloudFormation StackSets with service-managed permissions
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html#stacksets-orgs-associate-stackset-with-org
fetched: 2026-11-25
> With service-managed permissions, you can deploy stacks to accounts managed by AWS Organizations in specific Regions.
> With this model, you don't need to create IAM roles in each target account and AWS Region.
> CloudFormation creates the IAM roles on your behalf.

## S4 Enable or disable automatic deployments for StackSets in AWS Organizations - AWS CloudFormation — How automatic deployments work
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-manage-auto-deployment.html#stacksets-orgs-auto-deployment-example
fetched: 2026-11-25
> CloudFormation can automatically deploy additional stacks to new AWS Organizations accounts when they're added to your target organization or organizational units (OUs).
> When automatic deployments are enabled, they're triggered when accounts are added to a target organization or OU, removed from a target organization or OU, or moved between target OUs.

## S5 Enable or disable automatic deployments for StackSets in AWS Organizations - AWS CloudFormation — Considerations
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-manage-auto-deployment.html#stacksets-orgs-auto-deployment-considerations
fetched: 2026-11-25
> The automatic deployments feature is enabled at the StackSet level.
> Automatic deployments do not consider account level targeting filters.
> It is recommended to enable managed execution when using auto-deployments.

## S6 Service control policies (SCPs) - AWS Organizations — Service control policies (SCPs)
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#orgs_manage_policies_scps
fetched: 2026-11-25
> SCPs do not grant permissions to the IAM users and IAM roles in your organization.
> An SCP defines a permission guardrail, or sets limits, on the actions that the IAM users and IAM roles in your organization can perform.
> SCPs don't affect users or roles in the management account.

