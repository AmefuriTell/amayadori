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

## S20 What Is AWS Control Tower? - AWS Control Tower — Features
url: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#features
fetched: 2026-11-25
> An Account Factory is a configurable account template that helps to standardize the provisioning of new accounts with pre-approved account configurations.
> A control (sometimes called a guardrail) is a high-level rule that provides ongoing governance for your overall AWS environment.

## S21 What Is AWS Control Tower? - AWS Control Tower — How AWS Control Tower interacts with other AWS services
url: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#related-services
fetched: 2026-11-25
> AWS Control Tower automates account deployment and enrollment by means of an Account Factory (or “vending machine”), which is built as an abstraction on top of provisioned products in AWS Service Catalog.
> The Account Factory can create and enroll AWS accounts, and it automates the process of applying controls and policies to those accounts.

## S22 Managing stacks across accounts and Regions with StackSets - AWS CloudFormation — Create CloudFormation StackSets with service-managed permissions
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html#stacksets-orgs-associate-stackset-with-org
fetched: 2026-11-25
> With service-managed permissions, you can deploy stacks to accounts managed by AWS Organizations in specific Regions.
> With this model, you don't need to create IAM roles in each target account and AWS Region.
> CloudFormation creates the IAM roles on your behalf.

## S23 Enable or disable automatic deployments for StackSets in AWS Organizations - AWS CloudFormation — How automatic deployments work
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-manage-auto-deployment.html#stacksets-orgs-auto-deployment-example
fetched: 2026-11-25
> CloudFormation can automatically deploy additional stacks to new AWS Organizations accounts when they're added to your target organization or organizational units (OUs).
> When automatic deployments are enabled, they're triggered when accounts are added to a target organization or OU, removed from a target organization or OU, or moved between target OUs.

## S24 Enable or disable automatic deployments for StackSets in AWS Organizations - AWS CloudFormation — Considerations
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-manage-auto-deployment.html#stacksets-orgs-auto-deployment-considerations
fetched: 2026-11-25
> The automatic deployments feature is enabled at the StackSet level.
> Automatic deployments do not consider account level targeting filters.
> It is recommended to enable managed execution when using auto-deployments.

## S25 Service control policies (SCPs) - AWS Organizations — Service control policies (SCPs)
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#orgs_manage_policies_scps
fetched: 2026-11-25
> SCPs do not grant permissions to the IAM users and IAM roles in your organization.
> An SCP defines a permission guardrail, or sets limits, on the actions that the IAM users and IAM roles in your organization can perform.
> SCPs don't affect users or roles in the management account.

## S26 About enrolling existing accounts - AWS Control Tower — About enrolling existing accounts; Enroll accounts with AWS Config resources
url: https://docs.aws.amazon.com/controltower/latest/userguide/enroll-account.html#enroll-account
fetched: 2026-11-26
> You can extend AWS Control Tower governance to an individual, existing AWS account when you enroll it into an organizational unit (OU) that's already governed by AWS Control Tower. Eligible accounts exist in unregistered OUs that are part of the same AWS Organizations organization as the AWS Control Tower OU.
> You cannot enroll an existing AWS account to serve as your audit or log archive account except during initial landing zone setup.
> The account to be enrolled must not have existing AWS Config resources.

## S27 Managing account invitations with AWS Organizations - AWS Organizations — Managing account invitations; Considerations
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_invites.html#orgs_manage_accounts_invites
fetched: 2026-11-26
> After you create an organization and verify that you own the email address associated with the management account, you can invite existing AWS accounts to join your organization.
> You can send an invitation to other accounts only from the management account of your organization.
> All accounts in an organization must come from the same AWS partition as the management account.
> Each invitation must be responded to within 15 days, or it expires.
> An account can only join one organization.
> After an account accepts the invitation to join an organization, the management account of the organization becomes responsible for all charges accrued by the new member account.
> For invited member accounts, AWS Organizations doesn't automatically create the IAM role OrganizationAccountAccessRole.

