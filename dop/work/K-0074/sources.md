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

## S21 Permissions boundaries for IAM entities — Permissions boundaries for IAM entities
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries
fetched: 2026-11-25
> AWS supports permissions boundaries for IAM entities (users or roles). A permissions boundary is an advanced feature for using a managed policy to set the maximum permissions that an identity-based policy can grant to an IAM entity. An entity's permissions boundary allows it to perform only the actions that are allowed by both its identity-based policies and its permissions boundaries.

## S22 Permissions boundaries for IAM entities — Evaluating effective permissions with boundaries
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries-eval-logic
fetched: 2026-11-25
> If any one of these policy types explicitly denies access for an operation, then the request is denied. Identity-based policies grant permission to the entity, and permissions boundaries limit those permissions. The effective permissions are the intersection of both policy types. An explicit deny in either of these policies overrides the allow.

## S23 Security best practices in IAM — Use permissions boundaries to delegate permissions management within an account
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#bp-permissions-boundaries
fetched: 2026-11-25
> In some scenarios, you might want to delegate permissions management within an account to others. For example, you could allow developers to create and manage roles for their workloads. When you delegate permissions to others, use permissions boundaries to set the maximum permissions that you delegate. A permissions boundary does not grant permissions on its own.

## S24 Security best practices in IAM — Use IAM Access Analyzer to generate least-privilege policies based on access activity
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#bp-gen-least-privilege-policies
fetched: 2026-11-25
> To grant only the permissions required to perform a task, you can generate policies based on your access activity that is logged in AWS CloudTrail. IAM Access Analyzer analyzes the services and actions that your IAM roles use, and then generates a fine-grained policy that you can use. After you test each generated policy, you can deploy the policy to your production environment. This ensures that you grant only the required permissions to your workloads.

## S25 Security best practices in IAM — Regularly review and remove unused users, roles, permissions, policies, and credentials
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#remove-credentials
fetched: 2026-11-25
> You might have IAM users, roles, permissions, policies, or credentials that you no longer need in your AWS account. IAM provides last accessed information to help you identify the users, roles, permissions, policies, and credentials that you no longer need so that you can remove them. You can also use this information to refine your IAM policies to better adhere to least-privilege permissions.

## S26 Using AWS Identity and Access Management Access Analyzer — Identifying resources shared with an external entity
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-resource-identification
fetched: 2026-11-25
> IAM Access Analyzer helps you identify the resources in your organization and accounts, such as Amazon S3 buckets or IAM roles, shared with an external entity. This lets you identify unintended access to your resources and data, which is a security risk. IAM Access Analyzer identifies resources shared with external principals by using logic-based reasoning to analyze the resource-based policies in your AWS environment. For each instance of a resource shared outside of your account, IAM Access Analyzer generates a finding.

## S27 Define permissions based on attributes with ABAC authorization — AWS IAM User Guide
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html
fetched: 2026-11-26
> Attribute-based access control (ABAC) is an authorization strategy that defines
> permissions based on attributes. AWS calls these attributes tags. You
> can attach tags to IAM resources, including IAM entities (IAM users or IAM roles) and
> to AWS resources. You can create a single ABAC policy or small set of policies for your
> IAM principals. You can design ABAC policies that allow operations when the principal's
> tag matches the resource tag.
>
> For example, you can create three IAM roles with the access-project tag key.
> Set the tag value of the first IAM role to Heart, the second to
> Star, and the third to Lightning. You can then use a single
> policy that allows access when the IAM role and the AWS resource have the tag value
> access-project.

## S28 Comparison of ABAC to the traditional RBAC model — AWS IAM User Guide
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html#introduction_attribute-based-access-control_compare-rbac
fetched: 2026-11-26
> The traditional authorization model used in IAM is role-based access control (RBAC).
> RBAC defines permissions based on a person's job function, or role, which is distinct from an IAM role. IAM does include managed policies for job functions that
> align permissions to a job function in an RBAC model.
> In IAM, you implement RBAC by creating different policies for different job functions.
> You then attach the policies to identities (IAM users, IAM groups, or IAM roles). As
> a best practice, you grant the minimum permissions
> necessary for the job function. This results in least
> privilege access. Each job function policy lists the specific resources that
> identities assigned that policy can access. The disadvantage to using the traditional RBAC
> model is that when you or your users add new resources to your environment, you have to
> update the policies to allow access to those resources.
>
> ABAC provides the following advantages over the traditional RBAC model:
> ABAC requires fewer policies. Because you don't
> have to create different policies for different job functions, you create fewer
> policies. Those policies are easier to manage.
> Granular permissions are possible using ABAC.
> When you create policies, it's a best practice to grant least privilege. Using traditional
> RBAC, you write a policy that allows access to specific resources. However, when you
> use ABAC, you can allow actions on all resources if the resource's tag matches the
> principal's tag.
> Use employee attributes from your corporate directory with
> ABAC. You can configure your SAML or OIDC provider to pass session tags
> to IAM. When your employees federate into AWS, IAM applies their attributes to
> their resulting principal. You can then use ABAC to allow or deny permissions based
> on those attributes.

