# 講義の根拠: task 6.2（Apply automation for security controls and data protection）

## S0 廃止の告知 — Amazon CloudHSM clusters
url: https://docs.aws.amazon.com/cloudhsm/latest/userguide/clusters.html#clusters
fetched: 2026-11-27
> The hsm1.medium HSM type is reaching end of support so new clusters cannot be created with this type.

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
> Security Hub CSPM declarative policies replace central configuration as the recommended way to manage Security Hub CSPM across an organization.
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

## S21 Understanding central configuration in Security Hub CSPM — Understanding central configuration in Security Hub CSPM
url: https://docs.aws.amazon.com/securityhub/latest/userguide/central-configuration-intro.html#central-configuration-intro
fetched: 2026-11-25
> Central configuration is a legacy feature.
> Security Hub CSPM declarative policies are replacing it as the way to manage Security Hub CSPM across an organization.

## S22 Managing administrator and member accounts in Security Hub CSPM — Managing accounts with AWS Organizations
url: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-accounts.html#securityhub-orgs-account-management-overview
fetched: 2026-11-25
> When you integrate Security Hub CSPM and AWS Organizations, the Organizations management account designates a Security Hub CSPM delegated administrator.
> Security Hub CSPM is automatically enabled in the delegated administrator account in the AWS Region in which it was designated.

## S23 Understanding central configuration in Security Hub CSPM — Understanding central configuration in Security Hub CSPM
url: https://docs.aws.amazon.com/securityhub/latest/userguide/central-configuration-intro.html#central-configuration-intro
fetched: 2026-11-25
> When you use central configuration, the delegated administrator can choose which accounts and OUs to configure.
> If the delegated administrator designates a member account or OU as centrally managed, only the delegated administrator can configure the member account or OU across Regions.
> Configuration policies take effect in the home Region and all linked Regions.

## S24 Managing accounts with declarative policies in Security Hub CSPM — Managing accounts with declarative policies in Security Hub CSPM
url: https://docs.aws.amazon.com/securityhub/latest/userguide/accounts-orgs-policies.html#accounts-orgs-policies
fetched: 2026-11-25
> With an AWS Security Hub CSPM declarative policy, you can centrally enable and configure Security Hub CSPM across the accounts in your organization.
> You can target the organization root, organizational units (OUs), or individual accounts.
> Accounts that join the organization, or move into an OU that has an attached declarative policy, inherit the declarative policy.
> Security Hub CSPM declarative policies replace central configuration as the recommended way to manage Security Hub CSPM across an organization.
> When you attach your first declarative policy, Security Hub CSPM disables central configuration for the entire organization.

## S25 Understanding cross-Region aggregation in Security Hub CSPM — Understanding cross-Region aggregation in Security Hub CSPM
url: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation
fetched: 2026-11-25
> By using cross-Region aggregation in AWS Security Hub CSPM, you can aggregate findings, finding updates, insights, control compliance statuses, and security scores from multiple AWS Regions to a single home Region.
> Security Hub CSPM only aggregates data from Regions where an account has Security Hub CSPM enabled.
> Security Hub CSPM is not automatically enabled for an account based on the cross-Region aggregation configuration.

## S26 About controls in AWS Control Tower — About controls in AWS Control Tower
url: https://docs.aws.amazon.com/controltower/latest/userguide/controls.html#controls
fetched: 2026-11-25
> A control is a high-level rule that provides ongoing governance for your overall AWS environment.
> AWS Control Tower implements preventive, detective, and proactive controls that help you govern your resources and monitor compliance across groups of AWS accounts.
> A control applies to an entire organizational unit (OU), and every AWS account within the OU is affected by the control.

## S27 Infrastructure security in Amazon VPC — Compare security groups and network ACLs
url: https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html#VPC_Security_Comparison
fetched: 2026-11-26
> The following table summarizes the basic differences between security groups and network ACLs.
> Rule type
> Allow rules only
> Allow and deny rules
> Rule evaluation
> Evaluates all rules before deciding whether to allow traffic
> Evaluates rules in ascending order until a match for the traffic is found
> Return traffic
> Automatically allowed (stateful)
> Must be explicitly allowed (stateless)

