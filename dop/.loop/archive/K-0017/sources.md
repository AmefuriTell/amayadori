## S1 Identity-based policies and resource-based policies — Identity-based policies and resource-based policies
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_identity-vs-resource.html
fetched: 2026-11-27
> Identity-based policies are attached to an IAM user, group, or role. Resource-based policies are attached to a resource.

## S2 What is AWS Identity and Access Management Roles Anywhere? — What is AWS Identity and Access Management Roles Anywhere?
url: https://docs.aws.amazon.com/rolesanywhere/latest/userguide/introduction.html#introduction
fetched: 2026-11-27
> You can use AWS Identity and Access Management Roles Anywhere to obtain temporary security credentials in IAM for workloads such as servers, containers, and applications that run outside of AWS.

## S3 Identity providers and federation into AWS — Identity providers and federation into AWS
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers.html#id_roles_providers
fetched: 2026-11-27
> As a best practice, we recommend that you require human users to use federation with an identity provider to access AWS resources instead of creating individual IAM users in your AWS account.

## S4 Identity providers and federation into AWS — Federation with IAM Identity Center
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers.html#id_roles_providers_identity-center
fetched: 2026-11-27
> For centralized access management of human users, we recommend that you use IAM Identity Center to manage access to your accounts and permissions within those accounts.

## S5 Permissions boundaries for IAM entities — Permissions boundaries for IAM entities
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries
fetched: 2026-11-27
> A permissions boundary is an advanced feature for using a managed policy to set the maximum permissions that an identity-based policy can grant to an IAM entity.

## S6 Permissions boundaries for IAM entities — Evaluating effective permissions with boundaries
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries-eval-logic
fetched: 2026-11-27
> Identity-based policies grant permission to the entity, and permissions boundaries limit those permissions. The effective permissions are the intersection of both policy types.

## S7 Service control policies (SCPs) — Service control policies (SCPs)
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#orgs_manage_policies_scps
fetched: 2026-11-27
> Service control policies (SCPs) are a type of organization policy that you can use to manage permissions in your organization.

## S8 Service control policies (SCPs) — Service control policies (SCPs)
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#orgs_manage_policies_scps
fetched: 2026-11-27
> SCPs do not grant permissions to the IAM users and IAM roles in your organization. An SCP defines a permission guardrail, or sets limits, on the actions that the IAM users and IAM roles in your organization can perform.

## S9 Service control policies (SCPs) — SCP effects on permissions
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#scp-effects-on-permissions
fetched: 2026-11-27
> An SCP restricts permissions for IAM users and roles in member accounts, including the member account's root user.

## S10 Security best practices in IAM — Least-privilege permissions
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#bp-use-aws-defined-policies
fetched: 2026-11-27
> You do this by defining the actions that can be taken on specific resources under specific conditions, also known as least-privilege permissions.

## S11 Define permissions based on attributes with ABAC authorization — Define permissions based on attributes with ABAC authorization
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html#introduction_attribute-based-access-control
fetched: 2026-11-27
> When you create policies, it's a best practice to grant least privilege.

## S12 Define permissions based on attributes with ABAC authorization — Define permissions based on attributes with ABAC authorization
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html#introduction_attribute-based-access-control
fetched: 2026-11-27
> Attribute-based access control (ABAC) is an authorization strategy that defines permissions based on attributes.

## S13 Pass session tags in AWS STS — Pass session tags in AWS STS
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html#id_session-tags
fetched: 2026-11-27
> Session tags are key-value pair attributes that you pass when you assume an IAM role or federate a user in AWS STS.

## S14 Attributes for access control — Attributes for access control
url: https://docs.aws.amazon.com/singlesignon/latest/userguide/attributesforaccesscontrol.html#attributesforaccesscontrol
fetched: 2026-11-27
> You can assign users to workloads in AWS based on existing attributes in the users' identity source.

## S15 Rotate AWS Secrets Manager secrets — Rotate AWS Secrets Manager secrets
url: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html#rotating-secrets
fetched: 2026-11-27
> Rotation is the process of periodically updating a secret.

## S16 Managed rotation for AWS Secrets Manager secrets — Managed rotation for AWS Secrets Manager secrets
url: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_managed.html#rotate-secrets_managed
fetched: 2026-11-27
> Some services offer managed rotation, where the service configures and manages rotation for you.

## S17 Manage access keys for IAM users — Manage access keys for IAM users
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#id_credentials_access-keys
fetched: 2026-11-27
> As a best practice, use temporary security credentials (such as IAM roles) instead of creating long-term credentials like access keys.

## S18 Secure API access with MFA — Secure API access with MFA
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_configure-api-require.html#id_credentials_mfa_configure-api-require
fetched: 2026-11-27
> You can apply additional security by requiring users to authenticate with multi-factor authentication (MFA) before you allow them to perform particularly sensitive actions.

## S19 Temporary security credentials in IAM — Temporary security credentials in IAM
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html#id_credentials_temp
fetched: 2026-11-27
> You can use the AWS Security Token Service (AWS STS) to create and provide trusted users with temporary security credentials that can control access to your AWS resources.

## S20 Use instance profiles — Use instance profiles
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html#id_roles_use_switch-role-ec2_instance-profiles
fetched: 2026-11-27
> Use an instance profile to pass an IAM role to an EC2 instance.

### 覆えなかった行
なし
