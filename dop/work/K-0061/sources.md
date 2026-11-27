## S1 Overview of Deployment Options on AWS — AWS CodeDeploy
url: https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/aws-codedeploy.html#aws-codedeploy
fetched: 2026-11-26
> AWS CodeDeploy is a fully managed deployment service that
> automates application deployments to compute services such as
> Amazon EC2, Amazon Elastic Container Service (Amazon ECS),
> AWS Lambda, or on-premises servers. Organizations can use
> CodeDeploy to automate deployments of an application and remove
> error prone manual operations from the deployment process.

## S2 Continuous Deployment with Argo CD — Continuous Deployment with Argo CD
url: https://docs.aws.amazon.com/eks/latest/userguide/argocd.html#argocd
fetched: 2026-11-26
> Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes.
> With Argo CD, you can automate the deployment and lifecycle management of your applications across multiple clusters and environments.
> Argo CD follows the GitOps pattern, where your application source (Git repository, Helm registry, or OCI image) is the source of truth for defining the desired application state.

## S3 Deploy a sample application on Linux — Deploy a sample application on Linux
url: https://docs.aws.amazon.com/eks/latest/userguide/sample-deployment.html#sample-deployment
fetched: 2026-11-26
> Apply the deployment manifest to your cluster.
> kubectl apply -f eks-sample-deployment.yaml

## S4 Deployments on an AWS Lambda Compute Platform — Redeployments and deployment rollbacks
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-lambda.html#deployment-rollback-lambda
fetched: 2026-11-26
> CodeDeploy implements rollbacks by redeploying, as a new deployment, a previously deployed
> revision.
> You can configure a deployment group to automatically roll back deployments when certain
> conditions are met, including when a deployment fails or an alarm monitoring threshold is
> met.
> You can also choose to roll back a failed deployment by manually redeploying a
> previously deployed revision.

## S5 What is Amazon Elastic File System? — What is Amazon Elastic File System?
url: https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html#whatisefs
fetched: 2026-11-26
> Amazon Elastic File System (Amazon EFS) provides serverless, fully elastic file storage so that you can share file
> data without provisioning or managing storage capacity and performance.
> Amazon EFS is accessible across
> most types of Amazon Web Services compute instances, including Amazon EC2, Amazon ECS, Amazon EKS, AWS Lambda,
> and AWS Fargate.

## S6 What is Amazon S3? — What is Amazon S3?
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#Welcome
fetched: 2026-11-26
> Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability,
> data availability, security, and performance. Customers of all sizes and industries can use
> Amazon S3 to store and protect any amount of data for a range of use cases, such as data lakes,
> websites, mobile applications, backup and restore, archive, enterprise applications, IoT
> devices, and big data analytics.

## S7 What is Amazon Elastic Block Store? — What is Amazon Elastic Block Store?
url: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html#what-is-ebs
fetched: 2026-11-26
> Amazon Elastic Block Store (Amazon EBS) provides scalable, high-performance block storage
> resources that can be used with Amazon Elastic Compute Cloud (Amazon EC2) instances.
> Amazon EBS volumes — These are storage
> volumes that you attach to Amazon EC2 instances.

## S8 In-place deployments — In-place deployments
url: https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/in-place-deployments.html#in-place-deployments
fetched: 2026-11-26
> An in-place deployment is a deployment strategy that updates the
> application version without replacing any infrastructure
> components.
> In an in-place deployment, the previous version of the
> application on each compute resource is stopped, the latest
> application is installed, and the new version of the application
> is started and validated.

## S9 Immutable environment updates — Immutable environment updates
url: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environmentmgmt-updates-immutable.html#environmentmgmt-updates-immutable
fetched: 2026-11-26
> Immutable environment updates are an alternative to rolling updates.
> If an immutable environment update fails, the
> rollback process requires only terminating an Auto Scaling group.
> A failed rolling update, on the other hand, requires performing an additional rolling update to
> roll back the changes.

## S10 What is Image Builder? — What is Image Builder?
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#what-is-image-builder
fetched: 2026-11-26
> EC2 Image Builder is a fully managed AWS service that helps you to automate the creation,
> management, and deployment of customized, secure, and up-to-date server images.
> You can configure
> pipelines to automate updates and system patching for the images that you own.

## S11 AWS CodeArtifact authentication and tokens — AWS CodeArtifact authentication and tokens
url: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#tokens-authentication
fetched: 2026-11-26
> You must authenticate to the CodeArtifact service by creating an authorization token using your AWS credentials.
> In order to create an authorization token, you must have the correct permissions.

## S12 Working with the CodeDeploy agent — Working with the CodeDeploy agent
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent.html#codedeploy-agent
fetched: 2026-11-26
> The AWS CodeDeploy agent is a software package that, when installed and configured on an
> instance, makes it possible for that instance to be used in CodeDeploy deployments.