## S28 Control subnet traffic with network access control lists — Network ACL basics
url: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-basics
fetched: 2026-11-26
> Each rule can either allow or deny traffic.
> Each rule has a number from 1 to 32766.
> We evaluate the rules in order, starting with the lowest numbered rule, when deciding whether allow or deny traffic.
> If the traffic matches a rule, the rule is applied and we do not evaluate any additional rules.
> NACLs are stateless, which means that information about previously sent or received traffic is not saved.
> If, for example, you create a NACL rule to allow specific inbound traffic to a subnet, responses to that traffic are not automatically allowed.
> Security groups are stateful, which means that information about previously sent or received traffic is saved.

## S29 AWS WAF — AWS WAF
url: https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html#waf-chapter
fetched: 2026-11-26
> AWS WAF is a web application firewall that lets you monitor the HTTP(S) requests that are forwarded to your protected web application resources.
> You can protect the following resource types:
> Amazon CloudFront distribution
> Amazon API Gateway REST API
> Application Load Balancer
> AWS WAF lets you control access to your content.

## S30 Using rate-based rule statements in AWS WAF — Rate-based rule statement
url: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based.html#waf-rule-statement-type-rate-based
fetched: 2026-11-26
> A rate-based rule counts incoming requests and rate limits requests when they are coming at too fast a rate.
> The rule aggregates requests according to your criteria, and counts and rate limits the aggregate groupings, based on the rule's evaluation window, request limit, and action settings.
> You can include it directly in a protection pack (web ACL) or rule group.

## S31 GuardDuty foundational data sources — GuardDuty foundational data sources
url: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html#guardduty_data-sources
fetched: 2026-11-26
> GuardDuty uses the foundational data sources to detect communication with known malicious domains and IP addresses, and identify potentially anomalous behavior and unauthorized activity.
> GuardDuty monitors CloudTrail management events, also known as control plane events.
> When you enable GuardDuty, it immediately starts analyzing VPC flow log data from Amazon EC2 instances within your account.
> You don't need to create or configure VPC flow logs in your account for GuardDuty to access this data.

## S32 Managing GuardDuty accounts with AWS Organizations — Managing GuardDuty accounts with AWS Organizations
url: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html#guardduty_organizations
fetched: 2026-11-26
> In an AWS organization, the management account can designate any account within this organization as the delegated GuardDuty administrator account.
> By default, the administrator account can enable and manage GuardDuty for all the member accounts in the organization within that Region.
> The administrator account can view and add members to this AWS organization.
> A delegated GuardDuty administrator account can manage a maximum of 50,000 members.

## S33 How Amazon Detective is used for investigation — How Amazon Detective is used for investigation
url: https://docs.aws.amazon.com/detective/latest/userguide/detective-investigation-about.html#detective-investigation-about
fetched: 2026-11-26
> Amazon Detective makes it easy to analyze, investigate, and quickly identify the root cause of security findings or suspicious activity.
> An investigation in Detective can start from a finding, a finding group, or an entity.
> The investigation process starts when you are notified about a suspected instance of malicious or high-risk activity.
> For example, you are assigned to look into findings or alerts uncovered by services such as Amazon GuardDuty and Amazon Inspector.

## S34 What is Amazon Macie? — Features of Macie
url: https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html#macie-features
fetched: 2026-11-26
> With Macie, you can automate discovery and reporting of sensitive data in two ways: by configuring Macie to perform automated sensitive data discovery, and by creating and running sensitive data discovery jobs.
> Automated sensitive data discovery provides broad visibility into where sensitive data might reside in your Amazon S3 data estate.
> With this option, Macie continually evaluates your S3 bucket inventory and uses sampling techniques to identify and select representative S3 objects from your buckets.
> Sensitive data discovery jobs provide deeper, more targeted analysis.
> With this option, you define the breadth and depth of the analysis—the S3 buckets to analyze, the sampling depth, and custom criteria that derive from properties of S3 objects.

## S35 Running sensitive data discovery jobs — Running sensitive data discovery jobs
url: https://docs.aws.amazon.com/macie/latest/user/discovery-jobs.html#discovery-jobs
fetched: 2026-11-26
> A sensitive data discovery job is a series of automated processing and analysis tasks that Macie performs to detect and report sensitive data in Amazon S3 objects.
> You can configure a job to run only once for on-demand analysis and assessment, or on a recurring basis for periodic analysis, assessment, and monitoring.
> You can configure a job to use managed data identifiers that Macie provides, custom data identifiers that you define, or a combination of the two.
> To fine tune the analysis, you can also configure a job to use allow lists.
> Macie creates a sensitive data discovery result for each object that you configure a job to analyze.
> A sensitive data finding is a detailed report of sensitive data that Macie found in an S3 object.

