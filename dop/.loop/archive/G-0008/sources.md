# G-0008 サービス事典: AWS Health、AWS IAM Identity Center、AWS KMS、AWS Regions、AWS Security Hub CSPM

## S0 Managing administrator and member accounts in Security Hub CSPM — Managing accounts with AWS Organizations
url: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-accounts.html#securityhub-orgs-account-management-overview
fetched: 2026-11-26
> Central configuration (legacy)
> The delegated administrator creates Security Hub CSPM configuration policies and associates them with accounts and OUs.
> Declarative policies are replacing central configuration.
> If your organization uses central configuration, migrate to declarative policies.

## S1 What is AWS Health? — What is AWS Health?
url: https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html#what-is-aws-health
fetched: 2026-11-26
> AWS Health provides ongoing visibility into your resource performance and the availability of your AWS services and accounts.
> You can use AWS Health events to learn how service and resource changes might affect your applications running on AWS.
> AWS Health provides a console, called the AWS Health Dashboard, to all customers.
> The service delivers alerts and notifications triggered by changes in the health of AWS resources, so that you get near-instant event visibility and guidance to help accelerate troubleshooting.
> All AWS customers can receive AWS Health events through Amazon EventBridge at no additional cost.

## S2 Monitoring account-specific and public events for AWS Health — Monitoring account-specific and public events for AWS Health
url: https://docs.aws.amazon.com/health/latest/ug/about-public-events.html#about-public-events
fetched: 2026-11-26
> Account-specific events affect your account and resources, such as an event that tells you about a required update to an Amazon EC2 instance or other scheduled change events.
> Public events aren't specific to AWS accounts and provide public information about the Regional availability of a service.
> To receive both event types, your rule must use the "source": [ "aws.health"] value.
> You can identify if an event is public or account-specific in EventBridge, by using the eventScopeCode parameter.

## S3 Enabling organizational view — Enabling organizational view
url: https://docs.aws.amazon.com/health/latest/ug/enable-organizational-view.html#enable-organizational-view
fetched: 2026-11-26
> You can use the AWS Health console to get a centralized view for health events in your AWS organization.
> You can enable organizational view from the AWS Health console.
> You must sign in to the management account of your AWS organization.
> When you enable this feature, the AWSServiceRoleForHealth_Organizations service-linked role with the Health_OrganizationsServiceRolePolicy AWS managed policy is applied to the management account in the organization.

## S4 What is IAM Identity Center? — What is IAM Identity Center?
url: https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html#what-is
fetched: 2026-11-26
> AWS IAM Identity Center is the AWS solution for connecting your workforce users to AWS managed applications such as Kiro and AWS Quick, and other AWS resources.
> You can connect your existing identity provider and synchronize users and groups from your directory, or create and manage your users directly in IAM Identity Center.
> On July 26, 2022, AWS Single Sign-On was renamed to AWS IAM Identity Center.

## S5 Manage AWS accounts with permission sets — Manage AWS accounts with permission sets
url: https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html#permissionsetsconcept
fetched: 2026-11-26
> A permission set is a template that you create and maintain that defines a collection of one or more IAM policies.
> Permission sets simplify the assignment of AWS account access for users and groups in your organization.
> IAM Identity Center assigns access to a user or group in one or more AWS accounts with permission sets.
> When you assign a permission set, IAM Identity Center creates corresponding IAM Identity Center-controlled IAM roles in each account, and attaches the policies specified in the permission set to those roles.

## S6 Attribute-based access control — Attribute-based access control
url: https://docs.aws.amazon.com/singlesignon/latest/userguide/abac.html#abac
fetched: 2026-11-26
> Attribute-based access control (ABAC) is an authorization strategy that defines permissions based on attributes.
> You can use IAM Identity Center to manage access to your AWS resources across multiple AWS accounts using user attributes that come from any IAM Identity Center identity source.
> Using user attributes as tags in AWS helps you simplify the process of creating fine-grained permissions in AWS and ensures that your workforce gets access only to the AWS resources with matching tags.

