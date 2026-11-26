# 講義の根拠: task 6.2（Apply automation for security controls and data protection）

## S0 廃止の告知 — Amazon CloudHSM clusters
url: https://docs.aws.amazon.com/cloudhsm/latest/userguide/clusters.html#clusters
fetched: 2026-11-27
> The hsm1.medium HSM type is reaching end of support so new clusters cannot be created with this type.

## S0 レガシー機能の告知 — Understanding central configuration in Security Hub CSPM
url: https://docs.aws.amazon.com/securityhub/latest/userguide/central-configuration-intro.html#central-configuration-intro
fetched: 2026-11-27
> Central configuration is a legacy feature. Security Hub CSPM declarative policies are replacing it as the way to manage Security Hub CSPM across an organization.

## S1 Control subnet traffic with network access control lists — Control subnet traffic with network access control lists
url: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#vpc-network-acls
fetched: 2026-11-27
> A network access control list (ACL) allows or denies specific inbound or outbound traffic at the subnet level.
> Custom network ACLs add an additional layer of security to your VPC.

## S2 Infrastructure security in Amazon VPC — Control network traffic
url: https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html#control-network-traffic
fetched: 2026-11-27
> Use security groups as the primary mechanism for controlling network access to your VPCs.
> When necessary, use network ACLs to provide stateless, coarse-grain network control.
> Configure subnet route tables with the minimum network routes to support your connectivity requirements.
> Use AWS Network Firewall to protect the subnets in your VPC from common network threats.
> Use AWS Security Hub CSPM to check for unintended network accessibility from your instances.

## S3 Infrastructure security in Amazon VPC — Compare security groups and network ACLs
url: https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html#VPC_Security_Comparison
fetched: 2026-11-27
> You can secure your instances using only security groups. However, you can add network ACLs as an additional layer of defense.

## S4 Filter network traffic using AWS Network Firewall — Filter network traffic using AWS Network Firewall
url: https://docs.aws.amazon.com/vpc/latest/userguide/network-firewall.html#network-firewall
fetched: 2026-11-27
> You can filter network traffic at the perimeter of your VPC using AWS Network Firewall. Network Firewall is a stateful, managed, network firewall and intrusion detection and prevention service.
> Stateful rule groups are similar in behavior and use to Amazon VPC security groups.

## S5 AWS WAF — AWS WAF
url: https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html#waf-chapter
fetched: 2026-11-27
> AWS WAF is a web application firewall that lets you monitor the HTTP(S) requests that are forwarded to your protected web application resources.
> AWS WAF lets you control access to your content.

## S6 What is AWS Certificate Manager? — What is AWS Certificate Manager?
url: https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html#acm-overview
fetched: 2026-11-27
> AWS Certificate Manager (ACM) handles the complexity of creating, storing, and renewing public and private SSL/TLS X.509 certificates and keys that protect your AWS websites and applications.
> You can also export ACM certificates signed by AWS Private CA for use anywhere in your internal PKI.

## S7 Managed certificate renewal in AWS Certificate Manager — Managed certificate renewal in AWS Certificate Manager
url: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html#managed-renewal
fetched: 2026-11-27
> ACM provides managed renewal for your Amazon-issued SSL/TLS certificates. This means that ACM will either renew your certificates automatically (if you are using DNS validation), or it will send you email notices when expiration is approaching.
> NOT ELIGIBLE if imported.

## S8 What is AWS CloudHSM? — What is AWS CloudHSM?
url: https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html#introduction
fetched: 2026-11-27
> A hardware security module (HSM) is a computing device that processes cryptographic operations and provides secure storage for cryptographic keys.
> If you want a managed service for creating and controlling your encryption keys but you don't want or need to operate your own HSMs, consider using AWS Key Management Service.

## S9 AWS KMS keys — AWS KMS keys
url: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#concepts
fetched: 2026-11-27
> Customer managed keys are recommended for customers who want full control over the lifecycle and usage of their keys.
> Use customer managed keys when control is important, but use AWS owned keys when convenience is most important.

## S10 Rotate AWS KMS keys — Rotate AWS KMS keys
url: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html#rotate-keys
fetched: 2026-11-27
> By default, when you enable automatic key rotation for a KMS key, AWS KMS generates new cryptographic material for the KMS key every year.
> Key rotation has no effect on the data that the KMS key protects.