## S36 Using managed data identifiers — Using managed data identifiers
url: https://docs.aws.amazon.com/macie/latest/user/managed-data-identifiers.html#managed-data-identifiers
fetched: 2026-11-26
> Amazon Macie uses a combination of criteria and techniques, including machine learning and pattern matching, to detect sensitive data in Amazon Simple Storage Service (Amazon S3) objects.
> Each managed data identifier is designed to detect a specific type of sensitive data—for example, AWS secret access keys, credit card numbers, or passport numbers for a particular country or region.
> Within each category, Macie can detect multiple types of sensitive data.
> When you create a sensitive data discovery job or configure settings for automated sensitive data discovery, you can use these IDs to specify which managed data identifiers you want Macie to use when it analyzes S3 objects.

## S37 Building custom data identifiers — Building custom data identifiers
url: https://docs.aws.amazon.com/macie/latest/user/custom-data-identifiers.html#custom-data-identifiers
fetched: 2026-11-26
> A custom data identifier is a set of criteria that you define to detect sensitive data in Amazon Simple Storage Service (Amazon S3) objects.
> The criteria consist of a regular expression (regex) that defines a text pattern to match and, optionally, character sequences and a proximity rule that refine the results.
> With custom data identifiers, you can define detection criteria that reflect your organization's particular scenarios, intellectual property, or proprietary data.
> If you configure sensitive data discovery jobs or automated sensitive data discovery to use these identifiers, you can supplement the managed data identifiers that Macie provides.
> By default, Macie assigns the Medium severity to all the findings that a custom data identifier produces.

## S38 Defining sensitive data exceptions with allow lists — Defining sensitive data exceptions with allow lists
url: https://docs.aws.amazon.com/macie/latest/user/allow-lists.html#allow-lists
fetched: 2026-11-26
> With allow lists in Amazon Macie, you can define specific text and text patterns that you want Macie to ignore when it inspects Amazon Simple Storage Service (Amazon S3) objects for sensitive data.
> If data matches text or a text pattern in an allow list, Macie doesn’t report the data.
> This is the case even if the data matches the criteria of a managed data identifier or a custom data identifier.
> After you create an allow list, you can create and configure sensitive data discovery jobs to use it, or add it to your settings for automated sensitive data discovery.
> If Macie finds text that matches an entry or pattern in an allow list, Macie doesn’t report that occurrence of text in sensitive data findings, statistics, and other types of results.

## S39 Managing multiple Macie accounts as an organization — Managing multiple Macie accounts as an organization
url: https://docs.aws.amazon.com/macie/latest/user/macie-accounts.html#macie-accounts
fetched: 2026-11-26
> In Macie, an organization consists of a designated Macie administrator account and one or more associated member accounts.
> You can associate the accounts in two ways, by integrating Macie with AWS Organizations or by sending and accepting membership invitations in Macie.
> We recommend that you integrate Macie with AWS Organizations.
> In a multiple-account configuration, a designated Macie administrator can perform certain tasks and access certain Macie settings, data, and resources for accounts that are members of the same organization.
> Tasks include reviewing information about S3 buckets that are owned by member accounts, reviewing policy findings for those buckets, and inspecting the buckets for sensitive data.
> If the accounts are associated through AWS Organizations, the Macie administrator can also enable Macie for member accounts in the organization.

## S40 What is Amazon Macie? — Security Hub の名前（従来の表記との食い違い）
url: https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html#macie-features
fetched: 2026-11-26
> You can configure Macie to also publish findings to AWS Security Hub CSPM.

## S41 AWS KMS keys — AWS managed keys（新規受付の停止）
url: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-managed-key
fetched: 2026-11-26
> AWS managed keys are a legacy key type that is no longer being created for new AWS services as of 2021.

