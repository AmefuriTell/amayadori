## S1 Secure API access with MFA — Overview
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_configure-api-require.html#MFAProtectedAPI-overview
fetched: 2026-11-26
> The user calls one of the AWS STS API operations that support the MFA parameters: AssumeRole or GetSessionToken.
> If authorization fails, AWS returns an access denied error message (as it does for any unauthorized access).
> The user must be reauthenticated with MFA by requesting new temporary security credentials with an MFA code and device serial number.

## S2 Secure API access with MFA — IAM policies with MFA conditions
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_configure-api-require.html#MFAProtectedAPI-policies
fetched: 2026-11-26
> To simply verify that the user did authenticate with MFA, check that the aws:MultiFactorAuthPresent key is True in a Bool condition.
> The key is only present when the user authenticates with short-term credentials.
> Long-term credentials, such as access keys, do not include this key.
> Note that the aws:MultiFactorAuthAge key is not present if MFA was not used.

## S3 Secure API access with MFA — Important points about MFA-protected API access
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_configure-api-require.html#MFAProtectedAPI-important-points
fetched: 2026-11-26
> MFA protection is available only with temporary security credentials, which must be obtained with AssumeRole or GetSessionToken.
> You cannot use MFA-protected API access with AWS account root user credentials.
> Federated users cannot be assigned an MFA device for use with AWS services, so they cannot access AWS resources controlled by MFA.
> If a policy includes an MFA condition, a request is denied if users have not been MFA authenticated, or if they provide an invalid MFA device identifier or invalid TOTP.

## S4 Temporary security credentials in IAM — Temporary security credentials in IAM
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html#id_credentials_temp
fetched: 2026-11-26
> You can use the AWS Security Token Service (AWS STS) to create and provide trusted users with temporary security credentials that can control access to your AWS resources.
> Temporary security credentials are short-term, as the name implies.
> After the credentials expire, AWS no longer recognizes them or allows any kind of access from API requests made with them.
> Temporary credentials are the basis for roles and identity federation.

## S5 Use instance profiles — Managing instance profiles (AWS CLI or AWS API)
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html#instance-profiles-manage-cli-api
fetched: 2026-11-26
> An instance profile can contain only one IAM role, although a role can be included in multiple instance profiles.
> This limit of one role per instance profile cannot be increased.
> You can remove the existing role and then add a different role to an instance profile.
> You must then wait for the change to appear across all of AWS because of eventual consistency.

## S6 What is AWS Identity and Access Management Roles Anywhere? — What is AWS Identity and Access Management Roles Anywhere?
url: https://docs.aws.amazon.com/rolesanywhere/latest/userguide/introduction.html#introduction
fetched: 2026-11-26
> You can use AWS Identity and Access Management Roles Anywhere to obtain temporary security credentials in IAM for workloads such as servers, containers, and applications that run outside of AWS.
> Using IAM Roles Anywhere means you don't need to manage long-term AWS credentials for workloads running outside of AWS.
> To use IAM Roles Anywhere, your workloads must use X.509 certificates issued by your certificate authority (CA).

## S7 What is AWS Identity and Access Management Roles Anywhere? — IAM Roles Anywhere concepts
url: https://docs.aws.amazon.com/rolesanywhere/latest/userguide/introduction.html#first-time-user
fetched: 2026-11-26
> A trust anchor is a reference to either AWS Private CA or an external CA certificate.
> Your workloads outside of AWS authenticate with the trust anchor using certificates issued by the trusted CA in exchange for temporary AWS credentials.

## S8 Create an OpenID Connect (OIDC) identity provider in IAM — Create an OpenID Connect (OIDC) identity provider in IAM
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html#id_roles_providers_create_oidc
fetched: 2026-11-26
> IAM OIDC identity providers are entities in IAM that describe an external identity provider (IdP) service that supports the OpenID Connect (OIDC) standard, such as Google or Salesforce.
> You use an IAM OIDC identity provider when you want to establish trust between an OIDC-compatible IdP and your AWS account.
> A role is an identity in AWS that doesn't have its own credentials (as a user does).
> But in this context, a role is dynamically assigned to an OIDC federated principal that is authenticated by your organization's IdP.
> The role permits your organization's IdP to request temporary security credentials for access to AWS.

## S9 Temporary security credentials in IAM — Identity federation
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html#id-federation
fetched: 2026-11-26
> Using OIDC federation helps you keep your AWS account secure, because you don't have to distribute long-term security credentials, such as IAM user access keys, with your application.
