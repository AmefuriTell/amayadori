## S1 Infrastructure security in Amazon VPC — Compare security groups and network ACLs
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

## S2 Control subnet traffic with network access control lists — Network ACL basics
url: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-basics
fetched: 2026-11-26
> Each rule can either allow or deny traffic.
> Each rule has a number from 1 to 32766.
> We evaluate the rules in order, starting with the lowest numbered rule, when deciding whether allow or deny traffic.
> If the traffic matches a rule, the rule is applied and we do not evaluate any additional rules.
> NACLs are stateless, which means that information about previously sent or received traffic is not saved.
> If, for example, you create a NACL rule to allow specific inbound traffic to a subnet, responses to that traffic are not automatically allowed.
> Security groups are stateful, which means that information about previously sent or received traffic is saved.

## S3 AWS WAF — AWS WAF
url: https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html#waf-chapter
fetched: 2026-11-26
> AWS WAF is a web application firewall that lets you monitor the HTTP(S) requests that are forwarded to your protected web application resources.
> You can protect the following resource types:
> Amazon CloudFront distribution
> Amazon API Gateway REST API
> Application Load Balancer
> AWS WAF lets you control access to your content.

## S4 Using rate-based rule statements in AWS WAF — Rate-based rule statement
url: https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based.html#waf-rule-statement-type-rate-based
fetched: 2026-11-26
> A rate-based rule counts incoming requests and rate limits requests when they are coming at too fast a rate.
> The rule aggregates requests according to your criteria, and counts and rate limits the aggregate groupings, based on the rule's evaluation window, request limit, and action settings.
> You can include it directly in a protection pack (web ACL) or rule group.

## S5 GuardDuty foundational data sources — GuardDuty foundational data sources
url: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html#guardduty_data-sources
fetched: 2026-11-26
> GuardDuty uses the foundational data sources to detect communication with known malicious domains and IP addresses, and identify potentially anomalous behavior and unauthorized activity.
> GuardDuty monitors CloudTrail management events, also known as control plane events.
> When you enable GuardDuty, it immediately starts analyzing VPC flow log data from Amazon EC2 instances within your account.
> You don't need to create or configure VPC flow logs in your account for GuardDuty to access this data.

## S6 Managing GuardDuty accounts with AWS Organizations — Managing GuardDuty accounts with AWS Organizations
url: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html#guardduty_organizations
fetched: 2026-11-26
> In an AWS organization, the management account can designate any account within this organization as the delegated GuardDuty administrator account.
> By default, the administrator account can enable and manage GuardDuty for all the member accounts in the organization within that Region.
> The administrator account can view and add members to this AWS organization.
> A delegated GuardDuty administrator account can manage a maximum of 50,000 members.

## S7 How Amazon Detective is used for investigation — How Amazon Detective is used for investigation
url: https://docs.aws.amazon.com/detective/latest/userguide/detective-investigation-about.html#detective-investigation-about
fetched: 2026-11-26
> Amazon Detective makes it easy to analyze, investigate, and quickly identify the root cause of security findings or suspicious activity.
> An investigation in Detective can start from a finding, a finding group, or an entity.
> The investigation process starts when you are notified about a suspected instance of malicious or high-risk activity.
> For example, you are assigned to look into findings or alerts uncovered by services such as Amazon GuardDuty and Amazon Inspector.
