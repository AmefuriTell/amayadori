## S0 AWS Security Hub CSPM — Understanding central configuration（legacy の告知）
url: https://docs.aws.amazon.com/securityhub/latest/userguide/central-configuration-intro.html#central-configuration-intro
fetched: 2026-11-26
> Central configuration is a legacy feature.
> Security Hub CSPM declarative policies are replacing it as the way to manage Security Hub CSPM across an organization.
> Security Hub CSPM declarative policies are the recommended way to manage Security Hub CSPM across an organization.
> Declarative policies and central configuration are mutually exclusive.

## S1 Managing AWS Config Rules Across All Accounts in Your Organization — Introduction
url: https://docs.aws.amazon.com/config/latest/developerguide/config-rule-multi-account-deployment.html#config-rule-multi-account-deployment
fetched: 2026-11-26
> Organizational rules can only be created using the API or CLI.
> This operation is not supported in the AWS Config console.
> AWS Config allows you to manage AWS Config rules across all AWS accounts within an organization.
> Centrally create, update, and delete AWS Config rules across all accounts in your organization.
> Deploy a common set of AWS Config rules across all accounts and specify accounts where AWS Config rules should not be created.

## S2 Managing AWS Config Rules Across All Accounts in Your Organization — Considerations
url: https://docs.aws.amazon.com/config/latest/developerguide/config-rule-multi-account-deployment.html#config-rule-multi-account-deployment-considerations
fetched: 2026-11-26
> If a new account joins an organization, the rule or conformance pack is deployed to that account.
> When an account leaves an organization, the rule or conformance pack is removed.
> If you are using an organization management account and intend to use a delegated administrator for organizational deployment, be aware that AWS Config won't automatically create the service-linked role (SLR).
> You must manually create the service-linked role (SLR) separately using IAM.
> If you do not have an SLR for your management account, you will not be able to deploy resources to that account from a delegated administrator account.
> You will still be able to deploy AWS Config rules to member accounts from management and delegated administrator accounts.

## S3 Managing AWS Config Rules Across All Accounts in Your Organization — Deployment
url: https://docs.aws.amazon.com/config/latest/developerguide/config-rule-multi-account-deployment.html#config-rule-multi-account-deployment-deploy
fetched: 2026-11-26
> Ensure AWS Config recording is on before you use the following APIs to manage AWS Config rules across all AWS accounts within an organization:
> PutOrganizationConfigRule, adds or updates organization config rule for your entire organization evaluating whether your AWS resources comply with your desired configurations.
> DeleteOrganizationConfigRule, deletes the specified organization config rule and all of its evaluation results from all member accounts in that organization.

## S4 Multi-Account Multi-Region Data Aggregation for AWS Config — Multi-Account Multi-Region Data Aggregation
url: https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html#aggregate-data
fetched: 2026-11-26
> An aggregator is an AWS Config resource type that collects AWS Config configuration and compliance data from the following:
> An organization in AWS Organizations and all the accounts in that organization which have AWS Config enabled.
> Use an aggregator to view the resource configuration and compliance data recorded in AWS Config.

## S5 Multi-Account Multi-Region Data Aggregation for AWS Config — Terminology
url: https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html#aggregation-terminology
fetched: 2026-11-26
> Authorization is not required if you are aggregating source accounts that are part of AWS Organizations.
> Aggregators provide a read-only view into the source accounts and Regions that the aggregator is authorized to view by replicating data from the source accounts into the aggregator account.
> Aggregators do not provide mutating access into a source account or region.
> For example, this means that you cannot deploy rules through an aggregator or push snapshot files to a source account or region through an aggregator.

## S6 About controls in AWS Control Tower — About controls
url: https://docs.aws.amazon.com/controltower/latest/userguide/controls.html#controls
fetched: 2026-11-26
> A control is a high-level rule that provides ongoing governance for your overall AWS environment.
> AWS Control Tower implements preventive, detective, and proactive controls that help you govern your resources and monitor compliance across groups of AWS accounts.
> A control applies to an entire organizational unit (OU), and every AWS account within the OU is affected by the control.
> During this time, you may see the previous term, guardrail, as well as the new term, control, in our documentation, console, blogs, and videos.
> These terms are synonymous for our purposes.

## S7 About controls in AWS Control Tower — Exception to controls for the management account
url: https://docs.aws.amazon.com/controltower/latest/userguide/controls.html#exception-to-controls
fetched: 2026-11-26
> The root user and any administrators in the management account can perform work that controls would otherwise deny.
> This exception is intentional.

## S8 Managing GuardDuty accounts with AWS Organizations — Delegated administrator
url: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html#guardduty_organizations
fetched: 2026-11-26
> In an AWS organization, the management account can designate any account within this organization as the delegated GuardDuty administrator account.
> For this administrator account, GuardDuty gets enabled automatically only in the current AWS Region.
> By default, the administrator account can enable and manage GuardDuty for all the member accounts in the organization within that Region.

## S9 Managing GuardDuty accounts with AWS Organizations — Considerations and recommendations
url: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html#delegated_admin_important
fetched: 2026-11-26
> A delegated GuardDuty administrator account can manage a maximum of 50,000 members.
> Unlike AWS Organizations, GuardDuty is a Regional service.
> The delegated GuardDuty administrator accounts and their member accounts must be added through AWS Organizations in each desired Region where you have GuardDuty enabled.
> You must designate one member account as the delegated GuardDuty administrator account across all the AWS Regions where GuardDuty is enabled.
> It is required that you use the same account as delegated GuardDuty administrator account in all other Regions.

## S10 What is Amazon Detective? — What is Amazon Detective?
url: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#what-is-detective
fetched: 2026-11-26
> Amazon Detective helps you analyze, investigate, and quickly identify the root cause of security findings or suspicious activities.
> Detective automatically collects log data from your AWS resources.