## S29 Pass session tags in AWS STS — AWS Identity and Access Management User Guide
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html
fetched: 2026-11-26
> Session tags are key-value pair attributes that you pass when you assume an IAM role or
> federate a user in AWS STS. You do this by making an AWS CLI or AWS API request through AWS STS or
> through your identity provider (IdP). When you use AWS STS to request temporary security
> credentials, you generate a session. Sessions expire and have credentials, such as an access key pair and a
> session token. When you use the session credentials to make a subsequent request, the request context includes the aws:PrincipalTag context key. You can
> use the aws:PrincipalTag key in the Condition element of your policies
> to allow or deny access based on those tags.
>
> The AssumeRole operation returns a set of temporary credentials you can use
> to access AWS resources. You can use IAM user or role credentials to call
> AssumeRole. To pass session tags while assuming a role, use the
> --tags AWS CLI option or the Tags AWS API parameter.
>
> Attribute-based access control (ABAC) uses an authorization strategy that defines
> permissions based on tag attributes.
> If your company uses an OIDC or SAML-based identity provider (IdP) to manage user
> identities, you can configure your assertion to pass session tags to AWS. For example, with
> corporate user identities, when your employees federate into AWS, AWS applies their
> attributes to their resulting principal. You can then use ABAC to allow or deny permissions
> based on those attributes. For details, see IAM tutorial: Use SAML session tags for ABAC.

## S30 Attributes for access control — AWS IAM Identity Center User Guide
url: https://docs.aws.amazon.com/singlesignon/latest/userguide/attributesforaccesscontrol.html
fetched: 2026-11-26
> Attributes for access control is the name of the page in the
> IAM Identity Center console where you select user attributes that you want to use in policies to
> control access to resources. You can assign users to workloads in AWS based on
> existing attributes in the users' identity source.
> For example, suppose you want to assign access to S3 buckets based on department
> names. While on the Attributes for access control page, you
> select the Department user attribute for use with
> attribute-based access control (ABAC). In the IAM Identity Center permission set (or IAM role when using account access manager), you then write a
> policy that grants users access only when the Department
> attribute matches the department tag that you assigned to your S3 buckets. IAM Identity Center
> passes the user's department attribute to the account being accessed. The attribute
> is then used to determine access based on the policy. When IAM Identity Center passes these
> attributes to the account, they are sent as session tags that you can reference
> using the aws:PrincipalTag/tag-key
> condition key in all relevant AWS IAM policy types.

## S31 Manage AWS accounts with permission sets — AWS IAM Identity Center User Guide
url: https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html
fetched: 2026-11-26
> A permission set is a template that you create and maintain that defines a collection
> of one or more IAM
> policies. Permission sets simplify the assignment of AWS account access
> for users and groups in your organization. For example, you can create a Database Admin permission set that includes policies for
> administering AWS RDS, DynamoDB, and Aurora services, and use that single permission set
> to grant access to a list of target AWS accounts within your AWS Organization for your
> database administrators.
>
> IAM Identity Center assigns access to a user or group in one or more AWS accounts with permission
> sets. When you assign a permission set, IAM Identity Center creates corresponding IAM Identity Center-controlled
> IAM roles in each account, and attaches the policies specified in the permission set
> to those roles. IAM Identity Center manages the role, and allows the authorized users you’ve defined
> to assume the role, by using the IAM Identity Center User Portal or AWS CLI.  As you modify the
> permission set, IAM Identity Center ensures that the corresponding IAM policies and roles are
> updated accordingly.
>
> If your access management requires capabilities beyond what permission sets offer —
> such as custom trust policies, role tags, or configurable role paths — you can use account
> access manager in IAM.

