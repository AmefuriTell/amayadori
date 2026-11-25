## S1 Update CloudFormation stacks using change sets — Change set overview
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html#using-cfn-updating-stacks-changesets
fetched: 2026-11-25
> When you need to update a stack, understanding how your changes will affect running resources before you implement them can help you update stacks with confidence. Change sets allow you to preview how proposed changes to a stack might impact your running resources, including the impact on resource properties and attributes. Whether your changes will delete or replace any critical resources, CloudFormation makes the changes to your stack only when you decide to execute the change set, allowing you to decide whether to proceed with your proposed changes or explore other changes by creating another change set.
> View the change set to see which stack settings and resources will change. For example, you can see which resources CloudFormation will add, modify, or delete.
> After you execute a change, CloudFormation removes all change sets that are associated with the stack because they aren't applicable to the updated stack.

## S2 DeletionPolicy attribute — DeletionPolicy attribute
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy
fetched: 2026-11-25
> With the DeletionPolicy attribute you can preserve, and in some cases, backup a resource when its stack is deleted. You specify a DeletionPolicy attribute for each resource that you want to control. If a resource has no DeletionPolicy attribute, CloudFormation deletes the resource by default.
> This capability also applies to stack update operations that lead to resources being deleted from stacks.
> Exception: The default policy is Snapshot for AWS::RDS::DBCluster resources and for AWS::RDS::DBInstance resources that don't specify the DBClusterIdentifier property.
> To keep a resource when its stack is deleted, specify Retain for that resource. You can use Retain for any resource.
> For resources that support snapshots, such as AWS::EC2::Volume, specify Snapshot to have CloudFormation create a snapshot before deleting the resource.

## S3 Get exported outputs from a deployed CloudFormation stack — Considerations
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-exports.html#using-cfn-stack-exports-considerations
fetched: 2026-11-25
> The following restrictions apply to cross-stack references:
> For each AWS account, Export names must be unique within a Region.
> When using Export and Fn::ImportValue, cross-stack references are limited to the same account and Region. To reference stack outputs across accounts or Regions, use Fn::GetStackOutput.
> After another stack imports an output value, you can't delete the stack that is exporting the output value or modify the exported output value. All the imports must be removed before you can delete the exporting stack or modify the output value.

## S4 CloudFormation resources generated when AWS::Serverless::Function is specified — AutoPublishAlias and DeploymentPreference
url: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-generated-resources-function.html#sam-specification-generated-resources-function-autopublishalias
fetched: 2026-11-25
> When the AutoPublishAlias property of an AWS::Serverless::Function is specified, AWS SAM generates the following CloudFormation resources: AWS::Lambda::Alias and AWS::Lambda::Version.
> When the DeploymentPreference property of an AWS::Serverless::Function is specified, AWS SAM generates the following resources CloudFormation resources: AWS::CodeDeploy::Application and AWS::CodeDeploy::DeploymentGroup. In addition, if the Role property of the DeploymentPreference object is not specified, AWS SAM also generates an AWS::IAM::Role CloudFormation resource.

## S5 cdk bootstrap — Arguments and description
url: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-bootstrap.html#ref-cli-cmd-bootstrap
fetched: 2026-11-25
> Prepare an AWS environment for CDK deployments by deploying the CDK bootstrap stack, named CDKToolkit, into the AWS environment.
> The bootstrap stack is a CloudFormation stack that provisions an Amazon S3 bucket and Amazon ECR repository in the AWS environment.
> The AWS CDK CLI uses these resources to store synthesized templates and related assets during deployment.
> This argument can be provided multiple times in a single command to deploy the bootstrap stack to multiple environments.

## S6 cdk deploy — Description
url: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy
fetched: 2026-11-25
> Deploy one or more AWS CDK stacks into your AWS environment.
> If the AWS environment is not bootstrapped, only stacks without assets and with synthesized templates under 51,200 bytes will successfully deploy.
> Deploy all stacks in your CDK app.
