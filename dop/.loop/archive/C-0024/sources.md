## S1 Service control policies (SCPs) - AWS Organizations — SCP の役割と権限の上限
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#orgs_manage_policies_scps
fetched: 2026-11-26
> SCPs offer central control over the maximum available permissions for the IAM users and IAM roles in your organization.
>
> SCPs do not grant permissions to the IAM users and IAM roles in your organization. No permissions are granted by an SCP. An SCP defines a permission guardrail, or sets limits, on the actions that the IAM users and IAM roles in your organization can perform.
>
> SCPs are available only in an organization that has all features enabled.
>
> SCPs don't affect users or roles in the management account. They affect only the member accounts in your organization.

## S2 Service control policies (SCPs) - AWS Organizations — SCP が権限に与える影響
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

## S3 SCP evaluation - AWS Organizations — Allow と Deny の評価
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

## S4 Resource control policies (RCPs) - AWS Organizations — SCP と RCP の使い分け
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html#orgs_manage_policies_rcps
fetched: 2026-11-26
> Use an SCP when you need to limit permissions of IAM principals within your organization's member accounts.
>
> Use an RCP when you need to restrict IAM principals that are external to your organization accounts making requests to access resources within your organization’s member accounts.
>
> RCPs alone are not sufficient in granting permissions to the resources in your organization. No permissions are granted by an RCP.
>
> RCPs don't affect resources in the management account. They only affect resources in the member accounts within your organization.

## S5 Permissions boundaries for IAM entities - AWS Identity and Access Management — 権限の上限
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries
fetched: 2026-11-26
> A permissions boundary is an advanced feature for using a managed policy to set the maximum permissions that an identity-based policy can grant to an IAM entity.
>
> The permissions boundary for an IAM entity (user or role) sets the maximum permissions that the entity can have.

## S6 Access to AWS accounts owned by third parties - AWS Identity and Access Management — 外部 ID
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

## S7 Accessing a member account that has OrganizationAccountAccessRole with AWS Organizations — 引き受ける管理用ロール
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access-cross-account-role.html#orgs_manage_accounts_access-cross-account-role
fetched: 2026-11-26
> By default, this role is named OrganizationAccountAccessRole.
>
> This role has full administrative permissions in the member account.
>
> AWS Organizations doesn't automatically create this role in invited member accounts or in project accounts, which you created as projects in AWS Settings.