## S13 Troubleshoot EC2/On-Premises deployment issues — CodeDeploy plugin CommandPoller missing credentials error
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-agent-commandpoller-error
fetched: 2026-11-26
> An IAM instance profile grants the CodeDeploy agent permission to communicate with CodeDeploy
> and to download your revision from Amazon S3.
> Your IAM instance profile does not have the correct permissions configured.

## S14 Troubleshoot AWS Lambda deployment issues — AWS Lambda deployments fail after manually stopping a Lambda deployment that does not have configured rollbacks
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments-lambda.html#troubleshooting-manually-stopped-lambda-deployment
fetched: 2026-11-26
> In some cases, the alias of a Lambda function specified in a deployment might reference
> two different versions of the function. The result is that subsequent attempts to deploy the
> Lambda function fail. A Lambda deployment can get in this state when it does not have
> rollbacks configured and is manually stopped.

## S15 AppSpec 'hooks' section — List of lifecycle event hooks for an AWS Lambda deployment
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-list-lambda
fetched: 2026-11-26
> An AWS Lambda hook is one Lambda function specified with a string on a
> new line after the name of the lifecycle event. Each hook is executed once per
> deployment.
> BeforeAllowTraffic – Use to run tasks
> before traffic is shifted to the deployed Lambda function version.
> AfterAllowTraffic – Use to run tasks
> after all traffic is shifted to the deployed Lambda function version.

## S16 AppSpec 'hooks' section — Sample Lambda 'hooks' function
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-section-structure-lambda-sample-function
fetched: 2026-11-26
> Following completion of the validation tests, the Lambda validation
> function calls back CodeDeploy and delivers a result of Succeeded or
> Failed.
> The deployment is considered to have failed if CodeDeploy is not notified by the Lambda
> validation function within one hour.

## S17 Redeploy and roll back a deployment with CodeDeploy — Automatic rollbacks
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html#deployments-rollback-and-redeploy-automatic-rollbacks
fetched: 2026-11-26
> You can configure a deployment group or deployment to automatically roll back when a
> deployment fails or when a monitoring threshold you specify is met. In this case, the last
> known good version of an application revision is deployed.

## S18 Implement Lambda canary deployments using a weighted alias — Implement Lambda canary deployments using a weighted alias
url: https://docs.aws.amazon.com/lambda/latest/dg/configuring-alias-routing.html#configuring-alias-routing
fetched: 2026-11-26
> You can use a weighted alias to split traffic between two different versions of the same function. With this approach, you can test new versions of your functions with a small percentage of traffic and quickly roll back if necessary. This is known as a canary deployment. Canary deployments differ from blue/green deployments by exposing the new version to only a portion of requests rather than switching all traffic at once.

## S19 Create a deployment group for an EC2/On-Premises blue/green deployment (console) — Create a deployment group for an EC2/On-Premises blue/green deployment (console)
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-blue-green.html#deployment-groups-create-blue-green
fetched: 2026-11-26
> identify the instances in your original environment (that is, the
> instances you want to replace or that are running the current
> application revision).
> automatically, causing traffic to be rerouted to
> them. Instances in the original environment are then
> deregistered.

## S20 CodeDeploy blue/green deployments for Amazon ECS — CodeDeploy blue/green deployments for Amazon ECS
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html#deployment-type-bluegreen
fetched: 2026-11-26
> There are three ways traffic can shift during a blue/green deployment:
> Canary — Traffic is shifted in two
> increments.
> Linear — Traffic is shifted in
> equal increments with an equal number of minutes between each increment.
> All-at-once — All traffic is
> shifted from the original task set to the updated task set all at
> once.
> You must configure the service to use either an Application Load Balancer or Network Load Balancer.

## S21 Network Load Balancer resources for Amazon ECS blue/green, linear and canary deployments — Network Load Balancer resources for Amazon ECS blue/green, linear and canary deployments
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/nlb-resources-for-blue-green.html#nlb-resources-for-blue-green
fetched: 2026-11-26
> When your configuration includes a Network Load Balancer, Amazon ECS adds a 10 minute delay to the following
> lifecycle stages:
> TEST_TRAFFIC_SHIFT
> PRODUCTION_TRAFFIC_SHIFT

## S22 AppSpec 'hooks' section for an Amazon ECS deployment — List of lifecycle event hooks for an Amazon ECS deployment
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-list-ecs
fetched: 2026-11-26
> BeforeInstall – Use to run tasks before the replacement task set
> is created. One target group is associated with the original task set. If an
> optional test listener is specified, it is associated with the original task set. A
> rollback is not possible at this point.
> AfterInstall – Use to run tasks after the replacement task set is
> created and one of the target groups is associated with it.

## S23 AWS CodeArtifact authentication and tokens - CodeArtifact — AWS CodeArtifact authentication and tokens
url: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#tokens-authentication
fetched: 2026-11-26
> CodeArtifact authorization tokens are valid for a default period of 12 hours.
> Tokens can be configured with a lifetime between 15 minutes and 12 hours.
> When the lifetime expires, you must fetch another token.
> The token lifetime begins after login or get-authorization-token is called.