## S28 Migrate an account to another organization with AWS Organizations - AWS Organizations — Migrate an account; Step 1
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_account_migration.html#orgs_account_migration
fetched: 2026-11-26
> Whatever your use case, migrating an account between organizations requires you to send an invite from the management account of the new organization, and to use the invited account to accept the invite to join the new organization.
> Closed or suspended accounts cannot be migrated.
> To migrate an account that you created in an organization, you must wait until at least four days after the account was created.
> Invited accounts are not subject to this waiting period.
> To migrate an account to a new organization, you must wait until at least seven days after the organization was created.
> If the accounts have different Sellers of Record, the move fails.
> The migrating account doesn't need to leave its current organization or operate as a standalone account first.

## S29 Managing organization policies with AWS Organizations - AWS Organizations — Policy types
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html#orgs-policy-types
fetched: 2026-11-26
> Policies in AWS Organizations enable you to apply additional types of management to the AWS accounts in your organization. You can use policies when all features are enabled in your organization.
> Authorization policies help you to centrally manage the security of AWS accounts across an organization.
> Declarative policies help you centrally configure and manage AWS services and their features across an organization.

## S30 Tag policies - AWS Organizations — What are tag policies?
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies.html#what-are-tag-policies
fetched: 2026-11-26
> You can use tag policies to maintain consistent tags, including the preferred case treatment of tag keys and tag values.
> A tag policy can also specify that noncompliant tagging operations on specified resource types are enforced.
> In other words, noncompliant tagging requests on specified resource types are prevented from completing.
> Untagged resources or tags that aren't defined in the tag policy aren't evaluated for compliance with the tag policy.
> Tag policies are available only in an organization that has all features enabled.

## S31 Backup policies - AWS Organizations — Backup policies; How backup policies work
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_backup.html#orgs_manage_policies_backup_how_work
fetched: 2026-11-26
> You can attach a backup policy to any of the elements in your organization's structure, such as the root, organizational units (OUs), and individual accounts.
> AWS Backup can only perform a successful backup when it is invoked by a complete effective policy that has all of the required elements.
> Otherwise, AWS Backup considers the policy not valid and does not back up the affected resources.

## S32 Billing and pricing for AWS Organizations - AWS Organizations — Billing and pricing; Who pays for usage
url: https://docs.aws.amazon.com/organizations/latest/userguide/pricing.html#pricing
fetched: 2026-11-26
> AWS Organizations is offered at no additional charge.
> The owner of the management account is responsible for paying for all usage, data, and resources used by the accounts in the organization.
> Your bill will not reflect the structure that you have defined in your organization.

## S33 Service control policies (SCPs) - AWS Organizations — SCP の役割と権限の上限
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#orgs_manage_policies_scps
fetched: 2026-11-26
> SCPs offer central control over the maximum available permissions for the IAM users and IAM roles in your organization.
>
> SCPs do not grant permissions to the IAM users and IAM roles in your organization. No permissions are granted by an SCP. An SCP defines a permission guardrail, or sets limits, on the actions that the IAM users and IAM roles in your organization can perform.
>
> SCPs are available only in an organization that has all features enabled.
>
> SCPs don't affect users or roles in the management account. They affect only the member accounts in your organization.

## S34 Service control policies (SCPs) - AWS Organizations — SCP が権限に与える影響
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#scp-effects-on-permissions
fetched: 2026-11-26
> An SCP restricts permissions for IAM users and roles in member accounts, including the member account's root user. Any account has only those permissions permitted by every parent above it.
>
> Users and roles must still be granted permissions with appropriate IAM permission policies. A user without any IAM permission policies has no access, even if the applicable SCPs allow all services and all actions.
>
> If a user or role has an IAM permission policy that grants access to an action that is either not allowed or explicitly denied by the applicable SCPs, the user or role can't perform that action.
>
> SCPs don't affect resource-based policies directly.
>
> SCPs do not affect any service-linked role.
>
> If both a permissions boundary (an advanced IAM feature) and an SCP are present, then the boundary, the SCP, and the identity-based policy must all allow the action.

