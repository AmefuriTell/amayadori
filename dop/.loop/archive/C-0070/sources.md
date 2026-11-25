## S1 Permissions boundaries for IAM entities — Permissions boundaries for IAM entities
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries
fetched: 2026-11-25
> AWS supports permissions boundaries for IAM entities (users or roles). A permissions boundary is an advanced feature for using a managed policy to set the maximum permissions that an identity-based policy can grant to an IAM entity. An entity's permissions boundary allows it to perform only the actions that are allowed by both its identity-based policies and its permissions boundaries.

## S2 Permissions boundaries for IAM entities — Evaluating effective permissions with boundaries
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries-eval-logic
fetched: 2026-11-25
> If any one of these policy types explicitly denies access for an operation, then the request is denied. Identity-based policies grant permission to the entity, and permissions boundaries limit those permissions. The effective permissions are the intersection of both policy types. An explicit deny in either of these policies overrides the allow.

## S3 Security best practices in IAM — Use permissions boundaries to delegate permissions management within an account
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#bp-permissions-boundaries
fetched: 2026-11-25
> In some scenarios, you might want to delegate permissions management within an account to others. For example, you could allow developers to create and manage roles for their workloads. When you delegate permissions to others, use permissions boundaries to set the maximum permissions that you delegate. A permissions boundary does not grant permissions on its own.

## S4 Security best practices in IAM — Use IAM Access Analyzer to generate least-privilege policies based on access activity
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#bp-gen-least-privilege-policies
fetched: 2026-11-25
> To grant only the permissions required to perform a task, you can generate policies based on your access activity that is logged in AWS CloudTrail. IAM Access Analyzer analyzes the services and actions that your IAM roles use, and then generates a fine-grained policy that you can use. After you test each generated policy, you can deploy the policy to your production environment. This ensures that you grant only the required permissions to your workloads.

## S5 Security best practices in IAM — Regularly review and remove unused users, roles, permissions, policies, and credentials
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#remove-credentials
fetched: 2026-11-25
> You might have IAM users, roles, permissions, policies, or credentials that you no longer need in your AWS account. IAM provides last accessed information to help you identify the users, roles, permissions, policies, and credentials that you no longer need so that you can remove them. You can also use this information to refine your IAM policies to better adhere to least-privilege permissions.

## S6 Using AWS Identity and Access Management Access Analyzer — Identifying resources shared with an external entity
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-resource-identification
fetched: 2026-11-25
> IAM Access Analyzer helps you identify the resources in your organization and accounts, such as Amazon S3 buckets or IAM roles, shared with an external entity. This lets you identify unintended access to your resources and data, which is a security risk. IAM Access Analyzer identifies resources shared with external principals by using logic-based reasoning to analyze the resource-based policies in your AWS environment. For each instance of a resource shared outside of your account, IAM Access Analyzer generates a finding.
