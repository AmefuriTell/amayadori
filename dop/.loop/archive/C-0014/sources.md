## S1 AWS CodeArtifact authentication and tokens - CodeArtifact — AWS CodeArtifact authentication and tokens
url: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#tokens-authentication
fetched: 2026-11-26
> CodeArtifact authorization tokens are valid for a default period of 12 hours.
> Tokens can be configured with a lifetime between 15 minutes and 12 hours.
> When the lifetime expires, you must fetch another token.
> The token lifetime begins after login or get-authorization-token is called.

## S2 AWS CodeArtifact authentication and tokens - CodeArtifact — Permissions required to call the GetAuthorizationToken API
url: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#get-auth-token-permissions
fetched: 2026-11-26
> Both the sts:GetServiceBearerToken and the codeartifact:GetAuthorizationToken permissions are required to call the CodeArtifact GetAuthorizationToken API.
> To use a package manager with a CodeArtifact repository, your IAM user or role must allow sts:GetServiceBearerToken.
> Root users cannot call GetAuthorizationToken.

## S3 Identity-based policy examples for AWS CodeArtifact - CodeArtifact — AWS managed (predefined) policies for AWS CodeArtifact
url: https://docs.aws.amazon.com/codeartifact/latest/ug/security_iam_id-based-policy-examples.html#managed-policies
fetched: 2026-11-26
> The following AWS managed policies, which you can attach to users in your account, are specific to AWS CodeArtifact.
> AWSCodeArtifactReadOnlyAccess – Provides read-only access to CodeArtifact.

## S4 Identity-based policy examples for AWS CodeArtifact - CodeArtifact — Allow a user to get information about repositories and domains
url: https://docs.aws.amazon.com/codeartifact/latest/ug/security_iam_id-based-policy-examples.html#security_iam_id-based-policy-examples-repos-and-domains
fetched: 2026-11-26
> The following policy allows an IAM user or role to list and describe any type of CodeArtifact resource, including domains, repositories, packages, and assets.
> The policy also includes the codeArtifact:ReadFromRepository permission, which allows the principal to fetch packages from a CodeArtifact repository.
> It does not allow creating new domains or repositories and does not allow publishing new packages.

## S5 Amazon ECS task execution IAM role - Amazon Elastic Container Service — Amazon ECS task execution IAM role
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html#task_execution_IAM_role
fetched: 2026-11-26
> The task execution role grants the Amazon ECS container and Fargate agents permission to make AWS API calls on your behalf.
> These permissions are made available to the agent running on your instance by Amazon ECS periodically sending it the role's temporary credentials, but they aren't directly accessible by the containers in the task.
> For the IAM permissions that your application code inside the container needs to run, see Amazon ECS task IAM role.

## S6 Amazon ECS task execution IAM role - Amazon Elastic Container Service — Amazon ECR permissions
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html#task-execution-ecr-permissions
fetched: 2026-11-26
> The task execution role should have these permissions to allow the Amazon ECS container and Fargate agents to pull container images on your behalf.
> For basic ECS implementations, these permissions should be added to the task execution role rather than the task IAM role.
> The Amazon ECS task execution role managed policy (AmazonECSTaskExecutionRolePolicy) includes the necessary permissions for pulling images from Amazon ECR.
> Note that these permissions are different from the permissions that might be required in the task IAM role if your application code needs to interact with Amazon ECR APIs directly.

## S7 Step 4: Create an IAM instance profile for your Amazon EC2 instances - AWS CodeDeploy — Step 4: Create an IAM instance profile for your Amazon EC2 instances
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/getting-started-create-iam-instance-profile.html#getting-started-create-iam-instance-profile
fetched: 2026-11-26
> Your Amazon EC2 instances need permission to access the Amazon S3 buckets or GitHub repositories where the applications are stored.
> This role gives the CodeDeploy agent permission to access the Amazon S3 buckets or GitHub repositories where your applications are stored.
> We recommend that you restrict this policy to only those Amazon S3 buckets your Amazon EC2 instances must access.