## S32 Assign user or group access to AWS accounts — AWS IAM Identity Center User Guide
url: https://docs.aws.amazon.com/singlesignon/latest/userguide/assignusers.html
fetched: 2026-11-26
> To simplify administration of access permissions, we recommended that you
> assign access directly to groups rather than to individual users. With groups
> you can grant or deny permissions to groups of users rather than having to apply
> those permissions to each individual. If a user moves to a different
> organization, you simply move that user to a different group and they
> automatically receive the permissions that are needed for the new
> organization.
>
> You can select up to 10 AWS accounts at a time per permission set
> when you assign single sign-on access to users and groups. To assign
> more than 10 AWS accounts to the same set of users and groups, repeat
> this procedure as required for the additional accounts. When prompted,
> select the same users, groups, and permission set.

## S33 The confused deputy problem — AWS Identity and Access Management User Guide
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html
fetched: 2026-11-26
> The confused deputy problem is a security issue where an entity that doesn't have
> permission to perform an action can coerce a more-privileged entity to perform the action.
> One important aspect
> of this scenario is the external ID, an optional identifier that you
> can use in an IAM role trust policy to designate who can assume the role. The primary
> function of the external ID is to address and prevent the confused deputy problem.
>
> Example Corp can address the confused deputy problem by requiring that you include the
> ExternalId condition check in the role's trust policy. Example Corp
> generates a unique ExternalId value for each customer and uses that value
> in its request to assume the role. The ExternalId value must be unique
> among Example Corp's customers and controlled by Example Corp, not its customers. This
> is why you get it from Example Corp and you don't come up with it on your own. This
> prevents Example Corp from being a confused deputy and granting access to another
> account's AWS resources.
>
> The Condition element in this policy allows Example Corp to assume the role only when
> the AssumeRole API call includes the external ID value of 12345. Example Corp makes sure
> that whenever it assumes a role on behalf of a customer, it always includes that
> customer's external ID value in the AssumeRole call. Even if another customer supplies
> Example Corp with your ARN, it cannot control the external ID that Example Corp includes
> in its request to AWS. This helps prevent an unauthorized customer from gaining access
> to your resources.

## S34 Rotate AWS Secrets Manager secrets — Rotate AWS Secrets Manager secrets
url: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html#rotating-secrets
fetched: 2026-11-26
> Rotation is the process of periodically updating a secret.
> When you rotate a secret, you update the credentials in both the secret and the database or service.
> In Secrets Manager, you can set up automatic rotation for your secrets.
> Managed rotation – For most managed secrets, you use managed rotation, where the service configures and manages rotation for you.
> Managed rotation doesn't use a Lambda function.
> Rotation by Lambda function – For other types of secrets, Secrets Manager rotation uses a Lambda function to update the secret and the database or service.

## S35 Managed rotation for AWS Secrets Manager secrets — Managed rotation for AWS Secrets Manager secrets
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

## S36 Set up automatic rotation for Amazon RDS, Amazon Aurora, Amazon Redshift, or Amazon DocumentDB secrets — Set up automatic rotation for Amazon RDS, Amazon Aurora, Amazon Redshift, or Amazon DocumentDB secrets
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

## S37 Rotation schedules — Rotation schedules, Rotation windows, Cron expression requirements
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

## S38 Set up single user rotation for AWS Secrets Manager — Set up single user rotation for AWS Secrets Manager
url: https://docs.aws.amazon.com/secretsmanager/latest/userguide/tutorials_rotation-single.html#tutorials_rotation-single
fetched: 2026-11-26
> Single user rotation is a rotation strategy where Secrets Manager updates a user's credentials in both the secret and the database.
> Secrets Manager rotation uses an AWS Lambda function to update the secret and the database.
> In a production setting, it is a best practice to use different roles for each of the steps.
> Secrets Manager rotates the secret, which means the password is programmatically generated – no human has seen this new password.
> Having the rotation begin immediately can also help you determine if rotation is set up correctly.
> Secrets Manager uses CloudFormation to create resources such as the Lambda rotation function and an execution role that runs the Lambda function.

## S39 Manage access keys for IAM users — Manage access keys for IAM users
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#id_credentials_access-keys
fetched: 2026-11-26
> As a best practice, use temporary security credentials (such as IAM roles) instead of creating long-term credentials like access keys.
> Before creating access keys, review the alternatives to long-term access keys.
> Access keys are long-term credentials for an IAM user or the AWS account root user.
> You can have a maximum of two access keys per user.
> Do NOT put access keys or credential information in your application files.
> Use AWS CloudTrail to monitor access key usage and detect any unauthorized access attempts.
> Regularly review, update, and delete access keys as needed.