## S35 SCP evaluation - AWS Organizations — Allow と Deny の評価
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_evaluation.html#orgs_manage_policies_scps_evaluation
fetched: 2026-11-26
> For a permission to be allowed for a specific account, there must be an explicit Allow statement at every level from the root through each OU in the direct path to the account (including the target account itself).
>
> SCP evaluation follows a deny-by-default model, meaning that any permissions not explicitly allowed in the SCPs are denied.
>
> For a permission to be denied for a specific account, any SCP from the root through each OU in the direct path to the account (including the target account itself) can deny that permission.
>
> Deny statements are a powerful way to implement restrictions that should be true for a broader part of your organization or OUs because when they are applied at the root or the OU-level they affect all the accounts under it.
>
> AWS Organizations attaches an AWS managed SCP named FullAWSAccess to every root, OU and account when it's created.

## S36 Resource control policies (RCPs) - AWS Organizations — SCP と RCP の使い分け
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html#orgs_manage_policies_rcps
fetched: 2026-11-26
> Use an SCP when you need to limit permissions of IAM principals within your organization's member accounts.
>
> Use an RCP when you need to restrict IAM principals that are external to your organization accounts making requests to access resources within your organization’s member accounts.
>
> RCPs alone are not sufficient in granting permissions to the resources in your organization. No permissions are granted by an RCP.
>
> RCPs don't affect resources in the management account. They only affect resources in the member accounts within your organization.

## S37 Permissions boundaries for IAM entities - AWS Identity and Access Management — 権限の上限
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries
fetched: 2026-11-26
> A permissions boundary is an advanced feature for using a managed policy to set the maximum permissions that an identity-based policy can grant to an IAM entity.
>
> The permissions boundary for an IAM entity (user or role) sets the maximum permissions that the entity can have.

## S38 Access to AWS accounts owned by third parties - AWS Identity and Access Management — 外部 ID
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html#id_roles_third-party_external-id
fetched: 2026-11-26
> An external ID allows the user that is assuming the role to assert the circumstances in which they are operating.
>
> The primary function of the external ID is to address and prevent The confused deputy problem.
>
> AWS does not treat the external ID as a secret.
>
> You must specify this ID when you define the trust policy for the role.
>
> You should always specify the external ID in your AssumeRole API calls.

## S39 Accessing a member account that has OrganizationAccountAccessRole with AWS Organizations — 引き受ける管理用ロール
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access-cross-account-role.html#orgs_manage_accounts_access-cross-account-role
fetched: 2026-11-26
> By default, this role is named OrganizationAccountAccessRole.
>
> This role has full administrative permissions in the member account.
>
> AWS Organizations doesn't automatically create this role in invited member accounts or in project accounts, which you created as projects in AWS Settings.

## S40 AWS Security Hub CSPM — Understanding central configuration（legacy の告知）
url: https://docs.aws.amazon.com/securityhub/latest/userguide/central-configuration-intro.html#central-configuration-intro
fetched: 2026-11-26
> Central configuration is a legacy feature.
> Security Hub CSPM declarative policies are replacing it as the way to manage Security Hub CSPM across an organization.
> Security Hub CSPM declarative policies are the recommended way to manage Security Hub CSPM across an organization.
> Declarative policies and central configuration are mutually exclusive.

## S41 Managing AWS Config Rules Across All Accounts in Your Organization — Introduction
url: https://docs.aws.amazon.com/config/latest/developerguide/config-rule-multi-account-deployment.html#config-rule-multi-account-deployment
fetched: 2026-11-26
> Organizational rules can only be created using the API or CLI.
> This operation is not supported in the AWS Config console.
> AWS Config allows you to manage AWS Config rules across all AWS accounts within an organization.
> Centrally create, update, and delete AWS Config rules across all accounts in your organization.
> Deploy a common set of AWS Config rules across all accounts and specify accounts where AWS Config rules should not be created.

## S42 Managing AWS Config Rules Across All Accounts in Your Organization — Considerations
url: https://docs.aws.amazon.com/config/latest/developerguide/config-rule-multi-account-deployment.html#config-rule-multi-account-deployment-considerations
fetched: 2026-11-26
> If a new account joins an organization, the rule or conformance pack is deployed to that account.
> When an account leaves an organization, the rule or conformance pack is removed.
> If you are using an organization management account and intend to use a delegated administrator for organizational deployment, be aware that AWS Config won't automatically create the service-linked role (SLR).
> You must manually create the service-linked role (SLR) separately using IAM.
> If you do not have an SLR for your management account, you will not be able to deploy resources to that account from a delegated administrator account.
> You will still be able to deploy AWS Config rules to member accounts from management and delegated administrator accounts.

