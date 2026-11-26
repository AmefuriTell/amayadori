## S1 Working with deployment configurations in CodeDeploy — Deployment configurations on an EC2/on-premises compute platform
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configuration-server
fetched: 2026-11-26
> When you deploy to an EC2/On-Premises compute platform, the deployment configuration specifies, through the use of a 'minimum healthy hosts' value and an optional 'minimum healthy hosts per zone' value, the number or percentage of instances that must remain available at any time during a deployment.
> If you don't specify a deployment configuration, CodeDeploy uses the CodeDeployDefault.OneAtATime deployment configuration.
> Attempts to deploy an application revision to as many instances as possible at once. Using an example of nine instances, CodeDeployDefault.AllAtOnce attempts to deploy to all nine instances at once.
> Deploys to up to half of the instances at a time (with fractions rounded down). In the example of nine instances, it deploys to up to four instances at a time.
> Deploys the application revision to only one instance at a time. In an example using nine instances, it deploys to one instance at a time.

## S2 Working with deployment configurations in CodeDeploy — Deployment configurations on an Amazon ECS compute platform
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configuration-ecs
fetched: 2026-11-26
> When you deploy to an Amazon ECS compute platform, the deployment configuration specifies how traffic is shifted to the updated Amazon ECS task set. You can shift traffic using a canary, linear, or all-at-once deployment configuration.
> If you're using a Network Load Balancer, only the CodeDeployDefault.ECSAllAtOnce predefined deployment configuration is supported.
> Shifts 10 percent of traffic in the first increment. The remaining 90 percent is deployed five minutes later.
> Shifts 10 percent of traffic every minute until all traffic is shifted.
> Shifts all traffic to the updated Amazon ECS container at once.

## S3 Working with deployment configurations in CodeDeploy — Deployment configurations on an AWS Lambda compute platform
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configuration-lambda
fetched: 2026-11-26
> When you deploy to an AWS Lambda compute platform, the deployment configuration specifies the way traffic is shifted to the new Lambda function versions in your application. You can shift traffic using a canary, linear, or all-at-once deployment configuration.
> Shifts 10 percent of traffic in the first increment. The remaining 90 percent is deployed 30 minutes later.
> Shifts 10 percent of traffic every 10 minutes until all traffic is shifted.
> Shifts all traffic to the updated Lambda functions at once.

## S4 Create a deployment configuration with CodeDeploy — Creating a deployment configuration (console)
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations-create.html#deployment-configurations-create-console
fetched: 2026-11-26
> If you don't want to use one of the default deployment configurations provided with CodeDeploy, you can create your own using the following instructions.
> Under Minimum healthy hosts, specify the number or percentage of instances that must remain available at any time during a deployment.

## S5 Redeploy and roll back a deployment with CodeDeploy — Automatic rollbacks
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html#deployments-rollback-and-redeploy-automatic-rollbacks
fetched: 2026-11-26
> CodeDeploy rolls back deployments by redeploying a previously deployed revision of an application as a new deployment. Deployments can be rolled back automatically or manually.
> You can configure a deployment group or deployment to automatically roll back when a deployment fails or when a monitoring threshold you specify is met. In this case, the last known good version of an application revision is deployed.

## S6 Redeploy and roll back a deployment with CodeDeploy — Manual rollbacks
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html#deployments-rollback-and-redeploy-manual-rollbacks
fetched: 2026-11-26
> If you have not set up automatic rollbacks, you can manually roll back a deployment by creating a new deployment that uses any previously deployed application revision and following the steps to redeploy a revision.

## S7 What is CodeDeploy? — Overview of CodeDeploy deployment types
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html#welcome-deployment-overview
fetched: 2026-11-26
> In-place deployment: The application on each instance in the deployment group is stopped, the latest application revision is installed, and the new version of the application is started and validated.
> Only deployments that use the EC2/On-Premises compute platform can use in-place deployments.
> Blue/green deployment: The instances in a deployment group (the original environment) are replaced by a different set of instances (the replacement environment) using these steps:
> An optional wait time occurs for activities such as application testing and system verification. Instances in the original environment are deregistered and can be terminated or kept running for other uses.
> If you use an EC2/On-Premises compute platform, be aware that blue/green deployments work with Amazon EC2 instances only.
> Blue/green on an AWS Lambda or Amazon ECS compute platform: Traffic is shifted in increments according to a canary, linear, or all-at-once deployment configuration.

## S8 What is CodeDeploy? — Overview of a blue/green deployment
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html#welcome-deployment-overview-blue-green
fetched: 2026-11-26
> A blue/green deployment is used to update your applications while minimizing interruptions caused by the changes of a new application version. CodeDeploy provisions your new application version alongside the old version before rerouting your production traffic.

## S9 CodeDeploy instance health — About the minimum number of healthy instances
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/instances-health.html#minimum-healthy-hosts
fetched: 2026-11-26
> The required minimum number of healthy instances is defined as part of a deployment configuration. During a blue/green deployment, the deployment configuration and minimum healthy hosts value apply to instances in the replacement environment, not those in the original environment.
> However, when instances in the original environment are deregistered from the load balancer, the overall deployment is marked as Failed if even a single original instance fails to be deregistered successfully.
> You can create custom deployment configurations in CodeDeploy to define your own minimum healthy host values.
> CodeDeploy allows you to specify a minimum number of healthy instances for the deployment for two main purposes: To determine whether the overall deployment succeeds or fails. Deployment succeeds if the application revision was successfully deployed to at least the minimum number of healthy instances.

## S10 Configure advanced options for a deployment group — Automatic rollbacks and alarms
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-configure-advanced-options.html
fetched: 2026-11-26
> Amazon CloudWatch alarms: You can create a CloudWatch alarm that watches a single metric over a time period you specify and performs one or more actions based on the value of the metric relative to a given threshold over a number of time periods.
> You can configure a deployment to stop when an Amazon CloudWatch alarm detects that a metric has fallen below or exceeded a defined threshold. You must have already created the alarm in CloudWatch before you can add it to a deployment group.
> If you want deployments to proceed without taking into account alarms you have added, choose Ignore alarm configuration.
> Roll back when alarm thresholds are met. If you added an alarm to this application in the previous step, CodeDeploy will redeploy the last known good revision when one or more of the specified alarms is activated.