## S24 AWS CodeArtifact authentication and tokens - CodeArtifact — Permissions required to call the GetAuthorizationToken API
url: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#get-auth-token-permissions
fetched: 2026-11-26
> Both the sts:GetServiceBearerToken and the codeartifact:GetAuthorizationToken permissions are required to call the CodeArtifact GetAuthorizationToken API.
> To use a package manager with a CodeArtifact repository, your IAM user or role must allow sts:GetServiceBearerToken.
> Root users cannot call GetAuthorizationToken.

## S25 Identity-based policy examples for AWS CodeArtifact - CodeArtifact — AWS managed (predefined) policies for AWS CodeArtifact
url: https://docs.aws.amazon.com/codeartifact/latest/ug/security_iam_id-based-policy-examples.html#managed-policies
fetched: 2026-11-26
> The following AWS managed policies, which you can attach to users in your account, are specific to AWS CodeArtifact.
> AWSCodeArtifactReadOnlyAccess – Provides read-only access to CodeArtifact.

## S26 Identity-based policy examples for AWS CodeArtifact - CodeArtifact — Allow a user to get information about repositories and domains
url: https://docs.aws.amazon.com/codeartifact/latest/ug/security_iam_id-based-policy-examples.html#security_iam_id-based-policy-examples-repos-and-domains
fetched: 2026-11-26
> The following policy allows an IAM user or role to list and describe any type of CodeArtifact resource, including domains, repositories, packages, and assets.
> The policy also includes the codeArtifact:ReadFromRepository permission, which allows the principal to fetch packages from a CodeArtifact repository.
> It does not allow creating new domains or repositories and does not allow publishing new packages.

## S27 Amazon ECS task execution IAM role - Amazon Elastic Container Service — Amazon ECS task execution IAM role
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html#task_execution_IAM_role
fetched: 2026-11-26
> The task execution role grants the Amazon ECS container and Fargate agents permission to make AWS API calls on your behalf.
> These permissions are made available to the agent running on your instance by Amazon ECS periodically sending it the role's temporary credentials, but they aren't directly accessible by the containers in the task.
> For the IAM permissions that your application code inside the container needs to run, see Amazon ECS task IAM role.

## S28 Amazon ECS task execution IAM role - Amazon Elastic Container Service — Amazon ECR permissions
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html#task-execution-ecr-permissions
fetched: 2026-11-26
> The task execution role should have these permissions to allow the Amazon ECS container and Fargate agents to pull container images on your behalf.
> For basic ECS implementations, these permissions should be added to the task execution role rather than the task IAM role.
> The Amazon ECS task execution role managed policy (AmazonECSTaskExecutionRolePolicy) includes the necessary permissions for pulling images from Amazon ECR.
> Note that these permissions are different from the permissions that might be required in the task IAM role if your application code needs to interact with Amazon ECR APIs directly.

## S29 Step 4: Create an IAM instance profile for your Amazon EC2 instances - AWS CodeDeploy — Step 4: Create an IAM instance profile for your Amazon EC2 instances
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/getting-started-create-iam-instance-profile.html#getting-started-create-iam-instance-profile
fetched: 2026-11-26
> Your Amazon EC2 instances need permission to access the Amazon S3 buckets or GitHub repositories where the applications are stored.
> This role gives the CodeDeploy agent permission to access the Amazon S3 buckets or GitHub repositories where your applications are stored.
> We recommend that you restrict this policy to only those Amazon S3 buckets your Amazon EC2 instances must access.

## S30 Working with the CodeDeploy agent — 役割と必要な場面
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent.html
fetched: 2026-11-26
> The AWS CodeDeploy agent is a software package that, when installed and configured on an instance, makes it possible for that instance to be used in CodeDeploy deployments.
> Note The CodeDeploy agent is required only if you deploy to an EC2/On-Premises compute platform. The agent is not required for deployments that use the Amazon ECS or AWS Lambda compute platform.
> A configuration file is placed on the instance when the agent is installed. This file is used to specify how the agent works.

## S31 Working with the CodeDeploy agent — 通信と対応 OS
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent.html#codedeploy-agent-outbound-port
fetched: 2026-11-26
> The CodeDeploy agent communicates outbound using HTTPS over port 443. When the CodeDeploy agent runs on an EC2 instance, it will use the EC2 metadata endpoint to retrieve instance related information.

## S32 Working with the CodeDeploy agent — 対応 OS（EC2）
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent.html#codedeploy-agent-supported-operating-systems-ec2
fetched: 2026-11-26
> The CodeDeploy agent has been tested on the following Amazon EC2 AMI operating systems:
> Windows Server 2016, 2019, 2022, 2025 (x86_64)
> macOS 15, 26, 27 on EC2 Mac instances with Apple silicon (aarch64)
> macOS is supported on the CodeDeploy agent version 2.1.2 and later only.