## S7 AWS Key Management Service — AWS Key Management Service
url: https://docs.aws.amazon.com/kms/latest/developerguide/overview.html#overview
fetched: 2026-11-26
> AWS Key Management Service (AWS KMS) is an AWS managed service that makes it easy for you to create and control the keys used to encrypt and sign your data.
> The AWS KMS keys that you create in AWS KMS are protected by FIPS 140-3 Security Level 3 validated hardware security modules (HSM).
> They never leave AWS KMS unencrypted.

## S8 Why use AWS KMS? — Why use AWS KMS?
url: https://docs.aws.amazon.com/kms/latest/developerguide/overview.html#service-kms-why
fetched: 2026-11-26
> AWS KMS protects your root keys.
> KMS keys are created, managed, used, and deleted entirely within AWS KMS.
> Additionally, you can create and manage key policies in AWS KMS, ensuring that only trusted users have access to KMS keys.

## S9 Key policies in AWS KMS — Key policies in AWS KMS
url: https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html#key-policies
fetched: 2026-11-26
> A key policy is a resource policy for an AWS KMS key.
> Key policies are the primary way to control access to KMS keys.
> Every KMS key has a default key policy.
> No AWS principal, including the account root user or key creator, has any permissions to a KMS key unless they are explicitly allowed, and never denied, in a key policy, IAM policy, or grant.
> Unlike IAM policies, which are global, key policies are Regional.
> A key policy controls access only to a KMS key in the same Region.

## S10 Regions and Zones — Regions and Zones
url: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#using-regions-availability-zones
fetched: 2026-11-26
> Amazon EC2 is hosted in multiple locations world-wide.
> These locations are composed of AWS Regions, Availability Zones, Local Zones, AWS Outposts, and Wavelength Zones.
> Regions are separate geographic areas.
> Availability Zones are multiple, isolated locations within each Region.

## S11 Regions and Zones — Regions
url: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-regions
fetched: 2026-11-26
> Each Region is designed to be isolated from the other Regions.
> When you view your resources, you see only the resources that are tied to the Region that you specified.
> This is because Regions are isolated from each other, and we don't automatically replicate resources across Regions.

## S12 Regions and Zones — Availability Zones
url: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-availability-zones
fetched: 2026-11-26
> Each Region has multiple, isolated locations known as Availability Zones.
> The code for an Availability Zone is its Region code followed by a letter identifier.
> By launching EC2 instances in multiple Availability Zones, you can protect your applications from the failure of a single location in the Region.

## S13 Introduction to AWS Security Hub CSPM — Introduction to AWS Security Hub CSPM
url: https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html#what-is-securityhub
fetched: 2026-11-26
> AWS Security Hub Cloud Security Posture Management (AWS Security Hub CSPM) provides you with a comprehensive view of your security state in AWS and helps you assess your AWS environment against security industry standards and best practices.
> AWS Security Hub CSPM collects security data across AWS accounts, AWS services, and supported third-party products and helps you analyze your security trends and identify the highest priority security issues.
> Security Hub CSPM runs checks against security controls and generates control findings to help you assess your compliance against security best practices.
> Security Hub CSPM offers automation features that help you triage and remediate security issues.

## S14 What are Security Hub and Security Hub CSPM? — What are Security Hub and Security Hub CSPM?
url: https://docs.aws.amazon.com/securityhub/latest/userguide/what-are-securityhub-services.html#what-are-securityhub-services
fetched: 2026-11-26
> AWS Security Hub and AWS Security Hub CSPM are AWS services that protect your cloud environment.
> Security Hub CSPM provides a comprehensive view of your security posture and helps you evaluate your cloud environment against security industry standards and best practices.
> Security Hub provides a unified experience that helps you prioritize and respond to critical security issues.

## S15 Understanding cross-Region aggregation in Security Hub CSPM — Understanding cross-Region aggregation in Security Hub CSPM
url: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation
fetched: 2026-11-26
> The aggregation Region is now called the home Region.
> Some Security Hub CSPM API operations still use the older term aggregation Region.
> By using cross-Region aggregation in AWS Security Hub CSPM, you can aggregate findings, finding updates, insights, control compliance statuses, and security scores from multiple AWS Regions to a single home Region.
> You can then manage all of this data from the home Region.