## S11 Reducing the cost of SSE-KMS with Amazon S3 Bucket Keys — S3 Bucket Keys for SSE-KMS
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-key.html#bucket-key-overview
fetched: 2026-11-27
> When you configure your bucket to use an S3 Bucket Key for SSE-KMS, AWS generates a short-lived bucket-level key from AWS KMS, then temporarily keeps it in S3.

## S12 What is Amazon Macie? — What is Amazon Macie?
url: https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html#what-is-macie
fetched: 2026-11-27
> Amazon Macie is a data security service that discovers sensitive data by using machine learning and pattern matching, provides visibility into data security risks, and enables automated protection against those risks.

## S13 What is Amazon Macie? — Features of Macie: Automate the discovery of sensitive data
url: https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html#macie-features
fetched: 2026-11-27
> Automated sensitive data discovery provides broad visibility into where sensitive data might reside in your Amazon S3 data estate.
> Sensitive data discovery jobs provide deeper, more targeted analysis.

## S14 Running sensitive data discovery jobs — Running sensitive data discovery jobs
url: https://docs.aws.amazon.com/macie/latest/user/discovery-jobs.html#discovery-jobs
fetched: 2026-11-27
> With Amazon Macie, you can create and run sensitive data discovery jobs to automate discovery, logging, and reporting of sensitive data in Amazon Simple Storage Service (Amazon S3) general purpose buckets.
> You can configure a job to use managed data identifiers that Macie provides, custom data identifiers that you define, or a combination of the two.

## S15 Using managed data identifiers — Using managed data identifiers
url: https://docs.aws.amazon.com/macie/latest/user/managed-data-identifiers.html#managed-data-identifiers
fetched: 2026-11-27
> Macie can detect the following categories of sensitive data by using managed data identifiers:
> Each managed data identifier is designed to detect a specific type of sensitive data—for example, AWS secret access keys, credit card numbers, or passport numbers for a particular country or region.

## S16 Managing accounts with declarative policies in Security Hub CSPM — Managing accounts with declarative policies in Security Hub CSPM
url: https://docs.aws.amazon.com/securityhub/latest/userguide/accounts-orgs-policies.html#accounts-orgs-policies
fetched: 2026-11-27
> With an AWS Security Hub CSPM declarative policy, you can centrally enable and configure Security Hub CSPM across the accounts in your organization.
> You use an AWS Organizations declarative policy to specify where Security Hub CSPM is enabled or disabled in each AWS Region.
> You can target the organization root, organizational units (OUs), or individual accounts.

## S17 About controls in AWS Control Tower — About controls in AWS Control Tower
url: https://docs.aws.amazon.com/controltower/latest/userguide/controls.html#controls
fetched: 2026-11-27
> AWS Control Tower implements preventive, detective, and proactive controls that help you govern your resources and monitor compliance across groups of AWS accounts.
> A control applies to an entire organizational unit (OU), and every AWS account within the OU is affected by the control.

## S18 Understanding cross-Region aggregation in Security Hub CSPM — Understanding cross-Region aggregation in Security Hub CSPM
url: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation
fetched: 2026-11-27
> By using cross-Region aggregation in AWS Security Hub CSPM, you can aggregate findings, finding updates, insights, control compliance statuses, and security scores from multiple AWS Regions to a single home Region.

## S19 Managing GuardDuty accounts with AWS Organizations — Managing GuardDuty accounts with AWS Organizations
url: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html#guardduty_organizations
fetched: 2026-11-27
> In an AWS organization, the management account can designate any account within this organization as the delegated GuardDuty administrator account.
> By default, the administrator account can enable and manage GuardDuty for all the member accounts in the organization within that Region.

## S20 How Detective is used for investigation — How Detective is used for investigation
url: https://docs.aws.amazon.com/detective/latest/userguide/detective-investigation-about.html#detective-investigation-about
fetched: 2026-11-27
> Amazon Detective makes it easy to analyze, investigate, and quickly identify the root cause of security findings or suspicious activity.

### 覆えなかった行
- knowledge「Network security components」の AWS Shield: 取った本文に Shield の説明が無い（AWS WAF のページは題に Shield Advanced を含むが、本文は取っていない）。
- skill「Automating the application of security controls」の AWS Systems Manager: 出典が無い。
- skill「Combining security controls to apply defense in depth」の AWS Config と AWS Config rules: 出典が無い。
