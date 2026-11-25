## S1 About enrolling existing accounts - AWS Control Tower — About enrolling existing accounts; Enroll accounts with AWS Config resources
url: https://docs.aws.amazon.com/controltower/latest/userguide/enroll-account.html#enroll-account
fetched: 2026-11-26
> You can extend AWS Control Tower governance to an individual, existing AWS account when you enroll it into an organizational unit (OU) that's already governed by AWS Control Tower. Eligible accounts exist in unregistered OUs that are part of the same AWS Organizations organization as the AWS Control Tower OU.
> You cannot enroll an existing AWS account to serve as your audit or log archive account except during initial landing zone setup.
> The account to be enrolled must not have existing AWS Config resources.

## S2 Managing account invitations with AWS Organizations - AWS Organizations — Managing account invitations; Considerations
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_invites.html#orgs_manage_accounts_invites
fetched: 2026-11-26
> After you create an organization and verify that you own the email address associated with the management account, you can invite existing AWS accounts to join your organization.
> You can send an invitation to other accounts only from the management account of your organization.
> All accounts in an organization must come from the same AWS partition as the management account.
> Each invitation must be responded to within 15 days, or it expires.
> An account can only join one organization.
> After an account accepts the invitation to join an organization, the management account of the organization becomes responsible for all charges accrued by the new member account.
> For invited member accounts, AWS Organizations doesn't automatically create the IAM role OrganizationAccountAccessRole.

## S3 Migrate an account to another organization with AWS Organizations - AWS Organizations — Migrate an account; Step 1
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_account_migration.html#orgs_account_migration
fetched: 2026-11-26
> Whatever your use case, migrating an account between organizations requires you to send an invite from the management account of the new organization, and to use the invited account to accept the invite to join the new organization.
> Closed or suspended accounts cannot be migrated.
> To migrate an account that you created in an organization, you must wait until at least four days after the account was created.
> Invited accounts are not subject to this waiting period.
> To migrate an account to a new organization, you must wait until at least seven days after the organization was created.
> If the accounts have different Sellers of Record, the move fails.
> The migrating account doesn't need to leave its current organization or operate as a standalone account first.

## S4 Managing organization policies with AWS Organizations - AWS Organizations — Policy types
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html#orgs-policy-types
fetched: 2026-11-26
> Policies in AWS Organizations enable you to apply additional types of management to the AWS accounts in your organization. You can use policies when all features are enabled in your organization.
> Authorization policies help you to centrally manage the security of AWS accounts across an organization.
> Declarative policies help you centrally configure and manage AWS services and their features across an organization.

## S5 Tag policies - AWS Organizations — What are tag policies?
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies.html#what-are-tag-policies
fetched: 2026-11-26
> You can use tag policies to maintain consistent tags, including the preferred case treatment of tag keys and tag values.
> A tag policy can also specify that noncompliant tagging operations on specified resource types are enforced.
> In other words, noncompliant tagging requests on specified resource types are prevented from completing.
> Untagged resources or tags that aren't defined in the tag policy aren't evaluated for compliance with the tag policy.
> Tag policies are available only in an organization that has all features enabled.

## S6 Backup policies - AWS Organizations — Backup policies; How backup policies work
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_backup.html#orgs_manage_policies_backup_how_work
fetched: 2026-11-26
> You can attach a backup policy to any of the elements in your organization's structure, such as the root, organizational units (OUs), and individual accounts.
> AWS Backup can only perform a successful backup when it is invoked by a complete effective policy that has all of the required elements.
> Otherwise, AWS Backup considers the policy not valid and does not back up the affected resources.

## S7 Billing and pricing for AWS Organizations - AWS Organizations — Billing and pricing; Who pays for usage
url: https://docs.aws.amazon.com/organizations/latest/userguide/pricing.html#pricing
fetched: 2026-11-26
> AWS Organizations is offered at no additional charge.
> The owner of the management account is responsible for paying for all usage, data, and resources used by the accounts in the organization.
> Your bill will not reflect the structure that you have defined in your organization.