## S33 Working with the CodeDeploy agent — 管理と配置ファイル
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent.html#codedeploy-agent-processes
fetched: 2026-11-26
> The CodeDeploy agent uses systemd to manage the agent process on all supported Linux distributions. To manage the CodeDeploy agent, use the systemctl utility:
> sudo systemctl start codedeploy-agent sudo systemctl stop codedeploy-agent sudo systemctl restart codedeploy-agent sudo systemctl status codedeploy-agent

## S34 Working with the CodeDeploy agent — ログとルートディレクトリ
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent.html#codedeploy-agent-install-files
fetched: 2026-11-26
> The CodeDeploy agent stores revisions, deployment history, and deployment scripts in its root directory on an instance. The default name and location of this directory is: '/opt/codedeploy-agent/deployment-root' for Amazon Linux, Ubuntu Server, RHEL, and macOS instances.
> CodeDeploy logs: For Amazon Linux, Ubuntu Server, RHEL, and macOS instances, the CodeDeploy agent rotates the log files under the /var/log/aws/codedeploy-agent folder. The agent deletes log files after seven days.

## S35 Install the CodeDeploy agent using AWS Systems Manager — SSM でのインストールと更新
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-install-ssm.html
fetched: 2026-11-26
> You can use the AWS Management Console or the AWS CLI to install the CodeDeploy agent to your Amazon EC2 or on-premises instances by using AWS Systems Manager. You can choose to install a specific version or choose to always install the latest version of the agent.
> On an Amazon EC2 instance, the CodeDeploy agent requires that the instance is running version 2.3.274.0 or later. Before you install the CodeDeploy agent, update or install SSM agent on the instance if you haven't already done so.
> With SSM, you can install the CodeDeploy once or set up a schedule to install new versions.
> For version 2.0.x and later, choose the AWSCodeDeployAgentV2 package. This is the only package that supports macOS, starting with version 2.1.2.

## S36 Configure an Amazon EC2 instance to work with CodeDeploy — IAM インスタンスプロファイルの確認
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/instances-ec2-configure.html#instances-ec2-configure-1-verify-instance-profile-attached
fetched: 2026-11-26
> In the details pane, on the Description tab, note the value in the IAM role field, and then proceed to the next section. If the field is empty, you can attach an IAM instance profile to the instance.

## S37 Configure an Amazon EC2 instance to work with CodeDeploy — S3 からの取得の権限
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/instances-ec2-configure.html#instances-ec2-configure-2-verify-instance-profile-permissions
fetched: 2026-11-26
> If there is no entry in Trusted Entities that reads The identity provider(s) ec2.amazonaws.com, you cannot use this Amazon EC2 instance. If there is an entry that reads The identity provider(s) ec2.amazonaws.com, and you are storing your applications in Amazon S3 buckets, choose the Permissions tab.
> If "s3:Get*" and "s3:List*" are not in the list of specified actions, choose Edit to add them, and then choose Save.
> Make sure to give access to the Amazon S3 buckets that contain the CodeDeploy agent. Otherwise, an error might occur when the CodeDeploy agent is installed or updated on the instances.

## S38 Troubleshoot instance issues — エージェントが入っていない・動いていない時
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-ec2-instances.html#troubleshooting-sds-agent
fetched: 2026-11-26
> To verify the CodeDeploy agent is installed and running on an instance, see Verify the CodeDeploy agent is running. To install, uninstall, or reinstall the CodeDeploy agent, see Install the CodeDeploy agent.

## S39 Troubleshoot instance issues — 終了・タグ付け時の失敗
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-ec2-instances.html#troubleshooting-one-hour-timeout
fetched: 2026-11-26
> If the scripts don't run to completion while a lifecycle event is in progress (for example, if an instance is terminated or the CodeDeploy agent is shut down), it might take up to an hour for the status of the deployment to be displayed as Failed. This is because when the instance is terminated, the CodeDeploy agent shuts down and cannot process more scripts. If an instance is terminated between lifecycle events or before the first lifecycle event step starts, the timeout occurs after just five minutes.

## S40 Verify the CodeDeploy agent is running — Amazon Linux・RHEL での確認
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-verify.html#codedeploy-agent-operations-verify-linux
fetched: 2026-11-26
> To see if the CodeDeploy agent is installed and running, sign in to the instance, and run the following command: systemctl status codedeploy-agent. If the command returns an error, the CodeDeploy agent is not installed. If you see a message like The AWS CodeDeploy agent is not running. (exit code 3), start the service and run the following two commands, one at a time: systemctl start codedeploy-agent systemctl status codedeploy-agent.

## S41 Verify the CodeDeploy agent is running — Windows Server での確認
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-verify.html#codedeploy-agent-operations-verify-windows
fetched: 2026-11-26
> If Status shows anything other than Running, start the service with the following command: powershell.exe -Command Start-Service -Name codedeployagent

