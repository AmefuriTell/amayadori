## S1 Working with SSM Agent - AWS Systems Manager — Working with SSM Agent
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html#ssm-agent
fetched: 2026-11-26
> AWS Systems Manager Agent (SSM Agent) is Amazon software that runs on Amazon Elastic Compute Cloud (Amazon EC2) instances, edge devices, on-premises servers, and virtual machines (VMs). SSM Agent makes it possible for Systems Manager to update, manage, and configure these resources. The agent processes requests from the Systems Manager service in the AWS Cloud, and then runs them as specified in the request. SSM Agent then sends status and execution information back to the Systems Manager service by using the Amazon Message Gateway Service (ssmmessages).
> If you monitor traffic, you see that your managed nodes communicate with ssmmessages.* endpoints and possibly ec2messages.* endpoints.

## S2 Managing EC2 instances automatically with Default Host Management Configuration - AWS Systems Manager — Overview
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/managed-instances-default-host-management.html#fleet-manager-default-host-management-configuration
fetched: 2026-11-26
> The Default Host Management Configuration setting allows AWS Systems Manager to manage your Amazon EC2 instances automatically as managed instances. Using Default Host Management Configuration, you can manage EC2 instances without having to manually create an AWS Identity and Access Management (IAM) instance profile. Instead, Default Host Management Configuration creates and applies a default IAM role to make sure that Systems Manager has permissions to manage all instances in the AWS account and AWS Region where it's activated.
> Removing these directories or their files will prevent the instance from acquiring the necessary credentials to connect to Systems Manager using Default Host Management Configuration.

## S3 Managing EC2 instances automatically with Default Host Management Configuration - AWS Systems Manager — Prerequisites
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/managed-instances-default-host-management.html#dhmc-prerequisites
fetched: 2026-11-26
> An instance to be managed must use Instance Metadata Service Version 2 (IMDSv2). Default Host Management Configuration doesn't support Instance Metadata Service Version 1. SSM Agent version 3.2.582.0 or later must be installed on the instance to be managed.

## S4 Managing EC2 instances automatically with Default Host Management Configuration - AWS Systems Manager — Activating the Default Host Management Configuration setting
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/managed-instances-default-host-management.html#dhmc-activate
fetched: 2026-11-26
> After turning on Default Host Management Configuration, it might take up to 30 minutes for your instances to use the credentials of the role you choose in step 5 in the following procedure. We recommend using the default role provided by Default Host Management Configuration. It contains the minimum set of permissions necessary to manage your Amazon EC2 instances using Systems Manager.

## S5 Configure instance permissions required for Systems Manager - AWS Systems Manager — Recommended and alternative configuration for EC2 instance permissions
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-permissions.html#default-host-management
fetched: 2026-11-26
> After you've turned on this setting, all instances using Instance Metadata Service Version 2 (IMDSv2) in the AWS Region and AWS account with SSM Agent version 3.2.582.0 or later installed automatically become managed instances.
> You can create an instance profile for Systems Manager by attaching one or more IAM policies that define the necessary permissions to a new role or to a role you already created.
> Use the Search field to locate the AmazonSSMManagedInstanceCore policy. Select the check box next to its name, as shown in the following illustration.

## S6 Automating updates to SSM Agent - AWS Systems Manager — Automating updates to SSM Agent
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent-automatic-updates.html#ssm-agent-automatic-updates
fetched: 2026-11-26
> AWS releases a new version of AWS Systems Manager Agent (SSM Agent) when we add or update Systems Manager tools. If your managed nodes use an older version of the agent, then you can't use the new tools or benefit from the updated tools. SSM Agent on the Bottlerocket operating system can't be updated using the Systems Manager Command document AWS-UpdateSSMAgent.
> You can configure all managed nodes in your AWS account to automatically check for and download new versions of SSM Agent.

## S7 Improve the security of EC2 instances by using VPC endpoints for Systems Manager - AWS Systems Manager — Improve the security of EC2 instances by using VPC endpoints for Systems Manager
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-create-vpc.html#setup-create-vpc
fetched: 2026-11-26
> The alternative to using a VPC endpoint is to allow outbound internet access on your managed instances. In this case, the managed instances must also allow HTTPS (port 443) outbound traffic to the following endpoints: ssm.region.amazonaws.com, ssmmessages.region.amazonaws.com, ec2messages.region.amazonaws.com.
> SSM Agent initiates all connections to the Systems Manager service in the cloud. For this reason, you don't need to configure your firewall to allow inbound traffic to your instances for Systems Manager.
