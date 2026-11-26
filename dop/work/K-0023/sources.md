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