## S40 Secure API access with MFA — Overview
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_configure-api-require.html#MFAProtectedAPI-overview
fetched: 2026-11-26
> The user calls one of the AWS STS API operations that support the MFA parameters: AssumeRole or GetSessionToken.
> If authorization fails, AWS returns an access denied error message (as it does for any unauthorized access).
> The user must be reauthenticated with MFA by requesting new temporary security credentials with an MFA code and device serial number.

## S41 Secure API access with MFA — IAM policies with MFA conditions
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_configure-api-require.html#MFAProtectedAPI-policies
fetched: 2026-11-26
> To simply verify that the user did authenticate with MFA, check that the aws:MultiFactorAuthPresent key is True in a Bool condition.
> The key is only present when the user authenticates with short-term credentials.
> Long-term credentials, such as access keys, do not include this key.
> Note that the aws:MultiFactorAuthAge key is not present if MFA was not used.

## S42 Secure API access with MFA — Important points about MFA-protected API access
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_configure-api-require.html#MFAProtectedAPI-important-points
fetched: 2026-11-26
> MFA protection is available only with temporary security credentials, which must be obtained with AssumeRole or GetSessionToken.
> You cannot use MFA-protected API access with AWS account root user credentials.
> Federated users cannot be assigned an MFA device for use with AWS services, so they cannot access AWS resources controlled by MFA.
> If a policy includes an MFA condition, a request is denied if users have not been MFA authenticated, or if they provide an invalid MFA device identifier or invalid TOTP.

## S43 Temporary security credentials in IAM — Temporary security credentials in IAM
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html#id_credentials_temp
fetched: 2026-11-26
> You can use the AWS Security Token Service (AWS STS) to create and provide trusted users with temporary security credentials that can control access to your AWS resources.
> Temporary security credentials are short-term, as the name implies.
> After the credentials expire, AWS no longer recognizes them or allows any kind of access from API requests made with them.
> Temporary credentials are the basis for roles and identity federation.

## S44 Use instance profiles — Managing instance profiles (AWS CLI or AWS API)
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html#instance-profiles-manage-cli-api
fetched: 2026-11-26
> An instance profile can contain only one IAM role, although a role can be included in multiple instance profiles.
> This limit of one role per instance profile cannot be increased.
> You can remove the existing role and then add a different role to an instance profile.
> You must then wait for the change to appear across all of AWS because of eventual consistency.

## S45 What is AWS Identity and Access Management Roles Anywhere? — What is AWS Identity and Access Management Roles Anywhere?
url: https://docs.aws.amazon.com/rolesanywhere/latest/userguide/introduction.html#introduction
fetched: 2026-11-26
> You can use AWS Identity and Access Management Roles Anywhere to obtain temporary security credentials in IAM for workloads such as servers, containers, and applications that run outside of AWS.
> Using IAM Roles Anywhere means you don't need to manage long-term AWS credentials for workloads running outside of AWS.
> To use IAM Roles Anywhere, your workloads must use X.509 certificates issued by your certificate authority (CA).

## S46 What is AWS Identity and Access Management Roles Anywhere? — IAM Roles Anywhere concepts
url: https://docs.aws.amazon.com/rolesanywhere/latest/userguide/introduction.html#first-time-user
fetched: 2026-11-26
> A trust anchor is a reference to either AWS Private CA or an external CA certificate.
> Your workloads outside of AWS authenticate with the trust anchor using certificates issued by the trusted CA in exchange for temporary AWS credentials.

## S47 Create an OpenID Connect (OIDC) identity provider in IAM — Create an OpenID Connect (OIDC) identity provider in IAM
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html#id_roles_providers_create_oidc
fetched: 2026-11-26
> IAM OIDC identity providers are entities in IAM that describe an external identity provider (IdP) service that supports the OpenID Connect (OIDC) standard, such as Google or Salesforce.
> You use an IAM OIDC identity provider when you want to establish trust between an OIDC-compatible IdP and your AWS account.
> A role is an identity in AWS that doesn't have its own credentials (as a user does).
> But in this context, a role is dynamically assigned to an OIDC federated principal that is authenticated by your organization's IdP.
> The role permits your organization's IdP to request temporary security credentials for access to AWS.

## S48 Temporary security credentials in IAM — Identity federation
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html#id-federation
fetched: 2026-11-26
> Using OIDC federation helps you keep your AWS account secure, because you don't have to distribute long-term security credentials, such as IAM user access keys, with your application.

### 覆えなかった行
なし