## S42 Troubleshoot EC2/On-Premises deployment issues — Troubleshooting a failed ApplicationStop, BeforeBlockTraffic, or AfterBlockTraffic deployment lifecycle event
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments-lifecycle-event-failures
fetched: 2026-11-26
> During a deployment, the CodeDeploy agent runs the scripts specified for ApplicationStop,
> BeforeBlockTraffic, and AfterBlockTraffic in the AppSpec file from the previous successful
> deployment. (All other scripts are run from the AppSpec file in the current deployment.) If
> one of these scripts contains an error and does not run successfully, the deployment can
> fail.
> Use the CodeDeploy console to investigate why a deployment might have failed during any of
> these events. On the details page for the deployment, choose View
> events. On the details page for the instance, in the
> ApplicationStop, BeforeBlockTraffic, or
> AfterBlockTraffic row, choose View logs. Or use
> the AWS CLI to call the get-deployment-instance command.

## S43 Troubleshoot EC2/On-Premises deployment issues — Troubleshooting a failed ApplicationStop, BeforeBlockTraffic, or AfterBlockTraffic deployment lifecycle event
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments-lifecycle-event-failures
fetched: 2026-11-26
> If the cause of the failure is a script from the last successful deployment that never
> runs successfully, create a deployment and specify that the ApplicationStop,
> BeforeBlockTraffic, and AfterBlockTraffic failures should be ignored. There are two ways to
> do this:
> Use the CodeDeploy console to create a deployment. On the Create
> deployment page, under ApplicationStop lifecycle event
> failure, choose Don't fail the deployment to an instance if this
> lifecycle event on the instance fails.
> Use the AWS CLI to call the create-deployment
> command and include the --ignore-application-stop-failures option.
> When you deploy the application revision again, the deployment continues even if any of
> these three lifecycle events fail. If the new revision includes fixed scripts for those
> lifecycle events, future deployments can succeed without applying this fix.

## S44 Troubleshoot EC2/On-Premises deployment issues — Troubleshooting a failed AllowTraffic lifecycle event with no error reported in the deployment logs
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments-allowtraffic-no-logs
fetched: 2026-11-26
> In some cases, a blue/green deployment fails during the AllowTraffic lifecycle event,
> but the deployment logs do not indicate the cause for the failure.
> This failure is typically due to incorrectly configured health checks in Elastic Load Balancing for the
> Classic Load Balancer, Application Load Balancer, or Network Load Balancer used to manage traffic for the deployment group.
> To resolve the issue, review and correct any errors in the health check configuration
> for the load balancer.

## S45 Troubleshoot EC2/On-Premises deployment issues — Troubleshooting all lifecycle events skipped errors
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-skipped-lifecycle-events
fetched: 2026-11-26
> If all lifecycle events of an EC2 or on-premises deployment are skipped, you
> might receive an error similar to The overall deployment failed because too many
> individual instances failed deployment, too few healthy instances are available for
> deployment, or some instances in your deployment group are experiencing problems. (Error
> code: HEALTH_CONSTRAINTS). Here are some possible causes and solutions:
> The CodeDeploy agent might not be installed or running on the instance.
> The CodeDeploy agent might stop running because an instance is running low on memory or
> hard disk space.
> The service role for CodeDeploy might not have required permissions.

## S46 Troubleshoot Amazon EC2 Auto Scaling issues — EC2 instances in an Amazon EC2 Auto Scaling group fail to launch and receive the error "Heartbeat Timeout"
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-auto-scaling.html#troubleshooting-auto-scaling-heartbeat
fetched: 2026-11-26
> An Amazon EC2 Auto Scaling group might fail to launch new EC2 instances, generating a message
> similar to the following:
> Launching a new EC2 instance
> <instance-Id>. Status Reason: Instance failed to
> complete user's Lifecycle Action: Lifecycle Action with
> token<token-Id> was abandoned: Heartbeat
> Timeout.
> This message usually indicates one of the following:
> The maximum number of concurrent deployments associated with an AWS account was
> reached.
> The Auto Scaling group tried to launch too many EC2 instances too quickly. The API
> calls to RecordLifecycleActionHeartbeat or CompleteLifecycleAction for each new instance were throttled.
> An application in CodeDeploy was deleted before its associated deployment groups were
> updated or deleted.

## S47 Troubleshoot Amazon EC2 Auto Scaling issues — Instances in an Amazon EC2 Auto Scaling group are continuously provisioned and terminated before a revision can be deployed
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-auto-scaling.html#troubleshooting-auto-scaling-provision-termination-loop
fetched: 2026-11-26
> In some cases, an error can prevent a successful deployment to newly provisioned
> instances in an Amazon EC2 Auto Scaling group. The results are no healthy instances and no successful
> deployments. Because the deployment can't run or be completed successfully, the instances
> are terminated soon after being created. The Amazon EC2 Auto Scaling group configuration then causes
> another batch of instances to be provisioned to try to meet the minimum healthy hosts
> requirement. This batch is also terminated, and the cycle continues.
> Possible causes include:
> Failed Amazon EC2 Auto Scaling group health checks.
> An error in the application revision.