## S43 Managing AWS Config Rules Across All Accounts in Your Organization — Deployment
url: https://docs.aws.amazon.com/config/latest/developerguide/config-rule-multi-account-deployment.html#config-rule-multi-account-deployment-deploy
fetched: 2026-11-26
> Ensure AWS Config recording is on before you use the following APIs to manage AWS Config rules across all AWS accounts within an organization:
> PutOrganizationConfigRule, adds or updates organization config rule for your entire organization evaluating whether your AWS resources comply with your desired configurations.
> DeleteOrganizationConfigRule, deletes the specified organization config rule and all of its evaluation results from all member accounts in that organization.

## S44 Multi-Account Multi-Region Data Aggregation for AWS Config — Multi-Account Multi-Region Data Aggregation
url: https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html#aggregate-data
fetched: 2026-11-26
> An aggregator is an AWS Config resource type that collects AWS Config configuration and compliance data from the following:
> An organization in AWS Organizations and all the accounts in that organization which have AWS Config enabled.
> Use an aggregator to view the resource configuration and compliance data recorded in AWS Config.

## S45 Multi-Account Multi-Region Data Aggregation for AWS Config — Terminology
url: https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html#aggregation-terminology
fetched: 2026-11-26
> Authorization is not required if you are aggregating source accounts that are part of AWS Organizations.
> Aggregators provide a read-only view into the source accounts and Regions that the aggregator is authorized to view by replicating data from the source accounts into the aggregator account.
> Aggregators do not provide mutating access into a source account or region.
> For example, this means that you cannot deploy rules through an aggregator or push snapshot files to a source account or region through an aggregator.

## S46 About controls in AWS Control Tower — About controls
url: https://docs.aws.amazon.com/controltower/latest/userguide/controls.html#controls
fetched: 2026-11-26
> A control is a high-level rule that provides ongoing governance for your overall AWS environment.
> AWS Control Tower implements preventive, detective, and proactive controls that help you govern your resources and monitor compliance across groups of AWS accounts.
> A control applies to an entire organizational unit (OU), and every AWS account within the OU is affected by the control.
> During this time, you may see the previous term, guardrail, as well as the new term, control, in our documentation, console, blogs, and videos.
> These terms are synonymous for our purposes.

## S47 About controls in AWS Control Tower — Exception to controls for the management account
url: https://docs.aws.amazon.com/controltower/latest/userguide/controls.html#exception-to-controls
fetched: 2026-11-26
> The root user and any administrators in the management account can perform work that controls would otherwise deny.
> This exception is intentional.

## S48 Managing GuardDuty accounts with AWS Organizations — Delegated administrator
url: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html#guardduty_organizations
fetched: 2026-11-26
> In an AWS organization, the management account can designate any account within this organization as the delegated GuardDuty administrator account.
> For this administrator account, GuardDuty gets enabled automatically only in the current AWS Region.
> By default, the administrator account can enable and manage GuardDuty for all the member accounts in the organization within that Region.

## S49 Managing GuardDuty accounts with AWS Organizations — Considerations and recommendations
url: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html#delegated_admin_important
fetched: 2026-11-26
> A delegated GuardDuty administrator account can manage a maximum of 50,000 members.
> Unlike AWS Organizations, GuardDuty is a Regional service.
> The delegated GuardDuty administrator accounts and their member accounts must be added through AWS Organizations in each desired Region where you have GuardDuty enabled.
> You must designate one member account as the delegated GuardDuty administrator account across all the AWS Regions where GuardDuty is enabled.
> It is required that you use the same account as delegated GuardDuty administrator account in all other Regions.

## S50 What is Amazon Detective? — What is Amazon Detective?
url: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#what-is-detective
fetched: 2026-11-26
> Amazon Detective helps you analyze, investigate, and quickly identify the root cause of security findings or suspicious activities.
> Detective automatically collects log data from your AWS resources.