## S42 AWS KMS keys — AWS KMS keys
url: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#concepts
fetched: 2026-11-26
> The KMS keys that you create and manage for use in your own cryptographic applications are of a type known as customer managed keys.
> Customer managed keys are recommended for customers who want full control over the lifecycle and usage of their keys.
> Use customer managed keys when control is important, but use AWS owned keys when convenience is most important.

## S43 AWS KMS keys — Customer managed keys
url: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#customer-mgn-key
fetched: 2026-11-26
> Customer managed keys are KMS keys in your AWS account that you create, own, and manage.
> You have full control over these KMS keys, including establishing and maintaining their key policies, IAM policies, and grants, enabling and disabling them, rotating their cryptographic material, adding tags, creating aliases that refer to the KMS keys, and scheduling the KMS keys for deletion.

## S44 AWS KMS keys — AWS managed keys
url: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-managed-key
fetched: 2026-11-26
> AWS managed keys are KMS keys in your account that are created, managed, and used on your behalf by an AWS service integrated with AWS KMS.
> All AWS managed keys are automatically rotated every year.

## S45 AWS KMS keys — AWS owned keys
url: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-owned-key
fetched: 2026-11-26
> AWS owned keys are a collection of KMS keys that an AWS service owns and manages for use in multiple AWS accounts.
> Because these keys are owned and managed by AWS, you are not charged for their existence or their usage, you cannot change their policies, you cannot audit activities on these keys, and you cannot delete them.

## S46 Rotate AWS KMS keys — Rotate AWS KMS keys
url: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html#rotate-keys
fetched: 2026-11-26
> By default, when you enable automatic key rotation for a KMS key, AWS KMS generates new cryptographic material for the KMS key every year.
> Key rotation changes only the current key material, which is the cryptographic secret that is used in encryption operations.
> Manual rotation is a good choice when you want to rotate KMS keys that are not eligible for automatic or on-demand key rotation, including asymmetric KMS keys, HMAC KMS keys and KMS keys in custom key stores.

## S47 Rotate AWS KMS keys — Key rotation has no effect on data
url: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html#rotate-keys
fetched: 2026-11-26
> Key rotation has no effect on the data that the KMS key protects.
> Key rotation will not mitigate the effect of a compromised data key.

## S48 Managed certificate renewal in AWS Certificate Manager — Managed certificate renewal
url: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html#managed-renewal
fetched: 2026-11-26
> ACM provides managed renewal for your Amazon-issued SSL/TLS certificates.
> This means that ACM will either renew your certificates automatically (if you are using DNS validation), or it will send you email notices when expiration is approaching.
> When ACM renews a certificate, the certificate's Amazon Resource Name (ARN) remains the same.
> Certificates issued through ACME certificate automation are not eligible for ACM managed renewal.

## S49 What is AWS CloudHSM? — What is AWS CloudHSM?
url: https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html#introduction
fetched: 2026-11-26
> AWS CloudHSM combines the benefits of the AWS cloud with the security of hardware security modules (HSMs).
> HSMs are general purpose, single tenant, and either FIPS 140-2 level-3 or FIPS 140-3 level-3 validated for clusters in FIPS mode
> You can generate, store, import, export, manage, and use cryptographic keys (including, session keys, token keys, symmetric keys and asymmetric key pairs).
> Because your data plane is end-to-end (E2E) encrypted and not visible to AWS, you control your own user management (outside of IAM roles).

## S50 Reducing the cost of SSE-KMS with Amazon S3 Bucket Keys — S3 Bucket Keys for SSE-KMS
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-key.html#bucket-key-overview
fetched: 2026-11-26
> Using a bucket-level key for SSE-KMS can reduce AWS KMS request costs by up to 99 percent by decreasing the request traffic from Amazon S3 to AWS KMS.
> When you configure an S3 Bucket Key, objects that are already in the bucket do not use the S3 Bucket Key.
> Amazon S3 will only share an S3 Bucket Key for objects encrypted by the same AWS KMS key.

### 覆えなかった行
- knowledge「Network security components」の AWS Shield: 取った本文に Shield の説明が無い（AWS WAF のページは題に Shield Advanced を含むが、本文は取っていない）。
- skill「Automating the application of security controls」の AWS Systems Manager: 出典が無い。
- skill「Combining security controls to apply defense in depth」の AWS Config と AWS Config rules: 出典が無い。
