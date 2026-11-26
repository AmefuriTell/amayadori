# K-0006 資料（task 2.2 の knowledge と skills）

## S1 What Is AWS Control Tower? — What Is AWS Control Tower?
url: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#what-is-control-tower
fetched: 2026-11-27
> AWS Control Tower offers a straightforward way to set up and govern an AWS multi-account environment, following prescriptive best practices.
> AWS Control Tower orchestrates the capabilities of several other AWS services, including AWS Organizations, AWS Service Catalog, and AWS IAM Identity Center, to build a landing zone in less than an hour.
> In short, AWS Control Tower offers the easiest way to set up and govern a secure, compliant, multi-account AWS environment based on best practices established by working with thousands of enterprises.

## S2 What Is AWS Control Tower? — Features
url: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#features
fetched: 2026-11-27
> A landing zone is a well-architected, multi-account environment that's based on security and compliance best practices.
> It is the enterprise-wide container that holds all of your organizational units (OUs), accounts, users, and other resources that you want to be subject to compliance regulation.
> An Account Factory is a configurable account template that helps to standardize the provisioning of new accounts with pre-approved account configurations.

## S3 What Is AWS Control Tower? — How AWS Control Tower interacts with other AWS services
url: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#related-services
fetched: 2026-11-27
> AWS Control Tower is built on top of trusted and reliable AWS services including AWS Service Catalog, AWS IAM Identity Center, and AWS Organizations.
> The AWS Organizations service provides essential capabilities for managing a multi-account environment, including central governance and management of accounts, account creation from AWS Organizations APIs, service control policies (SCPs), and resource control policies (RCPs).

## S4 Automate Account Provisioning in AWS Control Tower by Service Catalog APIs — Automate Account Provisioning in AWS Control Tower by Service Catalog APIs
url: https://docs.aws.amazon.com/controltower/latest/userguide/automated-provisioning-walkthrough.html#automated-provisioning-walkthrough
fetched: 2026-11-27
> AWS Control Tower is integrated with several other AWS services, such as AWS Service Catalog.
> You can use the APIs to create and provision your member accounts in AWS Control Tower, or to enroll existing member accounts.

## S5 Provision accounts through AWS Service Catalog — Provision accounts through AWS Service Catalog
url: https://docs.aws.amazon.com/controltower/latest/userguide/service-catalog.html#service-catalog
fetched: 2026-11-27
> AWS Service Catalog enables IT administrators to create, manage, and distribute portfolios of approved products to end users, who then have access to the products they need in a personalized portal.

## S6 Managing account invitations with AWS Organizations — Managing account invitations with AWS Organizations
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_invites.html#orgs_manage_accounts_invites
fetched: 2026-11-27
> After you create an organization and verify that you own the email address associated with the management account, you can invite existing AWS accounts to join your organization.
> You can send an invitation to other accounts only from the management account of your organization.
> An account can only join one organization. If you receive multiple invitations, you can accept only one.

## S7 Migrate an account to another organization with AWS Organizations — Migrate an account to another organization with AWS Organizations
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_account_migration.html#orgs_account_migration
fetched: 2026-11-27
> You can migrate an AWS account from one organization to another at any time.
> For example, migrating an account can be helpful in the case of a merger and acquisition when you need to consolidate one or more AWS accounts from multiple organizations into one organization.
> Whatever your use case, migrating an account between organizations requires you to send an invite from the management account of the new organization, and to use the invited account to accept the invite to join the new organization.

## S8 Service control policies (SCPs) — How SCPs work with Deny
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_evaluation.html#how_scps_deny
fetched: 2026-11-27
> For a permission to be denied for a specific account, any SCP from the root through each OU in the direct path to the account (including the target account itself) can deny that permission.
> a deny policy attached to any level in the organization is evaluated for all the OUs and member accounts underneath it.

## S9 Service control policies (SCPs) — SCP effects on permissions
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#scp-effects-on-permissions
fetched: 2026-11-27
> However, an SCP never grants permissions.
> Instead, SCPs are access controls that specify the maximum available permissions for the IAM users and IAM roles in your organization.

## S10 Accessing a member account that has OrganizationAccountAccessRole with AWS Organizations — Accessing a member account that has OrganizationAccountAccessRole with AWS Organizations
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access-cross-account-role.html#orgs_manage_accounts_access-cross-account-role
fetched: 2026-11-27
> When you create a member account by using the AWS Organizations console, the AWS CLI, or the CreateAccount API operation, AWS Organizations automatically creates an IAM role in the account.
> By default, this role is named OrganizationAccountAccessRole.
> This role has full administrative permissions in the member account.