## S48 Troubleshoot Amazon EC2 Auto Scaling issues — Terminating or rebooting an Amazon EC2 Auto Scaling instance might cause deployments to fail
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-auto-scaling.html#troubleshooting-auto-scaling-reboot
fetched: 2026-11-26
> If an EC2 instance is launched through Amazon EC2 Auto Scaling, and the instance is then
> terminated or rebooted, deployments to that instance might fail for the following
> reasons:
> During an in-progress deployment, a scale-in event or any other termination event
> causes the instance to detach from the Amazon EC2 Auto Scaling group and then terminate. Because the
> deployment cannot be completed, it fails.
> The instance is rebooted, but it takes more than five minutes for the instance to
> start. CodeDeploy treats this as a timeout. The service fails all current and future
> deployments to the instance.

## S49 Troubleshoot Amazon EC2 Auto Scaling issues — Mismatched Amazon EC2 Auto Scaling lifecycle hooks might cause automatic deployments to Amazon EC2 Auto Scaling groups to stop or fail
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-auto-scaling.html#troubleshooting-auto-scaling-hooks
fetched: 2026-11-26
> Amazon EC2 Auto Scaling and CodeDeploy use lifecycle hooks to determine which application revisions should
> be deployed to which EC2 instances after they are launched in Amazon EC2 Auto Scaling groups.
> Automatic deployments can stop or fail if lifecycle hooks and information about these hooks
> do not match exactly in Amazon EC2 Auto Scaling and CodeDeploy.
> If deployments to an Amazon EC2 Auto Scaling group are failing, see if the lifecycle hook names in
> Amazon EC2 Auto Scaling and CodeDeploy match. If not, use these AWS CLI command calls.

## S50 Troubleshoot Amazon EC2 Auto Scaling issues — "The deployment failed because no instances were found for your deployment group" error
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-auto-scaling.html#troubleshooting-deployment-failed-because-no-instances-found
fetched: 2026-11-26
> Read this section if you see the following CodeDeploy error:
> The deployment failed because no instances were found for your deployment group.
> Check your deployment group settings to make sure the tags for your EC2 instances
> or Auto Scaling groups correctly identify the instances you want to deploy to, and then try
> again.
> Your deployment group settings include tags for EC2 instances, on-premises
> instances, or Auto Scaling groups that are not correct. To fix this problem, check that your
> tags are correct, and then redeploy your application.

## S51 Troubleshooting CloudFormation — Update rollback failed
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html#troubleshooting-errors-update-rollback-failed
fetched: 2026-11-26
> A dependent resource can't return to its original state, causing the rollback to
> fail (UPDATE_ROLLBACK_FAILED state). For example, you might have a
> stack that's rolling back to an old database instance that was deleted outside of
> CloudFormation. Because CloudFormation doesn't know the database was deleted, it assumes
> that the database instance still exists and attempts to roll back to it, causing the
> update rollback to fail.
> Depending on the cause of the failure, you can manually fix the error and continue
> the rollback. By continuing the rollback, you can return your stack to a working
> state (the UPDATE_ROLLBACK_COMPLETE state), and then try to update the
> stack again.
> Failed to receive the required number of signals
> Use the signal-resource command to manually send the
> required number of successful signals to the resource that's
> waiting for them, and then continue rolling back the update.
> Insufficient permissions
> Check that you have sufficient IAM permissions to modify
> resources, and then continue the update rollback.
> To continue rolling back an update, you can use the CloudFormation console or AWS
> command line interface (AWS CLI). For more information, see Continue rolling back an update.
> If none of these solutions work, you can skip the resources that CloudFormation can't
> successfully roll back. You can skip them in one of the following ways:
> Force the rollback to complete. CloudFormation skips each resource that
> fails to roll back, including resources in nested stacks.
> Skip a specific set of resources.
> CloudFormation sets the status of the skipped resources to UPDATE_COMPLETE
> and continues to roll back the stack. After the rollback is complete, the state of
> the skipped resources will be inconsistent with the state of the resources in the
> stack template.

## S52 Troubleshooting CloudFormation — Delete stack fails
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html#troubleshooting-errors-delete-stack-fails
fetched: 2026-11-26
> Some resources must be empty before they can be deleted. For example, you
> must delete all objects in an Amazon S3 bucket or remove all instances in an
> Amazon EC2 security group before you can delete the bucket or security
> group.
> When stacks are in the DELETE_FAILED state because CloudFormation
> couldn't delete a resource, rerun the deletion with the
> RetainResources parameter and specify the resource that
> CloudFormation can't delete. CloudFormation deletes the stack without deleting the
> retained resource.
> Alternatively, you may consider using the FORCE_DELETE_STACK
> option with the DeletionMode parameter.
> You can't delete stacks that have termination protection enabled. If you
> attempt to delete a stack with termination protection enabled, the deletion
> fails and the stack--including its status--remains unchanged. Disable
> termination protection on the stack, then perform the delete operation
> again.

