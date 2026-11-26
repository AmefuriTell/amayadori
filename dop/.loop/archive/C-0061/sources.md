## S1 Setting Up Auto Remediation for AWS Config — Setting Up Auto Remediation (Console)
url: https://docs.aws.amazon.com/config/latest/developerguide/setup-autoremediation.html#setup-autoremediation
fetched: 2026-11-26
> In the AWS Management Console, you can either choose to automatically remediate noncompliant resources by associating remediation actions with AWS Config rules.
> With all remediation actions, you can either choose manual or automatic remediation.
> From the Actions dropdown list, choose Manage remediation. Select "Automatic remediation" and then choose the appropriate remediation action from the list.
> Depending on the selected remediation action, you see specific parameters or no parameters.
> Choose Auto remediation to automatically remediate noncompliant resources.
> If a resource is still noncompliant after auto remediation, you can set the rule to try auto remediation again. Enter the desired retries and seconds.
> Retries only occur if remediation fails and work within the specified time period; for example, 5 retries in 300 seconds.
> Each parameter has either a static value or a dynamic value.
> You can only manage remediations for non-service linked AWS Config rules.

## S2 Setting Up Auto Remediation for AWS Config — Setting Up Auto Remediation (API)
url: https://docs.aws.amazon.com/config/latest/developerguide/setup-autoremediation.html#setup-autoremediation
fetched: 2026-11-26
> PutRemediationConfigurations, adds or updates the remediation configuration with a specific AWS Config rule with the selected target or action.
> If you enable auto remediation for a specific AWS Config rule using the PutRemediationConfigurations API or the AWS Config console, it initiates the remediation process for all noncompliant resources for that specific rule.
> The auto remediation process relies on the compliance data snapshot which is captured on a periodic basis.
> DescribeRemediationExecutionStatus, provides a detailed view of a Remediation Execution for a set of resources including state, timestamps for when steps for the remediation execution occur, and any error messages for steps that have failed.

## S3 Remediating Noncompliant Resources with AWS Config — Remediating Noncompliant Resources with AWS Config
url: https://docs.aws.amazon.com/config/latest/developerguide/remediation.html#remediation
fetched: 2026-11-26
> AWS Config allows you to remediate noncompliant resources that are evaluated by AWS Config Rules.
> AWS Config applies remediation using AWS Systems Manager Automation documents.
> These documents define the actions to be performed on noncompliant AWS resources evaluated by AWS Config Rules.
> You can associate SSM documents by using AWS Management Console or by using APIs.
> AWS Config provides a set of managed automation documents with remediation actions.

## S4 Remediating Noncompliant Resources with AWS Config — Region Support
url: https://docs.aws.amazon.com/config/latest/developerguide/remediation.html#region-support-config-remediation
fetched: 2026-11-26
> Currently, remediation actions for AWS Config Rules is supported in the following regions:

## S5 Evaluating Resources with AWS Config Rules — Evaluating Resources with AWS Config Rules
url: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config.html#evaluate-config
fetched: 2026-11-26
> Use AWS Config to evaluate the configuration settings of your AWS resources.
> You do this by creating AWS Config rules, which represent your ideal configuration settings.
> If you record a global IAM resource type in at least one Region, periodic rules that report compliance on the global IAM resource type will run evaluations in all Regions where the periodic rule is added, even if you have not enabled the recording of the global IAM resource type in the Region where the periodic rule was added.

## S6 AWS Config Custom Rules — AWS Config Custom Policy Rules
url: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_develop-rules.html#evaluate-config_develop-rules-policy
fetched: 2026-11-26
> AWS Config Custom Policy rules are initiated by configuration changes.
> AWS Config Custom Policy rules allow you to create AWS Config Custom rules without needing to use Java or Python to develop Lambda functions to manage your custom rules.

## S7 AWS Config Custom Rules — AWS Config Custom Lambda Rules
url: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_develop-rules.html#evaluate-config_develop-rules-lambda
fetched: 2026-11-26
> If the Lambda function is associated with an AWS Config rule, AWS Config invokes it when the rule is initiated.
> The Lambda function then evaluates the configuration information that is sent by AWS Config, and it returns the evaluation results.