## S11 Access to AWS accounts owned by third parties — External IDs for third party access
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html#id_roles_third-party_external-id
fetched: 2026-11-27
> An external ID allows the user that is assuming the role to assert the circumstances in which they are operating.
> AWS does not treat the external ID as a secret.
> You should always specify the external ID in your AssumeRole API calls.

## S12 Permissions boundaries for IAM entities — Delegating responsibility to others using permissions boundaries
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries-delegate
fetched: 2026-11-27
> You can use permissions boundaries to delegate permissions management tasks, such as user creation, to IAM users in your account.
> This permits others to perform tasks on your behalf within a specific boundary of permissions.

## S13 Enable or disable automatic deployments for StackSets in AWS Organizations — How automatic deployments work
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-manage-auto-deployment.html#stacksets-orgs-auto-deployment-example
fetched: 2026-11-27
> When automatic deployments are enabled, they're triggered when accounts are added to a target organization or OU, removed from a target organization or OU, or moved between target OUs.

## S14 Multi-Account Multi-Region Data Aggregation for AWS Config — Use Cases
url: https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html#aggregation-use-cases
fetched: 2026-11-27
> You can aggregate compliance data to assess the overall compliance postures of your organization, or across accounts and Regions.
> Aggregators provide a read-only view into the source accounts and Regions that the aggregator is authorized to view by replicating data from the source accounts into the aggregator account.
> Aggregators do not provide mutating access into a source account or region.

## S15 Managing AWS Config Rules Across All Accounts in Your Organization — Considerations
url: https://docs.aws.amazon.com/config/latest/developerguide/config-rule-multi-account-deployment.html#config-rule-multi-account-deployment-considerations
fetched: 2026-11-27
> If a new account joins an organization, the rule or conformance pack is deployed to that account.
> When an account leaves an organization, the rule or conformance pack is removed.
> If you are using an organization management account and intend to use a delegated administrator for organizational deployment, be aware that AWS Config won't automatically create the service-linked role (SLR).

## S16 About controls in AWS Control Tower — About controls in AWS Control Tower
url: https://docs.aws.amazon.com/controltower/latest/userguide/controls.html#controls
fetched: 2026-11-27
> A control applies to an entire organizational unit (OU), and every AWS account within the OU is affected by the control.
> AWS Control Tower implements preventive, detective, and proactive controls that help you govern your resources and monitor compliance across groups of AWS accounts.

## S17 Understanding central configuration in Security Hub CSPM — When to use central configuration?
url: https://docs.aws.amazon.com/securityhub/latest/userguide/central-configuration-intro.html#central-configuration-audience
fetched: 2026-11-27
> Central configuration is most beneficial for AWS environments that include multiple Security Hub CSPM accounts.
> If you're setting up multi-account management for the first time, we recommend that you use Security Hub CSPM declarative policies instead of central configuration.
> You can't use central configuration and declarative policies in the same organization at the same time.

## S18 What is Amazon Detective? — What is Amazon Detective?
url: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#what-is-detective
fetched: 2026-11-27
> Amazon Detective helps you analyze, investigate, and quickly identify the root cause of security findings or suspicious activities.
> Detective automatically collects log data from your AWS resources.

## S19 Managing GuardDuty accounts with AWS Organizations — Considerations and recommendations for using GuardDuty with AWS Organizations
url: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html#delegated_admin_important
fetched: 2026-11-27
> A delegated GuardDuty administrator account is Regional.
> Unlike AWS Organizations, GuardDuty is a Regional service.

### 行の対応（資料の所在。判断ではない）
- knowledge「AWS account structures, best practices, and related AWS services」: S1, S2, S3
- skills 1「Standardizing and automating account provisioning and configuration」: S3, S4, S5, S13
- skills 2「Creating, consolidating, and centrally managing accounts（AWS Organizations, AWS Control Tower）」: S6, S7, S16
- skills 3「Applying IAM solutions for multi-account and complex organization structures（SCPs, assuming roles）」: S8, S9, S10, S11, S12
- skills 4「Implementing and developing governance and security controls at scale（AWS Config, Control Tower, Security Hub, Detective, GuardDuty, Service Catalog, SCPs）」: S5, S14, S15, S16, S17, S18, S19