## S53 Troubleshooting CodePipeline — EC2 Deploy action fails with an error message No such file
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/troubleshooting.html#troubleshooting-ec2-deploy
fetched: 2026-11-26
> Description: After the EC2 deploy action unzips the
> artifacts in the target directory on the instances, the action runs the script. If the script
> is in the target directory but the action is unable to run the script, the action fails on
> that instance, and the remaining instances fail deployment.

## S54 Troubleshooting CodePipeline — Pipeline error: A Jenkins build or test action runs for a long time and then fails due to lack of credentials or permissions
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/troubleshooting.html#troubleshooting-jen1
fetched: 2026-11-26
> Problem: If the Jenkins server is installed on an Amazon EC2
> instance, the instance might not have been created with an instance role that has the
> permissions required for CodePipeline.
> Possible fixes: Make sure that Amazon EC2 instance role or
> IAM user is configured with the AWSCodePipelineCustomActionAccess managed
> policy or with the equivalent permissions.

## S55 Troubleshooting CodePipeline — Pipeline error: A deployment with the CodeDeployToECS action returns an error message "Exception while trying to read the task definition artifact file from: <source artifact name>"
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/troubleshooting.html#troubleshooting-ecstocodedeploy-size
fetched: 2026-11-26
> The task definition file is a required artifact for the CodePipeline deploy action to Amazon ECS
> through CodeDeploy (the CodeDeployToECS action). The maximum artifact ZIP size in the
> CodeDeployToECS deploy action is 3 MB. The following error message is returned
> when the file is not found or the artifact size exceeds 3 MB:
> Exception while trying to read the task definition artifact file from: <source
> artifact name>
> Possible fixes: Make sure the task definition file is
> included as an artifact. If the file already exists, make sure the compressed size is less
> than 3 MB.

## S56 AWS CodeDeploy「Working with deployment configurations in CodeDeploy」 — Deployment configurations on an EC2/on-premises compute platform / AWS Lambda compute platform
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html
fetched: 2026-11-25
> When you deploy to an EC2/On-Premises compute platform, the deployment configuration specifies, through the use of a 'minimum healthy hosts' value and an optional 'minimum healthy hosts per zone' value, the number or percentage of instances that must remain available at any time during a deployment. You can use one of the three predefined deployment configurations provided by AWS or create a custom deployment configuration. If you don't specify a deployment configuration, CodeDeploy uses the CodeDeployDefault.OneAtATime deployment configuration.
>
> Blue/green deployments: Deployment to replacement environment: Follows same deployment rules as CodeDeployDefault.OneAtATime for in-place deployments. Traffic rerouting: Routes traffic to one instance in the replacement environment at a time. Succeeds if traffic is successfully rerouted to all replacement instances. Fails after the very first rerouting failure.
>
> When you deploy to an AWS Lambda compute platform, the deployment configuration specifies the way traffic is shifted to the new Lambda function versions in your application. You can shift traffic using a canary, linear, or all-at-once deployment configuration.
>
> CodeDeployDefault.LambdaCanary10Percent5Minutes: Shifts 10 percent of traffic in the first increment. The remaining 90 percent is deployed five minutes later.
> CodeDeployDefault.LambdaLinear10PercentEvery1Minute: Shifts 10 percent of traffic every minute until all traffic is shifted.
> CodeDeployDefault.LambdaAllAtOnce: Shifts all traffic to the updated Lambda functions at once.

## S57 AWS CodeDeploy「Create a deployment group for an EC2/On-Premises blue/green deployment (console)」 — Deployment settings（Traffic rerouting / Original instances）
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-blue-green.html
fetched: 2026-11-25
> Traffic will be rerouted from the original to the replacement instances according to your chosen Traffic rerouting and Deployment configuration settings.
>
> Reroute traffic immediately: As soon as instances in the replacement environment are provisioned and the latest application revision is installed on them, they are registered with the specified load balancers and target groups automatically, causing traffic to be rerouted to them. Instances in the original environment are then deregistered.
>
> I will choose whether to reroute traffic: Instances in the replacement environment are not registered with the specified load balancers and target groups unless you manually reroute traffic. If the wait time you specify passes without traffic being rerouted, the deployment status is changed to Stopped.
>
> Note: After traffic is successfully routed to the replacement environment, instances in the original environment are deregistered all at once no matter which deployment configuration was selected.
>
> Terminate the original instances in the deployment group: After traffic is rerouted to the replacement environment, the instances that were deregistered from the load balancers and target groups are terminated following the wait period you specify.
>
> Keep the original instances in the deployment group running: After traffic is rerouted to the replacement environment, the instances that were deregistered from the load balancers and target groups are kept running.

