## S1 Managing stacks across accounts and Regions with StackSets - AWS CloudFormation — Managing stacks across accounts and Regions with StackSets
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html#what-is-cfnstacksets
fetched: 2026-11-26
> CloudFormation StackSets extends the capability of stacks by allowing you to create, update, or delete stacks across multiple accounts and AWS Regions with a single operation. Using an administrator account, you define and manage a CloudFormation template, and use the template as the basis for provisioning stacks into selected target accounts across specified AWS Regions.

## S2 Add stacks to CloudFormation StackSets - AWS CloudFormation — Add stacks to a StackSet (console)
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stackinstances-create.html#stackinstances-create-console
fetched: 2026-11-26
> By default, CloudFormation will deploy stacks in the specified accounts within the first Region, then moves on to the next, and so on, as long as a Region's deployment failures don't exceed a specified failure tolerance. For Maximum concurrent accounts, specify how many accounts are processed concurrently. For Failure tolerance, specify the maximum number of account failures allowed per Region. The operation will stop and won't proceed to other Regions once this limit is reached. For Region concurrency, choose how to process Regions: Sequential (one Region at a time) or Parallel (multiple Regions concurrently). For Concurrency mode, choose how concurrency behaves during operation execution.

## S3 Choose the Concurrency Mode for CloudFormation StackSets - AWS CloudFormation — Choose the Concurrency Mode for CloudFormation StackSets
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/concurrency-mode.html#concurrency-mode
fetched: 2026-11-26
> Concurrency Mode is a parameter for StackSetOperationPreferences that allows you to choose how the concurrency level behaves during StackSet operations. Strict Failure Tolerance: This option dynamically lowers the concurrency level to ensure the number of failed accounts never exceeds the value of Failure tolerance +1. The initial actual concurrency is set to the lower of either the value of the Maximum concurrent accounts, or the value of Failure tolerance +1. This is the default behavior. Soft Failure Tolerance: This option decouples Failure tolerance from the actual concurrency. This allows StackSet operations to run at the concurrency level set by the Maximum concurrent accounts value, regardless of the number of failures.

## S4 Choose the Concurrency Mode for CloudFormation StackSets - AWS CloudFormation — Choosing your Concurrency Mode (AWS CLI)
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/concurrency-mode.html#concurrency-mode-cli
fetched: 2026-11-26
> You can use the ConcurrencyMode parameter with the following StackSets commands: create-stack-instances delete-stack-instances detect-stack-set-drift import-stacks-to-stack-set update-stack-instances update-stack-set These commands have an existing parameter called --operation-preferences that can use the ConcurrencyMode setting. ConcurrencyMode can be set to one of the following values: STRICT_FAILURE_TOLERANCE SOFT_FAILURE_TOLERANCE

## S5 Override parameter values on stacks within your CloudFormation StackSet - AWS CloudFormation — Override parameter values on stacks within your CloudFormation StackSet
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stackinstances-override.html#stackinstances-override
fetched: 2026-11-26
> In certain cases, you might want stacks in certain Regions or accounts to have different property values than those specified in the StackSet itself. You can override template parameter values when you first create the stacks, and you can override parameter values for existing stacks. You can only set parameters you've previously overridden in stacks back to the values specified in the StackSet. Parameter value overrides apply to stacks in the accounts and Regions you select. During StackSet updates, any parameter values overridden for a stack aren't updated, but retain their overridden value. You can only override parameter values that are specified in the StackSet; to add or delete a parameter itself, you need to update the StackSet template.

## S6 Performing drift detection on CloudFormation StackSets - AWS CloudFormation — How CloudFormation performs drift detection on a StackSet
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-drift.html#stacksets-drift-how
fetched: 2026-11-26
> If one or more stack instances in a StackSet have drifted, the StackSet itself is considered to have drifted. Drift detection identifies unmanaged changes; that is, changes made to stacks outside of CloudFormation. Changes made through CloudFormation to a stack directly, rather than at the StackSet level, aren't considered drift. Because CloudFormation performs drift detection on each stack individually, it takes any overridden parameter values into account when determining whether a stack has drifted. You can only run a single drift detection operation on a given StackSet at one time.

## S7 Register a delegated administrator member account - AWS CloudFormation — Register a delegated administrator member account
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-delegated-admin.html#stacksets-orgs-delegated-admin
fetched: 2026-11-26
> In addition to your organization's management account, member accounts with delegated administrator permissions can create and manage StackSets with service-managed permissions for the organization. StackSets with service-managed permissions are created in the management account, including StackSets created by delegated administrators. Your organization can have up to five registered delegated administrators at one time. Delegated administrators have full permissions to deploy to accounts in your organization. The management account can't limit delegated administrator permissions to deploy to specific OUs or to perform specific StackSet operations. You can register and deregister delegated administrators using the CloudFormation console, AWS CLI, or AWS SDKs.
