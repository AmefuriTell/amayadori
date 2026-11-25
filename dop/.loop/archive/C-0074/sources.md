## S0 Understanding central configuration in Security Hub CSPM — Understanding central configuration in Security Hub CSPM
url: https://docs.aws.amazon.com/securityhub/latest/userguide/central-configuration-intro.html#central-configuration-intro
fetched: 2026-11-25
> Central configuration is a legacy feature.
> Security Hub CSPM declarative policies are replacing it as the way to manage Security Hub CSPM across an organization.

## S1 Managing administrator and member accounts in Security Hub CSPM — Managing accounts with AWS Organizations
url: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-accounts.html#securityhub-orgs-account-management-overview
fetched: 2026-11-25
> When you integrate Security Hub CSPM and AWS Organizations, the Organizations management account designates a Security Hub CSPM delegated administrator.
> Security Hub CSPM is automatically enabled in the delegated administrator account in the AWS Region in which it was designated.

## S2 Understanding central configuration in Security Hub CSPM — Understanding central configuration in Security Hub CSPM
url: https://docs.aws.amazon.com/securityhub/latest/userguide/central-configuration-intro.html#central-configuration-intro
fetched: 2026-11-25
> When you use central configuration, the delegated administrator can choose which accounts and OUs to configure.
> If the delegated administrator designates a member account or OU as centrally managed, only the delegated administrator can configure the member account or OU across Regions.
> Configuration policies take effect in the home Region and all linked Regions.

## S3 Managing accounts with declarative policies in Security Hub CSPM — Managing accounts with declarative policies in Security Hub CSPM
url: https://docs.aws.amazon.com/securityhub/latest/userguide/accounts-orgs-policies.html#accounts-orgs-policies
fetched: 2026-11-25
> With an AWS Security Hub CSPM declarative policy, you can centrally enable and configure Security Hub CSPM across the accounts in your organization.
> You can target the organization root, organizational units (OUs), or individual accounts.
> Accounts that join the organization, or move into an OU that has an attached declarative policy, inherit the declarative policy.
> Security Hub CSPM declarative policies replace central configuration as the recommended way to manage Security Hub CSPM across an organization.
> When you attach your first declarative policy, Security Hub CSPM disables central configuration for the entire organization.

## S4 Understanding cross-Region aggregation in Security Hub CSPM — Understanding cross-Region aggregation in Security Hub CSPM
url: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation
fetched: 2026-11-25
> By using cross-Region aggregation in AWS Security Hub CSPM, you can aggregate findings, finding updates, insights, control compliance statuses, and security scores from multiple AWS Regions to a single home Region.
> Security Hub CSPM only aggregates data from Regions where an account has Security Hub CSPM enabled.
> Security Hub CSPM is not automatically enabled for an account based on the cross-Region aggregation configuration.

## S5 About controls in AWS Control Tower — About controls in AWS Control Tower
url: https://docs.aws.amazon.com/controltower/latest/userguide/controls.html#controls
fetched: 2026-11-25
> A control is a high-level rule that provides ongoing governance for your overall AWS environment.
> AWS Control Tower implements preventive, detective, and proactive controls that help you govern your resources and monitor compliance across groups of AWS accounts.
> A control applies to an entire organizational unit (OU), and every AWS account within the OU is affected by the control.