## S58 Amazon ECS「CodeDeploy blue/green deployments for Amazon ECS」 — Deployment configuration / Considerations
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html
fetched: 2026-11-25
> We recommend that you use the Amazon ECS blue/green deployment. For more information, see Creating an Amazon ECS blue/green deployment.
>
> CodeDeploy deployment configuration: Specifies how CodeDeploy routes production traffic to your replacement task set during a deployment. The following pre-defined linear and canary deployment configuration are available. You can also create custom defined linear and canary deployments as well.
>
> CodeDeployDefault.ECSAllAtOnce: Shifts all traffic to the updated Amazon ECS container at once
>
> CodeDeployDefault.ECSLinear10PercentEvery1Minutes: Shifts 10 percent of traffic every minute until all traffic is shifted.
>
> CodeDeployDefault.ECSLinear10PercentEvery3Minutes: Shifts 10 percent of traffic every 3 minutes until all traffic is shifted.
>
> CodeDeployDefault.ECSCanary10Percent5Minutes: Shifts 10 percent of traffic in the first increment. The remaining 90 percent is deployed five minutes later.
>
> CodeDeployDefault.ECSCanary10Percent15Minutes: Shifts 10 percent of traffic in the first increment. The remaining 90 percent is deployed 15 minutes later.
>
> Considerations: You must configure the service to use either an Application Load Balancer or Network Load Balancer. When a Network Load Balancer is used, only the CodeDeployDefault.ECSAllAtOnce deployment configuration is supported.
>
> Then CodeDeploy reroutes the production traffic from the original task set to the replacement task set according to the traffic rerouting settings for the deployment group.

## S59 AWS Lambda「Create an alias for a Lambda Event Function」 — Alias and traffic split
url: https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html
fetched: 2026-11-25
> You can create aliases for your Lambda function. A Lambda alias is a pointer to a function version that you can update. The function's users can access the function version using the alias Amazon Resource Name (ARN). When you deploy a new version, you can update the alias to use the new version, or split traffic between two versions.
>
> (Optional) To configure routing on the alias, expand Weighted alias. For more information, see Implement Lambda canary deployments using a weighted alias.
>
> To change an alias to point a new version of the function, use the update-alias command.
>
> aws lambda update-alias \
> --function-name my-function \
> --name alias-name \
> --function-version version-number

## S60 AWS Elastic Beanstalk「Deployment policies and settings」 — Deployment policies / Traffic splitting / Deployment option namespaces
url: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html
fetched: 2026-11-25
> AWS Elastic Beanstalk provides several options for how deployments are processed, including deployment policies (All at once, Rolling, Rolling with additional batch, Immutable, and Traffic splitting) and options that let you configure batch size and health check behavior during deployments. By default, your environment uses all-at-once deployments.
>
> Immutable deployments perform an immutable update to launch a full set of new instances running the new version of the application in a separate Auto Scaling group, alongside the instances running the old version. Immutable deployments can prevent issues caused by partially completed rolling deployments. If the new instances don't pass health checks, Elastic Beanstalk terminates them, leaving the original instances untouched.
>
> Traffic-splitting deployments let you perform canary testing as part of your application deployment. In a traffic-splitting deployment, Elastic Beanstalk launches a full set of new instances just like during an immutable deployment. It then forwards a specified percentage of incoming client traffic to the new application version for a specified evaluation period. If the new instances stay healthy, Elastic Beanstalk forwards all traffic to them and terminates the old ones.
>
> Use the DeploymentPolicy option to set the deployment type. The following values are supported: AllAtOnce, Rolling, RollingWithAdditionalBatch, Immutable, TrafficSplitting.
>
> For the Traffic splitting deployment policy you can configure the following: Traffic split – The initial percentage of incoming client traffic that Elastic Beanstalk shifts to environment instances running the new application version you're deploying. Traffic splitting evaluation time – The time period, in minutes, that Elastic Beanstalk waits after an initial healthy deployment before proceeding to shift all incoming client traffic to the new application version that you're deploying.
>

## S61 AWS Elastic Beanstalk「Blue/Green deployments with Elastic Beanstalk」 — CNAME swap
url: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html
fetched: 2026-11-25
> Because AWS Elastic Beanstalk performs an in-place update when you update your application versions, your application might become unavailable to users for a short period of time. To avoid this, perform a blue/green deployment. To do this, deploy the new version to a separate environment, and then swap the CNAMEs of the two environments to redirect traffic to the new version instantly.
>
> On the environment overview page, choose Actions, and then choose Swap environment URLs. For Environment name, select the current environment. Choose Swap.
>
> Elastic Beanstalk swaps the CNAME records of the old and new environments, redirecting traffic from the old version to the new version. After Elastic Beanstalk completes the swap operation, verify that the new environment responds when you try to connect to the old environment URL. However, do not terminate your old environment until the DNS changes are propagated and your old DNS records expire.
