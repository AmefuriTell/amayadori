## S1 AWS CodeDeploy「Working with deployment configurations in CodeDeploy」 — Deployment configurations on an EC2/on-premises compute platform / AWS Lambda compute platform
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

## S2 AWS CodeDeploy「Create a deployment group for an EC2/On-Premises blue/green deployment (console)」 — Deployment settings（Traffic rerouting / Original instances）
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

## S3 Amazon ECS「CodeDeploy blue/green deployments for Amazon ECS」 — Deployment configuration / Considerations
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

## S4 AWS Lambda「Create an alias for a Lambda Event Function」 — Alias and traffic split
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

## S5 AWS Elastic Beanstalk「Deployment policies and settings」 — Deployment policies / Traffic splitting / Deployment option namespaces
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

## S6 AWS Elastic Beanstalk「Blue/Green deployments with Elastic Beanstalk」 — CNAME swap
url: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html
fetched: 2026-11-25
> Because AWS Elastic Beanstalk performs an in-place update when you update your application versions, your application might become unavailable to users for a short period of time. To avoid this, perform a blue/green deployment. To do this, deploy the new version to a separate environment, and then swap the CNAMEs of the two environments to redirect traffic to the new version instantly.
>
> On the environment overview page, choose Actions, and then choose Swap environment URLs. For Environment name, select the current environment. Choose Swap.
>
> Elastic Beanstalk swaps the CNAME records of the old and new environments, redirecting traffic from the old version to the new version. After Elastic Beanstalk completes the swap operation, verify that the new environment responds when you try to connect to the old environment URL. However, do not terminate your old environment until the DNS changes are propagated and your old DNS records expire.
